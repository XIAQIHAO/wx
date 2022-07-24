// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    Tabs:[
      {index:0,title:"商品收藏",active:true},
      {index:1,title:"品牌收藏",active:false},
      {index:2,title:"店铺收藏",active:false},
      {index:3,title:"品牌收藏",active:false}
    ],
    collect:[]
  },
  //子组件向父组件传递事件
    showcase(e){
          let i = e.detail;
          let Tabs = this.data.Tabs
          Tabs.forEach((item,index,arr)=>{
                item.active = i==index?true:false
          })
          this.setData({
            Tabs
          })
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
        this.setData({
          collect:wx.getStorageSync('collect')
        })
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