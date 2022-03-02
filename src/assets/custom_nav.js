var myVar = setInterval(myTimer, 100);
// var myVar2 = setInterval(sidebutton, 5);
function myTimer() {
  var navlink = document.getElementsByClassName('nav-link');
  var urllocation = location.hash;
    if(navlink.length > 0){
        myStopFunction();

        for (let m = 0; m < navlink.length; m++) {
            // if(navlink[m] && navlink[m].classList.contains('active')){
            //     navlink[1].className += ' active';
            //     navlink[m].classList.remove('active');
            // }    
          navlink[m].addEventListener('click', removeLinkClass.bind(this, {elm: navlink[m], all: navlink}));
          var aatribute = navlink[m].getAttribute('href');
          // console.log(aatribute);
          if(navlink){
            if(aatribute == urllocation){
              navlink[m].classList.add('active');
            }
            else{
              navlink[m].classList.remove('active');
            }
          }
        }
    }
}

// function sidebutton(){
//     var icon = document.getElementsByClassName('navbar-toggler')[1];
//     if(icon){
//         icon.addEventListener('click',function(e){
//       var target = e.currentTarget;
//       if(target.style.transform == "scaleX(-1)" ){
//         target.style.transform = "" ;
//       }
//       else if(target.style.transform == ""){
//        target.style.transform = "scaleX(-1)" ;
//        }
//       });
//   }
// }

function removeLinkClass(o){
var target = o.elm;
var allelm = o.all;
for (let m = 0; m < allelm.length; m++) {
  if(allelm[m] && allelm[m].classList.contains('active')){
    allelm[m].classList.remove('active');
  }
}

if(target && !target.classList.contains('active')) target.className += ' active';
}


function myStopFunction() {
  clearInterval(myVar);
//   clearInterval(myVar2);
}var myVar = setInterval(myTimer, 100);
// var myVar2 = setInterval(sidebutton, 5);
function myTimer() {
  var navlink = document.getElementsByClassName('nav-link');
  var urllocation = location.hash;
    if(navlink.length > 0){
        myStopFunction();

        for (let m = 0; m < navlink.length; m++) {
            // if(navlink[m] && navlink[m].classList.contains('active')){
            //     navlink[1].className += ' active';
            //     navlink[m].classList.remove('active');
            // }    
          navlink[m].addEventListener('click', removeLinkClass.bind(this, {elm: navlink[m], all: navlink}));
          var aatribute = navlink[m].getAttribute('href');
          // console.log(aatribute);
          if(navlink){
            if(aatribute == urllocation){
              navlink[m].classList.add('active');
            }
            else{
              navlink[m].classList.remove('active');
            }
          }
        }
    }

  
}

// function sidebutton(){
//     var icon = document.getElementsByClassName('navbar-toggler')[1];
//     if(icon){
//         icon.addEventListener('click',function(e){
//       var target = e.currentTarget;
//       if(target.style.transform == "scaleX(-1)" ){
//         target.style.transform = "" ;
//       }
//       else if(target.style.transform == ""){
//        target.style.transform = "scaleX(-1)" ;
//        }
//       });
//   }
// }

function removeLinkClass(o){
var target = o.elm;
var allelm = o.all;
for (let m = 0; m < allelm.length; m++) {
  if(allelm[m] && allelm[m].classList.contains('active')){
    allelm[m].classList.remove('active');
  }
}

if(target && !target.classList.contains('active')) target.className += ' active';
}


function myStopFunction() {
  clearInterval(myVar);
//   clearInterval(myVar2);
}var myVar = setInterval(myTimer, 100);
// var myVar2 = setInterval(sidebutton, 5);
function myTimer() {
  var navlink = document.getElementsByClassName('nav-link');
  var urllocation = location.hash;
    if(navlink.length > 0){
        myStopFunction();

        for (let m = 0; m < navlink.length; m++) {
            // if(navlink[m] && navlink[m].classList.contains('active')){
            //     navlink[1].className += ' active';
            //     navlink[m].classList.remove('active');
            // }    
          navlink[m].addEventListener('click', removeLinkClass.bind(this, {elm: navlink[m], all: navlink}));
          var aatribute = navlink[m].getAttribute('href');
          // console.log(aatribute);
          if(navlink){
            if(aatribute == urllocation){
              navlink[m].classList.add('active');
            }
            else{
              navlink[m].classList.remove('active');
            }
          }
        }
    }

  
}

// function sidebutton(){
//     var icon = document.getElementsByClassName('navbar-toggler')[1];
//     if(icon){
//         icon.addEventListener('click',function(e){
//       var target = e.currentTarget;
//       if(target.style.transform == "scaleX(-1)" ){
//         target.style.transform = "" ;
//       }
//       else if(target.style.transform == ""){
//        target.style.transform = "scaleX(-1)" ;
//        }
//       });
//   }
// }

function removeLinkClass(o){
var target = o.elm;
var allelm = o.all;
for (let m = 0; m < allelm.length; m++) {
  if(allelm[m] && allelm[m].classList.contains('active')){
    allelm[m].classList.remove('active');
  }
}

if(target && !target.classList.contains('active')) target.className += ' active';
}


function myStopFunction() {
  clearInterval(myVar);
//   clearInterval(myVar2);
}