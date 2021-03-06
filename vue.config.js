// const PurgecssPlugin = require('purgecss-webpack-plugin')
// const glob = require('glob-all')
const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
// class TailwindExtractor {
//   static extract (content) {
//     return content.match(/[A-z0-9-_:\/]+/g) || []
//   }
// }
// module.exports = {
//   chainWebpack (config) {
//     // if (process.env.NODE_ENV === 'production') {
//     //   config
//     //     .plugin('PurgecssPlugin')
//     //     .use(PurgecssPlugin, [{
//     //       paths: glob.sync([
//     //         `${resolve('src')}/**/*.js`,
//     //         `${resolve('src')}/**/*.vue`
//     //       ], {
//     //         nodir: true
//     //       })
//     //       // extractors: [{
//     //       //   extractor: TailwindExtractor,
//     //       //   extensions: ['html', 'vue', 'js']
//     //       // }]
//     //     }])
//     // }
//   }
// }
const PurgecssPlugin = require('@fullhuman/postcss-purgecss')

module.exports = {
  chainWebpack (config) {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('PurgecssPlugin')
        .use(PurgecssPlugin, [
          {
            content: [
              `${resolve('public')}/**/*.html`,
              `${resolve('src')}/**/*.vue`,
              `${resolve('src')}/**/*.js`
            ],
            defaultExtractor (content) {
              const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
              return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
            },
            safelist: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/, /data-v-.*/]
          }
        ])
    }
  }
}
