
$(function(){


//导航栏
//$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
////			console.log(response);
//	var obj = response;
//	for(var i=0;i<obj.data.length;i++){				
//		$("#dropdown-menu").append('<li style="background: #C0C0C0; "><a href="list.html?cat_id='+obj.data[i].cat_id+'">' + obj.data[i].cat_name + '</a></li>');				
//	}
//})

//通过url内容，得到分类id，查询分类商品，并展示到页面中
		var str = location.search.substr(1);
		console.log(str)
		var catId = str.split("=");
		console.log(catId)
//商品
var page = 1;
showShop(page)
function showShop(page){
	
	$.ajax({
	type:"GET",
	data:{
		"cat_id":catId[1]
	},
	"dataType": "json",
	url:"http://h6.duchengjiu.top/shop/api_goods.php?page="+page+"&pagesize=12",
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
						'</p><p><a href="detail.html?goods_id='+obj.data[i].goods_id+ '" class="btn btn-primary" role="button" style="float:right">物品详情</a></p></div></div></div>')
				}
			console.log(obj.page.page_count)
			for(var j=0;j<obj.page.page_count;j++){
				console.log("1");
				$("#boxCenter").append( $('<span>'+(j+1)+'</span>') );
			}

		}
	})
}

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
		'</span></li><li><span><button class="nav-button">取消登录</button></span></li> <li class="dropdown" id="dropDown"><a  class="dropdown-toggle" id="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="color: white;">购物车（0）<span class="caret"></span></a><ul class="dropdown-menu" id="dropdown-menu"></ul></li>')
	}
	//点击取消登录
	$(".nav-button").click(function(){
		localStorage.clear();
		$(".navbar-right").html('<li><a href="login.html" >登录</a></li><li><a href="register.html" >注册</a></li>')
	})
	
	
	//分页
	console.log($("#Box-Box"));
	$("#Box").click(function(){
		
		page--;
		if (page <= 1) page = 1;
		$("#col-num").html("")
		$("#boxCenter").html("")
		showShop(page)
		boxCenter.style.marginLeft = (page-1)*60+"px"	
	})
	$("#Box-Box").click(function(){
		
		page++;
		if (page >= 10) page = 10;
		$("#col-num").html("")
		$("#boxCenter").html("")
		showShop(page)
		boxCenter.style.marginLeft = (page-1)*-60+"px"	
	})
	$("#boxCenter").click(function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		
		if (target.nodeName === "SPAN") {
			page = target.innerText;
			$("#col-num").html("")
			$("#boxCenter").html("")
			showShop(page)
			boxCenter.style.marginLeft = (page-1)*-60+"px"
		}
	})

//搜索
$("#Btn").click(function(){
			var searchStr =  $("#search").val();			
			console.log(searchStr);			
			window.location.href = "detail.html?search_text="+searchStr
			
})

})
























