var app = new Vue({
    el:"#app",
    data:{
        joke:"",
        city:"",
        weatherList:[]
    },
    methods: {
        getJoke(){
            var that = this;
            axios.get("https://autumnfish.cn/api/joke").then(function(response){
                that.joke = response.data;
            },
            function(res){
                alert("获取数据失败" + res)
            })
        },

        searchWeather(){
            var that = this;
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + that.city)
            .then(function(response){
                console.log(response);
                if(response.data.desc == "invilad-citykey")
                {
                    alert("该城市不存在，请重新查询");
                    that.city = "";
                    that.weatherList = []
                }
                else
                that.weatherList = response.data.data.forecast
            })
            .catch(function(err){
                alert("查询出错：" + err)
            })
            // console.log(that.city)
        },

        changCity(city){
            this.city = city;
            this.searchWeather()
        }
    }
})