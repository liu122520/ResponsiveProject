//导航栏
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
//			console.log(response);
	var obj = response;
	for(var i=0;i<obj.data.length;i++){				
		$("#dropdown-menu").append('<li style="background: #C0C0C0; "><a href="list.html?cat_id='+obj.data[i].cat_id+'">' + obj.data[i].cat_name + '</a></li>');				
	}
})

//通过url内容，得到分类id，查询分类商品，并展示到页面中
		var str = location.search.substr(1);
		console.log(str)
		var catId = str.split("=");
		console.log(catId)
//商品

	$.ajax({
	type:"GET",
	data:{
		"cat_id":catId[1]
	},
	"dataType": "json",
	url:"http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=12",
	success:function(response){
			var obj = response;
//			console.log(obj);
			for (var i = 0; i < obj.data.length; i++) {
				$("#col-num").append('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" id="col-num"><div class="thumbnail"><img src="'
						+obj.data[i].goods_thumb+
						'" alt="..." class="col-num-img"><div class="caption"><h3 id="caption-h3">'
						+obj.data[i].goods_name+
						'</h3><p style="height:40px">'
						+obj.data[i].goods_desc+
						'</p><p><a href="wupinxiangqing" class="btn btn-primary" role="button">物品详情</a><a href="#" class="btn btn-default" role="button" style="float:right;background:black; color:white">添加到购物车</a></p></div></div></div>')
				}
		//将全局信号量的锁变为true
//		lock = true;
	}
})

////	懒加载
//	var page = 1;
//	showShop(page);
//	var lock = true;
//	//窗口的卷动事件监听，一定要函数截流，因为这个事儿很“敏感”
//	$(window).scroll(function(){
////				console.log(1);
//		//函数截流
//		if(!lock) return;
////				console.log($(window).height() );  //window的高度
////				console.log($(window).scrollTop() ); //滚动条的值
////				console.log($(document).height()); //document的高度
//		
//		var A = $(window).scrollTop();
//		var B = $(window).height();
//		var C = $(document).height();
//		
//		var rate = A / ( C - B );
////		console.log(rate);  //得到比例
//		
//		if(rate >= 0.7){
//			page++;	//信号量++
//			showShop(page);
//			//函数截流，每次触发的时候要把锁置为false
//			lock = false;
//		}
//	})
//	返回顶部
$("#stick").click(function(){
	$("body,html").animate({scrollTop:0})
})
$(document).scroll(function(){
	var top = $(document).scrollTop();
	if ( top > 300) {
		$("#stick").show()
	} else{
		$("#stick").hide()	
	}	
})

//判断是否登陆成功  成功显示用户名
if(localStorage.getItem("token")){
	$(".navbar-right").html('<li><span>用户名：'+localStorage.getItem("username")+'</span></li><li><span><button class="nav-button">取消登录</button></span></li>')
}
//点击取消登录
$(".nav-button").click(function(){
	localStorage.clear();
	$(".navbar-right").html('<li><a href="login.html" >登录</a></li><li><a href="register.html" >注册</a></li>')
})
