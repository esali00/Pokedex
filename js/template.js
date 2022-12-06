function renderNavbar() {
    let navbar = document.getElementById("logo");

    navbar.innerHTML +=
        `
        <img src="img/PokedexLogo.png">
        <div id="searchbars">
            <div id="amount-container">
                <label for="amount"><b>Show amount of pokemon:</b></label>
                <input id="amount" type="number" min="1" placeholder="Amount...">
                <button id="submit-btn" onclick="setAmount()">Submit</button>
            </div>
            <div id="search_pokemen-container">
                <label for="search_pokemon"><b>Search:</b></label>
                <input onkeyup="searchPokemon()" id="search_pokemon" type="text" placeholder="Name..." alt="You have to press Enter after typing the name">
            </div>
        </div>
        `
}


function renderWidescreen(PokemonJSON, i) {
    let pokedex_widescreen = document.getElementById("pokedex-widescreen");

    pokedex_widescreen.innerHTML +=
        `<div onclick="updateFullScreen(${i})" class="pokedex-entry" id="pokedex-entry-${i}">
        
        <div class="PokeCardBackground" id="upperPart-${i}">
        
        <div class="pokemon-info" id="pokemon-info-${i}">
            <span class="darkblue-text"  class="pokemon-id">#${PokemonJSON["id"]}</span>
            <h2 id="pokemon_name_${i}" class="pokemon-name">${(PokemonJSON["name"][0].toUpperCase() + PokemonJSON["name"].substring(1))}</h2>
            <div id="types-${i}">

            </div>
        </div>

            <img src="${PokemonJSON["sprites"]["other"]["official-artwork"]["front_default"]}"/>
        </div>

                
    </div>`

}


function renderFullscreen(PokemonJSON, BackgroundJSON, index, characteristics_text) {

    let pokedex_fullscreen = document.getElementById("pokedex-fullscreen");

    pokedex_fullscreen.innerHTML =
        `  
        <div id="leftScreen" class="leftFullScreenBackground">
            <div class="change-pokemon">
                <h1 id="fullscreen-pokemon-name">#${PokemonJSON["id"]} ${PokemonJSON["name"][0].toUpperCase() + PokemonJSON["name"].substring(1)}</h1>
                <div class="pokemon-changer">
                    <img onclick="showPreviousPokemon(${index})" id="left-arrow-black" src="img/arrow-88-24.png"/>
                    <div id="pokeimg_div">
                    <img id="pokeimg" src="${PokemonJSON["sprites"]["other"]["official-artwork"]["front_default"]}"/>
                    </div>
                    <img onclick="showNextPokemon(${index})" id="right-arrow-black" src="img/arrow-24-24.png"/>
                </div>
            </div>
            

            <div class="halfbackgroundColor">
                
                <div class="all-styles">
                    <img onclick="changeStyleAndPicture(${0})" id="style-0" src="${PokemonJSON["sprites"]["other"]["official-artwork"]["front_default"]}"/>
                    <img onclick="changeStyleAndPicture(${1})" id="style-1" src="${PokemonJSON["sprites"]["other"]["home"]["front_default"]}"/>
                    <img onclick="changeStyleAndPicture(${2})" id="style-2" src="${PokemonJSON["sprites"]["other"]["dream_world"]["front_default"]}"/>
                </div>
                
            </div>
        </div>

        <div id="rightScreen" class="rightFullScreenBackground"> 
            <div id="responsive_container">
             <div class="ability">
                 <h3 class="headline">Ability</h3>
                 <div class="abilities">
                  
                 </div>
             </div>
             <div class="characteristics">
                 <h3 class="headline" >Characteristics</h3>
                 <div class="details">
                     <div class="detail">
                        <span style="margin: 0 auto;">Color</span>
                        <span style="font-size: 24px; font-weight: bold">${BackgroundJSON["color"]["name"][0].toUpperCase() + BackgroundJSON["color"]["name"].substring(1)}</span>
                     </div>
                     <div class="detail">
                         <span style="margin: 0 auto;">Weight</span>
                         <span style="font-size: 24px; font-weight: bold">${PokemonJSON["weight"]}lb</span>
                     </div>
                     <div class="detail">
                        <span style="margin: 0 auto;">Height</span>
                        <span style="font-size: 24px; font-weight: bold">${PokemonJSON["height"]}ft</span>
                     </div>       
                 </div>
                <p id="characteristics_text"><b>Characteristic</b>: ${characteristics_text}</p>
                <p class="types"><b>Type(s):</b> </p>
            </div>
        </div>
        <div class="stats">
                <h3 class="headline">Stats</h3>       
        </div>
        <span onclick="closeFullScreen()" id="close-btn">X</span>
        `
}

function renderStats(stat_names, PokemonJSON, l) {
    document.querySelectorAll(".stats").forEach(stats_div => {

        stats_div.innerHTML +=
            `
                <div class="stat-line">
                <span class="stat">${stat_names[l]}</span>
                    <div class="bar-chart">
                        <div id="${stat_names[l]}">
                    </div>
                </div>
                <div class="stat-number">
                    <span>${PokemonJSON["stats"][l]["base_stat"]}</span>
                </div>
                `
    })
}