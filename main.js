const firebaseConfig = {
    
};


let hand = [];
let deck = [];
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const root = firebase.database().ref()
root.child("/cards").once("value", snapshot => {
    const cards = snapshot.val()

    

    for (let j = 0; j < snapshot.val().length; j++) {

        let inDeckcount = parseInt(cards[j].inDeck)

        if (cards[j].inDeck > 1) {
            for (let k = 0; k < inDeckcount; k++) {
                deck.push(cards[j])
            }
        }
        else {
            deck.push(cards[j])
        }
    }

    let extraDeck = []

    for (let i = 0; i < deck.length; i++) {
        const element = deck[i];
        if (element.decktype == 'extra') {
            extraDeck.push(element)
            deck.splice(i, 1)
            i--
        }
    }

    

    for (let i = 0; i < 5; i++) {
        let rndInt = Math.floor(Math.random() * 31)
        document.getElementById(`cardH-${i}`).style.backgroundImage = `url("${deck[rndInt].pic}")`
        document.getElementById(`cardH-${i}`).cardData = deck[rndInt]
        hand.push(deck[rndInt].name)
        deck.splice(i, 1)

    }


})

let tempcard;
let cardpic;


document.getElementById('hand').addEventListener('click', e => {
    if (e.target.className == 'cardH') {

        if (tempcard != e.target.id && tempcard != ('' || null)){
            document.getElementById(tempcard).style.marginTop = '';
        }

        tempcard = e.target.id
        cardpic = e.target.cardData.pic
        
        document.getElementById(tempcard).style.marginTop = '-10px'

        var all = document.getElementsByClassName('card');
        for (var i = 0; i < all.length; i++) {
            all[i].style.border = '';

            if (e.target.cardData.cardtype == "effect" || e.target.cardData.cardtype == "effect-ritual"){
                if (i > 4 && i < 10){
                    all[i].style.border = '2px dotted white';
                    
                    
                }
            } else if (e.target.cardData.cardtype == "Spell"){
                if (i > 9 && i < 16){
                    all[i].style.border = '2px dotted white';
                    
                }
            }
        }
        
        
    }
})

 document.getElementById('field').addEventListener('click' , e => {
     if (e.target.className == "card"){
         document.getElementById(e.target.id).style.backgroundImage = `url(${cardpic})`
         document.getElementById(tempcard).cardData = 0
         document.getElementById(tempcard).style.backgroundImage = ""
         haram = tempcard.slice(5)
         hand.splice(haram, 1)
         
     }

 })

document.getElementById('hand').addEventListener('mouseover', e => {
    if (e.target.className == 'cardH'){
        document.getElementById('preview-card-name').innerText = e.target.cardData.name
        document.getElementById('preview-card-description').innerText = e.target.cardData.effect
        document.getElementById("thumbnail").src = e.target.cardData.pic

    }
})

let cardCheck = 0

document.getElementById("ratehand").addEventListener("click", e => {
    if(e.target.id == "ratehand"){
        for(let i = 0; i < hand.length; i++){
            switch (hand[i]) {
                case "Drytron Zeta Aldhiba":
                    cardCheck++
                    break;
                    
                case "Cyber Emergency":
                    cardCheck++
                    break;
                    
                case "Drytron Nova":
                    cardCheck++
                    break;
                    
                case "Drytron Alpha Thuban":
                    cardCheck++
                    break;
            }
        }
        if(cardCheck > 1){
            window.alert("Die Hand bietet eine \"Full-Combo\"")
        }
        else{
            window.alert("Die Hand ist schlecht")
        }
    }
})

document.getElementById("handplus").addEventListener("click", e => {
    let rndInt = Math.floor(Math.random() * 31)
    let halal = hand.length
    document.getElementById(`cardH-${halal}`).style.backgroundImage = `url("${deck[rndInt].pic}")`
    document.getElementById(`cardH-${halal}`).cardData = deck[rndInt]
    hand.push(deck[rndInt].name)
    deck.splice(i, 1)
})


