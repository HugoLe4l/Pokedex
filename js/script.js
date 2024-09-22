
const name_box          = document.getElementById("name-box")
const name__pokemon     = document.querySelector(".name__pokemon");
const numero__pokemon   = document.querySelector(".numero__pokemon");
const image_pokemon     = document.querySelector(".image-pokemon")
const form              = document.querySelector(".form")
const input_search      = document.querySelector(".input-search")

const box_types         = document.querySelector(".box-types")
const primary_type      = document.getElementById("primary_type")
const second_type       = document.getElementById("second_type")


const btn_prev          = document.getElementById("btn-prev")
const btn_prox          = document.getElementById("btn-prox")
const audio1            = document.getElementById("audio1")
const audio2            = document.getElementById("audio2")
const audio3            = document.getElementById("audio3")
const audio4            = document.getElementById("audio4")
const audio_control     = document.querySelector(".audio-control")
let audio__btn_icon     = document.getElementById("audio__btn_icon")

const loading           = document.querySelector(".loading")

audio1.muted = false;
audio2.muted = false;


const typeColors = {
    normal: "#9FA19F",
    fighting: "#FF8000",
    flying: "#81B9EF",
    poison: "#9141CB",
    ground: "#915121",
    rock: "#AFA981",
    bug: "#91A119",
    ghost: "#704170",
    steel: "#60A1B8",
    stellar: "#40B4A4",
    fire: "#E52828",
    water: "#2980EF",
    grass: "#3FA029",
    electric:"#FAC000",
    psychic: "#EF4179",
    ice: "#3DCEF3",
    dragon: "#5060E1",
    dark: "#624D4E",
    fairy: "#EF70EF"
};

select = 1

setInterval(() => {
    name_box.style.display = "block"
    image_pokemon.style.display = "block"
    box_types.style.display = "flex"
    loading.style.display = "none"
}, 9000);

async function BuscarPokemon (pokemon){
    const PokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await PokeAPI.json();
    return data
}

async function ShowPokemonTela(pokemon){
    const GetPokemon = await BuscarPokemon(pokemon);
    name__pokemon.textContent = GetPokemon.name
    name_box.href = `https://www.pokemon.com/br/pokedex/${GetPokemon.name}`;
    if(GetPokemon.id < 10){
        numero__pokemon.textContent = "00"+GetPokemon.id
    }
    else if ((GetPokemon.id > 9) && (GetPokemon.id < 100)){
        numero__pokemon.textContent = "0"+GetPokemon.id

    }else if(GetPokemon.id > 99){
        numero__pokemon.textContent = GetPokemon.id
    }
    
    image_pokemon.src = GetPokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    primary_type.textContent = GetPokemon['types']['0']['type']['name']
    const color = typeColors[primary_type.textContent.toLowerCase()]; 
    if (color) {
        primary_type.style.background = color; 
    }
   
    if (GetPokemon['types'][1]) {
        second_type.textContent = GetPokemon['types'][1]['type']['name'];
        const color = typeColors[second_type.textContent.toLowerCase()];
        if (color) {
            second_type.style.background = color; 
        }
        second_type.style.display = "flex";
    } else {
        second_type.style.display = "none";
    }
    select = GetPokemon.id
}

btn_prox.onclick = function (){
    select += 1
    ShowPokemonTela(select);
    audio1.play();
}
btn_prev .onclick = function (){
    if(select > 1){
        select -= 1
        ShowPokemonTela(select);
        audio1.play();
    }else{
        console.log("Primeiro pokemon")
        audio2.play();
    }  
}

form.addEventListener("submit",function(event){
    event.preventDefault();
    ShowPokemonTela(input_search.value)
    input_search.value = ""
})
audio_control.addEventListener("click",function(){
    if((audio1.muted === false) && (audio2.muted === false)){
        audio1.muted = true;
        audio2.muted = true;
        audio4.play();
        audio__btn_icon.classList.remove("fa-volume-high")
        audio__btn_icon.classList.add("fa-volume-xmark")
    }else{
        audio1.muted = false;
        audio2.muted = false;
        audio3.play();
        audio__btn_icon.classList.remove("fa-volume-xmark")
        audio__btn_icon.classList.add("fa-volume-high")
        
    }
})
    
ShowPokemonTela(select);

