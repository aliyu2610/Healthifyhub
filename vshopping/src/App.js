import React, { useState } from 'react';
import cart1 from './images/unnamed.webp';
import kettle from './images/kettle.jpg';
import books from './images/71o7XtyLMgL.jpg';
import mat from './images/56101508SD05922_01_803x602.jpg';
import cycle from './images/cycle.jpg';
import Umbrella from './images/Umbrella.jpg';
import calculator from './images/C63_4.webp';
import './styles.css'; 
import './App.css';

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Kettle', price: 300, imageUrl : kettle },
    { id: 2, name: 'Notebooks', price: 50, imageUrl: books },
    { id: 3, name: 'Mattress', price: 2000, imageUrl: mat },
    { id: 4, name: 'Cycle', price: 4000, imageUrl: cycle },
    { id: 5, name: 'Umbrella', price: 600, imageUrl: Umbrella },
    { id: 6, name: 'Calculator', price: 400, imageUrl: calculator },
  ]);

  const [cart, setCart] = useState([]);

  const addtocart = (index) => {
    setCart([...cart, products[index]]);
  };

  const delElement = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const displaycart = () => {
    let total = 0;
    // Calculate total price of items in cart
    cart.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const displayProducts = () => {
    return products.map((product, index) => (
      <div key={product.id} className="product">
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Rs. {product.price}</p>
        <button onClick={() => addtocart(index)}>Add to cart</button>
      </div>
    ));
  };

  const searchProducts = (event) => {
    const searchInput = event.target.value.toLowerCase();
    // Filter products based on search input
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
    setProducts(filteredProducts);
  };

  return (
    <div className="App">
      <div className="header">  
        <p className="logo">VShoppy</p>
        <div className="cart">
          <img className="cartimg" src = {cart1} alt="Cart" />
          <p id="count">{cart.length}</p>
        </div>
      </div>
      <div className="search-container">
        <div id="search-bar">
          <input type="text" placeholder="Search products..." id="search-input" onChange={searchProducts} />
          <button id="search-button">Search</button>
          <button id="list-item-button">List Item</button>
        </div>
      </div>
      <p id="featured-products">Featured Products</p>
      <div id="product-listings">
        {displayProducts()}
      </div>
      <div className="container">
        <div id="root"></div>
        <div className="sidebar">
          <div className="head"><p>My Cart</p></div>
          <div id="cartItem">
            {cart.length === 0 ? "Your cart is empty" :
              cart.map((item, index) => (
                <div key={index} className='cart-item'>
                  <div className='row-img'>
                    <img className='rowimg' src={item.imageUrl} alt={item.name} />
                  </div>
                  <p style={{ fontSize: '12px' }}>{item.name}</p>
                  <h2 style={{ fontSize: '15px' }}>Rs. {item.price}.00</h2>
                  <i className='fa-solid fa-trash' onClick={() => delElement(index)}></i>
                </div>
              ))}
          </div>
          <div className="foot">
            <h3>Total</h3>
            <h2 id="total">Rs. {displaycart()}.00</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
