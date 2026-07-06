const systemConfig = require("../../config/systems")
const dashboardController = require("./dashboard.route")
module.exports = (app) => { 
    const PAST_ADMIN = systemConfig.perfixAdmin
    app.use(PAST_ADMIN+'/dashboard', dashboardController)
}