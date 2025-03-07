document.getElementById('register-btn').addEventListener('click', function() {
    document.getElementById('login-modal').style.display = 'flex';
});

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.parentElement.parentElement.style.display = 'none';
    });
});

const addClassButton = document.getElementById('add-class');
addClassButton.textContent = '+';

const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Виберіть дію</h2>
        <button id="create-class-btn">Створити клас</button>
        <button id="join-class-btn">Приєднатися до класу</button>
    </div>
`;
document.body.appendChild(modal);

const actionModal = document.createElement('div');
actionModal.classList.add('modal');
actionModal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2 id="modal-title"></h2>
        <input type="text" id="modal-input" placeholder="Введіть дані">
        <button id="modal-confirm">ОК</button>
    </div>
`;
document.body.appendChild(actionModal);

const style = document.createElement('style');
style.innerHTML = `
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
    }
    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
        text-align: center;
        width: 350px;
        height: auto;
        border: 2px solid rgba(255, 255, 255, 0.3);
    }
    .modal-content h2 {
        font-size: 18px;
        margin-bottom: 15px;
    }
    .modal-content button {
        display: block;
        margin: 10px auto;
        padding: 8px;
        border: 1px solid white;
        cursor: pointer;
        background: grey;
        color: white;
        width: 100%;
        font-size: 16px;
    }
    .modal-content input {
        width: calc(100% - 20px);
        padding: 8px;
        margin: 15px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }
    .close {
        float: right;
        cursor: pointer;
        font-size: 20px;
    }
`;
document.head.appendChild(style);

addClassButton.addEventListener('click', function () {
    modal.style.display = 'flex';
});

modal.querySelector('.close').addEventListener('click', function () {
    modal.style.display = 'none';
});
actionModal.querySelector('.close').addEventListener('click', function () {
    actionModal.style.display = 'none';
});

function openActionModal(title, callback) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-input').value = '';
    actionModal.style.display = 'flex';
    document.getElementById('modal-confirm').onclick = function () {
        callback(document.getElementById('modal-input').value);
        actionModal.style.display = 'none';
    };
}

function createClass(className) {
    if (className) {
        let li = document.createElement('li');
        li.textContent = className;
        li.setAttribute('data-class', className);
        li.style.border = '2px solid #808080';
        
        let deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Видалити';

        deleteBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            if (confirm('Ви впевнені, що хочете видалити цей клас?')) {
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

        li.addEventListener('click', function () {
            openClassInterface(className);
        });

        document.getElementById('class-list').appendChild(li);
    }
}

modal.querySelector('#create-class-btn').addEventListener('click', function () {
    modal.style.display = 'none';
    openActionModal('Введіть назву класу:', createClass);
});

modal.querySelector('#join-class-btn').addEventListener('click', function () {
    modal.style.display = 'none';
    openActionModal('Введіть код класу:', function(classCode) {
        alert(`Введений код: ${classCode}. Перевірка в базі даних буде реалізована пізніше.`);
    });
});

function openClassInterface(className) {
    let content = document.getElementById('content');
    content.setAttribute('data-current-class', className);
    content.innerHTML = `
        <h2>Клас: ${className}</h2>
        <p>Ласкаво просимо до класу <strong>${className}</strong>!</p>
        <div class="classroom-actions">
            <button onclick="alert('Функція завантаження матеріалів скоро буде додана!')">Матеріали</button>
            <button onclick="alert('Функція чату скоро буде додана!')">Чат</button>
            <button onclick="alert('Функція завдань скоро буде додана!')">Завдання</button>
        </div>
    `;
}

function clearClassInterface() {
    let content = document.getElementById('content');
    content.removeAttribute('data-current-class');
    content.innerHTML = '<p>Виберіть клас або створіть новий.</p>';
}
