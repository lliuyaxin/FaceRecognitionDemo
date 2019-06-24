Page({
  data: {
    age: null,
    glasses: null,
    beauty: null,
    mask: null,
    hat: null,
    gender: null,
    hair_length: null,
    hair_bang: null,
    hair_color: null,
    expression: null,
    eyeopen: null,
    image_src: "/assets/background.jpg",
  },
  UploadImage() {
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
        var tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
        myThis.setData({
          image_src: res.tempFilePaths[0]
        });
        var uploadTask = wx.cloud.uploadFile({
          cloudPath: random + '.png',
          filePath: tempFilePaths, // 文件路径
          success: res => {
            console.log(res.fileID)
            wx.cloud.callFunction({
              name: 'faceAnalysis',
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
                  age: res.result.FaceInfos[0].FaceAttributesInfo.Age,
                  glasses: res.result.FaceInfos[0].FaceAttributesInfo.Glass,
                  beauty: res.result.FaceInfos[0].FaceAttributesInfo.Beauty,
                  mask: res.result.FaceInfos[0].FaceAttributesInfo.Mask,
                  hat: res.result.FaceInfos[0].FaceAttributesInfo.Hat,
                  expression: res.result.FaceInfos[0].FaceAttributesInfo.Expression,
                  eyeopen: res.result.FaceInfos[0].FaceAttributesInfo.EyeOpen,
                })

                if (res.result.FaceInfos[0].FaceAttributesInfo.Gender < 50) {
                  myThis.setData({
                    gender: "女"
                  });
                } else {
                  myThis.setData({
                    gender: "男"
                  });
                }

                switch (res.result.FaceInfos[0].FaceAttributesInfo.Hair.Length) {
                  case 0:
                    myThis.setData({
                      hair_length: "光头"
                    });
                    break;
                  case 1:
                    myThis.setData({
                      hair_length: "短发"
                    });
                    break;
                  case 2:
                    myThis.setData({
                      hair_length: "中发"
                    });
                    break;
                  case 3:
                    myThis.setData({
                      hair_length: "长发"
                    });
                    break;
                  case 4:
                    myThis.setData({
                      hair_length: "绑发"
                    });
                    break;
                }
                switch (res.result.FaceInfos[0].FaceAttributesInfo.Hair.Bang) {
                  case 0:
                    myThis.setData({
                      hair_bang: "YES"
                    });
                    break;
                  case 1:
                    myThis.setData({
                      hair_bang: "NO"
                    });
                    break;
                }

                switch (res.result.FaceInfos[0].FaceAttributesInfo.Hair.Color) {
                  case 0:
                    myThis.setData({
                      hair_color: "黑色"
                    });
                    break;
                  case 1:
                    myThis.setData({
                      hair_color: "金色"
                    });
                    break;
                  case 2:
                    myThis.setData({
                      hair_color: "棕色"
                    });
                    break;
                  case 3:
                    myThis.setData({
                      hair_color: "灰白色"
                    });
                    break;
                }
              },
            })
          },
          fail: err => {
          }
        })
        uploadTask.onProgressUpdate((res) => {
          myThis.setData({
            progress: res.progress //上传进度
          })
        })
      }
    })
  },
  onLoad: function (options) {
    wx.cloud.init({
      env: 'facerecognition-383e34'
    })
  }
})