window.onload=function(){
// 3D盒子按钮控制
    var next=document.getElementById("next_btn");
    var prev=document.getElementById("prev_btn");
    var box3ds=document.getElementsByClassName("box3d");
    var rang=0;
    // 向左，前一面
    prev.onclick=function(){
        rang-=90;
        for(let i=0;i<box3ds.length;i++){
            box3ds[i].style.transform="rotateY("+rang+"deg)"
        }
        // console.log(rang);
    }
    // 向右，后一面
    next.onclick=function(){
        rang+=90;
        for(let i=0;i<box3ds.length;i++){
            box3ds[i].style.transform="rotateY("+rang+"deg)"
        }
        // console.log(rang);
    }
// 微信 QQ 二维码
    var qq=document.getElementsByClassName("qq")[0];
    var wechat=document.getElementsByClassName("wechat")[0];
    var codepic=document.getElementsByClassName("codepic");

    wechat.onmouseover=function(){
        codepic[0].style.opacity="1"
    }
    wechat.onmouseout=function(){
        codepic[0].style.opacity="0"
    }
    qq.onmouseover=function(){
        codepic[1].style.opacity="1"
    }
    qq.onmouseout=function(){
        codepic[1].style.opacity="0"
    }
// 更多按钮
    var spaceBtn=document.getElementsByClassName("space")[0];
    var spaceBox=document.getElementsByClassName("space_box")[0];
    spaceBtn.onclick=function(e){
         e.stopPropagation();
        if(spaceBox.style.height=="" || spaceBox.style.height=="0px"){
            spaceBox.style.height="100px"
        }else{
            spaceBox.style.height="0"
        }
        
    }
    document.onclick=function(){
        spaceBox.style.height="0";
    }
//二级菜单
    var menu=document.getElementsByClassName("menu")[0];
    var iconrect=menu.getElementsByClassName("iconrect");//三角icon
    var faMenu=document.getElementsByClassName("famenu");
    var subMenu=document.getElementsByClassName("submenu");

    for(let i=0;i<faMenu.length;i++){
        faMenu[i].index=i;
        subMenu[i].style.height="0";
        faMenu[i].onclick=function(){
            if(parseInt(subMenu[this.index].style.height)==0){
                for(let j=0;j<subMenu.length;j++){
                    subMenu[j].style.height="0";
                    subMenu[j].style.borderTop="";
                    iconrect[j].style.transform="";
                }
                subMenu[this.index].style.height="100%";
                subMenu[this.index].style.borderTop="1px solid #ddd";
                iconrect[this.index].style.transform="rotate(120deg)"
            }else{
                subMenu[this.index].style.height="0px";
                subMenu[this.index].style.borderTop="";
                iconrect[this.index].style.transform=""
            }
            
        }
    }
// 选项卡切换--首页页面切换
    var page=document.getElementsByClassName("page");
    var pageBtnBox=document.getElementsByClassName("pagebtn")[0];
    var pagebtn=pageBtnBox.getElementsByTagName("li")
    // console.log(page.length)
    for(let i=0;i<pagebtn.length;i++){
        pagebtn[i].index=i;
        pagebtn[i].onclick=function(){
            if (page[this.index].style.display!="block") {
                for(let j=0;j<pagebtn.length;j++){
                    page[j].style.display="none";
                    pagebtn[j].classList.remove("page_active")
                }
                page[this.index].style.display="block";
                this.classList.add("page_active");
                document.documentElement.scrollTop=page[this.index].offsetTop-20;
            }            
        }
    }
// 标签云删除按钮
    var tagBox=document.getElementsByClassName("tag_box")[0];
    var tagLis=tagBox.getElementsByTagName("a");
    var delBtn=document.getElementsByClassName("delete_this");

    for(var i=0;i<delBtn.length;i++){
        // 点击删除
        delBtn[i].onclick=function(){
            this.parentNode.remove();
            hov();
        };

    }
    // 鼠标移入移出显示删除按钮事件
    function hov(){
        for(var i=0;i<tagLis.length;i++){
            tagLis[i].index=i;
            delBtn[i].indexs=i;
            // 鼠标移入
            tagLis[i].onmouseover=function(){
                delBtn[this.index].style.display="block";
                this.style.transform="scale(1.1)"
            };
            delBtn[i].onmouseover=function(){
                this.style.display="block";
                tagLis[this.indexs].style.transform="scale(1.1)"
            }
            // 鼠标移出
            tagLis[i].onmouseout=function(){
                delBtn[this.index].style.display="none"
                this.style.transform=""
            }
            delBtn[i].onmouseout=function(){
                this.style.display="none";
                tagLis[this.indexs].style.transform=""
            }
        }
    }
    hov();

// 页面底部无缝滚动
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