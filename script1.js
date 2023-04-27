const API = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT = 48;
const fetchbtn=document.getElementById("fetchbtn")
const page=document.getElementById("pagination")
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

const pokemonDetails = document.getElementById('pokemon-details');
function displayPokemonData(data) {
    const main= document.getElementById("main-body")
    main.innerHTML='';
    pokemonDetails.innerHTML=""
 const container=document.createElement("div")
  main.append(container)
  container.setAttribute("class","container")
const row=document.createElement("div")
container.append(row)
row.setAttribute("class","row")

      


  data.results.forEach(poke)
  async function poke(pokemon){
    const pokemonData = await getPokemonData(pokemon.url);
    const abilities = pokemonData.abilities.map((ability) => ability.ability.name).join(', ');
    //const moves = pokemonData.moves.map((move) => move.move.name).join(', ');
     console.log(pokemonData)
    const column=document.createElement("div")
    row.append(column)
    column.setAttribute("class","col-12 col-sm-6 col-md-4 col-lg-4 column1")
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
    img.setAttribute("class","img")
    img.setAttribute("alt",`${pokemonData.name} image`)
    const cardbody=document.createElement("div")
    card.append(cardbody);
    cardbody.setAttribute("class","card-text")
    cardbody.innerHTML=`<p><label>Id : </label>${pokemonData.id}<br><label>Abilties : </label>${abilities}<br>
    <label>Weight : </label>${pokemonData.weight}kg<br><label>Moves : </label>${pokemonData.moves[0].move.name},
    ${pokemonData.moves[1].move.name},${pokemonData.moves[2].move.name}</p>`
    
  }   

}
function displayPaginationButtons(count) {
   const container = document.getElementById('pagination');
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
  const url = `${API}?offset=${offset}&limit=${LIMIT}`;
  const data = await getPokemonData(url);
  displayPokemonData(data);

  displayPaginationButtons(data.count);
}


fetchbtn.addEventListener('click', async () => {
  const url = `${API}?offset=0&limit=${LIMIT}`;
  const data = await getPokemonData(url);
  displayPokemonData(data);

  displayPaginationButtons(data.count);
  
})
  
const searchBtn = document.getElementById('searchbtn');


searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
  try {
    
    const pokemonName = document.getElementById('searchname').value.toLowerCase();
    const main= document.getElementById("main-body")
    main.innerHTML='';
    pokemonDetails.innerHTML=""
    
    
    
   if(pokemonName==""){
      alert("please enter search value")}
     else{
    const response = await fetch(`${API}/${pokemonName}`);
    const pokemonData = await response.json();
    console.log(pokemonData)
    const abilities = pokemonData.abilities.map((ability) => ability.ability.name).join(', ');
    
    pokemonDetails.innerHTML=""
    
    page.innerHTML = '';
    
    const container=document.createElement("div")
    main.append(container)
    container.setAttribute("class","container")
    const row=document.createElement("div")
    container.append(row)
    row.setAttribute("class","row")
    const column=document.createElement("div")
    row.append(column)
    column.setAttribute("class","col-sm-12 col-md-4 col-lg-4 column1")
    const card=document.createElement("div")
    column.append(card)
    card.setAttribute("class","card")
    const cardhead=document.createElement("div")
    card.append(cardhead)
    cardhead.setAttribute("class","card-header ch")
    cardhead.innerHTML=`<h4>${pokemonData.name}<h4>`
    const img = document.createElement("img")
    card.append(img)
    img.setAttribute("src",`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`)
    img.setAttribute("class","img")
    img.setAttribute("alt",`${pokemonData.name} image`)
    const cardbody=document.createElement("div")
    card.append(cardbody);
    cardbody.setAttribute("class","card-text")
    cardbody.innerHTML=`<p><label>Id : </label>${pokemonData.id}<br><label>Abilties : </label>${abilities}<br>
    <label>Weight : </label>${pokemonData.weight}kg<br><label>Moves : </label>${pokemonData.moves[0].move.name},
    ${pokemonData.moves[1].move.name},${pokemonData.moves[2].move.name}</p>`
  } }
  catch (err) {
    const pokemonName = document.getElementById('searchname').value
    const main= document.getElementById("main-body")
    main.innerHTML='';
    pokemonDetails.innerHTML = `<p>😟</p> Error: ${pokemonName} Pokemon is not found`;
  }
    console.error(error);
    
  
});
