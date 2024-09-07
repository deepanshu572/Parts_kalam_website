//Form pending 
//Form pending 

//Form pending 
//Form pending 

 

// iframe YT code start

let ashInterval;
let count1 = 0;
//QbBpo1zv3TM
const players = [
    { id: 'player1', videoId: 'T9jmlMcNJHk', player: null },
    { id: 'player2', videoId: 'LJ8_WJp2SAk', player: null }
];

function onYouTubeIframeAPIReady() {
    players.forEach(item => {
        item.player = new YT.Player(item.id, {
            height: '315',
            width: '560',
            videoId: item.videoId,
            events: {
                'onReady': onPlayerReady
            }
        });
    });
}


function onPlayerReady(event) {
    const player = event.target;
    player.mute();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const playerId = entry.target.id;
            const playerData = players.find(item => item.id === playerId);

            if (entry.isIntersecting && playerData) {
                playerData.player.playVideo();
                ashInterval = setInterval(()=>{
                    if ( checkElement(document.getElementById(playerData.id)) ) {
                        playerData.player.unMute();
                        playerData.player.playVideo();
                        if (playerData.player.getPlayerState() == 1) {
                            count1++;
                            if(count1 == 5) {
                                clearInterval(ashInterval);
                                count1 = 1 ;
                            }
                        }
                    } 
                },1000);
            } else {
                playerData.player.pauseVideo();
            }
        });
    }, { threshold: 0.5, passive: true });
    observer.observe(player.getIframe());
}


function checkElement(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}



const popupdata = [
    {
     "imgUrl":"../Assests/img/google2.png"
    },
    {
     "imgUrl":"../Assests/img/hindustan.jpg"
    },
    {
     "imgUrl":"../Assests/img/prabhat.png"
    },
    {
     "imgUrl":"../Assests/img/google.jpg"
    },
    {
     "imgUrl":"../Assests/img/jagran.jpg"
    },
    {
     "imgUrl":"../Assests/img/durdarshan.png"
    }
    
 ]
 
 function Poppup(i) {
     var item = document.getElementById('popupData');
     item.innerHTML = `<img src="${popupdata[i].imgUrl}" alt="">`  
 }
 var btns = document.querySelectorAll('.award_popup');
 var btnsBox = document.getElementById('hide');
 var close = document.getElementById('close');
 
 btns.forEach(function(btn) {
     btn.addEventListener("click", function(){
         btnsBox.style.display = "block";
         document.body.style.overflow = 'hidden';
     });
 });
 
 close.addEventListener("click", function(){
     btnsBox.style.display = "none";
     document.body.style.overflow = 'auto';

 });
 

   