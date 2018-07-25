// pages/movie/more-movie/more-movie.js
var app = getApp();
var util = require('../../../util/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var category = options.category;
        var dataUrl = "";
        switch (category) {
            case "正在热映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
                break;
            case "即将上映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
                break;
            case "豆瓣Top250":
                dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
                break;
        }
        this.data.requestUrl = dataUrl;
        util.http(dataUrl, this.processDoubanData);
        // 显示loading状态
        wx.showNavigationBarLoading();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle,
        })
        wx.showNavigationBarLoading();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    processDoubanData: function(moviesDouban) {
        var movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp)
        }
        var totalMovies = [];
        totalMovies = this.data.movies.concat(movies);
        this.setData({
            movies: totalMovies
        })
        wx.stopPullDownRefresh();
        //隐藏loading状态
        wx.hideNavigationBarLoading();
    },
    //下拉函数
    onPullDownRefresh:function(event){
        var refreshUrl = this.data.requestUrl + "?star=0&count=20";

        //刷新页面后面将页面所有初始化参数恢复到初始值
        this.data.movies = [];
        util.http(refreshUrl,this.processDoubanData);
        //显示loading状态
        wx.showNavigationBarLoading();
    },
    //上滑加载
    onReachBottom:function(event){
        var totalCount = this.data.movies.length;
        //拼接下一组数据的URL
        var nextUrl = this.data.requestUrl + "?star=" + totalCount + "&count=20";
        util.http(nextUrl,this.processDoubanData);
        //显示loading状态
        wx.showNavigationBarLoading();
    },
    onMovieTap: function (event) {
        var movieId = event.currentTarget.dataset.movieId;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieId,
        })
    },
    // 预览海报
    viewMoviePostImg:function(event){
        var src = event.currentTarget.dataset.src;
        wx.previewImage({
            urls: [src],
            current:src
        })
    }
})