/* eslint-disable no-restricted-syntax */
/* global $ */
class Cart {
  constructor() {
    this.cacheDOM();
    this.renderCartItems();
    this.toggleCart();
    this.hideCartOnClickOutside();
  }

  cacheDOM() {
    this.dom = {};
    this.dom.cart = document.querySelector(".cart-overlay");
    this.dom.cartTotalValue = this.dom.cart.querySelector(".cart-total__value");
    this.dom.cartToggler = document.querySelectorAll(".btn-toggle-cart");
    this.dom.headerCartBadge = document.querySelector(".btn-cart span");
    this.dom.cartItemTemplate = document.getElementById("cart-item-template");
    this.dom.cartItems = this.dom.cart.querySelector(".cart-items");
  }

  renderCartItems() {
    this.dom.cartItems.textContent = "";
    if (this.getCartItems() && this.getCartItems().items.length > 0) {
      const { items } = this.getCartItems();
      this.setTotalCartValue();
      this.setCartCountBadge();
      if (this.dom.cart.classList.contains("cart--empty")) {
        this.dom.cart.classList.remove("cart--empty");
      }
  
      if (items.length > 0) {
        items.forEach((item, index) => {
          const itemTemplate = this.dom.cartItemTemplate.content.cloneNode(true);
          itemTemplate.querySelector(".cart-item__title").textContent = item.name;
          itemTemplate.querySelector(".cart-item__size").textContent = item.rozmiar.replace(",", " - ");
          itemTemplate.querySelector(".cart-item__img img").src = item.img;
          itemTemplate.querySelector(".cart-item__price").textContent = `${item.total_price} zł`;
          itemTemplate.querySelector(".cart-item__remove").setAttribute("data-line-item-id", index);
  
          const ingredientKeys = Object.keys(item).filter(key => key.includes("skladnik"));
          const sauceKeys = Object.keys(item).filter(key => key.includes("sos"));
  
          if (ingredientKeys.length > 0) {
            const ingredientTemplate = document.createElement("span");
            ingredientTemplate.classList.add("cart-item__additionals");
            ingredientTemplate.textContent = "Dodatkowe składniki: ";
            itemTemplate.querySelector(".cart-item__details").appendChild(ingredientTemplate);
  
            ingredientKeys.forEach(key => {
              const ingredientValue = item[key].replace(",", " - ");
              const ingredientItem = document.createElement("span");
              ingredientItem.textContent = `${ingredientValue} zł`;
              itemTemplate.querySelector(".cart-item__details").appendChild(ingredientItem);
            });
          }
  
          if (sauceKeys.length > 0) {
            const sauceTemplate = document.createElement("span");
            sauceTemplate.classList.add("cart-item__additionals");
            sauceTemplate.textContent = "Sosy: ";
            itemTemplate.querySelector(".cart-item__details").appendChild(sauceTemplate);
  
            sauceKeys.forEach(key => {
              const sauceValue = item[key].replace(",", " - ");
              const sauceItem = document.createElement("span");
              sauceItem.textContent = `${sauceValue} zł`;
              itemTemplate.querySelector(".cart-item__details").appendChild(sauceItem);
            });
          }
  
          if (item.komentarz && item.komentarz.trim() !== "") {
            const commentTemplate = document.createElement("span");
            commentTemplate.innerHTML = `<span style="color: rgba(255, 165, 0, 1);">Komentarz: <br></span>${item.komentarz}`;
            itemTemplate.querySelector(".cart-item__comment").appendChild(commentTemplate);
          }
  
          this.dom.cartItems.appendChild(itemTemplate);
        });
  
        this.removeFromCart();
      }
    } else {
      this.dom.cart.classList.add("cart--empty");
    }
  }
  removeFromCart() {
    const removeBttns = this.dom.cart.querySelectorAll(".cart-item__remove");
    const cartState = this.getCartItems();
    cartState.total = 0;
    removeBttns.forEach((bttn) => {
      bttn.addEventListener("click", () => {
        const id = +bttn.getAttribute("data-line-item-id");
        const updatedCartItems = cartState.items.filter(
          (item, index) => index !== id
        );
        updatedCartItems.forEach((item) => {
          cartState.total += item.total_price;
        });
        cartState.items = updatedCartItems;
        localStorage.setItem("cart", JSON.stringify(cartState));
        this.renderCartItems();
        this.setCartCountBadge();
      });
    });
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem("cart"));
  }

  setTotalCartValue() {
    if (
      this.dom.cartTotalValue &&
      this.getCartItems() &&
      this.getCartItems().total > 0
    ) {
      this.dom.cartTotalValue.textContent = `${this.getCartItems().total}zł`;
    }
  }

  setCartCountBadge() {
    this.dom.headerCartBadge.textContent =
      this.getCartItems().items.length > 0
        ? `(${this.getCartItems().items.length})`
        : "";
  }

  toggleCart() {
    if (this.dom.cartToggler.length > 0 && this.dom.cart) {
      this.dom.cartToggler.forEach((toggler) => {
        toggler.addEventListener("click", () => {
          if (this.dom.cart.classList.contains("active")) {
            this.dom.cart.classList.remove("active");
          } else {
            this.dom.cart.classList.add("active");
          }
        });
      });
    }
  }

  showCart() {
    if (!this.dom.cart.classList.contains("active")) {
      this.dom.cart.classList.add("active");
    }
  }

  hideCartOnClickOutside() {
    document.addEventListener("click", (event) => {
      const outsideClick =
        !this.dom.cart.contains(event.target) &&
        !event.target.classList.contains("btn-toggle-cart") &&
        !event.target.classList.contains("cart-item__remove") &&
        !event.target.classList.contains("add-to-cart-btn");
      if (outsideClick) {
        this.dom.cart.classList.remove("active");
      }
    });
  }
}

window.cart = new Cart();
