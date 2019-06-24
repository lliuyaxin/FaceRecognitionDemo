var app = getApp()
Page({
  data: {
    score: '',
    isTure: "",
    tempFilePathsA: "/assets/background6.jpg",
  },
  compare() {
    var random = Date.parse(new Date()) + Math.ceil(Math.random() * 1000)
    var myThis = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
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
              name: 'detectLiveFace',
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
                })
                if (res.result.Score > 87) {

                  myThis.setData({

                    isTure: "是"

                  });

                } else {

                  myThis.setData({

                    isTure: "否"

                  });

                }
              }
            })
          },
          fail: err => {

          }
        })

      }
    })
  }
})