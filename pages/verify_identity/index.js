Page({
  data: {
    verifyCodeSecond: 5,
    verifyCodePhone: '',
    verifyCodeCurrent: true,
    verifyCodeTips:true,
    verifyCodeLock:true,//使用锁防止重复请求
    keyboardHeight:40
  },
  // 监听输入验证码
  inputVerifyCode(e) {
    const { value: verifyCode } = e.detail
    if (verifyCode.length === 6) {
      this._sendVerifyCode()
    }
  },
  //获取验证码
  getVerifyCode() {
    if(this.data.verifyCodeLock){
      this.setData({verifyCodeLock:false})
      this._timerVerifyCode()
      this.setData({verifyCodeLock:true})      
    }
  },
  //发送验证码
  _sendVerifyCode() {
    let code = 2
    code === 1 && this._showModal('1111111','我知道了')
    code === 2 && this._showModal('2222222','卡号升级',()=>{
      console.log(123456)
    })
  },
  //60s倒计时
  _timerVerifyCode() {
    this.setData({verifyCodeCurrent: true})
    let vNodePromise = new Promise(reslove => {
      let vNodeTimer = setInterval(() => {
        this.setData({
          verifyCodeSecond: this.data.verifyCodeSecond - 1
        })
        if (this.data.verifyCodeSecond <= 0) {
          this.setData({
            verifyCodeCurrent: false,
            verifyCodeSecond: 5
          })
          reslove(vNodeTimer)
        }
      }, 1000)
    })
    vNodePromise.then(vNodeTimer => clearInterval(vNodeTimer))
  },
  // 模态弹窗
  _showModal(title,confirmText,success){
    wx.showModal({
      title,
      confirmText,
      showCancel:false,
      success
    })
  },
  getKeyboardHeight(e){
    this.setData({keyboardHeight:e.detail.height+20})
  },
  setKeyboardHeight(){
    this.setData({keyboardHeight:40})
  },
  onLoad: function (options) {
    this.setData({
      verifyCodePhone:options.phone
    })
    this.getVerifyCode()
  }
})