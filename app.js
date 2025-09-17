//Dark Mode ve Kalıcılık...
const darkMode = document.getElementById("darkModeToggle");
darkMode.addEventListener('change', function(){
    if (this.checked){
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    }else{
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme')
    }
});

function loadTheme (){
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark'){
        document.body.classList.add('dark-theme');
        document.getElementById('darkModeToggle').checked = true;
    }else{
        document.body.classList.add('light-theme');
        document.getElementById('darkModeToggle').checked = false;
    }
}

//Tarayıcı tespiti

const detectBrowser = () => {
    const ua = navigator.userAgent;

    switch(true){
        case ua.includes ('Chrome') && !ua.includes ('Edg') && !ua.includes('OPR'):
            return "Chrome";
            case ua.includes('Firefox'):
                return "Firefox";
                case ua.includes('Safari') && !ua.includes('Chrome'):
                    return "Safari";
                    case ua.includes('Edg'):
                        return "Edge";
                        case ua.includes('OPR') || ua.includes('Opera'):
                            return "Opera";
                            default:
                                return "Bilinmeyen Tarayıcı!";
    }
};

document.getElementById('browser-info').textContent = "Tarayıcınız: " + detectBrowser();

//dropdown statü seçme
let selectedStatus = null;

document.querySelectorAll('.dropdown-content a').forEach((item) => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        selectedStatus = this.getAttribute('data-status');
        document.getElementById('dropbtn').textContent = this.textContent;
    });
});

//Local storage kaydetme
const saveTasksToStorage = () =>{
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(task =>{
        tasks.push({
            text: task.textContent,
            status: task.dataset.status
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Local storage üzerinden görevleri yükle
function loadTasksFromStorage(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task =>{
        const taskEl = createTaskElement(task.text, task.status);
        const container = document.getElementById(`${task.status}-tasks`);
        if (container) container.appendChild(taskEl);
    });
}

//Sürükle bırak için
let draggedItem = null;
function dragStart(e){
    draggedItem = e.target;
}

//Görev öğesi oluşturucu
const createTaskElement = (text, status) =>{
    const taskEl = document.createElement('div');
    taskEl.textContent = text;
    taskEl.classList.add('task-item');
    taskEl.setAttribute('data-status', status);

    //stillendirme

    taskEl.style.border = '1px solid #000';
    taskEl.style.margin = '5px';
    taskEl.style.padding = '5px';
    taskEl.style.backgroundColor = 'white';

     //Görev Sil
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = "🗑️";
        deleteBtn.style.float ='right';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.addEventListener('click', () =>{
        taskEl.remove();
        saveTasksToStorage();
        });
        taskEl.appendChild(deleteBtn);

     //Düzenleme (Çift Tıklama ile)
        taskEl.addEventListener('dblclick', () => {
            const newText = prompt("Görevi düzenleyin: ", taskEl.textContent.replace("🗑️", "").trim());
            if (newText !== null) {
                taskEl.firstChild.textContent = newText + " ";
                saveTasksToStorage();
            }
        });
          //Sürükle bırak
        taskEl.setAttribute("draggable", "true");
        taskEl.addEventListener("dragstart", dragStart);
        
    return taskEl;
}

//Görev ekleme
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-task').addEventListener('click', () =>{
        const taskText = document.getElementById('task-area').value.trim();
        if(!taskText || !selectedStatus){
            alert("Lütfen görev veya statü seçiniz!");
            return;
        }

        const taskEl = createTaskElement(taskText, selectedStatus);
        const container = document.getElementById(`${selectedStatus}-tasks`);
        if(container){
            container.appendChild(taskEl);
        }else{
            alert(`Hedef görev durumu bulunamadı: ${selectedStatus}`);
            return;
        }

        //Temizle
        document.getElementById('task-area').value = '';
        document.getElementById('dropbtn').textContent = 'Status';
        selectedStatus = null;
        saveTasksToStorage();
      
    });
});

//Giriş Tarihi

function handleLoginDate() {
    const lastLogin = localStorage.getItem('lastLogin');
    if(lastLogin){
        document.getElementById('last-login').innerText = lastLogin;
    }
    const today = new Date().toLocaleDateString("tr-TR");
    localStorage.setItem("lastLogin", today);
}

//sayfa yüklendiğinde bas

window.onload = () => {
    document.querySelectorAll('.task-container').forEach(container => {
        container.addEventListener('dragover', e => e.preventDefault());
        container.addEventListener('drop', e =>{
            e.preventDefault();
            if (draggedItem){
                container.appendChild(draggedItem);
                draggedItem.dataset.status = container.id.replace('-tasks', '');
                saveTasksToStorage();
            }
        })
    })
    loadTheme();
    loadTasksFromStorage();
    handleLoginDate();
}
