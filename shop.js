const products = [
  {
    id: 1,
    name: "Whey Protein",
    category: "supplements",
    price: 45,
    rating: 5,
    image: "images/shop1.jpg",
    description: "High-quality whey protein for muscle recovery and growth."
  },
  {
    id: 2,
    name: "Gym T-Shirt",
    category: "apparel",
    price: 20,
    rating: 4,
    image: "images/shop2.jpg",
    description: "Comfortable gym t-shirt made for intense workouts."
  },
  {
    id: 3,
    name: "Shaker Bottle",
    category: "accessories",
    price: 12,
    rating: 4,
    image: "images/shop3.jpg",
    description: "Durable shaker bottle for protein shakes and hydration."
  },
  {
    id: 4,
    name: "Dumbbell Set",
    category: "equipment",
    price: 90,
    rating: 5,
    image: "images/shop4.jpg",
    description: "Strong and reliable dumbbell set for home or gym use."
  },
  {
    id: 5,
    name: "Creatine",
    category: "supplements",
    price: 30,
    rating: 5,
    image: "images/shop5.jpg",
    description: "Pure creatine monohydrate for strength and performance."
  },
  {
    id: 6,
    name: "Training Shorts",
    category: "apparel",
    price: 25,
    rating: 4,
    image: "images/shop6.jpg",
    description: "Lightweight shorts with breathable material."
  },
  {
    id: 7,
    name: "Lifting Gloves",
    category: "accessories",
    price: 18,
    rating: 4,
    image: "images/shop7.jpg",
    description: "Comfortable gloves for better grip and protection."
  },
  {
    id: 8,
    name: "Yoga Mat",
    category: "equipment",
    price: 35,
    rating: 5,
    image: "images/shop8.jpg",
    description: "Soft and supportive mat for yoga and stretching."
  }
];

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const filterButtons = document.querySelectorAll(".filters button");

const productModal = document.getElementById("productModal");
const modalDetails = document.getElementById("modalDetails");
const closeModalBtn = document.getElementById("closeModalBtn");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const wishlistItems = document.getElementById("wishlistItems");

const discountCode = document.getElementById("discountCode");
const applyDiscountBtn = document.getElementById("applyDiscountBtn");
const discountMessage = document.getElementById("discountMessage");

let currentCategory = "all";
let cart = JSON.parse(localStorage.getItem("jefit_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("jefit_wishlist")) || [];
let discount = 0;

function showStars(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "★";
  }
  return stars;
}

function renderProducts(list) {
  productsGrid.innerHTML = "";

  if (list.length === 0) {
    productsGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach(function(product) {
    productsGrid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p class="price">$${product.price}</p>
        <p class="rating">${showStars(product.rating)}</p>

        <div class="product-actions">
          <button onclick="openModal(${product.id})">View Details</button>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
          <button onclick="addToWishlist(${product.id})">Wishlist</button>
        </div>
      </div>
    `;
  });
}

function filterProducts() {
  let result = products.filter(function(product) {
    let sameCategory = currentCategory === "all" || product.category === currentCategory;
    let sameSearch = product.name.toLowerCase().includes(searchInput.value.toLowerCase());
    return sameCategory && sameSearch;
  });

  if (sortSelect.value === "price-low") {
    result.sort(function(a, b) {
      return a.price - b.price;
    });
  }

  if (sortSelect.value === "price-high") {
    result.sort(function(a, b) {
      return b.price - a.price;
    });
  }

  if (sortSelect.value === "rating-high") {
    result.sort(function(a, b) {
      return b.rating - a.rating;
    });
  }

  renderProducts(result);
}

function openModal(id) {
  let product = products.find(function(item) {
    return item.id === id;
  });

  if (!product) return;

  modalDetails.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p><strong>Category:</strong> ${product.category}</p>
    <p><strong>Price:</strong> $${product.price}</p>
    <p><strong>Rating:</strong> ${showStars(product.rating)}</p>
    <p>${product.description}</p>
  `;

  productModal.style.display = "block";
}

function addToCart(id) {
  let product = products.find(function(item) {
    return item.id === id;
  });

  if (!product) return;

  let existing = cart.find(function(item) {
    return item.id === id;
  });

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  localStorage.setItem("jefit_cart", JSON.stringify(cart));
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(function(item) {
    return item.id !== id;
  });

  localStorage.setItem("jefit_cart", JSON.stringify(cart));
  renderCart();
}

function increaseQuantity(id) {
  let item = cart.find(function(product) {
    return product.id === id;
  });

  if (item) {
    item.quantity++;
    localStorage.setItem("jefit_cart", JSON.stringify(cart));
    renderCart();
  }
}

function decreaseQuantity(id) {
  let item = cart.find(function(product) {
    return product.id === id;
  });

  if (item) {
    item.quantity--;

    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      localStorage.setItem("jefit_cart", JSON.stringify(cart));
      renderCart();
    }
  }
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach(function(item) {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p><strong>${item.name}</strong></p>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <button onclick="increaseQuantity(${item.id})">+</button>
        <button onclick="decreaseQuantity(${item.id})">-</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  });

  total = total - discount;

  if (total < 0) {
    total = 0;
  }

  cartTotal.textContent = total;
}

function addToWishlist(id) {
  let product = products.find(function(item) {
    return item.id === id;
  });

  if (!product) return;

  let found = wishlist.find(function(item) {
    return item.id === id;
  });

  if (!found) {
    wishlist.push(product);
    localStorage.setItem("jefit_wishlist", JSON.stringify(wishlist));
    renderWishlist();
  }
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(function(item) {
    return item.id !== id;
  });

  localStorage.setItem("jefit_wishlist", JSON.stringify(wishlist));
  renderWishlist();
}

function renderWishlist() {
  wishlistItems.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistItems.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  wishlist.forEach(function(item) {
    wishlistItems.innerHTML += `
      <div class="wishlist-item">
        <p><strong>${item.name}</strong></p>
        <p>Price: $${item.price}</p>
        <button onclick="removeFromWishlist(${item.id})">Remove</button>
      </div>
    `;
  });
}

filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    currentCategory = button.getAttribute("data-category");
    filterProducts();
  });
});

searchInput.addEventListener("input", function() {
  filterProducts();
});

sortSelect.addEventListener("change", function() {
  filterProducts();
});

applyDiscountBtn.addEventListener("click", function() {
  let code = discountCode.value.trim().toUpperCase();

  if (code === "FIT10") {
    discount = 10;
    discountMessage.textContent = "Discount code applied successfully!";
    discountMessage.style.color = "lightgreen";
  } else if (code === "GYM20") {
    discount = 20;
    discountMessage.textContent = "Discount code applied successfully!";
    discountMessage.style.color = "lightgreen";
  } else {
    discount = 0;
    discountMessage.textContent = "Invalid discount code.";
    discountMessage.style.color = "red";
  }

  renderCart();
});

closeModalBtn.addEventListener("click", function() {
  productModal.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target === productModal) {
    productModal.style.display = "none";
  }
});


renderProducts(products);
renderCart();
renderWishlist();

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutMessage = document.getElementById("checkoutMessage");

checkoutBtn.addEventListener("click", function() {
  if (cart.length === 0) {
    checkoutMessage.textContent = "Your cart is empty.";
    checkoutMessage.style.color = "red";
    return;
  }

  checkoutMessage.textContent = "Order placed successfully!";
  checkoutMessage.style.color = "lightgreen";

  cart = [];
  localStorage.setItem("jefit_cart", JSON.stringify(cart));
  renderCart();
});