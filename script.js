// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const score = [0, 0];
let currentScore = 0;
let activePLayer = 0;
let playing = true;

const switchplayer = function () {
  document.getElementById(`current--${activePLayer}`).textContent = 0;
  currentScore = 0;
  activePLayer = activePLayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    diceEl.classList.remove('hidden');
    // console.log(dice);
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePLayer}`).textContent =
        currentScore;
    } else {
      //Switch to nest player
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    score[activePLayer] += currentScore;
    document.getElementById(`score--${activePLayer}`).textContent =
      score[activePLayer];
    // 2. check if o player's score is >=100
    if (score[activePLayer] >= 100) {
      // finish the game
      playing = false;
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchplayer();
    }
  }
});
