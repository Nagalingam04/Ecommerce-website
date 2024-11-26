import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import { products, loadProductsFetch} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProductsFetch().then(() => {
  renderProductsGrid();
});

function renderProductsGrid() {

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class = 'js-quantity-selector-${product.id}'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart" id = "js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary
          js-add-to-cart" data-product-id = ${product.id}>
            Add to Cart
          </button>
        </div>`;
});

document.querySelector(".js-product-grid")
.innerHTML = productsHTML;

document.querySelector('.js-search-button')
  .addEventListener('click',() => {
    const searchProduct = document.querySelector('.js-search-bar').value;
    let productsDetails = '';
    products.forEach((product) => {
        if((product.name).toLowerCase() === searchProduct.toLowerCase()) {
          console.log(product);
          productsDetails +=  `
                <div class="product-container">
                <div class="product-image-container">
                  <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                  ${product.name}
                </div>

                <div class="product-rating-container">
                  <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                  <div class="product-rating-count link-primary">
                    ${product.rating.count}
                  </div>
                </div>

                <div class="product-price">
                  ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                  <select class = 'js-quantity-selector-${product.id}'>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                ${product.extraInfoHtml()}

                <div class="product-spacer"></div>

                <div class="added-to-cart" id ="js-added-to-cart-${product.id}">
                  <img src="images/icons/checkmark.png">
                  Added
                </div>

                <button class="add-to-cart-button button-primary
                js-add-to-cart" data-product-id = ${product.id}>
                  Add to Cart
                </button>
              </div>`;
        }
    })

    if (productsDetails !== ""){
    document.querySelector(".js-product-grid")
      .innerHTML = productsDetails;
    document.querySelectorAll(".js-add-to-cart")
      .forEach((button) => {
      button.addEventListener('click',() => {
      const productId = button.dataset.productId;
      addAddedNotification(productId);
      addToCart(productId);
      updateCartQuantity();
    });
});

    
    }
    else if(searchProduct === '') {
      alert('Please Enter a product name');
      renderProductsGrid();
    }
    else{
      alert('Searched product is not available! Sorry');
      renderProductsGrid();
    }
  });
  
updateCartQuantity(); 


function updateCartQuantity() {
  let cartQuantity = calculateCartQuantity();
  console.log(cartQuantity);
  if (cartQuantity !== 0){
    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
  }
};

function addAddedNotification(productId) {
  const addingAddedNotification = setTimeout(()=>{
    document.getElementById(`js-added-to-cart-${productId}`).classList.add('js-added-to-cart');
  },0);

  const removingAddedNotification = setTimeout(()=>{
    document.getElementById(`js-added-to-cart-${productId}`).classList.remove('js-added-to-cart');
    clearTimeout(addingAddedNotification);
  },2000);
};

document.querySelectorAll(".js-add-to-cart")
.forEach((button) => {
    button.addEventListener('click',() => {
      const productId = button.dataset.productId;
      addAddedNotification(productId);
      addToCart(productId);
      updateCartQuantity();
    });
});



};


