var window_width=1024;
var window_height=768;
var radius=8;
var margin_top=30;
var margin_left=30;

window.onload=function(){
	var canvas = document.getElementById('canvas');
	canvas.width=window_width;
	canvas.height=window_height;
	var context = canvas.getContext('2d');
	render(context);
};

function render(ctx){
		
		setInterval(function(){
			var date =new Date();
			var hour = date.getHours();
			var minute=date.getMinutes();
			var seconds = date.getSeconds();
			ctx.clearRect(0,0,window_width,window_height);
			renderDight(margin_left,margin_top,parseInt(hour/10),ctx);
			renderDight(margin_left+15*(radius+1),margin_top,parseInt(hour%10),ctx);
			renderDight(margin_left+30*(radius+1),margin_top,10,ctx);
			renderDight(margin_left+39*(radius+1),margin_top,parseInt(minute/10),ctx);
			renderDight(margin_left+54*(radius+1),margin_top,parseInt(minute%10),ctx);
			renderDight(margin_left+69*(radius+1),margin_top,10,ctx);
			renderDight(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),ctx);
			renderDight(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),ctx);

		},100);
		
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