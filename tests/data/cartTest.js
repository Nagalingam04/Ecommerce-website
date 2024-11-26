import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  it('add a existing product to the cart', () => {

  });

  it('add a new product to cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem('cart'));
    loadFromStorage();
  });
});

// unfinished don't use it...!