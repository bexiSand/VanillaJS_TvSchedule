///////////////globala variabler//////////////////////////

const icon = document.querySelector('.fa-bars'); //väljer hamburgar-ikonen ur index.html
const menu = document.querySelector('.menu'); //väljer program-menyn ur index.html
let channelData = []; //tom array
var html = ""; //tom sträng
var currentDate = new Date("2021-02-10T13:30:00"); //dagens datum och klockslag - nödlösning eftersom datumet i övningen har passerat
var showAll = false; //boolean - används för att visa/dölja tidigare program


////////////////// meny funktionen /////////////////////////
function toggleMenu(){

        if(menu.classList.contains('menu--show') == true ){
            menu.classList.remove('menu--show')
        }else{
            menu.classList.add('menu--show')
        }

          if (icon.classList.contains('fa-bars')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
  }

/*function transitionMenu(){
var elem = document.getElementsByClassName("menu--show"),
  left = -300,
  timer;
// Move the element 10px on the right every 16ms
timer = setInterval(function() {
  elem.style.left = ( left += 10 ) + "px";
  // clear the timer at 300px to stop the animation
  if ( left == 0 ) {
    clearInterval( timer );
  }
}, 16);
}*/

////////////////// setChannel funktionen /////////////////////////

function setChannel(channel) {

  // visar 'laddningsprickarna'
  document.getElementById("js-loading").style.display = "block";

  // skriver ut kanalens titel i h1
  var title = document.getElementById("js-title"); // title är variabel för h1 för vald kanal

  // if-sats för att visa eller dölja tidigare program
  if (typeof channel == "undefined") { 
    var channel = title.innerHTML; // (channel) tablå för = (title) h1
    html = ""; 
    showAll = true; //visar alla program
  } else {
    html = `<li onclick="setChannel();" class="list-group-item show-previous">Visa tidigare program</li>`;
    showAll = false; //om html innehåller raden ovan visas bara program efter (new Date) 
  }
  // titel = tablå
  title.innerHTML = channel;

  // hämtar tablå från JSON-filen 
  fetch('data/' + channel + '.json')
    .then(response => response.text())
    .then(data => { this.render(data)});
}
setChannel('SVT 1');
//////////////////////// slut på funktionen setChannel ///////////////////////////


////////// render funktion som loopar igenom och skriver ut tablån och lite allt möjligt///////
function render(data) {
  
// gör channelData till en array
  var channelData = JSON.parse(data);

// sorterar programmen i tidsordning
  channelData.sort(function(a,b){
    return new Date(a.start) - new Date(b.start);
  });

// loopar igenom programmen
  html = html + `<ul class="list-group list-group-flush">`
  channelData.forEach(function (channelEntry) {
    if ((new Date(channelEntry.start) > currentDate) || (showAll == true)) { //om start-tid är > nuvarande klockslag eller visa alla = sant
      html = html + `
      <li class="list-group-item">
        <strong>` + channelEntry.start.substring(11,16) + `</strong> <!--klipper ut klockslag ur datumet-->
        <div>` + channelEntry.name + `</div> <!--skriver ut programmets titel-->
      </li>`;
    }
  });
  html = html + `</ul>`;

  document.getElementById("js-schedule").innerHTML =  html;

  document.getElementById("js-loading").style.display = "none"; // tar bort "laddningsprickarna"

// tar bort menyn och lägger till hamburger-ikonen när kanalen är vald
  menu.classList.remove('menu--show')
  icon.classList.remove('fa-times');
  icon.classList.add('fa-bars');
}




