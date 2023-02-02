const { socket } = window;
const errorMessageContainer = document.querySelector('.error-message');

socket.on('error-message', (data) => {
    const messageElement =errorMessageContainer.querySelector('.error-message-description');
    messageElement.innerText = data;
});
