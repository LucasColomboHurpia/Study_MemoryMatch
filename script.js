let body = document.getElementById('body');
let grid = document.getElementById('grid');
let Icons = document.getElementById('Icons');

//this array will be used to generate random positions
let array = [];

//each var will store a chosen tile
let pick1 = ''
let pick2 = ''

//used to check if 2 tiles have been clicked
let howManytileActive = 0; 

//generates all square tiles, every square is a grid.child (onload)
const generateTiles = () =>{
    for(i=0;i<20;i++){
    let tile = document.createElement('span')
    tile.classList.add('tile')
    grid.appendChild(tile)
}}

//generates 20 distinct positions in randon order (onload)
const  generateNumbers = () => {   
    while(array.length < 20){
   var r = Math.floor(Math.random() * 20);
   if(array.indexOf(r) === -1) array.push(r);
} }


//sets each image (and its pair) to a random position, set winValue to 0 (onload)
const randomizeTiles = (x,y) =>{
    let newImage = document.createElement('img')
    let newImagePair = document.createElement('img')
    newImage.src = x.src
    newImagePair.src = x.src
    
            let a1 = array[y]
            grid.children[a1].appendChild(newImage);
            grid.children[a1].firstChild.classList.add('hide'); 
            grid.children[a1].firstChild.classList.add('img'); 
            grid.children[a1].firstChild.winValue = 0
            let a2  = array[y+10]
            grid.children[a2].appendChild(newImagePair);
            grid.children[a2].firstChild.classList.add('hide');
            grid.children[a2].firstChild.classList.add('img');
            grid.children[a2].firstChild.winValue = 0
    }

//sets an OnclickFuntion for every square (onload)
const addOnclick = () => {
    for(i=0;i<20;i++){
        grid.children[i].onclick = function(){ 
            if(this.firstChild.winValue < 1 ){ 
                howManytileActive++; //updates how many tiles are active and checks
                    if(howManytileActive<=2){
                        animationIn(this);  //trigger animation
                            this.firstChild.winValue=1 //.winValue is used to check if the tile is unclicked(0), clicked and checking a match(1) or chosen(2)
                                checkIfMatch(this);}} //check if match
        }
    }
}

//sets up the board
onload = function () {
    generateTiles();
    generateNumbers();
    for(i=0;i<10;i++){randomizeTiles(Icons.children[i],i)}
    addOnclick();
}

//trigger animation and flips the card
const animationIn = (x) => {
    setTimeout(()=>{x.firstChild.classList.remove('hide')},500);
    x.classList.remove('animationClear')
     x.classList.add('animationClick');
    setTimeout(()=>{x.classList.add('chosen');},1000);
}

//stores image.src on vars and checks if is tiles match
const checkIfMatch = (x) => {
    if(pick1==''){pick1=x.firstChild.src;}
    else if(pick1!=''){pick2=x.firstChild.src;}

    if(pick1 == pick2 && pick1!=''){match()}

    if(pick1!=pick2 && pick2!=''){setTimeout(()=>{wrong(x)}, 1000)} //is it is not a match, waits one second before flipping the cards again
}

//resets active tiles counter and trigger animation
const match = () =>{
howManytileActive = 0;
for(i=0;i<20;i++){
    if(grid.children[i].firstChild.winValue == 1){
        grid.children[i].firstChild.winValue = 2;
        grid.children[i].classList.add('matchConfirmed')
     }
} victoryCheck() //checks if the game is over
    pick1= ''; pick2 = ''; //resets vars used for comparison
}

//resets active tiles counter and triggers flip back animation
const wrong = (x) =>{
    howManytileActive = 0;
    for(i=0;i<20;i++){
        if(grid.children[i].firstChild.winValue == 1){
            grid.children[i].firstChild.winValue = 0;
            grid.children[i].classList.remove('animationClick');
            clearTiles(grid.children[i])
         }
    }
        pick1= ''; pick2 = ''; //resets vars used for comparison
}
//triggers flip back animation
const clearTiles = (x) => {
    setTimeout (x.firstChild.classList.add('hide'),500)
     x.classList.add('animationClear')
    setTimeout (x.classList.remove('chosen'),500)
}
//checks if the game is over
const victoryCheck = () => {
    let Vcheck = 0
    for(i=0;i<20;i++){
        if(grid.children[i].firstChild.winValue == 2) {Vcheck++}
    }
    if(Vcheck>=20){victory()} //triggers victory sequence
}

let VictoryAnnounce = document.getElementById('VictoryAnnounce')
let resetBtn = document.getElementById('resetBtn');

//triggers victory animation and Reset Button animation
const victory = () =>{
    VictoryAnnounce.classList.remove('hide')
    VictoryAnnounce.classList.add('VictoryAnnounceAnimation')
    resetBtn.classList.add('resetAnimation')
    sqrVictoryEffect();
}

var it = 0;
//fun square animation repeats indefinitely in the background
const sqrVictoryEffect = () => {
var interval = setInterval(RandomSqrAnimation, 1800);
function RandomSqrAnimation() {

         grid.children[array[it]].style.animation = 'none';
         grid.children[array[it]].offsetHeight;
         grid.children[array[it]].style.animation = null;
         grid.children[array[it]].classList.add('matchConfirmed');
         it++
         if (it >= 20)
         it = 0;
}}
//reloads the page, resets everything
const Reload = () => {location.reload()}