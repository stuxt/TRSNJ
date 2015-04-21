/**
* trs web 1.0 // 2012.04.28 // jQuery 1.1.2+
* <http://www.magic0115.com>
* 
* @author    maigc < shao.guangqi@trs.com.cn>
*/
(function($){
	/**
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
	
	/**
	*	scroll compoments
	*  	example var options = {direction:'down'}
	*	$('[rel=rollPannel]').scroll(options);
	*	@param options {
	*		direction : 'left',
	*		speed  : 20, //数字越大速度越慢
	*		offset : 1
	*		}
	**/ 
	$.fn.scroll = function(cfg){
		var sroll = this;
		var option = {
			direction : 'left',
			speed  : 20, //数字越大速度越慢
			offset : 1
		};
		option = $.extend(option,$.fn.scroll.cfg || {});
		$.DIRECTION = {left:1,LEFT:1,RIGHT:2,right:2,UP:4,up:4,DOWN:5,down:5};
		var oh = sroll.height(),ow = sroll.width();
		//alert(option.speed);
		cfg = $.extend({},option,cfg);
		//alert(cfg.speed);
		with(cfg){
			var d = $.DIRECTION[direction] || $.DIRECTION['left'] ;  
			cfg.w = cfg.width || ow;
			cfg.h = cfg.height ||  oh;
			cfg.width = d > 3 ? ow : 2 *  ow;
			cfg.height = d < 3 ? oh : 2 * oh;
			var marqueeWraperHtml = '<div rel=marqueeWraper style=" float: left;width:'+(w)+'px;height:'+ (h) +'px; position:relative;overflow:hidden;line-height:'+sroll.css('line-height')+'"></div>';
			var marqueeFrmHtml = '<div rel=marqueeFrm style="width:'+(width)+'px;height:'+height+'px;line-height:'+sroll.css('line-height')+'"></div>';
			var marqueeElmHtml = '<div rel=marqueeElm style="width:'+(ow)+'px;height:'+(oh)+'px; float:left;line-height:'+sroll.css('line-height')+'"></div>';
		}
		
		sroll.wrap(marqueeElmHtml);
		var marqueeElm = sroll.parent("div[rel=marqueeElm]");
		marqueeElm.wrap(marqueeFrmHtml);
		var marqueeFrm = marqueeElm.parent("div[rel=marqueeFrm]");
		var marqueeElm_clone = marqueeElm.clone();
		marqueeFrm.append(marqueeElm_clone);
		marqueeFrm.wrap(marqueeWraperHtml);
		var marqueeWraper = marqueeFrm.parent("div[rel=marqueeWraper]");
		
			function MarqueeLeft(){
				if(marqueeWraper.scrollLeft()>=marqueeElm.width())
					marqueeWraper.scrollLeft(0); 
				else{
					marqueeWraper.scrollLeft(marqueeWraper.scrollLeft()+ cfg.offset);
				}
			}
			function MarqueeRight(){
				if(marqueeWraper.scrollLeft() == 0 )
					marqueeWraper.scrollLeft(marqueeElm.width()); 
				else{
					marqueeWraper.scrollLeft(marqueeWraper.scrollLeft() - cfg.offset);
				}
			}
			function MarqueeUp(){
				if(marqueeWraper.scrollTop()>=marqueeElm.height())
					marqueeWraper.scrollTop(0); 
				else{
					marqueeWraper.scrollTop(marqueeWraper.scrollTop()+ cfg.offset);
				}
			}
			function MarqueeDown(){
				if(marqueeWraper.scrollTop() == 0 )
					marqueeWraper.scrollTop(marqueeElm.height()); 
				else{
					marqueeWraper.scrollTop(marqueeWraper.scrollTop()- cfg.offset);
				}
			}
			
			var MarQueeFun = {
				right : MarqueeRight,
				left : MarqueeLeft,
				up : MarqueeUp,
				down : MarqueeDown
			};
		
		with(cfg){
			var curFun = MarQueeFun[direction];
			var MyMar=setInterval(curFun,speed);
			marqueeWraper.mouseover(function() {clearInterval(MyMar)});
			marqueeWraper.mouseout(function() {MyMar=setInterval(curFun,speed)});
		}
		
	};
	
	/**
	*	then hover element and change it's style class
	*	example $('[rel=chnlList] li').hoverClass('content2_left1li1','content2_left1li2');
	*	@param overClass	//css class when over 
	*	@param outClass	//css class when out
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
	$.fn.link = function(selector){
		$(this).eq(0).data("linkObj",$(selector))
		return this;	
	}
	$.fn.cascadeClass = function(overClass,outClass,eventName){
		var linkObjs = $(this).eq(0).data("linkObj");
		if(linkObjs && eventName){
			var curObjs = $(this);
			curObjs[eventName](function(){
				var curObj = $(this);
				var at = curObjs.index(curObj);
				var curLinkObj = linkObjs.eq(at)
				var otherLinkObjs = linkObjs.not(curLinkObj);
				curLinkObj.removeClass(outClass).addClass(overClass);
				otherLinkObjs.removeClass(overClass).addClass(outClass);
			});
		}
	}
	
	
	/**
	*	then over element and change it's style class
	*	example $('[rel=chnlList] li').overClass('content2_left1li1','content2_left1li2');
	*	@param overClass	//css class when over 
	*	@param outClass	//css class when out
	**/
	$.fn.overClass = function(overClass,outClass){
		var allObjs = $(this);
		$(this).css({cursor:'pointer'});
		$(this).hover(function(){
			$(this).removeClass(outClass).addClass(overClass);
			allObjs.not(this).removeClass(overClass).addClass(outClass);
		},function(){ });
	};
	
	
	/**
	*	flash 图片切换
	*	example use it in web html
	*	@warn it's nested a flash file that you could find it in it's package ${ROOT_PATH}images/flash01.swf 
	*	var pics = [],links = [],texts = [];
	*	<TRS_DOCUMENTS ID="chnlID" num=6 WHERE="wcmdocument.ATTACHPIC=1">
	*		pics.push('<TRS_APPENDIX  field=_recurl MODE=all INDEX=0 upload=true/>');
	*		links.push('<TRS_DOCUMENT field=_RECURL target=_blank/>');
	*		texts.push('<TRS_DOCUMENT field=doctitle autocolor=false autolink=false num=50/>');
	*	</TRS_DOCUMENTS>
	*	$('[rel=imgFlashContainer]').switchImg(flashCfg);
	*		@param	cfg{{
	*		pics	: pics ,//pic url
	*		links	:	links ,//doc url
	*		texts	:	texts,//title
	*		focus_width 	: 242 , //pic width
	*		focus_height	:	145 ,//pic height
	*		text_height	: 25//title height
	*	}}
	**/
	$.fn.switchImg = function(cfg){
		//参数处理
		with(cfg){
			cfg.pics = (pics||[]).join('|');
			cfg.links= (links||[]).join('|');
			cfg.texts= (texts||[]).join('|');
			cfg.data = 'pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+
				focus_width+'&borderheight='+focus_height+'&textheight='+text_height;
			cfg.swf_height	=	focus_height+text_height
		}
		var codebase = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
		var pluginspage = 'http://www.macromedia.com/go/getflashplayer';
		var objFlash = cfg.$root_path || './images/flash01.swf';
		var option = {
			codebase	: 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0',
			pluginspage	: pluginspage ,
			objFlash	: objFlash 
		};
		cfg = $.extend({},option,cfg);
		with(cfg){
			var picFlashHtml = ['<object ',
					'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+codebase+'" ',
					'width="'+ focus_width +'" height="'+ swf_height +'">',
					'<param name="allowScriptAccess" value="sameDomain">',
					'<param name="movie" value="'+objFlash+'">',
					'<param name="quality" value="high"><param name="bgcolor" value="#F0F0F0">',
					'<param name="menu" value="false"><param name=wmode value="opaque">',
					'<param name="FlashVars" value="'+data+'">',
					'<embed src="'+objFlash+'" wmode="opaque" ',
					'FlashVars="'+data+'" menu="false" bgcolor="#F0F0F0" quality="high" width="',
						focus_width +'" height="'+ swf_height ,
					'allowScriptAccess="sameDomain" ',
					'type="application/x-shockwave-flash" pluginspage="'+pluginspage+'" />',
			'</object>'];
		}
		var container = $(this);
		var picFlash = $(picFlashHtml.join(''));
		$('> img',container).replaceWith(picFlash);
		//$(picFlashHtml.join('')).appendTo(container);
	};
	/**
	*	delay execute a function
	*	example $.deplay(100,function(){console.info('hello')})
	*	@param int // int/ms  // time  1000ms = 1s
	*	@param callback	// function	//
	**/
	$.delay = function(int,callback){
		var ENV = this;
		ENV.callback = callback || new Function();
		ENV.arg = Array.prototype.slice.apply(arguments,[0,arguments.length]);
		ENV.timerid = window.setTimeout(function(){
			ENV.callback();
		},int);
		return ENV.timerid;
	}
	/**
	*	stop delay function
	*	example	$.$stop([timerid])
	*	@param timerid	//int	
	**/
	$.$stop = function(timerid){
		var ENV = this;
		var timerid = timerid || ENV.timerid;
		window.clearTimeout(timerid);
	}
	/**
	*	when you execute $.$stop and you could execute $.start() start it
	*	example $.start()
	**/
	$.start = function(){
		var ENV = this;
		$.delay.apply(null,ENV.arg);
	}
	/**
	*	like switchImg and it's nested a style file(trs_web.css) and same html section
	*	@html section
	*	<div class="outFrm">
	*		<div class="mainImgFrm">
	*		<a href="<TRS_Documents ID='图片新闻' NUM='1'><TRS_Document FIELD='_RECURL'/></TRS_Documents>" target="_blank">
	*			<img src="<TRS_Documents ID='图片新闻' NUM='1'>
	*					<TRS_Appendix mode=pic index=0 field='_recurl' upload='true' />
	*					</TRS_Documents>" width="313" height="200" />	
	*		</a>			
	*		</div>
	*		<ul class="sequence">
	*			<!-- data	-->                
	*			<TRS_Documents ID="图片新闻" NUM="5"  WHERE="wcmdocument.ATTACHPIC=1">
	*			<li class="num" img="<TRS_Appendix mode=pic index=0 field='_recurl' upload='true' />" 
	*				title="<TRS_Document field='doctitle' num=40 autolink=false autocolor=false />" 
	*				link="<TRS_Document field='_recurl'  />"><trs_rowno />
	*			</li>	
	*			</TRS_Documents>
	*		</ul>
	*		<span style="display:block;"><a href="#" name="title" target="_blank" class="title">新闻标题</a></span>            
	*	</div> 
	*	@param var cfg = {
	*		IMG_W:313,	//show img width
	*		IMG_H:200,	//how img height
	*		intrl0 : 1000,	//change one img used
	*		isfit : false,	//auto fit image size
	*		DELAY : 3000	//the time between two img switch
	*	};
	*	example	$("div[class=outFrm]").scrollIMG(cfg);
	**/
	$.fn.scrollIMG = function(config){
		//defults options
		var defaults = {
			IMG_W:313,//中间大图的宽
			IMG_H:200,//中间大图的搞
			intrl0 : 1000,
			showFn : "fadeIn",
			hideFn : "fadeOut",
			isfit : false,
			DELAY : 3000
		};
		var Q = this;
		Q.mainImgFrm = Q.find("div[class=mainImgFrm]");//大图
		Q.img =  Q.find("div[class=mainImgFrm] img");//大图
		Q.title =  Q.find("a[name=title]");//标题 
		Q.sequence = Q.find("ul[class=sequence] li");//数字序列
		$.extend(Q,config,defaults);
		
		with(Q){
			Q.SQ1 = sequence.eq(0);//获取第一个图片的信息
			Q.NUM = sequence.size();
			Q.css({position:'relative',padding:'0px',margin:'0px'});
			Q.width(IMG_W).height(IMG_H+27);
			Q.mainImgFrm.width(IMG_W).height(IMG_H+2).css({'line-height':IMG_H+2+"px"});
			img.width(IMG_W).height(IMG_H);
			img.changeImg = function changeImg(sq,callback){//改变大图
				var call = callback || new Function();
				with(Q){
					img[hideFn](intrl0,function(){//先消失再隐藏
						title.html(sq.attr("title"))//替换标题
						title.attr("href",sq.attr("link"));//替换链接
						title.attr("title",sq.attr("title"));//替换提示
						img.attr("src",sq.attr("img"));//替换图片地址
						//console.info(sq.attr("img"));
						sequence.not(sq).removeClass("over");//样式处理
						sq.addClass("over");//样式处理
						if(isfit) img.Fit(IMG_W,IMG_H,1000);//自适应大小
						img[showFn](intrl0,function(){call();});//显示
					});
					return img;
				}
			}
			Q.sequenceShow = function sequenceShow(at){//图片轮换
				//if(!jQuery.fx.off){}
					with(Q){
						var _at = at || 0;
						++_at;
						//console.info("at:="+at);
						$.delay.apply(Q,[DELAY,function(){
							img.changeImg(sequence.eq((_at%NUM)),function(){sequenceShow(_at)});
						}])
						//img.delay(DELAY).changeImg(sequence.eq((_at%NUM)),function(){sequenceShow(_at)});
					}
				
			}
			img.changeImg(Q.SQ1);
			if(sequence && sequence.size()<=1) return ;//小于一幅图片不干活
			
			//window.img = img;
			sequence.click(function(){//单击时出现
				jQuery.fx.off=true;
				//clearTimeout(timeid);
				$.$stop.apply(Q,[]);
				img.show();
				img.changeImg($(this));
				img.at = sequence.index(this);
				//console.info(at);
			}).hover(function(){//鼠标经过出现,出来时消失
				jQuery.fx.off=true;
				$.$stop.apply(Q,[]);
				img.show();
				img.changeImg($(this));
				img.at = sequence.index(this);
			},function(){
				jQuery.fx.off=false;
				$.start.apply(Q,[]);
				//Q.sequenceShow(img.at);
			});
			Q.sequenceShow();
		}
	};
		
})(jQuery);