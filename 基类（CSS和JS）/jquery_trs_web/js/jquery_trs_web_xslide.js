(function($){
	/**
	*	xslide 手风琴效果	version 1.0
	*	example $("[rel=xslide1]").xslide('[rel=xslidetab1]','[rel=xslidepad1]','hover','','true'); 
	*	@param slideSelector 	//切换标签层jquery selector
	*	@param padSelector 		//手风琴弹出层jquery selector
	*	@currClass				//切换标签层命中css class
	*	@otherClass 			//切换标签层未命中css class
	*	@isClick 				//true：click		false或空：hover
	**/ 
	
	$.fn.xslide = function(slideSelector,padSelector,currClass,otherClass,isClick){
		var tabs = $(this);
		tabs.css({cursor:'pointer'});
		var pads = $(padSelector);
		pads.not(':eq(0)').hide();
		var slides = $(slideSelector);
		function over2(){
			var currTab = $(this);
			var at = tabs.index(currTab);
			var curPad = pads.eq(at);
			currTab.removeClass(otherClass).addClass(currClass);
			tabs.not(currTab).removeClass(currClass).addClass(otherClass);
			curPad.slideDown('slow');
			pads.not(curPad).slideUp('slow');
		}
		if(tabs.size() ==  pads.size() ){
			if(isClick){
				tabs.click(over2);
			}else{
				tabs.hover(over2,function(){});
			}
		}
	}
})(jQuery);