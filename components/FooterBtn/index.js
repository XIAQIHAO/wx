// components/FooterBtn/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fixedBottomDistance:{
      type:Number,
      default:30
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    argeeStatus:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onHandlerConfirm(){
      if(!this.data.argeeStatus){
        return wx.showToast({
          title: '未同意协议',
          icon:'none'
        })
      }
      wx.showLoading({
        title: '升级中',
      })
      setTimeout(()=>{
        wx.hideLoading()
      },1000)
    },
    onHanderCheck(){
      this.setData({argeeStatus:!this.data.argeeStatus})
    } 
  }
})
