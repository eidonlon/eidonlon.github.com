function g(id){
	if(id.substr(0,1)=="."){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}
function size(){
	var Height=window.innerHeight;
	var Width=window.innerWidth;

	var oFace=g("face");
	var oMenu=g("menu");

	oFace.style.width=Width+"px";
	oFace.style.height=Height+"px";

	oMenu.style.height=Height+"px";
}

size();

window.onresize=function(){
	size();
}

function move(){
	var aLi=g("nav").getElementsByTagName("li");
	var aLi0=g("menu").getElementsByTagName("li");
    var oMyWorks=g("content");
    var oAboutMe=g("about-me");
    var oContactMe=g("contact-me");
    var oWork=g("work");
    var elements=[oMyWorks,oAboutMe,oContactMe];
    var positions=[];
   
    oWork.onclick=function(){
    	scrollToPosition(positions[0]);
    }

    for(var i=0;i<elements.length;i++){
    	positions.push(elements[i].offsetTop);
    }
    positions[1]+=700;
    positions[2]+=700;
    for(var i=0;i<aLi.length;i++){
    	aLi[i].onclick=function(num){
            return moveTo=function(){
            	scrollToPosition(positions[num]);
            }
    	}(i);
    }

    for(var i=1;i<aLi0.length;i++){
        aLi0[i].onclick=function(num){
            return moveTo=function(){
                scrollToPosition(positions[num]);
            }
        }(i-1);
    }
    aLi0[0].onclick=function(){
       scrollToPosition(0);
    }
  
}

window.onscroll=function(){
	var aLi0=g("menu").getElementsByTagName("li");
    var oMyWorks=g("content");
    var oAboutMe=g("about-me");
    var oContactMe=g("contact-me");
	var top = document.body.scrollTop ;

    if(top>oMyWorks.offsetTop-200&&top<oAboutMe.offsetTop){
    	for(var i=0;i<aLi0.length;i++){
    		aLi0[i].style.background="";
    	}
    		aLi0[1].style.background="#ddd";
      }		
    else if(top>oAboutMe.offsetTop+400&&top<oContactMe.offsetTop){
    	for(var i=0;i<aLi0.length;i++){
    		aLi0[i].style.background="";
    	}
    		aLi0[2].style.background="#ddd";
    }
   
}

var  scrollToPosition = function( to ){
	    var start =  document.body.scrollTop;
	    fx( function(position){  window.scroll(0,position); },start ,to );
}

var fx = function( fn , begin , end ){

    fx.easeOut = function(t,b,c,d){
            return -c *(t /= d)*(t-2) + b;
    }

    var options = arguments[3] || {};
    var duration = options.duration || 500;
    var ease = options.ease || fx.easeOut;

    startTime = new Date().getTime();

    (function(){
        setTimeout(function(){
            timestamp = new Date().getTime() - startTime;
            fn( ease( timestamp,begin, ( end - begin),duration) , 'step' );

            if(duration <= timestamp){
                fn( end , 'end' );
            }else{
                setTimeout(arguments.callee,25);
            }
        },25)
    })();
}


move();