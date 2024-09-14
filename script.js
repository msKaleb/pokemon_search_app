const apiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const container = document.getElementById("container");
const pokeSummary = document.getElementById("poke-summary");
const pokeInfo = document.getElementById("poke-info");
const typesDiv = document.getElementById("types");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const image = document.getElementById("sprite");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

/* array retrieved by getTypes() function
[ 'grass',
  'poison',
  'fire',
  'flying',
  'water',
  'bug',
  'normal',
  'electric',
  'ground',
  'fairy',
  'fighting',
  'psychic',
  'rock',
  'steel',
  'ice',
  'ghost' ]
*/

// provisional, to get different types from the API
const getTypes = async () => {
  const types = [];

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    //debugging
    // console.log(data.count);
    for (let i = 0; i < data.count; i++) {
      const promise = await fetch(apiUrl + (i + 1));
      const results = await promise.json();

      results.types.forEach((slot) => {
        const currentType = slot.type?.name;
        if (!types.find((search) => search == currentType)) {
          types.push(currentType)
        }
      });
    }
    console.log(types);
    alert("Types have been retrieved!");
  } catch (err) {
    console.log(err);
  }
}

// call getTypes on load
// window.addEventListener("load", getTypes);

// get data from the api
const fetchData = async (searchPattern) => {
  try {
    const res = await fetch(apiUrl + searchPattern.toLowerCase());
    const data = await res.json();

    showData(data);
  } catch (err) {
    alert("Pokémon not found");
  }
};

const showData = (data) => {
  // url of the pokemon sprite
  const sprite = data.sprites?.front_default;
  // array with all its types (electric, grass, poison, etc)
  const types = data.types;
  // stats array
  const stats = data.stats

  // loop through types array to get all type names
  let spans = "";
  types.forEach((slot) => {
    spans += `<span class="type ${slot.type?.name}">${slot.type?.name.toUpperCase()}</span>`;
  });

  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = `#${data.id}`;
  image.src = sprite;
  weight.textContent = data.weight;
  height.textContent = data.height;
  hp.textContent = stats[0].base_stat;
  attack.textContent = stats[1].base_stat;
  defense.textContent = stats[2].base_stat;
  specialAttack.textContent = stats[3].base_stat;
  specialDefense.textContent = stats[4].base_stat;
  speed.textContent = stats[5].base_stat;
  typesDiv.innerHTML = spans;
}

// event handlers
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData(searchInput.value);
  }
});

searchButton.addEventListener("click", () => {
  fetchData(searchInput.value);
});