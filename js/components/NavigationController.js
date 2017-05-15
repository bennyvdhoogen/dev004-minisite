setInterval(function(){
   $('.idleTransition').addClass("idleHidden");
 }, 8000);

$('body').mousemove(function(e){
    $('.idleTransition').removeClass("idleHidden");
});

setInterval(function(){
   $('.menu').addClass("short");
   $('.menu').removeClass("init");
 }, 6000);

$('.menu').mousemove(function(e){
    $('.menu').removeClass("short");
});
