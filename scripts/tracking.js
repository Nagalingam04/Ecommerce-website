import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getDate, getDeliveryDate } from "./utils/date.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
let estimatedDeliveryTime = '';
let orderedTime = '';


function displayTrackingDetails() {

  const product = getProduct(productId);
  let quantity = '';
  let deliveryStatus;


  orders.forEach((order) => {
    if(orderId === order.id){
      orderedTime = order.orderTime;
      
     order.products.forEach((product) => {
        if(productId === product.productId){
          quantity = product.quantity;
          estimatedDeliveryTime = product.estimatedDeliveryTime;
        }
      }) 
    }
  });

  
  let productDetails = `
    <div class="order-tracking js-order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${getDeliveryDate(estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label" id= "js-preparing-label">
            Preparing
          </div>
          <div class="progress-label" id= "js-shipping-label">
            Shipped
          </div>
          <div class="progress-label" id= "js-delievered-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" id = "js-progress-bar"></div>
        </div>
      </div>
  `
  document.querySelector('.js-order-tracking')
    .innerHTML = productDetails;

  getDeliveryStatus();

  function getDeliveryStatus() {
    
    const today = getDate(dayjs());
    const orderedDate = getDate(orderedTime);
    const deliveryDate = getDate(estimatedDeliveryTime);
  
    deliveryStatus = ((today-orderedDate)/(deliveryDate-orderedDate))*100;
  
  }

  statusIndicator();

  function statusIndicator() {
    let deliveryStatusIndicator = document.getElementById('js-progress-bar').classList;
    let preparingLabel = document.getElementById('js-preparing-label').classList;
    let shippingLabel = document.getElementById('js-shipping-label').classList;
    let deliveredLabel = document.getElementById('js-delievered-label').classList;

    if(deliveryStatus >= 0 && deliveryStatus < 50){
      deliveryStatusIndicator.add("progress-preparing");
      preparingLabel.add('current-status');
    }
    else if (deliveryStatus >= 50 && deliveryStatus <= 99) {
      deliveryStatusIndicator.add("progress-shipped");
      shippingLabel.add('current-status');
    }
    else if (deliveryStatus === 100) {
      deliveryStatusIndicator.add('progress-delievered');
      deliveredLabel.add('current-status');
    }

  }  

}

loadProductsFetch().then(() => {

  displayTrackingDetails();
});