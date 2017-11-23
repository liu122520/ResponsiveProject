$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
//			console.log(response);
	var obj = response;
	for(var i=0;i<obj.data.length;i++){				
		$("#dropdown-menu").append('<li style="background: #C0C0C0; "><a href="list.html?cat_id='+obj.data[i].cat_id+'">' + obj.data[i].cat_name + '</a></li>');				
	}
})
function showShop(page){
	$.ajax({
	type:"GET",
	"dataType": "json",
	url:"http://h6.duchengjiu.top/shop/api_goods.php?page="+page+"&pagesize=10",
	success:function(response){
			var obj = response;
			console.log(obj);
			for (var i = 0; i < obj.data.length; i++) {
				$("#col-num").append('<div class="col-sm-6 col-md-4 col-lg-3" id="col-num"><div class="thumbnail"><img src="'
						+obj.data[i].goods_thumb+
						'" alt="..." style="height:308px"><div class="caption"><h3 id="caption-h3">'
						+obj.data[i].goods_name+
						'</h3><p style="height:40px">'
						+obj.data[i].goods_desc+
						'</p><p><a href="wupinxiangqing" class="btn btn-primary" role="button">物品详情</a><a href="#" class="btn btn-default" role="button">添加到购物车</a></p></div></div></div>')
				}
		//将全局信号量的锁变为true
		lock = true;
	}
})
}
	var page = 1;
	showShop(page);
	var lock = true;
	//窗口的卷动事件监听，一定要函数截流，因为这个事儿很“敏感”
	$(window).scroll(function(){
//				console.log(1);
		//函数截流
		if(!lock) return;
//				console.log($(window).height() );  //window的高度
//				console.log($(window).scrollTop() ); //滚动条的值
//				console.log($(document).height()); //document的高度
		
		var A = $(window).scrollTop();
		var B = $(window).height();
		var C = $(document).height();
		
		var rate = A / ( C - B );
		console.log(rate);  //得到比例
		
		if(rate >= 0.7){
			page++;	//信号量++
			showShop(page);
			//函数截流，每次触发的时候要把锁置为false
			lock = false;
		}
	})	