const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const progressBarColor = {
    'low': 'bg-danger',
    'high': 'bg-success'
};
let pokemons = [];
let pokemonsTmp = [];
let pokemonsCount = 0;
let nextPage = '';
let isEndOfData = false;
let isSearchActive = false;



async function init() {
    const container = document.getElementById('main-container');
    container.innerHTML = '';
    await loadData();
    renderOverview();
}


function addScrollEvent() {
    window.addEventListener('scroll', isEndOfPage);
}


function removeScrollEvent() {
    window.removeEventListener('scroll', isEndOfPage);
}


async function isEndOfPage() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        await loadData();
        renderOverview();
    }
}


async function loadData() {
    removeScrollEvent();
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
}


function renderOverview() {
    const container = document.getElementById('main-container');
    let start = 0;
    if (!isSearchActive) start = pokemonsCount;
    
    for (let i = start; i < pokemons.length; i++) {
        const name = getPokemonName(i);
        const type = getPokemonType(i);
        const imgUrl = getPokemonImgUrl(i);
        container.innerHTML += renderOverviewCard(i, name, type, imgUrl);
    }

    if (!isSearchActive) pokemonsCount = pokemons.length;
}


function loadDetails(id) {
    loadDetailsHeader(id);
    loadDetailsAbout(id);
    loadDetailsStats(id);
    loadDetailsMoves(id);
}


function loadDetailsHeader(id) {
    const infoName = document.getElementById('modal-header--info-name');
    const infoType = document.getElementById('modal-header--info-type');
    const imgWrapper = document.getElementById('modal-header--img-wrapper');
    setModalBgColor(id);
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


function loadDetailsMoves(id) {
    const movesTab = document.getElementById('moves-tab-pane');
    movesTab.innerHTML = renderMoves(id);
}


function previous(prevId) {
    loadDetails(prevId);
}


async function next(nextId) {
    if (nextId == pokemons.length && !isSearchActive) {
        await loadData();
        renderOverview();
    }
    loadDetails(nextId);
}


function setModalBgColor(id) {
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
    if (id == pokemons.length - 1 && (isEndOfData || isSearchActive)) {
        return 'hidden';
    }
    else {
        return 'visible';
    }
}


function doSearch() {
    const searchResult = getSearchResult();

    if (searchResult.length == 0) {
        showSearchMessage();
    }
    else {
        showSearchResult(searchResult);
    }
}


function getSearchResult() {
    const searchTerm = document.querySelector('form input').value;
    let searchResult = [];
    searchResult = pokemons.filter((item) => {
        return item['name'].indexOf(searchTerm) >= 0;
    });
    return searchResult;
}


function showSearchMessage() {
    const searchMessage = document.getElementById('search-message');
        const msg = new bootstrap.Toast(searchMessage);
        msg.show()
}


function showSearchResult(searchResult) {
    isSearchActive = true;
        pokemonsTmp = [...pokemons]; // Store the current list
        pokemons = [...searchResult];
        removeScrollEvent();
        clearOverview();
        renderOverview();
}


function clearSearch() {
    const searchField = document.querySelector('form input');
    searchField.value = '';
    pokemons = [...pokemonsTmp]; // Restore the full list
    pokemonsTmp = [];
    clearOverview();
    renderOverview();
    addScrollEvent();
    isSearchActive = false;
}


function clearOverview() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';
}