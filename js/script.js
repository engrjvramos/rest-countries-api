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

// LOADER
const loading = document.getElementById('loading');
const loadingContainer = document.querySelector('.loading-container');
const menu = document.querySelector('.menu');
const footer = document.querySelector('footer');

function showPage() {
	loading.style.display = 'none';
	loadingContainer.style.display = 'none';
	countriesEl.style.display = 'grid';
	menu.style.display = 'block';
	footer.style.display = 'block';
}

setTimeout(showPage, 5000);

//API CALL

const countriesEl = document.getElementById('countries');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const header = document.getElementById('header');
const url = 'https://restcountries.com/v3.1/all';

async function getCountries() {
	const res = await fetch(url);
	const countries = await res.json();

	displayCountries(countries);
}

getCountries();

function displayCountries(countries) {
	countriesEl.innerHTML = '';

	countries.forEach((country) => {
		const countryEl = document.createElement('div');
		const population = country.population.toLocaleString();

		countryEl.classList.add('card');
		countryEl.innerHTML = `
        <div class="card__flag">
          <img src="${country.flags.svg}" alt="">
        </div>
        <div class="card__details">
          <h2 class="country-name">${country.name.common}</h2>
          <p class="country-population">Population: <span>${population}</span></p>
          <p class="country-region">Region: <span>${country.region}</span></p>
          <p class="capital">Capital: <span>${
						country.capital ? country.capital : 'None'
					}</span></p>
        </div>
      `;

		countryEl.addEventListener('click', () => {
			modal.style.display = 'block';
			navbar.style.display = 'none';
			document.body.style.overflow = 'hidden';
			showCountryDetails(country);
		});

		countriesEl.appendChild(countryEl);
	});
}

function showCountryDetails(country) {
	const modalBody = modal.querySelector('.content__details');
	const modalFlag = modal.querySelector('.flag img');

	const countryName = country.name.common;
	const officialName = country.name.official;
	const nativeName = country.name.nativeName[
		Object.keys(country.name.nativeName)[1]
	]
		? country.name.nativeName[Object.keys(country.name.nativeName)[1]].common
		: country.name.nativeName[Object.keys(country.name.nativeName)[0]].common;
	const population = country.population.toLocaleString();
	const region = country.region;
	const subRegion = country.subregion;
	const areaKM = country.area.toLocaleString();
	const areaMI = Number((country.area / 2.59).toFixed()).toLocaleString();
	const capitalCity = country.capital ? country.capital : 'No Capital';
	const tld = country.tld[0];
	const currencyName = country.currencies[Object.keys(country.currencies)].name;
	const currencyID = Object.keys(country.currencies);
	const languages = Object.values(country.languages).join(', ');
	const timeZone = country.timezones;
	const drivingSide =
		country.car.side === 'left'
			? 'Drive on the Left-hand side'
			: 'Drive on the Right-hand side';
	const countryCode = country.idd.root + country.idd.suffixes;
	const demonyms = country.demonyms.eng.f;

	modalFlag.src = country.flags.svg;

	modalBody.innerHTML = `
  <h1>${countryName}</h1>

  <div class="details-container">
      <div class="item">
				<i class="fas fa-flag"></i>
				<h4 class="label">Official Name:</h4>
				<p class="value">${officialName}</p>
			</div>
      <div class="item">
				<i class="fas fa-flag"></i>
				<h4 class="label">Native Name:</h4>
				<p class="value">${nativeName}</p>
			</div>
      <div class="item">
				<i class="fas fa-users"></i>
				<h4 class="label">Population:</h4>
				<p class="value">${population}</p>
			</div>
      <div class="item">
				<i class="fas fa-globe-americas"></i>
				<h4 class="label">Region:</h4>
				<p class="value">${region}</p>
			</div>
      <div class="item">
				<i class="fas fa-globe-asia"></i>
				<h4 class="label">Sub-Region:</h4>
				<p class="value">${subRegion}</p>
			</div>
      <div class="item">
				<i class="fas fa-chart-area"></i>
				<h4 class="label">Total Area:</h4>
				<p class="value">${areaKM} km<sup>2</sup> (${areaMI} mi<sup>2</sup>)</p>
			</div>
      <div class="item">
				<i class="fas fa-monument"></i>
				<h4 class="label">Capital City:</h4>
				<p class="value">${capitalCity}</p>
			</div>
      <div class="item">
				<i class="fas fa-server"></i>
				<h4 class="label">Top Level Domain:</h4>
				<p class="value">${tld}</p>
			</div>
      <div class="item">
				<i class="fas fa-dollar-sign"></i>
				<h4 class="label">Currency:</h4>
				<p class="value">${currencyName} (${currencyID})</p>
			</div>
      <div class="item">
				<i class="fas fa-language"></i>
				<h4 class="label">Languages:</h4>
				<p class="value">${languages}</p>
			</div>
      <div class="item">
				<i class="fas fa-clock"></i>
				<h4 class="label">Timezone:</h4>
				<p class="value">${timeZone}</p>
			</div>
      <div class="item">
				<i class="fas fa-car"></i>
				<h4 class="label">Driving Side:</h4>
				<p class="value">${drivingSide}</p>
			</div>
      <div class="item">
				<i class="fas fa-phone"></i>
				<h4 class="label">Country Code:</h4>
				<p class="value">${countryCode}</p>
			</div>
      <div class="item">
				<i class="fas fa-male"></i>
				<h4 class="label">Demonyms:</h4>
				<p class="value">${demonyms}</p>
			</div>
    </div>  
  </div>
    `;
}

closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
	navbar.style.display = 'flex';
	document.body.style.overflow = 'visible';
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		modal.style.display = 'none';
		navbar.style.display = 'flex';
		document.body.style.overflow = 'visible';
	}
});

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

const dropdown = document.querySelector('.dropdown');
const dropdownIcon = document.querySelector('.dropdown__select i');
const dropdownItems = document.querySelector('.dropdown__content');

const filterEl = document.getElementById('filter');

dropdown.addEventListener('click', () => dropdown.classList.toggle('active'));

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
		const count = document.getElementsByTagName('.country-name').length;

		console.log(count);

		countryName.forEach((country) => {
			if (country.innerText.charAt(0) === value || value === 'All') {
				country.parentElement.parentElement.style.display = 'block';
			} else {
				country.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});
