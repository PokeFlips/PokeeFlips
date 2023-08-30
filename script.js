const pokedex = document.getElementById('pokedex');
const popupContainer = document.getElementById('popupContainer');
const cachedPokemon = {};

const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const renderPokemonCard = (pokeman) => {
    return `
        <li class="card" onclick="selectPokemon(${pokeman.id})">
            <img class="card-image" src="${pokeman.image}" alt="${pokeman.name}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        </li>
    `;
};

const fetchAndDisplayPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const data = await fetchData(url);

    const pokemon = data.results.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));

    const pokemonHTMLString = pokemon.map(renderPokemonCard).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const generatePopupHtml = (pokemonData, type, stats) => {
    const statHtml = stats.map(stat => `<p>${capitalizeFirstLetter(stat.stat.name)}: ${stat.base_stat}</p>`).join('');
    return `
        <div class="popup">
            <div class="card">
                <button id="closeBtn" onclick="closePopup()">Close</button>
                <img class="card-image" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"/>
                <div class="card-content">
                    <h2 class="card-title">${pokemonData.name}</h2>
                    <p><span class="additional-info">Type: ${type} | Height: ${pokemonData.height} | Weight: ${pokemonData.weight}</span></p>
                    <div class="stats">
                        ${statHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
};

const displayPokemanPopup = (pokemonData) => {
    const type = pokemonData.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ');
    const stats = pokemonData.stats;
    const popupHtml = generatePopupHtml(pokemonData, type, stats);

    popupContainer.innerHTML = popupHtml;
    popupContainer.classList.add('popup-container');
};



const selectPokemon = async (id) => {
    if (!cachedPokemon[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const pokeman = await fetchData(url);
        cachedPokemon[id] = pokeman;
        displayPokemanPopup(pokeman);
    } else {
        displayPokemanPopup(cachedPokemon[id]);
    }
};

const closePopup = () => {
    popupContainer.innerHTML = '';
    popupContainer.classList.remove('popup-container');
};

fetchAndDisplayPokemon();
