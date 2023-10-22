import { products } from '../js/array_demo.js';
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');
const dangnhap = document.getElementById('dangnhap');
const addcart = document.getElementsByClassName('btn addcart');
const dangky = document.getElementById('dangky');
const login = document.getElementsByClassName('login-register')[0];

const quantity_cart = document.getElementsByClassName('quantity_cart');
const main = () => {
  let currentIndex = 0;

  function updateSlider() {
    const translateX = -currentIndex * 100; // Translate by percentage
    slider.style.transform = `translateX(${translateX}%)`;
  }

  function previousSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1;
    }
    updateSlider();
  }

  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  }
  previousButton.addEventListener('click', previousSlide);
  nextButton.addEventListener('click', nextSlide);

  // Initial setup
  updateSlider();

  const sanpham = JSON.parse(localStorage.getItem('sanpham')) || products;

  // get user and cart
  const currentuser = JSON.parse(localStorage.getItem('currentuser')) || '';

  const currentcart = JSON.parse(localStorage.getItem('currentcart')) || [];

  if (currentuser) {
    console.log(login);
    login.innerHTML = '';
    let div = document.createElement('div');
    div.innerHTML = `<div class="dropdown">
    <button class="dropbtn"><i class="far fa-user"></i></button>
    <div class="dropdown-content">
      <a href="#">${currentuser.email}</a>
      <a href="./user/orderhistory.html">Đơn hàng</a>
      <a href="./block/logout.html">Đăng xuất</a>
    </div>
  </div>`;
    login.appendChild(div);
  }

  for (let i = 0; i < addcart.length; i++) {
    addcart[i].addEventListener('click', () => {
      let product_id = parseInt(addcart[i].getAttribute('data-product'));

      addtocart(product_id);
    });
  }
  // count quantiy

  let countquantity = () => {
    if (currentcart[0]) {
      let quantity = 0;
      currentcart.forEach((element) => {
        quantity += element.soluong;
      });
      quantity_cart[0].innerHTML = `${quantity.toLocaleString()}`;
    } else {
      quantity_cart[0].innerHTML = '0';
    }
  };

  countquantity();
  // add to cart

  let addtocart = (product_id) => {
    let product = sanpham.find((x) => x.id == product_id);

    if (currentuser) {
      if (currentcart.length > 0) {
        let checkcart = currentcart.findIndex((x) => x.masanpham == product_id);

        if (checkcart != -1) {
          let updatecart = currentcart[checkcart];

          updatecart.soluong = updatecart.soluong + 1;
          currentcart[checkcart] = updatecart;
          localStorage.setItem('currentcart', JSON.stringify(currentcart));
        } else {
          currentcart.push({
            masanpham: product.id,
            gia: product.priceOld,
            soluong: 1,
          });

          localStorage.setItem('currentcart', JSON.stringify(currentcart));
        }
      } else {
        currentcart.push({
          masanpham: product.id,
          gia: product.priceOld,
          soluong: 1,
        });

        localStorage.setItem('currentcart', JSON.stringify(currentcart));
      }
    } else {
      alert('Đăng nhập trước khi mua');
    }
    countquantity();
  };
};
export { main };
