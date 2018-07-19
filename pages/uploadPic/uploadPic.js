Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgList:"../../assets/img/banner01.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
    uploadPic:function(){
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可
            success: function(res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: 'http://example.weixin.qq.com/upload',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        //和服务器约定的token, 一般也可以放在header中
                        'session_token': wx.getStorageSync('session_token')
                    },
                    success:function(res){
                        console.log(res);
                    },
                    fail:function(err){
                        console.log(err);
                    }
                })
            },
        })
    }
})