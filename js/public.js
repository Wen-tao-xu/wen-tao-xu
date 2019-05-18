// 页面底部无缝滚动
    if(document.getElementById("footerFigure")){
        var footerFigure=document.getElementById("footerFigure");
        var lis=footerFigure.getElementsByTagName('li');
        var speed=-2;

        footerFigure.innerHTML=footerFigure.innerHTML+footerFigure.innerHTML;
        footerFigure.style.width=lis[0].offsetWidth*lis.length+'px';

        function move(){
            if(footerFigure.offsetLeft<-footerFigure.offsetWidth/2){
                footerFigure.style.left=0;
            }
            if(footerFigure.offsetLeft>0){
                footerFigure.style.left=-footerFigure.offsetWidth/2+"px";
            }
                footerFigure.style.left=footerFigure.offsetLeft+speed+"px";
        }
        timer=setInterval(move,30);
        footerFigure.onmouseover=function(){
            clearInterval(timer)
        }
        footerFigure.onmouseout=function(){
            timer=setInterval(move,30);
        }
    }
    
//头部下拉框
    if(window.location.href.indexOf("index")==-1){
        var moreBtn=document.getElementsByClassName("more")[0];
        var moreList=document.getElementsByClassName("morelist")[0];
        var moreLists=moreList.getElementsByTagName("li");
    
        moreBtn.onclick=function(e){
            e.stopPropagation();
            if(moreList.style.height=="" || parseInt(moreList.style.height)==0){
                moreList.style.height=(moreLists.length)*40+"px";
                moreList.style.opacity="1";
                if(window.location.href.indexOf("contact")!=-1){
                    locationMap.style.height="0px";//地图收回
                    locationMap.style.opacity="0"
                }
            }else{
                moreList.style.height="0";
                moreList.style.opacity="0"
            }
    
        }
        // 点击页面其他地方下拉框收回
        document.onclick=function(e){
            moreList.style.height="0";
            moreList.style.opacity="0";
            /*locationMap.style.height="0px";//地图收回
            locationMap.style.opacity="0"*/
        }
    }

    // cookie函数
let cookie = {
    set:function(key,value,expires,path,domain,secure){
       var cookieText = encodeURIComponent(key)+'='+encodeURIComponent(value);
       if(typeof expires == 'number' && expires >=0){
       		var date = new Date();
       		date.setTime(date.getTime()+expires*1000);
          cookieText += ';expires='+date.toUTCString();
       }else{
       		throw new Error('day必须是数字,且必须大于等于0')
       }
       if(path){
          cookieText += ';path='+path;
       }
       if(domain){
          cookieText += ';domain='+domain;
       }
       if(secure){
          cookieText +=';srcure';
       }
       document.cookie = cookieText;
    },
    get:function(key){
       var cookieKey = encodeURIComponent(key) + '=';
       var cookieStart = document.cookie.indexOf(cookieKey);
       var cookieValue = null;

       if(cookieStart!=-1){
          var cookieEnd = document.cookie.indexOf(';',cookieStart);
          if(cookieEnd==-1){
             cookieEnd = document.cookie.length;
          }
          cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieKey.length,cookieEnd));
       }
       return cookieValue
    },
    remove:function(key,path){  
           document.cookie = key + "=;expires="+new Date(0)+";path="+path
    }
}
var state=document.getElementById("state");
var searchbox=document.getElementById("searchbox");
var searchbtn=searchbox.querySelector("#searchbox>.button");

if(cookie.get("email")){
    user=cookie.get("email")
    state.innerHTML=`
        <a href="javascript:;">${user}</a>
		<a href="javascript:;" id="quit">[注销]</a>
    `
    // 搜索框的变化
    searchbox.style.width="0%"
    searchbtn.onmouseover=function(){
        searchbox.style.width="14%"
    }
    searchbox.onmouseover=function(){
        searchbox.style.width="14%"
    }
    searchbtn.onmouseout=function(){
        searchbox.style.width="0%"
    }
    searchbox.onmouseout=function(){
        searchbox.style.width="0%"
    }
    // searchbox.style.display="none"
    // 注销
    var quit=document.getElementById("quit");
    quit.onclick=function(){
        // console.log(cookie.get("email"))
        cookie.remove("email","/")
        cookie.remove("status","/")
        window.location.reload()
    }
}else{
    state.innerHTML=`
    <a href="login.html" class="login">登录</a>
    <span>|</span>
    <a href="login.html?zhuce" class="registered">注册</a>
    `
    // searchbox.style.width="20%"
}
// console.log(cookie.get("email"))