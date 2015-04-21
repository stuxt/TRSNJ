(function($){
	/**
	*	keytip	文本框提示文字		version 1.0
	*	example $("#searchword").keytip('请输入关键字');
	*	@param valueText //		文本框文字 str
	**/ 	  
       $.fn.keytip = function(valueText){
            return this.each(function(){
              var obj = $(this);
              obj.click(function(){
                    if(obj.val() == valueText){
                        obj.val("");
                    }
              }).focusout(function(){
                  if(obj.val() == ""){
                      obj.val(valueText);
                  }
              });
            });
        };
})(jQuery);