import express from 'express'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import path from 'path'
import config from './config'
import webpackConfig from './webpack.config'

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'))
})

app.listen(config.port, err => {
  if (err) return console.log(err)
  console.log(`Listening on localhost:${config.port}`)
})
