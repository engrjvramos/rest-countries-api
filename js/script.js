// SCROLL TO TOP BUTTON
const scrollTopBtn = document.querySelector('.scrollToTop-btn');
const navbar = document.getElementById('navbar');
const sticky = navbar.offsetTop;

window.addEventListener('scroll', () => {
	scrollTopBtn.classList.toggle('active', window.scrollY > 500);
	navbar.classList.toggle('sticky', window.scrollY > 90);
});

scrollTopBtn.addEventListener('click', () => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});

// DARK & LIGHT MODE
const themeBtn = document.querySelector('.theme-btn');
const themeBtnText = document.querySelector('.theme-text');

const getCurrentTheme = () =>
	document.body.classList.contains('dark-theme') ? 'dark' : 'light';
const getCurrentIcon = () =>
	themeBtn.classList.contains('sun') ? 'sun' : 'moon';

const savedTheme = localStorage.getItem('saved-theme');
const savedIcon = localStorage.getItem('saved-icon');

if (savedTheme) {
	document.body.classList[savedTheme === 'dark' ? 'add' : 'remove'](
		'dark-theme'
	);
	themeBtn.classList[savedIcon === 'sun' ? 'add' : 'remove']('sun');
}

themeBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark-theme');
	themeBtn.classList.toggle('sun');

	localStorage.setItem('saved-theme', getCurrentTheme());
	localStorage.setItem('saved-icon', getCurrentIcon());
});

// SPINNER
const loading = document.getElementById('loading');
const loadingContainer = document.querySelector('.loading-container');

function showPage() {
	loading.style.display = 'none';
	loadingContainer.style.display = 'none';
	countriesEl.style.display = 'grid';
}

setTimeout(showPage, 5000);

//API CALL

const countriesEl = document.getElementById('countries');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.btn-close');
const header = document.getElementById('header');

getCountries();

async function getCountries() {
	const res = await fetch('https://restcountries.com/v2/all');
	const countries = await res.json();

	displayCountries(countries);
}

const searchEl = document.getElementById('search');

searchEl.addEventListener('input', (e) => {
	const { value } = e.target;
	const countryName = document.querySelectorAll('.country-name');

	countryName.forEach((name) => {
		if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
			name.parentElement.parentElement.style.display = 'block';
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
});

function displayCountries(countries) {
	countriesEl.innerHTML = '';
	// console.log(Object.values(countries));

	countries.forEach((country) => {
		const countryEl = document.createElement('div');
		const population = country.population.toLocaleString();
		const locationBtn = document.getElementById('locationBtn');

		countryEl.classList.add('card');
		countryEl.innerHTML = `
        <div class="card__flag">
          <img src="${country.flag}" alt="">
        </div>
        <div class="card__details">
          <h2 class="country-name">${country.name}</h2>
          <p class="country-population">Population: <span>${population}</span></p>
          <p class="country-region">Region: <span>${country.region}</span></p>
          <p class="capital">Capital: <span>${country.capital}</span></p>
        </div>
      `;

		countryEl.addEventListener('click', () => {
			modal.style.display = 'flex';
			navbar.style.display = 'none';
			header.style.position = 'fixed';
			document.body.style.overflow = 'hidden';
			showCountryDetails(country);
		});

		countriesEl.appendChild(countryEl);
	});
}

function showCountryDetails(country) {
	const modalBody = modal.querySelector('.content__details');
	const modalImage = modal.querySelector('.content__flag img');

	const population = country.population.toLocaleString();

	modalImage.src = country.flag;

	modalBody.innerHTML = `
  <h1>${country.name}</h1>
  <div class="details-container">
    <div class="details-container__left">
      <p>Native Name: <span>${country.nativeName}</span></p>
      <p>Population: <span>${population}</span></p>
      <p>Region: <span>${country.region}</span></p>
      <p>Sub-Region: <span>${country.subregion}</span></p>
      <p>Capital: <span>${country.capital}</span></p>
    </div>
    <div class="details-container__right">
      <p>Top Level Domain: <span>${country.topLevelDomain[0]}</span></p>
      <p>Currencies: <span>${country.currencies
				.map((currency) => currency.name)
				.join(', ')}</span></p>
      <p>Languages: <span>${country.languages
				.map((language) => language.name)
				.join(', ')}</span></p>
    </div>
  </div>
    `;
}

closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
	navbar.style.display = 'flex';
	header.style.position = 'relative';
	document.body.style.overflow = 'visible';
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		modal.style.display = 'none';
		navbar.style.display = 'flex';
		header.style.position = 'relative';
		document.body.style.overflow = 'visible';
	}
});

// const searchContainer = document.querySelector('.search-container');
const dropdown = document.querySelectorAll('.dropdown');
const dropdownIcon = document.querySelector('.dropdown__select i');
const dropdownItems = document.querySelector('.dropdown__content');

const filterEl = document.getElementById('filter');

dropdown.forEach((el) => {
	el.addEventListener('click', () => el.classList.toggle('active'));
});

const regionItems = filterEl.querySelectorAll('.dropdown__content--item');

regionItems.forEach((item) => {
	item.addEventListener('click', () => {
		const value = item.innerText;
		const dropdownText = filterEl.querySelector('.dropdown__select span');
		const countryRegion = document.querySelectorAll('.country-region');

		if (value === 'Show All') {
			dropdownText.innerText = 'Filter by Region';
		} else {
			dropdownText.innerText = value;
		}

		countryRegion.forEach((region) => {
			if (region.innerText.includes(value) || value === 'Show All') {
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});

const letters = document.querySelector('.letters');
const nameFilters = letters.querySelectorAll('li');

nameFilters.forEach((filter) => {
	filter.addEventListener('click', (e) => {
		const value = filter.innerText;
		const countryName = document.querySelectorAll('.country-name');

		countryName.forEach((country) => {
			if (country.innerText.charAt(0) === value || value === 'All') {
				country.parentElement.parentElement.style.display = 'block';
			} else {
				country.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});
