# Im fine bot

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

使用方法
---
你需要在 @BotFather 那里创建一个bot，然后下载这个仓库，确保你已经安装了node14+ 和 yarn

使用指令：`$ yarn install && yarn build` 来创建一份运行时构建

然后您可以将 `conf.json`和`imfine.bundle.js`放到您的服务器上进行部署

**第一次启动会自动生成`conf.json`请自己研究填写，然后在编译之前自己改一下index.js里的名字，有一些我写死了**

正确部署顺序：下载仓库和配置环境，创建bot，修改index.js里面的名字，创建运行时构建，配置 conf.json，部署文件 imfine.bundle.js和conf.json