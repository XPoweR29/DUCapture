const nav = document.querySelector('.nav');
const mobileNav = document.querySelector('.nav__mobile');
const mobileNavLink = document.querySelectorAll('.nav__mobile .nav__link');
const desktopNavLinks = document.querySelectorAll('.nav__bar .nav__link');
const navBtn = document.querySelector('.nav__btn');
const footerSpan = document.querySelector('.footer__year');
const dynamicTxt = document.querySelector('.hero__title span');
const scrollSpySections = document.querySelectorAll('.section');


const heroWords = ['wspomnienia', 'emocje', 'chwile', 'przeżycia'];
let wordIndex = 0;
let charIndex = 0;
let isErasing = false;

(() => {
	const year = new Date().getFullYear();
	footerSpan.innerText = year;
})();

const typeEffect = () => {
	if (document.body.classList.contains('main-page')) {
		const currWord = heroWords[wordIndex];
		const currChar = currWord.substring(0, charIndex);
		dynamicTxt.textContent = currChar;

		if (!isErasing && charIndex < currWord.length) {
			charIndex++;
			setTimeout(typeEffect, 150);
		} else if (isErasing && charIndex > 0) {
			charIndex--;
			setTimeout(typeEffect, 70);
		} else {
			isErasing = !isErasing;
			wordIndex = !isErasing ? (wordIndex + 1) % heroWords.length : wordIndex;
			setTimeout(typeEffect, 1200);
		}
	}
};

const navBg = () => {
	if (window.scrollY >= 80) {
		nav.classList.add('nav-bg-active');
	} else if (window.scrollY < 80) {
		nav.classList.remove('nav-bg-active');
	}
};

const handleNav = () => {
	navBtn.classList.toggle('is-active');
	mobileNav.classList.toggle('nav__mobile--shown');

	if (mobileNav.classList.contains('nav__mobile--shown')) {
		let delay = 1;
		mobileNavLink.forEach((link) => {
			delay++;
			link.style.animationDelay = `.${delay}s`;
		});
	}
};

const handleScrollSpy = () => {
	if (document.body.classList.contains('main-page')) {
		const sections = [];

		scrollSpySections.forEach((section) => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 85) {
				sections.push(section);

				const activeSection = document.querySelector(
					`[href*="${sections[0].id}"]`
				);
				desktopNavLinks.forEach((link) => link.classList.remove('active'));

				activeSection.classList.add('active');
			}
		});
	}
};

navBtn.addEventListener('click', handleNav);
window.addEventListener('scroll', navBg);
mobileNavLink.forEach((link) => link.addEventListener('click', handleNav));
window.addEventListener('scroll', handleScrollSpy);

typeEffect();
