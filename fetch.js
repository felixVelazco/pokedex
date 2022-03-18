var pokemonID=0;

var input = document.getElementById("pokeName");
input.addEventListener("keyup", function(event) {
  if (event.code === 'Enter') {
   fetchPokemon();
  }
});

const fetchPokemon = ()=>
{
    const pokeName = document.getElementById("pokeName").value.toLowerCase();
    const pokeImg = document.getElementById("pokeImg");        
    const pokeID = document.getElementById("pokeID");
    const type1 = document.getElementById("type1");
    const type2 = document.getElementById("type2");
    const pokeDescription = document.getElementById("pokeDescription");        
    const pokePeso = document.getElementById("pokePeso");
    const pokeAltura = document.getElementById("pokeAltura");
    const pokeGenero = document.getElementById("pokeGenero");
    const imgContainer = document.getElementById('imgContainer');
    const valor = document.getElementById('valor');
    const mas = document.getElementById('mas');
    const menos = document.getElementById('menos');
    const b_Artwork = document.getElementById('b_Artwork');
    const b_frontS = document.getElementById('b_frontS');
    const b_backS = document.getElementById('b_backS');

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;


   //const url = `https://pokeapi.co/api/v2/pokemon/pikachu`;
    fetch(url).then(function(result){
        if(result.status != "200"){
            console.log("Pokemon no identificado");
            pokeImg.src = "../assets/missing-no.png";
            pokeName.innerText = '???';
            pokeID.innerText = '???';
            type1.innerText = '???';
            type2.innerText = '???';
            pokePeso.innerText = '???'
            pokeAltura.innerText = '???'
            pokeGenero.innerText = '???'
            invisible();


            pokeDescription.innerText = `Ups, parece que ha habido un error,
             intente con otro pokemon`
        }
        else
            return result.json();
        
    }).then((getObj)).catch(function(error){console.log('error ', error)});
}


async function fetchAsync(url, clase){
    const res = await fetch(url);
    const results = await res.json();
    

    
    await clase(results);
    return results;

}


const fetchPokemonTree = (url, clase)=>{
    fetch(url).then(function(result){
        if(result.status != "200")
            console.log("Pokemon no identificado");
        else
            return result.json(); }).then((clase)).catch(function(error){console.log('error ', error)});
}


const changeImg = (datos) =>{
    b_Artwork.onclick = function(){
        pokeImg.src = datos.sprites.other["official-artwork"].front_default;
    }
    b_frontS.onclick = function(){
        pokeImg.src = datos.sprites.front_default;
    }
    b_backS.onclick = function(){
        pokeImg.src = datos.sprites.back_default;
    }
}


const visible = ()=>{
    const clase = document.getElementsByClassName("isVisible");
    for(let i = 0; i < clase.length; i++){
        clase[i].style.display = "block"; // depending on what you're doing
    }
}
const invisible = ()=>{
    const clase = document.getElementsByClassName("isVisible");
    for(let i = 0; i < clase.length; i++){
        clase[i].style.display = "none"; // depending on what you're doing
    }
}


async function plusOne(){
    if(valor.value<898)
    {
        pokeName.value = (++valor.value);
        await fetchPokemon();
    }

}

async function minusOne(){
    if(valor.value>1)
    {
        pokeName.value = (--valor.value);
        await fetchPokemon();
    }
}

var url1="https://pokeapi.co/api/v2/pokemon/";
var url2="https://pokeapi.co/api/v2/pokemon-species/";
var url3="https://pokeapi.co/api/v2/evolution-chain/";

const getObj = (datos) =>
{
    //console.log(datos)
    createPokedex(datos);
    return datos;
}


const eliminarClase = (nombre)=>{
    const clase = Array.from(document.getElementsByClassName(nombre))
    
    clase.forEach(element=>{
        element.remove();
    })
}

const getStats = (datos) =>{
    const divStats = document.getElementById('stats');

    eliminarClase('statContainer');
    
    let stats = datos.stats;
    stats.forEach(element => {
        let statvalue = document.createElement("p");
        statvalue.className = "statValue";
        let statLabel = document.createElement('p');
        statLabel.className = "statLabel";
        let statContainer = document.createElement('div');
        statContainer.className = "statContainer";

        statvalue.innerText = element.base_stat;
        statLabel.innerText = element.stat['name'].toUpperCase();
        element.base_stat


        statContainer.append(statLabel);
        statContainer.append(statvalue);
        divStats.append(statContainer);
    });
}

mayuscula = (cadena)=>{
    cadenaNueva = cadena.charAt(0).toUpperCase()+cadena.slice(1);
    return cadenaNueva;
}

const createPokedex = (datos) =>
{ 
    console.log(datos);

    id = `${datos.id.toString().padStart(3,0)}`;
    pokeName.value = datos.name;
    pokeID.innerText = '#'+id + "-"+mayuscula(datos.name); //datos.name.charAt(0).toUpperCase()+datos.name.slice(1);
    pokeImg.src = datos.sprites.other["official-artwork"].front_default;



    changeImg(datos);

    fetchPokemonTree(url2+datos.id,descripcion);


    getStats(datos);
    grafica(datos.stats);
    visible();
    
    valor.value = datos.id;

    type1.removeAttribute('class')
    type1.innerText = datos.types[0]['type']['name'].toUpperCase();
    type1.classList.add(datos.types[0]['type']['name']);

    pokePeso.innerText = datos.weight / 10 + "kg";
    pokeAltura.innerText = datos.height /10 + "mts";


    if(datos.types.length == 2){
        type2.innerText = datos.types[1]['type']['name'].toUpperCase();
        type2.style.display = 'flex';
        type2.removeAttribute('class')
        type2.style.textAlign = 'center';
        type2.classList.add(datos.types[1]['type']['name']);
    }
    else
        type2.style.display = 'none';

    console.log(datos);
}

const descripcion = (datos)=>{
    const algo= buscar(datos.flavor_text_entries, 'flavor_text');    
    let algo2 = buscar(datos.genera, "genus" );
    console.log(datos);
    pokeGenero.innerText = algo2;
    pokeDescription.innerText = algo;
    
    //fetchEvolution(datos);
    console.log(url3);
    fetchPokemonTree(datos.evolution_chain.url, evolution)

    imgContainer.style.backgroundImage = `none`;
    imgContainer.style.backgroundColor = 'rgba(255,255,255,0.5)';     
    
}

const contenedor = document.getElementById('evoluciones')



const selectPokemon = (id) =>{
   pokeName.value = id;
   fetchPokemon();
}





async function evolution(datos){

    eliminarClase('evolucion')


    let bloque = document.createElement('p');
    let bloque1 = document.createElement('div');
    

    bloque1.classList = "evolucion";
    bloque.classList = "evolucion";
    
    
    const evolImg1 = document.createElement('img');
    evolImg1.id = datos.chain.species.name;
    evolImg1.setAttribute('onclick', "selectPokemon(this.id);");
    
    bloque.innerText = mayuscula(datos.chain.species.name);

    //await fetchPokemonTree(url1+bloque.innerText, evolImg);
    await fetchAsync(url1+evolImg1.id, evolImg);

    console.log(tempSrc);    
    evolImg1.src = tempSrc;

    bloque1.append(evolImg1);
    bloque1.append(bloque);
    contenedor.append(bloque1);
    
    if(datos.chain.evolves_to.length!=0)
        iteracion(datos.chain.evolves_to);
}

var tempSrc;


const evolImg = (pokemon) =>{
    tempSrc = pokemon.sprites.other["official-artwork"].front_default;
}



async function iteracion(pokemon){
    const estadisticas = Array.from(document.getElementsByClassName('statContainer'))

    let bloque = document.createElement('div');
    let flecha = document.createElement('div');
    bloque.classList = "evolucion";
    flecha.classList = "evolucion";
    
    for(const evolucion of pokemon){
        //console.log(evolucion.species.name);
        let bloque2 = document.createElement('p');
        bloque2.classList = "evolucion";
        let bloque3 = document.createElement('h2');
        bloque3.innerText='›';
        flecha.append(bloque3);
        contenedor.append(flecha);        

        bloque2.innerText= mayuscula(evolucion.species.name);

        const evolImg1 = document.createElement('img');
        evolImg1.id = evolucion.species.name;
        
        await fetchAsync(url1+evolImg1.id, evolImg);
        
        evolImg1.src = tempSrc;
        evolImg1.setAttribute('onclick', "selectPokemon(this.id);");
        

        bloque.append(evolImg1);
        bloque.append(bloque2);
        contenedor.append(bloque);



        if(evolucion.evolves_to.length!=0)
            iteracion(evolucion.evolves_to);
    }
}



const buscar = (datos, param1)=>{
    let i=0;
    for(i=0; i<datos.length; i++)
    {
        if(datos[i]["language"]['name']=='es')
        {
            algo = datos[i][[param1]];
            return algo.replaceAll('\n', ' ');
        }
    }

}

//fetchPokemon();









const iniciar = () =>{
    const principal = document.getElementById("seccion-principal");
    const inicio = document.getElementById("seccion-inicio");

        inicio.classList.remove('inicio2');
        inicio.classList.add('inicio');
        principal.classList.remove('inicio');
        principal.classList.add('inicio2');

        plusOne();
}

const pokeball = document.getElementById("pokeball");
pokeball.addEventListener("click", iniciar);


var myChart;

function grafica(stats) {

    if(myChart)
        myChart.destroy();

    const ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Stats',
                data: [],//[12, 19, 3, 5, 2, 3],
                /*backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],*/
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
            //responsive:true,
            plugins:{
                legend:{
                    labels: {
                        color: 'white'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    }
                },
                x:{
                    ticks: {
                        color: 'white'
                    }
                }
            }
        }
    });
    
    let temp = [];
    let temp2 = [];
    stats.forEach(stat => {
        let nombre = stat.stat['name'];
        let base = stat.base_stat;
        
        myChart.data.labels.push(nombre);
        myChart.data.datasets[0].data.push(base);
        
    });
    
    ctx.style.backgroundColor = 'rgba(0,0,0,0.5)';
    ctx.style.border = '2px solid rgba(54, 162, 235, 0.5)'
    ctx.style["border-radius"] = '20px';
    myChart.update();
}
