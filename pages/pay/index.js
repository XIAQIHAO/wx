// pages/cart/index.js
import { getSetting,chooseAddress,openSetting,showTest} from '../../untils/WxAddress'
import runtime from '../../untils/runtime'

Page({
  /**
   * 页面的初始数据
   */
  data: {
        carts:[],
        price:"",
        num:"",
        address:{}

        
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let carts = wx.getStorageSync("cart")
    this.setData({
          carts
    })
    console.log(wx.getStorageSync("cart"))
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
      this.selected()
      let address = wx.getStorageSync('res');
      this.setData({
        address
      })
    
      
  },
  selected(){
    // 拿到数据并且渲染
    let carts = wx.getStorageSync("cart")
    //拿到已选的商品
    carts = carts.filter(v=>v.checked);
        // 遍历购物车把选择的商品的价钱和数量都算出来。
        let price =0,
            num = 0;
      carts.forEach((item,index,arr)=>{
        
  
               price+=item.goods_price*item.num;
               num+=item.num; 
        
          
      })
      this.setData({
        carts,
        price,
        num
  })
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  //计算总价与数量
  allprice(){
    let carts = wx.getStorageSync('cart');
    let price =0,
            num = 0;
      carts.forEach((item,index,arr)=>{
        
          if(item.checked){
               price+=item.goods_price*item.num;
               num+=item.num; 
          }
      })
      this.setData({
        carts,
        price,
        num
  })
  },
  
  //结算
 handpay(){
     

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