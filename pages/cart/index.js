// pages/cart/index.js
import { getSetting,chooseAddress,openSetting} from '../../untils/WxAddress'
import runtime from '../../untils/runtime'
/*
1.获取用户的收货地址
  1.绑定点击事件
  2.调用小程序内置api 获取用户地址 wx.chooseAddress
2.获取用户对小程序所授予的状态  获取地址的权限 状态 scope
*/ 
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
   getadress(){
    // //1.获取权限的状态
    //   let res = await getSetting()
    //   let current = res.authSetting['scope.address'];
    //   if(current == true|| current == undefined){
    //       let res1 = await chooseAddress()
    //       console(res1)
    //   }
    //2. 判断权限状态
     wx.getSetting({
       success: (res) => {
       const curadr = res.authSetting['scope.address']
       if(curadr==true ||　curadr== undefined){
          wx.chooseAddress({
            success:(result)=>{
                  console.log(result)
            }
          })
       }else{
        //  诱导用户设置定位权限
        wx.openSetting({
          success:()=>{
            wx.chooseAddress({
              success:(result1)=>{
                console.log(result1)
              }
            })
          }
        })
       }
       },
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