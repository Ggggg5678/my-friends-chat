// Инициализируем постоянное подключение к серверу
const socket = io();

// Находим элементы интерфейса на странице по их ID
const form = document.getElementById('form');
const input = document.getElementById('input');
const usernameInput = document.getElementById('username');
const messages = document.getElementById('messages');

// Перехватываем нажатие кнопки "Отправить"
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Запрещаем странице перезагружаться при отправке формы

    if (input.value && usernameInput.value) {
        // Создаем объект с именем и текстом сообщения
        const messageData = {
            name: usernameInput.value,
            text: input.value
        };

        // Отправляем этот объект на сервер под меткой 'chat message'
        socket.emit('chat message', messageData);
        
        // Очищаем поле ввода текста сообщения, чтобы писать новое
        input.value = '';
    }
});

// Слушаем сервер. Когда от него прилетает событие 'chat message'...
socket.on('chat message', (data) => {
    // Создаем новый элемент списка (строку) в HTML
    const item = document.createElement('li');
    
    // Пишем туда текст в формате "Имя: Сообщение"
    item.textContent = `${data.name}: ${data.text}`;
    
    // Добавляем эту строку в наше окно чата
    messages.appendChild(item);
    
    // Автоматически прокручиваем чат вниз, к новым сообщениям
    messages.scrollTop = messages.scrollHeight;
});
