Page({

    /**
     * 页面的初始数据
     */
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {

    },

    data: {
        ad: {},
        showMask: false,
        showAd: false,
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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
    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
    /*
     * 公有方法  
     */
    advertisement: function() {
        this.setData({
            showMask: true,
            showAd: true,
        });
    },
    closeMask: function() {
        this.setData({
            showMask: false,
            showAd: false,
        });
    },
    copyId: function(e) {
        this.setData({
            // showMask: true,
            showAd: false,
        });
        var self = this;
        wx.setClipboardData({
            data: self.data.ad.id,
            success: function(res) {
                // self.setData({copyTip:true}),  
                wx.showModal({
                    title: '提示',
                    content: '复制成功！请在微信中添加好友',
                    showCancel: false,
                    confirmText: '我知道了',
                    confirmColor: '#259ce0',
                    success: function(res) {
                        self.setData({
                            showMask: false,
                        });
                    }
                })
            }
        });
    },
    preventTouchMove: function() {},
    randomAd: function() {
        var advList = [{
                nameColor: '#333',
                tipsColor: '#777',
                name: '守宫二次元@元元',
                local: '上海',
                tips: '爱爬宠的人都快来撩小编元元！',
                id: 'geckoplanet',
                title: '添加微信号',
                avatar: '../images/avatar/avata-1.png',
                btn: '一键复制微信号',
                btnColor: '#fff',
                btnBgColor: '#000'
            },
            {
                nameColor: '#333',
                tipsColor: '#777',
                name: '酷爬宠物',
                local: '广州·深圳',
                tips: '主营豹纹守宫零售&批发',
                id: 'kupachongwu',
                title: '添加微信号',
                avatar: '../images/avatar/avata-1.png',
                btn: '一键复制微信号',
                btnColor: '#fff',
                btnBgColor: '#f79035'
            },
        ]
        var i = Math.floor(Math.random() * advList.length).toString(10)
        this.setData({
            ad: advList[i],
        });
    },
    /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    _runEvent() {
        //触发回调
        this.triggerEvent("runEvent")
    },
    attached: function() {
        this.randomAd()
    }
})