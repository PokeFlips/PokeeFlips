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

const generatePopupHtml = ({ pokemonName, type, stats, sprite, height, weight }) => {
    

    const statHtml = stats.map(stat => `<p>${capitalizeFirstLetter(stat.stat.name)}: ${stat.base_stat}</p>`).join('');
    console.log(statHtml)
    return `
        <div class="popup">
            <div class="card">
                <button id="closeBtn" onclick="closePopup()">Close</button>
                <img class="card-image" src="${sprite}" alt="${pokemonName}"/>
                <div class="card-content">
                    <h2 class="card-title">${pokemonName}</h2>
                    <p><span class="additional-info">Type: ${type} | Height: ${height} | Weight: ${weight}</span></p>
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

    const capitalizedPokemonName = capitalizeFirstLetter(pokemonData.name);

    const popupHtml = generatePopupHtml({
        pokemonName: capitalizedPokemonName,
        type: type,
        stats: stats,
        sprite: pokemonData.sprites.front_default,
        height: pokemonData.height,
        weight: pokemonData.weight
    });

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



let player1Button = document.getElementsByClassName('player1')[0]
let player2Button = document.getElementsByClassName('player2')[0]


// pokeflips
async function pokeFlipsFeature() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const data = await fetchData(url);
    const pokemon = data.results.map((data, index) => ({
        name: data.name,
        id: index + 1, 
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
    console.log(pokemon)


    player1Button.addEventListener('click', async (e) => {
      const shuffledArr = pokemon.sort(() => Math.random() - 0.5);
        let pokemonId = shuffledArr[0].id
        let pokemonName = shuffledArr[0].name
        let pokemonImg = shuffledArr[0].image
        li = document.createElement('li')
        li.classList.add('pokeeFlip-card')
        
        div = document.createElement('div')
        div.setAttribute('id', 'player1-id')
        div.textContent = pokemonId
        li.appendChild(div)

        img = document.createElement('img')
        img.src = pokemonImg
        li.classList.add('pokeeFlip-img')
        li.appendChild(img)
        
        
        p = document.createElement('p')
        p.textContent = pokemonName 
        p.classList.add('pokeeFlip-p')
        
        li.appendChild(p)
        document.body.appendChild(li)
        const player1Id = document.getElementById('player1-id'); // Define player1Id here
        console.log(player1Id)
    }, { once: true })
    
    player2Button.addEventListener('click',async (e) => {
        const shuffledArr = pokemon.sort(() => Math.random() - 0.5); 
        let pokemonId = shuffledArr[0].id
        let pokemonName  = shuffledArr[0].name
        let pokemonImg = shuffledArr[0].image
        
        li = document.createElement('li')
        li.classList.add('pokeeFlip-card')
           
        div = document.createElement('div')
        div.setAttribute('id', 'player2-id')
        div.textContent = pokemonId
        li.appendChild(div)
      

        img = document.createElement('img')
        img.src = pokemonImg
        li.classList.add('pokeeFlip-img')
        li.appendChild(img)
        

        p = document.createElement('p')
        p.textContent = pokemonName
        p.classList.add('pokeeFlip-p')
        
        li.appendChild(p)
        document.body.appendChild(li)
        const player1Id = document.getElementById('player1-id'); // Define player1Id here
        const player2Id = document.getElementById('player2-id'); // Define player2Id here
        console.log(player2Id)
        pokeFlipsFight(player1Id.textContent, player2Id.textContent);
    },{once : true})

}

pokeFlipsFeature()

 async function pokeFlipsFight(player1Id, player2Id) {
   console.log(player1Id, player2Id)
     
     const player1_url = `https://pokeapi.co/api/v2/pokemon/${player1Id}`;
     const player1_data = await fetchData( player1_url );
     console.log(player1_data .stats)
     const  player2_url  = `https://pokeapi.co/api/v2/pokemon/${player2Id}`;
     const player2_data = await fetchData( player2_url );
     console.log(player2_data.stats)
    
 }





