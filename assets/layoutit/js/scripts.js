//产生随机数的类
var randomNum = {
	createNew : function(){
		var	_random = {};
		_random.randomNum = function(e,t){
			return Math.floor(Math.random() * (t - e + 1) + e);
		};
		return _random;
	}
}
var randomNumber = randomNum.createNew();
//处理器类
var _handles = {
	//选项卡处理方法
	_handleTabsIds : function(){
		var e = $(".demo .myTabs");
		var t = randomNumber.randomNum(1,1e6);
		var n = "tabs-" + t;
		e.attr("id",n);
		e.find(".tab-pane").each(function(e, t){
			var n = $(t).attr("id");
			var r = "tabs-elm-" + randomNumber.randomNum(1,1e6);
			$(t).attr("id", r);
			$(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r);
		});
	},
	//手风琴处理方法
	_handleAccordionIds : function(){
		var e = $(".demo #myAccordion");
		var t = randomNumber.randomNum(1,1e6);
		var n = "panel-" + t;
		e.attr("id",n);
		// 样式切换
		var toggleHandler = e.parent().find("#accordion-style");
		toggleHandler.on("click",function(event){
			var target = $("input", event.target);
			(parseInt(target.val()) == 2)?$('#' + n).addClass('accordion-style2') : $('#' + n).removeClass('accordion-style2');
		});
		toggleHandler.attr("id", "accordion-style-" + n);

		e.find(".panel").each(function(e, t){
			var r = "panel-elm-" + randomNumber.randomNum(1,1e6);
			$(t).find(".panel-title").each(function(e, t){
				$(t).attr("data-parent", "#" + n);
				$(t).attr("href", "#" + r);
			});
			$(t).find(".panel-collapse").each(function(e, t){
				$(t).attr("id", r);
			});
		});
	}
}
//方法调用全都在这儿！
function handleJsIds() {
	_handles._handleTabsIds();
	_handles._handleAccordionIds();
}
//清除类
var _rm = {
	rmEle : function(){
		$(".demo").delegate(".remove", "click", function (e) {
	    e.preventDefault();
	    $(this).parent().remove();
	    if (!$(".demo .lyrow").length > 0) {
	      _rm.rmDemo();
	    }
  	})
	},
	rmDemo : function(){
		$(".demo").empty();
	},
	rmClass : function(){
		$("#menu-layoutit li button").removeClass("active");
	}
}
//设置 body和 demo的范围
function elmOffset(){
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160);
}
// 进度条～还没解决。
var oldie = /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase());
$('.easy-pie-chart.percentage').each(function(){
	$(this).easyPieChart({
		barColor: $(this).data('color'),
		trackColor: '#EEEEEE',
		scaleColor: false,
		lineCap: 'butt',
		lineWidth: 8,
		animate: oldie ? false : 1000,
		size:75
	}).css('color', $(this).data('color'));
});
$(function () {
  elmOffset();
  $(window).resize(function(){
  	elmOffset();
  })
  //拖拽功能
  $(".demo, .demo .column").sortable({
    connectWith: ".column",
    opacity: .35,
    handle: ".drag"
  });
  $(".sidebar-nav .lyrow").draggable({
    connectToSortable: ".demo",
    helper: "clone",
    handle: ".drag",
    drag: function (e, t) {
      t.helper.width(400)
    },
    stop: function (e, t) {
      $(".demo .column").sortable({
        opacity: .35,
        connectWith: ".column"
      })
    }
  });
  $(".sidebar-nav .box").draggable({
    connectToSortable: ".column",
    helper: "clone",
    handle: ".drag",
    drag: function (e, t) {
      t.helper.width(400)
    },
    stop: function (e,t) {
      handleJsIds();
      $(".column").sortable({
        opacity: .35,
        connectWith: ".column"
      })
    }
  });
  //删除按钮点击事件
  $("#clear").click(function (e) {
    e.preventDefault();
    _rm.rmDemo();
  });
  //左边栏点击header点击事件
  $(".nav-header").click(function () {
    $(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
    $(this).next().slideDown()
  });
	// 注册清除事件
  _rm.rmEle();
	// 手风琴样式切换事件
	$(".accordion-style").click(function(event){
		console.log($("input",event.target));	
	});
})