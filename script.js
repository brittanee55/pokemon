const pokemons = [
    { name: 'Pikachu', health: 100 },
    { name: 'Charmander', health: 100 },
    { name: 'Bulbasaur', health: 100 },
    { name: 'Squirtle', health: 100 },
    { name: 'Jigglypuff', health: 100 },
    { name: 'Meowth', health: 100 },
    { name: 'Eevee', health: 100 },
    { name: 'Snorlax', health: 100 },
    { name: 'Gengar', health: 100 },
    { name: 'Mewtwo', health: 100 }
];

let player1, player2;
let health1, health2;
let round = 0;
const maxRounds = 3;
let moves1 = [], moves2 = [];

document.addEventListener('DOMContentLoaded', () => {
    displayPokemons();
    document.getElementById('start-game').addEventListener('click', () => {
        document.getElementById('rules').style.display = 'none';
        document.getElementById('player-selection').style.display = 'block';
    });
});

function displayPokemons() {
    const pokemonList = document.getElementById('pokemon-list');
    pokemons.forEach(pokemon => {
        const div = document.createElement('div');
        div.className = 'pokemon';
        div.textContent = pokemon.name;
        div.onclick = () => selectPokemon(pokemon);
        pokemonList.appendChild(div);
    });
}

function selectPokemon(selectedPokemon) {
    if (!player1) {
        player1 = selectedPokemon;
        health1 = selectedPokemon.health;
        document.getElementById('player1-name').textContent = player1.name;
        alert(`${player1.name} selected! Now select for Player 2.`);
    } else if (!player2) {
        player2 = selectedPokemon;
        health2 = selectedPokemon.health;
        document.getElementById('player2-name').textContent = player2.name;
        alert(`${player2.name} selected! Starting battle...`);
        document.getElementById('player-selection').style.display = 'none';
        document.getElementById('battle-area').style.display = 'block';
        startRound();
    }
}

function startRound() {
    if (round < maxRounds) {
        round++;
        document.getElementById('battle-info').textContent = `Round ${round}: What will ${player1.name} do?`;
        updateHealthStatus();
        displayActions(player1);
    } else {
        declareWinner();
    }
}

function updateHealthStatus() {
    document.getElementById('health-status').textContent = 
        `${player1.name} HP: ${health1} | ${player2.name} HP: ${health2}`;
}

function displayActions(pokemon) {
    const actionButtons = document.getElementById('action-buttons');
    actionButtons.innerHTML = '';
    
    ['Fight', 'Bag', 'Run', 'Jump'].forEach(action => {
        const button = document.createElement('button');
        button.textContent = action;
        button.onclick = () => playerAction(pokemon, action);
        actionButtons.appendChild(button);
    });
}

function playerAction(pokemon, action) {
    const battleInfo = document.getElementById('battle-info');
    
    if (action === 'Fight') {
        const damage = Math.floor(Math.random() * 20) + 10; // Random damage between 10 and 30
        if (pokemon === player1) {
            health2 -= damage;
            moves1.push(`Attacked ${player2.name} for ${damage} damage!`);
            battleInfo.textContent = `${player1.name} attacks ${player2.name} for ${damage} damage!`;
        } else {
            health1 -= damage;
            moves2.push(`Attacked ${player1.name} for ${damage} damage!`);
            battleInfo.textContent = `${player2.name} attacks ${player1.name} for ${damage} damage!`;
        }
    } else {
        moves1.push(`${action} used!`);
        battleInfo.textContent = `${pokemon.name} chose to ${action}!`;
    }
    
    updateHealthStatus();
    updateMoves();

    if (health1 <= 0 || health2 <= 0) {
        declareWinner();
    } else {
        document.getElementById('next-turn').style.display = 'block';
    }
}

function updateMoves() {
    document.getElementById('player1-moves').textContent = `Moves: ${moves1.join(', ')}`;
    document.getElementById('player2-moves').textContent = `Moves: ${moves2.join(', ')}`;
}

document.getElementById('next-turn').onclick = () => {
    if (health1 > 0 && health2 > 0) {
        displayActions(player2);
    }
    document.getElementById('next-turn').style.display = 'none';
};

function declareWinner() {
    let winner;
    if (health1 > health2) {
        winner = player1.name;
    } else if (health2 > health1) {
        winner = player2.name;
    } else {
        winner = "It's a tie!";
    }
    alert(`${winner} wins the battle!`);
    resetGame();
}

function resetGame() {
    player1 = player2 = null;
    health1 = health2 = 0;
    round = 0;
    moves1 = [];
    moves2 = [];
    document.getElementById('player-selection').style.display = 'block';
    document.getElementById('rules').style.display = 'block';
    document.getElementById('battle-area').style.display = 'none';
    document.getElementById('pokemon-list').innerHTML = '';
    document.getElementById('health-status').textContent = '';
    document.getElementById('battle-info').textContent = '';
    document.getElementById('player1-moves').textContent = '';
    document.getElementById('player2-moves').textContent = '';
}
