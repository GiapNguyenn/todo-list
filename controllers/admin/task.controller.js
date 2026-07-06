const Task = require("../../models/task.model")
const filterStatusHelper = require("../../helpers/filterStatus")
// [GET] /admin/task
module.exports.index= async (req, res) => {
  const filterStatus = filterStatusHelper(req.query)
  if(req.query.status){
    find.status = req.query.status
  }
  const task = await Task.find();
  res.render("./admin/pages/task/index.pug",{
    pageTitle:"Trang quản lý công việc",
    tasks : task
  })
}