const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const progressBarColor = {
    'low': 'bg-danger',
    'high': 'bg-success'
};
let pokemonsDisplay = []; // Contains the pokemons to be displayed
                          // A - All by standard
                          // B - Filtered when search is active
let pokemonsAll = []; // Contains all pokemons loaded
let pokemonsCount = 0;
let nextPage = '';
let isEndOfData = false;
let isSearchActive = false;


/**
 * Initialises the document:
 * Loads the first data block and renders it
 */
async function init() {
    const container = document.getElementById('main-container');
    container.innerHTML = '';
    showLoader();
    await loadData();
    await renderOverview();
    hideLoader();
}


/**
 * Adds an eventlistener for scrolling event to the window
 */
function addScrollEvent() {
    window.addEventListener('scroll', isEndOfPage);
}


/**
 * Removes the eventlistener for scrolling event from the window
 */
function removeScrollEvent() {
    window.removeEventListener('scroll', isEndOfPage);
}


/**
 * Loads the next data block and renders it, if the end of the page is reached
 */
async function isEndOfPage() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        showLoader();
        await loadData();
        await renderOverview();
        hideLoader();
    }
}


/**
 * Invokes the loading of the next data block
 */
async function loadData() {
    removeScrollEvent();
    const baseData = await loadPokemonsBaseData();
    await loadPokemonsFullData(baseData);
}


/**
 * Loads the raw data and converts it to json
 * @returns The data in json format
 */
async function loadPokemonsBaseData() {
    const url = `${API_URL}${nextPage}`;
    const baseData = await fetch(url);
    const baseDataAsJson = await baseData.json();

    try {
        // Remember the next setting for the next data block as sent by the server
        nextPage = '?' + baseDataAsJson.next.split('?')[1];
    }
    catch {
        isEndOfData = true;
    }
    
    return baseDataAsJson;
}


/**
 * Loads the detailed data for each pokemon
 * @param {text} pokemonsBaseData The raw data converted to json
 */
async function loadPokemonsFullData(pokemonsBaseData) {
    for (let i = 0; i < pokemonsBaseData.results.length; i++) {
        const url = pokemonsBaseData.results[i].url;
        const data = await fetch(url);
        pokemonsDisplay.push(await data.json());
    }
    pokemonsAll = [...pokemonsDisplay];

    if (!isEndOfData) addScrollEvent();
}


/**
 * Renders the main screen
 */
function renderOverview() {
    const container = document.getElementById('main-container');
    let start = 0;
    if (!isSearchActive) start = pokemonsCount;
    
    for (let i = start; i < pokemonsDisplay.length; i++) {
        const name = getPokemonName(i);
        const type = getPokemonType(i);
        const imgUrl = getPokemonImgUrl(i);
        container.innerHTML += renderOverviewCard(i, name, type, imgUrl);
    }

    if (!isSearchActive) pokemonsCount = pokemonsDisplay.length;

    return true;
}


/**
 * Loads details to the modal window
 * @param {number} id The ID of the chosen overview card
 */
function loadDetails(id) {
    loadDetailsHeader(id);
    loadDetailsAbout(id);
    loadDetailsStats(id);
    loadDetailsMoves(id);
}


/**
 * Loads the data for the header of the modal window
 * @param {number} id The ID of the chosen overview card
 */
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


/**
 * Loads the data for the "About" tab of the modal window
 * @param {number} id The ID of the chosen overview card
 */
function loadDetailsAbout(id) {
    const tableAbout = document.getElementById('table-about');
    const weight = getPokemonWeight(id);
    const height = getPokemonHeight(id);
    const baseExp = getPokemonBaseExperience(id);
    const abilities = getPokemonAbilities(id);
    tableAbout.innerHTML = renderTableAbout(height, weight, baseExp, abilities);
}


/**
 * Loads the data for the "Stats" tab of the modal window
 * @param {number} id The ID of the chosen overview card
 */
function loadDetailsStats(id) {
    const tableStats = document.getElementById('stats-table');
    const upperBaseValue = getStatsMaxValue(id);
    tableStats.innerHTML = renderTableStats(id, upperBaseValue);
}


/**
 * Loads the data for the "Moves" tab of the modal window
 * @param {number} id The ID of the chosen overview card
 */
function loadDetailsMoves(id) {
    const movesTab = document.getElementById('moves-tab-pane');
    movesTab.innerHTML = renderMoves(id);
}


/**
 * Loads the data of the previous pokemon
 * @param {number} prevId The ID of the previous pokemon
 */
function previous(prevId) {
    loadDetails(prevId);
}


/**
 * Loads the data of the next pokemon
 * @param {number} prevId The ID of the next pokemon
 */
async function next(nextId) {
    if (nextId == pokemonsDisplay.length && !isSearchActive) {
        await loadData();
        renderOverview();
    }
    loadDetails(nextId);
}


/**
 * Sets the background color of the modal window depending on the main type of the pokemon
 * @param {number} id The ID of the chosen overview card
 */
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


/**
 * Sets the background image of the modal window depending on the main type of the pokemon
 * @param {number} id The ID of the chosen overview card
 */
function setModalBgImgType(id) {
    const img = document.getElementById('modal--img-type');
    const tpyeImgUrl = getPokemonTypeImgUrl(id);
    img.src = tpyeImgUrl;
}


/**
 * Sets the visibility of the "previous" button
 * @param {number} id The ID of the chosen overview card
 * @returns The visibility setting for the "previous" button
 */
function checkVisPrev(id) {
    if (id == 0) {
        return 'hidden';
    }
    else {
        return 'visible';
    }
}


/**
 * Sets the visibility of the "next" button
 * @param {number} id The ID of the chosen overview card
 * @returns The visibility setting for the "next" button
 */
function checkVisNext(id) {
    if (id == pokemonsDisplay.length - 1 && (isEndOfData || isSearchActive)) {
        return 'hidden';
    }
    else {
        return 'visible';
    }
}


/**
 * Performs the search
 */
function doSearch() {
    const searchResult = getSearchResult();

    if (searchResult.length == 0) {
        showSearchMessage();
    }
    else {
        showSearchResult(searchResult);
    }
}


/**
 * Filters the list of pokemons by name as given in the search field
 * @returns An Array with the search result
 */
function getSearchResult() {
    const searchTerm = document.querySelector('form input').value;
    let searchResult = [];
    searchResult = pokemonsAll.filter((item) => {
        return item['name'].indexOf(searchTerm) >= 0;
    });
    return searchResult;
}


/**
 * Displays a message if the seach was unsuccessful
 */
function showSearchMessage() {
    const searchMessage = document.getElementById('search-message');
        const msg = new bootstrap.Toast(searchMessage);
        msg.show()
}


/**
 * Renders the search result to the main window
 * @param {Array} searchResult The list of pokemons filterd by name
 */
function showSearchResult(searchResult) {
    const searchField = document.querySelector('form input');
    searchField.style = 'background-color: var(--bs-warning)';
    isSearchActive = true;
    pokemonsDisplay = [...searchResult];
    removeScrollEvent();
    clearOverview();
    renderOverview();
}


/**
 * Clears the search input field and resets the main window
 */
async function clearSearch() {
    const searchField = document.querySelector('form input');
    searchField.value = '';
    searchField.style = '';

    if (!isSearchActive) return;

    showLoader();

    pokemonsDisplay = [...pokemonsAll]; // Restore the full list
    clearOverview();
    await renderOverview();
    addScrollEvent();
    isSearchActive = false;

    hideLoader();
}


/**
 * Clears the main window
 */
function clearOverview() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';
}


/**
 * Shows the loader
 */
function showLoader() {
    const loader = document.getElementById('loader-container');
    loader.classList.remove('d-none');
}


/**
 * Hides the loader
 */
function hideLoader() {
    const loader = document.getElementById('loader-container');
    loader.classList.add('d-none');
}