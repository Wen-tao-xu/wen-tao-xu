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
    var moreBtn=document.getElementsByClassName("more")[0];
    var moreList=document.getElementsByClassName("morelist")[0];
    var moreLists=moreList.getElementsByTagName("li");

    moreBtn.onclick=function(e){
        e.stopPropagation();
        if(moreList.style.height=="" || parseInt(moreList.style.height)==0){
            moreList.style.height=(moreLists.length)*40+"px";
            moreList.style.opacity="1";
            locationMap.style.height="0px";//地图收回
            locationMap.style.opacity="0"
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