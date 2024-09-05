let btnList = document.querySelectorAll(".navtab-btn");
let contentList = document.querySelectorAll(".tab-content-item");
//duyệt qua từng nút
btnList.forEach((btn) => {
  //nút nào cx chờ đc click
  btn.addEventListener("click", (event) => {
    //nếu như có 1 nút bị nhấn thì duyệt danh sách các nút và xóa actived
    //lỡ trc đó có 1 thg bị click
    btnList.forEach((_btn) => {
      //shift gạch
      //có 2 class : classList với className dùng để xóa
      _btn.classList.remove("actived");
    });
    //gán giá trị cho thg vừa click even.target
    //thằng nào vừa bị nhấn click thì thêm actived cho tui
    event.target.classList.add("actived");
    //xóa actived của các content
    contentList.forEach((content) => {
      content.classList.remove("actived");
    });

    //lấy cái gì thg vừa bấm ? lấy id
    let id = event.target.id;
    let contentChecked = document.querySelector(`
        .tab-content-item[data-id="${id}"] 
        `);
    contentChecked.classList.add("actived");
  });
});
