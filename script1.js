const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT = 50;

let currentPage = 1;

async function getPokemonData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


function displayPokemonData(data) {
    const main= document.getElementById("main-body")
    main.innerHTML='';
 const container=document.createElement("div")
  main.append(container)
  container.setAttribute("class","container")
const row=document.createElement("div")
container.append(row)
row.setAttribute("class","row")
    
    

  data.results.forEach(async (pokemon) => {
    const pokemonData = await getPokemonData(pokemon.url);
    const abilities = pokemonData.abilities.map((ability) => ability.ability.name).join(', ');
    //const moves = pokemonData.moves.map((move) => move.move.name).join(', ');
     console.log(pokemonData)
    const column=document.createElement("div")
    row.append(column)
    column.setAttribute("class","col-sm-12 col-md-4 col-lg-4 column1")
    const card=document.createElement("div")
    column.append(card)
    card.setAttribute("class","card")
    const cardhead=document.createElement("div")
    card.append(cardhead)
    cardhead.setAttribute("class","card-header")
    cardhead.innerHTML=`<h4>${pokemon.name}<h4>`
    const img = document.createElement("img")
    card.append(img)
    img.setAttribute("src",`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`)
    img.setAttribute("class","img-fluid")
    const cardbody=document.createElement("div")
    card.append(cardbody);
    cardbody.setAttribute("class","card-text")
    cardbody.innerHTML=`<p><label>Id : </label>${pokemonData.id}<br><label>Abilties : </label>${abilities}<br>
    <label>Weight : </label>${pokemonData.weight}kg<br><label>Moves : </label>${pokemonData.moves[0].move.name},
    ${pokemonData.moves[1].move.name},${pokemonData.moves[2].move.name}</p>`
    
    
  });
}

function displayPaginationButtons(count) {
  const container = document.getElementById('pagination-container');
  container.innerHTML = '';

  const pages = Math.ceil(count / LIMIT);

  for (let i = 1; i <= pages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', handlePagination);
    container.appendChild(button);
  }
}

async function handlePagination(event) {
  currentPage = Number(event.target.innerText);

  const offset = (currentPage - 1) * LIMIT;
  const url = `${API_URL}?offset=${offset}&limit=${LIMIT}`;
  const data = await getPokemonData(url);
  displayPokemonData(data);

  displayPaginationButtons(data.count);
}

async function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    return;
  }

  const url = `${API_URL}/${searchTerm}`;
  const data = await getPokemonData(url);

  if (data.name) {
    displayPokemonData({ results: [data] });
  } else {
    alert('Pokemon not found');
  }

  searchInput.value = '';
}

window.addEventListener('load', async () => {
  const url = `${API_URL}?offset=0&limit=${LIMIT}`;
  const data = await getPokemonData(url);
  displayPokemonData(data);

  displayPaginationButtons(data.count);

  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', handleSearch);
});
