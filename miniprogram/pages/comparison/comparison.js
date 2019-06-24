var app = getApp()

Page({

  data: {

    tempFilePathsA: '/assets/background1.jpg',
    tempFilePathsB: '/assets/background2.jpg',
    score: '',
    isTure: ''

  },

  onLoad: function () {

  },

  chooseimageA: function () {

    var myThis = this;

    wx.chooseImage({

      count: 1, // 默认9

      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有

      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: function (res) {



        var tempFilePathsA = res.tempFilePaths[0]

        console.log(tempFilePathsA)

        myThis.setData({

          tempFilePathsA: res.tempFilePaths[0]

        });

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        // _this.setData({

        //   tempFilePathsA: res.tempFilePaths

        // })

        var randomA = Date.parse(new Date()) + Math.ceil(Math.random() * 1000)

        wx.cloud.uploadFile({

          filePath: tempFilePathsA, // 文件路径

          cloudPath: randomA + '.png',

          success: res => {

            app.globalData.fileIDA = res.fileID

            console.log(app.globalData.fileIDA)

            myThis.setData({

              fileIDA: res.fileID

            });




          },
          fail: err => {

          }

        })

      }

    })

  },
  chooseimageB: function () {

    var myThis = this;

    wx.chooseImage({

      count: 1, // 默认9

      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有

      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: function (res) {



        var tempFilePathsB = res.tempFilePaths[0]

        console.log(tempFilePathsB)

        myThis.setData({

          tempFilePathsB: res.tempFilePaths[0]

        });

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        // _this.setData({

        //   tempFilePathsA: res.tempFilePaths

        // })

        var randomB = Date.parse(new Date()) + Math.ceil(Math.random() * 1000)

        wx.cloud.uploadFile({

          filePath: tempFilePathsB, // 文件路径

          cloudPath: randomB + '.png',

          success: res => {

            app.globalData.fileIDB = res.fileID

            console.log(app.globalData.fileIDB)

            myThis.setData({

              fileIDB: res.fileID

            });

          },
          fail: err => {

          }

        })

      }

    })

  },

  compare: function () {

    console.log(app.globalData.fileIDA)

    console.log(app.globalData.fileIDB)

    wx.showLoading({
      title: '对比中...',
    });

    var myThis = this;

    wx.cloud.callFunction({

      name: 'faceComparison',

      data: {

        fileID1: app.globalData.fileIDA,

        fileID2: app.globalData.fileIDB

      },
      success: res => {

        myThis.setData({

          score: res.result.Score

        })

        wx.hideLoading()
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 500
        })

        if (res.result.Score > 80) {

          myThis.setData({

            isTure: "是"

          });

        } else {

          myThis.setData({

            isTure: "否"

          });
        }

      },
      fail: err => {
      }

    })
  }


})
