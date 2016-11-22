/*
*　╭━━━━━━━━━━━━━╮
*　┃╱╱╱╱╱╱╱╱┏┓╱╱╱┃
*　┃╱╱╱┏┓╱╱┏╯┃╱╱╱┃
*　┃╱╱┏┛┗┓╱┗┓┃╱╱╱┃
*　┃╱╱┗┓┏┛╱╱┃┃╱╱╱┃
*　┃╱╱╱┗┛╱╱╱┃┃╱╱╱┃
*　┃╱╱╱╱╱╱╱╱┗┛╱╱╱┃
*　╰━━━━━━━━━━━━━╯
*    Date:2014-June-25
*    TGBUS Anhui Wuhu
*    Author:李颖琨
*	 JQ  Tools For Lee
**/
;(function ($) {
	
	var LeeToolsJs = {};   				//全局变量
	var lee_toggleTabsTwoInterVal;
		
	/*获取浏览器类型 并可判断是否为IE6*/
	$.getBrowser = function () {
			var Sys = {};
			LeeToolsJs.getBrowser = function(name, version, isIe6) {
			    this.name = name;
			    this.version = version; 
			    (typeof isIe6 == 'undefined' ? this.isIe6 = 'false': this.isIe6 = isIe6);
			};
			var s;
			var ua = navigator.userAgent.toLowerCase();
			(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
			(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
			(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
			(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
			(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
			(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
			if (Sys.ie){
				if(Sys.ie=='6.0'){
					LeeToolsJs.getBrowserObj = new LeeToolsJs.getBrowser('IE',Sys.ie,"true");
				}else{
					LeeToolsJs.getBrowserObj = new LeeToolsJs.getBrowser('IE',Sys.ie);
				}
			} 
			else if (Sys.firefox) { LeeToolsJs.getBrowserObj = new LeeToolsJs.getBrowser('Firefox',Sys.firefox); } 
			else if (Sys.chrome)  { LeeToolsJs.getBrowserObj = new LeeToolsJs.getBrowser('Chrome',Sys.chrome); }  
			else if (Sys.opera)   { LeeToolsJs.getBrowserObj = new LeeToolsJs.getBrowser('Opera',Sys.opera); }  
			else if (Sys.safari)  { LeeToolsJs.getBrowserObj = new LeeToolsJs.getBrowser('Safari',Sys.safari); }  
			return LeeToolsJs.getBrowserObj;
    };

	/* 上、下滚动的滑动门 */
	$.fn.toggleTabsOne = function (options) {
        var defaultVal = {
            div: "", 			//操作DIV
            event: "click", 	//触发事件
            time: 1000, 		//限制时间
            toggle: "",			//切换CLASS
            easing: "swing" 	//效果
        };
        $.extend(defaultVal, options);
		return $(this).on(defaultVal.event,function() {
			var flag;
			(($.getBrowser()).isIe6 == 'true' ? flag = 4 : flag = 1);    //诡异的IE6双margin-top判断
		    //获取滚动可视区域的高度
		    var defaultValdivHeight = $(defaultVal.div).outerHeight() * -1;
		    $(defaultVal.div).stop().animate({
		       "margin-top": defaultValdivHeight * ($(this).index()) / flag
		    },
		    {
		        duration: defaultVal.time,
		        easing: defaultVal.easing
		    });
		    $(this).addClass(defaultVal.toggle);
		    $(this).siblings().removeClass(defaultVal.toggle);
		});
    };
    
	/* 上、下切换的滑动门 */
	$.fn.toggleTabsTwo = function (options) {
        var defaultVal = {
            event: "click", 	//触发事件
            time: 1000, 		//限制时间
            toggle: "",			//切换CLASS
            easing: "swing" 	//效果
        };
        $.extend(defaultVal, options);
		return $(this).on(defaultVal.event,function() {
			var This=$(this);
			clearTimeout(lee_toggleTabsTwoInterVal);
			lee_toggleTabsTwoInterVal=setTimeout(function(){
					$(This).siblings().removeClass(defaultVal.toggle);
					$(This).addClass(defaultVal.toggle);
					var index = $(This).prev().index()+1;
					$('.tab_content').bind("hover",function(){
						clearTimeout(lee_toggleTabsTwoInterVal);
						//console.log(12);
					});
					$('.tab_content').find('.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp("slow","easeInOutCirc");
					$('.tab_content').find('.tabs_item:eq(' + index + ')').slideDown("slow","easeInOutSine");
			},500);
		});
    };
    
    
    
    
    /* 隐藏侧边漂浮并跟随页面浮动*/
	$.fn.hideFloatResize = function (options) {
        var defaultVal = {
            position:'right',		//漂浮左右的位置
            width: 1000 			//可视区域的宽
        };
        
        $.extend(defaultVal, options);
		return $(this).each( function() {
			var This = this;
		    var distance = ($(window).width() - defaultVal.width) / 2 - $(this).width();    						//漂浮窗的定位
		    if ($(window).width() < defaultVal.width) {
		        $(this).hide();
		    } else {
		    	(defaultVal.position == 'right' ? $(this).css({right:distance}) : $(this).css({left:distance}));	//漂浮窗的定位
		    }
		   
		//窗口大小改变显示	
		    $.event.add(window, "resize",function(){
		        var i_winWidth = $(window).width();
		        distance = ($(window).width() - defaultVal.width) / 2 - $(This).width();    	//漂浮窗的定位
		        if (i_winWidth < defaultVal.width) {
		            $(This).hide();
		        } else {
		            $(This).show();
		            (defaultVal.position == 'right' ? $(This).css({right:distance}) : $(This).css({left:distance}));
		        }
		    });
		});
    };
    
    /* 侧边漂浮头和底的隐藏*/
    $.fn.hideFloatScoll = function (options) {
        var defaultVal = {
            start:'',									//漂浮左右的位置
            end:'' 										//可视区域的宽
        };
        
        $.extend(defaultVal, options);
		return $(this).each(function(){
			var This=$(this);     
			var scollVal;																		//卷去的高度
			var startVal = ($(defaultVal.start).offset()).top;									//获取开始滚动的位置
	        var endVal = ($(defaultVal.end).offset()).top;										//获取结束滚动的位置
			$.event.add(window,"scroll",function(){
	            scollVal = $(window).scrollTop()-$(This).outerHeight()+$(window).height();		//获取开始滚动的距离
	            (scollVal < startVal || scollVal > endVal ? $(This).hide() : $(This).show());	//在指定的区域内显示和隐藏
			});
		});
    };
    
	/*滚动页面*/
	$.fn.scollToDiv = function (options) {
        var defaultVal = {
            objDivName: "", 				//滚动到的DIV
            event: "click", 				//触发事件
            time: 1000, 					//1000高度滚动的时间
            method: "swing" 				//效果
        };

        var obj = $.extend(defaultVal, options);
        return $(this).on(defaultVal.event, function () {
            var obj = $(defaultVal.objDivName);
            var objTop = $(obj).offset().top;									//滚动至对象的高度
            var thisTop = $(this).offset().top;									//点击对象的高度
            var subtract=Math.abs(thisTop-objTop);				 				//根据高度差距计算滚动时间
            if(subtract>2000){
				var time=subtract/1000*(defaultVal.time)/2;
			}else{
				var time=subtract/1000*(defaultVal.time);
			}
            $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            $body.animate({
                scrollTop: objTop
            },time,defaultVal.method);
        });
    };
	
	/*固定DIV*/
	$.fn.fixedTop = function (options) {
        var defaultVal = {
            end: "" 		  			 //固定到DIV的位置
        };
        
        $.extend(defaultVal, options);
		return $(this).each(function(){
			var elm=$(this);
	        var startPos = $(this).offset().top;
	        var flag="JQuery-lee-fixedTop"+ Math.floor(Math.random()*1000);		//包裹的CLASS
	        
	        $(elm).wrap("<div class='"+flag+"'></div>");					
	        var left = ($("."+flag).offset()).left;							//获取原始的左边
	        var guTop=($(defaultVal.end).offset()).top-$(this).height();
	        
	        $.event.add(window,"scroll",function(){
	        	var guTop=($(defaultVal.end).offset()).top-$(elm).height();
	            var p = $(window).scrollTop();
	            if(p>startPos){
	            	 $(elm).css({
	            	 	position:"fixed",
	            	 	top:"0px",
	            	 	left: left
	            	 });
	            	  if(p>guTop){
			            	 $(elm).css({
			            	 	position:"absolute",
			            	 	top:guTop,
			            	 	left: left
			            	 });
		            	 }
	            }else{
	            	 $(elm).css({
	            	 	position:"static",
	            	 	top:"",
	            	 	left:left
	            	 });
	            }
			});	
			
			$.event.add(window, "resize", function () {
	            left=($("."+flag).offset()).left;
	            $(elm).css({
	            	left:($("."+flag).offset()).left
	            });
	        });
			
		});
    };
    
    
    
    
    
	//XIN后台滑动门
	$.extend({
		men:function(dataName,event){    			
				$("#"+dataName+" .men-content").attr("data",dataName);
				$("#"+dataName+" .men-hidden").attr("data",dataName);
				$("#"+dataName+" .men-title").attr("data",dataName);
				
				$(".men-content[data="+dataName+"]").html($(".men-hidden[data="+dataName+"]").html());
				$(".men-hidden[data="+dataName+"] div").remove();
				$(".men-title[data="+dataName+"] ul li").each(function(i){
					(i==0?$(this).addClass("hovertab"):$(this).addClass("normaltab"));
					$(this).on(event,function(){
						$(this).removeClass("normaltab")
									.addClass("hovertab");
						$(this).siblings().removeClass("hovertab");				
						$(this).siblings().addClass("normaltab");
						$(".men-content[data="+dataName+"] .men-hidden-div:eq("+i+")").show().siblings().hide();
					});
				});
				
				$(".men-content[data="+dataName+"] .men-hidden-div").each(function(i){
					(i==0?$(this).show():$(this).hide());
				});
			}
	});

	//图片JUMP
	$.extend({
		jumpObj:function(elem, range, startFunc, endFunc){    			
				var curMax = range = range || 6;
			   	startFunc = startFunc || function(){};
				endFunc = endFunc || function(){};
				var drct = 0;
				var step = 1;
				init();
				function init() { elem.style.position = 'relative';active() }
				function active() { elem.onmouseover = function(e) {if(!drct)jump()} }
				function deactive() { elem.onmouseover = null }
				function jump() {
					 var t = parseInt(elem.style.top);
					 if (!drct) motionStart();
					 else {
						var nextTop = t - step * drct;
						if (nextTop >= -curMax && nextTop <= 0) elem.style.top = nextTop + 'px';
						else if(nextTop < -curMax) drct = -1;
					    else {
							var nextMax = curMax / 2;
							if (nextMax < 1) {motionOver();return;}
							curMax = nextMax;
							drct = 1;
						 }
					 }
					setTimeout(function(){jump()}, 200 / (curMax+3) + drct * 3);
				 }
				function motionStart() {
					startFunc.apply(this);
					elem.style.top='0';
					drct = 1;
				}
				  function motionOver() {
					endFunc.apply(this);
					curMax = range;
					drct = 0;
					elem.style.top = '0';
				}
				this.jump = jump;
				this.active = active;
				this.deactive = deactive;
			}
	});
	
	//火箭TOP
	$.extend({
   		 rocketToTop: function(elem) {
        var e = $(elem),
        t = $(document).scrollTop(),
        n,
        r,
        i = !0;
        $(window).scroll(function() {
            var t = $(document).scrollTop();
            t == 0 ? e.css("background-position") == "0px 0px" ? e.fadeOut("slow") : i && (i = !1, $(".level-2").css("opacity", 1), e.delay(100).animate({
                marginTop: "-1000px"
            },
            "normal",
            function() {
                e.css({
                    "margin-top": "-125px",
                    display: "none"
                }),
                i = !0
            })) : e.fadeIn("slow")
        }),
        e.hover(function() {
            $(".level-2").stop(!0).animate({
                opacity: 1
            })
        },
        function() {
            $(".level-2").stop(!0).animate({
                opacity: 0
            })
        }),
        $(".level-3").click(function() {
            function t() {
                var t = e.css("background-position");
                if (e.css("display") == "none" || i == 0) {
                    clearInterval(n),
                    e.css("background-position", "0px 0px");
                    return
                }
                switch (t) {
                case "0px 0px":
                    e.css("background-position", "-298px 0px");
                    break;
                case "-298px 0px":
                    e.css("background-position", "-447px 0px");
                    break;
                case "-447px 0px":
                    e.css("background-position", "-596px 0px");
                    break;
                case "-596px 0px":
                    e.css("background-position", "-745px 0px");
                    break;
                case "-745px 0px":
                    e.css("background-position", "-298px 0px");
                }
            }
            if (!i) return;
            n = setInterval(t, 50);
           $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
           $body.animate({
                scrollTop: 0
            },"slow", "easeInOutQuint");
       	 });
    }
	});
	
	
})(jQuery);	