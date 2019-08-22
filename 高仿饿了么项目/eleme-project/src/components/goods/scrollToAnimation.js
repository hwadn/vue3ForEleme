function scrollToAnimate(div,currentY,posY){
	let ele = document.querySelector('.foods-wrapper');
	let length = posY-currentY;
	let perY = Math.ceil(length/10);
	// 如果移动距离<10px直接移动
	if(Math.abs(length)<10){
		ele.scrollTo(0,posY);
	}
	else{
		let timer = setInterval(function(){
			currentY+=perY;
			// 消除误差
			ele.scrollTo(0,currentY);
			// 误差范围在10px以内就算滚动完成
			if(Math.abs(currentY-posY)<10){
				ele.scrollTo(0,posY);
				clearInterval(timer);
			}
		},30);
	}
}
export {
	scrollToAnimate
}
