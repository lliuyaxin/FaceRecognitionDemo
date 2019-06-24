var app = getApp()
Page({
  data: {
    phone: '',
    password: '',
    tempFilePathsA: "/assets/background5.jpg"
  },

  // 获取输入账号5
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
    app.globalData.personName = e.detail.value
  },

  // 登录 
  uploadimag() {
    var random = Date.parse(new Date()) + Math.ceil(Math.random() * 1000)

    var myThis = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '上传中...',
        });
        var tempFilePathsA = res.tempFilePaths[0]
        console.log(tempFilePathsA)
        myThis.setData({
          tempFilePathsA: res.tempFilePaths[0]
        });
        wx.cloud.init({
          env: 'facerecognition-383e34',
          traceUser: true
        });
        var uploadTask = wx.cloud.uploadFile({
          cloudPath: random + '.png',
          filePath: tempFilePathsA, // 文件路径
          success: res => {
            console.log(res.fileID)
            console.log(app.globalData.personName)
            console.log(app.globalData.personId)
            app.globalData.personId = random
            wx.cloud.callFunction({
              name: 'creatPerson',
              data: {
                fileID: res.fileID,
                personName: app.globalData.personName,
                personId: app.globalData.personId
              },
              success: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 500
                })

                myThis.setData({

                })

              },
            })
          },
          fail: err => {

          }
        })

      }
    })
  }
})