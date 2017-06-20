jQuery(function($) {
	$("#datepicker").datepicker({
		showOtherMonths: true,
		selectOtherMonths: false,
	});

	//override dialog's title function to allow for HTML titles
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title: function(title) {
			var $title = this.options.title || '&nbsp;'
			if(("title_html" in this.options) && this.options.title_html == true)
				title.html($title);

			else title.text($title);
		}
	}));

	$("#id-btn-dialog1").on('click', function(e) {
		e.preventDefault();

		var dialog = $("#dialog-message").removeClass('hide').dialog({
			modal: true,
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon fa fa-check'></i> jQuery UI Dialog</h4></div>",
			title_html: true,
			buttons: [{
					text: "Cancel",
					"class": "btn btn-xs",
					click: function() {
						$(this).dialog("close");
					}
				},
				{
					text: "OK",
					"class": "btn btn-primary btn-xs",
					click: function() {
						$(this).dialog("close");
					}
				}
			]
		});

		/**
		dialog.data( "uiDialog" )._title = function(title) {
			title.html( this.options.title );
		};
		**/
	});

	$("#id-btn-dialog2").on('click', function(e) {
		e.preventDefault();

		$("#dialog-confirm").removeClass('hide').dialog({
			resizable: false,
			modal: true,
			title: "<div class='widget-header'><h4 class='smaller'><i class='ace-icon fa fa-exclamation-triangle red'></i> Empty the recycle bin?</h4></div>",
			title_html: true,
			buttons: [{
					html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete all items",
					"class": "btn btn-danger btn-xs",
					click: function() {
						$(this).dialog("close");
					}
				},
				{
					html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; Cancel",
					"class": "btn btn-xs",
					click: function() {
						$(this).dialog("close");
					}
				}
			]
		});
	});

	//autocomplete
	var availableTags = [
		"ActionScript",
		"AppleScript",
		"Asp",
		"BASIC",
		"C",
		"C++",
		"Clojure",
		"COBOL",
		"ColdFusion",
		"Erlang",
		"Fortran",
		"Groovy",
		"Haskell",
		"Java",
		"JavaScript",
		"Lisp",
		"Perl",
		"PHP",
		"Python",
		"Ruby",
		"Scala",
		"Scheme"
	];
	$("#tags").autocomplete({
		source: availableTags
	});

	//custom autocomplete (category selection)
	$.widget("custom.catcomplete", $.ui.autocomplete, {
		_create: function() {
			this._super();
			this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
		},
		_renderMenu: function(ul, items) {
			var that = this,
				currentCategory = "";
			$.each(items, function(index, item) {
				var li;
				if(item.category != currentCategory) {
					ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
					currentCategory = item.category;
				}
				li = that._renderItemData(ul, item);
				if(item.category) {
					li.attr("aria-label", item.category + " : " + item.label);
				}
			});
		}
	});

	var data = [{
			label: "anders",
			category: ""
		},
		{
			label: "andreas",
			category: ""
		},
		{
			label: "antal",
			category: ""
		},
		{
			label: "annhhx10",
			category: "Products"
		},
		{
			label: "annk K12",
			category: "Products"
		},
		{
			label: "annttop C13",
			category: "Products"
		},
		{
			label: "anders andersson",
			category: "People"
		},
		{
			label: "andreas andersson",
			category: "People"
		},
		{
			label: "andreas johnson",
			category: "People"
		}
	];
	$("#search").catcomplete({
		delay: 0,
		source: data
	});

	//tooltips
	$("#show-option").tooltip({
		show: {
			effect: "slideDown",
			delay: 250
		}
	});

	$("#hide-option").tooltip({
		hide: {
			effect: "explode",
			delay: 250
		}
	});

	$("#open-event").tooltip({
		show: null,
		position: {
			my: "left top",
			at: "left bottom"
		},
		open: function(event, ui) {
			ui.tooltip.animate({
				top: ui.tooltip.position().top + 10
			}, "fast");
		}
	});

	//Menu
	$("#menu").menu();

	//spinner
	var spinner = $("#spinner").spinner({
		create: function(event, ui) {
			//add custom classes and icons
			$(this)
				.next().addClass('btn btn-success').html('<i class="ace-icon fa fa-plus"></i>')
				.next().addClass('btn btn-danger').html('<i class="ace-icon fa fa-minus"></i>')

			//larger buttons on touch devices
			if('touchstart' in document.documentElement)
				$(this).closest('.ui-spinner').addClass('ui-spinner-touch');
		}
	});

	//slider example
	$("#slider").slider({
		range: true,
		min: 0,
		max: 500,
		values: [75, 300]
	});

	//jquery accordion
	$("#accordion").accordion({
		collapsible: true,
		heightStyle: "content",
		animate: 250,
		header: ".accordion-header"
	}).sortable({
		axis: "y",
		handle: ".accordion-header",
		stop: function(event, ui) {
			// IE doesn't register the blur when sorting
			// so trigger focusout handlers to remove .ui-state-focus
			ui.item.children(".accordion-header").triggerHandler("focusout");
		}
	});
	//jquery tabs
	$("#tabs").tabs();

	//progressbar
	$("#progressbar").progressbar({
		value: 37,
		create: function(event, ui) {
			$(this).addClass('progress progress-striped active')
				.children(0).addClass('progress-bar progress-bar-success');
		}
	});

	//selectmenu
	$("#number").css('width', '200px')
		.selectmenu({
			position: {
				my: "left bottom",
				at: "left top"
			}
		})

	$('.dd').nestable();

	$('.dd-handle a').on('mousedown', function(e) {
		e.stopPropagation();
	});

	$('[data-rel="tooltip"]').tooltip();

	var oTable1 =
		$('#sample-table-2')
		//.wrap("<div class='dataTables_borderWrap' />")   //if you are applying horizontal scrolling (sScrollX)
		.dataTable({
			bAutoWidth: false,
			"aoColumns": [{
					"bSortable": false
				},
				null, null, null, null, null,
				{
					"bSortable": false
				}
			],
			"aaSorting": [],

			//,
			//"sScrollY": "200px",
			//"bPaginate": false,

			//"sScrollX": "100%",
			//"sScrollXInner": "120%",
			//"bScrollCollapse": true,
			//Note: if you are applying horizontal scrolling (sScrollX) on a ".table-bordered"
			//you may want to wrap the table inside a "div.dataTables_borderWrap" element

			//"iDisplayLength": 50
		});
	/**
				var tableTools = new $.fn.dataTable.TableTools( oTable1, {
					"sSwfPath": "../../copy_csv_xls_pdf.swf",
			        "buttons": [
			            "copy",
			            "csv",
			            "xls",
						"pdf",
			            "print"
			        ]
			    } );
			    $( tableTools.fnContainer() ).insertBefore('#sample-table-2');
				*/

	//oTable1.fnAdjustColumnSizing();

	$(document).on('click', 'th input:checkbox', function() {
		var that = this;
		$(this).closest('table').find('tr > td:first-child input:checkbox')
			.each(function() {
				this.checked = that.checked;
				$(this).closest('tr').toggleClass('selected');
			});
	});

	$('[data-rel="tooltip"]').tooltip({
		placement: tooltip_placement
	});

	function tooltip_placement(context, source) {
		var $source = $(source);
		var $parent = $source.closest('table')
		var off1 = $parent.offset();
		var w1 = $parent.width();

		var off2 = $source.offset();
		//var w2 = $source.width();

		if(parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) return 'right';
		return 'left';
	}
	$('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		if($(e.target).attr('href') == "#home") drawChartNow();
	})

	/**
		//go to next tab, without user clicking
		$('#myTab > .active').next().find('> a').trigger('click');
	*/

	$('#accordion-style').on('click', function(ev) {
		var target = $('input', ev.target);
		var which = parseInt(target.val());
		if(which == 2) $('#accordion').addClass('accordion-style2');
		else $('#accordion').removeClass('accordion-style2');
	});

	//$('[href="#collapseTwo"]').trigger('click');

	var oldie = /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase());
	$('.easy-pie-chart.percentage').each(function() {
		$(this).easyPieChart({
			barColor: $(this).data('color'),
			trackColor: '#EEEEEE',
			scaleColor: false,
			lineCap: 'butt',
			lineWidth: 8,
			animate: oldie ? false : 1000,
			size: 75
		}).css('color', $(this).data('color'));
	});

	$('[data-rel=tooltip]').tooltip();
	$('[data-rel=popover]').popover({
		html: true
	});

	$('#gritter-regular').on(ace.click_event, function() {
		$.gritter.add({
			title: 'This is a regular notice!',
			text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" class="blue">magnis dis parturient</a> montes, nascetur ridiculus mus.',
			image: $path_assets + '/avatars/avatar1.png',
			sticky: false,
			time: '',
			class_name: (!$('#gritter-light').get(0).checked ? 'gritter-light' : '')
		});

		return false;
	});

	$('#gritter-sticky').on(ace.click_event, function() {
		var unique_id = $.gritter.add({
			title: 'This is a sticky notice!',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" class="red">magnis dis parturient</a> montes, nascetur ridiculus mus.',
			image: $path_assets + '/avatars/avatar.png',
			sticky: true,
			time: '',
			class_name: 'gritter-info' + (!$('#gritter-light').get(0).checked ? ' gritter-light' : '')
		});

		return false;
	});

	$('#gritter-without-image').on(ace.click_event, function() {
		$.gritter.add({
			// (string | mandatory) the heading of the notification
			title: 'This is a notice without an image!',
			// (string | mandatory) the text inside the notification
			text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" class="orange">magnis dis parturient</a> montes, nascetur ridiculus mus.',
			class_name: 'gritter-success' + (!$('#gritter-light').get(0).checked ? ' gritter-light' : '')
		});

		return false;
	});

	$('#gritter-max3').on(ace.click_event, function() {
		$.gritter.add({
			title: 'This is a notice with a max of 3 on screen at one time!',
			text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" class="green">magnis dis parturient</a> montes, nascetur ridiculus mus.',
			image: $path_assets + '/avatars/avatar3.png',
			sticky: false,
			before_open: function() {
				if($('.gritter-item-wrapper').length >= 3) {
					return false;
				}
			},
			class_name: 'gritter-warning' + (!$('#gritter-light').get(0).checked ? ' gritter-light' : '')
		});

		return false;
	});

	$('#gritter-center').on(ace.click_event, function() {
		$.gritter.add({
			title: 'This is a centered notification',
			text: 'Just add a "gritter-center" class_name to your $.gritter.add or globally to $.gritter.options.class_name',
			class_name: 'gritter-info gritter-center' + (!$('#gritter-light').get(0).checked ? ' gritter-light' : '')
		});

		return false;
	});

	$('#gritter-error').on(ace.click_event, function() {
		$.gritter.add({
			title: 'This is a warning notification',
			text: 'Just add a "gritter-light" class_name to your $.gritter.add or globally to $.gritter.options.class_name',
			class_name: 'gritter-error' + (!$('#gritter-light').get(0).checked ? ' gritter-light' : '')
		});

		return false;
	});

	$("#gritter-remove").on(ace.click_event, function() {
		$.gritter.removeAll();
		return false;
	});

	///////

	$("#bootbox-regular").on(ace.click_event, function() {
		bootbox.prompt("What is your name?", function(result) {
			if(result === null) {

			} else {

			}
		});
	});

	$("#bootbox-confirm").on(ace.click_event, function() {
		bootbox.confirm("Are you sure?", function(result) {
			if(result) {
				//
			}
		});
	});

	/**
		$("#bootbox-confirm").on(ace.click_event, function() {
			bootbox.confirm({
				message: "Are you sure?",
				buttons: {
				  confirm: {
					 label: "OK",
					 className: "btn-primary btn-sm",
				  },
				  cancel: {
					 label: "Cancel",
					 className: "btn-sm",
				  }
				},
				callback: function(result) {
					if(result) alert(1)
				}
			  }
			);
		});
	**/

	$("#bootbox-options").on(ace.click_event, function() {
		bootbox.dialog({
			message: "<span class='bigger-110'>I am a custom dialog with smaller buttons</span>",
			buttons: {
				"success": {
					"label": "<i class='ace-icon fa fa-check'></i> Success!",
					"className": "btn-sm btn-success",
					"callback": function() {
						//Example.show("great success");
					}
				},
				"danger": {
					"label": "Danger!",
					"className": "btn-sm btn-danger",
					"callback": function() {
						//Example.show("uh oh, look out!");
					}
				},
				"click": {
					"label": "Click ME!",
					"className": "btn-sm btn-primary",
					"callback": function() {
						//Example.show("Primary button");
					}
				},
				"button": {
					"label": "Just a button...",
					"className": "btn-sm"
				}
			}
		});
	});

	$('#spinner-opts small').css({
		display: 'inline-block',
		width: '60px'
	})

	var slide_styles = ['', 'green', 'red', 'purple', 'orange', 'dark'];
	var ii = 0;
	$("#spinner-opts input[type=text]").each(function() {
		var $this = $(this);
		$this.hide().after('<span />');
		$this.next().addClass('ui-slider-small').
		addClass("inline ui-slider-" + slide_styles[ii++ % slide_styles.length]).
		css('width', '125px').slider({
			value: parseInt($this.val()),
			range: "min",
			animate: true,
			min: parseInt($this.attr('data-min')),
			max: parseInt($this.attr('data-max')),
			step: parseFloat($this.attr('data-step')) || 1,
			slide: function(event, ui) {
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

			if(data.spinner) {
				data.spinner.stop();
				delete data.spinner;
			}
			if(opts !== false) {
				data.spinner = new Spinner($.extend({
					color: $this.css('color')
				}, opts)).spin(this);
			}
		});
		return this;
	};

	function spinner_update() {
		var opts = {};
		$('#spinner-opts input[type=text]').each(function() {
			opts[this.name] = parseFloat(this.value);
		});
		opts['left'] = 'auto';
		$('#spinner-preview').spin(opts);
	}

	$('#id-pills-stacked').removeAttr('checked').on('click', function() {
		$('.nav-pills').toggleClass('nav-stacked');
	});

	///////////
	$(document).one('ajaxloadstart.page', function(e) {
		$.gritter.removeAll();
		$('.modal').modal('hide');
	});
	var sampleData = initiateDemoData(); //see below

	$('#tree1').ace_tree({
		dataSource: sampleData['dataSource1'],
		multiSelect: true,
		cacheItems: true,
		'open-icon': 'ace-icon tree-minus',
		'close-icon': 'ace-icon tree-plus',
		'selectable': true,
		'selected-icon': 'ace-icon fa fa-check',
		'unselected-icon': 'ace-icon fa fa-times',
		loadingHTML: '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>'
	});

	$('#tree2').ace_tree({
		dataSource: sampleData['dataSource2'],
		loadingHTML: '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
		'open-icon': 'ace-icon fa fa-folder-open',
		'close-icon': 'ace-icon fa fa-folder',
		'selectable': false,
		multiSelect: false,
		'selected-icon': null,
		'unselected-icon': null
	});

	/**
	//please refer to docs for more info
	$('#tree1')
	.on('loaded.fu.tree', function(e) {
	})
	.on('updated.fu.tree', function(e, result) {
	})
	.on('selected.fu.tree', function(e) {
	})
	.on('deselected.fu.tree', function(e) {
	})
	.on('opened.fu.tree', function(e) {
	})
	.on('closed.fu.tree', function(e) {
	});
	*/

	function initiateDemoData() {
		var tree_data = {
			'for-sale': {
				text: 'For Sale',
				type: 'folder'
			},
			'vehicles': {
				text: 'Vehicles',
				type: 'folder'
			},
			'rentals': {
				text: 'Rentals',
				type: 'folder'
			},
			'real-estate': {
				text: 'Real Estate',
				type: 'folder'
			},
			'pets': {
				text: 'Pets',
				type: 'folder'
			},
			'tickets': {
				text: 'Tickets',
				type: 'item'
			},
			'services': {
				text: 'Services',
				type: 'item'
			},
			'personals': {
				text: 'Personals',
				type: 'item'
			}
		}
		tree_data['for-sale']['additionalParameters'] = {
			'children': {
				'appliances': {
					text: 'Appliances',
					type: 'item'
				},
				'arts-crafts': {
					text: 'Arts & Crafts',
					type: 'item'
				},
				'clothing': {
					text: 'Clothing',
					type: 'item'
				},
				'computers': {
					text: 'Computers',
					type: 'item'
				},
				'jewelry': {
					text: 'Jewelry',
					type: 'item'
				},
				'office-business': {
					text: 'Office & Business',
					type: 'item'
				},
				'sports-fitness': {
					text: 'Sports & Fitness',
					type: 'item'
				}
			}
		}
		tree_data['vehicles']['additionalParameters'] = {
			'children': {
				'cars': {
					text: 'Cars',
					type: 'folder'
				},
				'motorcycles': {
					text: 'Motorcycles',
					type: 'item'
				},
				'boats': {
					text: 'Boats',
					type: 'item'
				}
			}
		}
		tree_data['vehicles']['additionalParameters']['children']['cars']['additionalParameters'] = {
			'children': {
				'classics': {
					text: 'Classics',
					type: 'item'
				},
				'convertibles': {
					text: 'Convertibles',
					type: 'item'
				},
				'coupes': {
					text: 'Coupes',
					type: 'item'
				},
				'hatchbacks': {
					text: 'Hatchbacks',
					type: 'item'
				},
				'hybrids': {
					text: 'Hybrids',
					type: 'item'
				},
				'suvs': {
					text: 'SUVs',
					type: 'item'
				},
				'sedans': {
					text: 'Sedans',
					type: 'item'
				},
				'trucks': {
					text: 'Trucks',
					type: 'item'
				}
			}
		}

		tree_data['rentals']['additionalParameters'] = {
			'children': {
				'apartments-rentals': {
					text: 'Apartments',
					type: 'item'
				},
				'office-space-rentals': {
					text: 'Office Space',
					type: 'item'
				},
				'vacation-rentals': {
					text: 'Vacation Rentals',
					type: 'item'
				}
			}
		}
		tree_data['real-estate']['additionalParameters'] = {
			'children': {
				'apartments': {
					text: 'Apartments',
					type: 'item'
				},
				'villas': {
					text: 'Villas',
					type: 'item'
				},
				'plots': {
					text: 'Plots',
					type: 'item'
				}
			}
		}
		tree_data['pets']['additionalParameters'] = {
			'children': {
				'cats': {
					text: 'Cats',
					type: 'item'
				},
				'dogs': {
					text: 'Dogs',
					type: 'item'
				},
				'horses': {
					text: 'Horses',
					type: 'item'
				},
				'reptiles': {
					text: 'Reptiles',
					type: 'item'
				}
			}
		}

		var dataSource1 = function(options, callback) {
			var $data = null
			if(!("text" in options) && !("type" in options)) {
				$data = tree_data; //the root tree
				callback({
					data: $data
				});
				return;
			} else if("type" in options && options.type == "folder") {
				if("additionalParameters" in options && "children" in options.additionalParameters)
					$data = options.additionalParameters.children;
				else $data = {} //no data
			}

			if($data != null) //this setTimeout is only for mimicking some random delay
				setTimeout(function() {
					callback({
						data: $data
					});
				}, parseInt(Math.random() * 500) + 200);

			//we have used static data here
			//but you can retrieve your data dynamically from a server using ajax call
			//checkout examples/treeview.html and examples/treeview.js for more info
		}

		var tree_data_2 = {
			'pictures': {
				text: 'Pictures',
				type: 'folder',
				'icon-class': 'red'
			},
			'music': {
				text: 'Music',
				type: 'folder',
				'icon-class': 'orange'
			},
			'video': {
				text: 'Video',
				type: 'folder',
				'icon-class': 'blue'
			},
			'documents': {
				text: 'Documents',
				type: 'folder',
				'icon-class': 'green'
			},
			'backup': {
				text: 'Backup',
				type: 'folder'
			},
			'readme': {
				text: '<i class="ace-icon fa fa-file-text grey"></i> ReadMe.txt',
				type: 'item'
			},
			'manual': {
				text: '<i class="ace-icon fa fa-book blue"></i> Manual.html',
				type: 'item'
			}
		}
		tree_data_2['music']['additionalParameters'] = {
			'children': [{
					text: '<i class="ace-icon fa fa-music blue"></i> song1.ogg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-music blue"></i> song2.ogg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-music blue"></i> song3.ogg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-music blue"></i> song4.ogg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-music blue"></i> song5.ogg',
					type: 'item'
				}
			]
		}
		tree_data_2['video']['additionalParameters'] = {
			'children': [{
					text: '<i class="ace-icon fa fa-film blue"></i> movie1.avi',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-film blue"></i> movie2.avi',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-film blue"></i> movie3.avi',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-film blue"></i> movie4.avi',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-film blue"></i> movie5.avi',
					type: 'item'
				}
			]
		}
		tree_data_2['pictures']['additionalParameters'] = {
			'children': {
				'wallpapers': {
					text: 'Wallpapers',
					type: 'folder',
					'icon-class': 'pink'
				},
				'camera': {
					text: 'Camera',
					type: 'folder',
					'icon-class': 'pink'
				}
			}
		}
		tree_data_2['pictures']['additionalParameters']['children']['wallpapers']['additionalParameters'] = {
			'children': [{
					text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper1.jpg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper2.jpg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper3.jpg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-picture-o green"></i> wallpaper4.jpg',
					type: 'item'
				}
			]
		}
		tree_data_2['pictures']['additionalParameters']['children']['camera']['additionalParameters'] = {
			'children': [{
					text: '<i class="ace-icon fa fa-picture-o green"></i> photo1.jpg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-picture-o green"></i> photo2.jpg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-picture-o green"></i> photo3.jpg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-picture-o green"></i> photo4.jpg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-picture-o green"></i> photo5.jpg',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-picture-o green"></i> photo6.jpg',
					type: 'item'
				}
			]
		}

		tree_data_2['documents']['additionalParameters'] = {
			'children': [{
					text: '<i class="ace-icon fa fa-file-text red"></i> document1.pdf',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-file-text grey"></i> document2.doc',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-file-text grey"></i> document3.doc',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-file-text red"></i> document4.pdf',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-file-text grey"></i> document5.doc',
					type: 'item'
				}
			]
		}

		tree_data_2['backup']['additionalParameters'] = {
			'children': [{
					text: '<i class="ace-icon fa fa-archive brown"></i> backup1.zip',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-archive brown"></i> backup2.zip',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-archive brown"></i> backup3.zip',
					type: 'item'
				},
				{
					text: '<i class="ace-icon fa fa-archive brown"></i> backup4.zip',
					type: 'item'
				}
			]
		}
		var dataSource2 = function(options, callback) {
			var $data = null
			if(!("text" in options) && !("type" in options)) {
				$data = tree_data_2; //the root tree
				callback({
					data: $data
				});
				return;
			} else if("type" in options && options.type == "folder") {
				if("additionalParameters" in options && "children" in options.additionalParameters)
					$data = options.additionalParameters.children;
				else $data = {} //no data
			}

			if($data != null) //this setTimeout is only for mimicking some random delay
				setTimeout(function() {
					callback({
						data: $data
					});
				}, parseInt(Math.random() * 500) + 200);

			//we have used static data here
			//but you can retrieve your data dynamically from a server using ajax call
			//checkout examples/treeview.html and examples/treeview.js for more info
		}

		return {
			'dataSource1': dataSource1,
			'dataSource2': dataSource2
		}
	}
	$('#id-disable-check').on('click', function() {
		var inp = $('#form-input-readonly').get(0);
		if(inp.hasAttribute('disabled')) {
			inp.setAttribute('readonly', 'true');
			inp.removeAttribute('disabled');
			inp.value = "This text field is readonly!";
		} else {
			inp.setAttribute('disabled', 'disabled');
			inp.removeAttribute('readonly');
			inp.value = "This text field is disabled!";
		}
	});

	if(!ace.vars['touch']) {
		$('.chosen-select').chosen({
			allow_single_deselect: true
		});
		//resize the chosen on window resize

		$(window)
			.off('resize.chosen')
			.on('resize.chosen', function() {
				$('.chosen-select').each(function() {
					var $this = $(this);
					$this.next().css({
						'width': $this.parent().width()
					});
				})
			}).trigger('resize.chosen');
		//resize chosen on sidebar collapse/expand
		$(document).on('settings.ace.chosen', function(e, event_name, event_val) {
			if(event_name != 'sidebar_collapsed') return;
			$('.chosen-select').each(function() {
				var $this = $(this);
				$this.next().css({
					'width': $this.parent().width()
				});
			})
		});

		$('#chosen-multiple-style .btn').on('click', function(e) {
			var target = $(this).find('input[type=radio]');
			var which = parseInt(target.val());
			if(which == 2) $('#form-field-select-4').addClass('tag-input-style');
			else $('#form-field-select-4').removeClass('tag-input-style');
		});
	}

	$('[data-rel=tooltip]').tooltip({
		container: 'body'
	});
	$('[data-rel=popover]').popover({
		container: 'body'
	});

	$('textarea[class*=autosize]').autosize({
		append: "\n"
	});
	$('textarea.limited').inputlimiter({
		remText: '%n character%s remaining...',
		limitText: 'max allowed : %n.'
	});

	$.mask.definitions['~'] = '[+-]';
	$('.input-mask-date').mask('99/99/9999');
	$('.input-mask-phone').mask('(999) 999-9999');
	$('.input-mask-eyescript').mask('~9.99 ~9.99 999');
	$(".input-mask-product").mask("a*-999-a999", {
		placeholder: " ",
		completed: function() {
			alert("You typed the following: " + this.val());
		}
	});

	$("#input-size-slider").css('width', '200px').slider({
		value: 1,
		range: "min",
		min: 1,
		max: 8,
		step: 1,
		slide: function(event, ui) {
			var sizing = ['', 'input-sm', 'input-lg', 'input-mini', 'input-small', 'input-medium', 'input-large', 'input-xlarge', 'input-xxlarge'];
			var val = parseInt(ui.value);
			$('#form-field-4').attr('class', sizing[val]).val('.' + sizing[val]);
		}
	});

	$("#input-span-slider").slider({
		value: 1,
		range: "min",
		min: 1,
		max: 12,
		step: 1,
		slide: function(event, ui) {
			var val = parseInt(ui.value);
			$('#form-field-5').attr('class', 'col-xs-' + val).val('.col-xs-' + val);
		}
	});

	//"jQuery UI Slider"
	//range slider tooltip example
	$("#slider-range").css('height', '200px').slider({
		orientation: "vertical",
		range: true,
		min: 0,
		max: 100,
		values: [17, 67],
		slide: function(event, ui) {
			var val = ui.values[$(ui.handle).index() - 1] + "";

			if(!ui.handle.firstChild) {
				$("<div class='tooltip right in' style='display:none;left:16px;top:-6px;'><div class='tooltip-arrow'></div><div class='tooltip-inner'></div></div>")
					.prependTo(ui.handle);
			}
			$(ui.handle.firstChild).show().children().eq(1).text(val);
		}
	}).find('span.ui-slider-handle').on('blur', function() {
		$(this.firstChild).hide();
	});

	$("#slider-range-max").slider({
		range: "max",
		min: 1,
		max: 10,
		value: 2
	});

	$("#slider-eq > span").css({
		width: '90%',
		'float': 'left',
		margin: '15px'
	}).each(function() {
		// read initial values from markup and remove that
		var value = parseInt($(this).text(), 10);
		$(this).empty().slider({
			value: value,
			range: "min",
			animate: true

		});
	});

	$("#slider-eq > span.ui-slider-purple").slider('disable'); //disable third item

	$('#id-input-file-1 , #id-input-file-2').ace_file_input({
		no_file: 'No File ...',
		btn_choose: 'Choose',
		btn_change: 'Change',
		droppable: false,
		onchange: null,
		thumbnail: false //| true | large
		//whitelist:'gif|png|jpg|jpeg'
		//blacklist:'exe|php'
		//onchange:''
		//
	});
	//pre-show a file name, for example a previously selected file
	//$('#id-input-file-1').ace_file_input('show_file_list', ['myfile.txt'])

	$('#id-input-file-3').ace_file_input({
		style: 'well',
		btn_choose: 'Drop files here or click to choose',
		btn_change: null,
		no_icon: 'ace-icon fa fa-cloud-upload',
		droppable: true,
		thumbnail: 'small' //large | fit
			//,icon_remove:null//set null, to hide remove/reset button
			/**,before_change:function(files, dropped) {
				//Check an example below
				//or examples/file-upload.html
				return true;
			}*/
			/**,before_remove : function() {
				return true;
			}*/
			,
		preview_error: function(filename, error_code) {
			//name of the file that failed
			//error_code values
			//1 = 'FILE_LOAD_FAILED',
			//2 = 'IMAGE_LOAD_FAILED',
			//3 = 'THUMBNAIL_FAILED'
			//alert(error_code);
		}

	}).on('change', function() {
		//console.log($(this).data('ace_input_files'));
		//console.log($(this).data('ace_input_method'));
	});

	//$('#id-input-file-3')
	//.ace_file_input('show_file_list', [
	//{type: 'image', name: 'name of image', path: 'http://path/to/image/for/preview'},
	//{type: 'file', name: 'hello.txt'}
	//]);

	//dynamically change allowed formats by changing allowExt && allowMime function
	$('#id-file-format').removeAttr('checked').on('change', function() {
		var whitelist_ext, whitelist_mime;
		var btn_choose
		var no_icon
		if(this.checked) {
			btn_choose = "Drop images here or click to choose";
			no_icon = "ace-icon fa fa-picture-o";

			whitelist_ext = ["jpeg", "jpg", "png", "gif", "bmp"];
			whitelist_mime = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp"];
		} else {
			btn_choose = "Drop files here or click to choose";
			no_icon = "ace-icon fa fa-cloud-upload";

			whitelist_ext = null; //all extensions are acceptable
			whitelist_mime = null; //all mimes are acceptable
		}
		var file_input = $('#id-input-file-3');
		file_input
			.ace_file_input('update_settings', {
				'btn_choose': btn_choose,
				'no_icon': no_icon,
				'allowExt': whitelist_ext,
				'allowMime': whitelist_mime
			})
		file_input.ace_file_input('reset_input');

		file_input
			.off('file.error.ace')
			.on('file.error.ace', function(e, info) {
				//console.log(info.file_count);//number of selected files
				//console.log(info.invalid_count);//number of invalid files
				//console.log(info.error_list);//a list of errors in the following format

				//info.error_count['ext']
				//info.error_count['mime']
				//info.error_count['size']

				//info.error_list['ext']  = [list of file names with invalid extension]
				//info.error_list['mime'] = [list of file names with invalid mimetype]
				//info.error_list['size'] = [list of file names with invalid size]

				/**
				if( !info.dropped ) {
					//perhapse reset file field if files have been selected, and there are invalid files among them
					//when files are dropped, only valid files will be added to our file array
					e.preventDefault();//it will rest input
				}
				*/

				//if files have been selected (not dropped), you can choose to reset input
				//because browser keeps all selected files anyway and this cannot be changed
				//we can only reset file field to become empty again
				//on any case you still should check files with your server side script
				//because any arbitrary file can be uploaded by user and it's not safe to rely on browser-side measures
			});

	});

	$('#spinner1').ace_spinner({
			value: 0,
			min: 0,
			max: 200,
			step: 10,
			btn_up_class: 'btn-info',
			btn_down_class: 'btn-info'
		})
		.closest('.ace-spinner')
		.on('changed.fu.spinbox', function() {
			//alert($('#spinner1').val())
		});
	$('#spinner2').ace_spinner({
		value: 0,
		min: 0,
		max: 10000,
		step: 100,
		touch_spinner: true,
		icon_up: 'ace-icon fa fa-caret-up',
		icon_down: 'ace-icon fa fa-caret-down'
	});
	$('#spinner3').ace_spinner({
		value: 0,
		min: -100,
		max: 100,
		step: 10,
		on_sides: true,
		icon_up: 'ace-icon fa fa-plus smaller-75',
		icon_down: 'ace-icon fa fa-minus smaller-75',
		btn_up_class: 'btn-success',
		btn_down_class: 'btn-danger'
	});
	//$('#spinner1').ace_spinner('disable').ace_spinner('value', 11);
	//or
	//$('#spinner1').closest('.ace-spinner').spinner('disable').spinner('enable').spinner('value', 11);//disable, enable or change value
	//$('#spinner1').closest('.ace-spinner').spinner('value', 0);//reset to 0

	//datepicker plugin
	//link
	$('.date-picker').datepicker({
			autoclose: true,
			todayHighlight: true
		})
		//show datepicker when clicking on the icon
		.next().on(ace.click_event, function() {
			$(this).prev().focus();
		});

	//or change it into a date range picker
	$('.input-daterange').datepicker({
		autoclose: true
	});

	//to translate the daterange picker, please copy the "examples/daterange-fr.js" contents here before initialization
	$('input[name=date-range-picker]').daterangepicker({
			'applyClass': 'btn-sm btn-success',
			'cancelClass': 'btn-sm btn-default',
			locale: {
				applyLabel: 'Apply',
				cancelLabel: 'Cancel',
			}
		})
		.prev().on(ace.click_event, function() {
			$(this).next().focus();
		});

	$('#timepicker1').timepicker({
		minuteStep: 1,
		showSeconds: true,
		showMeridian: false
	}).next().on(ace.click_event, function() {
		$(this).prev().focus();
	});

	$('#date-timepicker1').datetimepicker().next().on(ace.click_event, function() {
		$(this).prev().focus();
	});

	$('#colorpicker1').colorpicker();

	$('#simple-colorpicker-1').ace_colorpicker();
	//$('#simple-colorpicker-1').ace_colorpicker('pick', 2);//select 2nd color
	//$('#simple-colorpicker-1').ace_colorpicker('pick', '#fbe983');//select #fbe983 color
	//var picker = $('#simple-colorpicker-1').data('ace_colorpicker')
	//picker.pick('red', true);//insert the color if it doesn't exist

	$(".knob").knob();

	var tag_input = $('#form-field-tags');
	try {
		tag_input.tag({
			placeholder: tag_input.attr('placeholder'),
			//enable typeahead by specifying the source array
			source: ace.vars['US_STATES'], //defined in ace.js >> ace.enable_search_ahead
			/**
			//or fetch data from database, fetch those that match "query"
			source: function(query, process) {
			  $.ajax({url: 'remote_source.php?q='+encodeURIComponent(query)})
			  .done(function(result_items){
				process(result_items);
			  });
			}
			*/
		})

		//programmatically add a new
		var $tag_obj = $('#form-field-tags').data('tag');
		$tag_obj.add('Programmatically Added');
	} catch(e) {
		//display a textarea for old IE, because it doesn't support this plugin or another one I tried!
		tag_input.after('<textarea id="' + tag_input.attr('id') + '" name="' + tag_input.attr('name') + '" rows="3">' + tag_input.val() + '</textarea>').remove();
		//$('#form-field-tags').autosize({append: "\n"});
	}

	/////////
	$('#modal-form input[type=file]').ace_file_input({
		style: 'well',
		btn_choose: 'Drop files here or click to choose',
		btn_change: null,
		no_icon: 'ace-icon fa fa-cloud-upload',
		droppable: true,
		thumbnail: 'large'
	})

	//chosen plugin inside a modal will have a zero width because the select element is originally hidden
	//and its width cannot be determined.
	//so we set the width after modal is show
	$('#modal-form').on('shown.bs.modal', function() {
		if(!ace.vars['touch']) {
			$(this).find('.chosen-container').each(function() {
				$(this).find('a:first-child').css('width', '210px');
				$(this).find('.chosen-drop').css('width', '210px');
				$(this).find('.chosen-search input').css('width', '200px');
			});
		}
	})
	/**
	//or you can activate the chosen plugin after modal is shown
	//this way select element becomes visible with dimensions and chosen works as expected
	$('#modal-form').on('shown', function () {
		$(this).find('.modal-chosen').chosen();
	})
	*/

	$(document).one('ajaxloadstart.page', function(e) {
		$('textarea[class*=autosize]').trigger('autosize.destroy');
		$('.limiterBox,.autosizejs').remove();
		$('.daterangepicker.dropdown-menu,.colorpicker.dropdown-menu,.bootstrap-datetimepicker-widget.dropdown-menu').remove();
	});
});

