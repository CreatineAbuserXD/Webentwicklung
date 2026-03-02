const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const resultEl = document.getElementById('result');
const historyEl = document.getElementById('history');

function toNumber(val) {
    const normalized = val.replace(',', '.');
    const n = Number(normalized); 
    return Number.isFinite(n) ? n : null;
} // What does this function do? It converts a string to a number, handling both dot and comma as decimal separators. If the conversion is successful and results in a finite number, it returns that number; otherwise, it returns null.

function addHistory(text) {
    const li = document.createElement('li');
    li.textContent = text;
    historyEl.prepend(li);
} 

function calculate(op) {
    const a = toNumber(num1El.value.trim());
    const b = toNumber(num2El.value.trim());

    if (a === null || b === null) {
        resultEl.textContent = "Üngültige Eingabe!";
        return;
    }

    let r;
    if (op === "+") r = a + b;
    if (op === "-") r = a - b;
    if (op === "*") r = a * b;
    if (op === "/") { 
    if ( b === 0)  {resultEl.textContent = "Division durch 0"; return;}
        r = a / b;} 
resultEl.textContent = String(r);
addHistory(`${a} ${op} ${b} = ${r}`);}

document.querySelectorAll(".ops button").forEach(btn => {
    btn.addEventListener('click', () => calculate(btn.dataset.op)); 

});


