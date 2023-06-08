function showIngredients() {
	var ingredientsList = document.getElementById('ingredients-list')
	ingredientsList.style.display = 'block'
}

function hideIngredients() {
	var ingredientsList = document.getElementById('ingredients-list')
	ingredientsList.style.display = 'none'
}

document.addEventListener('DOMContentLoaded', function () {
	AOS.init({
		duration: 1000, // Czas trwania animacji (w milisekundach)
		delay: 200, // Opóźnienie animacji (w milisekundach)
		once: true, // Animacja zostanie odtworzona tylko raz
		easing: 'ease-out', // Krzywa animacji
	})

	// Znajdujemy elementy z klasą "type-effect"
	var typeElements = document.querySelectorAll('.type-effect')

	// Dla każdego elementu ustawiamy animację pisania się
	typeElements.forEach(function (element) {
		element.innerHTML = '' // Usuwamy oryginalną zawartość elementu
		var text = element.dataset.aosText // Pobieramy tekst z atrybutu "data-aos-text"
		var delay = parseInt(element.dataset.aosDelay) // Pobieramy opóźnienie z atrybutu "data-aos-delay"
		var duration = parseInt(element.dataset.aosDuration) // Pobieramy czas trwania z atrybutu "data-aos-duration"
		var charIndex = 0 // Inicjalizujemy indeks znaku

		// Funkcja, która dodaje pojedyncze litery do elementu z efektem pisania
		function typeWriter() {
			if (charIndex < text.length) {
				element.innerHTML += text.charAt(charIndex)
				charIndex++
				setTimeout(typeWriter, duration)
			}
		}

		// Wywołujemy funkcję pisania po opóźnieniu
		setTimeout(typeWriter, delay)
	})
})

// Początkowo ukryj koszyk
$('.cart-overlay').hide()

// Przechowuje elementy koszyka
var cartItems = []
function addToCart() {
	var rozmiar = $("input[name='rozmiar']:checked").val()
	var grubosc = $("input[name='grubosc']:checked").val()
	var moreIngredients = $("input[name='more-ingredients']:checked").val()
	var productName = $('.name span').text()
	var skladniki = []
	$("input[name='skladnik']:checked").each(function () {
		skladniki.push($(this).val())
	})
	var sos = []
	$("input[name='sos']:checked").each(function () {
		sos.push($(this).val())
	})
	var komentarz = $('#komentarz').val()

	if (!rozmiar || !grubosc || sos.length === 0) {
		alert('Musisz zaznaczyć wszystkie obowiązkowe pola!')
		return
	}

	var order = {
		productName: productName,
		rozmiar: rozmiar,
		grubosc: grubosc,
		moreIngredients: moreIngredients,
		skladniki: skladniki,
		sos: sos,
		komentarz: komentarz,
	}

	if (moreIngredients === 'nie') {
		order.skladniki = 'Nie'
	}

	cartItems.push(order)
	updateCartItems()
}

function updateCartItems() {
	var sizeNames = {
		24: 'Mała',
		32: 'Średnia',
		41: 'Familijna',
		60: 'Mega',
	}
	var cartContainer = $('.cart-items')
	cartContainer.empty()

	var totalPrice = 0

	cartItems.forEach(function (order, index) {
		var cartItem = $("<div class='cart-item'></div>")
		cartItem.append('<p>Nazwa produktu: ' + order.productName + '</p>')
		cartItem.append('<p>Rozmiar: ' + sizeNames[order.rozmiar] + ' ' + order.rozmiar + 'cm' + '</p>')
		cartItem.append('<p>Grubość ciasta: ' + order.grubosc + '</p>')

		if (order.moreIngredients === 'tak') {
			cartItem.append('<p>Dodatkowe składniki: ' + order.skladniki.join(', ') + '</p>')
		} else {
			cartItem.append('<p>Dodatkowe składniki: ' + order.skladniki + '</p>')
		}

		cartItem.append('<p>Sos: ' + order.sos.join(', ') + '</p>')
		cartItem.append('<p>Komentarz: ' + (order.komentarz ? order.komentarz : 'Brak') + '</p>')
		cartItem.append('<p class="order-price">Cena zamówienia: ' + calculateOrderPrice(order).toFixed(2) + ' zł</p>')
		cartItem.append("<button onclick='removeFromCart(" + index + ")'>Usuń</button>")

		cartContainer.append(cartItem)

		// Calculate order price
		var orderPrice = calculateOrderPrice(order)
		totalPrice += orderPrice
	})

	$('.cart-overlay').show()
}

function calculateOrderPrice(order) {
	var basePrice = 0

	switch (order.rozmiar) {
		case '24':
			basePrice = 17.0
			break
		case '32':
			basePrice = 23.0
			break
		case '41':
			basePrice = 32.5
			break
		case '60':
			basePrice = 54.0
			break
		default:
			break
	}

	// Add prices for additional options
	var sosPrice = order.sos.length * 1.5
	var skladnikiPrice = order.skladniki.length * 2.0

	return basePrice + sosPrice + skladnikiPrice
}
// Funkcja usuwania z koszyka
function removeFromCart(index) {
	// Usuń zamówienie o podanym indeksie
	cartItems.splice(index, 1)

	// Zaktualizuj wyświetlane elementy koszyka
	updateCartItems()
}

// Funkcja zamykania koszyka
function closeCart() {
	// Ukryj koszyk
	$('.cart-overlay').hide()
}

// Funkcja wyświetlania koszyka po kliknięciu przycisku "Koszyk"
$('.cta').click(function () {
	// Zaktualizuj wyświetlane elementy koszyka
	updateCartItems()
})
