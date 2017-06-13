create(aData);
function create(aData){
    var oList=document.getElementById("piclist");
    var oLi=oList.getElementsByTagName("li");
    var oPage=document.getElementById("page");
    var oBtn=oPage.getElementsByClassName("btn");
    var oRecycle=document.getElementsByClassName("recycle");
    var sHtml="";
    /*创建li*/
    for(var i=0;i<aData.length;i++){
    	sHtml+="<li style='background-image:url("+aData[i]+");'></li>"
    }
    oList.innerHTML=sHtml;
    var oRemove=[];
    var OnOff=true;
    toPosition();//动画效果
                // 添加动画效果
    // 图片的位置详解
    // No.1:left 0 top 0,   left：0%3=0；top：0/3=0；
    // No.2:left 1 top 0,   left：1%3=1；top：1/3=0.33；    
    // No.3:left 2 top 0,   left：2%3=2；top：2/3=0.67；
    // No.4:left 0 top 1,   left：3%3=0；top：3/3=1；
    // No.5:left 1 top 1,   left：4%3=1；top：4/3=1.33；
    // No.6:left 2 top 1。  left：5%3=2；top：5/3=1.67；top向下取整
    function toPosition(){
    	for(var i=0;i<oLi.length;i++){
            oLi[i].style.left=i%3+"rem";
            oLi[i].style.top=Math.floor(i/3)+"rem";
    	}
    }
    /*给btn添加事件*/ 
    oBtn[0].addEventListener("touchend",fnEnd,false);//false防止冒泡
    oBtn[1].addEventListener("touchend",fnDelete,false);
    /*选择取消*/
    function fnEnd(){
    	if (OnOff) {
			oBtn[0].innerHTML="取消";
        	for(var i=0;i<oLi.length;i++){
        		oLi[i].index=i;
        		oLi[i].addEventListener("touchend",fnSelected,false);
            }
    	}else{
            oBtn[0].innerHTML="选择";
            for(var i=0;i<oLi.length;i++){
        		oLi[i].index=i;
        		oLi[i].style.borderColor="#000";
        		oLi[i].removeEventListener("touchend",fnSelected,false);
            }
            oBtn[1].style.display="none";
            oRemove.length=0;//清空数组
    	};
    	OnOff=!OnOff;
    }
    //选中事件 
    function fnSelected(){
    	oRemove.push(this.index);
    	this.style.borderColor="#fff";
    	oBtn[1].style.display="block";
    }
    //删除事件
    function fnDelete(){
    	oRemove=oRemove.sort(function(a,b){
    		return a-b;
    	});
    	while(oRemove.length){
            oList.removeChild(oLi[oRemove.pop()]);
    	}
    	OnOff=false;
    	toPosition();
    	fnEnd();//重新调用点击事件，此时走else路线
    }
}
