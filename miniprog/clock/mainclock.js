var app = new Vue({
    el:"#app",
    data:{
        i : 0, //总秒数
        timer : null, //记录定时器的返回值
        control : "开始",
        sec : "00",
        min : "00",
        hour : "00",
    },
    methods: {
        doubleNum(n){
            if(n < 10){
                return "0" + n;
            }else{
                return n;
            }
        },
        //开始函数
        startFunc(){
            var that = this; 
            that.timer = setInterval(function(){
                that.i++;
                that.sec = that.doubleNum(that.i % 60);
                that.min = that.doubleNum(parseInt(that.i / 60) % 60);
                that.hour = that.doubleNum(parseInt(that.i / 3600));
            }, 1000)
        },
        //暂停
        pasueFunc(){
            clearInterval(this.timer)
        },
        //重置按钮
        restart(){
            clearInterval(this.timer);
            this.control = "开始";
            this.i = 0;
            this.sec = "00";
            this.min = "00";
            this.hour = "00";
        },
        //1、给btn1按钮添加点击事件  互斥锁
        controlbut(){
            if(this.control == "开始"){
                this.control = "暂停";
                this.startFunc();
            }else{
                this.control = "开始";
                this.pasueFunc();
            }
        }
    }
})

var ul = document.querySelector('#face');
var hour1 = document.querySelector('#hour1');
var minu1 = document.querySelector('#minu1');
var sec1 = document.querySelector('#sec1');

for(var i=0;i<60;i++){
    var li = document.createElement('li');
    li.style.transform = 'rotate('+ ( i*6 ) +'deg)';
    if(i%5 === 0){
        li.style.height = '15px';
        li.style.width = "2px";
    }
    ul.appendChild(li);
}

run();
setInterval(run,1000);

function run(){
    var date = new Date();
    var iH = date.getHours();
    var iM = date.getMinutes();
    var iS = date.getSeconds()

    hour1.style.transform = 'rotate('+ ( iH * 30 + iM/2 ) +'deg)';
    minu1.style.transform = 'rotate('+ ( iM * 6 ) +'deg)';
    sec1.style.transform = 'rotate('+ ( iS * 6 ) +'deg)';
    //console.log(sec1)
}

