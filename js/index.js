//导航栏
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
//			console.log(response);
	var obj = response;
	for(var i=0;i<obj.data.length;i++){				
		$("#dropdown-menu-Ul").append('<li id="dropdown-menu-li" style="background:black;"><a style="color:white;text-align:center;border:1px solid white" href="list.html?cat_id='
		+obj.data[i].cat_id+
		'">' + obj.data[i].cat_name + '</a></li>');
	}
})

var str = location.search.substr(1);
		console.log(str)
		var catId = str.split("=");
		console.log(catId)




//商品
function showShop(page){
	$.ajax({
	type:"GET",
	"dataType": "json",
	url:"http://h6.duchengjiu.top/shop/api_goods.php?page="+page+"&pagesize=10",
	success:function(response){
			var obj = response;
//			console.log(obj);
			for (var i = 0; i < obj.data.length; i++) {
				$("#col-num").append('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" id="col-num" style="margin-left:60px"><div class="thumbnail"><img src="'
						+obj.data[i].goods_thumb+
						'" alt="..." class="col-num-img"><div class="caption"><h3 id="caption-h3">'
						+obj.data[i].goods_name+
						'</h3><p style="height:40px">'
						+obj.data[i].goods_desc+
						'</p><p><a href="detail.html?goods_id='+obj.data[i].goods_id+ '"class="btn btn-primary" role="button" style="float:right">物品详情</a></p></div></div></div>')
				}
//			console.log($("#Btn-default"))
//			var This = $("#Btn-default")
//			carShop(This)
//			$("#Btn-default").click(function(){
//				box(1)
//			})
		//将全局信号量的锁变为true
		lock = true;
	}
	
})
}
//	懒加载
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
//		console.log(rate);  //得到比例
		
		if(rate >= 0.7){
			page++;	//信号量++
			showShop(page);
			//函数截流，每次触发的时候要把锁置为false
			lock = false;
		}
	})
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
	$(".navbar-right").html('<li><span id="navbar-right-span">用户名：'
	+localStorage.getItem("username")+
	'</span></li><li><span><button class="nav-button">取消登录</button></span></li> <li class="dropdown" id="dropDown"><a href="cart.html" class="dropdown-toggle" id="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="color: white;">购物车（0）<span class="caret"></span></a><ul class="dropdown-menu" id="dropdown-Menu"></ul></li>')
}
//点击取消登录
$(".nav-button").click(function(){
	localStorage.clear();
	$(".navbar-right").html('<li><a href="login.html" >登录</a></li><li><a href="register.html" >注册</a></li>')
})

//搜索
$("#Btn").click(function(){
			var searchStr =  $("#search").val();			
			console.log(searchStr);			
			window.location.href = "search.html?search_text="+searchStr
			
	})	
//点击购物车时判断是否登录
$("#dropdown-toggle").click(function(){
	if (!localStorage.getItem("token")) {
		alert("请登录后再进行其他操作！")
		location.href = "login.html#callback"+location.href
	}else{
		location.href = "cart.html"
	}
})




//购物车数量与添加的物品相同
//var liLength = $("#").length;
//console.log(liLength)
//var HTML = $("#dropdown-toggle").html ('购物车('+liLength+')<span class="caret"></span>') 
// 页面头部购物车效果
	$.ajax({
		type:"get",
		url:"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
		datatype:"json",
		success:function(response){			
			var obj = response;
			console.log(obj);
			if(obj.data.length > 0){
				for (var i = 0; i < obj.data.length; i++) {
					 $("#dropdown-Menu").append('<li class="dropdown-menu-li"><img src="'
		         		+obj.data[i].goods_thumb+
		         		'"/ style="width: 50px;height: 50px;"><p>'
		         		+obj.data[i].goods_name+
		         		'</p></li>')
				}
				$("#dropdown-toggle").html ('购物车('+obj.data.length+')<span class="caret"></span>')
			}
		}
	});

$("#dropDown").mouseenter(function(){
	$("#dropdown-Menu").stop(true,true).slideDown();
})
$("#dropDown").mouseleave(function(){
	$("#dropdown-Menu").stop(true,true).slideUp();
})