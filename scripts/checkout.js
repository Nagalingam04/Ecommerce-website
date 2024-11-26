import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {  loadProductsFetch } from "../data/products.js";


async function loadPage() {

  try {
  
    await loadProductsFetch();
  } catch (error) {
    
    console.log("An error Occured in getting the data from the backend!");
  }



  renderOrderSummary();
  renderPaymentSummary();

}

loadPage();
