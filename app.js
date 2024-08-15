const cartIcon = document.querySelector(".cart-icon");
const cartList = document.querySelector(".cart-list");
const closeIcon = document.querySelector(".close-icon");
const menuIcon = document.querySelector(".menu-icon");
const heartIcon = document.querySelector(".heart-icon");
const logIcon = document.querySelector(".log-icon");
const cartShop = document.querySelector(".cartShop");
const subtotalElement = document.querySelector(".price");
const countItem = document.querySelector(".countItems");
const countNum = document.querySelector(".count-num");
const cartBtn = document.querySelector(".goToShop");
const checkoutBtn = document.querySelector(".CheckOut");
const countWish = document.querySelector(".countWish");
const countWishNum = document.querySelector(".count-wish");
const buyNow = document.querySelector(".buynow");
const productsScroll = document.querySelector(".product-sec");
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



const allProducts = document.querySelector(".products");
let visibleProducts = 6; // Number of products to show initially

function renderProducts() {
  allProducts.innerHTML = ""; // Clear the product container first
  products.slice(0, visibleProducts).forEach((cart) => {
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

    allProducts.innerHTML += `
      <div class="relative z-10 mt-6 md:mt-0 product-cart w-[140px] md:w-[300px] bg-gray-200 rounded-md" >
        <img class="w-[100%] h-[150px] md:h-[316px] rounded-md" src="${cart.img}" alt="product.png">
        <div class="content px-2 py-4 md:px-5 md:py-7">
          <p class="text-2xl font-bold">${cart.name}</p>
          <p class="text-gray-500">${cart.kind}</p>
          <p class="text-sm md:text-base pt-3 md:pt-0">${cart.price}$ ${discountPrice}</p>
        </div>
        ${badge}
        <div class="overlay absolute w-full h-full top-0 bg-black/50 rounded-md hidden opacity-0 transition-opacity duration-300 ease-in-out">
          <div class="w-full h-full flex flex-col justify-center items-center">
            <button class="bg-white addcart text-warning-600 font-semibold px-3 py-2 md:px-16 md:py-4" onclick="addToCart(${cart.id})">Add to cart</button>
            <div class="flex w-full justify-center items-center gap-2 md:gap-3 mt-5">
              <img onclick="addToWishList(${cart.id})" class="cursor-pointer px-1 py-1 md:px-0 md:py-0 rounded-md " src="./imges/like.png" alt="like">
              <p class="text-white">Like</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // Add event listeners for hover effects after rendering products
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

  // Show "Show More" button if there are more products to display
  const showMoreButton = document.querySelector(".show-more");
  if (products.length > visibleProducts) {
    showMoreButton.classList.remove("hidden");
  } else {
    showMoreButton.classList.add("hidden");
  }
}

// Event listener for the "Show More" button
document.querySelector(".show-more").addEventListener("click", () => {
  visibleProducts = products.length; // Show all products
  renderProducts();
});

// Initial render
renderProducts();

// add items to cart

let cart = JSON.parse(localStorage.getItem("CART")) || [];

function addToCart(id) {
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
    cart.push(item);
    updateCart();
    updateCartCount();
  }
}

function updateCart() {
  cartShop.innerHTML = "";
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
  localStorage.setItem("CART", JSON.stringify(cart));
  updateSubtotal();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
  updateCartCount();
}
function updateSubtotal() {
  // Calculate the subtotal
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  // Format the subtotal to two decimal places
  const formattedSubtotal = subtotal.toFixed(2);

  // Store subtotal and total in localStorage
  localStorage.setItem("subtotal", formattedSubtotal);
  localStorage.setItem("total", formattedSubtotal); // Assuming total is same as subtotal here

  // Update the subtotal element with the formatted value
  subtotalElement.innerText = `${formattedSubtotal}$`;
}

function updateCartCount() {
  countItem.classList.contains("hidden");
  countItem.classList.remove("hidden");
  countNum.innerHTML = cart.length;
  if (cart.length == 0) {
    countItem.classList.add("hidden");
  }
}

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

// Update the wishlist count initially and after adding items
window.onload = function () {
  updateCart();
  updateCartCount();
  updateWishCount();
};

// Example function to add items to wishlist
function addToWishList(id) {
  const wishList = JSON.parse(localStorage.getItem("WISHLIST")) || [];

  if (wishList.some((item) => item.id === id)) {
    Swal.fire({
      title: "The item is already in the wishlist",
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
    wishList.push(item);
    localStorage.setItem("WISHLIST", JSON.stringify(wishList));

    Swal.fire({
      title: "Item has been added to the wishlist",
      icon: "success",
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

    // Update wishlist count after adding an item
    updateWishCount();
  }
}

cartBtn.addEventListener("click", () => {
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

checkoutBtn.addEventListener("click", () => {
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

heartIcon.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default behavior like form submission or anchor tag navigation

  const wishList = JSON.parse(localStorage.getItem("WISHLIST")) || [];

  if (wishList.length === 0) {
    Swal.fire({
      title: "Your Wish list is Empty",
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
    window.location.href = "wishList.html";
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // Enable pagination interaction
    },

    autoplay: {
      delay: 3000, // Delay between transitions (in milliseconds)
      disableOnInteraction: false, // Continue autoplay after user interactions
    },

    // Space between slides
    spaceBetween: 20, // Adjust this value to increase or decrease the space

    // General configuration
    slidesPerView: 1, // Default: 1 slide at a time
    slidesPerGroup: 1, // Default: Move 1 slide at a time

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 640px (Tablets and larger)
      640: {
        slidesPerView: 2, // Display 2 slides at a time
        slidesPerGroup: 2, // Move 2 slides at a time
        spaceBetween: 20, // Adjust spacing for medium screens
      },
      // when window width is >= 1024px (Larger screens)
      1024: {
        slidesPerView: 2, // Display 2 slides at a time
        slidesPerGroup: 2, // Move 2 slides at a time
        spaceBetween: 20, // Adjust spacing for large screens
      },
    },
  });
});

buyNow.addEventListener("click", (e) => {
  e.preventDefault();
  productsScroll.scrollIntoView({ behavior: "smooth" });
});

shopPage.addEventListener("click", () => {
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
})