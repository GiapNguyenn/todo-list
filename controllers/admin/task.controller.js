const Task = require("../../models/task.model")
const searchHelper = require("../../helpers/search")
const filterStatusHelper = require("../../helpers/filterStatus")



// [GET] /admin/task
module.exports.index= async (req, res) => {
  // chức năng lọc trạng thái
  const filterStatus = filterStatusHelper(req.query)
  let find = {
    deleted : false
  }
  if(req.query.status){
    find.status = req.query.status
  }
   //end chức năng lọc trạng thái

  // chức năng tìm kiếm 
  const objectSearch = searchHelper(req.query)
  if (objectSearch.keyword) {
    find.title = objectSearch.regex;
  }
   // end chức năng tìm kiếm 
  const task = await Task.find(find);
  res.render("./admin/pages/task/index.pug",{
    pageTitle:"Trang quản lý công việc",
    tasks : task,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword
  })
}