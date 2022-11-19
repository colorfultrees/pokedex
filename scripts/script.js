const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];
let nextPage = '';
let isEndOfData = false;



async function init() {
    await loadData();

    // *** HOW-TO: Set image url from server
    // let img = document.getElementById('img');
    // let imgUrl = pokemons[0]['sprites']['other']['official-artwork']['front_default'];
    // img.src = imgUrl;
}


function addScrollEvent() {
    window.addEventListener('scroll', loadData);
}


function deleteScrollEvent() {
    window.removeEventListener('scroll', loadData);
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
        nextPage = '--EOF--'
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


function loadDetails(id) {

}


function previous() {
    // REM: Take current ID from #modalDetails > data-id
}


function next() {
    // REM: Take current ID from #modalDetails > data-id
}