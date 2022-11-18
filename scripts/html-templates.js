function renderOverviewCard(id, name, type, imgUrl) {
    return `
        <div class="card-overview ${type}-box" onclick="loadDetails(${id})" data-bs-toggle="modal" data-bs-target="#modalDetails">
            <img class="bg-img-type img-type--overview" src="./img/type_${type}.png">
            <div class="card-overview--info">
                <h3>${name}</h3>
                ${renderOverviewTypes(type)}
            </div>
            <img class="card-overview--img-pokemon" src="${imgUrl}">
        </div>
    `;
}


function renderOverviewTypes(id, mainType) {
    const countTypes= pokemons[id][types].length;
    let types = '';

    for (let t = 0; t < countTypes; t++) {
        const type = pokemons[id][types][t][type][name];
        types += `<div class="pokemon-type ${mainType}-badge">${type}</div>`
    }
    
    return types;
}