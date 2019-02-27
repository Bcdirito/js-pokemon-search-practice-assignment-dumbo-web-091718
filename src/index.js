document.addEventListener('DOMContentLoaded', () => {
  const url = "http://localhost:3000/pokemon"
  const pokeContainer = document.getElementById("pokemon-container")
  const filt = document.getElementById("pokemon-search-input")
  const images = document.getElementsByTagName("img")

  getPokemon()
  filt.addEventListener("input", (e) => {
    filterPokemon(e)
  })

  pokeContainer.addEventListener("click", (e) => {
    if (e.target.dataset.action === "flip"){
      flipImage(e)
    }
  })

  function getPokemon(){
    fetch(url)
    .then(res => res.json())
    .then(res => {
      pokeContainer.innerHTML = ""
      renderCards(res)
    })
  }

  function renderCards(res){
    res.forEach(poke => {
      pokeContainer.innerHTML += `<div class="pokemon-card">
        <div class="pokemon-frame">
          <h1 class="center-text" data-action="stats" data-id="${poke.id}">${poke.name}</h1>
          <div class="pokemon-image">
            <img data-id="${poke.id}" data-action="flip" class="toggle-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png">
          </div>
        </div>
      </div>`
    })
  }

  function filterPokemon(e){
    let text = e.target.value
    fetch(url)
    .then(res => res.json())
    .then(res => {
      pokeContainer.innerHTML = ""
      let pokeFilt = res.filter(poke => {
        return poke.name.toLowerCase().includes(text.toLowerCase())
      })
      renderCards(pokeFilt)
    })
  }

  function flipImage(e){
    e.target.src.includes("back") ? e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.target.dataset.id}.png` : e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${e.target.dataset.id}.png`
  }
})
