var pull=document.getElementsByClassName("iconpull")[0]; //左按钮
var loginPage=document.getElementsByClassName("leftside")[0];//注册
var registerPage=document.getElementsByClassName("leftsidefu")[0];//登录
var banner=document.getElementsByClassName("rightside")[0];//图片
var tag=document.querySelectorAll(".page>a");

//根据url中是否存在“1”判断是否先出现注册页
var url=location.href;
if(url.indexOf("1")!=-1){
	registerPage.style.right="40%";
	registerPage.style.opacity="1";
	tag[0].classList.remove("thistag");
	tag[1].classList.add("thistag")
	loginPage.style.left="-60%";
	loginPage.style.opacity="0";
	setTimeout(function(){
			loginPage.style.left="100%";
	},500)
}
// 注册登录切换按钮
pull.onclick=function(){
	if(loginPage.style.left=="" || loginPage.style.left=="0%"){
		loginPage.style.left="-60%";
		registerPage.style.right="40%";
		registerPage.style.opacity="1";
		loginPage.style.opacity="0";
		tag[0].classList.remove("thistag");
		tag[1].classList.add("thistag")
		setTimeout(function(){
			loginPage.style.left="100%";
		},500)
	}else if(loginPage.style.left=="100%"){
		registerPage.style.right="100%";
		loginPage.style.left="0%";
		loginPage.style.opacity="1";
		registerPage.style.opacity="0";
		tag[1].classList.remove("thistag");
		tag[0].classList.add("thistag")
		setTimeout(function(){
			registerPage.style.right="-60%";
		},500)
	}
}

// 注册登录验证
var loginbtn=document.getElementsByClassName("loginbtn");
var regiterbtn=document.getElementsByClassName("regiterbtn");