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
		var t = randomNumber.randomNum(1, 1e6);
		var n = "tabs-" + t;
		e.attr("id",n);
		e.find(".tab-pane").each(function(e, t){
			var n = $(t).attr("id");
			var r = "tabs-elm-" + randomNumber.randomNum(1, 1e6);
			$(t).attr("id", r);
			$(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r);
		});
	},
	//手风琴处理方法
	_handleAccordionIds : function(){
		var e = $(".demo #myAccordion");
		var t = randomNumber.randomNum(1, 1e6);
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
			var r = "panel-elm-" + randomNumber.randomNum(1, 1e6);
			$(t).find(".panel-title").each(function(e, t){
				$(t).attr("data-parent", "#" + n);
				$(t).attr("href", "#" + r);
			});
			$(t).find(".panel-collapse").each(function(e, t){
				$(t).attr("id", r);
			});
		});
	},
	// 自动消失提示牌处理方法
	_handleNotifications :  function(){
		var e = $(".demo #gritter-regular");
		var t = randomNumber.randomNum(1, 1e6);
		var n = "gitter-" + t;
		e.attr("id", n);
		// console.log($(n));
		// console.log(e)
		$("#" + n).on(ace.click_event, function(){
			$.gritter.add({
				title: 'This is a regular notice!',
				text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" class="blue">magnis dis parturient</a> montes, nascetur ridiculus mus.',
				image: $path_assets+'/avatars/avatar1.png',
				sticky: false,
				time: '',
				class_name: (!$(n).get(0).checked ? n : '')
			});
			return false;
		});
	},
	// charts处理方法
	_handleCharts : function(){
		$('.chart').easyPieChart({
			trackColor: '#EEEEEE',
			lineCap: 'butt',
			lineWidth: 8,
			size:75,
			scaleLength : 0
		});
		$('[data-rel=tooltip]').tooltip();
		$('[data-rel=popover]').popover({html:true});
	},
	// 模态框处理方法
	_handleModals : function(){
		var e = $(".demo #bootbox-regular");
		var t = randomNumber.randomNum(1, 1e6);
		var n = "modal-" + t;
		e.attr("id", n);
		$("#" + n).on(ace.click_event, function(){
			bootbox.prompt("What is your name?", function(result) {
					if (result === null) {}
				});
		});
	},
	//spinner处理方法
	_handleSpinners : function(){
		var e = $(".demo #spinner-opts");
		var t = randomNumber.randomNum(1, 1e6);
		var n = "spinner-" + t;
		e.attr("id", n);
		var slide_styles = ['', 'green','red','purple','orange', 'dark'];
		var ii = 0;
		$("#" + n + " input[type=text]").each(function() {
			var $this = $(this);
			$this.hide().after('<span />');
			$this.next().addClass('ui-slider-small').
			addClass("inline ui-slider-"+slide_styles[ii++ % slide_styles.length]).
			css('width','125px').slider({
				value:parseInt($this.val()),
				range: "min",
				animate:true,
				min: parseInt($this.attr('data-min')),
				max: parseInt($this.attr('data-max')),
				step: parseFloat($this.attr('data-step')) || 1,
				slide: function( event, ui ) {
					$this.val(ui.value);
					spinner_update();
				}
			});
		});
		//CSS3 spinner
		$.fn.spin = function(opts) {
			this.each(function() {
				var $this = $(this),
					data = $this.data();
				if (data.spinner) {
				data.spinner.stop();
				delete data.spinner;
				}
				if (opts !== false) {
				data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
				}
			});
			return this;
		};
		function spinner_update() {
			var opts = {};
			$("#" + n + " input[type=text]").each(function() {
				opts[this.name] = parseFloat(this.value);
			});
			opts['left'] = 'auto';
			console.log($("#" + n + " .spinner-preview"));
			$("#" + n + " .spinner-preview").spin(opts);
		}
	}
}
//方法调用全都在这儿！
function handleJsIds() {
	_handles._handleTabsIds();
	_handles._handleAccordionIds();
	_handles._handleNotifications();
	_handles._handleCharts();
	_handles._handleModals();
	_handles._handleSpinners();
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