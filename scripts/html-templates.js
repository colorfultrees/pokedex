/**
 * Renders the overview card
 * @param {number} id The ID of the overview card
 * @param {text} name The name of the pokemon
 * @param {text} type The type of the pokemon
 * @param {text} imgUrl The image URL of the pokemon
 * @returns The HTML code of the overview card
 */
function renderOverviewCard(id, name, type, imgUrl) {
    return `
        <div class="card-overview ${type}-box" onclick="loadDetails(${id})" data-bs-toggle="modal" data-bs-target="#modalDetails">
            <img class="bg-img-type img-type--overview" src=${getPokemonTypeImgUrl(id)}>
            <div class="card-overview--info">
                <h3>${name}</h3>
                ${renderOverviewTypes(id, type)}
            </div>
            <img class="card-overview--img-pokemon" src="${imgUrl}">
        </div>
    `;
}


/**
 * Renders the type badges
 * @param {number} id The ID of the overview card
 * @param {number} mainType The main type (first in the list) of the pokemon
 * @returns The HTML code of the type badges
 */
function renderOverviewTypes(id, mainType) {
    const countTypes= pokemons[id]['types'].length;
    let types = '';

    for (let t = 0; t < countTypes; t++) {
        const type = pokemons[id]['types'][t]['type']['name'];
        types += `<div class="pokemon-type ${mainType}-badge">${type}</div>`
    }
    
    return types;
}


/**
 * Renders the name and ID of the pokemon to the modal window
 * @param {number} id The ID of the overview card
 * @returns The HTML code of name and poekmon ID
 */
function renderModalInfoName(id) {
    const name = getPokemonName(id);
    const pkmonId = getPokemonId(id);
    return `
        <h2 id="info-name">${name}</h2>
        <span id="info-id">#${pkmonId}</span>
    `;
}


/**
 * Renders the image of the pokemon and the nav buttons to the modal window
 * @param {number} id The ID of the overview card
 * @returns The HTML code of the image wrapper
 */
function renderModalPokemonImgWrapper(id) {
    const previous = id - 1;
    const next = id + 1;
    const visPrev = checkVisPrev(id);
    const visNext = checkVisNext(id);
    return `
        <div class="nav-btn" onclick="previous(${previous})" style="visibility: ${visPrev};"><img src="./img/double-arrow-left.png" alt="previous"></div>
        <img id="modal-header--img-pokemon" src=${getPokemonImgUrl(id)}>
        <div class="nav-btn" onclick="next(${next})"  style="visibility: ${visNext};"><img src="./img/double-arrow-right.png" alt="next"></div>
    `;
}


/**
 * Renders the "About" table
 * @param {number} height The height of the pokemon
 * @param {number} weight The weight of the pokemon
 * @param {number} baseExp The base experience of the pokemon
 * @param {Array} abilities The list of abilities of the pokemon
 * @returns The HTML code of the "About" table
 */
function renderTableAbout(height, weight, baseExp, abilities) {
    return `
        <tr>
            <td>Height:</td>
            <td>${height} m</td>
        </tr>
        <tr>
            <td>Weight:</td>
            <td>${weight} kg</td>
        </tr>
        <tr>
            <td>Base experience:</td>
            <td>${baseExp}</td>
        </tr>
        <tr>
            <td>Abilities:</td>
            <td>${abilities}</td>
        </tr>
    `;
}


/**
 * Renders the "Stats" table
 * @param {number} id The ID of the overview card
 * @param {number} statsMaxValue The max value of the stats
 * @returns The HTML code of the "Stats" table
 */
function renderTableStats(id, statsMaxValue) {
    const countStats = pokemons[id]['stats'].length;
    let statsHtml = '';

    for (let s = 0; s < countStats; s++) {
        const stat = getPokemonStat(id, s, statsMaxValue);
        let progBarColor = '';
        if (stat['diagram'] < 50) {
            progBarColor = progressBarColor['low'];
        }
        else {
            progBarColor = progressBarColor['high'];
        }
        statsHtml += `
            <tr>
                <td>${stat['name']}</td>
                <td>${stat['value']}</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar ${progBarColor}" role="progressbar"
                            aria-label="Success example" style="width: ${stat['diagram']}%" aria-valuenow="${stat['diagram']}"
                            aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </td>
            </tr>
        `;
    }

    return statsHtml;
}


/**
 * Renders the list of moves
 * @param {number} id The ID of the overview card
 * @returns The HTML code of the list of moves
 */
function renderMoves(id) {
    const countMoves = pokemons[id]['moves'].length;
    let movesHtml = '';

    for (let m = 0; m < countMoves; m++) {
        const move = pokemons[id]['moves'][m]['move']['name'];
        movesHtml += `<span class="move">${move}</span>`;
    }

    return movesHtml;
}