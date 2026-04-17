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

    if (player.message !== null) {
  const bubble = document.createElement('div');
  bubble.classList.add('speech-bubble');
  bubble.textContent = player.message;
  div.appendChild(bubble);
}

    world.appendChild(div);
  }
}

fetchWorld();
setInterval(fetchWorld, 1000);

async function joinWorld() {
  const username = document.getElementById('username').value;
  const response = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'join', username: username })
  });
  const data = await response.json();
  localStorage.setItem('player_key', data.player_key);
  localStorage.setItem('username', username);
  alert('Tere tulemast, ' + username + '!');
}

document.getElementById('world').addEventListener('click', async function(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  const playerKey = localStorage.getItem('player_key');
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'move', player_key: playerKey, x: x, y: y })
  });
});

async function talkWorld() {
  const message = document.getElementById('message').value;
  const playerK
    
  y = localStorage.getItem('player_key');
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'talk', player_key: playerKey, message: message })
  });
}
