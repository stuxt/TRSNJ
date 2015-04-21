(function($){
	/**
	* @author	 omi 	< yu.qian@trs.com.cn>
	*	simple tab switch
	*	example $("[rel=iTab]").tab('[rel=iPad]','content2_right2_1_1ulli1','content2_right2_1_1ulli2');
	*	@param padSelector //jquery selector
	*	@currClass	//	css class
	*	@otherClass // css class
	**/ 	  
	$.fn.tab = function(padSelector,currClass,otherClass,isClick){
		var tabs = $(this);
		tabs.css({cursor:'pointer'})
		var pads = $(padSelector);
		pads.not(':eq(0)').hide();
		function over(){
			var currTab = $(this);
			var at = tabs.index(currTab);
			var curPad = pads.eq(at);
			currTab.removeClass(otherClass).addClass(currClass);
			tabs.not(currTab).removeClass(currClass).addClass(otherClass);
			curPad.show();
			pads.not(curPad).hide();
		}
		if(tabs.size() ==  pads.size() ){
			if(isClick){
				tabs.click(over);
			}else{
				tabs.hover(over,function(){});
			}
		}
	}
})(jQuery);