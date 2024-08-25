async function RegisterDMUser() {
    var full_name = document.getElementById("full_name").value; // $("#full_name").val();
    var User_Email = document.getElementById("User_Email").value; // $("#User_Email").val();
    var User_Phone = document.getElementById("User_Phone").value; // $("#User_Phone").val();
    if (full_name == "" || User_Email == "" || User_Phone == "") {
      alert("Please Fill The Form");
    } else {
      const formData = new FormData();
      formData.append("Type", "003");
      formData.append("full_name", full_name);
      formData.append("User_Email", User_Email);
      formData.append("User_Phone", User_Phone);
      let req = await fetch("https://kalamacademy.org/learn/leadcaptureapi.php", {
        method: "POST",
        body: formData,
      });
      let data = await req.json();
      console.log(data);
      
      add_lead( full_name , User_Email , User_Phone , "" , "DM" );
      
      if (data > 0) {
        location.href = "https://www.kalamacademy.org/thank-you-for-signingup/";
      } else {
        alert(data);
      }
    }
  }

  
  async function add_lead( full_name , User_Email , User_Phone , Shop_Size , interested_in ) {
    
    const formData1 = new FormData();
    formData1.append( "Type", "003A" );
    formData1.append("name", full_name );
    formData1.append("email", User_Email );
    formData1.append("mobile", User_Phone );
    formData1.append("alternate_mobile", 0 );
    formData1.append("whatsapp", 0 );
    
    formData1.append( "interested_in" , interested_in );
    formData1.append( "source" , "website" );
    formData1.append( "status" , "Unassigned" );
    formData1.append( "caller" , '' );
    formData1.append( "caller_id" , '' );
    formData1.append( "state" , '' );
    formData1.append( "city" , '' );
    
    formData1.append("Shop_Size", Shop_Size );
    
    let req = await fetch("https://teamka.in/crm1/APIs/ash.php", {
      method: "POST",
      body: formData1,
    });
    let data = await req.json();

    console.log(data);
    
}




// yt code

let ashInterval;
let count1 = 0;
//QbBpo1zv3TM
const players = [
    { id: 'player1', videoId: 'wuFP8fGU2p0', player: null },
    { id: 'player2', videoId: 'QSUYiF8xrNM', player: null },
    { id: 'player3', videoId: 'eXoArxAMZZk', player: null }

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



// JavaScript code for initializing sliders
function initializeSlider(wrapperSelector, listSelector, arrowRightSelector, arrowLeftSelector, valueItemNumberSelector, itemNumberMessSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    const list = document.querySelector(listSelector);
    const arrowRight = document.querySelector(arrowRightSelector);
    const arrowLeft = document.querySelector(arrowLeftSelector);
    const valueItemNumber = document.querySelector(valueItemNumberSelector);
    const itemNumberMess = document.querySelector(itemNumberMessSelector);

    const defaultItemNumber = 3;
    const initialNumberItems = list.children.length;
    const wrapperWidth = wrapper.offsetWidth;
    const numVisibleItems = 3;
    let centralItem = 2;
    let itemNumberValue = parseInt(valueItemNumber.value) || defaultItemNumber;
    let itemNumber = calculatePercentItemNumber(itemNumberValue);

    resetItems(itemNumber);

    function calculatePercentItemNumber(num) {
        return num ? 100 / num : 100 / defaultItemNumber;
    }

    function listNumber(inputNumber) {
        const message = inputNumber >= 6
            ? "You reached the maximum number of items"
            : `Changed to ${inputNumber}`;
        itemNumberMess.textContent = message;
    }

    function resetItems(number) {
        const sliderItems = list.querySelectorAll(".slider__item");
        sliderItems.forEach((item) => (item.style.width = `${number}%`));
        itemNumber = number;
    }

    function calculateCentralItem(numVisibleItems) {
        return Math.ceil(numVisibleItems / 2);
    }

    function addActiveElement(centralItem, totalVisibleItems) {
        const sliderItems = list.querySelectorAll(".slider__item");
        sliderItems.forEach((item) =>
            item.querySelector(".slider__content").classList.remove("active")
        );

        const central = sliderItems[Math.floor(centralItem)];
        central.querySelector(".slider__content").classList.add("active");

        if (totalVisibleItems % 2 === 0) {
            const central2 = sliderItems[Math.floor(centralItem) + 1];
            central2.querySelector(".slider__content").classList.add("active");

            if (totalVisibleItems == 2) {
                const central3 = sliderItems[Math.floor(centralItem) - 1];
                central3.querySelector(".slider__content").classList.add("active");
            }
        }
    }

    valueItemNumber.addEventListener("input", function () {
        itemNumberValue = parseInt(valueItemNumber.value);
        listNumber(itemNumberValue);
        const newPercentage = calculatePercentItemNumber(itemNumberValue);
        resetItems(newPercentage);
        centralItem = calculateCentralItem(itemNumberValue);
        addActiveElement(centralItem - 1, itemNumberValue);
    });

    arrowRight.addEventListener("click", moveFirstToEnd);
    arrowLeft.addEventListener("click", moveLastToStart);

    function moveFirstToEnd() {
        const firstItem = list.firstElementChild;
        firstItem.style.marginLeft = `calc(-${itemNumber}%)`;

        if (firstItem) {
            setTimeout(() => {
                firstItem.style.marginLeft = "";
                list.appendChild(firstItem);
            }, 300);
        }
        addActiveElement(centralItem, itemNumberValue);
    }

    function moveLastToStart() {
        const lastItem = list.lastElementChild;
        list.removeChild(lastItem);
        list.insertBefore(lastItem, list.firstElementChild);
        const newFirstItem = list.firstElementChild;

        if (newFirstItem) {
            newFirstItem.style.marginLeft = `calc(-${itemNumber}%)`;
            setTimeout(() => {
                newFirstItem.style.marginLeft = "";
            }, 1);
        }

        addActiveElement(centralItem - 1, itemNumberValue);
    }
}

// Initialize the first slider
initializeSlider('.slider__wrapper1', '#list1', '#arrowRight1', '#arrowLeft1', '#itemNumber1', '#itemNumberMess1');

// Initialize the second slider
initializeSlider('.slider__wrapper2', '#list2', '#arrowRight2', '#arrowLeft2', '#itemNumber2', '#itemNumberMess2');
// Initialize the second slider
initializeSlider('.slider__wrapper3', '#list3', '#arrowRight3', '#arrowLeft3', '#itemNumber3', '#itemNumberMess3');


// second navbar js

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("div[id]");
    const navLinks = document.querySelectorAll("#navbar ul li a");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 // Adjust the threshold as needed
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const navLink = document.querySelector(`#navbar ul li a[href="#${id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                navLink.classList.add("active");
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});