/* global $, AOS */

function showIngredients() {
  const ingredientsList = document.getElementById("ingredients-list");
  ingredientsList.style.display = "block";
}

function hideIngredients() {
  const ingredientsList = document.getElementById("ingredients-list");
  ingredientsList.style.display = "none";
}

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
    const el = element;
    el.innerHTML = ""; // Usuwamy oryginalną zawartość elementu
    const text = el.dataset.aosText; // Pobieramy tekst z atrybutu "data-aos-text"
    const delay = parseInt(el.dataset.aosDelay, 10); 
    const duration = parseInt(el.dataset.aosDuration, 10); 
    let charIndex = 0; 

 
    function typeWriter() {
      if (charIndex < text.length) {
        el.innerHTML += text.charAt(charIndex);
        // eslint-disable-next-line no-plusplus
        charIndex++;
        setTimeout(typeWriter, duration);
      }
    }


    setTimeout(typeWriter, delay);
  });
});
