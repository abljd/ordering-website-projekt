/* global document */

class AddToCart {
  constructor(addToCartBtn) {
    this.cacheDOM(addToCartBtn);
    this.addToCart();
  }

  cacheDOM(addToCartBtn) {
    this.dom = {};
    this.dom.addToCartForm = document.querySelector("form[name='add-to-cart']");
    this.dom.addToCartBtn = addToCartBtn;
    console.log(this.dom.addToCartForm);
    console.log(this.dom.addToCartBtn);
  }

  formSerialize() {
    const formData = new FormData(this.dom.addToCartForm);
    console.log(formData);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    const json = JSON.stringify(object);
    console.log(json);
  }

  addToCart() {
    this.dom.addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.formSerialize();
    });
  }
}

const addToCartBtn = document.querySelector("[ data-add-to-cart]");
if (addToCartBtn) {
  const addToCart = new AddToCart(addToCartBtn);
  console.log(addToCart);
}
