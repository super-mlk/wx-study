Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    sliderList: [
      { selected: true, imageSource: "../../assets/img/banner01.jpg" },
      { selected: false, imageSource: "../../assets/img/banner02.jpg" },
      { selected: false, imageSource: "../../assets/img/banner03.jpg" },
    ],
    list: [
      '选项1',
      '选项2',
      '选项3'
    ],
    selectedIndex: 0
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
  countClick: function () {
    this.setData({
      count: this.data.count + 1
    })
  },
  //监听swiper滚定事件，并切换面板
  switchTab: function (e) {
    var sliederList = this.data.sliderList,
      i, l,item;
    for (i = 0; item = sliederList[i]; ++i) {
      item.selected = e.detail.current == i;
    }
    this.setData({
      sliderList : sliederList
    })
  },
  change: function (e) {
    //修改选中项文案
    this.setData({
      selectedIndex: e.detail.value
    })
  }
})