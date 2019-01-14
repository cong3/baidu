function resolveHash() {
    
    console.log(location.hash);
    return location.hash;
}

function renderHash() {
    var hash = resolveHash();
    document.getElementById("cont").innerHTML = hash;
}

document.querySelector("body").onclick = function(e) {
    var target = e.target;
    if (target.tagName.toLowerCase() == 'button') {
        location.hash = target.innerHTML;
        renderHash();
    }
};

window.onhashchange = function() {
    renderHash();
};

renderHash();
