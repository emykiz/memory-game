const cards = document.querySelectorAll('.card');

let matchCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipcard(e){
    let getTargetCard = e.target;// getting user clicked card
    if(getTargetCard !== cardOne && !disableDeck){
        getTargetCard.classList.add("flip")
        if(!cardOne){
            //return the cardOne value to click card
            return cardOne = getTargetCard;
        }
        cardTwo = getTargetCard;
        disableDeck = true
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;

        matchCards(cardOneImg, cardTwoImg)
        console.log(cardOneImg)
    }
}

function matchCards(img1, img2){
    if(img1 === img2) {
        //if two cards img are matched
        matchCard++; //increment value by 1

        //if matched value is 8 that means user has matched all the cards (8 * 2 = 16 cards)
        if(matchCard == 8){
            setTimeout(()=>{

                return shuffleCard(); 
            }, 1000); //calling shufflecard function after 1 sec
        }
        console.log("card matched")
        cardOne.removeEventListener("click", flipcard)
        cardTwo.removeEventListener("click", flipcard)
        cardOne = cardTwo = ""; //setting both card value to blank
        return disableDeck = false; 
    }
    //if two card not matched
    setTimeout(() =>{
        // adding shake class to both card after 400ms
        
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() =>{
        //removing both  shake and flip class to both card after 400ms
        
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");

        cardOne = cardTwo ="";//setting both card value to blank
        disableDeck = false;
    }, 1200)
}

function shuffleCard(){
    matchCard = 0;
    cardOne = cardTwo = "";
    //creating array of 16 items and  item is repeated twice
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(()=>Math.random() > 0.5 ? 1 : -1); //sorting array item randomly
    console.log(arr.sort(() => Math.random() > 0.5 ? 1 : -1))
    //removing flip class from all cards and passing random image to each card
    cards.forEach((card, index) =>{
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        console.log(imgTag);
        imgTag.src = `images/img-${arr[index]}.jpg`;
        console.log(arr[index])
        card.addEventListener("click", flipcard);
    })
}

shuffleCard();


cards.forEach(card =>{//adding click event to all cards
    // card.classList.add("flip");
    card.addEventListener('click', flipcard)
})