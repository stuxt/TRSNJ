/*
	TRS plugin for page 1.0.0 (build 63049cb)
	Copyright 2015 TRS Inc. All rights reserved.
*/

;(function($){
	
	/* ************* jQuery Ext jQuery.fn. ***************
	// Name:ajax异步加载更多
	// Author:chen.yajun@trs.com.cn
	// Requires: jQuery
	// LastModify:2015-11-11
	*********************************************************** */ 

	 $.fn.TRS_Page = function(options) {
	    var pageNextFlag=0;//分页文件角标
	    var nextUrl ='';
	    var htmlData=null;
	    var $this=$(this);
		//alert("this:<br>"+$this.html());

		// 默认设置defaults
		var defaults = { 
			dataPageName: 'data',//加载数据文件的路径
			//innerDataId: $("#Data"),//数据加载的目标容器
			innerPageId: $("#Page"),//加载按钮目标容器
			pageCount:null,//分数总数
		    pageIndex:0,//当前页数
		    pageText:'加载更多'//设置分页文字内容
		};
	    //合并用户定义和默认参数
	    var opts = $.extend({}, defaults, options);

	    //var DataID = opts.innerDataId;
	    var PageID = opts.innerPageId;
	    var _pageIndex =opts.pageIndex;
	    var _pageText = opts.pageText;
	    //alert("DataID:<br>"+DataID.html());

	    // 实现翻页的主要流程
	    var Pager = function(){
			if(opts.pageCount<=1 || opts.pageCount==null){
		    	return;
		    }else{
		    	if (_pageIndex==0){
		    		pageNextFlag++;
		    		createPage();
		    	}else{
		    		if (_pageIndex==opts.pageCount-1) {
		    			pageNextFlag=0;//此时没有更多 加载按钮消失
		    			createPage();
		    		}else{
		    			pageNextFlag++;
			    		createPage();
		    		}
		    	}
		    }
		};

		// 数据文件路径拼接
	    var getPath = function(){
	    	nextUrl = opts.dataPageName+'_'+pageNextFlag+'.html';
	    };

	    // 加载数据并返回到目标容器
	    var getData = function(){
	    	$.ajax({
	    		type : "get",
	    		dataType : "html",
	    		url : nextUrl,
	    		cache : false,
	    		async : false,
	    		success : function(data) {
	    			htmlData=data;
	    			$this.append(htmlData);
	    			Pager();
	    		},
	    		error : function(data) {
	    			htmlData = null;
	    		}
	    	});
	    };

	    // 返回加载更多按钮，并触发点击事件
	    var createPage = function(){
	    	var htmlPage='';
	    	if(pageNextFlag!=0){
				htmlPage+='<a href="javascript:void(0);" class="more">'+_pageText+'</a>';
			}
			PageID.html(htmlPage);
			var a_more = PageID.find("a");
			for (var i = 0; i < a_more.length; i++) {
				a_more[i].onclick = function() {
					_pageIndex =pageNextFlag;
					getPath();
					if (nextUrl != undefined && nextUrl != '') {
						getData();
					}
				};
			}
	    };

		Pager();
	    
	  }; 

  })(jQuery);


	/*
	 QD.Page v1.0.0
	 =================================

	 Infomation
	 ----------------------
	 Author : lipengyang
	 E-Mail : lipengyang@trs.com.cn
	 Date : 2004-01-24
	 Readme:分页效果

	 Example
	 ----------------------
	 pram1:	//分页数据URL
	 pram2:	//分页输入选择器
	 pram3:	//数据输入选择器
	 insertItem: //定义分页数据样式

	 QD.Page('data/data[n].xml','#page','#data');
	 function insertItem(data) {
	 return "<li><a href=\""+$(data).attr('url')+"\" title=\""+$(data).attr('title')+"\" target=\"_blank\">"+$(data).text()+"</a></li>";
	 }

	 Supported in Internet Explorer, Mozilla Firefox
	 */
	

