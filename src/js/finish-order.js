const form = document.getElementById('order-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Dziękujemy! Twoje zamówienie zostało złożone!');
});