document.getElementById('register-btn').addEventListener('click', function() {
    document.getElementById('login-modal').style.display = 'flex';
});

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.parentElement.parentElement.style.display = 'none';
    });
});

document.getElementById('add-class').addEventListener('click', function() {
    let className = prompt('Введите название класса:');
    if (className) {
        let li = document.createElement('li');
        li.textContent = className;
        li.setAttribute('data-class', className);
        li.style.border = '2px solid #00FFFF'; 
        li.style.boxShadow = '0 0 2px #00FFFF'; 

        let deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Удалить';

        deleteBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            let confirmDelete = confirm('Вы уверены, что хотите удалить этот класс?');
            if (confirmDelete) {
                if (document.getElementById('content').getAttribute('data-current-class') === className) {
                    clearClassInterface();
                }
                li.remove();
            }
        });

        li.appendChild(deleteBtn);
        li.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            this.classList.toggle('right-clicked');
        });
        
        // Добавляем обработчик для входа в класс
        li.addEventListener('click', function() {
            openClassInterface(className);
        });

        document.getElementById('class-list').appendChild(li);
    }
});

document.getElementById('join-class').addEventListener('click', function() {
    document.getElementById('join-modal').style.display = 'flex';
});

function openClassInterface(className) {
    let content = document.getElementById('content');
    content.setAttribute('data-current-class', className);
    content.innerHTML = `
        <h2>Класс: ${className}</h2>
        <p>Добро пожаловать в класс <strong>${className}</strong>!</p>
        <div class="classroom-actions">
            <button onclick="alert('Функция загрузки материалов скоро будет добавлена!')">Материалы</button>
            <button onclick="alert('Функция чата скоро будет добавлена!')">Чат</button>
            <button onclick="alert('Функция заданий скоро будет добавлена!')">Задания</button>
        </div>
    `;
}

function clearClassInterface() {
    let content = document.getElementById('content');
    content.removeAttribute('data-current-class');
    content.innerHTML = '<p>Выберите класс или создайте новый.</p>';
}

// Создаем кнопку для переключения темы
let themeToggleBtn = document.createElement('button');
themeToggleBtn.textContent = '🌙';
themeToggleBtn.id = 'theme-toggle';
document.body.appendChild(themeToggleBtn);

// Стили кнопки (можно добавить в CSS)
themeToggleBtn.style.position = 'fixed';
themeToggleBtn.style.top = '630px';
themeToggleBtn.style.right = '20px';
themeToggleBtn.style.background = '#333';
themeToggleBtn.style.color = '#fff';
themeToggleBtn.style.border = 'none';
themeToggleBtn.style.padding = '11px';
themeToggleBtn.style.cursor = 'pointer';
themeToggleBtn.style.borderRadius = '5px';

// Функция для переключения темы
themeToggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

