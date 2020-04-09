module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/training-timer-github-pages/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}
