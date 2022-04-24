const { Telegraf } = require('telegraf')
const fs = require('fs')

if(!fs.existsSync('./conf.json')) {
    fs.writeFileSync('./conf.json', JSON.stringify({
        token: '',
        alertGroupId: '',
        target: '',
        lastCheck: Date.now(),
        message: ''
    }))

    console.log('Please fill the conf.json file')
    process.exit(1)
}
let { lastCheck, message, target, alertGroupId, token } = require('./conf.json')
const bot = new Telegraf(token)

bot.command('ok', async ctx => {
    if(ctx.message.from.username === target) {
        lastCheck = Date.now()
        ctx.reply(message)
    }
})

bot.command('start', async ctx => {
    const last = new Date(lastCheck)

    ctx.reply(`Qumolama: 上一次状态确认：${last.toLocaleString()} 距离现在 ${Math.floor((Date.now() - lastCheck) / 1000 / 60 / 60)} 小时`)
})

bot.command('lama', async ctx => {
    const last = new Date(lastCheck)

    ctx.reply(`Qumolama: 上一次状态确认：${last.toLocaleString()} 距离现在 ${Math.floor((Date.now() - lastCheck) / 1000 / 60 / 60)} 小时`)
})


bot.launch()

process.once('SIGTERM', () => {
    bot.stop('SIGTERM')

    fs.writeFileSync('conf.json', JSON.stringify( { lastCheck, message, targe, alertGroupId, token } ))
})

process.once('SIGINT', () => {
    bot.stop('SIGINT')

    fs.writeFileSync('conf.json', JSON.stringify( { lastCheck, message, target, alertGroupId, token } ))
})


const launchCheckTask = () => {
    setInterval(check, 1000 * 3600 * 24)
}

const check = () => {
    if(Date.now() - lastCheck > 1000 * 3600 * 24 * 1.5) {
        bot.telegram.sendMessage(alertGroupId, "警告！Qumolama.d 未汇报状态已达到警告时间(36hr) 希望一切平安").then((msg) => {
            bot.telegram.pinChatMessage(alertGroupId, msg.message_id, { disable_notification: false })
        })
    }
    launchCheckTask()
}

console.log("Bot started with token: " + token.substring(0, 20).padEnd(token.length, '*'))