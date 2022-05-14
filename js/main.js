//DOM Elements
const player1Card = document.querySelector('#player1')
const player2Card = document.querySelector('#player2')
const playerOneCards = document.querySelector('.player1Cards')
const playerTwoCards = document.querySelector('.player2Cards')

let deckID = '';
playGame()
document.querySelector('button').addEventListener('click', drawTwo)

function playGame(){

  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        deckID = data.deck_id;
      })
      .catch(err => {
          console.log(`error ${err}`)
    });
    return deckID
}

function drawTwo(){


  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        
        document.querySelector('#player1').src = data.cards[0].image;
        document.querySelector('#player2').src = data.cards[1].image;
        let player1Val = convertToNum(data.cards[0].value);
        let player2Val = convertToNum(data.cards[1].value);


        if (player1Val > player2Val){
          document.querySelector('h3').innerText = 'Player 1 Wins'
          if(data.remaining === 0){
            confirm('You have completed the game. Would you like to play again?');
          }
        } else if (player1Val < player2Val){
          document.querySelector('h3').innerText = 'Player 2 Wins'
          if(data.remaining === 0){
            confirm('You have completed the game. Would you like to play again?');
          }
        } else {
          document.querySelector('h3').innerText = 'Time for WARRRRRR!'
          playWar()
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    }

function convertToNum (val){
  if (val === 'ACE'){
    return 14
  } else if (val === 'KING'){
    return 13
  } else if (val === 'QUEEN'){
    return 12
  } else if (val === 'JACK'){
    return 11
  } else {
    return Number(val)
  }
}


function playWar(){
  const drawEight = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=8`

  fetch(drawEight)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);

        let p1FirstCard = document.createElement('img')
        let p1SecondCard = document.createElement('img')
        let p1ThirdCard = document.createElement('img')
        let p1FourthCard = document.createElement('img')

        p1FirstCard.src = data.cards[0].image;
        p1SecondCard.src = data.cards[1].image;
        p1ThirdCard.src = data.cards[2].image;
        p1FourthCard.src = data.cards[3].image;

        playerOneCards.appendChild(p1FirstCard)
        playerOneCards.appendChild(p1SecondCard)
        playerOneCards.appendChild(p1ThirdCard)
        playerOneCards.appendChild(p1FourthCard)
      
        let p2FirstCard = document.createElement('img')
        let p2SecondCard = document.createElement('img')
        let p2ThirdCard = document.createElement('img')
        let p2FourthCard = document.createElement('img')

        p2FirstCard.src = data.cards[4].image;
        p2SecondCard.src = data.cards[5].image;
        p2ThirdCard.src = data.cards[6].image;
        p2FourthCard.src = data.cards[7].image;

        playerTwoCards.appendChild(p2FirstCard)
        playerTwoCards.appendChild(p2SecondCard)
        playerTwoCards.appendChild(p2ThirdCard)
        playerTwoCards.appendChild(p2FourthCard)

        
      
        let player1WarCard = convertToNum(data.cards[3].value);
        let player2WarCard = convertToNum(data.cards[7].value);

        if (player1WarCard > player2WarCard) {
          document.querySelector('h3').innerText = 'Player 1 Wins'
          if(data.remaining === 0){
            confirm('You have completed the game. Would you like to play again?');
            if(confirm) {
              // playGame();
            } else {
              alert('Thanks for playing')
            }
        } else if (player1WarCard < player2WarCard){
          document.querySelector('h3').innerText = 'Player 2 Wins'
          if(data.remaining === 0){
            confirm('You have completed the game. Would you like to play again?');
            if(confirm) {
              // playGame();
            } else {
              alert('Thanks for playing')
            }
        } else {
            alert('Time for WARRRRRR!')
            // return playWar();
        }
      }
    }
    })
  }
      
   function shuffle (data){
    if (data.remaining <= 8){
      fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/?remaining=true`)
      .then(res => res.json())
    }
  }
  