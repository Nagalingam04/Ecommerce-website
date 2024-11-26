import { calculateCartQuantity } from "../../data/cart.js";

export function updateCheckOutQuantity() {

  document.querySelector('.js-checkout-quantity')
      .innerHTML = `${calculateCartQuantity()} items`;
       
};

 