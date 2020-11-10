var app = new Vue({
    el:"#app",
     data:{
    //     oDiv : document.getElementById("hit"),
    //     oBall : document.getElementById("ball"),
    //     oBat : document.getElementById("bat"),
    //     oBrick : document.getElementById("brick"),
    //     aBricks : this.oBrick.getElementsByTagName("div"),
        speedX : parseInt(Math.random() * 4) + 4,
        //随机一个垂直方向的速度
        speedY : -(parseInt(Math.random() * 3) + 6),
        isGame : false
    },
    methods: {
     hitbr(n){ 
        this.isGame = true
        var oDiv = document.getElementById("hit");
        var oBall = document.getElementById("ball");
        var oBat = document.getElementById("bat");
        var oBrick = document.getElementById("brick");

        var that = this;
        //让拍子可以水平方向移动
        that.dragX(oBat);
        //创建对应的砖块
        that.createBrick(n);
        
        var aBricks = oBrick.getElementsByTagName("div");
        //随机一个水平方向的速度
        that.speedX = parseInt(Math.random() * 4) + 4;
        //随机一个垂直方向的速度
        that.speedY = -(parseInt(Math.random() * 3) + 6);
        setInterval(function(){
            oBall.style.left = oBall.offsetLeft + that.speedX + 'px';
            oBall.style.top = oBall.offsetTop + that.speedY + 'px';

            if(oBall.offsetLeft >= 480 || oBall.offsetLeft <= 0){
                that.speedX *= -1;
            }
            if(oBall.offsetTop <= 0){
                that.speedY *= -1;
            }
            if(oBall.offsetTop >= 480){
                alert("GAME OVER");
                location.reload(); //重新刷新当前页面
            }
            if(aBricks.length == 0)
            {
                alert("GAME WIN");
                location.reload(); //重新刷新当前页面
            }
        //判断是否发生碰撞
        if(that.crash(oBall, oBat)){
            that.speedY *= -1;
        }
        //小球和砖块是否发生碰撞
        for(var i = 0; i < aBricks.length; i++){
            if(that.konck(oBall, aBricks[i])){
                that.speedY *= -1;
                oBrick.removeChild(aBricks[i]);
            }
        }
        }, 30)
    },

        crash(node1, node2){
            var l1 = node1.offsetLeft;
            var t1 = node1.offsetTop;
            var r1 = node1.offsetLeft + node1.offsetWidth;
            var b1 = node1.offsetTop + node1.offsetHeight;
            var l2 = node2.offsetLeft;
            var t2 = node2.offsetTop;
            var r2 = node2.offsetLeft + node2.offsetWidth;
            var b2 = node2.offsetTop + node2.offsetHeight;
            //肯定碰撞不了的条件
            if(!(r2 < l1 || l2 > r1 || b2 < t1 || t2 > b1)){
                return true;
            }else{
                return false;
            }
        },
        dragX(node){
            node.onmousedown = function(ev){
                var e = ev || window.event;
                var offsetX = e.clientX - node.offsetLeft;
                document.onmousemove = function(ev){
                    var e = ev || window.event;
                    var l = e.clientX - offsetX;
                    //限制出界
                    if(l <= 0){
                        l = 0;
                    }
                    if(l >= 400){
                        l = 400;
                    }
                    node.style.left = l + 'px';
                    }
                }
                document.onmouseup = function(){
                document.onmousemove = null;
                }
            },
        createBrick(n){
            var oBrick = document.getElementById("brick");
            for(var i = 0; i < n; i++){
                var node = document.createElement("div");
                node.style.backgroundColor = this.randomColor();
                oBrick.appendChild(node);
            }
            var aBricks = oBrick.getElementsByTagName("div");
            for(var i = 0; i < aBricks.length; i++){
                    aBricks[i].style.left = aBricks[i].offsetLeft + 'px';
                    aBricks[i].style.top = aBricks[i].offsetTop + 'px';
                }
                //必须当前所有的div拥有坐标以后，才能将position = absolute
            for(var i = 0; i < aBricks.length; i++){
                    aBricks[i].style.position = 'absolute';
                }
        },
        konck(node1, node2){
            var l1 = node1.offsetLeft;
            var r1 = node1.offsetLeft + node1.offsetWidth;
            var t1 = node1.offsetTop;
            var b1 = node1.offsetTop + node1.offsetHeight;
    
            var l2 = node2.offsetLeft;
            var r2 = node2.offsetLeft + node2.offsetWidth;
            var t2 = node2.offsetTop;
            var b2 = node2.offsetTop + node2.offsetHeight;
    
            if(l2 >= r1 || r2 <= l1 || t2 >= b1 || b2 <= t1){
                return false;
            }else{
                return true;
            }
        },
    randomColor(){
        return "rgba(" + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ", 1)";
    }
    }
    
})