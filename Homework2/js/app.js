document.addEventListener("DOMContentLoaded", init);

function init() {
    let name = prompt("What is your name?");
    document.getElementById("nameOutput").textContent = name;
    document.getElementById("startBtn").addEventListener("click", function(){
        startTimer();
        startGame();
    });
}

let timer;
let seconds=0;

function startTimer() {
    if(!timer){
    timer = setInterval(updateTime, 1000);}
}

function updateTime(){
    seconds++;
    document.getElementById("timeOutput").textContent=seconds;
}

function startGame() {
    const spielbereich = document.getElementById("spielbereich");
    spielbereich.innerHTML = "";

    const kartenWerte =[];

    for(let i=1; i<=8; i++){
        kartenWerte.push({bild: "pics/card" + i + ".png", paar: "paar" + i})
        kartenWerte.push({bild: "pics/card" + (17-i) + ".png", paar: "paar" + i})
    }

    for(let i = kartenWerte.length -1; i>0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [kartenWerte[i], kartenWerte[j]] = [kartenWerte[j], kartenWerte[i]];
    } // Fisher-Yates Shuffle Algorithmus

        kartenWerte.forEach((eintrag) => {
        const karte = document.createElement("div"); // ← BlaueKarte als div erstellen im HTML
        karte.classList.add("karte"); // ← das div wird zur CSS-Klasse "karte" und ist somit BLAU 
        karte.dataset.paar = eintrag.paar;

        const spielKarte = document.createElement("img");
        spielKarte.classList.add("spielkarte");
        spielKarte.src = eintrag.bild;

       
        karte.appendChild(spielKarte);
        spielbereich.appendChild(karte); // ← direkt ins Spielfeld

        karte.addEventListener("click", kartenKlick);


        
    });

 let ersteKarte = null;
let zweiteKarte = null;
let gesperrt = false;

function kartenKlick() {
    if(gesperrt) return;                        // gerade am vergleichen
    if(this === ersteKarte) return;             // gleiche Karte nochmal
    
    this.classList.add("aufgedeckt");           // ← Karte umdrehen

    if(!ersteKarte) {
        ersteKarte = this;                      // erste Karte gemerkt
        return;
    }

    zweiteKarte = this;                         // zweite Karte
    vergleichen();                              // sind sie gleich?
}

let versuche = 0;

function vergleichen() {
    versuche++;
    document.getElementById("attemptOutput").textContent=versuche; 
    if(ersteKarte.dataset.paar === zweiteKarte.dataset.paar) {
        // Paar gefunden!
        ersteKarte.dataset.aufgedeckt = "true";
        zweiteKarte.dataset.aufgedeckt = "true";
        reset();
        checkWin();
    } else {
        // kein Paar → zudecken
        gesperrt = true;
        setTimeout(() => {
            ersteKarte.classList.remove("aufgedeckt");
            zweiteKarte.classList.remove("aufgedeckt");
            reset();
        }, 1000);
    }
}

function reset() {
    ersteKarte = null;
    zweiteKarte = null;
    gesperrt = false;
}

function checkWin() { 

  
if(document.querySelectorAll(".karte:not([data-aufgedeckt='true'])").length === 0) {
    /* document.querySelectorAll liefert eine NodeList 
    NodeList.lenght -> Anzahl der Elemente in der NodeList & .karte (class) checkt
    ob alle karten nicht aufgedeckt sind, wenn ja NodeList ist leer -> length = 0 -> Alle Karten aufgedeckt -> gewonnen!

    also basically verneinung von "gibt es noch karten die nicht aufgedeckt sind?" -> wenn nein -> gewonnen!
        LocalStorage könnte man auch verwenden, um die Historie zu speichern, aber hier wird es einfach in einem Array gespeichert und direkt ausgegeben.

    */

    clearInterval(timer);
    const playerStats = document.getElementById("playerStats");
    const statsArray = []; // könnte man was draus machen...
    let name = document.getElementById("nameOutput").textContent;
    playerStats.textContent += `${name} - Versuche: ${versuche}, Zeit: ${seconds} Sekunden\n`;   
    statsArray.push({name: name, versuche: versuche, zeit: seconds});
    if(confirm(`You win! Versuche: ${versuche}, Zeit: ${seconds} Sekunden. Play again?`)) {
        versuche = 0;
        seconds = 0;
        document.getElementById("attemptOutput").textContent=versuche; 
        document.getElementById("timeOutput").textContent=seconds;
        startGame();
    } else {
        showEndScreen();
    }
}

/*
Pseudo Code:
check if every card has dataset.aufgedeckt == "true"
if yes: stop timer, alert "You win! Versuche + Zeit ausgeben" + "Play again?" (confirm)
if confirm: reset everything (timer, versuche, karten) -> speicher in History + startGame()
if no: do nothing.

*/

}

function showEndScreen() {
const spielbereich = document.getElementById("spielbereich");
spielbereich.innerHTML = "<h1>Game Over</h1><p>Thanks for playing!</p>";
}

}
