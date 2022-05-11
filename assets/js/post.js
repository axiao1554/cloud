$(function(){var $body=document.body,$process=document.getElementById("process"),$ajaxImgs=document.querySelectorAll(".img-ajax"),$commentsCounter=document.getElementById("comments-count"),$gitcomment=document.getElementById("gitcomment"),$toc=document.getElementById("article-toc"),timer=null;function imgsAjax($targetEles){if(!$targetEles){return}var _length=$targetEles.length;if(_length>0){var scrollBottom=getScrollTop()+window.innerHeight;for(var i=0;i<_length;i++){(function(index){var $this=$targetEles[index];var $this_offsetZero=$this.getBoundingClientRect().top+window.pageYOffset-document.documentElement.clientTop;if(scrollBottom>=$this_offsetZero&&$this.getAttribute("data-src")&&$this.getAttribute("data-src").length>0){if($this.nodeName.toLowerCase()==="img"){$this.src=$this.getAttribute("data-src");$this.style.display="block"}else{var imgObj=new Image();imgObj.onload=function(){$this.innerHTML=""};imgObj.src=$this.getAttribute("data-src");$this.style.backgroundImage="url("+$this.getAttribute("data-src")+")"}$this.removeAttribute("data-src")}})(i)}}}function getScrollTop(){return $body.scrollTop||document.documentElement.scrollTop}var scrollCallback=function(){if($process){$process.style.width=(getScrollTop()/($body.scrollHeight-window.innerHeight))*100+"%"}imgsAjax($ajaxImgs)};scrollCallback();window.addEventListener("scroll",function(){if($toc){var top=$toc.offsetTop;var left=$toc.offsetLeft;var width=$toc.offsetWidth;if(getScrollTop()<=top-60){$toc.style=""}else{$toc.style.position="fixed";$toc.style.top="75px";$toc.style.left=left+"px";$toc.style.width=width+"px"}}clearTimeout(timer);timer=setTimeout(function fn(){scrollCallback()},200)});function createImgEventFullScreen(){var imgs=$(".post-body").find("img");for(var i=0;i<imgs.length;i++){imgs[i].onclick=function(e){var src=e.srcElement.currentSrc;var _this=$(this);createCover(src,_this)}}function createCover(src,_this){var cover=$("<div id='outerDiv'  style='position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);z-index:5;width:100%;height:100%;display:none;'><div id='innerDiv' style='position:absolute;'><img  id='bigImg' style='border:5px solid #fff;' src=''/></div></div>");$("#outerDiv").remove();$("body").append(cover);imgShow("#outerDiv","#innerDiv","#bigImg",_this,src)}}function imgShow(outerDiv,innerDiv,bigImg,_this,src){$(bigImg).attr("src",src);$("<img/>").attr("src",src).load(function(){var windowW=$(window).width();var windowH=$(window).height();var realWidth=this.width;var realHeight=this.height;var imgWidth,imgHeight;var scale=0.8;if(realHeight>windowH*scale){imgHeight=windowH*scale;imgWidth=imgHeight/realHeight*realWidth;if(imgWidth>windowW*scale){imgWidth=windowW*scale}}else{if(realWidth>windowW*scale){imgWidth=windowW*scale;imgHeight=imgWidth/realWidth*realHeight}else{imgWidth=realWidth;imgHeight=realHeight}}$(bigImg).css("width",imgWidth);var w=(windowW-imgWidth)/2;var h=(windowH-imgHeight)/2;$(innerDiv).css({"top":h,"left":w});$(outerDiv).fadeIn("fast")});$(outerDiv).click(function(){$(this).fadeOut("fast")})}setTimeout(function(){createImgEventFullScreen()},1000);$(".highlight").not(".gist .highlight").each(function(b,c){var a=$("<div>").addClass("highlight-wrap");$(c).after(a);a.append($("<button>").addClass("copy-btn").append("复制").on("click",function(k){var j=$(this).parent().find(".code").find(".line").map(function(l,m){return $(m).text()}).toArray().join("\n");var f=document.createElement("textarea");var i=window.pageYOffset||document.documentElement.scrollTop;f.style.top=i+"px";f.style.position="absolute";f.style.opacity="0";f.readOnly=true;f.value=j;document.body.appendChild(f);const h=document.getSelection();const g=h.rangeCount>0?h.getRangeAt(0):false;f.select();f.setSelectionRange(0,j.length);f.readOnly=false;var d=document.execCommand("copy");if(d){$(this).text("复制成功")}else{$(this).text("复制失败")}f.blur();$(this).blur();if(g){h.removeAllRanges();h.addRange(g)}})).on("mouseleave",function(f){var d=$(this).find(".copy-btn");setTimeout(function(){d.text("复制")},300)}).append(c)})});