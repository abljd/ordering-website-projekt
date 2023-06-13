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
    duration: 1000, 
    delay: 200, 
    once: true, 
    easing: "ease-out", 
  });

 
  const typeElements = document.querySelectorAll(".type-effect");

 
  typeElements.forEach((element) => {
    const el = element;
    el.innerHTML = ""; 
    const text = el.dataset.aosText; 
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
