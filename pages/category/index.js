// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[],
    num:0,
    scrolltop:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
    let cater =  wx.getStorageSync("cates");
    if(!cater){
        //如果没有数据我们请求数据
        this.getCategory();
        console.log(14)
    }else{
        //有数据的话，规定十秒后重新获取，否则用本地数据
        if(cater.time>1000*10){
          this.getCategory();
        }else{
          this.setData({
          category:cater.data
          })
        }
    }
     
  },
  getCategory(){
    let that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      success:(res)=>{
        that.setData({
            category:res.data.message
        })
        wx.setStorageSync("cates",{time:Date.now(),data:res.data.message});
      },
      complete:()=>{
          wx.hideLoading()
      }
    })

  },
  bnclick(e){
      
      this.setData({
        num : e.target.dataset.setindex,
        scrolltop:0
      })
     
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

  }
})