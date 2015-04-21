(function($){
	/**
	*	nav 导航条效果	version 1.1
	*	需要给导航条的每个导航添加ID属性，内容为栏目存放位置:
	*	<li id="ROOT_PATH" rel=nav1><a href="${ROOT_PATH}">网站首页</a></li>
    *	<li id="zzjg" rel=nav1><trs_channel id=组织机构>组织机构</trs_channel></li>
    *	<li id="gzdt" rel=nav1><trs_channel id=工作动态>工作动态</trs_channel></li>
	*	
	*	
	*	example $("[rel=nav1]").nav('dczd','hover','','hover'); 
	*	@sitePath	//	页面地址站点分割标识符
	*	@currClass	//	mouseOver状态 css class
	*	@otherClass	//	mouseOout状态 css class
	*	@navClass 	//  当前栏目定位 css class
	**/ 	  
	$.fn.nav = function(sitePath,currClass,otherClass,navClass){
		var tabs = $(this);
		tabs.css({cursor:'pointer'});
		var currUrl=window.location.href;
		var offset=currUrl.indexOf(sitePath);
		var keyWord=currUrl.substr(offset,currUrl.length);
		var chnlDataPath=keyWord.split("/")[1];
		tabs.removeClass();
		var i;
		for(i=tabs.size()-1;i>=0;i--){
			if(tabs[i].id == chnlDataPath){
				break;
			}
			if(i==0){
				break;
			}
		}
		$("#"+tabs[i].id).addClass(navClass);
		function over(){
			var currTab = $(this);
			currTab.removeClass(otherClass).addClass(currClass);
			tabs.not(currTab).removeClass(currClass).addClass(otherClass);
			$("#"+tabs[i].id).removeClass(otherClass).removeClass(currClass).addClass(navClass);
		}
		function out(){
			var curTab = $(this);
			tabs.removeClass(currClass).addClass(otherClass);
			$("#"+tabs[i].id).removeClass(otherClass).removeClass(currClass).addClass(navClass);
		}
		tabs.hover(over,out);
	}
})(jQuery);