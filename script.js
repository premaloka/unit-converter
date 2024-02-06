const inputEl = document.querySelector("#metrics")
const convertBtnEl = document.querySelector("#convert")
const errorMsgEl = document.querySelector("#error-message")
const lengthEl = document.querySelector("#length-conversion")
const volumeEl = document.querySelector("#volume-conversion")
const massEl = document.querySelector("#mass-conversion")

const mainEl = document.querySelector("main")
const footerEl = document.querySelector("footer")
const sectionEl = document.querySelectorAll("section")
const closeEl = document.querySelector("#clear")
const toggleEl = document.querySelector("#toggle-mode")

let mode = localStorage.getItem("localMode")
console.log("mode", mode)

if (!mode) {
	mode = "light"
}

function conversion(value) {
	const meterToFeet = 3.281
	const literToGallon = 0.264
	const kiloToPound = 2.204

	const values = {
		toFeet: (meterToFeet * value).toFixed(3),
		toMeter: (value / meterToFeet).toFixed(3),
		toGallons: (literToGallon * value).toFixed(3),
		toLiters: (value / literToGallon).toFixed(3),
		toPounds: (kiloToPound * value).toFixed(3),
		toKilos: (value / kiloToPound).toFixed(3)
	}

	lengthEl.innerHTML = `
		<span class="format__one">${value} meter = ${values.toFeet} feet |</span> 
		<span class="format__two">${value} feet = ${values.toMeter} meter
		</span>
		 `
	volumeEl.innerHTML = `
		<span class="format__one">${value} liters = ${values.toGallons} Gallons |</span> 
		<span class="format__two">${value} gallons = ${values.toLiters} liters
		</span>
		 `
	massEl.innerHTML = `
		<span class="format__one">${value} kilos = ${values.toPounds} pounds |</span> 
		<span class="format__two">${value} pounds = ${values.toKilos} kilos
		</span>
		`
}

function isNumeric(input) {
	return /^[0-9.]+$/.test(input)
}

function errorMessage() {
	errorMsgEl.textContent = "(Please enter a number!)"
	inputEl.value = ""
	closeEl.classList.remove("show")
	setTimeout(() => {
		errorMsgEl.textContent = ""
	}, 3000)
}

convertBtnEl.addEventListener("click", () => {
	let baseValue = inputEl.value
	const value = conversion(baseValue)

	if (isNumeric(baseValue) && baseValue) {
		conversion(baseValue)
	} else {
		errorMessage();
	}
})

inputEl.addEventListener("input", () => {
	let baseValue = inputEl.value;
	if (baseValue) {
		closeEl.classList.add("show")
	}
})

closeEl.addEventListener("click", () => {
	console.log("click")
	inputEl.value = ""
	closeEl.classList.remove("show")
})

inputEl.addEventListener("keydown", (e) => {
	const baseValue = inputEl.value;
	if (e.key === "Enter") {
		if (isNumeric(baseValue) && baseValue) {
			conversion(baseValue)
		} else {
			errorMessage();
		}
	}
})

class Switch {
	constructor(domNode) {
		this.switchNode = domNode;
		this.switchNode.addEventListener('click', () => this.toggleStatus());
	}

	static setUp(mode) {
		if (mode === "light") {
			toggleEl.setAttribute("aria-checked", "false")
			mainEl.classList.remove("dark");
			footerEl.classList.remove("dark");
			for (let section of sectionEl) {
				section.classList.remove("dark")
			}
		} else {
			toggleEl.setAttribute("aria-checked", "true")
			mainEl.classList.add("dark");
			footerEl.classList.add("dark");
			for (let section of sectionEl) {
				section.classList.add("dark")
			}
		}
	}
	// Switch state of a switch
	toggleStatus() {
		const currentState =
		this.switchNode.getAttribute('aria-checked') === 'true';
		const newState = String(!currentState);
		
		this.switchNode.setAttribute('aria-checked', newState);
		if (this.switchNode.getAttribute('aria-checked') === "true") {
			Switch.setUp("dark")
			localStorage.setItem("localMode", "dark")
		} else {
			Switch.setUp("light")
			localStorage.setItem("localMode", "light")
		}
		console.log(localStorage.getItem("localMode"))
	}

	// public static method
}

// Initialize switches
window.addEventListener('DOMContentLoaded', function () {
	// Initialize the Switch component on all matching DOM nodes
	Array.from(document.querySelectorAll('[role^=switch]')).forEach(
		(element) => new Switch(element)
	);
	console.log("before setting mode")
	Switch.setUp(mode)
});
