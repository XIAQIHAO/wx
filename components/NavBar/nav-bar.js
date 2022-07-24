// components/NavBar/n.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:{
        type:String,
        value:"腾讯大V卡"
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      navBarHeight:app.globalData.navBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
