var app = getApp()
Page({
  data: {
    score: '',
    name: '',
    personid: '',
    flag: false,
    tempFilePathsA: "/assets/background3.jpg",
  },
  compare() {
    var random = Date.parse(new Date()) + Math.ceil(Math.random() * 1000)
    var myThis = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '分析中...',
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
            wx.cloud.callFunction({
              name: 'faceVerification',
              data: {
                fileID: res.fileID
              },
              success: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 500
                })

                myThis.setData({
                  score: res.result.Score,
                  name: res.result.PersonName,
                  personid: res.result.PersonId,
                  flag: false
                })

                if (res.result.Score <= 80) {
                  myThis.setData({
                    score: "",
                    name: "",
                    personid: "",
                    flag: true
                  });
                }

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
