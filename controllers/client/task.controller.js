const Task = require("../../models/task.model");
module.exports.index = async (req, res) => {
    let find = {
        deleted : false ,
        status : "incomplete"
    }
    const tasks = await Task.find(find);
    res.render("client/pages/task/index", {
        pageTitle: "Danh sách công việc",
        tasks: tasks
    });
}