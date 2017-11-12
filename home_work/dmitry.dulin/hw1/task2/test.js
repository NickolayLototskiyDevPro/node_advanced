const gulpTask = require('./gulpTask')
const config = require('./config')

gulpTask(config.root, config.bundle, config.advertising)
