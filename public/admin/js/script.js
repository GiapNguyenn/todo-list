// button-status 
const ButtonStatus = document.querySelectorAll("[button-status]")
if (ButtonStatus.length > 0) {
  //Lấy ra url
  let url = new URL(window.location.href);
  console.log(url)
  ButtonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status")
      console.log(status)
      if (status) {
        //xét lại biến status
        url.searchParams.set("status", status)
      }
      else {
        url.searchParams.delete("status")
      }
      console.log(url.href)
      window.location.href = url.href
    });
  })
}
// End button-status 

// Form Search 
const formSearch = document.querySelector("#form-search")
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault() //để ngăn chặn sự kiện mặc định
    const keyword = e.target.elements.keyword.value
    console.log(e.target.elements.keyword.value)
    if (keyword) {
      //xét lại biến keyword
      url.searchParams.set("keyword", keyword)
    }
    else { // nếu không xoá đi status
      url.searchParams.delete("keyword")
    }
    window.location.href = url.href
  })
}
// End Form Search 
// Pagination
let url = new URL(window.location.href);
const buttonPagination = document.querySelectorAll("[button-pagination]")
buttonPagination.forEach(button => {
  button.addEventListener("click", () => {
    const page = button.getAttribute("button-pagination")
    url.searchParams.set("page", page)
    window.location.href = url.href
  })
})
//end Pagination