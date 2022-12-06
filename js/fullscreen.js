async function addPokedexFullScreen(PokemonJSON, BackgroundJSON) {
    
    images = [PokemonJSON["sprites"]["other"]["official-artwork"]["front_default"], PokemonJSON["sprites"]["other"]["home"]["front_default"], PokemonJSON["sprites"]["other"]["dream_world"]["front_default"]];

    if (window.innerWidth < 945) {
        document.querySelector("body").style.display = "flex"
    }
    window.addEventListener("resize", () => {
        if (window.innerWidth < 945) {
            document.querySelector("body").style.display = `flex`
        }
    })

    renderFullscreen(PokemonJSON, BackgroundJSON, index, await returnCharacteristicsText(PokemonJSON))
    addTypesToFullscreen(PokemonJSON);
    addAbilitiesToFullscreen(PokemonJSON);
    addGrayBackgroundForWhiteColoredPokemon(BackgroundJSON);
    addStats(PokemonJSON, BackgroundJSON);
}


async function returnCharacteristicsText(PokemonJSON) {
    let characteristics_text = "";

    if (PokemonJSON["id"] <= 30) {
        let urlCharacteristic = `https://pokeapi.co/api/v2/characteristic/${PokemonJSON["id"]}`
        let responseCharacteristic = await fetch(urlCharacteristic);
        let CharacteristicJSON = await responseCharacteristic.json();

        characteristics_text += CharacteristicJSON["descriptions"][7]["description"];
    } else {
        characteristics_text += "-"
    }

    return characteristics_text;
}


function addTypesToFullscreen(PokemonJSON) {
    let pokemon_types = PokemonJSON["types"];

    returnTypes(pokemon_types);

    let types = returnTypes(pokemon_types)
    console.log(types)

    for (let i = 0; i < types[1].length; i++) {
        if (types[1][i] == "") {
            break
        }
        document.querySelector(".types").innerHTML += `<span id="fullscreen-type-${i}" class="pokemon-type${i} type">${toUpperCaseFirstLetter(types[1][i])}</span>`;
        document.getElementById(`fullscreen-type-${i}`).classList.add(`card-${types[1][i]}`)
    }
}


async function addAbilitiesToFullscreen(PokemonJSON) {
    let abilities_array = PokemonJSON["abilities"];
    let abilities_array_moves;
    let abilities = "";

    for (let i = 0; i < abilities_array.length; i++) {

        abilities += `${abilities_array[i]["ability"]["name"]} `
        abilities_array_moves = abilities.split(" ");

        if (abilities_array_moves[i] == "") {
            break;
        }

        let urlAbility = `https://pokeapi.co/api/v2/ability/${abilities_array_moves[i]}`
        let responseAbility = await fetch(urlAbility);
        let AbilityJSON = await responseAbility.json();
        console.log(AbilityJSON);

        document.querySelectorAll(".abilities").forEach(ability_div => {
            ability_div.innerHTML += `<span id="move-${i}">${toUpperCaseFirstLetter(abilities_array_moves[i])}</span>`
        })

    }

};



function addGrayBackgroundForWhiteColoredPokemon(BackgroundJSON) {
    let color = BackgroundJSON["color"]["name"];

    addGrayBackgroundResponsiveness(color);

    document.querySelectorAll(".headline").forEach(headline => {
        if (color == "white") {
            headline.style.borderBottom = `3px solid gray`
        } else {
            headline.style.borderBottom = `3px solid ${color}`
        }
    })

    document.querySelectorAll(".halfbackgroundColor").forEach(halfbackground => {
        if (color == "white") {
            halfbackground.style.backgroundColor = "gray";
        } else {
            halfbackground.style.backgroundColor = `${color}`
        }
    })
    document.getElementById(`style-0`).style.border = `3px solid white`
}


function addGrayBackgroundResponsiveness(color) {
    if (window.innerWidth < 945 && color == "white") {
        document.querySelector(".leftFullScreenBackground").style.backgroundColor = `gray`

    } else {
        document.querySelector(".leftFullScreenBackground").style.backgroundColor = `${color}`
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth < 945 && color == "white") {
            document.querySelector(".leftFullScreenBackground").style.backgroundColor = `gray`

        } else {
            document.querySelector(".leftFullScreenBackground").style.backgroundColor = `${color}`
        }
    })

}


function addStats(PokemonJSON, BackgroundJSON) {

    for (let i = 0; i < stat_names.length; i++) {

        renderStats(stat_names, PokemonJSON, i)

        document.getElementById(`${stat_names[i]}`).style.width = `${PokemonJSON["stats"][i]["base_stat"]}%`;
        document.getElementById(`${stat_names[i]}`).style.height = `16px`;
        document.getElementById(`${stat_names[i]}`).style.borderRadius = `8px`;

        if (BackgroundJSON["color"]["name"] == "white") {
            document.getElementById(`${stat_names[i]}`).style.backgroundColor = `gray`;
        } else {
            document.getElementById(`${stat_names[i]}`).style.backgroundColor = `${BackgroundJSON["color"]["name"]}`;
        }

    }
}


function changeStyleAndPicture(i) {

    for (let i = 0; i < 3; i++) {
        document.getElementById(`style-${i}`).style.border = ``;
    }

    document.getElementById(`style-${i}`).style.border = `3px solid white`
    document.getElementById("pokeimg").setAttribute("src", images[i])

}

async function initFullScreen(index) {

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemons[index]}`
    let response = await fetch(url);
    let PokemonJSON = await response.json();
    //console.log(PokemonJSON);

    let urlBackground = `https://pokeapi.co/api/v2/pokemon-species/${pokemons[index]}`
    let responseBackground = await fetch(urlBackground);
    let BackgroundJSON = await responseBackground.json();
    //console.log(BackgroundJSON);

    addPokedexFullScreen(PokemonJSON, BackgroundJSON);

}

async function updateFullScreen(i) {
    index = i;

    document.getElementById("logo").style.display = "none"
    document.getElementById("pokedex-widescreen").style.display = "none";
    document.getElementById("pokedex-fullscreen").style.display = "flex"

    initFullScreen(index);

}


function closeFullScreen() {
    document.getElementById("pokedex-widescreen").style.display = "flex";
    document.getElementById("pokedex-fullscreen").style.display = "none";
    document.getElementById("logo").style.display = "flex";

    if (window.innerWidth < 945) {
        document.querySelector("body").style.display = ""
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth < 945) {
            document.querySelector("body").style.display = ``
        }
    })
}

async function showNextPokemon() {
    index = index + 1;

    if (index >= pokemons.length) {
        index = 0;
        initFullScreen(index)
    } else {
        initFullScreen(index);
    }
}

async function showPreviousPokemon() {
    index = index - 1;

    if (index <= 0) {
        index = pokemons.length - 1
        initFullScreen(index)
    } else {
        initFullScreen(index);
    }
}