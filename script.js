

window.addEventListener('DOMContentLoaded', function(){
    document.getElementById('b1').click();
});


/*menu items*/
function createMenuItems(menuItems, event){
    var menuList = document.getElementById('menuList');
    menuList.innerHTML ='';
   
    var activeButton = document.getElementsByClassName("active")[0];
    activeButton.classList.remove("active");

    var button = event.target;
    button.classList.add("active");

    menuItems.forEach(item=>{
        var li = document.createElement('li');
        var a = document.createElement('a');
        var spanIcon = document.createElement('span');
        var spanText = document.createElement('span');
        var ionIcon = document.createElement('ion-icon');

        if(item.text==="Dāvanu karte") a.href = "#form1";
        else if(item.text==="Abonaments") a.href = "#form2";
        else a.href = '#';
        ionIcon.setAttribute('name', item.name);
        spanText.textContent = item.text;

        spanIcon.appendChild(ionIcon);
        a.appendChild(spanIcon);
        a.appendChild(spanText);
        li.appendChild(a);
        menuList.appendChild(li);
    });
}

/*read more*/

const aksesuari = document.querySelector('.content');

aksesuari.addEventListener('click', event=>{
    const current = event.target;
    const isReadMoreBtn = current.className.includes('read-more-btn');
    if(!isReadMoreBtn) return;
    const MoreText = event.target.parentNode.querySelector('.read-more');
    MoreText.classList.toggle('read-more-show');
    current.textContent = current.textContent.includes('Lasīt vairāk') ? 
    "Lasīt mazāk..." : "Lasīt vairāk...";

});

/*Validation*/
const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const vards = document.getElementById('name');
const summa = document.getElementById('summa');
const email = document.getElementById('email');

form1.addEventListener('submit', e =>{
    e.preventDefault();
    if(validateStates()){ form1.submit();}
});

form2.addEventListener('submit', e =>{
    e.preventDefault();
    if(validateEmail()){form2.submit();}
});

const setError = (element, message) => {
    const parent = element.parentElement;
    const errorDiv = parent.querySelector('.error');
    errorDiv.innerHTML = message;
    parent.classList.add('error');
    parent.classList.remove('success');
}

const setSuccess = element => {
    const parent = element.parentElement;
    const errorDiv = parent.querySelector('.error');
    errorDiv.innerHTML = '';
    parent.classList.add('success');
    parent.classList.remove('error');
};

function simboli(value){
    var regex = /^[A-Za-zĀ-ž]+$/;
    return regex.test(value);
}

function emailValid(value){
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
}

const validateStates = () => {
    var v = false;
    var s = false;
    const vardsValue = vards.value.trim();
    const summaValue = summa.value.trim();
    console.log(isNaN(summaValue));

    if(vardsValue ===''){
        setError(vards, 'Vārds ir nepieciešams')
    }else if(!simboli(vardsValue)){
        setError(vards, 'Vārds drīkst saturēt tikai burtus');
    }else{
        setSuccess(vards);
        v=true;
    }

    if(summaValue===''){
        setError(summa, 'Summa ir nepieciešama');
    }else if(parseFloat(summaValue)<1 || isNaN(summaValue)){
        setError(summa, 'Summai jābūt VISMAZ 1€')
    }else{
        setSuccess(summa);
        s=true;
    }
    return s&&v;
}

function validateEmail(){
    const emailValue = email.value.trim();
    if(emailValue===''){
        setError(email, 'epasts ir nepieciešams');
    }else if(!emailValid(emailValue)){
        setError(email, "Epasts nav pareizs");
    }else{
        setSuccess(email);
        return true;
    }
}


/*create footer*/

function createFooter(header, items) {
    var list = '<h3>' + header + '</h3><ol>';
    $.each(items, function(_, item) {
        list += '<li><a href="#">' + item + '</a></li>';
    });
    list += '</ol>';
    return list;
}

$('#footer .informacija').append(createFooter('Informācija', footer.informacija));
$('#footer .kontakti').append(createFooter("Kontakti", footer.kontakti));
$('#footer .pakalpojumi').append(createFooter('Pakalpojumi', footer.pakalpojumi));

