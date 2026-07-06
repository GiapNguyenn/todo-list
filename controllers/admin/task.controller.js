const Task = require("../../models/task.model")
const searchHelper = require("../../helpers/search")
const filterStatusHelper = require("../../helpers/filterStatus")
const paginationHelper = require("../../helpers/pagination")



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
  //  chức năng phân trang 
  const countProduct = await Task.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4
    },
    req.query,
    countProduct
  )
  const task = await Task.find(find)
  .limit(objectPagination.limitItems)
  .skip(objectPagination.skip);
    // end chức năng phân trang 

  res.render("./admin/pages/task/index.pug",{
    pageTitle:"Trang quản lý công việc",
    tasks : task,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  })
}

// [PATCH] /admin/task/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Task.updateOne({ _id: id }, { status: status });
  req.flash('success', 'Cập nhật trạng thái thành công ');
  res.redirect(req.get("Referrer"));
}
