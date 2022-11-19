const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];
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


function renderOverview() {
    const container = document.getElementById('main-container');
    
    for (let i = pokemonsCount; i < pokemons.length - 1; i++) {
        const name = pokemons[i]['name'];
        const type = pokemons[i]['types'][0]['type']['name'];
        const imgUrl = pokemons[i]['sprites']['other']['official-artwork']['front_default'];
        container.innerHTML += renderOverviewCard(i, name, type, imgUrl);
    }

    pokemonsCount = pokemons.length;
}


function loadDetails(id) {

}


function previous() {
    // REM: Take current ID from #modalDetails > data-id
}


function next() {
    // REM: Take current ID from #modalDetails > data-id
}