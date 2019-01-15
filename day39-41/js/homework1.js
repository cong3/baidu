function resolveHash() {
    // #contABC=A&conatDEF=D
    var  hash = location.hash.slice(1);
    var data = [];
    if (hash !='') {
        var arr = hash.split('&');
       return arr;
    }
    return data;
}

function renderHash() {
    var hash = resolveHash();
    document.getElementById("contABC").innerHTML = hash[0].split('=')[1];
    document.getElementById("contDEF").innerHTML = hash[1].split('=')[1];
}

document.querySelector("body").onclick = function(e) {
    var target = e.target;
    if (target.tagName.toLowerCase() == 'button') {
        var hash = resolveHash();
        var str  = '';
        if (target.id == 'a' || target.id == 'b' || target.id == 'c') {
                str = 'contABC='+target.textContent+'&'+hash[1];
        } else {
                str = hash[0]+'&contDEF='+target.textContent;
        }
        location.hash = str;

    }
};

window.onhashchange = function() {
    renderHash();
};

renderHash();
