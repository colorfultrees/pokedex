function getPokemonName(id) {
    return pokemons[id]['name'];
}


function getPokemonId(id) {
    return pokemons[id]['id'];
}


function getPokemonType(id) {
    return pokemons[id]['types'][0]['type']['name'];
}


function getPokemonTypeImgUrl(id) {
    const type = getPokemonType(id);
    return `./img/type_${type}.png`;
}


function getPokemonImgUrl(id) {
    return pokemons[id]['sprites']['other']['official-artwork']['front_default'];
}


function getPokemonWeight(id) {
    return pokemons[id]['weight'] / 10;
}


function getPokemonHeight(id) {
    return pokemons[id]['height'] / 10;
}


function getPokemonBaseExperience(id) {
    return pokemons[id]['base_experience'];
}


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


function getUpperBaseValue(id) {
    const countStats = pokemons[id]['stats'].length;
    let upperBaseValue = 100;
    let maxValue = 0;

    for (let s = 0; s < countStats; s++) {
        const value = pokemons[id]['stats'][s]['base_stat'];
        if (maxValue < value) maxValue = value;
    }

    if (maxValue > upperBaseValue) upperBaseValue = maxValue;
    return upperBaseValue;
}

function getPokemonStat(id, statId, upperBaseValue) {
    const statEntry = {
        'name': '',
        'value': 0,
        'diagram': 0
    };
    statEntry['name'] = pokemons[id]['stats'][statId]['stat']['name'];
    statEntry['value'] = pokemons[id]['stats'][statId]['base_stat'];
    statEntry['diagram'] = Math.round((pokemons[id]['stats'][statId]['base_stat'] * 100) / upperBaseValue);

    return statEntry;
}