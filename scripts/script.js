const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];
let nextPage = '';


async function init() {
    await loadPokemonsBaseData('');

    console.log('Array:', pokemons);

    // *** HOW-TO: Set image url from server
    // let img = document.getElementById('img');
    // let imgUrl = pokemons[0]['sprites']['other']['official-artwork']['front_default'];
    // img.src = imgUrl;
}


async function loadPokemonsBaseData(range) {
    const url = `${API_URL}${range}`;
    const baseData = await fetch(url);
    const baseDataAsJson = await baseData.json();

    await loadPokemonsFullData(baseDataAsJson);

    nextPage = '?' + baseDataAsJson.next.split('?')[1];
}


async function loadPokemonsFullData(pokemonsBaseData) {
    for (let i = 0; i < pokemonsBaseData.results.length; i++) {
        const url = pokemonsBaseData.results[i].url;
        const data = await fetch(url);
        pokemons.push(await data.json());
    }
}