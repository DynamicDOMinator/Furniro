const inputs = document.querySelectorAll(".inp");
const contactBtn = document.querySelector(".contact");

contactBtn.addEventListener("click", (event) => {
  let allFilled = true;

  // Prevent form submission if within a form tag
  event.preventDefault();

  for (let input of inputs) {
    if (input.value.trim() === "") {
      allFilled = false;
      break; // Exit the loop early if an empty field is found
    }
  }

  if (!allFilled) {
    Swal.fire({
      icon: "error",
      title: "Incomplete Form",
      text: "Please complete all fields in the form",
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your order has been placed successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});


