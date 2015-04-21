
	/**
	* @author	 omi 	< yu.qian@trs.com.cn>
	*	翻页		createPageHTML
	*	<script>createPageHTML(${PAGE_COUNT}, ${PAGE_INDEX}, "${PAGE_NAME}", "${PAGE_EXT}")</script>
	**/ 	  
	function Turn(count,_sPageName, _sPageExt)
	{
		var aa=_sPageName,bb=_sPageExt,page=parseInt(document.getElementById("page").value)
		if(isNaN(page))page=1
		if(page<1)page=1
		if(page>count)page=count
		if(page==1)
			window.location.href=aa+'.'+bb
		else
			window.location.href=aa+'_'+(page-1)+'.'+bb
	}
	
	function createPageHTML(_nPageCount, _nCurrIndex, _sPageName, _sPageExt){
		if(_nPageCount == null || _nPageCount<=1){
			return;
		}
		document.write("<table align=center><tr><td align=center class=page_box>")
		document.write("每页9条，共有 "+_nPageCount+" 页，本页是第 "+(_nCurrIndex+1)+" 页    ");
		var nCurrIndex = _nCurrIndex || 0;
		if(nCurrIndex == 0)
		{
			document.write("首页&nbsp;");
			document.write("上一页&nbsp;");
			document.write("<a href=\""+_sPageName+"_" + (nCurrIndex+1) + "."+_sPageExt+"\">下一页</a>&nbsp;");
			document.write("<a href=\""+_sPageName+"_" + (_nPageCount-1) + "."+_sPageExt+"\">末页</a>&nbsp;");
	
		}
		else
		{
			if(nCurrIndex == _nPageCount-1)
			{
			document.write("<a href=\""+_sPageName+ "."+_sPageExt+"\">首页</a>&nbsp;");
			if(nCurrIndex==1)document.write("<a href=\""+_sPageName+ "."+_sPageExt+"\">上一页</a>&nbsp;");else{document.write("<a href=\""+_sPageName+"_" + (nCurrIndex-1) + "."+_sPageExt+"\">上一页</a>&nbsp;");}
			document.write("下一页&nbsp;");
			document.write("末页&nbsp;");
	
			}
			else
			{
			document.write("<a href=\""+_sPageName + "."+_sPageExt+"\">首页</a>&nbsp;");
			
			if(nCurrIndex==1)document.write("<a href=\""+_sPageName+ "."+_sPageExt+"\">上一页</a>&nbsp;");else{document.write("<a href=\""+_sPageName+"_" + (nCurrIndex-1) + "."+_sPageExt+"\">上一页</a>&nbsp;");}		
			document.write("<a href=\""+_sPageName+"_" + (nCurrIndex+1) + "."+_sPageExt+"\">下一页</a>&nbsp;");
			document.write("<a href=\""+_sPageName+"_" + (_nPageCount-1) + "."+_sPageExt+"\">末页</a>&nbsp;");
			}
		}
		document.write("跳转到<input name='page' type='text' size='3' /> 页<input type='button' name='Submit' value='go' onclick=\"Turn('"+_nPageCount+"','"+_sPageName+"','"+_sPageExt+"')\"\ />");
		document.write("</tr></table>");
	}
