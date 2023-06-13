/* eslint-disable no-param-reassign */
/* global $ */

/*= ================== POCZĄTEK SLIDERA =================== */
// Zdefiniowanie indeksu bieżącego slajdu
let currentSlide = 0;

// Pobranie wszystkich elementów slajdów
const slides = Array.from(document.querySelectorAll(".slide"));

// Pobranie elementu kontenera slajdów
const slider = document.querySelector(".slider");

// Funkcja do zmiany slajdu
function changeSlide(index) {
  // Wyliczenie wartości przesunięcia na podstawie indeksu slajdu
  const slideWidth = slides[0].offsetWidth;
  const displacement = -1 * slideWidth * index;

  // Przesunięcie kontenera slajdów
  slider.style.transform = `translateX(${displacement}px)`;

  // Aktualizacja indeksu bieżącego slajdu
  currentSlide = index;
}

// Funkcja do automatycznego przełączania slajdów co 5 sekund
function autoSlide() {
  const totalSlides = slides.length;
  const nextSlide = (currentSlide + 1) % totalSlides;

  changeSlide(nextSlide);
}

// Ustawienie interwału do automatycznego przełączania slajdów
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

  // Select the initial category
  const initialCategory = document.querySelector(
    '.category[data-category="pizza"]'
  );
  initialCategory.click();

  // Add animation class to items in the initial category after page load
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
      ); // Czas trwania animacji w milisekundach
    }
  });
});
/* =========== SCROLLOWANIE NAGŁÓWKA KONIEC============ */

/* ========= ANIMACJE POJAWIANIA SIĘ ELEMENTÓW =========== */
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 1000, // Czas trwania animacji (w milisekundach)
    delay: 200, // Opóźnienie animacji (w milisekundach)
    once: true, // Animacja zostanie odtworzona tylko raz
    easing: "ease-out", // Krzywa animacji
  });

  // Znajdujemy elementy z klasą "type-effect"
  const typeElements = document.querySelectorAll(".type-effect");

  // Dla każdego elementu ustawiamy animację pisania się
  typeElements.forEach((element) => {
    element.innerHTML = ""; // Usuwamy oryginalną zawartość elementu
    const text = element.dataset.aosText; // Pobieramy tekst z atrybutu "data-aos-text"
    const delay = parseInt(element.dataset.aosDelay); // Pobieramy opóźnienie z atrybutu "data-aos-delay"
    const duration = parseInt(element.dataset.aosDuration); // Pobieramy czas trwania z atrybutu "data-aos-duration"
    let charIndex = 0; // Inicjalizujemy indeks znaku

    // Funkcja, która dodaje pojedyncze litery do elementu z efektem pisania
    function typeWriter() {
      if (charIndex < text.length) {
        element.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, duration);
      }
    }

    // Wywołujemy funkcję pisania po opóźnieniu
    setTimeout(typeWriter, delay);
  });
});
/* ========= ANIMACJE POJAWIANIA SIĘ ELEMENTÓW  KONIEC=========== */
