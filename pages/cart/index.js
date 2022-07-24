// pages/cart/index.js
import { getSetting,chooseAddress,openSetting,showTest} from '../../untils/WxAddress'
import runtime from '../../untils/runtime'
/*
1.获取用户的收货地址
  1.绑定点击事件
  2.调用小程序内置api 获取用户地址 wx.chooseAddress
2.获取用户对小程序所授予的状态  获取地址的权限 状态 scope
3.在onshow中 获取加入购物车中的数据并且渲染
4.全选按钮 反选
5.计算已选按钮的商品数量和价格
6.加减商品
7.删除商品
8.支付功能 判断是否有用户信息和商品信息
*/ 
Page({
  /**
   * 页面的初始数据
   */
  data: {
        carts:[],
        allchecked:false,
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
   async getadress(){
    // //1.获取权限的状态
    //   let res = await getSetting()
    //   let current = res.authSetting['scope.address'];
    //   if(current == true|| current == undefined){
    //       let res1 = await chooseAddress()
    //       console(res1)
    //   }
    //2. 判断权限状态
    try {
      let res = await getSetting()

      let current = res.authSetting['scope.address'];
      if(current == false){
        await openSetting();
      }
      let resulte = await chooseAddress();
      resulte.url = resulte.provinceName+resulte.cityName+resulte.countyName+resulte.detailInfo
      wx.setStorageSync('res',resulte)
    } catch (error) {
            console.log(error)
    }
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
    let carts = wx.getStorageSync("cart")||[]
    //拿到全选的状态
    let allchecked =carts.length==0?false:carts.every((item)=>item.checked)
        // 遍历购物车把选择的商品的价钱和数量都算出来。
        let price =0,
            num = 0;
      carts.forEach((item,index,arr)=>{
        
          if(item.checked){
               price+=item.goods_price*item.num;
               num+=item.num; 
          }else{
            allchecked = false  
          }
          
      })
      this.setData({
        carts,
        allchecked,
        price,
        num
  })
  },
  //单选
  checkboxChange(e){
    // 获取该商品的索引和checked点击前的状态
     let i = e.target.dataset.index;
     let carts = wx.getStorageSync("cart");
      if(carts[i].checked){
        carts[i].checked = false
      }else{
        carts[i].checked = true
      }
      wx.setStorageSync('cart',carts)
     this.selected();
  


  },
  // 全选
  allselect() {
     let current = this.data.allchecked;
     if(current){
       current = false
     }else{
       current = true
     }
     this.setData({
       allchecked:current
     })
     let carts = wx.getStorageSync('cart');
     let that = this;
     carts.forEach((item,index,arr)=>{
          arr[index].checked = that.data.allchecked
     })
     wx.setStorageSync('cart', carts)
     this.setData({
       carts
     })
     this.selected()
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
  //商品减
  delnum(e){
    let carts = wx.getStorageSync('cart');
        let index = e.target.dataset.index
        let num = carts[index].num
       if(num){
            num--
       }else{
        wx.showModal({
          title: '删除商品',
          content: '确定要删除该商品？',
          showCancel: true,//是否显示取消按钮
          cancelText:"否",//默认是“取消”
          cancelColor:'skyblue',//取消文字的颜色
          confirmText:"是",//默认是“确定”
          confirmColor: 'skyblue',//确定文字的颜色
          success:  (res)=> {
             if (res.cancel) {
                //点击取消,默认隐藏弹框
             } else {
                //点击确定
                carts.splice(index, 1),
                this.setData({
                  carts
                })
                wx.setStorageSync("cart",carts)
                if( this.data.carts.length==0){
                  this.setData({
                    allchecked:false
                  })
                }
             }
          },
       })
        

       }
       
       this.data.carts[index].num = num;
       wx.setStorageSync("cart",this.data.carts)
       this.allprice()
      
     
  },
  //商品增加
  addnum(e){
    let carts = wx.getStorageSync('cart');
        let index = e.target.dataset.index
        let num = carts[index].num
        num++;
        carts[index].num = num;
        wx.setStorageSync("cart",carts)
       this.setData({
         carts
       })
       this.allprice()

  },
  //结算
  async handpay(){
      const {address,carts,num} = this.data;
      if(!address.userName){
       await showTest({title:"您还没有选择收获地址"})
       return;
      }
      if(num===0){
        await showTest({title:"您还没有选购商品"})
        return;
      }
    //跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })

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