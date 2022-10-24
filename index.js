const STORAGE_KEY_ONLY = 'ADD-APPLET-TIME-ONLY';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 提示文字
    text: {
      type: String,
      value: '「添加小程序」访问更便捷!'
    },
    // 是否需要缓存
    isCache: {
      type: Boolean,
      value: true
    },
    // 缓存时间 (单位小时)
    time: {
      type: Number | String,
      value: 7
    },
    // 自动关闭时间 (单位秒)
    // 如果没有传入 或 为 0 就默认不自动隐藏
    delay: {
      type: Number | String,
      value: 0
    },
    // 是否是自定义导航栏
    customNav: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    SHOW_TOP: false,
    SHOW_TOP_key: 1,
    marRight: 66
  },
  ready: function () {
    this.initTips();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initTips: function () {
      // 判断是否已经显示过
      let cacheOne = wx.getStorageSync(STORAGE_KEY_ONE);
      const now = +new Date();
      // 校验缓存数据 以及缓存时间是否过期(关闭后缓存一周，一周后重新提示用户)
      if (cacheOne && (now - cacheOne < Number(this.properties.time) * 24 * 3600000) && this.properties.isCache) return;
      // 处理根据系统信息处理位移箭头位置（重点）
      let systemInfo = wx.getSystemInfoSync();
      let client = wx.getMenuButtonBoundingClientRect();
      if (systemInfo && client) {
        this.setData({
          marRight: systemInfo.screenWidth - client.left - 28,
          marTop: this.getMarTop(client)
        });
      }
      // 没显示过，则进行展示
      this.setData({
        SHOW_TOP: true
      });
      this.timingClose()
    },
    // 获取距离顶部的距离
    getMarTop (client) {
      if(this.properties.customNav) {
        return client.height + client.top + 5
      } else {
        return 0
      }
    },
    // 显示全屏添加说明
    showModal: function () {
      this.setData({
        SHOW_TOP: false,
      });
    },
    // 定时关闭
    timingClose() {
      // 如果没有传入 或 为 0 就默认不自动隐藏
      if(!this.properties.delay || this.properties.delay == 0) return
      setTimeout(() => {
        this.okHandler()
      }, Number(this.properties.delay) * 1000)
    },
    // 关闭右上角提示
    okHandler: function () {
      this.setData({
        SHOW_TOP: false
      });
      wx.setStorage({
        STORAGE_KEY_ONLY,
        data: + new Date,
      });
    }
  }
})