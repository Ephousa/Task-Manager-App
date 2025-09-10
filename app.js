const darkMode = document.getElementById('darkModeToggle');

darkMode.addEventListener('change', function(){
    (this.checked)? (document.body.classList.add('dark-theme'), document.body.classList.remove("light-theme"),console.log("Dark mode aktif"))
    : (document.body.classList.add('light-theme'), document.body.classList.remove('dark-theme'),console.log("Light mode aktif"));
});

const detectBrowser = () => {
    const ua = navigator.userAgent; //user agent bilgisini alıyoruz
    if (ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR')){
        return "Chrome";
    }else if (ua.includes('Firefox')){
        return "Firefox";
    }else if (ua.includes ('Safari') && !ua.includes('Chrome')){
        return "Safari";
    } else if (ua.includes('Edg')){
        return "Edge";
    }else if (ua.includes('OPR') || ua.includes('Opera')){
        return "Opera";
    }else{
        return "Bilinmeyen tarayıcı";
    }
}//if else ile tarayıcıları sıra sıra eliyoruz.
const browser = detectBrowser();
document.getElementById('browser-info').textContent = "Tarayıcınız: " + browser; //fonksiyonu çağırıyoruz ve ekrana basmak için textContent komutunu kullanıyoruz. 
console.log(navigator.userAgent);