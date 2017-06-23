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
	},
	_handlePills : function(){
		var e = $('.demo #id-pills-stacked');
		var t = randomNumber.randomNum(1, 1e6);
		var n = "pills-" + t;
		e.attr("id", n);
		e.find(".pills-stacked").removeAttr('checked').on('click', function(){
		e.parent().find('.nav-pills').toggleClass('nav-stacked');
		});
	},
	// 数据树处理方法
	_handleDataTree : function(){
		var sampleData = initiateDemoData();
		var e = $('.demo #tree1');
		var e2 = $('.demo #tree2');
		var t = randomNumber.randomNum(1, 1e6);
		var n = "data-tree-" + t;
		var n2 = "data-tree2-" + t;
		e.attr("id", n);
		e2.attr("id", n2);
		e.ace_tree({
			dataSource: sampleData['dataSource1'],
			multiSelect: true,
			cacheItems: true,
			'open-icon' : 'ace-icon tree-minus',
			'close-icon' : 'ace-icon tree-plus',
			'selectable' : true,
			'selected-icon' : 'ace-icon fa fa-check',
			'unselected-icon' : 'ace-icon fa fa-times',
			loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>'
		});
		e2.ace_tree({
			dataSource: sampleData['dataSource2'] ,
			loadingHTML:'<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
			'open-icon' : 'ace-icon fa fa-folder-open',
			'close-icon' : 'ace-icon fa fa-folder',
			'selectable' : false,
			multiSelect: false,
			'selected-icon' : null,
			'unselected-icon' : null
		});
	},
	// 日历------------
	_datepicker : function(){
		var e = $('.demo #datepicker');
		var t = randomNumber.randomNum(1, 1e6);
		var n = "date-picker-" + t;
		e.attr("id", n);
		e.datepicker({
			showOtherMonths: true,
			selectOtherMonths: false,
		});
	},
	// 模态对话框---------
	_handleDialog : function(){
		var e1 = $('.demo #id-btn-dialog1'),
			e2 = $('.demo #id-btn-dialog2'),
			t = randomNumber.randomNum(1, 1e6);
		e1.attr("id", "date-picker1-" + t);
		e2.attr("id", "date-picker2-" + t);
		e1.on('click', function(e) {
			e.preventDefault();
			var dialog = e1.parent().find("#dialog-message").removeClass('hide').dialog({
				modal: true,
				title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> jQuery UI Dialog</h4></div>",
				title_html: true,
				buttons: [ 
					{
						text: "Cancel",
						"class" : "btn btn-xs",
						click: function() {
							$( this ).dialog( "close" ); 
						} 
					},
					{
						text: "OK",
						"class" : "btn btn-primary btn-xs",
						click: function() {
							$( this ).dialog( "close" ); 
						} 
					}
				]
			});
		});
		e2.on('click', function(e) {
			e.preventDefault();
			e2.parent().find("#dialog-confirm")
			.removeClass('hide').dialog({
				resizable: false,
				modal: true,
				title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Empty the recycle bin?</h4></div>",
				title_html: true,
				buttons: [
					{
						html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete all items",
						"class" : "btn btn-danger btn-xs",
						click: function() {
							$( this ).dialog( "close" );
						}
					}
					,
					{
						html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; Cancel",
						"class" : "btn btn-xs",
						click: function() {
							$( this ).dialog( "close" );
						}
					}
				]
			});
		});
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
	_handles._handlePills();
	_handles._handleDataTree();
	_handles._datepicker();
	_handles._handleDialog();
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
});
// fuelux tree 数据-------------
function initiateDemoData(){
	// 数据---1------
	var tree_data = {
		'for-sale' : {text: 'For Sale', type: 'folder'}	,
		'vehicles' : {text: 'Vehicles', type: 'folder'}	,
		'rentals' : {text: 'Rentals', type: 'folder'}	,
		'real-estate' : {text: 'Real Estate', type: 'folder'}	,
		'pets' : {text: 'Pets', type: 'folder'}	,
		'tickets' : {text: 'Tickets', type: 'item'}	,
		'services' : {text: 'Services', type: 'item'}	,
		'personals' : {text: 'Personals', type: 'item'}
	}
	tree_data['for-sale']['additionalParameters'] = {
		'children' : {
			'appliances' : {text: 'Appliances', type: 'item'},
			'arts-crafts' : {text: 'Arts & Crafts', type: 'item'},
			'clothing' : {text: 'Clothing', type: 'item'},
			'computers' : {text: 'Computers', type: 'item'},
			'jewelry' : {text: 'Jewelry', type: 'item'},
			'office-business' : {text: 'Office & Business', type: 'item'},
			'sports-fitness' : {text: 'Sports & Fitness', type: 'item'}
		}
	}
	tree_data['vehicles']['additionalParameters'] = {
		'children' : {
			'cars' : {text: 'Cars', type: 'folder'},
			'motorcycles' : {text: 'Motorcycles', type: 'item'},
			'boats' : {text: 'Boats', type: 'item'}
		}
	}
	tree_data['vehicles']['additionalParameters']['children']['cars']['additionalParameters'] = {
		'children' : {
			'classics' : {text: 'Classics', type: 'item'},
			'convertibles' : {text: 'Convertibles', type: 'item'},
			'coupes' : {text: 'Coupes', type: 'item'},
			'hatchbacks' : {text: 'Hatchbacks', type: 'item'},
			'hybrids' : {text: 'Hybrids', type: 'item'},
			'suvs' : {text: 'SUVs', type: 'item'},
			'sedans' : {text: 'Sedans', type: 'item'},
			'trucks' : {text: 'Trucks', type: 'item'}
		}
	}
	tree_data['rentals']['additionalParameters'] = {
		'children' : {
			'apartments-rentals' : {text: 'Apartments', type: 'item'},
			'office-space-rentals' : {text: 'Office Space', type: 'item'},
			'vacation-rentals' : {text: 'Vacation Rentals', type: 'item'}
		}
	}
	tree_data['real-estate']['additionalParameters'] = {
		'children' : {
			'apartments' : {text: 'Apartments', type: 'item'},
			'villas' : {text: 'Villas', type: 'item'},
			'plots' : {text: 'Plots', type: 'item'}
		}
	}
	tree_data['pets']['additionalParameters'] = {
		'children' : {
			'cats' : {text: 'Cats', type: 'item'},
			'dogs' : {text: 'Dogs', type: 'item'},
			'horses' : {text: 'Horses', type: 'item'},
			'reptiles' : {text: 'Reptiles', type: 'item'}
		}
	}
	// 数据---2------
	var tree_data_2 = {
		'pictures' : {text: 'Pictures', type: 'folder', 'icon-class':'red'}	,
		'music' : {text: 'Music', type: 'folder', 'icon-class':'orange'}	,
		'video' : {text: 'Video', type: 'folder', 'icon-class':'blue'}	,
		'documents' : {text: 'Documents', type: 'folder', 'icon-class':'green'}	,
		'backup' : {text: 'Backup', type: 'folder'}	,
		'readme' : {text: '<i class="ace-icon fa fa-file-text grey"></i> ReadMe.txt', type: 'item'},
		'manual' : {text: '<i class="ace-icon fa fa-book blue"></i> Manual.html', type: 'item'}
	}
	tree_data_2['music']['additionalParameters'] = {
		'children' : [
			{text: '<i class="ace-icon fa fa-music blue"></i> song1.ogg', type: 'item'},
			{text: '<i class="ace-icon fa fa-music blue"></i> song2.ogg', type: 'item'},
			{text: '<i class="ace-icon fa fa-music blue"></i> song3.ogg', type: 'item'},
			{text: '<i class="ace-icon fa fa-music blue"></i> song4.ogg', type: 'item'},
			{text: '<i class="ace-icon fa fa-music blue"></i> song5.ogg', type: 'item'}
		]
	}
	tree_data_2['video']['additionalParameters'] = {
		'children' : [
			{text: '<i class="ace-icon fa fa-film blue"></i> movie1.avi', type: 'item'},
			{text: '<i class="ace-icon fa fa-film blue"></i> movie2.avi', type: 'item'},
			{text: '<i class="ace-icon fa fa-film blue"></i> movie3.avi', type: 'item'},
			{text: '<i class="ace-icon fa fa-film blue"></i> movie4.avi', type: 'item'},
			{text: '<i class="ace-icon fa fa-film blue"></i> movie5.avi', type: 'item'}
		]
	}
	tree_data_2['pictures']['additionalParameters'] = {
		'children' : {
			'wallpapers' : {text: 'Wallpapers', type: 'folder', 'icon-class':'pink'},
			'camera' : {text: 'Camera', type: 'folder', 'icon-class':'pink'}
		}
	}
	tree_data_2['pictures']['additionalParameters']['children']['wallpapers']['additionalParameters'] = {
		'children' : [
			{text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper1.jpg', type: 'item'},
			{text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper2.jpg', type: 'item'},
			{text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper3.jpg', type: 'item'},
			{text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper4.jpg', type: 'item'}
		]
	}
	tree_data_2['pictures']['additionalParameters']['children']['camera']['additionalParameters'] = {
		'children' : [
			{text: '<i class="ace-icon fa fa-picture-o green"></i> photo1.jpg', type: 'item'},
			{text: '<i class="ace-icon fa fa-picture-o green"></i> photo2.jpg', type: 'item'},
			{text: '<i class="ace-icon fa fa-picture-o green"></i> photo3.jpg', type: 'item'},
			{text: '<i class="ace-icon fa fa-picture-o green"></i> photo4.jpg', type: 'item'},
			{text: '<i class="ace-icon fa fa-picture-o green"></i> photo5.jpg', type: 'item'},
			{text: '<i class="ace-icon fa fa-picture-o green"></i> photo6.jpg', type: 'item'}
		]
	}
	tree_data_2['documents']['additionalParameters'] = {
		'children' : [
			{text: '<i class="ace-icon fa fa-file-text red"></i> document1.pdf', type: 'item'},
			{text: '<i class="ace-icon fa fa-file-text grey"></i> document2.doc', type: 'item'},
			{text: '<i class="ace-icon fa fa-file-text grey"></i> document3.doc', type: 'item'},
			{text: '<i class="ace-icon fa fa-file-text red"></i> document4.pdf', type: 'item'},
			{text: '<i class="ace-icon fa fa-file-text grey"></i> document5.doc', type: 'item'}
		]
	}
	tree_data_2['backup']['additionalParameters'] = {
		'children' : [
			{text: '<i class="ace-icon fa fa-archive brown"></i> backup1.zip', type: 'item'},
			{text: '<i class="ace-icon fa fa-archive brown"></i> backup2.zip', type: 'item'},
			{text: '<i class="ace-icon fa fa-archive brown"></i> backup3.zip', type: 'item'},
			{text: '<i class="ace-icon fa fa-archive brown"></i> backup4.zip', type: 'item'}
		]
	}
	// 数据---1-----
	var dataSource1 = function(options, callback){
		var $data = null
		if(!("text" in options) && !("type" in options)){
			$data = tree_data;
			callback({ data: $data });
			return;
		}
		else if("type" in options && options.type == "folder") {
			if("additionalParameters" in options && "children" in options.additionalParameters)
				$data = options.additionalParameters.children;
			else $data = {}
		}
		if($data != null)
			setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);
	}
	// 数据---2------
	var dataSource2 = function(options, callback){
		var $data = null
		if(!("text" in options) && !("type" in options)){
			$data = tree_data_2;
			callback({ data: $data });
			return;
		}
		else if("type" in options && options.type == "folder") {
			if("additionalParameters" in options && "children" in options.additionalParameters)
				$data = options.additionalParameters.children;
			else $data = {}
		}
		if($data != null)
			setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);
	}
	return {'dataSource1': dataSource1 , 'dataSource2' : dataSource2}
}

