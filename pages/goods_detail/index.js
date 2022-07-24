// pages/goods_detail/index.js
/*
1.请求数据
2.点击预览 调用微信内置方法
3.加入购物车
  1.绑定点击事件
  2.缓存购物车的数据
  2.判断是否加入过购物车

*/ 
Page({

  /**
   * 页面的初始数据
   */
  data: {
        goodList:[],
        curr:false,
        fail:'../../images/收藏1.png',
        suc:'../../images/收藏2.png',
        collect:[]
  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  let that = this
  this.setData({
    curr:false
  })
        const {goods_id} = options
        wx.showLoading({title: '加载中…'})
       wx.request({
         url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
         data:{goods_id},
         success:(res)=>{
              let collect = wx.getStorageSync('collect')||[];
              let goodList = res.data.message;
              console.log(goodList)
             let index =  collect.findIndex(item=>item.goods_id===goodList.goods_id)
             console.log(index)
             if(index == -1){
                  that.setData({
                    goodList
                  })
                  console.log("没有这个商品")
             }else{
                that.setData({
                  goodList:collect[index]
                  
                })
                console.log("有这个商品")
             }


                that.setData({
                  collect:collect
                })
               
      
         },
         complete:()=>{
          wx.hideLoading();
           that.setData({
             curr:true
           })
         }
       })
  },
//收藏
    selected(){
          let goodList = this.data.goodList;
          let collect = this.data.collect
          if(!goodList.current){
            goodList.current = true
            collect.push(goodList)
          }else{
            goodList.current = false;
            collect.pop(goodList)
          }
          this.setData({
              goodList,
              collect
          })
          wx.setStorageSync("collect",this.data.collect)
          console.log(this.data.collect)
        

        
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
  //预览图片
  btnclick(e){
     const urls = this.data.goodList.pics.map(v=>v.pics_mid);
     const pics = e.currentTarget.dataset.urls;
     wx.previewImage({
      urls,
      current: pics
     })
  },
  //加入购物车
  addshop(){
      let cart = wx.getStorageSync("cart")||[];
      let index =cart.findIndex(v=>v.goods_id===this.data.goodList.goods_id)
      //购物车为空
      if(index==-1){
          this.data.goodList.num = 1
          this.data.goodList.checked = true
          cart.push(this.data.goodList)

      }else{//已经加入购物车
          cart[index].num++
      }
//把购物车数据存入缓存中
      wx.setStorageSync('cart', cart);
      wx.showToast({
        title: '加入成功',    
        //防止用户手抖
        mask:true,
        icon:'success' 
      })
  },
  //跳转到购物车页面
  gocart(){
    wx.switchTab({
      url:"/pages/cart/index"
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