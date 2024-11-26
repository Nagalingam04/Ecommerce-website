import { addToCart, buyItAgain, calculateCartQuantity } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getDate, getMonthAndDate } from "./utils/date.js";



function renderOrderPlacedSummary() {

  updateCartQuantity();

  let orderContainerSummary = '';
  

  orders.forEach((order) => {

    
    let orderedProductsDetails = '';

    orderContainerSummary += `
      <div class = "order-container js-order-container-${order.id} js-order-container"
      data-order-id=${order.id}></div>

      <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${getMonthAndDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
      </div>

      <div class="order-details-grid js-order-details-grid-${order.id}"></div>
    `
  
  });

  
  document.querySelector('.js-order-grid')
  .innerHTML = orderContainerSummary;


  orders.forEach((order) => {

    let productDetails = '';

    order.products.forEach((product) => {

      const matchingItem = getProduct(product.productId);

      productDetails += `
        <div class="product-image-container">
            <img src="${matchingItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${getMonthAndDate(product.estiimatedDeliveryDate)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button"
                data-product-id=${product.productId}>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message js-buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
      `
      
    })
    
    
    document.querySelector(`.js-order-details-grid-${order.id}`)
      .innerHTML = productDetails;
  }) 
 
  document.querySelectorAll('.js-buy-again-button')
  .forEach((button) => {
    button.addEventListener('click',() => {
      const productId = button.dataset.productId;
      buyItAgain(productId);
      updateCartQuantity();
      
    })
  })

  function updateCartQuantity() {
    document.querySelector('.js-cart-quantity')
  .innerHTML = `${calculateCartQuantity()}`;
  }
  

}

loadProductsFetch().then(() => {
  renderOrderPlacedSummary();
});