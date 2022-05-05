/*!========================================================================
 *  hexo-theme-snippet: app.js v1.0.0
 * ======================================================================== */
$(function(){
  var $body = document.body,
    $process = document.getElementById("process"), //进度条
    $ajaxImgs = document.querySelectorAll(".img-ajax"), //首页图片懒加载
    $commentsCounter = document.getElementById("comments-count"),
    $gitcomment = document.getElementById("gitcomment"),
    $toc = document.getElementById("article-toc"),
    timer = null;

  //首页文章图片懒加载
  function imgsAjax($targetEles) {
    if (!$targetEles) return;
    var _length = $targetEles.length;
    if (_length > 0) {
      var scrollBottom = getScrollTop() + window.innerHeight;
      for (var i = 0; i < _length; i++) {
        (function (index) {
          var $this = $targetEles[index];
          var $this_offsetZero =
            $this.getBoundingClientRect().top +
            window.pageYOffset -
            document.documentElement.clientTop;
          if (
            scrollBottom >= $this_offsetZero &&
            $this.getAttribute("data-src") &&
            $this.getAttribute("data-src").length > 0
          ) {
            if ($this.nodeName.toLowerCase() === "img") {
              $this.src = $this.getAttribute("data-src");
              $this.style.display = "block";
            } else {
              var imgObj = new Image();
              imgObj.onload = function () {
                $this.innerHTML = "";
              };
              imgObj.src = $this.getAttribute("data-src");
              $this.style.backgroundImage =
                "url(" + $this.getAttribute("data-src") + ")";
            }
            $this.removeAttribute("data-src"); //为了优化，移除
          }
        })(i);
      }
    }
  }

  //获取滚动高度
  function getScrollTop() {
    return $body.scrollTop || document.documentElement.scrollTop;
  }
  //滚动回调
  var scrollCallback = function () {
    if ($process) {
      $process.style.width =
        (getScrollTop() / ($body.scrollHeight - window.innerHeight)) * 100 +
        "%";
    }
    imgsAjax($ajaxImgs);
  };
  scrollCallback();

  //文章目录/监听滚动事件
  window.addEventListener("scroll", function () {
    if ($toc) {
      var top = $toc.offsetTop;
      var left = $toc.offsetLeft;
      var width = $toc.offsetWidth;
      if (getScrollTop() <= top-60) {
        $toc.style = "";
      } else {
        $toc.style.position = "fixed";
        $toc.style.top = "65px";
        $toc.style.left = left + "px";
        $toc.style.width = width + "px";
      }
    }
    clearTimeout(timer);
    timer = setTimeout(function fn() {
      scrollCallback();
    }, 200);
  });

  // 文章中图片点击放大
  function createImgEventFullScreen() {
      var imgs = $(".post-body").find("img");
      // console.log(imgs);
      for (var i = 0; i < imgs.length; i++) {
          // $(imgs[i]).click(createCover(imgs[i]));
          imgs[i].onclick = function (e) {
              var src = e.srcElement.currentSrc;
              var _this = $(this);
              // console.log(_this);
              createCover(src,_this);
          }
      }
      function createCover(src,_this) {
          // console.log(_this);
          // console.log(src);
          var cover = $("<div id='outerDiv'  style='position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);z-index:5;width:100%;height:100%;display:none;'><div id='innerDiv' style='position:absolute;'><img  id='bigImg' style='border:5px solid #fff;' src=''/></div></div>");
          $("#outerDiv").remove();
          $("body").append(cover);
          imgShow("#outerDiv", "#innerDiv", "#bigImg", _this,src);

      }
  }
  function imgShow(outerDiv, innerDiv, bigImg, _this,src) {
    //var src = _this.attr("src"); //获取当前点击的common-img元素中的src属性
    $(bigImg).attr("src", src); //设置#bigImg元素的src属性

    /*获取当前点击图片的真实大小，并显示弹出层及大图*/
    $("<img/>").attr("src", src).load(function () {
        var windowW = $(window).width(); //获取当前窗口宽度
        var windowH = $(window).height(); //获取当前窗口高度
        var realWidth = this.width; //获取图片真实宽度
        var realHeight = this.height; //获取图片真实高度
        var imgWidth, imgHeight;
        var scale = 0.8; //缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

        if (realHeight > windowH * scale) { //判断图片高度
            imgHeight = windowH * scale; //如大于窗口高度，图片高度进行缩放
            imgWidth = imgHeight / realHeight * realWidth; //等比例缩放宽度
            if (imgWidth > windowW * scale) { //如宽度仍大于窗口宽度
                imgWidth = windowW * scale; //再对宽度进行缩放
            }
        } else if (realWidth > windowW * scale) { //如图片高度合适，判断图片宽度
            imgWidth = windowW * scale; //如大于窗口宽度，图片宽度进行缩放
            imgHeight = imgWidth / realWidth * realHeight; //等比例缩放高度
        } else { //如果图片真实高度和宽度都符合要求，高宽不变
            imgWidth = realWidth;
            imgHeight = realHeight;
        }
        $(bigImg).css("width", imgWidth); //以最终的宽度对图片缩放
        var w = (windowW - imgWidth) / 2; //计算图片与窗口左边距
        var h = (windowH - imgHeight) / 2; //计算图片与窗口上边距
        $(innerDiv).css({ "top": h, "left": w }); //设置#innerDiv的top和left属性
        //console.log('****')
        $(outerDiv).fadeIn("fast"); //淡入显示#outerDiv
    });

    $(outerDiv).click(function () { //再次点击淡出消失弹出层
        $(this).fadeOut("fast");
    });
  }
  setTimeout(function () {
      createImgEventFullScreen();
  }, 1000)

  //复制代码
  $(".highlight").not(".gist .highlight").each(function(b, c) {
    var a = $("<div>").addClass("highlight-wrap");
    $(c).after(a);
    a.append($("<button>").addClass("copy-btn").append("复制").on("click",
    function(k) {
        var j = $(this).parent().find(".code").find(".line").map(function(l, m) {
            return $(m).text()
        }).toArray().join("\n");
        var f = document.createElement("textarea");
        var i = window.pageYOffset || document.documentElement.scrollTop;
        f.style.top = i + "px";
        f.style.position = "absolute";
        f.style.opacity = "0";
        f.readOnly = true;
        f.value = j;
        document.body.appendChild(f);
        const h = document.getSelection();
        const g = h.rangeCount > 0 ? h.getRangeAt(0) : false;
        f.select();
        f.setSelectionRange(0, j.length);
        f.readOnly = false;
        var d = document.execCommand("copy");
        if (d) {
            $(this).text("复制成功")
        } else {
            $(this).text("复制失败")
        }
        f.blur();
        $(this).blur();
        if (g) {
            h.removeAllRanges();
            h.addRange(g)
        }
    })).on("mouseleave",
    function(f) {
        var d = $(this).find(".copy-btn");
        setTimeout(function() {
            d.text("复制")
        },
        300)
    }).append(c)
  });
})
