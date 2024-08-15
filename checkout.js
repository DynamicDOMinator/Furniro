const cartIcon = document.querySelector(".cart-icon");
const heartIcon = document.querySelector(".heart-icon");
const countWish = document.querySelector(".countWish");
const countWishNum = document.querySelector(".count-wish");
const productName = document.getElementById("product-name");
const shopPage = document.querySelector(".shop-page");
const orderBtn = document.querySelector(".placeOrder");

cartIcon.style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("CART")) || [];
  const subtotalElement = document.querySelector(".subtotal");
  const totalElement = document.getElementById("total");
  const productNameElement = document.getElementById("product-name");

  const subtotal = localStorage.getItem("subtotal");
  const total = localStorage.getItem("total");

  if (cart.length > 0) {
    // Update product names and quantities
    let productNames = cart
      .map((item) => `${item.name} x ${item.quantity || 1}`)
      .join(", ");
    productNameElement.innerText = productNames;
  } else {
    productNameElement.innerText = "No products in cart";
  }

  if (subtotal && total) {
    subtotalElement.innerText = `${subtotal}$`;
    totalElement.innerText = `${total}$`;
  } else {
    subtotalElement.innerText = "0.00$";
    totalElement.innerText = "0.00$";
  }
});







heartIcon.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default behavior like form submission or anchor tag navigation

  const wishList = JSON.parse(localStorage.getItem("WISHLIST")) || [];
  console.log(wishList.length);
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













document.addEventListener("DOMContentLoaded", () => {
  const orderBtn = document.querySelector(".placeOrder");
  const inputs = document.querySelectorAll(
    "input[required], input[type='text'], input[type='radio'], input[type='number']"
  );
  const textAreas = document.querySelectorAll("textarea");

  orderBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let allValid = true;

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        allValid = false;
        input.classList.add("border-red-500"); // Add some styling for invalid inputs if needed
      } else {
        input.classList.remove("border-red-500");
      }
    });

    if (allValid) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your order has been placed successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Clear all input fields and text areas after successful order
        inputs.forEach((input) => {
          if (input.type === "radio" || input.type === "checkbox") {
            input.checked = false; // Uncheck radio and checkbox inputs
          } else {
            input.value = ""; // Clear text, number, etc.
          }
        });

        textAreas.forEach((textarea) => {
          textarea.value = ""; // Clear text areas
        });

        // Redirect to index.html after clearing inputs
        window.location.href = "index.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Failed",
        text: "Please fill out all required fields correctly.",
      });
    }
  });
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