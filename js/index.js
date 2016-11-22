function slideone(conInnerConWidth, index){
	$(".tp4_ li").removeClass("hovertap4");
	$(".tp4_ li").eq(index).addClass("hovertap4");
	$(".nei4wapper").animate(
		{marginLeft:-index*conInnerConWidth+"px"},
		{duration:400, easing:"easeInOutCubic"}
	);
}


function slidetwo(conInnerConWidth, index,size){
	$(".tp3_ li").removeClass("hovertap3");
	$(".tp3_ li").eq(index).addClass("hovertap3");
	$(".nei3wapper").animate(
		{marginLeft:-(size-index)*conInnerConWidth+"px"},
		{duration:400, easing:"easeInOutCubic"}
	);
}

function tabone(){
	var conInnerConWidth = $(".nei4 .tabs_item").width();  			
	$(".tp4_ li").click(function(){
		var index = $(".tp4_ li").index(this);
		slideone(conInnerConWidth, index);
		return false;
	});	
}

function tabtwo(){
	var conInnerConWidth = $(".nei3 .tab_items").width();
	var size=$(".tp3_ li").length-1;
	$(".nei3wapper").css(
			{marginLeft:-size*conInnerConWidth+"px"}
	);
	$(".tp3_ li").click(function(){
		var index = $(".tp3_ li").index(this);
		slidetwo(conInnerConWidth, index,size);
		return false;
	});
}


function g(o){return document.getElementById(o);}

function HoverPi1(m){for(var i=1;i<=4;i++){g('tp1_'+i).className='normaltap1';g('tpc1_0'+i).className='undis';}g('tpc1_0'+m).className='dis';g('tp1_'+m).className='hovertap1';}

$(function(){
	tabone();  //游戏排期切换
	tabtwo();  //游戏发售表切换
	$('#slides').slides({						//小轮播
		preload: true,
		preloadImage: 'img/loading.gif',
		play: 5000,
		pause: 2500,
		hoverPause: true
	});
	
	myFocus.set({ 								//大轮播
		id:'myFocus',				
		pattern:'mF_fancy'			
	});
	
	$('.tp_ li').toggleTabsTwo({ 		//首页面板切换效果
        event: "mouseover", 	
        time: 500, 		
        toggle: "hovertap",
        easing: "easeInOutCubic" 	
	});
	
	
   if($.getBrowser().isIe6=='false'&&$.getBrowser().version!=7.0){
		$(".n2 a").each(function(index,obj){		//图片JUNMP
			 $.jumpObj(obj,5);
		});
    }   
	
	$.rocketToTop("#rocket-to-top");			//火箭发射
	
	$("#rocket-to-top").hideFloatResize({		//火箭自适应
        position:"right",
        width: 1200
	});
	
	$("#tp2_ ul li").toggleTabsOne({			//上下翻动
        div: ".nei2", 			
        event: "click", 	
        time: 1000, 		
        toggle: "hover",
        easing: "easeInOutCubic" 	
	});
	
    $("#tp1_ li").click(function(){
		var left = $(this).offset().left - $("#tp1_").offset().left;
		var fly = $("#koyoz");
		if (fly.is(":animated")) {
			fly.stop();
		}
		fly.animate({
			marginLeft:left
		}, {duration:800, easing:"easeInOutElastic"});
	});
		
	if($.getBrowser().isIe6=='true'){		 //IE6判断
		$("#rocket-to-top").hide();
		$("#koyoz").hide();
	};
            
     
     $(".floattop").hideFloatResize({		//火箭自适应
        position:"right",
        width: 1200
	 });	
	
     $(".floattop").hideFloatScoll({		//火箭自适应
        start:".main",
        end:".end"
	});	
	
	$(".totop").scollToDiv({
		objDivName:".head",
		method:"easeInOutQuint"
	});
	
     /*  
	$(".level-3").scollToDiv({
		objDivName:".head",
		method:"easeInOutQuint"
	});
	*/
});

