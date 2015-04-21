(function($){
	/**
	*	then hover element and change it's style class
	*	example $('[rel=chnlList] li').hoverClass('content2_left1li1','content2_left1li2');
	*	@param overClass	//css class when over 
	*	@param outClass		//css class when out
	**/
	$.fn.hoverClass = function(overClass,outClass,onlyOver){
		$(this).css({cursor:'pointer'});
		var curObjs = $(this);
		var both = !(onlyOver || false); 
		
		both && $(this).hover(function(){
			var curObj = $(this);
			curObj.removeClass(outClass).addClass(overClass);
		},function(){
			var curObj = $(this);
			curObj.removeClass(overClass).addClass(outClass);
		});
		onlyOver && $(this).hover(function(){
			var curObj = $(this);
			var otherObjs = curObjs.not(curObj);
			curObj.removeClass(outClass).addClass(overClass);
			otherObjs.removeClass(overClass).addClass(outClass);
		},function(){});
	};
})(jQuery);