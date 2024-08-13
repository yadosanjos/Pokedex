//seleciona os elementos HTML que irão exibir os dados do pokemon 
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');

//seleciona o formularia e o campo de entrada de texto
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

//define a variavel que armazenará o número do pokemon ser pesquisado 
let searchPokemon = 1;

//função assincrona que busca os dados do pokemon na API 
const fetchPokemon = async (pokemon) => {
    //faz uma requisição à API do pokemon
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    //faz uma requisição foi bem-sucedida (status 200)
    if (APIResponse.status === 200){
    //converte a resposta para JSON 
    const data = await APIResponse.json();
    //Retrona os dados do Pokemon
    return data;
  }
}

//função assincrona que renderiza os dados do pokemon na página
const renderPokemon = async (pokemon) => {
    //exibe mensagem de "pesquisando..." enquanto os dados são carregados na página 
    pokemonName.innerHTML = 'Pesquisando...';
    pokemonNumber.innerHTML = ' ';
    
    //chama a função fetchPokemon para obter os dados do pokemon
    const data = await fetchPokemon(pokemon);

    //verifica se os dados foram obtidos com sucesso 
    if (data) {
        //exibe a imagem do pokemon 
        pokemonImage.style.display = 'block';
        //define o número e o nome do pokemon 
        pokemonNumber.innerHTML = data.id + ' -';
        pokemonName.innerHTML = data.name;

        //define a altura e o peso do pokemon
        pokemonHeight.innerHTML = 'Altura ' + ' ' + (data.height * 0.1).toFixed(2) + ' ' + 'metro(s)';
        pokemonWeight.innerHTML = 'Peso: ' + (data.weight / 10) + 'kg'
    
        //verifica a geração do poekemon e define a imagem apropriada
        if(data.id >= 1 && data.id <= 649) {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }

        if(data.id >= 650 && data.id <= 721) {
            pokemonImage.src = data['sprites']['versions']['generation-vi']['x-y']['front_default'];
            document.querySelector('.pokemon__image').style.width = '10%';
            document.querySelector('.pokemon__image').style.height = '15%';
            document.querySelector('.pokemon__image').style.bottom = '50%';
        }

        if(data.id >= 721 && data.id <= 809) {
            pokemonImage.src = data['sprites']['versions']['generation-vii']['icons']['front_default'];
            document.querySelector('.pokemon__image').style.width = '16%';
            document.querySelector('.pokemon__image').style.height = '14%';
            document.querySelector('.pokemon__image').style.bottom = '50%';
        }

        if(data.id >= 809 && data.id <= 905) {
            pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
            document.querySelector('.pokemon__image').style.width = '16%';
            document.querySelector('.pokemon__image').style.height = '14%';
            document.querySelector('.pokemon__image').style.bottom = '49.5%';
        }

        //limpa o campo de entrada 
        input.value = '';
        //atualiza o número do pokemon pesquisado
        searchPokemon = data.id;
        return data.id;
    } 
    else {
        //caso não encontre o pokemon, esconde a imagen e exibe mensagem de erro
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Tente novamente';
        pokemonNumber.innerHTML = '';
        pokemonHeight.innerHTML = '-------------------';
        pokemonWeight.innerHTML = '-------------------';
    }
}

//adiciona um event listener ao formulário para capturar o evento de submissão
form.addEventListener('submit', (event) =>{
    event.preventDefault(); //previne o comportamento padrão do formulário (regarregar a página)
    renderPokemon(input.value.toLowerCase()); //chama a função renderPokemon com o valor do campo em letras minúsculas
});

//renderiza o pokemon inicial com o número definido em searchpokemon
renderPokemon(searchPokemon);
//bora bill

