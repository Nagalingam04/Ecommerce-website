class Cart{

  cartItem; 
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  
    #loadFromStorage() {
      this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
      if(!this.cartItem){
        this.cartItem =[{
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
    }

    saveToStorage() {
      localStorage.setItem(this.#localStorageKey,JSON.stringify(cart));
    }

    addToCart(productId) {
      let matchingItem;
      const SelectorQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
  
      this.cartItem.forEach((cartItem) => {
        if(cartItem.productId === productId){
          matchingItem = cartItem;
        }
      })
  
      if(matchingItem){
        matchingItem.quantity += Number(SelectorQuantity.value);
      }
      else{
        this.cartItem.push({
          productId: productId,
          quantity : Number(SelectorQuantity.value),
          deliveryOptionId:'1'
        });
      }
  
      this.saveToStorage();
    }

    removeCartItem(productId) {
      let newCart = [];
      
      this.cartItem.forEach((item) => {
        if (item.productId !== productId){
          newCart.push(item);
        }
      });
      
      this.cartItem = newCart;
      
      this.saveToStorage();
    }

    calculateCartQuantity() {
      let cartQuantity = 0;
  
      this.cartItem.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      
      return cartQuantity;
    }

    checkOutQuantityUpdater (productId,cartNewQuantity) {
      this.cartItem.forEach((cartItem) => {
        if (cartItem.productId === productId){
          cartItem.quantity = cartNewQuantity;
        }
      });
      this.saveToStorage();
    }

    updateDeliveryOption (productId,deliveryOptionId) {
      let matchingItem;
    
      this.cartItem.forEach((cartItem) => {
        if(cartItem.productId === productId){
          matchingItem = cartItem;
        }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
      }
    
}

const cart = new Cart('cart-oop');
console.log(cart); 
console.log(cart instanceof Cart);
