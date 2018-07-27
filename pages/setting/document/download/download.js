// pages/setting/document/download/download.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      fileTypeList: [
          { type: 'pdf', iconurl: '/images/icon/wx_app_pdf.png', title: 'pdf类型' },
          { type: 'word', iconurl: '/images/icon/wx_app_word.png', title: 'word类型' },
          { type: 'excel', iconurl: '/images/icon/wx_app_exl.png', title: 'excel类型' },
          { type: 'ppt', iconurl: '/images/icon/wx_app_ppt.png', title: 'ppt类型' }
      ],
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
  //下载并预览文档
  downloadFile:function(event){
      var type = event.currentTarget.dataset.type,
          url = 'https://coding.net/u/airbreak/p/wx_app_files/git/raw/master/top10.';
        switch(type){
            case "pdf":
                url += 'pdf';
                break;
            case "word":
                url += "docx";
                break;
            case "excel":
                url+='xlsx';
                break;
            default:
                url+="pptx";
                break;
        }
        wx.downloadFile({
            url:url,
            success:function(res){
                var filePath = res.tempFilePath;
                console.log(filePath);
                wx.openDocument({
                    filePath: filePath,
                    success:function(res){
                        console.log("打开文档成功");
                    },
                    fail:function(res){
                        console.log(res)
                    },
                    complete:function(res){
                        console.log(res);
                    }
                })
            },
            fail:function(){
                console.log('下载失败');
            }
        })
  }
})