let menu = $("nav.navmenu");
let sheet = $(".sheet");
let intActMenu = null;
var rangeAutoScroll = 333;
var intervalAutoScroll = 2000;
var speedAutoScroll = 999;
var easingAutoScroll = 'swing';
$(document).ready(function(){
    $("button.open-invitation").click(function(e){
        $("#nav-cover .do-animate").addClass("animate")
    });
    $("#button-mode-read").on("click",function(e){
        e.preventDefault();
        if(this.classList.contains("active")){
            this.classList.remove("active");
            this.querySelector("svg").classList.remove("animationSpin");
            swiper.autoplay.stop();
        }else{
            this.classList.add("active");
            this.querySelector("svg").classList.add("animationSpin");
            swiper.autoplay.start();
        }
    });
});