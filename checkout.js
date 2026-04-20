const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const checkoutMessage = document.getElementById("checkoutMessage");

const fullName = document.getElementById("fullName");
const emailAddress = document.getElementById("emailAddress");
const phoneNumber = document.getElementById("phoneNumber");
const addressInput = document.getElementById("addressInput");
const paymentMethod = document.getElementById("paymentMethod");

let cart = JSON.parse(localStorage.getItem("jefit_cart")) || [];

function renderCheckout() {
  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
    checkoutTotal.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach(function(item) {
    total += item.price * item.quantity;

    checkoutItems.innerHTML += `
      <div class="checkout-item">
        <p><strong>${item.name}</strong></p>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
    `;
  });

  checkoutTotal.textContent = total;
}

placeOrderBtn.addEventListener("click", function() {

  const name = fullName.value.trim();
  const email = emailAddress.value.trim();
  const phone = phoneNumber.value.trim();
  const address = addressInput.value.trim();

  if (name === "" || name.length > 20 || !/^[a-zA-Z\s]+$/.test(name)) {
    checkoutMessage.textContent = "Name must be under 20 characters and contain only letters.";
    checkoutMessage.style.color = "red";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    checkoutMessage.textContent = "Please enter a valid email address.";
    checkoutMessage.style.color = "red";
    return;
  }

  if (!/^\+?[0-9]+$/.test(phone)) {
    checkoutMessage.textContent = "Phone number must contain only numbers.";
    checkoutMessage.style.color = "red";
    return;
  }

  if (address === "") {
    checkoutMessage.textContent = "Address cannot be empty.";
    checkoutMessage.style.color = "red";
    return;
  }

  if (paymentMethod.value === "") {
    checkoutMessage.textContent = "Please select a payment method.";
    checkoutMessage.style.color = "red";
    return;
  }

  if (cart.length === 0) {
    checkoutMessage.textContent = "Your cart is empty.";
    checkoutMessage.style.color = "red";
    return;
  }

  checkoutMessage.textContent = "Order placed successfully!";
  checkoutMessage.style.color = "lightgreen";

  localStorage.removeItem("jefit_cart");
  cart = [];
  renderCheckout();

  fullName.value = "";
  emailAddress.value = "";
  phoneNumber.value = "";
  addressInput.value = "";
  paymentMethod.value = "";
});
renderCheckout();