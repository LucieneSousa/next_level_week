

function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for (const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUfs()

function getCities(){
    const citySelect =  document.querySelector("select[name=city]")
    const stateInput =  document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState =  event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for (const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}

document.querySelector("select[name=uf]").addEventListener("change", getCities)


//itens de coleta
//pegar todos os li's
const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItens = []

function handleSelectedItem(event){
    const itemLi = event.target

    // add ou remover uma classe com js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar os itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItens.findIndex(function(item){
       const itemFound = item == itemId //isso sera true ou false
       return itemFound
    })

    //se ja estiver selecionado, tirar da seleção

    if(alreadySelected >= 0){
        //tirar da seleçao
        const filteredItems = selectedItens.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItens = filteredItems
    }else{
        //senao tiver selecionado, add a seleçao
        selectedItens.push(itemId)
    }

    console.log(selectedItens)   

    //atualizar o campo escondido com os itens selecionads
    collectedItems.value = selectedItens
}