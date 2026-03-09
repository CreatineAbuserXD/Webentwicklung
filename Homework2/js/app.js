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

function vergleichen() {
    if(ersteKarte.dataset.paar === zweiteKarte.dataset.paar) {
        // ✅ Paar gefunden!
        ersteKarte.dataset.aufgedeckt = "true";
        zweiteKarte.dataset.aufgedeckt = "true";
        reset();
    } else {
        // ❌ kein Paar → zudecken
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

}