const socket = io("https://datwalkerv-xyz.vercel.app/");

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const input = document.querySelector('#message-input');
  const messages = document.querySelector('#messages');
  const chat = document.querySelector('#chat');

    const storedMessages = JSON.parse(localStorage.getItem('messages')) || null;
    if(storedMessages) {
        storedMessages.forEach((msg) => {
            const li = document.createElement('li');
            li.textContent = msg;
            messages.appendChild(li);
        });
    }
    
  
  if(!localStorage.getItem('username')) {
    localStorage.setItem('username', prompt('What is your name?'));
    location.reload();
 } 
    const username = localStorage.getItem('username');
    socket.emit('chat message', `${username} has joined the chat`);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', `${username}: ${input.value}`);
      input.value = '';
    }
  });
  
  socket.on('chat message', (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    let getMessages = JSON.parse(localStorage.getItem('messages')) || [];
    localStorage.setItem('messages', JSON.stringify([...getMessages, li.textContent]));
    messages.appendChild(li);
  });
});
