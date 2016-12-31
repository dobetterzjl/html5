var window_width=1024;
var window_height=768;
var radius=8;
var margin_top=30;
var margin_left=30;
var endTime=new Date(2017,0,1,00,00);
var curshowTime =0;
var balls=[];
var colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC00CC"];

window.onload=function(){
	window_width=document.body.clientWidth;
	window_height=document.body.clientHeight;
	margin_left=Math.round(window_width/10);
	radius=Math.round(window_width*4/5/108)-1;
	var canvas = document.getElementById('canvas');
	canvas.width=window_width;
	canvas.height=window_height;
	var context = canvas.getContext('2d');
	curshowTime=getshowTime();
	setInterval(function(){
		render(context);
		update();
	},50);
	
};
function update(){
	var nexttimeShow=getshowTime();
	var nextHour = parseInt(nexttimeShow/3600);
	var nextMinute= parseInt((nexttimeShow-nextHour*3600)/60)
	var nextSeconds = nexttimeShow%60;
	var curhour = parseInt(curshowTime/3600);
	var curminute=parseInt((curshowTime-curhour*3600)/60);
	var curSeconds= curshowTime%60;
	if(nextSeconds!=curSeconds){
		if(parseInt(curhour/10)!=parseInt(nextHour/10)){
			addBoll(margin_left+0,margin_top,parseInt(curhour/10));
		}
		if(parseInt(curhour%10)!=parseInt(nextHour%10)){
			addBoll(margin_left+15*(radius+1),margin_top,parseInt(curhour%10));
		}
		if(parseInt(curminute/10)!=parseInt(nextMinute/10)){
			addBoll(margin_left+39*(radius+1),margin_top,parseInt(curminute/10));
		}
		if(parseInt(curminute%10)!=parseInt(nextMinute%10)){
			addBoll(margin_left+54*(radius+1),margin_top,parseInt(curminute%10));
		}
		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
			addBoll(margin_left+78*(radius+1),margin_top,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
			addBoll(margin_left+93*(radius+1),margin_top,parseInt(curSeconds%10));
		}

		curshowTime=nexttimeShow;
		
	}
	updateBalls();
}
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if (balls[i].y>=window_height-radius) {
			balls[i].y=window_height-radius;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}
	var cnt=0;
	for(var i=0;i<balls.length;i++){
		if((balls[i].x+radius)>0&&(balls[i].x-radius)<window_width){
			balls[cnt++]=balls[i];
		}
		
	}
	while(balls.length>Math.min(300,cnt)){
			balls.pop();
		}



}
function addBoll(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall ={
					x:x+j*2*(radius+1)+(radius+1),
					y:y+i*2*(radius+1)+(radius+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				};		
				balls.push(aBall);
			}
		}
	}
}

function getshowTime(){
	var date=new Date();
	var ret=(endTime.getTime()-date.getTime())/1000;
	return ret>=0?ret:0;
}
function render(ctx){
		ctx.clearRect(0,0,window_width,window_height);
		var hour = parseInt(curshowTime/3600);
		var minute=parseInt((curshowTime-hour*3600)/60);
		var seconds=parseInt((curshowTime-hour*3600-minute*60)%60);
	renderDight(margin_left,margin_top,parseInt(hour/10),ctx);
	renderDight(margin_left+15*(radius+1),margin_top,parseInt(hour%10),ctx);
	renderDight(margin_left+30*(radius+1),margin_top,10,ctx);
	renderDight(margin_left+39*(radius+1),margin_top,parseInt(minute/10),ctx);
	renderDight(margin_left+54*(radius+1),margin_top,parseInt(minute%10),ctx);
	renderDight(margin_left+69*(radius+1),margin_top,10,ctx);
	renderDight(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),ctx);
	renderDight(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),ctx);
	for(var i=0;i<balls.length;i++){
		ctx.fillStyle=balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI,true);
		ctx.closePath();
		ctx.fill();
	}
}
function renderDight(x,y,num,ctx){
	ctx.fillStyle="rgb(0,102,153)";
	for(var i=0;i<digit[num].length;i++){
		for(j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				ctx.beginPath();
				ctx.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}