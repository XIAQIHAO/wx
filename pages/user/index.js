// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        userinfo:{},
        shop:[
          {name:"收藏的店铺",num:0},
          {name:"收藏的商品",num:wx.getStorageSync('collect').length,url:'../collect/index'},
          {name:"关注的商品",num:0},
          {name:"我的足迹",num:0}
        ],
          orders:[
            {image:"../../images/全部订单.png",title:"全部订单"},
            {image:"../../images/待付款.png",title:"待付款"},
            {image:"../../images/待收货.png",title:"待收货"},
            {image:"../../images/退款退货.png",title:"退款退货"},
          ],
          s:0
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
          let userinfo = wx.getStorageSync("user")
          
          this.setData({
            userinfo
          })
       
            
          console.log(this.data.userinfo)
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

  }
})