module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status:"",
      class:""
    },
    {
      name: "Hoàn thành",
      status:"completed",
      class:""
    },
    {
      name: "Chưa hoàn thành",
      status:"incomplete",
      class:""
    }
  ]
  if (query.status){
    const index =filterStatus.findIndex(item => item.status == query.status)
    filterStatus[index].class ="completed"
  }else {
    const index =filterStatus.findIndex(item => item.status == "")
    filterStatus[index].class ="completed"
  }
  return filterStatus
}