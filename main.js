import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

console.log("Hello world!");

// axios 請求資料

let dataNew = [];
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
    dataNew = response.data.data;
    render();
  })
  .catch(function (error) {
    console.log(error);
  });

// 新增三筆新的 data
const ticketCardArea = document.querySelector('.ticketCard-area');

function render() {
  let str = '';
  // 迴圈 for 三筆 data
  dataNew.forEach(function (item) {
    str += `<li class="ticketCard col col-md-6 col-lg-4 mb-9">
    <div class="card h-100 shadow-style">
      <div class="position-relative">
        <img class="ticketCard-img card-img-top" src="${item.imgUrl}" alt="travel_1">
        <!-- 如果有 badge，使用 rounded-end 沒有效果 -->
        <span
          class="ticketCard-region badge-style bg-secondary text-white Noto-Sans-TC fs-5 py-2 px-5 position-absolute top-0 start-0">
          ${item.area}
        </span>
        <!-- badge-rank 縮放會跑版 -->
        <span
          class="ticketCard-rank badge-style d-block text-center bg-primary text-white Noto-Sans-TC fs-6 py-1 px-2 position-absolute bottom-0 start-0">
          ${item.rate}
        </span>
      </div>
      <div class="card-body px-5 pt-5 pb-3">
        <!-- ticket-info -->
        <a class="ticketCard-name text-decoration-none d-block fs-4 text-primary fw-medium pb-1 m-0 border-bottom border-2 border-primary text-truncate"
          href="#">
          ${item.name}</a>
        <p class="ticketCard-description h-144 card-text fs-6 text-gray Noto-Sans-TC mt-4 mb-5">
          ${item.description}
        </p>
        <!-- number & price -->
        <div class="d-flex justify-content-between align-items-center">
          <div class="num-info d-flex align-items-center">
            <span class="material-icons text-primary me-1">
              info
            </span>
            <p class="ticketCard-num fs-6 text-primary fw-medium my-0">剩下最後 ${item.group} 組</p>
          </div>
          <div class="price-info d-flex align-items-center">
            <p class="fs-6 text-primary Noto-Sans-TC fw-medium mb-0 me-1">TWD</p>
            <p class="ticketCard-price fs-2 text-primary Roboto fw-medium mb-0">$${item.price}</p>
          </div>
        </div>
      </div>
    </div>
    </li>`;
  });
  // 新增至 ticketCardArea
  ticketCardArea.innerHTML = str;
};



// 篩選
const locationFilter = document.querySelector('.regionSearch');
const findAreaCount = document.querySelector('.findAreaCount');

locationFilter.addEventListener("change", function (e) {
  let str = '';
  let count = 0;

  dataNew.forEach(function (item) {
    const listHTML = `<li class="ticketCard col col-md-6 col-lg-4 mb-9">
        <div class="card h-100 shadow-style">
          <div class="position-relative">
            <img class="ticketCard-img card-img-top" src="${item.imgUrl}" alt="travel_1">
            <!-- 如果有 badge，使用 rounded-end 沒有效果 -->
            <span
              class="ticketCard-region badge-style bg-secondary text-white Noto-Sans-TC fs-5 py-2 px-5 position-absolute top-0 start-0">
              ${item.area}
            </span>
            <!-- badge-rank 縮放會跑版 -->
            <span
              class="ticketCard-rank badge-style d-block text-center bg-primary text-white Noto-Sans-TC fs-6 py-1 px-2 position-absolute bottom-0 start-0">
              ${item.rate}
            </span>
          </div>
          <div class="card-body px-5 pt-5 pb-3">
            <!-- ticket-info -->
            <a class="ticketCard-name text-decoration-none d-block fs-4 text-primary fw-medium pb-1 m-0 border-bottom border-2 border-primary text-truncate"
              href="#">
              ${item.name}</a>
            <p class="ticketCard-description h-144 card-text fs-6 text-gray Noto-Sans-TC mt-4 mb-5">
              ${item.description}
            </p>
            <!-- number & price -->
            <div class="d-flex justify-content-between align-items-center">
              <div class="num-info d-flex align-items-center">
                <span class="material-icons text-primary me-1">
                  info
                </span>
                <p class="ticketCard-num fs-6 text-primary fw-medium my-0">剩下最後 ${item.group} 組</p>
              </div>
              <div class="price-info d-flex align-items-center">
                <p class="fs-6 text-primary Noto-Sans-TC fw-medium mb-0 me-1">TWD</p>
                <p class="ticketCard-price fs-2 text-primary Roboto fw-medium mb-0">$${item.price}</p>
              </div>
            </div>
          </div>
        </div>
      </li>`;

    if (e.target.value == item.area) {
      str += listHTML;
      count += 1;
    } else if (e.target.value == '全部地區') {
      str += listHTML;
      // 如果寫 count += data.length; 會顯示 9 筆資料
      count = dataNew.length;
    }
  })
  ticketCardArea.innerHTML = str;
  findAreaCount.textContent = `本次搜尋共 ${count} 筆資料`;
})

const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const addTicketBtn = document.querySelector(".addTicket-btn");

// 新增
function addData() {
  let obj = {};
  obj.id = dataNew.length + 1;
  obj.name = ticketName.value;
  obj.imgUrl = ticketImgUrl.value;
  obj.area = ticketRegion.value;
  obj.description = ticketDescription.value;
  obj.group = ticketNum.value;
  obj.price = ticketPrice.value;
  obj.rate = ticketRate.value;
  dataNew.push(obj);
  console.log(dataNew);
};

addTicketBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addData();
  render();
  ticketName.value = "";
  ticketImgUrl.value = "";
  ticketRegion.value = "";
  ticketDescription.value = "";
  ticketNum.value = "";
  ticketPrice.value = "";
  ticketRate.value = "";
});