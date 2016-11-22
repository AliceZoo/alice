// JavaScript Document
$(function(){
		$('.spfl ul li').each(function(index, element) {
			$(this).attr('ids',index); //赋值ids
			if(index==0){ //初始化样式
				$(this).addClass("spon");
			}
        });
		$('.sp1').each(function(index, element) {
            $(this).attr('ids',index); //初始化
			if(index!=0){
				$(this).hide();
			}
        });
		$('.spfl ul li').click(function(){
			var id= $(this).attr('ids');
			$('.spfl ul li').each(function(index, element) {
				if(id==index){
					$(this).addClass("spon");
				}else{
					$(this).removeClass("spon");
				}
			});
			$('.sp1').each(function(index, element) {
                if(index==id){
					$(this).show();
				}else{
					$(this).hide();
				}
            });
		});
	});