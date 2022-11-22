/**
 * Reads the name of the pokemon from the array
 * @param {number} id The ID of the chosen overview card
 * @returns The name of the pokemon
 */
function getPokemonName(id) {
    return pokemons[id]['name'];
}


/**
 * Reads the ID of the pokemon from the array
 * @param {number} id The ID of the chosen overview card
 * @returns The ID of the pokemon
 */
function getPokemonId(id) {
    return pokemons[id]['id'];
}


/**
 * Reads the type of the pokemon from the array
 * @param {number} id The ID of the chosen overview card
 * @returns The type of the pokemon
 */
function getPokemonType(id) {
    return pokemons[id]['types'][0]['type']['name'];
}


/**
 * Reads the image URL of the type of the pokemon from the array
 * @param {number} id The ID of the chosen overview card
 * @returns The image URL of the type of the pokemon
 */
function getPokemonTypeImgUrl(id) {
    const type = getPokemonType(id);
    return `./img/type_${type}.png`;
}


/**
 * Reads the image URL of the pokemon from the array
 * @param {number} id The ID of the chosen overview card
 * @returns The image URL of the pokemon
 */
function getPokemonImgUrl(id) {
    return pokemons[id]['sprites']['other']['official-artwork']['front_default'];
}


/**
 * Reads the weight of the pokemon from the array
 * @param {number} id The ID of the chosen overview card
 * @returns The weight of the pokemon
 */
function getPokemonWeight(id) {
    return pokemons[id]['weight'] / 10;
}


/**
 * Reads the height of the pokemon from the array
 * @param {number} id The ID of the chosen overview card
 * @returns The height of the pokemon
 */
function getPokemonHeight(id) {
    return pokemons[id]['height'] / 10;
}


/**
 * Reads the base experience of the pokemon from the array
 * @param {number} id The ID of the chosen overview card
 * @returns The base experience of the pokemon
 */
function getPokemonBaseExperience(id) {
    return pokemons[id]['base_experience'];
}


/**
 * Reads the abilities of the pokemon from the array
 * @param {number} id The ID of the chosen overview card
 * @returns The abilities of the pokemon
 */
function getPokemonAbilities(id) {
    const countAbilities = pokemons[id]['abilities'].length;
    let abilities = '';

    for (let a = 0; a < countAbilities; a++) {
        abilities += pokemons[id]['abilities'][a]['ability']['name'];
        if (a < countAbilities - 1) {
            abilities += ', ';
        }
    }

    return abilities;
}


/**
 * Determines the max value of the stats values
 * @param {number} id The ID of the chosen overview card
 * @returns The max value of the stats values
 */
function getStatsMaxValue(id) {
    const countStats = pokemons[id]['stats'].length;
    let statsMaxValue = 100;
    let maxValue = 0;

    for (let s = 0; s < countStats; s++) {
        const value = pokemons[id]['stats'][s]['base_stat'];
        if (maxValue < value) maxValue = value;
    }

    if (maxValue > statsMaxValue) statsMaxValue = maxValue;
    return statsMaxValue;
}


/**
 * Reads the stats entry
 * @param {number} id The ID of the chosen overview card
 * @param {number} statId The ID of the stat value
 * @param {number} statsMaxValue The max value of the stats values
 * @returns The stats entry
 */
function getPokemonStat(id, statId, statsMaxValue) {
    const statEntry = {
        'name': '',
        'value': 0,
        'diagram': 0
    };
    statEntry['name'] = pokemons[id]['stats'][statId]['stat']['name'];
    statEntry['value'] = pokemons[id]['stats'][statId]['base_stat'];
    statEntry['diagram'] = Math.round((pokemons[id]['stats'][statId]['base_stat'] * 100) / statsMaxValue);

    return statEntry;
}