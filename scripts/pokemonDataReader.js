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
    const weight = parseInt(pokemons[id]['weight']) / 10;
    return weight.toString();
}


function getPokemonHeight(id) {
    const height = parseInt(pokemons[id]['height']) / 10;
    return height.toString();
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