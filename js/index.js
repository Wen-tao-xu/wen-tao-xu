window.onload=function(){
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
// // 标签云删除按钮
//     var tagBox=document.getElementsByClassName("tag_box")[0];
//     var tagLis=tagBox.getElementsByTagName("a");
//     var delBtn=document.getElementsByClassName("delete_this");

//     for(var i=0;i<delBtn.length;i++){
//         // 点击删除
//         delBtn[i].onclick=function(){
//             this.parentNode.remove();
//             hov();
//         };

//     }
//     // 鼠标移入移出显示删除按钮事件
//     function hov(){
//         for(var i=0;i<tagLis.length;i++){
//             tagLis[i].index=i;
//             delBtn[i].indexs=i;
//             // 鼠标移入
//             tagLis[i].onmouseover=function(){
//                 delBtn[this.index].style.display="block";
//                 this.style.transform="scale(1.1)"
//             };
//             delBtn[i].onmouseover=function(){
//                 this.style.display="block";
//                 tagLis[this.indexs].style.transform="scale(1.1)"
//             }
//             // 鼠标移出
//             tagLis[i].onmouseout=function(){
//                 delBtn[this.index].style.display="none"
//                 this.style.transform=""
//             }
//             delBtn[i].onmouseout=function(){
//                 this.style.display="none";
//                 tagLis[this.indexs].style.transform=""
//             }
//         }
//     }
//     hov();

    // console.log(window.location.href)
if(window.location.href.indexOf("index")!=-1){
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
// 选项卡切换--首页页面切换
    var pages=document.getElementsByClassName("page");
    var pageBtnBox=document.getElementsByClassName("pagebtn")[0];
    var pagebtn=pageBtnBox.getElementsByTagName("li")
    // console.log(page.length)
    for(let i=0;i<pagebtn.length;i++){
        pagebtn[i].index=i;
        pagebtn[i].onclick=function(){
            if (pages[this.index].style.display!="block") {
                for(let j=0;j<pagebtn.length;j++){
                    pages[j].style.display="none";
                    pagebtn[j].classList.remove("page_active")
                }
                pages[this.index].style.display="block";
                this.classList.add("page_active");

                var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
                // 距离窗口顶端位置
                var pagesTop=pages[this.index].getBoundingClientRect().top;
                var speed=Math.floor(scrollTop/20);
                console.log(speed)
                var pageoffsetTop=document.documentElement.scrollTop+pagesTop;
                var timer=setInterval(function(){
                    if(document.documentElement.scrollTop>pageoffsetTop){
                        document.documentElement.scrollTop-=speed;
                    }else{
                        clearInterval(timer);
                    }
                },30);
            }            
        }
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
}

}