const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];
let nextPage = '';


async function init() {
    await loadData(nextPage);

    console.log('Array:', pokemons); /* DISMISS ********/

    // *** HOW-TO: Set image url from server
    // let img = document.getElementById('img');
    // let imgUrl = pokemons[0]['sprites']['other']['official-artwork']['front_default'];
    // img.src = imgUrl;
}


async function loadData(range) {
    const baseData = await loadPokemonsBaseData(range);
    await loadPokemonsFullData(baseData);
}

async function loadPokemonsBaseData(range) {
    const url = `${API_URL}${range}`;
    const baseData = await fetch(url);
    const baseDataAsJson = await baseData.json();

    nextPage = '?' + baseDataAsJson.next.split('?')[1];

    return baseDataAsJson;
}


async function loadPokemonsFullData(pokemonsBaseData) {
    for (let i = 0; i < pokemonsBaseData.results.length; i++) {
        const url = pokemonsBaseData.results[i].url;
        const data = await fetch(url);
        pokemons.push(await data.json());
    }
}


function loadDetails(id) {

}


function previous() {
    // REM: Take current ID from #modalDetails > data-id
}


function next() {
    // REM: Take current ID from #modalDetails > data-id
}