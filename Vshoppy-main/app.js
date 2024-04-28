
const products = [
  { id: 1, name: 'Kettle', price: 300, imageUrl: './kettle.jpg' },
  { id: 2, name: 'Notebooks', price: 50, imageUrl: './71o7XtyLMgL.jpg' },
  { id: 3, name: 'Mattress', price: 2000, imageUrl: './56101508SD05922_01_803x602.jpg' },
  { id: 4, name: 'Cycle', price: 4000, imageUrl: './cycle.jpg' },
  { id: 5, name: 'Umbrella', price: 600, imageUrl: './Umbrella.jpg' },
  { id: 6, name: 'Calculator', price: 400, imageUrl: './C63_4.webp' },
];

const categories = [...new Set(products.map((item)=>
  {return item}))]
  let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
}).join('')

var cart =[];

function addtocart(a){
  cart.push({...categories[a]});
  displaycart();
}
function delElement(a) {
  cart.splice(a, 1);
  displaycart();
}

function displaycart() {
  let total = 0;
  let countElement = document.getElementById("count");
  let cartItemElement = document.getElementById("cartItem");
  let totalElement = document.getElementById("total");
  
  if (countElement && cartItemElement && totalElement) {
    countElement.innerHTML = cart.length; // Update cart count
    
    if (cart.length === 0) {
      cartItemElement.innerHTML = "Your cart is empty";
      totalElement.innerHTML = "Rs. " + 0 + ".00";
    } else {
      cartItemElement.innerHTML = cart.map((item, index) => { // Correct class name and use index
        total += item.price;
        return (
          `<div class='cart-item'>
           <div class='row-img'>
              <img class='rowimg' src=${item.imageUrl}>
            </div>
            <p style='font-size:12px;'>${item.name}</p>
            <h2 style='font-size: 15px;'>Rs. ${item.price}.00</h2>
            <i class='fa-solid fa-trash' onclick='delElement(${index})'></i> <!-- Correct class and pass index -->
          </div>`
        );
      }).join('');
      
      totalElement.innerHTML = "Rs. " + total + ".00";
    }
  } else {
    console.error("One or more required elements not found.");
  }
}
  

function displayProducts() {
  const productListings = document.getElementById('product-listings');
  productListings.innerHTML = '';
  products.forEach((product, index) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Rs. ${product.price}</p>
        <button onclick='addtocart(${index})'>Add to cart</button> <!-- Pass index to addtocart -->
      `;
    productListings.appendChild(productElement);
  });
}

function searchProducts() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
  displayProducts(filteredProducts);
}


window.onload = function () {
  displayProducts();
  displaycart();
};

// app.js

$(document).ready(function() {
  $('#list-item-button').click(function() {
    window.location.href = 'list-item.html'; // Redirect to the list-item page
  });

  $('#item-form').submit(function(event) {
    event.preventDefault(); // Prevent default form submission

    var itemName = $('#item-name').val();
    var itemPrice = $('#item-price').val();

    // Perform AJAX request to add the item to the index page
    $.ajax({
      url: 'add-item.php', // Replace with your backend script to add item
      type: 'POST',
      data: { name: itemName, price: itemPrice },
      success: function(response) {
        // Handle success response
        console.log('Item added successfully.');
        // You can update the index page here with the newly added item
      },
      error: function(xhr, status, error) {
        // Handle error response
        console.error('Error adding item:', error);
      }
    });
  });
});


// app.js

$(document).ready(function() {
  $('#item-form').submit(function(event) {
    event.preventDefault(); // Prevent default form submission

    var itemName = $('#item-name').val();
    var itemPrice = $('#item-price').val();
    var itemImage = $('#item-image').val(); // This should be handled for image upload

    // You can further process the image upload here if required

    // Store the submitted product in localStorage for retrieval by index page
    var product = {
      name: itemName,
      price: itemPrice,
      image: itemImage // This should be the path to the uploaded image
    };

    localStorage.setItem('submittedProduct', JSON.stringify(product));

    // Optionally, you can reset the form fields after submission
    $('#item-form')[0].reset();

    // Redirect back to the index page
    window.location.href = 'index.html';
  });
});
// app.js

$(document).ready(function() {
  // Retrieve the submitted product from localStorage
  var submittedProduct = localStorage.getItem('submittedProduct');

  if (submittedProduct) {
    // Parse the JSON string to get the product object
    var product = JSON.parse(submittedProduct);

    // Construct HTML for the featured product
    var featuredProductHTML = `
      <div class="product">
        <h3>${product.name}</h3>
        <p>Price: Rs. ${product.price}</p>
        <img src="${product.image}" alt="${product.name}">
      </div>
    `;

    // Insert the featured product HTML into the page
    $('#featured-product').html(featuredProductHTML);

    // Optional: Clear the submitted product from localStorage
    localStorage.removeItem('submittedProduct');
  }
});