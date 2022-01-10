const token =  document.querySelector('meta[name="csrf-token"]').getAttribute('content');
var $ = (e)=> document.querySelector(e);
var $ = (e,t)=> document.querySelectorAll(e);
var addClass = (e,c)=> e.classList.addClass(c);
var removeClass = (e,c)=> e.classList.removeClass(c);
var createElem = (k)=> document.createElement(k);
var isDef = (e)=> !(e == null  || e == undefined);
var fP = async (k,l)=>{
    var res = await fetch(k, {
        method: 'POST', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'CSRF-Token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(l)
    });
    return res;
}
var fG = async (k)=>{
    var res = await fetch(k, {
        method: 'GET', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'CSRF-Token': token,
            'Content-Type': 'application/json'
        }
    });
    return res;
}

var form = async (f,callback)=>{
    $(f).onsubmit = async (e)=>{e.preventDefault();callback;}
}

var redirect = (l)=>{
    var a = createElem('a');
    a.href = l;
    a.click();
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie("token");
    if (user != "") {
        return user;
    } else {
        window.location.href = "localhost:8000/page";
        return ;
    }
}

document.querySelectorAll('ak').forEach(async (e)=>{
    e.onclick = async ()=>{ 
        var link = e.getAttribute('href');
        routuer(link);
    }
});


async function routuer(link){
    var response = await fetch(`/a/${link}`, {
            method: 'GET',
        }).then(res => res.text()).then(async e=>{
            var doc = document.createElement('div');
            doc.innerHTML = e;
            const script = document.createElement('script');
            var f = doc.querySelector('script');
            script.innerHTML = f.innerHTML;
            $('title').innerHTML = doc.querySelector('title').innerHTML;
            const nextURL = `/${link}`;
            const nextTitle = doc.querySelector('title').innerHTML;
            const nextState = {};
            window.history.pushState(nextState, nextTitle, nextURL);
            window.history.replaceState(nextState, nextTitle, nextURL)
            $('body').innerHTML = "";
            $('body').appendChild(doc.querySelector('div'));
            $('body').querySelector('div').removeChild(f);
            $('body').appendChild(script);

    });
}

