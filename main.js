let monsters = []
let weapons = []

monsterTable = document.getElementById("table-monsters");
weaponTable = document.getElementById("table-weapons");
screenshots = document.getElementById("screenshots");




function addScreenshots() {
    for(i = 1; i <= 6; i++){
        screenshots.innerHTML += `<img src="/assets/images/screenshots/${i}.jpg" alt="Screenshot#${i}">`
    }
}

async function searchMonsters(event) {
    monsterTable.innerHTML = `<text class="notResults">Loading...</text>`
    let url = "https://mhw-db.com/monsters"
    let res = await fetch(url)
    let objs = await res.json()
    monsters = objs
    showMonsterTable()
}

function assembleMonsterTable(){
    return monsters.map(f => 
        `<tr class ="normalRow">
            <td><a href="https://monsterhunter.fandom.com/wiki/${f.name}" target="blank">${f.name}</a></td>
            <td>${f.type.capitalize()}</td>
            <td>${f.species.capitalize()}</td>
            <td>${f.description.capitalize()}</td>
            
        </tr>`)
}

function showMonsterTable(){
    monsterTable.innerHTML = `<tr id="thRow">
            <th id="Name" onclick="sortByTitle()">Name</th>
            <th id="Type" onclick="sortByType()">Type</th>
            <th id="Species" onclick="sortBySpecies()">Species</th>
            <th id="Description" onclick="sortByTitle()">Description</th>

            
        </tr>
        ${assembleMonsterTable().join('\n')}`;
}

async function searchWeapons(event) {
    event.preventDefault();
    let key = document.getElementById('weaponSearchbar').value

    if (key.length < 3) {
        return alert("Input more than 3 characters!");
    }

    weaponTable.innerHTML = `<text class="notResults">Loading...</text>`
    //let url = "https://mhw-db.com/weapons"
    res = await fetch(`https://mhw-db.com/weapons?q={"name":{"$like": "%${key}%"}}`)
    let objs = await res.json()

    weapons = objs
    showWeaponTable()
}


function assembleWeaponTable(){
    return weapons.map(f => 
        `<tr class ="normalRow">
            <td><a href="https://monsterhunter.fandom.com/wiki/${f.name}_(MHW)" target="blank">${f.name}</a></td>
            <td>${f.type}</td>
            <td>${f.damageType}</td>
        </tr>`)
}


function showWeaponTable(){
    weaponTable.innerHTML = `<tr id="thRow">
            <th id="Name" onclick="sortByTitle()">Name</th>
            <th id="Type" onclick="sortByType()">Type</th>
            <th id="Species" onclick="sortBySpecies()">Species</th> 
        </tr>
        ${assembleWeaponTable().join('\n')}`;
}


//Função para deixar a primeira letra de uma string em maiúsculo.
//Função tirada do StackOverflow, Link -> https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });



// Ordenações

// Ordenação por titulo

function sortByTitle() {
    if (!monsterTable.matches('.sortByTitleAsc') && !monsterTable.matches('.sortByTitleDec')){
        monsterTable.removeAttribute("class")
        sortByTitleAsc();
    } else if (monsterTable.matches('.sortByTitleAsc')){
        sortByTitleDec();
    } else {
        monsterTable.classList.remove('sortByTitleDec')
        showMonsterTable();
    }
}

function sortByTitleAsc() {
    monsterTable.classList.toggle('sortByTitleAsc')
    monsters.sort((a, b) => (a.name > b.name) ? 1 : -1);
    showMonsterTable();
}

function sortByTitleDec() {
    monsterTable.classList.remove('sortByTitleAsc')
    monsterTable.classList.toggle('sortByTitleDec')
    monsters.sort((a, b) => (a.name < b.name) ? 1 : -1);
    showMonsterTable();
}

// Ordenação por tipo

function sortByType() {
    if (!monsterTable.matches('.sortByTypeAsc') && !monsterTable.matches('.sortByTypeDec')){
        monsterTable.removeAttribute("class")
        sortByTypeAsc();
    } else if (monsterTable.matches('.sortByTypeAsc')){
        sortByTypeDec();
    } else {
        monsterTable.classList.remove('sortByTypeDec')
        showMonsterTable();
    }
}

function sortByTypeAsc() {
    monsterTable.classList.toggle('sortByTypeAsc')
    monsters.sort((a, b) => (a.type > b.type) ? 1 : -1);
    showMonsterTable();
}

function sortByTypeDec() {
    monsterTable.classList.remove('sortByTypeAsc')
    monsterTable.classList.toggle('sortByTypeDec')
    monsters.sort((a, b) => (a.type < b.type) ? 1 : -1);
    showMonsterTable();
}

// Ordenação por espécie

function sortBySpecies() {
    if (!monsterTable.matches('.sortBySpeciesAsc') && !monsterTable.matches('.sortBySpeciesDec')){
        monsterTable.removeAttribute("class")
        sortBySpeciesAsc();
    } else if (monsterTable.matches('.sortBySpeciesAsc')){
        sortBySpeciesDec();
    } else {
        monsterTable.classList.remove('sortBySpeciesDec')
        showMonsterTable();
    }
}

function sortBySpeciesAsc() {
    monsterTable.classList.toggle('sortBySpeciesAsc')
    monsters.sort((a, b) => (a.species > b.species) ? 1 : -1);
    showMonsterTable();
}

function sortBySpeciesDec() {
    monsterTable.classList.remove('sortBySpeciesAsc')
    monsterTable.classList.toggle('sortBySpeciesDec')
    monsters.sort((a, b) => (a.species < b.species) ? 1 : -1);
    showMonsterTable();
}
