// DARK & LIGHT MODE
const themeBtn = document.querySelector('.theme-btn');
const themeBtnText = document.querySelector('.theme-text');

themeBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark-theme');
	themeBtn.classList.toggle('sun');

	localStorage.setItem('saved-theme', getCurrentTheme());
	localStorage.setItem('saved-icon', getCurrentIcon());
});

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

//API CALL

const countriesEl = document.getElementById('countries');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.btn-close');

getCountries();

async function getCountries() {
	const res = await fetch('https://restcountries.com/v2/all');
	const countries = await res.json();

	displayCountries(countries);
}

function displayCountries(countries) {
	countriesEl.innerHTML = '';

	countries.forEach((country) => {
		const countryEl = document.createElement('div');

		countryEl.classList.add('card');
		countryEl.innerHTML = `
        <div class="card__flag">
          <img src="${country.flag}" alt="">
        </div>
        <div class="card__details">
          <h4 class="country-name">${country.name}</h4>
          <h6 class="population">Population: <span>${country.population}</span></h6>
          <h6 class="country-region">Region: <span>${country.region}</span></h6>
          <h6 class="capital">Capital: <span>${country.capital}</span></h6>
        </div>
      `;

		countryEl.addEventListener('click', () => {
			modal.style.display = 'flex';
			document.body.style.overflow = 'hidden';
		});

		countriesEl.appendChild(countryEl);
	});
}

const searchEl = document.getElementById('search');

closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
	document.body.style.overflow = 'visible';
});

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

const filter = document.querySelector('.filter');
const filterIcon = document.querySelector('.filter i');
const filterItems = document.querySelector('.filter-items');

filter.addEventListener('click', () => {
	filterIcon.classList.toggle('fa-chevron-up');
	filterIcon.classList.toggle('fa-chevron-down');
	filterItems.classList.toggle('active');
});

// const filterItems = document.querySelector('.filter-items');
const regionFilters = filterItems.querySelectorAll('li');

regionFilters.forEach((filter) => {
	filter.addEventListener('click', () => {
		const value = filter.innerText;
		const countryRegion = document.querySelectorAll('.country-region');

		countryRegion.forEach((region) => {
			if (region.innerText.includes(value) || value === 'All') {
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});
