let playerName = "Konstruktore";
let selectedEfficiency = 0;
let shipVolume = 0;

// Funkce pro scrollování
function scrollToLesson() {
    document.getElementById('lesson').scrollIntoView({ behavior: 'smooth' });
}

// Herní modal
function openGame() {
    document.getElementById('gameOverlay').classList.remove('hidden');
}

function closeGame() {
    document.getElementById('gameOverlay').classList.add('hidden');
}

// Krok 0: Jméno
function confirmName() {
    const input = document.getElementById('playerNameInput').value;
    if (input.trim() !== "") {
        playerName = input;
    }
    document.getElementById('stepName').classList.add('hidden');
    document.getElementById('stepShape').classList.remove('hidden');
    document.getElementById('shapeText').innerText = `Výborně, ${playerName}! Benimaru potřebuje loď. Vyber tvar trupu...`;
}

// Krok 1: Výběr tvaru
function selectShape(element) {
    selectedEfficiency = parseFloat(element.dataset.eff);
    shipVolume = parseFloat(element.dataset.vol);
    
    // Výpočet vztlaku: Fvz = V * rho * g
    const rho = 1000;
    const g = 9.81;
    const fvz = Math.round(shipVolume * rho * g);

    document.getElementById('calcV').innerText = shipVolume + " m³";
    document.getElementById('calcFvz').innerText = fvz.toLocaleString() + " N";
    
    document.getElementById('shapeGrid').classList.add('hidden');
    document.getElementById('shapeResult').classList.remove('hidden');
    document.getElementById('shapeResultText').innerText = `Skvělá volba! Tento trup vytlačí dost vody na to, aby udržel náklad o síle ${fvz.toLocaleString()} Newtonů!`;
}

// Krok 2: Vyvažování
function goToBalance() {
    document.getElementById('stepShape').classList.add('hidden');
    document.getElementById('stepBalance').classList.remove('hidden');
    updateBalance();
}

function updateBalance() {
    const crew = parseInt(document.getElementById('slCrew').value);
    const food = parseInt(document.getElementById('slFood').value);
    const weapons = parseInt(document.getElementById('slWeapon').value);

    // Přepočet na tuny (voják = 0.08t)
    const totalLoad = (crew * 0.08) + food + weapons;
    const capacity = shipVolume; // Pro zjednodušení 1m3 = 1tuna nosnosti

    document.getElementById('lblCrew').innerText = crew + " lidí";
    document.getElementById('lblFood').innerText = food + " t";
    document.getElementById('lblWeapon').innerText = weapons + " t";

    document.getElementById('bCap').innerText = capacity.toFixed(1);
    document.getElementById('bLoad').innerText = totalLoad.toFixed(1);
    
    const margin = capacity - totalLoad;
    document.getElementById('bMargin').innerText = margin.toFixed(1);

    // Vizuální ponor
    const sinkPercent = (totalLoad / capacity) * 50; // Max 50% výšky
    document.getElementById('shipBelow').style.height = Math.min(sinkPercent, 100) + "px";
    
    if (margin < 0) {
        document.getElementById('bMargin').style.color = "red";
    } else {
        document.getElementById('bMargin').style.color = "green";
    }
}

function checkBalance() {
    const load = parseFloat(document.getElementById('bLoad').innerText);
    const cap = parseFloat(document.getElementById('bCap').innerText);
    const resBox = document.getElementById('balanceResult');
    const resText = document.getElementById('balanceResultText');
    const resChar = document.getElementById('balanceResultChar');
    
    resBox.classList.remove('hidden');
    document.getElementById('balanceCheckRow').classList.add('hidden');

    if (load > cap) {
        resChar.src = "images/Rimuri2.webp"; // Zklamaný/přemýšlející
        resText.innerText = `${playerName}! Loď je to moc těžká vole co děláš!. Shioniny dobroty skončily na dně jezera... Asi začni utíkat Shion si tě najde!`;
    } else {
        resChar.src = "images/Rimuri.webp"; // Nadšený
        resText.innerText = `To ujde ${playerName}! Loď pluje perfektně. Seš Sigma gratuluju. Archimédův zákon jsi ovládl na jedničku. A koukej makat dál!`;
    }
    
    // Výpis finálního vzorce
    document.getElementById('finalCalcBox').innerHTML = `
        <div class="calc-row"><span>Tvůj objem V:</span><strong>${cap} m³</strong></div>
        <div class="calc-row"><span>Vztlak Fvz:</span><strong>${Math.round(cap * 9810)} N</strong></div>
        <div class="calc-row"><span>Váha nákladu:</span><strong>${Math.round(load * 9810)} N</strong></div>
    `;
}

function restartGame() {
    location.reload();
}