const API = 'https://tinkr.tech/sdb/poly/wander';

async function fetchWorld() {
  const response = await fetch(API);
  const state = await response.json();

  const world = document.getElementById('world');
  world.innerHTML = '';

  for (const player of state.players) {
    const div = document.createElement('div');
    div.classList.add('player');
    div.style.left = player.x + 'px';
    div.style.top = player.y + 'px';

    const img = document.createElement('img');
    img.src = 'https://tinkr.tech' + player.image;
    div.appendChild(img);

    const name = document.createElement('div');
    name.classList.add('player-name');
    name.textContent = player.username;
    div.appendChild(name);

    world.appendChild(div);
  }
}

fetchWorld();
setInterval(fetchWorld, 1000);
