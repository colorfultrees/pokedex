const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];
const endOfFile = '--EOF--';
const progressBarColor = {
    'low': 'bg-danger',
    'high': 'bg-success'
};
let pokemonsCount = 0;
let nextPage = '';
let isEndOfData = false;



async function init() {
    const container = document.getElementById('main-container');
    container.innerHTML = '';
    await loadData();
    renderOverview();

    // *** HOW-TO: Set image url from server
    // let img = document.getElementById('img');
    // let imgUrl = pokemons[0]['sprites']['other']['official-artwork']['front_default'];
    // img.src = imgUrl;
}


function addScrollEvent() {
    window.addEventListener('scroll', isEndOfPage);
}


function deleteScrollEvent() {
    window.removeEventListener('scroll', isEndOfPage);
}


async function isEndOfPage() {
    // console.log(`innerHeight: ${window.innerHeight}, scrollY: ${window.scrollY}, scrollHeight: ${document.body.scrollHeight}`);
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        await loadData();
        renderOverview();
    }
}


async function loadData() {
    deleteScrollEvent();
    const baseData = await loadPokemonsBaseData();
    await loadPokemonsFullData(baseData);
}

async function loadPokemonsBaseData() {
    const url = `${API_URL}${nextPage}`;
    const baseData = await fetch(url);
    const baseDataAsJson = await baseData.json();

    try {
        nextPage = '?' + baseDataAsJson.next.split('?')[1];
    }
    catch {
        isEndOfData = true;
        nextPage = endOfFile;
    }
    
    return baseDataAsJson;
}


async function loadPokemonsFullData(pokemonsBaseData) {
    for (let i = 0; i < pokemonsBaseData.results.length; i++) {
        const url = pokemonsBaseData.results[i].url;
        const data = await fetch(url);
        pokemons.push(await data.json());
    }

    if (!isEndOfData) addScrollEvent();
    
    /* TEST ********/
    console.log('Array:', pokemons);
    console.log('Next page:', nextPage);
    /* TEST ********/
}


function renderOverview() {
    const container = document.getElementById('main-container');
    
    for (let i = pokemonsCount; i < pokemons.length; i++) {
        const name = getPokemonName(i);
        const type = getPokemonType(i);
        const imgUrl = getPokemonImgUrl(i);
        container.innerHTML += renderOverviewCard(i, name, type, imgUrl);
    }

    pokemonsCount = pokemons.length;
}


function loadDetails(id) {
    loadDetailsHeader(id);
    loadDetailsAbout(id);
    loadDetailsStats(id);
}


function loadDetailsHeader(id) {
    const infoName = document.getElementById('modal-header--info-name');
    const infoType = document.getElementById('modal-header--info-type');
    const imgWrapper = document.getElementById('modal-header--img-wrapper');
    setStyleByType(id);
    setModalBgImgType(id);
    infoName.innerHTML = renderModalInfoName(id);
    infoType.innerHTML = renderOverviewTypes(id, getPokemonType(id));
    imgWrapper.innerHTML = renderModalPokemonImgWrapper(id);
}


function loadDetailsAbout(id) {
    const tableAbout = document.getElementById('table-about');
    const weight = getPokemonWeight(id);
    const height = getPokemonHeight(id);
    const baseExp = getPokemonBaseExperience(id);
    const abilities = getPokemonAbilities(id);
    tableAbout.innerHTML = renderTableAbout(height, weight, baseExp, abilities);
}


function loadDetailsStats(id) {
    const tableStats = document.getElementById('stats-table');
    const upperBaseValue = getUpperBaseValue(id);
    tableStats.innerHTML = renderTableStats(id, upperBaseValue);
}

function previous() {
    // REM: Take current ID from #modalDetails > data-id
}


function next() {
    // REM: Take current ID from #modalDetails > data-id
}


function setStyleByType(id) {
    const contentContainer = document.getElementById('modal-content');
    const type = getPokemonType(id);

    // Remove the '*-box' class
    const classes = contentContainer.className.split(' ');
    const classToBeRemoved = classes.filter((c) => {
        return c.indexOf('box') !== -1;
    });
    contentContainer.classList.remove(classToBeRemoved[0]);

    // Add the class for the current type
    contentContainer.classList.add(type + '-box');
}


function setModalBgImgType(id) {
    const img = document.getElementById('modal--img-type');
    const tpyeImgUrl = getPokemonTypeImgUrl(id);
    img.src = tpyeImgUrl;
}


function checkVisPrev(id) {
    if (id == 0) {
        return 'hidden';
    }
    else {
        return 'visible';
    }
}


function checkVisNext(id) {
    if (id == pokemons.length - 1 && nextPage == endOfFile) {
        return 'hidden';
    }
    else {
        return 'visible';
    }
}