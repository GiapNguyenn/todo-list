const homeRouter = require('./home.route');
const taskRouter = require('./task.route');

module.exports = (app) => {
    app.use('/', homeRouter);
    app.use('/task', taskRouter);
}