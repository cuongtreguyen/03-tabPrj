const VALUES = [
  { id: "scissors", value: "✂️" }, //0
  { id: "rock", value: "🔨" }, //1
  { id: "paper", value: " ✋" }, //2
];
//phân tích logic
//valuePlayer và valueComputer => "scissors" | "rock" | "paper"
//từ đó duyet cái VALUES tìm dựa id nào giống
//indexPlayer và indexComputer
//khi nào thắng
//0 - 2 = -2 là thắng
//1 - 0 = 1 indexPlayer - indexComputer = 1 || -2 thì thắng return 1
//2 - 1 = 1
//khi nào hòa indexPlayer - indexComputer = 0 || thì hòa return 0
// còn lại là thua                                          -1

let i = 0;

const handleChange = () => {
  let computer = document.querySelector("#computer");
  computer.textContent = VALUES[i].value;
  computer.setAttribute("data-id", VALUES[i].id);
  i = i === VALUES.length - 1 ? 0 : ++i;
};
let interval = setInterval(handleChange, 1000);
//khi nó chạy nó trả về number ,number này là chìa khóa ngừng thằng đó lại

//hàm compare: hàm so sánh giá trị phân thắng2 thua-1  hòa 0
const compare = (valuePlayer, valueComputer) => {
  //tìm index của các value tương ứng
  //của máy ko p id mà là data-id
  //tổng quan nó cx là chuỗi
  let indexPlayer = VALUES.findIndex((item) => item.id == valuePlayer);
  let indexComputer = VALUES.findIndex((item) => item.id == valueComputer);
  let result = indexPlayer - indexComputer;
  if ([1, -2].includes(result)) return 1;
  else if (result == 0) return 0;
  else return -1;
};

let playerItem = document.querySelectorAll(".user");
//duyet qua cac item của người dùng
playerItem.forEach((item) => {
  //và tất cả bọn nó đều lắng nghe sự kiện click
  item.addEventListener("click", (event) => {
    //dừng máy lại và lấy data-id
    clearInterval(interval);
    // lấy data-id
    let computer = document.querySelector("#computer");
    let valueComputer = computer.dataset.id; //getAttribute("data-id");
    //khi mà a bấm thì m làm gì?

    //lấy id của thằng vừa nhấn
    let valuePlayer = event.target.id;
    //so sánh
    let result = compare(valuePlayer, valueComputer); //1 | 0 || -1
    console.log(result);
    //duyệt các nút và xóa actived
    playerItem.forEach((_item) => {
      _item.classList.remove("actived");
      _item.style.pointerEvents = "none";
    });
    //thêm actived cho nút vừa nhấn
    event.target.classList.add("actived");
    //kết luận in thông báo
    let alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    let msg = "";
    if (result == 1) {
      msg = "Bạn thắng";
      alertDiv.classList.add("alert-success");
    } else if (result == 0) {
      msg = "Bạn hòa";
      alertDiv.classList.add("alert-warning");
    } else {
      msg = "Bạn thua";
      alertDiv.classList.add("alert-dark");
    }
    alertDiv.textContent = msg;
    document.querySelector(".notification").appendChild(alertDiv);
    //hiện nút chơi lại
    document.querySelector("#play-again").classList.remove("d-none");
  });
});
// sự kiện click chơi lại
document.querySelector(".btn-play-again").addEventListener("click", (event) => {
  //khôi phục không p reset
  clearInterval(interval);
  interval = setInterval(handleChange, 100);
  //
  playerItem.forEach((item) => {
    item.classList.remove("actived");
    item.style.pointerEvents = "";
  });
  //xóa thông báo và khối nút chơi lại
  document.querySelector(".notification").innerHTML = "";
  document.querySelector("#play-again").classList.add("d-none");
});
