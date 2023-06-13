class AddToCart {
  constructor(addToCartBtn) {
    this.cacheDOM(addToCartBtn);
    this.addToCart();
  }

  cacheDOM(addToCartBtn) {
    this.dom = {};
    this.dom.addToCartForm = document.querySelector("form[name='add-to-cart']");
    this.dom.addToCartBtn = addToCartBtn;
  }

  formSerialize() {
    const formData = new FormData(this.dom.addToCartForm);
    const dataObj = {};
    let totalPrice = 0;
    formData.forEach((value, key) => {
      const commaIndex = value.indexOf(",");
      const typePrice = value.substring(commaIndex + 2);
      if (commaIndex !== -1) {
        totalPrice += +typePrice;
      }
      dataObj[key] = value;
    });
    dataObj.total_price = totalPrice;
    return dataObj;
  }

  addToCart() {
    this.dom.addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.saveProductInCart();
      window.cart.renderCartItems();
      window.cart.showCart();
    });
  }

  saveProductInCart() {
    let cart = null;
    const productData = this.formSerialize();
    if (!localStorage.getItem("cart")) {
      cart = {};
      if (!cart.items) cart.items = [];
      if (!cart.total) cart.total = 0;
      cart.items.push(productData);
      cart.total += productData.total_price;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.items.push(productData);
      cart.total += +productData.total_price;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}

const addToCartBtn = document.querySelector("[ data-add-to-cart]");
if (addToCartBtn) {
  const addToCart = new AddToCart(addToCartBtn);
}
