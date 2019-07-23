//index.js
//获取应用实例
import {translate} from '../../utils/api.js'; 
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curLang: {},
    showCloseIcon: false,
    queryContent: '',
    result: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('lonload..')
    console.log(options)
    if (options.queryContent) {
      this.setData({ queryContent: options.queryContent })
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
    if (this.data.curLang.lang !== app.globalData.curLang.lang){
      this.setData({curLang:app.globalData.curLang});
    }
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

  /**
   * 用户点击清除内容的处理函数
   */
  onTabClose: function(){
    this.setData({queryContent:'',showCloseIcon:false});
  },
  /**
   * 当用户输入时的监听函数
   */
  onInput: function(e){
    this.setData({queryContent: e.detail.value});
    this.setData({showCloseIcon: this.data.queryContent.length>0});
  },
  /**
   * confirm的处理函数，展示查询结果，并加入历史记录
   */
  onConfirm: function () {
    if (!this.data.queryContent) return
    translate(this.data.queryContent, { from: 'auto', to: this.data.curLang.lang }).then(res => {
      console.log(res.trans_result);
      this.setData({ 'result': res.trans_result })

      let history = wx.getStorageSync('history') || []
      history.unshift({ query: this.data.queryContent, result: res.trans_result[0].dst })
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  }
})
