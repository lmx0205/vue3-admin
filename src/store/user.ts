import { defineStore } from 'pinia'
import { getLocalStore, removeLocalStore } from '@/utils/basic'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: getLocalStore('Token') || ''
    }
  },
  getters: {
    GET_TOKEN: state => state.token
  },
  actions: {
    // 登录
    onLogin (userInfo: any) {
      // const encryptedPassword = userInfo.password;
      // const encryptedUserName = userInfo.user;
      return new Promise((resolve, reject) => {
        // login(encryptedUserName, encryptedPassword).then( (response:any) => {
        //   this.token = response.data
        //   setLocalStore("Token", response.data)
        //   resolve(response)
        // }).catch((error:any) => {
        //   reject(error)
        // })
        resolve('成功')
      })
    },
    // 退出
    onLogout () {
      removeLocalStore('galleryList')
      removeLocalStore('userInfo')
      // const token = getLocalStore('Token')
      return new Promise((resolve, reject) => {
        // logout(token).then((response:any) => {
        //   removeLocalStore('Token')
        //   this.userInfo = null
        //   resolve(response)
        // }).catch((error:any) => {
        //   reject(error)
        // })
        resolve('成功')
      })
    }
  }
})
