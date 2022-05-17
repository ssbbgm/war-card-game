//DOM Elements
const player1Card = document.querySelector('#player1')
const player2Card = document.querySelector('#player2')
const playerOneCards = document.querySelector('.player1Cards')
const playerTwoCards = document.querySelector('.player2Cards')

let deckID = '';
playGame()
document.querySelector('button').addEventListener('click', drawTwo)

function playGame(){
  player1Card.innerHTML = '';
  player2Card.innerHTML = '';
  document.querySelector('h3').innerText = ''

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
  player1Card.src = "";
  player2Card.src = "";

  player1Card.style.display = "block";
  player2Card.style.display = "block";

  playerOneCards.innerHTML = "";
  playerTwoCards.innerHTML = "";

  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        
        player1Card.innerHTML = '';
        player2Card.innerHTML = '';

        let player1 = document.createElement('img');
        let player2 = document.createElement('img');
        player1.src = data.cards[0].image;
        player2.src = data.cards[1].image;

        player1Card.appendChild(player1);
        player2Card.appendChild(player2);

        // document.querySelector('#player1').src = data.cards[0].image;
        // document.querySelector('#player2').src = data.cards[1].image;
        let player1Val = convertToNum(data.cards[0].value);
        let player2Val = convertToNum(data.cards[1].value);


        if (player1Val > player2Val) {
          document.querySelector('h3').innerText = 'Player 1 Wins'
          if(data.remaining === 0){
            const confirmation = confirm('You have completed the game. Would you like to play again?');
            if(confirmation) {
              playGame();
            } else {
              alert('Thanks for playing')
            }
          }
        } else if (player1Val < player2Val){

          document.querySelector('h3').innerText = 'Player 2 Wins'
          if(data.remaining === 0){
            const confirmation = confirm('You have completed the game. Would you like to play again?');
            if(confirmation) {
              playGame();
            } else {
              alert('Thanks for playing')
            }
          }
        } else {

          document.querySelector('h3').innerText = 'Time for WARRRRRR!'
          
          setTimeout(() => {
            if( data.success=true && data.remaining <=8){
              shuffle(data);
            } else {
              playWar();
            }
          }, 2000);
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
    // clear out the regular player cards first
    player1Card.style.display = "none";
    player2Card.style.display = "none";

  const drawEight = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`



  fetch(drawEight)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);

        playerOneCards.innerHTML = "";
        playerTwoCards.innerHTML = "";

        let p1FirstCard = document.createElement('img')
        let p1SecondCard = document.createElement('img')
        let p1ThirdCard = document.createElement('img')
        let p1FourthCard = document.createElement('img')

        p1FirstCard.classList.add('card-size');
        p1SecondCard.classList.add('card-size');
        p1ThirdCard.classList.add('card-size');

        p1FirstCard.src = './img/back-of-card.png'
        p1SecondCard.src = './img/back-of-card.png';
        p1ThirdCard.src = './img/back-of-card.png';
        p1FourthCard.src = data.cards[0].image;

        playerOneCards.appendChild(p1FirstCard)
        playerOneCards.appendChild(p1SecondCard)
        playerOneCards.appendChild(p1ThirdCard)
        playerOneCards.appendChild(p1FourthCard)
      
        let p2FirstCard = document.createElement('img')
        let p2SecondCard = document.createElement('img')
        let p2ThirdCard = document.createElement('img')
        let p2FourthCard = document.createElement('img')

        p2FirstCard.classList.add('card-size');
        p2SecondCard.classList.add('card-size');
        p2ThirdCard.classList.add('card-size');

        p2FirstCard.src = './img/back-of-card.png';
        p2SecondCard.src = './img/back-of-card.png';
        p2ThirdCard.src = './img/back-of-card.png';
        p2FourthCard.src = data.cards[1].image;

        playerTwoCards.appendChild(p2FirstCard)
        playerTwoCards.appendChild(p2SecondCard)
        playerTwoCards.appendChild(p2ThirdCard)
        playerTwoCards.appendChild(p2FourthCard)

        
        let player1WarCard = convertToNum(data.cards[0].value);
        let player2WarCard = convertToNum(data.cards[1].value);

        if (player1WarCard > player2WarCard) {

          document.querySelector('h3').innerText = 'Player 1 Wins'

          if(data.remaining === 0){
            const confirmation = confirm('You have completed the game. Would you like to play again?');
            if(confirmation) {
              playGame();
            } else {
              alert('Thanks for playing')
            }
          }    
        } else if (player1WarCard < player2WarCard) {

          document.querySelector('h3').innerText = 'Player 2 Wins'
          if(data.remaining === 0){
            const confirmation = confirm('You have completed the game. Would you like to play again?');
            if(confirmation) {
              playGame();
            } else {
              alert('Thanks for playing')
            }
        } else {
            setTimeout(() => {
              if (data.success=true && data.remaining <=2){
                let shuffleCards = window.confirm('You are out of cards. Please shuffle')
                if(shuffleCards){
                  shuffle(data.deck_id);
                } else {
                  playGame()
                }
              } 
            }, 2000);
        }
      }
      });
    }
 
    //Updated this, not working
   function shuffle (data){
     let deckID = data.data_id;
      fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
      .then(res => res.json())
      .then(playWar())
  }
  