(function () {
  var topCon = document.getElementById("top-container");
  var topNav = document.getElementById("top-nav");
  var topNavList = utils.children(topNav, "li");
  for (var i = 0; i < topNavList.length; i++) {
    topNavList[i].flag = (i === 0 ? 1 : 0);
    (function (i) {
      var curLi = topNavList[i];
      var oDivList = utils.children(curLi, "div"), drop = oDivList[1];
      drop ? drop.curH = utils.getCss(drop, "height") : null;
      var inner = oDivList[0].getElementsByTagName("a")[0];
      var iList = inner.getElementsByTagName("i");
      var topNavTimer = null;
      curLi.onmouseenter = function (e) {
        utils.addClass(inner, "hover");
        if (drop) {
          topNavTimer = window.setTimeout(changeBg, 300);
          function changeBg() {
            utils.removeClass(inner, "hover");
            utils.addClass(inner, "stop");
            utils.addClass(iList[0], "nav-over-" + i);
            utils.setCss(utils.next(iList[0]), "color", "#303030");
            utils.setCss(iList[1], "color", "#303030");
            utils.setCss(drop, "height", 0);
            drop.style.display = "block";
            animate(drop, {height: drop.curH}, 150, 1);
          }
        }
      };
      curLi.onmouseleave = function () {
        window.clearTimeout(topNavTimer);
        utils.removeClass(inner, "hover");
        utils.removeClass(inner, "stop");
        if (this.flag) {
          utils.addClass(inner, "selectBg");
        }
        if (drop) {
          utils.removeClass(iList[0], "nav-over-" + i);
          utils.setCss(utils.next(iList[0]), "color", "#fff");
          utils.setCss(iList[1], "color", "#fff");
          //remainDiv=oDivList[1];
          animate(drop, {height: 0}, 200, function () {
            utils.setCss(drop, "height", drop.curH);
            drop.style.display = "none";
          });
        }
      };
      curLi.onclick = function () {
        for (var k = 0; k < topNavList.length; k++) {
          var cur = topNavList[k];
          cur.flag = (k === i ? 1 : 0);
          var curInner = cur.getElementsByTagName("a")[0];
          utils.removeClass(curInner, "selectBg");
        }
      }
    })(i);
  }
})();


//好友
(function () {
  //好友按照访问时间排序
  var uFriends = document.getElementById("main-friends-list");
  var ary = friendsData.slice(1);
  ary.sort(function (a, b) {
    return new Date(b.time) - new Date(a.time);
  });
  var oldCounts = friendsData[0].count, nowCounts = friendsData.length - 1, moreCounts = nowCounts - oldCounts;
  var innerFt = document.getElementById("friends-inner-ft");
  var newFriends = innerFt.getElementsByTagName("span")[0];
  if (moreCounts > 0) {
    newFriends.innerHTML = moreCounts;
    innerFt.style.display = "block";
  }
  var tbFriend = document.getElementById("tb_friend_li");
  var newFriendsNum = utils.getElementsByClass("new-friends-num", tbFriend)[0];
  innerFt.onclick = function () {
    friendsData[0].count = nowCounts;
    innerFt.style.display = "none";
    newFriendsNum.style.display = "none";
  };
  var count = 8;//只显示最近联系过的8个好友
  bindFriends();
  function bindFriends() {
    var str = "";
    for (var i = 0; i < count; i++) {
      ary[i].visitTimes = (ary[i].visitTimes === 0 ? "你新添加的好友" : "你最近看过的好友");
      ary[i].markName = ary[i].markName || ary[i].tenName;
      //li><a class="pic"><img src="img/friends.jpg" alt="xxx的头像"title="你最近看过的好友"><span class="name">xxx</span></a>         <a class="number" href="#" target="_blank"><i class="top-nav-icon icon-relation"></i>60</a></li>
      str += "<li><a class='pic'><img src=" + ary[i].src + " alt=''" + ary[i].markName + "的头像 title=" + ary[i].visitTimes + "><span class='name'>" + ary[i].markName + "</span></a><a class='number' href='javascript:;'><i class='top-nav-icon icon-relation'></i>" + ary[i].relation + "</a></li>";
    }
    uFriends.innerHTML = str;
    str = null;
    ary = null;
  }

  //点击头像完成一次互动，修改time:"2011/12/5/ 12:23:20"排位提升,需要实现数据交互


  //"应用"数据绑定 5个使用过的应用+4个未使用的+5个推荐的+更多应用
  var friendsCounts = friendsData.length;
  var uAppStore = document.getElementById("appStore-list");
  bindAppStore();
  // <li><a class="icon-wrapper" href="javascript:;"><img src="img/appStore/3.png"/></a>
  //<a class="app-name"href="javascript:;">QQ农场</a><a class="del-btn" href="javascript:" title="删除该应用">×</a></li>
  var appList = uAppStore.getElementsByTagName("li");

  function bindAppStore() {
    var ary = [], str = "";
    while (ary.length < 5) {
      var ran = Math.round(Math.random() * (aAppStore.length - 2) + 1);
      if (ary.indexOf(aAppStore[ran]) === -1 && aAppStore[ran].playTimes > 0) {
        ary.push(aAppStore[ran]);
      }
    }
    for (var i = 0; i < ary.length; i++) {
      var cur = ary[i];
      str += "<li><a class='icon-wrapper' href='javascript:;'><img src=" + ary[i]['src'] + " alt=''/></a>";
      str += "<a class='app-name' href='javascript:;'>" + ary[i]['game'] + "</a><a class='del-btn none' href='javascript:;' title='删除该应用'>×</a></li>";
    }
    ary = [];
    while (ary.length < 9) {
      ran = Math.round(Math.random() * (aAppStore.length - 2) + 1);
      if (ary.indexOf(aAppStore[ran]) === -1 && aAppStore[ran].playTimes === 0) {
        ary.push(aAppStore[ran]);
      }
    }
    for (i = 0; i < 4; i++) {
      cur = ary[i];
      str += "<li><a class='icon-wrapper' href='javascript:;'><img src=" + ary[i]['src'] + " alt=''/></a>";
      str += "<a class='app-name' href='javascript:;'>" + ary[i]['game'] + "</a></li>";
    }

    for (i = 4; i < ary.length; i++) {
      str += "<li><a class='icon-wrapper' href='javascript:;'><img src=" + ary[i]['src'] + " alt=''/><span class='icon-popularize'></span></a>";
      str += "<a class='app-name' href='javascript:;'>" + ary[i]['game'] + "</a>";
      str += "</li>"
    }
    str += "<li><a class='icon-wrapper' href='javascript:;'><img src=" + aAppStore[0]['src'] + " alt=''/></a>";
    str += "<a class='app-name' href='javascript:;'>" + aAppStore[0]['game'] + "</a></li>";
    uAppStore.innerHTML = str;
    str = null;
  }

  //鼠标滑过提示删除
  for (i = 0; i < 5; i++) {
    (function (i) {
      var cur = appList[i];
      var curDel = utils.getElementsByClass("del-btn", cur)[0];
      cur.onmouseenter = function () {
        utils.removeClass(curDel, "none");
      };
      cur.onmouseleave = function () {
        utils.addClass(curDel, "none");
      };
    })(i);

  }

  //dress
  var dress = document.getElementById("dress-menu");
  var dressParent = dress.parentNode;
  var dressBox = dressParent.getElementsByTagName("ul");
  var dressList = dress.getElementsByTagName("a");
  for (var i = 0; i < dressList.length; i++) {
    var cur = dressList[i];
    cur.index = i;
    cur.onmouseover = function () {
      for (var k = 0; k < dressBox.length; k++) {
        utils.removeClass(dressList[k], "hover");
        utils.removeClass(dressBox[k], "dress-select");
      }
      utils.addClass(this, "hover");
      utils.addClass(dressBox[this.index], "dress-select");
    };
  }


  var musicCon = document.getElementById("tb_music_li");
  var musicList = musicCon.getElementsByTagName("a");
  var iMusic = musicCon.getElementsByTagName("i");
  musicCon.onmouseenter = function () {
    utils.addClass(this, "select");
    utils.addClass(musicList[0], "music_select");
    utils.addClass(musicList[1], "music_select");
    utils.addClass(iMusic[0], "play_select");
    utils.addClass(iMusic[1], "dynamic_select");
  };
  musicCon.onmouseleave = function () {
    utils.removeClass(this, "select");
    utils.removeClass(musicList[0], "music_select");
    utils.removeClass(musicList[1], "music_select");
    utils.removeClass(iMusic[0], "play_select");
    utils.removeClass(iMusic[1], "dynamic_select");
  };


  //tb_setting_panel
  var setDiv = document.getElementById("tb_setting_li");
  var vipDiv = document.getElementById("vip_setting_li");
  var setPanel = utils.children(setDiv, "div")[0], setPanelH = setPanel ? utils.getCss(setPanel, "height") : null;
  var vipPanel = utils.children(vipDiv, "div")[0], vipPanelH = vipPanel ? utils.getCss(vipPanel, "height") : null;
  var iSet = utils.children(setDiv, "i")[0];
  var setLine = utils.next(iSet);
  var vipLine = utils.children(vipDiv, "b")[0];
  setDiv.onmouseenter = function () {
    utils.addClass(this, "select");
    utils.addClass(iSet, "setting_hover");
    utils.setCss(setPanel, "height", 0);
    setLine.style.display = "block";
    setPanel.style.display = "block";
    animate(setPanel, {height: setPanelH}, 100);
  };
  setDiv.onmouseleave = function () {
    utils.removeClass(this, "select");
    utils.removeClass(iSet, "setting_hover");
    animate(setPanel, {height: 0}, 50, function () {
      utils.setCss(setPanel, "height", setPanelH);
      setPanel.style.display = "none";
      setLine.style.display = "none";
    });
  };

  vipDiv.onmouseenter = function () {
    utils.addClass(this, "select");
    utils.setCss(vipPanel, "height", 0);
    vipLine.style.display = "block";
    vipPanel.style.display = "block";
    animate(vipPanel, {height: vipPanelH}, 100);
  };
  vipDiv.onmouseleave = function () {
    utils.removeClass(this, "select");
    animate(vipPanel, {height: 0}, 100, function () {
      utils.setCss(vipPanel, "height", vipPanelH);
      vipLine.style.display = "none";
      vipPanel.style.display = "none";
    });
  };


  //好友搜索
  var searchBox = document.getElementById("search-box"), searchInp = searchBox.getElementsByTagName("input")[0];
  var parentBox = searchBox.parentNode, searchDrop = utils.next(searchBox), searchDropH = utils.getCss(searchDrop, "height");
  parentBox.flag = 0;
  var hideTimer = null, inputTimer = null;
  parentBox.onclick = function (e) {
    if (parentBox.flag === 1) {
      return;
    }
    parentBox.flag = 1;
    e = e || window.event;
    e.target = e.target || e.srcElement;
    if (e.target.parentNode === searchBox || e.target.parentNode.parentNode === searchBox) {
      utils.addClass(searchInp, "search_input_focus");
      utils.addClass(musicCon, "none");
      utils.setCss(searchDrop, "height", 0);
      utils.removeClass(searchDrop, "none");
      animate(searchDrop, {height: searchDropH}, 200, function () {
        utils.setCss(searchDrop, "height", searchDropH);
      });
    }
  };
  parentBox.onmouseenter = function () {
    window.clearTimeout(hideTimer);
    window.clearTimeout(inputTimer);
  };
  parentBox.onmouseleave = function () {
    hideTimer = window.setTimeout(function () {
      animate(searchDrop, {height: 0}, 200, function () {
        utils.addClass(searchDrop, "none");
      });
    }, 2500);
    inputTimer = window.setTimeout(function () {
      utils.removeClass(musicCon, "none");
      utils.removeClass(searchInp, "search_input_focus");
      searchInp.value = "";
      searchInp.blur();
      parentBox.flag = 0;
    }, 3000);
  };


})();









