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
    let user=cookie.get("email")
    state.innerHTML=`
        <a href="javascript:;" class="useremail">${user}</a>
		<a href="javascript:;" id="quit">[注销]</a>
    `
    let useremail=document.getElementsByClassName("useremail")[0];
    useremail.setAttribute("title",user)
    // 搜索框的变化
    // searchbox.style.width="0%"
    // searchbtn.onmouseover=function(){
    //     searchbox.style.width="14%"
    // }
    // searchbox.onmouseover=function(){
    //     searchbox.style.width="14%"
    // }
    // searchbtn.onmouseout=function(){
    //     searchbox.style.width="0%"
    // }
    // searchbox.onmouseout=function(){
    //     searchbox.style.width="0%"
    // }
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

// 回到顶部按钮事件
$(document).scroll(function(){
    // 动态设置置顶按钮right值
	$("#back_top").css("right",($(document).width()-$(".main_content").width())/2)
	if($(document).scrollTop()>500){
		$("#back_top").css('opacity',1)
	}else{
		$("#back_top").css('opacity',0)
	}
})
$("#back_top").click(function(){
	$("html,body").animate({scrollTop:0},500)
})

// 首页留言默认数据
var msgjson='[{"content":"身体和灵魂，总要有一个在路上,喜欢这句话","time":"2019-2-14"},{"content":"本网站使用HTML+CSS+Javascript开发，最终成果是一个具有良好的交互能","time":"2019-2-15"},{"content":"站长真厉害","time":"2019-2-16"}]';
// 渲染数据
function showDate(){
    var msgdate=JSON.parse(localStorage.msg)
    for(let i=0;i<msgdate.length;i++){
        let msglist=`
            <div class="boards border flexrow">
            <div class="circle_wrap">
                <span class="onum">1</span>
                <div class="circle">
                    <img src="images/w64.png" alt="">
                </div>
            </div>
            <div class="mainmsg flexcol_center">
                <div class="message">
                    <p class="text2">
                        ${msgdate[i].content}
                    </p>
                    <p class="date">${msgdate[i].time}</p>
                </div>
            </div>
        </div>
            `
        $(".msglist").prepend(msglist)
    }
}
if(localStorage.msg){
    showDate()
}else{
    localStorage.msg=msgjson;
    showDate()
}
// 获取时间
let myDate= new Date();
let time=myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes();
// 写留言
$("#send").click(function(){
    // Storage.get('tasks')
    let text=$("#msg").val();      
    
    if(text==""){
        alert("请输入内容")
    }else{
        let newOne={"content":text,"time":time};
        let msgdate=JSON.parse(localStorage.msg);
        msgdate.push(newOne);
        let jsonNew=JSON.stringify(msgdate);
        localStorage.msg=jsonNew;
        let msglist=
        `<div class="boards border flexrow">
            <div class="circle_wrap">
                <span class="onum">1</span>
                <div class="circle">
                    <img src="images/w64.png" alt="">
                </div>
            </div>
            <div class="mainmsg flexcol_center">
                <div class="message">
                    <p class="text2">
                        ${msgdate[msgdate.length-1].content}
                    </p>
                    <p class="date">${msgdate[msgdate.length-1].time}</p>
                </div>
            </div>
        </div>`
        $(".msglist").prepend(msglist)
    }
})

// 留言输入框
$("#cancel").click(function(){
    $(".write_msg").slideUp()
})
$(".iconwrite").click(function(){
    $(".write_msg").slideDown()
})

// article页面评论功能

    // 默认数据
    var commentdate='[{"email":"172358@qq.com","time":"2019-2-14 08:25","content":"写的不错","good":0},{"email":"1721152358@qq.com","time":"2019-2-14 08:24","content":"写的很好","good":0},{"email":"111@qq.com","time":"2019-2-15 14:12","content":"写的不好","good":0}]';
    // localStorage.commentList=commentdate;
    if(cookie.get("email")){
        let user=cookie.get("email");
        $(".user").html(user)
    }else{
        $(".user").click(function(){
            window.location.href="./login.html"
        })
    }
    function loadComment(){
        let comment=JSON.parse(localStorage.commentList)
        $(".sum").append(comment.length);
        for(let i=0;i<comment.length;i++){
            let comments=`<ul class="comment_lists">
            <li class="flexrow">
            <div class="head_pic"><img src="./images/w64.png" alt=""></div>
            <div class="user">
                <p class="email">${comment[i].email}</p>
                    <p class="date">${comment[i].time}</p> 
            </div>
            </li>
            <li class="words"><p>${comment[i].content}</p></li>
            <li class="iconb">
                <div>
                    <a href="javascript:;" class="iconfont iconzan">赞</a>
                    <a href="javascript:;" class="iconfont iconhuifu">回复</a>
                </div>
                <i class="iconfont iconshanchu"></i>
            </li>
        </ul>`
        $(".comment_lists_box").prepend(comments)
        }
    }
    if(localStorage.commentList){
        loadComment()
    }else{
        localStorage.commentList=commentdate;
        loadComment()
    }
    // 发送评论
    $(".confirm").click(function(){
        if(cookie.get("email")){
            let comment=JSON.parse(localStorage.commentList);
            let txt=$("#write_comment").val();
            if(txt==""){
                alert("请输入内容")
            }else{
                let newComment={"email":$(".user").html(),"time":time,"content":txt,good:0}
                comment.push(newComment);
                $(".sum").html(comment.length);
                // 将新数据存入
                // console.log(cookie.get("email"));
                // if()
                let user=cookie.get("email");
                let updataComment=JSON.stringify(comment);
                localStorage.commentList=updataComment;
                let newc=`<ul class="comment_lists">
                    <li class="flexrow">
                    <div class="head_pic"><img src="./images/w64.png" alt=""></div>
                    <div class="user">
                        <p class="email">${user}</p>
                            <p class="date">${comment[comment.length-1].time}</p> 
                    </div>
                    </li>
                    <li class="words"><p>${comment[comment.length-1].content}</p></li>
                    <li class="iconb">
                    <div>
                        <a href="javascript:;" class="iconfont iconzan">赞</a>
                        <a href="javascript:;" class="iconfont iconhuifu">回复</a>
                    </div>
                    <i class="iconfont iconshanchu"></i>
                </li>
                </ul>`;
                $(".comment_lists_box").prepend(newc);
                $("#write_comment").val("");
                deleteComment();
                // window.location.reload();//发送后刷新一次解决一个类似数组塌陷的bug
            }
        }else{
            alert("请登录")
        }       
    })

//文本框聚焦事件
$("#write_comment").focus(function(){
    $(".btn_box_wrap").slideDown()
})
// 取消回收事件
$(".cancel").click(function(){
    $(".btn_box_wrap").slideUp()
})

// 标签渲染
// var tagdate='[{"content":"随笔"},{"content":"音乐殿堂"},{"content":"游戏"},{"content":"运动时间"},{"content":"吃"}]'
// 没有评论时提示出现
function nothing(){
    let commentList=JSON.parse(localStorage.commentList);
    // console.log(commentList.length)
    if(commentList.length==0){
        $(".nothing").slideDown();
    }else{
        $(".nothing").slideUp();
    }
}
nothing();
// 删除评论事件
function deleteComment(){
    // 有bug,数组塌陷
    // $(".iconshanchu").each(function(index,e){
    //     $(this).click(function(){
    //         console.log(index)
    //         let newcom=JSON.parse(localStorage.commentList);
    //         newcom.splice(newcom.length-index-1,1);
    //         localStorage.commentList=JSON.stringify(newcom);
    //         $(this).parent().parent().remove();
    //         $(".sum").html(newcom.length);
    //         window.location.reload();//发送后刷新一次解决一个类似数组塌陷的bug
    //     })
    // })
// 事件委托
    $(".comment_lists").on("click","i",function(event){
        var _this=$(event.target);
        _this.parent().parent().remove();
        let aa=_this.parent().parent().children(".words").text();
        console.log("删除"+aa);
        let newcom=JSON.parse(localStorage.commentList);
        for(let i=0;i<newcom.length;i++){
            if(aa==newcom[i].content){
                newcom.splice(i,1);
                localStorage.commentList=JSON.stringify(newcom);
                $(".sum").html(newcom.length);
            }
        }
        nothing();
    })
}
// 根据权限等级判断是否显示删除按钮
if(cookie.get("status")==0){// 超级管理员登录
    console.log("超级管理员登录");
    $(".iconshanchu").css("display","block");
    deleteComment();
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
                delBtn[this.index].style.display="none";
            }
            delBtn[i].onmouseout=function(){
                this.style.display="none";
                tagLis[this.indexs].style.transform=""
            }
        }
    }
    hov();
}else if(cookie.get("status")==1){
    // 普通管理员登录
    console.log("普通管理员登录")
    $(".iconshanchu").css("display","none");
    let emailNow=cookie.get("email");
    $(".user>.email").each(function(i,e){
        if($(this).text()==emailNow){
            // 出现相应删除按钮
            $(".iconb>.iconshanchu").eq(i).css("display","block");
        }
    });
    deleteComment();
}else{
    // 未登录
    console.log("未登录");
    $(".iconshanchu").css("display","none");
}