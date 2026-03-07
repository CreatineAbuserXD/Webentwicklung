document.addEventListener("DOMContentLoaded", init);

function init() { 
const buttonElement = document.getElementById("submitBtn");
buttonElement.addEventListener("click", validateInput);
}

function validateInput() {
    const inputVornameElement = document.getElementById("vorname");
    const vorname = inputVornameElement.value;
    if (vorname.length < 2) {
        const errorVornameElement = document.getElementById("vornameError");
                errorVornameElement.innerText = ("Der Vorname muss mindestens 2 Zeichen lang sein.");
    }else{
        const errorVornameElement = document.getElementById("vornameError");
        errorVornameElement.innerText = ("");
    }
}
