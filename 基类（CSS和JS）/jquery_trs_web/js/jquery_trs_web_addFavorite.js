(function($){
	/**
	*	addFavorite	收藏本站代码	version 1.0
	*	example $('#fav').addFavorite('<trs_website field=SITEDESC/>','<trs_website field=_recurl urlisabs=true/>');
	*	@param siteDesc //		收藏标题 str
	*	@param siteDesc //		收藏地址 str
	**/ 
	$.fn.addFavorite = function(siteDesc, siteUrl) {
		return this.click(function() {
			try{
				window.external.addFavorite(siteUrl, siteDesc);
			}
			catch (e)
			{
				try{window.sidebar.addPanel(siteDesc, siteUrl, "");}
				catch (e){alert("请使用Ctrl+D将本页加入收藏夹！");}
			}
		});
	};
})(jQuery);