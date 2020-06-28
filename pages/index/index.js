Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      //轮播图储存
      swiperList:[],
      //导航储存
      NavList:[],
      //产品展示
      prodList:[],
      category:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getSwiper();
      this.getNav();
      this.getProd();
      this.getCategory()
  },
  getSwiper(){
    let that = this
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success:(res)=>{
       that.setData({
        swiperList:res.data.message
       })
       
      }
    })
    
  },
  getNav(){
    let that = this;
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      success:(res)=>{
          that.setData({
              NavList:res.data.message
          })
      }
    })
  },
  getProd(){
    let that = this;
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      success:(res)=>{
        that.setData({
          prodList:res.data.message
         
        })
      }
    })
  },
  getCategory(){
    let that = this
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      success:(res)=>{
        that.setData({
            category:res.data.message
        })
      }
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