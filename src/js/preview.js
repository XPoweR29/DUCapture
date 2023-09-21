const thumbnails = document.querySelectorAll('.gallery__thumbnail img');
const popup = document.querySelector('.preview');
const popupImg = document.querySelector('.preview__img');
const closeBtn = document.querySelector('.preview__btn-close');
const nextBtn = document.querySelector('.preview__btn-next');
const prevBtn = document.querySelector('.preview__btn-prev');

let currentIndex;

const showNextImg = () => {
	if (currentIndex === thumbnails.length - 1) {
		currentIndex = 0;
	} else {
		currentIndex++;
	}
	popupImg.src = thumbnails[currentIndex].src;
};

const showPrevImg = () => {
	if (currentIndex === 0) {
		currentIndex = thumbnails.length - 1;
	} else {
		currentIndex--;
	}
	popupImg.src = thumbnails[currentIndex].src;
};

const closePopup = () => {
	popup.classList.remove('preview--show');
};

thumbnails.forEach((thumbnail, index) =>
	thumbnail.addEventListener('click', () => {
		popup.classList.add('preview--show');
		popupImg.src = thumbnail.src;
		currentIndex = index;
	})
);

closeBtn.addEventListener('click', closePopup);
nextBtn.addEventListener('click', showNextImg);
prevBtn.addEventListener('click', showPrevImg);

document.addEventListener('keydown', (e) => {
	if (popup.classList.contains('preview--show')) {
		if (e.code === 'ArrowRight' || e.keyCode === 39) {
			showNextImg();
		} else if (e.code === 'ArrowLeft' || e.keyCode === 37) {
			showPrevImg();
		} else if (e.code === 'Escape' || e.keyCode === 27) {
			closePopup();
		}
	}
});
