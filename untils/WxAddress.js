//获取权限
export const getSetting=()=>{
      return new Promise((resolve, reject)=>{
        wx.getSetting({
          success: (res) => {
            resolve(res)
          },
          fail:(err)=>{
            reject(err)
          }
        })
      })
}

// 获取定位
export const chooseAddress = ()=>{
   return new Promise((resolve, reject)=>{
    wx.chooseAddress({
      success: (result) => {
       resolve(result)
     },
     fail:(err)=>{
       reject(err)
     }
    
     })
   })
}

//诱导客户打开定位
export const openSetting = ()=>{
   return new Promise((resolve, reject)=>{
    wx.openSetting({
      success:(res1)=>{
        resolve(res1) 
      },
      fail:(err)=>{
        reject(err)
      
      }
    })
   })
}

//弹框
export const showTest = ({title})=>{
  return new Promise((resolve, reject)=>{
      wx.showToast({
        title: title,
        icon:"none",
        success:(res)=>{
            resolve(res);
        },
        fail:(err)=>{
          reject(err) 
        }
      })
  })
}

//用户信息
export const getUserinfo = ()=>{
    return new Promise((resolve,reject)=>{
       wx.getUserInfo({
        success:(res)=>{
          resolve(res)
        },
        fail:(err)=>{
          reject(err)
        }
       })
    })
}
 


