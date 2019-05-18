var pull=document.getElementsByClassName("iconpull")[0]; //左按钮
var loginPage=document.getElementsByClassName("leftside")[0];//注册
var registerPage=document.getElementsByClassName("leftsidefu")[0];//登录
var banner=document.getElementsByClassName("rightside")[0];//图片
var tag=document.querySelectorAll(".page>a");

var loginbtn=document.getElementsByClassName("loginbtn")[0];//登录按钮
var regiterbtn=document.getElementsByClassName("regiterbtn")[0];//注册按钮
var infobox=document.getElementsByClassName("info")[0];//提示框
var msgtext=document.getElementById("msg");//提示内容

//根据url中是否存在“1”判断是否先出现注册页
var url=location.href;
if(url.indexOf("zhuce")!=-1){
	registerPage.style.right="40%";
	registerPage.style.opacity="1";
	tag[0].classList.remove("thistag");
	tag[1].classList.add("thistag")
	loginPage.style.left="-60%";
	loginPage.style.opacity="0";
	infobox.style.top="80%";//提示框下移防止遮住按钮
	setTimeout(function(){
		loginPage.style.left="100%";
	},500)
}
// 注册登录切换按钮
pull.onclick=function(){
	infobox.classList.remove('rubberBand');
	infobox.classList.remove('show');
	if(infobox.style.top=="80%"){
		infobox.style.top="73%";
	}else{
		infobox.style.top="80%";
	}
	
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

// 显示提示框
function showinfo(){
	infobox.classList.add('show');
	infobox.classList.add('rubberBand');
	setTimeout(() => {
		infobox.classList.remove("rubberBand")
	}, 1000);
	setTimeout(() => {hideinfo()}, 5000);
}

// 隐藏提示框
function hideinfo(){
	infobox.classList.remove('rubberBand');
	infobox.classList.remove('show');
}
var hidebtn=infobox.getElementsByClassName("icondelete")[0];
hidebtn.onclick=function(){
	hideinfo();
}
var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;//邮箱正则
var regp = /^(\w){6,11}$/;//密码正则
// 注册
regiterbtn.onclick=function(){
	var emailValue=document.getElementById("registeremail").value;
	var passwordValue=document.getElementById("registerpassword").value;
	var passwordValue2=document.getElementById("registerpassword2").value;

	if(emailValue==""){
		msgtext.innerHTML="请输入邮箱";
		showinfo(); 
	}else if(!reg.test(emailValue)){
		msgtext.innerHTML="邮箱格式不正确";
		showinfo();
	}else if(passwordValue==""){
		msgtext.innerHTML="请输入密码";
		showinfo();
	}else if(passwordValue!=passwordValue2){
		msgtext.innerHTML="两次输入密码不匹配";
		showinfo();
	}else if(!regp.test(passwordValue)){
		msgtext.innerHTML="密码只能输入6-11个字母、数字、下划线";
		showinfo();
	}else{
		let users = "&username="+emailValue+"&email="+emailValue+"&password="+passwordValue+"&password2="+passwordValue2+"&send=1"+"&userhead="+""+"&status=1";//拼接数据
		// console.log(users)
		let xhr = new XMLHttpRequest();
		xhr.open('post','api/register.php',true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(users)
		xhr.onreadystatechange=function(){
			if(this.status === 200 && this.readyState === 4){
				// console.log(this.responseText)
				let text = JSON.parse(this.responseText);
				// console.log(text)
				if(text.valid==true){
					msgtext.innerHTML=`注册成功，<a href="login.html">去登录</a>`;
					showinfo();
				}else{
					msgtext.innerHTML=text.message+`<a href="login.html">去登录</a>`;
					showinfo();
				}
			}
		}
	}


}
// 登录
loginbtn.onclick=function(){
	var emailValue=document.getElementById("loginemail").value;
	var passwordValue=document.getElementById("loginpass").value;

	if(emailValue==""){
		// console.log("请输入邮箱")
		msgtext.innerHTML="请输入邮箱";
		showinfo();
	}else if(!reg.test(emailValue)){
		// console.log("邮箱格式不正确");
		msgtext.innerHTML="邮箱格式不正确";
		showinfo();
	}else if(passwordValue==""){
		// console.log("请输入密码")
		msgtext.innerHTML="请输入密码";
		showinfo();
	}else{
		let Login = "Login="+JSON.stringify({email:emailValue,password:passwordValue,send:true})
		// console.log(Login)
		let xhr = new XMLHttpRequest();
		xhr.open('post','api/loginSave.php',true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(Login)
		xhr.onreadystatechange=function(){
			if(this.status === 200 && this.readyState === 4){
				// console.log(this.responseText)
				let text = JSON.parse(this.responseText);
				// console.log(text.msg)
				if(text.valid){
					msgtext.innerHTML="登录成功，正在跳转";
					showinfo();
					setTimeout(function(){
						window.location.href="index.html"
					},2000)	
				}else{
					msgtext.innerHTML="邮箱或密码不正确";
					showinfo();
				}
			}
		}	
	}
	
}
// 忘记密码？
var findcode=document.getElementById("findcode");
findcode.onclick=()=>{
	msgtext.innerHTML="抱歉，noR.th也忘了";
	showinfo();
}