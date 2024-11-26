export let cart ;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart){
    cart = [{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:2,
      deliveryOptionId:'1'
    },
    {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:1,
      deliveryOptionId:'2'
    }];
  };
};

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
};

export function addToCart(productId) {
  let matchingItem;
    const SelectorQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

    cart.forEach((cartItem) => {
      if(cartItem.productId === productId){
        matchingItem = cartItem;
      }
    })

    if(matchingItem){
      matchingItem.quantity += Number(SelectorQuantity.value);
    }
    else{
      cart.push({
        productId: productId,
        quantity : Number(SelectorQuantity.value),
        deliveryOptionId:'1'
      });
    }

    saveToStorage();
};

export function removeCartItem(productId) {
  let newCart = [];
  cart.forEach((item) => {
    if (item.productId !== productId){
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToStorage();
};

export function calculateCartQuantity() {
  let cartQuantity = 0;
  
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
};

export function checkOutQuantityUpdater (productId,cartNewQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId){
      cartItem.quantity = cartNewQuantity;
    }
  });
  saveToStorage();
};

export function updateDeliveryOption (productId,deliveryOptionId) {
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
};

export function buyItAgain(productId) {
  
  cart.push({
    productId: productId,
    quantity : 1,
    deliveryOptionId:'1'
  });

  saveToStorage();
}

export function emptyCart() {
  
  cart = [];
  saveToStorage();
  
}


