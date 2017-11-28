$(function(){
	
		
	
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
				$("#dropdown-toggle-click").html('购物车('+obj.data.length+')<span class="caret"></span>')
				
			}
		}
	});
$("#dropDown").mouseenter(function(){
	$("#dropdown-Menu").stop(true,true).slideDown();
})
$("#dropDown").mouseleave(function(){
	$("#dropdown-Menu").stop(true,true).slideUp();
})

//导航栏
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
//			console.log(response);
	var obj = response;
	for(var i=0;i<obj.data.length;i++){				
		$("#dropdown-menu").append('<li style="background: #C0C0C0; "><a href="list.html?cat_id='+obj.data[i].cat_id+'">' + obj.data[i].cat_name + '</a></li>');				
	}
})

//购物车数量与添加的物品相同
var liLength = $("#dropdown-toggle-Li li").length
console.log(liLength)
$("#dropdown-toggle-click").html('购物车('+liLength+')<span class="caret"></span>') 

//	返回顶部
$("#stick").click(function(){
	$("body,html").animate({scrollTop:0})
})
$(document).scroll(function(){
	var top = $(document).scrollTop();
	if ( top > 400) {
		$("#stick").show()
	} else{
		$("#stick").hide()	
	}	
})
//点击购物车时判断是否登录
$("#dropdown-toggle-click").click(function(){
	
	if (!localStorage.getItem("token")) {
		alert("请登录后再进行其他操作！")
		location.href = "login.html#callback"+location.href
	}else{
		location.href = "cart.html"
	}
})

//判断是否登陆成功  成功显示用户名
if(localStorage.getItem("token")){
	$(".navbar-right").html('<li><span id="navbar-right-span">用户名：'
	+localStorage.getItem("username")+
	'</span></li><li><span><button class="nav-button">取消登录</button></span></li> <li class="dropdown" id="dropDown"><a href="cart.html" dropdown-toggle" id="dropdown-toggle-click" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="color: white;">购物车（0）<span class="caret"></span></a><ul class="dropdown-menu" id="dropdown-Menu"></ul></li>')
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

$("#dropDown").mouseenter(function(){
	$("#dropdown-Menu").stop(true,true).slideDown();
})
$("#dropDown").mouseleave(function(){
	$("#dropdown-Menu").stop(true,true).slideUp();
})
$("#dropDown").click(function(){
	location.href = "cart.html"
})
})



