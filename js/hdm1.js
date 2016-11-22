// JavaScript Document
$(function(){
	$('.tabPanel ul li').each(function(index, element) {
		$(this).attr('ids',index); //赋值ids
		if(index==0){ //初始化样式
			$(this).addClass("hit");
		}
	});
	$('.pane').each(function(index, element) {
		$(this).attr('ids',index); //初始化
		if(index!=0){
			$(this).hide();
		}
	});
	$('.tabPanel ul li').click(function(){
		var id= $(this).attr('ids');
		$('.tabPanel ul li').each(function(index, element) {
			if(id==index){
				$(this).addClass("hit");
			}else{
				$(this).removeClass("hit");
			}
		});
		$('.pane').each(function(index, element) {
			if(index==id){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
});