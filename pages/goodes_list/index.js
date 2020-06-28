// pages/goodes_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        Tabs:[
          {index:0,title:"综合",active:true},
          {index:1,title:"销量",active:false},
          {index:2,title:"价格",active:false},
        ],
        good_list:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pageSize:10
  },
  alltotal:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.id

      this.getgoods()
  },
  getgoods(){
    let that = this
    wx.showLoading({title: '加载中…'})
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      data:this.QueryParams,
      success:(res)=>{
      //获取总页数
        let total = res.data.message.total
        that.alltotal = Math.ceil(total/that.QueryParams.pageSize)
      that.setData({
        good_list:[...res.data.message.goods,...that.data.good_list]
      })

      },
      complete:()=>{
        wx.hideLoading()
      }
    })
  }
  ,
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
//子组件向父组件传递事件以及参数
  showcase(e){
        let ind = e.detail;
        let Tabs = this.data.Tabs
        Tabs.forEach((item,index)=>{
          index===ind?item.active=true:item.active=false;
        })
        this.setData({
            Tabs
        })
  },

  /*
  1.情趣数据时，获取总数量，页数=总数量/每页数量。
  2.触发滑动底部事件时，判断总页数是否等于当前页数
  3.有数据请求的参数页数+1，请求数据
  4.没有数据
  */ 
 //下拉到底部刷新数据
  onReachBottom(){
        if(this.QueryParams.pagenum>=this.alltotal){
             
            wx.showToast({
          title: '成功',
})
              wx.showToast({
                title: '没有数据了',
              })
              
        }else{
            this.QueryParams.pagenum++;
              this.getgoods()
              
        }
  },
  /*
下拉刷新页面
1.触发下拉事件  配置下拉选项
2.重置数组.
3.重置页码数
4.请求数据
 */
  onPullDownRefresh(){
        this.setData({
          good_list:[]
        })
        this.QueryParams.pagenum =1;
        this.getgoods();
        wx.stopPullDownRefresh()
  }
})


