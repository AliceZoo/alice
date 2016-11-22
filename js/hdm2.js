// JavaScript Document
$(function(){
	$('#tags1 ul li').each(function(index, element) {
		$(this).attr('ids',index); //赋值ids
		if(index==0){ //初始化样式
			$(this).addClass("selectTag1");
		}
	});
	$('.tagContent1').each(function(index, element) {
		$(this).attr('ids',index); //初始化
		if(index!=0){
			$(this).hide();
		}
	});
	$('#tags1 ul li').click(function(){
		var id= $(this).attr('ids');
		$('#tags1 ul li').each(function(index, element) {
			if(id==index){
				$(this).addClass("selectTag1");
			}else{
				$(this).removeClass("selectTag1");
			}
		});
		$('.tagContent1').each(function(index, element) {
			if(index==id){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
});