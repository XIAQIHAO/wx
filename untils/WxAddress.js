//获取权限
export const getSetting=()=>{
  wx.getSetting({
    success: (res) => {
      resolve(res)
    },
    fail:(err)=>{
      reject(err)
    }
  })
}

// 获取定位
export const chooseAddress = ()=>{
  wx.chooseAddress({
   success: (result) => {
    resolve(result)
  },
  fail:(err)=>{
    reject(err)
  }
 
  })
}

//诱导客户打开定位
export const openSetting = ()=>{
    wx.openSetting({
      success:(res1)=>{
        resolve(res1)
      },
      fail:(err)=>{
        reject(err)
      
      }
    })
}
 


