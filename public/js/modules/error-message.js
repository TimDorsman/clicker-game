const closeButton = document.querySelector('.error-message-close');
const errorMessageContainer = document.querySelector('.error-message');

closeButton.addEventListener('click', () => {
    errorMessageContainer.classList.add('hidden');
})
