const darkMode = document.getElementById('darkModeToggle');

darkMode.addEventListener('change', function(){
    (this.checked)? (document.body.classList.add('dark-theme'), document.body.classList.remove("light-theme"),console.log("Dark mode aktif"))
    : (document.body.classList.add('light-theme'), document.body.classList.remove('dark-theme'),console.log("Light mode aktif"));
});

//Anlık tarayıcı göster
const detectBrowser = () => {
    const ua = navigator.userAgent; //user agent bilgisini alıyoruz
    switch(true){

    case ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR'):
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
    }};
    //switch case opt.
//if else ile tarayıcıları sıra sıra eliyoruz.
const browser = detectBrowser();
document.getElementById('browser-info').textContent = "Tarayıcınız: " + browser; //fonksiyonu çağırıyoruz ve ekrana basmak için textContent komutunu kullanıyoruz. 
console.log(navigator.userAgent);

let selectedStatus = null;

//Dropdown'dan statü seçme

document.querySelectorAll('.dropdown-content a').forEach(function(item){
    item.addEventListener('click', function (e){
        e.preventDefault();
        selectedStatus = this.getAttribute('data-status');
        document.getElementById('dropbtn').textContent = this.textContent
    });
});

//Ekle butonu işlevi 
document.addEventListener('DOMContentLoaded', function(){
document.getElementById('add-task').addEventListener('click', function () {
    const taskText = document.getElementById('task-area').value.trim();

    if (!taskText || !selectedStatus){
        alert('Lütfen görev veya statü seçiniz!');
        return;
    }
    const taskEl = document.createElement('div');
    taskEl.textContent = taskText;
    taskEl.classList.add('task-item'); //css için
    taskEl.style.border = '1px solid #000';
    taskEl.style.margin = '5px';
    taskEl.style.padding = '5px';
    taskEl.style.backgroundColor = 'white';
    document.getElementById('task-area').value = "";

    //Hedef container: todo, progress, done

    const container = document.getElementById(`${selectedStatus}-tasks`);
    if(container){
        container.appendChild(taskEl);
    }else{
        alert(`Target container not found for status: ${selectedStatus}`)
    }

    //temizle
    document.getElementById('task-area').value = '';
    document.getElementById('dropbtn').textContent = 'Status';
    selectedStatus = null;
});

});


