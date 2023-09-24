const form = document.querySelector('.form');
const formPopup = document.querySelector('.contact .popup');
const nameInput = document.querySelector('.form__inputBox input[type="text"]');
const emailInput = document.querySelector('.form__inputBox input[type="email"]');
const phoneInput = document.querySelector('.form__inputBox input[type="tel"]');
const msgInput = document.querySelector('.form__inputBox textarea');
const msgInputSpan = document.querySelector('.form__inputBox textarea + span');


const showSuccessPopup = async () => {
	formPopup.classList.add('slide-in-blurred-right');

	await new Promise((resolve) => {
		setTimeout(() => {
			formPopup.classList.add('slide-out-blurred-right');
			resolve();
		}, 3000);
	});

	await new Promise((resolve) => {
		setTimeout(() => {
			formPopup.classList.remove(
				'slide-in-blurred-right',
				'slide-out-blurred-right'
			);
			resolve();
		}, 1000);
	});
};

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errMsg = formBox.querySelector('.warning');
	formBox.classList.add('form__inputBox--error');
	errMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('form__inputBox--error');
};

const checkLength = (input, minLength, maxLength) => {
	if (input.value.length < minLength) {
		showError(input, `${input.name} musi mieć conajmniej ${minLength} znaków.`);
	}

	if (maxLength && input.value.length > maxLength) {
		showError(input, `${input.name} może składać się z maksymalnie ${maxLength} znaków.`);
	}
};

const checkPhoneNum = (input) => {
	const regNum = /^[0-9]+$/;
	if (regNum.test(input.value)) {
		clearError(input);
	} else {
		showError(input, 'Numer telefonu może składać się tylko z cyfr.');
	}
};

const checkName = (input) => {
	const regName = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ']+$/;
	if(regName.test(input.value)) {
		clearError(input);
	} else {
		showError(input, `Imię nie może składać się z cyfr oraz znaków specjalnych`);
	}
}

const checkForm = (inputs) => {
	inputs.forEach((input) => {
		if (input.value.trim().length === 0) {
			showError(input, 'To pole nie może być puste!');
		} else {
			clearError(input);
		}
	});
};

const checkFormErrors = () => {
	const allInputs = document.querySelectorAll('.form__inputBox');
	let errorCount = 0;

	allInputs.forEach((input) => {
		if (input.classList.contains('form__inputBox--error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		showSuccessPopup();
		clearInputs([nameInput, emailInput, phoneInput, msgInput]);
	}

	return errorCount;
};

const clearInputs = (inputs) => {
	for (const input of inputs) {
		input.value = '';
	}
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	checkForm([nameInput, emailInput, phoneInput, msgInput]);
	checkName(nameInput);
	checkLength(nameInput, 3, 32);
	checkPhoneNum(phoneInput);
	checkLength(phoneInput, 9);
	checkFormErrors();
	removeActiveLabel();
});

msgInput.addEventListener('input', () => {
	if (msgInput.value.trim().length !== 0) {
		msgInputSpan.classList.add('active');
	} else {
		msgInputSpan.classList.remove('active');
	}
});

const removeActiveLabel = () => {
	if(checkFormErrors() === 0) {
		msgInputSpan.classList.remove('active');
	} 
}