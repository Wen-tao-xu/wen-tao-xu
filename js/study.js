// $(function(){
// 轮播图
	var widthLi=$(".banner_ul li").eq(0).width();
	var num=1;
	var timer=null;

	function move(){
		if(num<($(".banner_ul li").length-1) && num>0){
			$(".banner_ul").eq(0).animate({
				"left": -widthLi*num,
			},1000);
		}else if(num==($(".banner_ul li").length-1)){
			$(".banner_ul").eq(0).animate({
				"left": -widthLi*num,
			},1000,function(){
				num=1;
				$(".btn").eq(0).addClass("btnactive").siblings().removeClass('btnactive')
				$(".banner_ul").eq(0).css("left","-755px")
			});
		}else if(num==0){
			$(".banner_ul").eq(0).animate({
				"left": -widthLi*num,
			},1000,function(){
				num=3;
				$(".btn").eq(2).addClass("btnactive").siblings().removeClass('btnactive')
				$(".banner_ul").eq(0).css("left","-2265px")
			});
		}
		
	}
	// 左按钮
	$(".iconleft").eq(0).click(function(){
		console.log('on-click:'+num)
		$(".btn").eq(num).addClass("btnactive").siblings().removeClass('btnactive')
		num++;
		console.log("after-click:"+num)
		move();
		
	});
	// 右按钮
	$(".iconright").eq(0).click(function(){
		$(".btn").eq(num-2).addClass("btnactive").siblings().removeClass('btnactive')
		console.log('on-click:'+num)
		num--;
		console.log("after-click:"+num)
		move();
		
	});
	// 下方小按钮
	$(".btn").click(function(){
		$(this).addClass("btnactive").siblings().removeClass('btnactive');
		num=$(this).index()+1;
		move();
	})
	// 自动播放
	function setTimer(){
		timer=setInterval(function(){
			$(".btn").eq(num).addClass("btnactive").siblings().removeClass('btnactive')
			num++;
			move()
		},3000)
	}
	setTimer();
	// 鼠标移入
	$(".banner_ul,.iconleft,.iconright,.btn").mouseover(function(){
		clearInterval(timer);
		$(".iconleft,.iconright").css("display","block");
	}).mouseout(function(){
		setTimer();
		$(".iconleft,.iconright").css("display","none");
	})
	// 鼠标移出
	/*$(".banner_ul").mouseout(function(){
		setTimer();
	})*/
	$(".tag_header").mouseover(function(){
		$(this).find('i').css("animation","shake 0.8s")
	}).mouseout(function(){
		$(this).find('i').css("animation","")
	})
// })