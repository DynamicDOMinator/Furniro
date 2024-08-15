const cartShop = document.querySelector(".cartShop");
const cartIcon = document.querySelector(".cart-icon");
const cartList = document.querySelector(".cart-list");
const closeIcon = document.querySelector(".close-icon");
const cartBtn = document.querySelector(".goToShop");
const countItem = document.querySelector(".countItems");
const countNum = document.querySelector(".count-num");
const countWish = document.querySelector(".countWish");
const countWishNum = document.querySelector(".count-wish");
const shopItems = document.querySelector(".shop-items");
const subShop = document.querySelector(".subShop");
const totalShop = document.querySelector(".totalShop");
const checkoutBtn = document.querySelector(".CheckOut");
const subtotalElement = document.querySelector(".price");
const shopPage = document.querySelector(".shop-page");

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

function renderWishList() {
  const wishListContainer = document.querySelector(".wishlist-container");
  const wishListItems = JSON.parse(localStorage.getItem("WISHLIST")) || [];

  // Clear the container before rendering items
  wishListContainer.innerHTML = "";

  wishListItems.forEach((cart) => {
    let badge = "";
    if (cart.discount > 0) {
      badge += `<div class="absolute bg-red-400 px-1 py-3 rounded-full top-4 right-5">
          <p class="text-white text-base">-${cart.discount}%</p>
        </div>`;
    }

    if (cart.isNew) {
      badge += `<div class="absolute bg-teal-400 px-2 py-3 rounded-full top-4 right-5">
          <p class="text-white text-base">New</p>
        </div>`;
    }

    let discountPrice = "";
    if (cart.dellPrice > 0) {
      discountPrice += `<span class="md:pl-6 pl-2"><del class="text-gray-400 text-xs md:text-base">${cart.dellPrice} $</del></span>`;
    }
    wishListContainer.innerHTML += `
    <div class="relative z-10 mt-6 md:mt-0 product-cart w-[140px] md:w-[300px] bg-gray-200 rounded-md">
        
        <img class="w-[100%] rounded-md" src="${cart.img}" alt="product.png">
        <div class="content px-2 py-4 md:px-5 md:py-7">
          <p class="text-2xl font-bold">${cart.name}</p>
          <p class="text-gray-500">${cart.kind}</p>
          <p class="text-sm md:text-base pt-3 md:pt-0">${cart.price}$ ${discountPrice}</p>
        </div>
        ${badge}
        <div class="overlay absolute w-full h-full top-0 bg-black/50 rounded-md hidden opacity-0 transition-opacity duration-300 ease-in-out">
        <div onclick="removeWishItem(${cart.id})" class="absolute cursor-pointer left-2 top-2 bg-gray-400 text-white px-2 font-bold rounded-full text-sm">x</div>
          <div class="w-full h-full flex flex-col justify-center items-center">
            <button class="bg-white addcart text-warning-600 font-semibold px-3 py-2 md:px-16 md:py-4" onclick="addToCart(${cart.id})">Add to cart</button>
            <div class="flex w-full justify-center items-center gap-2 md:gap-3 mt-5">
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // Add event listeners after rendering the products
  const productCarts = document.querySelectorAll(".product-cart");
  productCarts.forEach((productCart) => {
    const overlay = productCart.querySelector(".overlay");

    productCart.addEventListener("mouseenter", () => {
      overlay.classList.remove("hidden");
      overlay.classList.remove("opacity-0");
      overlay.classList.add("opacity-100");
    });

    productCart.addEventListener("mouseleave", () => {
      overlay.classList.remove("opacity-100");
      overlay.classList.add("opacity-0");
      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 300); // Match the duration of the transition
    });
  });
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  if (cart.some((item) => item.id === id)) {
    Swal.fire({
      title: "Your Item Already In Cart",
      icon: "info",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
  } else {
    const item = products.find((product) => product.id === id);
    if (item) {
      cart.push(item);
      localStorage.setItem("CART", JSON.stringify(cart)); // Update local storage
      updateCart(); // Update cart display after adding the item
    }
  }
}

function updateCart() {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  cartShop.innerHTML = "";
  cart.forEach((item) => {
    cartShop.innerHTML += `
      <div class="flex Hello mt-5 justify-between items-center">
        <div>
          <img class="md:w-36 md:h-28 w-20 rounded-lg" src="${item.img}" alt="">
        </div>
        <div>
          <p class="font-semibold">${item.name}</p>
          <div class="flex gap-5">
            <p>1 <span>X</span></p>
            <p class="text-warning-600">${item.price}$</p>
          </div>
        </div>
        <div>
          <img onclick="removeItem(${item.id})" class="cursor-pointer" src="./imges/close.png" alt="">
        </div>
      </div>
    `;
  });

  updateCartCount(); // Update item count in the cart after rendering items
}

function removeItem(id) {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  const updatedCart = cart.filter((item) => item.id !== id);
  localStorage.setItem("CART", JSON.stringify(updatedCart));
  updateCart(); // Update cart display after removing the item
  updateWishCount();
}

function removeWishItem(id) {
  const wishList = JSON.parse(localStorage.getItem("WISHLIST")) || [];
  const updatedWishList = wishList.filter((item) => item.id !== id);
  localStorage.setItem("WISHLIST", JSON.stringify(updatedWishList));
  renderWishList();
  updateWishCount();
  updateSubTotal();
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

function updateWishCount() {
  const wishList = JSON.parse(localStorage.getItem("WISHLIST")) || [];

  // Update the wishlist count display
  countWishNum.innerHTML = wishList.length;

  if (wishList.length === 0) {
    // Hide the wishlist count if empty and redirect to the home page
    countWish.classList.add("hidden");
    window.location.href = "index.html";
  } else {
    // Show the wishlist count if not empty
    countWish.classList.remove("hidden");
  }
}

cartBtn.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  if (cart.length === 0) {
    Swal.fire({
      title: "Your Shopping Cart Is Empty",
      icon: "warning",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
  } else {
    window.location.href = "cart.html";
  }
});

function updateSubTotal() {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  if (cart.length === 0) return; // Exit if cart is empty

  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const total = subtotal * 1.2; // Assuming 20% tax
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);

  // Ensure these elements exist
  const subShop = document.querySelector(".subShop");
  const totalShop = document.querySelector(".totalShop");
  const subtotalElement = document.querySelector(".price");

  if (subtotalElement) {
    subtotalElement.innerText = `${formattedSubtotal}$`;
  }

  localStorage.setItem("subtotal", formattedSubtotal);
  localStorage.setItem("total", formattedTotal);
}

checkoutBtn.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  if (cart.length == 0) {
    Swal.fire({
      title: "Your cart list is Empty",
      icon: "info",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
  } else {
    window.location.href = "checkout.html";
  }
});

shopPage.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  if (cart.length == 0) {
    Swal.fire({
      title: "Your cart list is Empty",
      icon: "info",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
  } else {
    window.location.href = "cart.html";
  }
});

// Call `renderWishList` to update the wishlist display when the page loads
window.onload = function () {
  renderWishList();
  updateCart(); // Ensure the cart is updated when the page loads
  updateCartCount(); // Update item count in the cart
  updateWishCount(); // Update item count in the wishlist
  updateSubTotal();
};
