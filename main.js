let monsters = []
let weapons = []
let locations = []
let newLocations = []
let items = []
let newItems = []

monsterTable = document.getElementById("table-monsters");
weaponTable = document.getElementById("table-weapons");
locationTable = document.getElementById("table-locations");
itemTable = document.getElementById("table-items");
screenshots = document.getElementById("screenshots");


//Função para deixar a primeira letra de uma string em maiúsculo.
//Função tirada do StackOverflow, Link -> https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

// Home

function addScreenshots() {
    for(i = 1; i <= 6; i++){
        screenshots.innerHTML += `<img src="/assets/images/screenshots/${i}.jpg" alt="Screenshot#${i}">`
    }
}

// Monsters

async function searchMonsters(event) {
    event.preventDefault();
    monsterTable.innerHTML = `<text class="notResults">Loading...</text>`
    let key = document.getElementById('monsterSearchbar').value
    if (key.length < 3) {
        return monsterTable.innerHTML = `<text class="notResults">Input at least 3 characters!</text>`
    }
    let url = `https://mhw-db.com/monsters?q={"name":{"$like": "%${key}%"}}`
    let res = await fetch(url)
    let objs = await res.json()
    monsters = objs

    if (monsters == 0) {
        return monsterTable.innerHTML = `<tr><td>No Results</td></tr>`;
    } else{
        return showMonsterTable();
    }
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

// Weapons

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
    
    if (weapons == 0) {
        return weaponTable.innerHTML = `<tr><td>No Results</td></tr>`;
    } else{
        return showWeaponTable();
    }

}


function assembleWeaponTable(){
    return weapons.map(f => 
        `<tr class ="normalRow">
            <td><a href="https://monsterhunter.fandom.com/wiki/${f.name}_(MHW)" target="blank">${f.name}</a></td>
            <td>${f.type.capitalize()}</td>
            <td>${f.damageType.capitalize()}</td>
        </tr>`)
}


function showWeaponTable(){
    weaponTable.innerHTML = `<tr id="thRow">
            <th id="Name" onclick="sortByTitle()">Name</th>
            <th id="Type" onclick="sortByType()">Type</th>
            <th id="damageType" onclick="sortBySpecies()">Damage Type</th> 
        </tr>
        ${assembleWeaponTable().join('\n')}`;
}

// Locations

async function getLocations() {
    let url = 'https://mhw-db.com/locations'
    let res = await fetch(url)
    let objs = await res.json()
    locations = objs

    return showLocationTable1();
}

async function searchLocations(event) {
    event.preventDefault();
    let key = document.getElementById('locationSearchbar').value

    newLocations = locations.filter(location => location.name.toUpperCase().includes(key.toUpperCase()))

    if (key.length == 0) {
        return showLocationTable1();
    }

    if (locations == 0) {
        return locationTable.innerHTML = `<tr><td>No Results</td></tr>`;
    } else{
        return showLocationTable2();
    }
}

function assembleLocationTable1(){
    return locations.map(f => 
        `<tr class ="normalRow">
            <td><a href="https://monsterhunter.fandom.com/wiki/${f.name}" target="blank">${f.name}</a></td>
            <td>${f.zoneCount}</td>
        </tr>`)
}

function assembleLocationTable2(){
    return newLocations.map(f => 
        `<tr class ="normalRow">
            <td><a href="https://monsterhunter.fandom.com/wiki/${f.name}" target="blank">${f.name}</a></td>
            <td>${f.zoneCount}</td>
        </tr>`)
}

function showLocationTable1(){
    locationTable.innerHTML = `<tr id="thRow">
            <th id="Name" onclick="sortByTitle()">Name</th>
            <th id="zoneNumber" onclick="sortByType()">Nº of zones</th>
        </tr>
        ${assembleLocationTable1().join('\n')}`;
}

function showLocationTable2(){
    locationTable.innerHTML = `<tr id="thRow">
            <th id="Name" onclick="sortByTitle()">Name</th>
            <th id="zoneNumber" onclick="sortByType()">Nº of zones</th>
        </tr>
        ${assembleLocationTable2().join('\n')}`;
}

// Items
async function getItems() {
    let url = 'https://mhw-db.com/items'
    let res = await fetch(url)
    let objs = await res.json()
    items = objs

    searchItems();
}


async function searchItems(event) {
    event.preventDefault();
    let key = document.getElementById('itemSearchbar').value

    let rar = document.getElementById('itemRarity');
    var value = rar.options[rar.selectedIndex].value;

    if (key.length == 0) {
        newItems = items.filter(item => item.rarity == value);
        if (newItems == 0) {
            return itemTable.innerHTML = `<tr><td>No Results</td></tr>`;
        } else{
            return showItemTable();
        }
    }

    newItems = items.filter(item => item.name.toUpperCase().includes(key.toUpperCase()) && item.rarity == value)

    if (newItems == 0) {
        return itemTable.innerHTML = `<tr><td>No Results</td></tr>`;
    } else{
        return showItemTable();
    }

}

function assembleItemTable(){
    return newItems.map(f => 
        `<tr class ="normalRow">
            <td>${f.name}</td>
            <td>${f.description}</td>
            <td>${f.rarity}</td>
        </tr>`)
}

function showItemTable(){
    itemTable.innerHTML = `<tr id="thRow">
            <th id="Name">Name</th>
            <th id="Description">Description</th>
            <th id="Rarity">Rarity</th>
        </tr>
        ${assembleItemTable().join('\n')}`;
}

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
