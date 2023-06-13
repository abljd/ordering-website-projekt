/* eslint-disable no-param-reassign */
/* global $ */

/*= ================== POCZĄTEK SLIDERA =================== */

let currentSlide = 0;
const slides = Array.from(document.querySelectorAll(".slide"));
const slider = document.querySelector(".slider");

// Funkcja do zmiany slajdu
function changeSlide(index) {
  const slideWidth = slides[0].offsetWidth;
  const displacement = -1 * slideWidth * index;


  slider.style.transform = `translateX(${displacement}px)`;


  currentSlide = index;
}

// Funkcja do automatycznego przełączania slajdów co 5 sekund
function autoSlide() {
  const totalSlides = slides.length;
  const nextSlide = (currentSlide + 1) % totalSlides;

  changeSlide(nextSlide);
}
setInterval(autoSlide, 5000);
/*= ================== KONIEC SLIDERA =================== */

/* ================== KATEGORIE JEDZENIA  POCZĄTEK============== */
document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category");
  const itemContainer = document.querySelector(".item-container");

  categories.forEach((category) => {
    category.addEventListener("click", () => {
      const selectedCategory = category.dataset.category;

      categories.forEach((category) => {
        category.classList.remove("active");
      });

      category.classList.add("active");

      const items = document.querySelectorAll(".item");
      items.forEach((item) => {
        item.style.display = "none";
      });

      const selectedItems = document.querySelectorAll(
        `.item[data-category="${selectedCategory}"]`
      );
      selectedItems.forEach((item, index) => {
        item.style.display = "flex";
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add("animate-item");
      });

      itemContainer.style.display = "flex";
    });
  });


  const initialCategory = document.querySelector(
    '.category[data-category="pizza"]'
  );
  initialCategory.click();


  const initialItems = document.querySelectorAll(
    '.item[data-category="pizza"]'
  );
  initialItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add("animate-item");
  });
});

/* ================== KATEGORIE JEDZENIA  KONIEC============== */

/* =========== SCROLLOWANIE NAGŁÓWKA ============ */
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 0);
});

$(document).ready(() => {
  $('a[href^="#"]').on("click", function (event) {
    const target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body").stop().animate(
        {
          scrollTop: target.offset().top,
        },
        800
      );
    }
  });
});
/* =========== SCROLLOWANIE NAGŁÓWKA KONIEC============ */

/* ========= ANIMACJE POJAWIANIA SIĘ ELEMENTÓW =========== */
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 1000, 
    delay: 200, 
    once: true, 
    easing: "ease-out", 
  });


  const typeElements = document.querySelectorAll(".type-effect");


  typeElements.forEach((element) => {
    element.innerHTML = ""; 
    const text = element.dataset.aosText; 
    const delay = parseInt(element.dataset.aosDelay); 
    const duration = parseInt(element.dataset.aosDuration); 
    let charIndex = 0; 

    
    function typeWriter() {
      if (charIndex < text.length) {
        element.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, duration);
      }
    }
    setTimeout(typeWriter, delay);
  });
});
/* ========= ANIMACJE POJAWIANIA SIĘ ELEMENTÓW  KONIEC=========== */
