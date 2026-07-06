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
// [GET] /admin/task/create 
module.exports.create = async (req, res) => {
  res.render("./admin/pages/task/create.pug", {
    pageTitle: "Tạo mới công việc"
  });
}
// [POST] /admin/task/create
module.exports.createPost = async (req, res) => {
  try {
  const data = new Task(req.body);
  await data.save();
  req.flash('success', 'Tạo mới công việc thành công');
  res.redirect("/admin/task");
  } catch (error) {
    req.flash('error', 'Tạo mới công việc thất bại');
    res.redirect("/admin/task/create");
  }

}
// [GET] /admin/task/edit/:id 
module.exports.edit = async (req, res) => {
  try {
      const id = req.params.id;
      const task = await Task.findById(id);
      res.render("./admin/pages/task/edit.pug", {
        pageTitle: "Chỉnh sửa công việc",
        task: task
      });
    } catch (error) {
      req.flash('error', 'Không tìm thấy công việc');
      res.redirect("/admin/task");
    }
}
// [PATCH] /admin/task/edit/:id
module.exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.updateOne({ _id: id }, req.body);
    req.flash('success', 'Cập nhật công việc thành công');
    res.redirect("/admin/task");
  } catch (error) {
    req.flash('error', 'Cập nhật công việc thất bại');
    res.redirect(`/admin/task/edit/${req.params.id}`);
  }
}