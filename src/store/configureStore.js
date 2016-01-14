if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  module.exports = require('./configureStore.production')
} else {
  module.exports = require('./configureStore.development')
}
