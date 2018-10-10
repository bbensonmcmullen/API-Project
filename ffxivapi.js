const baseURL = 'https://xivapi.com/';
const key = '2d2b2c5b2d21470f8107ba83';
let url;

const submitBtn = document.querySelector('.submit');
const section = document.querySelector('section');
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search');
const bottomPart = document.querySelector('.results')


searchForm.addEventListener('submit', fetchSearch);

function fetchSearch(e){
    console.log(e);
    e.preventDefault();
    url = baseURL + 'search?string=' + searchInput.value + '&indexes=item' + '&key=' + key;
    fetch(url)
        .then(function(result){
            return result.json();
        }) .then(function(json){
            displaySearch(json);
        })
        
}

function displaySearch(json){
    while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
    console.log(json);

    let results = json.Results;
    console.log(results);
    if (results.length === 0){
        console.log('No results.');
    } else {
        for (let i = 0; i < results.length; i++){
            let current = results[i];
            // let name = document.createElement('h2');
            let data= document.createElement('div');
            let img = document.createElement('img');
            let heading = document.createElement('h2');
            let link = document.createElement('a');
            let objType = document.createElement('p');
            let topBreakage = document.createElement('br');
            let breakage = document.createElement('hr');
            let className = document.createElement ('p');
            let ilvldoc = document.createElement('p');
            let reqlvldoc = document.createElement('p');
            let clearfix = document.createElement('div');
            let gameType = current.GameType;
            let classInfo = current['ClassJobCategory.Name'];
            let ilvl = current.LevelItem;
            let reqlvl = current.LevelEquip;

            link.href = 'https://xivapi.com' + current.Url;
            link.textContent = current.Name;
            ilvldoc.textContent = `Item Level: ${ilvl}`
            reqlvldoc.textContent = `Required Level: ${reqlvl}`
            className.textContent = `Classes: ${classInfo}`;



    if (current.Icon.length > 0){
        img.src = baseURL + current.Icon;
    }

    if (current.GameType == 'Item'){
    clearfix.setAttribute('class', 'clearfix');
    data.setAttribute('class', 'col-6 realstuff');

    data.appendChild(heading);
    heading.appendChild(topBreakage);
    heading.appendChild(img);
    heading.appendChild(link);
    heading.appendChild(breakage);
    data.appendChild(className);
    data.appendChild(ilvldoc);
    data.appendChild(reqlvldoc);
    data.appendChild(clearfix);
    section.appendChild(data);
    }

    if (current['ItemKind.Name'] == "Armor"){
        let defMag = document.createElement('p');
        let defPhy = document.createElement('p');

        defMag.textContent = `Magic Def: ${current.DefenseMag}`;
        defPhy.textContent = `Phys Def: ${current.DefensePhys}`;
        data.appendChild(defMag);
        data.appendChild(defPhy);
    }

    if (current['ItemKind.Name'] == "Arms"){
        let dmgMag = document.createElement('p');
        let dmgPhy = document.createElement('p');
        let delay = document.createElement('p');

        dmgMag.textContent = `Magic Dmg: ${current.DamageMag}`;
        dmgPhy.textContent = `Phys Dmg: ${current.DamagePhys}`;
        delay.textContent = `Atk Delay: ${current.DelayMs} ms`;
        data.appendChild(dmgMag);
        data.appendChild(dmgPhy);
        data.appendChild(delay);
    }

}}}