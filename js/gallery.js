var picBox=document.getElementsByClassName("piclistbox")[0];
var oImages=picBox.getElementsByTagName("img");//每张图
var over=document.getElementsByClassName("over")[0];//遮罩
var pictures=picBox.getElementsByTagName("li");//每张图
var mask=picBox.getElementsByClassName("mask");//上浮的白框
var like=picBox.getElementsByClassName("iconshoucang1");//喜欢按钮
var downLoad=picBox.getElementsByClassName("iconxiazai");//下载按钮

// more
var moreBtn=document.getElementsByClassName("morea")[0];
var moreBox=document.getElementsByClassName("morebox")[0];
var arrow=document.getElementsByClassName("iconjiantou")[0];//更多箭头
moreBtn.onclick=function(){
	if (parseInt(moreBox.style.right)!=0) {
		moreBox.style.right='0px';
		arrow.style.opacity="0";
	}else{
		moreBox.style.right='-325px'
		setTimeout(function() {
			arrow.style.opacity="1";
		}, 800);
		
	}
}
// 图片懒加载
var imgs=picBox.getElementsByTagName("img");
var n=0;
lazyload();
window.onscroll=lazyload;
function lazyload(){
	var seeHeight=document.documentElement.clientHeight;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	over.style.top=scrollTop+'px';//图片遮罩
	// console.log(pictures[1].offsetTop)
	for(let i=n;i<pictures.length;i++){
		if (pictures[i].offsetTop<seeHeight+scrollTop) {
			if(imgs[i].getAttribute("src")=="images/defaultimg.png"){
				imgs[i].src=imgs[i].getAttribute("data-src");
			}
			n=i+1;
		}
	}
}

for(let i=0;i<pictures.length;i++){
	pictures[i].index=i;
	pictures[i].onmouseover=function(){
		mask[this.index].style.bottom=0;
	};
	pictures[i].onmouseout=function(){
		mask[this.index].style.bottom="-30px";
	};
	//点击喜欢
	like[i].onclick=function(){
		this.className.indexOf("like")==-1?this.classList.add('like'):this.classList.remove('like')
	}
	//点击下载
	var img=picBox.getElementsByTagName("img");
	var url=img[i].src;
	var a=document.createElement("a");
	downLoad[i].append(a)
	a.href=url;
	a.download="";
	// 点击预览
	var image=over.getElementsByTagName("img")[0];//img容器
	var hideBtn=over.getElementsByClassName("icondelete")[0];
	oImages[i].onclick=function(){
		var url=this.src;
		over.parentNode.style.display="block"
		image.src=url;
	}
	hideBtn.onclick=function(){
		this.parentNode.parentNode.parentNode.style.display="none"
	}
}