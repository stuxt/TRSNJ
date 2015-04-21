(function($){
	/**
	*	closeWin	关闭页面代码	version 1.0
	*	printWin	打印页面代码	version 1.0
	**/
	$.fn.closeWin = function() {
		return this.click(function() {
			window.open("","_self");
			top.opener=null;
			top.close();
		});
	};
	$.fn.printWin = function() {
		return this.click(function() {
			window.print();
		});
	};
})(jQuery);