const esbuild = require('esbuild')

esbuild.build({
    entryPoints: ['./index.js'],
    bundle: true,
    outfile: './imfine.bundle.js',
    target: 'es2018',
    platform: 'node',
    external: ["./conf.js"]
})