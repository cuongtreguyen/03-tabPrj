document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // chặn sự kiện reset trang khi submit
  console.log("hello");
  const name = document.querySelector("#name").value; // #name thì lấy đc name còn muốn lấy giá trị thì thêm value
  //tạo ra đối tượng item nha
  const item = {
    id: new Date().toISOString(), //lấy thời gian của e vừa mới tạo ra e làm thành id
    name: name.trim(), //trim xóa khoảng cách thừa
  };
  //hiển thị object item lên UI
  addItemToUI(item); //hàm nhận vào item nó cầm item đó sẽ hiển thị lên UI
  //lưu trữ item lên LocalStorage
  addItemToLS(item);
});
// ko hoisting sao m chạy ở phía trên và tại sao vẫn chạy đc
//e p nhớ nó là callbackfunc nó chưa chạy , khi nào e submit thì nó mới bắt đầu chạy
//đợi khi submit thì nó đã xong hết r

const addItemToUI = (item) => {
  const { name, id } = item; //destructuring thằng ba chấm là thằng này
  const newCard = document.createElement("div");
  newCard.className =
    "card d-flex flex-row justify-content-between align-items-center p-2 mb-3";
  newCard.innerHTML = `
          <span>${name}</span>
          <button data-id="${id}" class="btn btn-danger btn-sm btn-remove">Remove</button>
  `;
  document.querySelector(".list").appendChild(newCard);
};
//classList sẽ không ghi đè các lớp cũ mà chỉ thêm hoặc xóa lớp cụ thể mà bạn chỉ định.
//getList: lấy danh sách các item từ ls về
const getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
  //chuyển chuỗi thành mảng nếu có thì ra string nhưng không có thì null bỏ ra cái mảng rỗng
};
const addItemToLS = (item) => {
  const list = getList(); //lấy danh sách từ ls về
  list.push(item); //nhét item vào danh sách
  localStorage.setItem("list", JSON.stringify(list)); //lưu list đã nhét item lên lại localStorage
};

//hàm render tất cả item lên ui mỗi khi vào trang
const init = () => {
  const list = getList();
  list.forEach((item) => {
    addItemToUI(item);
  });
};

init(); //nó đc chạy khi nào khi trang web e có

//cho list
document.querySelector(".list").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    console.log(event.target.dataset.id);
    const idRemove = event.target.dataset.id; //lấy id cần remove từ data-id của nút xóa
    const nameItem = event.target.previousElementSibling.textContent;
    const isConfirmed = confirm(
      `Bạn có chắc là muốn xóa item: ${nameItem} không ?`
    );
    if (isConfirmed) {
      //xóa trên UI trước
      event.target.parentElement.remove();
      //xóa trên database || ls
      const idRemove = event.target.dataset.id; //lấy id cần remove từ data-id của nút xóa
      removeItemFromLS(idRemove);
    }
  }
});
//hàm nhận vào id từ btn-remove đã nhấn , dùng id đó tìm và xóa item trong ls
const removeItemFromLS = (idRemove) => {
  let list = getList(); //lấy danh sách item về
  //hàm tìm và xóa chỉ có filter
  list = list.filter((item) => item.id != idRemove); //lọc những thg id khác cần xóa
  localStorage.setItem("list", JSON.stringify(list)); //lưu list đã cập nhật lên lại
};

//remove all
document.querySelector(`#btn-remove-all`).addEventListener("click", (event) => {
  let i = 0;
  const isConfirmed = confirm(`Ban có chắc là muốn xóa hết item không?`);
  if (isConfirmed) {
    document.querySelector(".list").innerHTML = "";
    localStorage.removeItem("list");
  }
});
//chức năng filter , tại sao ko p filter mà gọi là search
//get 100 sp , lọc filter , tìm kiếm trên 100 sp đó lun

// trên ứng dụng khác của ngta thì 1000 sp , ngta ko thể nào mà get 1000 sp dc , ngta họ sẽ get
//đi vói 2 thông số limit và page , limit là 10 page: 5 cứ 10 thì chia cho 5 page
document.querySelector("#filter").addEventListener("keyup", (event) => {
  let inputValue = event.target.value; //lấy value từ ô input lấy ra sự kiện
  let list = getList();

  list = list.filter((item) => item.name.includes(inputValue));
  //xóa các item trong list để render list vừa lọc
  document.querySelector(".list").innerHTML = "";
  list.forEach((item) => {
    addItemToUI(item);
  });
});
