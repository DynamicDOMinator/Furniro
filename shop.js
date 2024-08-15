const shopItems = document.querySelector(".shop-items");
const subShop = document.querySelector(".subShop");
const totalShop = document.querySelector(".totalShop");
const cartIcon = document.querySelector(".cart-icon");
const cartList = document.querySelector(".cart-list");
const closeIcon = document.querySelector(".close-icon");
const menuIcon = document.querySelector(".menu-icon");
const heartIcon = document.querySelector(".heart-icon");
const logIcon = document.querySelector(".log-icon");
const cartShop = document.querySelector(".cartShop");
const countItem = document.querySelector(".countItems");
const countNum = document.querySelector(".count-num");
const subtotalElement = document.querySelector(".price");
const countWish = document.querySelector(".countWish");
const countWishNum = document.querySelector(".count-wish");
cartList.classList.add("hidden");

cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  if (cartList.classList.contains("animate__slideInDown")) {
    cartList.classList.remove("animate__slideInDown");
    cartList.classList.add("animate__slideOutUp");
    setTimeout(() => {
      cartList.classList.add("hidden");
    }, 1200); // Match the duration of the animation
  } else {
    cartList.classList.remove("hidden");
    cartList.classList.remove("animate__slideOutUp");
    cartList.classList.add("animate__slideInDown");
  }
});

closeIcon.addEventListener("click", () => {
  cartList.classList.remove("animate__slideInDown");
  cartList.classList.add("animate__slideOutUp");
  setTimeout(() => {
    cartList.classList.add("hidden");
  }, 500); // Match the duration of the animation
});

menuIcon.addEventListener("click", () => {
  const heartDisplay = getComputedStyle(heartIcon).display;
  const logDisplay = getComputedStyle(logIcon).display;
  const cartDisplay = getComputedStyle(cartIcon).display;
  const countDisplay = getComputedStyle(countItem).display;

  if (
    heartDisplay === "block" &&
    logDisplay === "block" &&
    cartDisplay === "block" &&
    countDisplay === "block"
  ) {
    heartIcon.style.display = "none";
    logIcon.style.display = "none";
    cartIcon.style.display = "none";
    countItem.style.display = "none";
  } else {
    heartIcon.style.display = "block";
    logIcon.style.display = "block";
    cartIcon.style.display = "block";
    countItem.style.display = "block";
  }
});
function updateCart() {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  cartShop.innerHTML = "";
  if (cart.length === 0) {
    window.location.href = "index.html";
  }
  cart.forEach((item) => {
    cartShop.innerHTML += `
  <div class="flex Hello mt-5 justify-between items-center">
            <div>
                <img class="md:w-36 md:h-28 w-20 rounded-lg" src="${item.img}" alt="">
            </div>
            <div>
                <p class="font-semibold">${item.name}</p>
                <div class="flex gap-5 ">
                    <p>1 <span>X</span></p>
                    <p class="text-warning-600">${item.price}$</p>
                </div>
        
            </div>
            <div>
                <img onclick="removeItem(${item.id})"  class="cursor-pointer" src="./imges/close.png" alt="">
            </div>
        
        </div>
  
  
    `;
  });
}

function shopItemsRender() {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  shopItems.innerHTML = "";
  if (cart.length === 0) {
    window.location.href = "index.html";
  }
  cart.forEach((item, index) => {
    shopItems.innerHTML += `
      <tr class="w-full">
        <td class="py-2 md:px-4 pl-2 gap-1 md:gap-4 text-xs md:text-lg flex items-center">
          <img src="${
            item.img
          }" alt="Product Image" class="w-12 h-12 rounded md:mr-4">
          ${item.name}
        </td>
        <td class="py-2 md:px-4 px-1 text-gray-600">${item.price}$</td>
        <td class="py-2 md:px-4 px-1 ">
          <input type="number" value="${
            item.quantity || 1
          }" class="w-12 text-center border rounded" data-index="${index}" min="1" oninput="validity.valid||(value='1'); updateQuantity(${index}, this.value);">
        </td>
        <td class="py-2 md:px-4 px-1 text-gray-600" id="total-price-${index}">${(
      item.price * (item.quantity || 1)
    ).toFixed(2)}$</td>
        <td class="py-2 md:px-4 px-1 text-gray-600">
          <button class="text-yellow-600 remove-item" onclick="removeItem(${
            item.id
          })">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </td>
      </tr>
    `;
  });
  updateSubTotal();
  addInputEventListeners();
}

function addInputEventListeners() {
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      const index = event.target.getAttribute("data-index");
      const cart = JSON.parse(localStorage.getItem("CART")) || [];
      const quantity = parseInt(event.target.value);
      cart[index].quantity = quantity;
      localStorage.setItem("CART", JSON.stringify(cart));
      updateItemTotal(index);
      updateSubTotal();
    });
  });
}

function updateQuantity(index, quantity) {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  cart[index].quantity = parseInt(quantity) || 1;
  localStorage.setItem("CART", JSON.stringify(cart));
  updateItemTotal(index);
  updateSubTotal();
}

function updateItemTotal(index) {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  const item = cart[index];
  const total = (item.price * item.quantity).toFixed(2);
  document.getElementById(`total-price-${index}`).innerText = `${total}$`;
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("CART")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("CART", JSON.stringify(cart));
  shopItemsRender();
  updateSubTotal();
  updateCartCount();
  updateCart();
}
function updateSubTotal() {
  // Get the cart items from localStorage
  const cart = JSON.parse(localStorage.getItem("CART")) || [];

  // Calculate the subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Calculate the total (assuming it's subtotal * 1.2 for tax or similar)
  const total = subtotal * 1.2;

  // Format the values to two decimal places
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);

  // Update the DOM with the calculated values
  subShop.innerText = `${formattedSubtotal}$`;
  totalShop.innerText = `${formattedTotal}$`;
  subtotalElement.innerText = `${formattedSubtotal}$`;
  // Store the updated values back in localStorage
  localStorage.setItem("subtotal", formattedSubtotal);
  localStorage.setItem("total", formattedTotal);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  countItem.classList.contains("hidden");
  countItem.classList.remove("hidden");
  countNum.innerHTML = cart.length;
  if (cart.length == 0) {
    countItem.classList.add("hidden");
  }
}

shopItemsRender();


function updateWishCount() {
  // Retrieve the latest wishlist from localStorage
  const wishList = JSON.parse(localStorage.getItem("WISHLIST")) || [];

  countWish.classList.remove("hidden");
  countWishNum.innerHTML = wishList.length;

  // Hide count if wishlist is empty
  if (wishList.length === 0) {
    countWish.classList.add("hidden");
  }
}

updateWishCount();



window.onload = function () {
  updateCart();
  updateCartCount();
};
