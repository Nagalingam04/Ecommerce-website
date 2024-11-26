import {calculateCartQuantity, cart, checkOutQuantityUpdater, removeCartItem, updateDeliveryOption} from '../../data/cart.js';
import {getProduct, products} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOption.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {renderPaymentSummary} from './paymentSummary.js';
import { updateCheckOutQuantity } from './checkoutQuantity.js';


export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem
    .deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
    );
    const dateString = deliveryDate.format(
        'dddd, MMMM D'
    );

    

    cartSummaryHTML += `
    <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity
                js-product-quantity-${matchingProduct.id}">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link"
                data-product-id=${matchingProduct.id}>
                Update
                </span>
                <input class="quantity-input"
                id="js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary"
                id="js-save-quantity-input-${matchingProduct.id}"
                >Save</span>
                <span class="delete-quantity-link js-delete-link link-primary
                js-delete-link-${matchingProduct.id}"
                data-product-id=${matchingProduct.id}>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
            </div>
        </div>
        </div>
    `;
  });

  
  document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

  updateCheckOutQuantity();

  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
      link.addEventListener('click',() => {
          const productId = link.dataset.productId;
          removeCartItem(productId);
          updateCheckOutQuantity();
          renderPaymentSummary();
          renderOrderSummary();
      });
  });

  document.querySelectorAll('.js-update-link')
  .forEach((updateItem) => {
      updateItem.addEventListener('click',() => {
          updateItem.classList.add('update-icon-click');
          const productId = updateItem.dataset.productId;
          const inputQuantity = document.getElementById(`js-quantity-input-${productId}`);
          const saveLink = document.getElementById(`js-save-quantity-input-${productId}`);

          inputQuantity.classList.add('is-editing-quantity');
          saveLink.classList.add('is-editing-quantity');

          let cartNewQuantity = 0;

          saveLink.addEventListener('click',() => {

              cartNewQuantity = (+inputQuantity.value);
              if (Number.isInteger(cartNewQuantity)) {
                if(cartNewQuantity <= 0){
                  removeCartItem(productId);
                  updateCheckOutQuantity();
                }
                else{
                  checkOutQuantityUpdater(productId,cartNewQuantity);
                  updateCheckOutQuantity();
                }
                renderPaymentSummary();
                renderOrderSummary();
              }
              else{
                alert('Please Enter a Numerical value!!!');
              }
              inputQuantity.classList.remove('is-editing-quantity');
              saveLink.classList.remove('is-editing-quantity');
              updateItem.classList.remove('update-icon-click');
            });
          
      });
  });

  function deliveryOptionsHTML(matchingProduct,cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
          deliveryOption.deliveryDays,
          'days'
      );
      const dateString = deliveryDate.format(
          'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents
      === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id=${matchingProduct.id}
          data-delivery-option-id = '${deliveryOption.id}'>
            <input type="radio"
            ${isChecked ? 'checked' : ''} 
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
      </div>
      `
    });
    return html; 
  };

  document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click',() => {
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

};
