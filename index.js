var bcolor=["green","red","yellow","blue"];
var gamepattern=[];
var userpattern=[];
var level=0;
var c=0;

//to call next sequence only for the first time
var start=false;

   $(document).on("keydown",function(){
    if(start==false){
        
        nextseq();
        
    }
      start=true;
   })
   

  //specifies what is clicked
  $(".btn").on("click",function(){
    var uchosencolor=$(this).attr("id");
    userpattern.push(uchosencolor);
    playsound(uchosencolor);
    animatebutton(uchosencolor);
   
    checkans(userpattern.length-1);
   
    
})


function nextseq(){
   
    level++;
    $("#level-title").text("level "+level);
    //generating a random color

    var rNo=Math.floor(Math.random()*4);
    var Rchosencolor=bcolor[rNo];
    gamepattern.push(Rchosencolor);

    $("#"+Rchosencolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(Rchosencolor);
    userpattern=[];

  
}

 function checkans(index){
   
    for(var j=0;j<=index;j++){
       if(userpattern[j]==gamepattern[j]){
        c++;     
    }
      else{
        var audio=new Audio('sounds/wrong.mp3');
        audio.play();
        gameover();
        break;
    }
   }

   if(c==gamepattern.length){
        setTimeout(function(){
        nextseq();
        },1000);
    }
     
    c=0; 

    }




//function for playing sound
function playsound(k){
    var audio = new Audio( "sounds/"+k+".mp3");
    audio.play();
}

//function for pressed button animation
function animatebutton(chosencolor){
        $("#"+chosencolor).addClass("pressed");
        setTimeout(function(){
            $("#"+chosencolor).removeClass("pressed");
        },100)
}

function gameover(){

     $("#level-title").text("GAME OVER ,Press any key to start");
     $("body").addClass("game-over");
    
     setTimeout(function(){
        $("body").removeClass("game-over");
     },200)
     startover();

    

}

function startover(){
    gamepattern=[];
    start=false;
    level=0;
    $("#level-title").text("press any key to start");
}