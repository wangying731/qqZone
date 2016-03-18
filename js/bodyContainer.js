(function () {
  //基于内置类String.prototype扩展提取日期的方法
  String.prototype.myFormatTime = function myFormatTime() {
    var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?$/g, ary = [];
    this.replace(reg, function () {
      ary = [].slice.call(arguments, 1, 7);
    });
    var format = arguments[0] || "{0}-{1}-{2} {3}:{4}:{5}";
    var flag = arguments[1] || false;
    return format.replace(/{(\d+)}/g, function () {
      var val = ary[arguments[1]];
      if (flag) {//第二个参数为true，补零
        return val && val.length === 1 ? "0" + val : val;
      } else {
        return val;
      }
    });
  };
  var visitorDiv = document.getElementById("visitorsDiv");
  var hide = utils.getElementsByClass("visit-outer", visitorDiv)[0];
  visitorDiv.onmouseenter = function () {
    utils.addClass(this, "select");
    utils.removeClass(hide, "none");
  };
  visitorDiv.onmouseleave = function () {
    utils.removeClass(this, "select");
    utils.addClass(hide, "none");
  };
  hide.onclick = function () {
    utils.addClass(visitorDiv, "none");
    utils.addClass(hide, "none");
  };


  //修改头像部分
  var headAvatar = document.getElementById("head-avatar");
  var headEdit = utils.getElementsByClass("head-avatar-edit", headAvatar)[0];
  var avatarBg = utils.getElementsByClass("title-bg", headAvatar)[0];
  var avatarTitle = utils.getElementsByClass("avatar-edit-title", headAvatar)[0];
  var avatarDrop = utils.getElementsByClass("drop-down-arrow", headAvatar)[0];
  var avatarList = utils.getElementsByClass("avatar-edit-list", headAvatar)[0];
  headAvatar.onmouseenter = function () {
    utils.removeClass(avatarBg, "none");
    utils.removeClass(avatarTitle, "none");
  };
  headAvatar.onmouseleave = function () {
    utils.addClass(avatarBg, "none");
    utils.addClass(avatarTitle, "none");
    utils.addClass(avatarDrop, "none");
    utils.addClass(avatarList, "none");
  };
  headEdit.onmouseenter = function () {
    utils.removeClass(avatarDrop, "none");
    utils.removeClass(avatarList, "none");
  };
  headEdit.onmouseleave = function () {
    utils.addClass(avatarDrop, "none");
    utils.addClass(avatarList, "none");
  };


  var tabSwitch = document.getElementById("tab_switch");
  var tabAppSwitch = document.getElementById("tab_app_switch");
  showList(tabSwitch);
  showList(tabAppSwitch);
  /*显隐藏左部列表的函数
   * @param curEle:鼠标滑过curEle,则curEle的弟弟元素结点显示
   */
  function showList(curEle) {
    var hideList = utils.next(curEle), paddingTop = utils.getCss(hideList, "padding-top");
    var l = utils.children(hideList, "li").length, hideChild = utils.children(hideList, "li")[0];
    var childH = utils.getCss(hideChild, "height");
    var marginTop = utils.getCss(hideChild, "margin-top");
    var hideListH = l * (childH + marginTop) + marginTop + 2 * paddingTop;
    curEle.onmouseover = function () {
      utils.addClass(this, "none");
      utils.setCss(hideList, "height", 0);
      utils.removeClass(hideList, "none");
      animate(hideList, {height: hideListH}, 300, 3);
    };
  }

  //签到
  var sign = document.getElementById("signTime"), signWeek = utils.getElementsByClass("sign-week", sign)[0], signDate = utils.getElementsByClass("sign-day", sign)[0];
  var strWeek = new Date().getDay().toString(), aWeek = ["日", "一", "二", "三", "四", "五", "六"];
  strWeek = strWeek.replace(/^\d$/, function () {
    return ("周" + aWeek[arguments[0]]);
  });
  signWeek.innerHTML = strWeek;
  var curMonth = new Date().getMonth() + 1;
  curMonth = curMonth < 10 ? "0" + curMonth : curMonth;
  var curDate = new Date().getDate();
  signDate.innerHTML = curMonth + "." + curDate;


  var adventCon = document.getElementById("side-advent");
  bindAdvent();
  //左侧广告内容拼接
  function bindAdvent() {
    var ary = [];
    while (ary.length < 2) {
      var ran = Math.round(Math.random() * (adventData.length - 1));
      if (ary.indexOf(adventData[ran]) === -1) {
        ary.push(adventData[ran]);
      }
    }
    var str = "";
    for (var i = 0; i < ary.length; i++) {
      str += "<div class='advent-outer'><a href='javascript:;' class='btn-close'><i class='ui-icon icon-close'></i></a>      <div class='advent-inner'><h3 class='advent-title'>广告</h3><img src='" + ary[i].src + "' alt=''/><p class='ft'><a href='javascript:;'>" + ary[i].deco + "</a></p></div>  <div class='app-close none'><h3 class='advent-title'>广告</h3><p class='close-done'>广告已经关闭(<span class='timer'>8</span>s)</p><div class='why'><p>你认为该广告存在什么问题？</p><ul><li class='close-list'><label for='radio1'><input type='radio' data-reason='2201' class='radio'/><span class='js_type'>频繁出现</span></label></li><li class='close-list'><label for='radio1'><input type='radio' data-reason='2202' class='radio'><span class='_js_type'> 内容反感</span></label></li><li class='close-list'><label for='radio1'><input type='radio' data-reason='2203' class='radio'><span class='_js_type'> 与我无关</span></label></li><li class='close-list'><label for='radio1'><input type='radio' data-reason='2204' class='radio'><span class='_js_type'> 已购买</span></label></li><li class='close-list'><label for='radio1'><input type='radio' data-reason='2205' class='radio'><span class='_js_type'> 虚假广告</span></label></li></ul>    <div class='hz'><a href='javascript:;'><i class='icon-hz'><i></i></i>&nbsp;一键去广告</a></div></div></div><div class='advent-rules none'><h3 class='advent-title'>广告</h3><div class='shield'><p>感谢你的反馈！</p><a href='javascript:;'>了解广告屏蔽规则&gt;</a></div></div></div>"
    }
    str += "";
    adventCon.innerHTML = str;
  }

  //关闭广告
  closeAdvent();
  function closeAdvent() {
    var closeBtnList = utils.getElementsByClass("btn-close", adventCon);
    for (var i = 0; i < closeBtnList.length; i++) {
      (function (i) {
        var curBtn = closeBtnList[i];
        var outer = curBtn.parentNode, showList = outer.getElementsByTagName("div");
        var advertRules = utils.getElementsByClass("advent-rules", outer)[0];
        var advent = utils.getElementsByClass("advent-inner", outer)[0];
        var closeAdvent = utils.getElementsByClass("app-close", outer)[0];
        var timer = utils.getElementsByClass("timer", closeAdvent)[0];
        var autoTimer = null, beginNum = timer.innerHTML;
        curBtn.onclick = function () {
          utils.addClass(advent, "none");
          utils.addClass(curBtn, "none");
          utils.removeClass(closeAdvent, "none");
          autoTimer = window.setInterval(function () {
            beginNum--;
            if (beginNum <= 0) {
              window.clearInterval(autoTimer);
              utils.addClass(outer, "none");
              return;
            }
            timer.innerHTML = beginNum;
          }, 1000);
        };
        var labelList = outer.getElementsByTagName("label");
        for (i = 0; i < labelList.length; i++) {
          (function () {
            var cur = labelList[i];
            cur.onclick = function () {
              utils.removeClass(advertRules, "none");
              utils.addClass(closeAdvent, "none");
              window.setTimeout(function () {
                utils.addClass(advertRules, "none");
                utils.addClass(outer, "none");
              }, 1000);
            }
          })();
        }
      })(i);
    }

  }


  //加载热门话题
  var topicList = document.getElementById("topicList");
  var pageList = document.getElementById("pageList");
  var pagePrev = utils.getElementsByClass("prev", pageList)[0];
  var pageNext = utils.getElementsByClass("next", pageList)[0];
  var page = 1, count = 3, totalPage = Math.ceil(topic.length / count);
  bindPage(page, count);
  function bindPage(page, count) {
    var str = "";
    for (var i = (page - 1) * count; i <= page * count - 1; i++) {
      var cur = topic[i];
      if (i > topic.length - 1) {
        break;
      }
      str += "<li class='topic'>";
      str += "<a href='javascript:;' class='topic-pic'><img src=" + cur.src + " alt=''/></a>";
      str += "<div class='topic-main'><div class='topic-title'><p>" + cur.title + "</p></div>";
      str += "<div class='topic-op'><a href='javascript:;' class='topic-op-link'><i class='ui-icon " + cur.expression + "'></i><span>" + cur.text + "</span></a><span class='topic_op_num'>" + cur.num + "</span></div></div>";
      str += "</li>";
    }
    topicList.innerHTML = str;
    str = "";
  }

  pageList.onclick = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    if (utils.hasClass(tar, "prev") || utils.hasClass(tar.parentNode, "prev")) {
      if (page === 1) {
        return;
      }
      utils.removeClass(pageNext, "un-click");
      page--;
      if (page === 1) {
        utils.addClass(pagePrev, "un-click");
      }
      bindPage(page, count);

      return;
    }
    if (utils.hasClass(tar, "next") || utils.hasClass(tar.parentNode, "next")) {
      if (page === totalPage) {
        return;
      }
      utils.removeClass(pagePrev, "un-click");
      page++;
      if (page === totalPage) {
        utils.addClass(pageNext, "un-click");
      }
      bindPage(page, count);
      return;
    }

  };


  //右侧广告加载
  bindRightAdvent();
  function bindRightAdvent() {
    var rightAdvert = document.getElementById("rightAdvert");
    var ran = Math.round(Math.random() * (rightAdvertData.length - 1));
    var oImg = new Image;
    oImg.src = rightAdvertData[ran].src;
    if (oImg.flag) {
      return;
    }
    oImg.onload = function () {
      rightAdvert.src = oImg.src;
      this.flag = true;
    };
  }

  //访问好友
  var aVisitMe = friendsData.slice(1);
  aVisitMe.sort(function (a, b) {
    return new Date(b.time) - new Date(a.time);
  });
  var visMePage = 1, visYouPage = 1, friCount = 9, friTotalPage = Math.ceil(aVisitMe.length / friCount);
  var visitMe = document.getElementById("visitMe");
  bindRelFriends(visitMe, aVisitMe, visMePage, friCount);
  var aVisitYou = friendsData.slice(1);
  aVisitYou.sort(function (a, b) {
    return new Date(a.time) - new Date(b.time);
  });
  var visitYou = document.getElementById("visitYou");

  function bindRelFriends(curEle, array, page, count) {
    var str = "";
    for (var i = (page - 1) * count; i <= page * count - 1; i++) {
      var cur = array[i];
      if (i > array.length - 1) {
        break;
      }
      function getTime(time) {
        var curTime = new Date(), visitTime = null;
        var curYear = curTime.getFullYear(), curMonth = curTime.getMonth() + 1, curDate = curTime.getDate();
        var visitYear = Number(time.myFormatTime("{0}")), visitMonth = Number(time.myFormatTime("{1}")), visitDay = Number(time.myFormatTime("{2}"));
        visitTime = time.myFormatTime("{0}年{1}月");
        if (curYear === visitYear) {
          if (curMonth === visitMonth) {
            if (curDate - visitDay === 2) {
              visitTime = "前天";
            } else if (curDate - visitDay === 1) {
              visitTime = "昨天";
            } else {
              visitTime = time.myFormatTime("{1}月{2}日");
            }
          } else {
            visitTime = time.myFormatTime("{1}月{2}日");
          }
        }
        if (curYear === visitYear && curMonth === visitMonth && curDate === visitDay) {
          visitTime = time.myFormatTime("{4}:{5}", true);
        }
        return visitTime;
      }

      var visitTime = getTime(cur.time);
      var visitName = cur.markName || cur.tenName;
      str += "<li>";
      str += "<a class='avatar'> <img src='" + cur.src + "' alt=''><span class='name'>" + visitName + "</span></a><span class='date'>" + visitTime + "</span>";
      str += "</li>";
    }
    curEle.innerHTML = str;
    str = "";
  }

  var visitHd = document.getElementById("visitHd"), visitTitles = visitHd.getElementsByTagName("a");
  var visitBox = document.getElementById("visitBox"), visitList = utils.getElementsByClass("visitMe", visitBox);
  for (var i = 0; i < visitTitles.length; i++) {
    (function (i) {
      var cur = visitTitles[i];
      cur.onclick = function () {
        switch (i) {
          case 0:
          {
            utils.removeClass(visitPage, "none");
            visMePage === 1 ? utils.addClass(visitPrev, "un-click") : utils.removeClass(visitPrev, "un-click");
            visMePage === friTotalPage ? utils.addClass(visitNext, "un-click") : utils.removeClass(visitNext, "un-click");
            break;
          }
          case 1:
          {
            utils.removeClass(visitPage, "none");
            visYouPage === 1 ? utils.addClass(visitPrev, "un-click") : utils.removeClass(visitPrev, "un-click");
            visYouPage === friTotalPage ? utils.addClass(visitNext, "un-click") : utils.removeClass(visitNext, "un-click");
            break;
          }
          default :
          {
            utils.addClass(visitPage, "none");
          }
        }
        if (i === 1 && (!visitYou.flag)) {//第一次点击时才开始加载数据
          bindRelFriends(visitYou, aVisitYou, visYouPage, friCount);
          visitYou.flag = true;
        }
        for (var k = 0; k < visitTitles.length; k++) {
          utils.removeClass(visitTitles[k], "title");
          utils.addClass(visitList[k], "none");
        }
        utils.addClass(cur, "title");
        utils.removeClass(visitList[i], "none");
      }
    })(i);
  }

  var visitPage = document.getElementById("visitPage");
  var visitPrev = utils.getElementsByClass("prev", visitPage)[0];
  var visitNext = utils.getElementsByClass("next", visitPage)[0];
  visitPage.onclick = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    if (utils.hasClass(tar, "prev") || utils.hasClass(tar.parentNode, "prev")) {
      if (utils.hasClass(visitMe, "none")) {
        if (visYouPage === 1) {
          return;
        }
        utils.removeClass(visitNext, "un-click");
        visYouPage--;
        if (visYouPage === 1) {
          utils.addClass(visitPrev, "un-click");
        }
        bindRelFriends(visitYou, aVisitYou, visYouPage, friCount);
        return;
      }
      if (visMePage === 1) {
        return;
      }
      utils.removeClass(visitNext, "un-click");
      visMePage--;
      if (visMePage === 1) {
        utils.addClass(visitPrev, "un-click");
      }
      bindRelFriends(visitMe, aVisitMe, visMePage, friCount);
      return;
    }
    if (utils.hasClass(tar, "next") || utils.hasClass(tar.parentNode, "next")) {
      if (utils.hasClass(visitMe, "none")) {
        if (visYouPage === friTotalPage) {
          return;
        }
        utils.removeClass(visitPrev, "un-click");
        visYouPage++;
        if (visYouPage === friTotalPage) {
          utils.addClass(visitNext, "un-click");
        }
        bindRelFriends(visitYou, aVisitYou, visYouPage, friCount);
        return;
      }
      if (visMePage === friTotalPage) {
        return;
      }
      utils.removeClass(visitPrev, "un-click");
      visMePage++;
      if (visMePage === friTotalPage) {
        utils.addClass(visitNext, "un-click");
      }
      bindRelFriends(visitMe, aVisitMe, visMePage, friCount);
    }
  };


  //回到顶部
  var goTop = document.getElementById("go-top");
  var goTopBtn = utils.getElementsByClass("go-top-btn", goTop)[0];
  var btnIcon = utils.getElementsByClass("go-top-icon", goTop)[0];
  var btnText = utils.getElementsByClass("go-top-text", goTop)[0];
  goTopBtn.onmouseenter = function () {
    btnIcon.style.display = "none";
    btnText.style.display = "inline-block";
  };
  goTopBtn.onmouseleave = function () {
    btnIcon.style.display = "block";
    btnText.style.display = "none";
  };
  goTopBtn.onclick = function () {
    var target = document.documentElement.scrollTop || document.body.scrollTop;
    var duration = 1000, interval = 10, step = (target / duration) * interval;
    var timer = window.setInterval(function () {
      if (target <= 0) {
        window.clearInterval(timer);
        return;
      }
      target -= step;
      document.documentElement.scrollTop = target;
      document.body.scrollTop = target;
    }, interval);

  };

})();


//main container  poster
(function () {
  //热门话题图片
  var hotBar = document.getElementById("hot-bar");
  hotBar.onclick = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    if (tar.className === "close-x") {
      utils.addClass(this, "none");
    }
  };
  //发表状态框
  var iniContent = document.getElementById("initial-content");
  var content = document.getElementById("content");
  var qzEmotion = document.getElementById("qz-emotion");
  var emClose = utils.getElementsByClass("close", qzEmotion)[0];
  document.body.onclick = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    if (tar.id === "content"){
      if(content.innerHTML===""){
        return;
      }
      if (utils.hasClass(posterFt, "none")) {
        posterFtH = utils.getCss(posterFt, "height");
        utils.setCss(posterFt, "height", 0);
        utils.removeClass(posterFt, "none");
        animate(posterFt, {height: posterFtH}, 250, function () {
          utils.setCss(posterFt, "height", posterFtH);
          utils.setCss(posterFt, "overflow","visible");
        });
      }
      return;
    }
    if (tar.id === "initial-content") {
      utils.addClass(iniContent, "none");
      utils.removeClass(content, "none");
      content.focus();
      if (utils.hasClass(posterFt, "none")) {
        posterFtH = utils.getCss(posterFt, "height");
        utils.setCss(posterFt, "height", 0);
        utils.removeClass(posterFt, "none");
        animate(posterFt, {height: posterFtH}, 250, function () {
          utils.setCss(posterFt, "height", posterFtH);
          utils.setCss(posterFt, "overflow","visible");
        });
      }
      return;
    }
    if (tar.id === "qz-poster-ft") {
      if (emot.flag) {
        utils.addClass(qzEmotion, "none");
        emot.flag = false;
      }
      if (utils.hasClass(iniContent, "none")&&content.innerHTML==="") {
        utils.removeClass(iniContent, "none");
        utils.addClass(content, "none");
      }
      return;
    }
    if (utils.hasClass(tar, "icon-emot")) {
      if (emot.flag) {
        utils.addClass(qzEmotion, "none");
        emot.flag = false;
        return;
      }
      emot.flag = true;
      utils.removeClass(qzEmotion, "none");
      return;
    }
    if(tar.className==="close"){
      utils.addClass(qzEmotion, "none");
      emot.flag = false;
      return;
    }
    if(tar.className==="background-container"||tar.className==="col-main"){
      if (utils.hasClass(iniContent, "none")&&content.innerHTML==="") {
        utils.removeClass(iniContent, "none");
        utils.addClass(content, "none");
      }
      if (!utils.hasClass(posterFt, "none")) {
        utils.setCss(posterFt, "overflow","hidden");
        animate(posterFt, {height: 0}, 250, function () {
          utils.addClass(posterFt, "none");
          utils.setCss(posterFt, "height", posterFtH);
        });
      }
      if (emot.flag) {
        utils.addClass(qzEmotion, "none");
        emot.flag = false;
      }
    }
  };




  var inputSide = document.getElementById("qz-input-side"), inputAtt = utils.getElementsByClass("attach", inputSide)[0], inputAttList = utils.getElementsByClass("attach-item", inputAtt), inputAttBgList = inputAtt.getElementsByTagName("a");
  var inputDrops = utils.getElementsByClass("poster-drop-down", inputSide);
  for (var i = 0; i < inputAttList.length; i++) {
    inputAttList[i].index = i;
    inputAttList[i].onmouseenter = function () {
      for (var k = 0; k < inputDrops.length; k++) {
        utils.addClass(inputDrops[k], "none");
        utils.removeClass(inputAttBgList[k], "hover");
      }
      utils.addClass(inputAttBgList[this.index], "hover");
      utils.removeClass(inputDrops[this.index], "none");
    };
  }
  inputSide.onmouseleave = function () {
    for (var i = 0; i < inputDrops.length; i++) {
      utils.removeClass(inputAttBgList[i], "hover");
      utils.addClass(inputDrops[i], "none");
    }
  };


  var posterFt = document.getElementById("qz-poster-ft"), posterFtH = null;
  var emot = utils.getElementsByClass("icon-emot", posterFt)[0];
  var audienceSetting = utils.getElementsByClass("audience", posterFt)[0], audienceText = audienceSetting.getElementsByTagName("span")[0];
  var audienceDrop = utils.getElementsByClass("set-audience-drop", posterFt)[0], audienceList = audienceDrop.getElementsByTagName("li");
  audienceSetting.onmouseenter = function (e) {
    utils.removeClass(audienceDrop, "none");
  };
  audienceSetting.onmouseleave = function () {
    audienceDrop.timer = window.setTimeout(function () {
      utils.addClass(audienceDrop, "none");
    }, 500);
  };
  audienceDrop.onmouseenter = function (e) {
    window.clearTimeout(audienceDrop.timer);
    utils.removeClass(audienceDrop, "none");
  };
  audienceDrop.onmouseleave = function (e) {
    utils.addClass(audienceDrop, "none");
  };
  for (i = 0; i < audienceList.length; i++) {
    (function (i) {
      var cur = audienceList[i];
      cur.onclick = function () {
        var curAdu = utils.getElementsByClass("icon-text", cur)[0];
        audienceText.innerHTML = curAdu.innerHTML;
        utils.addClass(audienceDrop, "none");
        for (var k = 0; k < audienceList.length; k++) {
          var curText = utils.getElementsByClass("icon-text", audienceList[k])[0];
          k === i ? utils.addClass(curText, "on") : utils.removeClass(curText, "on");
        }

      }
    })(i);
  }


  var emotionList = document.getElementById("emotion-list");
  bindEm(emotionList);
  function bindEm(curEle) {
    var str = "";
    for (var i = 0; i < emjoyData.length; i++) {
      var cur = emjoyData[i];
      str += "<li>";
      str += "<a  href='javascript:;' urlId=" + cur.id + " emName=" + cur.name + "></a>";
      str += "</li>";
    }
    curEle.innerHTML = str;
    str = "";
  }

  var oEms = emotionList.getElementsByTagName("li");
  var emotionPreview = document.getElementById("emotion-preview-default");
  var previewImg = emotionPreview.getElementsByTagName("img")[0];
  var previewSpan = emotionPreview.getElementsByTagName("span")[0];
  var trueImg = null, trueDesc = null;
  var sUrl = "http://cn.qzonestyle.gtimg.cn/qzone/em/e";
  emotionList.onmouseleave = function () {
    utils.addClass(emotionPreview, "none");
    emotionPreview.flag = false;
  };
  for (i = 0; i < oEms.length; i++) {
    (function (i) {
      var cur = oEms[i];
      cur.onmouseenter = function () {
        if (!emotionPreview.flag) {
          utils.removeClass(emotionPreview, "none");
          emotionPreview.flag = true;
        }
        var staticEm = cur.getElementsByTagName("a")[0];
        trueImg = staticEm.getAttribute("urlId");
        trueDesc = staticEm.getAttribute("emName");
        previewImg.src = sUrl + trueImg + ".gif";
        previewSpan.innerHTML = trueDesc;
        var nId = Number(trueImg);
        if ((100 <= nId && nId <= 103) || (115 <= nId && nId <= 118) || (130 <= nId && nId <= 133)) {
          utils.addClass(emotionPreview, "right");
        } else {
          utils.removeClass(emotionPreview, "right");
        }
      };
      cur.onclick=function(){//content.focus();
        content.innerHTML+="<img class='input-emoticon' src="+previewImg.src+" alt=''/>";
        utils.addClass(qzEmotion, "none");
        emot.flag = false;
        return;
      }
    })(i);
  }

})();