var str = location.search;
console.log(str)
var searchId = str.split("=");
searchId = decodeURI(searchId[1]) //转码

console.log(searchId)
$.ajax({
	type:"get",
	url:"http://h6.duchengjiu.top/shop/api_goods.php",
	datatype:"json",
	data:{
		
		"search_text":searchId
		
	},
	success:function(response){
		console.log(response)
		var obj = response;
		for (var i = 0; i < obj.data.length; i++) {
				$("#col-num").append('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" id="col-num"><div class="thumbnail"><img src="'
						+obj.data[i].goods_thumb+
						'" alt="..." class="col-num-img"><div class="caption"><h3 id="caption-h3">'
						+obj.data[i].goods_name+
						'</h3><p style="height:40px">'
						+obj.data[i].goods_desc+
						'</p><p><a href="wupinxiangqing" class="btn btn-primary" role="button">物品详情</a><a href="#" class="btn btn-default" role="button">添加到购物车</a></p></div></div></div>')
				}
	}
});