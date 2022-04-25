import './styles.css';

import $ from 'jquery';
import Chat from './Chat';

const chat = new Chat({ onMessage: renderMessage });
const $list = $('#list');
const $messageInput = $('#message');
const $usernameInput = $('#username');

$('#chatForm').on('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();

    const message = getMessage();

    chat.send(message);
    clearForm();
}

function getMessage() {
    return {
        username: $messageInput.val(),
        message: $usernameInput.val(),
    };
}

function renderMessage({ username, message }) {
    const $message = $(`<div>${message}: ${username}</div>`);
    $list.append($message);
    setTimeout(() => {
        $message.addClass('message');
    });
}

function clearForm() {
    $messageInput.val('');
}
