let pokemons = [];
let index;
let images;
let stat_names = ["HP", "ATK", "DEF", "SATK", "SDEF", "SPD"];
let amount = 50;

renderNavbar();

async function init() {
    let pokedex_fullscreen = document.getElementById("pokedex-fullscreen");
    pokedex_fullscreen.style.display = "none"

    for (let i = 1; i <= amount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`
        let response = await fetch(url);
        let PokemonJSON = await response.json();
        pokemons.push(PokemonJSON["name"])

        let urlBackground = `https://pokeapi.co/api/v2/pokemon-species/${i}`
        let responseBackground = await fetch(urlBackground);
        let BackgroundJSON = await responseBackground.json();

        addPokedexWideScreen(PokemonJSON, BackgroundJSON, i - 1);
    }
}

async function addPokedexWideScreen(PokemonJSON, BackgroundJSON, i) {

    renderWidescreen(PokemonJSON, i)

    addTypes(PokemonJSON["types"], i);

    addBackgroundColor(BackgroundJSON, i);

}

function toUpperCaseFirstLetter(string) {
    return string[0].toUpperCase() + string.substring(1);
}


function returnTypes(pokemon_types) {
    let types = "";
    let pokemon_type_array;

    for (let i = 0; i < pokemon_types.length; i++) {
        types += `${pokemon_types[i]["type"]["name"]} `;
        pokemon_type_array = types.split(" ");
    }

    return [types, pokemon_type_array]
}

function addTypes(pokemon_types, i) {
    let types_array = returnTypes(pokemon_types);
    let second_type;

    if (types_array[1][1] !== "") {
        
        second_type = toUpperCaseFirstLetter(types_array[1][1]);
        
        document.getElementById(`types-${i}`).innerHTML =
            `<span id="pokemon-type0-${i}" class="pokemon-type0">${toUpperCaseFirstLetter(types_array[1][0])}</span>
             <span id="pokemon-type1-${i}" class="pokemon-type1">${second_type}</span>`
        
        document.getElementById(`pokemon-type0-${i}`).classList.add(`card-${types_array[1][0]}`);
        document.getElementById(`pokemon-type1-${i}`).classList.add(`card-${types_array[1][1]}`);
    } else {
        document.getElementById(`types-${i}`).innerHTML =
            `<span id="pokemon-type1-${i}" class="pokemon-type1">${toUpperCaseFirstLetter(types_array[1][0])}</span>`;
        document.getElementById(`pokemon-type1-${i}`).classList.add(`card-${types_array[1][0]}`);
    }

};


function addBackgroundColor(BackgroundJSON, i) {
    let upperPartBackgroundColor = document.getElementById(`upperPart-${i}`);
    let upperBackgroundColor = BackgroundJSON["color"]["name"];

    if (upperBackgroundColor == "white") {
        upperBackgroundColor = "gray"
    }

    upperPartBackgroundColor.style.backgroundColor = upperBackgroundColor;
}


function setAmount() {
    let input_amount = +document.getElementById("amount").value;

    amount = input_amount;

    document.getElementById("pokedex-widescreen").innerHTML = "";

    pokemons = [];

    init();

    document.getElementById("amount").value = ""
}

function searchPokemon() {
    let input = document.getElementById("search_pokemon").value;

    input = input.toLowerCase();

    if (input == "") {
        document.querySelectorAll(`pokedex-entry`).forEach(entry => {
            entry.style.display = "block"
        });
    }

    for (let i = 0; i < pokemons.length; i++) {
        let name = pokemons[i];

        document.getElementById(`pokedex-entry-${i}`).style.display = "none";

        if (name.includes(input)) {
            document.getElementById(`pokedex-entry-${i}`).style.display = "block"
        }
    }

}