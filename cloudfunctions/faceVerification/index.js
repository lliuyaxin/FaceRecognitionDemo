const cloud = require('wx-server-sdk') //小程序云开发SDK
const tencentcloud = require("tencentcloud-sdk-nodejs"); //腾讯云API 3.0 SDK
cloud.init() //云开发初始化
var synDetectFace = function (url, personId) { //人脸识别API
  const IaiClient = tencentcloud.iai.v20180301.Client;
  const models = tencentcloud.iai.v20180301.Models;

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential("AKIDa5ThuYxSpBvcHluUmjaYTFqQ3BC9agFg", "PekjYEqLtLdnmaEj7NSQErJgxpiXDi1D");
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "iai.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new IaiClient(cred, "", clientProfile);

  let req = new models.VerifyFaceRequest();

  let params = '{"Url":"' + url + '","PersonId": "' + personId + '" }' //拼接参数
  req.from_json_string(params);


  return new Promise(function (resolve, reject) { //构造异步函数
    client.VerifyFace(req, function (errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response);
      }
    })
  })
}


var getPersonList = function () { //人脸识别API
  const IaiClient = tencentcloud.iai.v20180301.Client;
  const models = tencentcloud.iai.v20180301.Models;

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential("AKIDa5ThuYxSpBvcHluUmjaYTFqQ3BC9agFg", "PekjYEqLtLdnmaEj7NSQErJgxpiXDi1D");
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "iai.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new IaiClient(cred, "", clientProfile);

  let req = new models.GetPersonListRequest();

  let params = '{"GroupId":"17865196312"}'
  req.from_json_string(params);



  return new Promise(function (resolve, reject) { //构造异步函数
    client.GetPersonList(req, function (errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response);
      }
    })
  })
}

exports.main = async (event, context) => {

  const data = event
  const fileList = [data.fileID] //读取来自客户端的fileID

  const result = await cloud.getTempFileURL({
    fileList, //向云存储发起读取文件临时地址请求
  })
  const url = result.fileList[0].tempFileURL

  information = await getPersonList()

  var similarity = new Array()

  var scoremax = 0

  var maxindex = 0

  for (var i = 0; i < information.PersonNum; i++) {

    datas = await synDetectFace(url, information.PersonInfos[i].PersonId) //调用异步函数，向腾讯云API发起请求

    similarity.push(datas.Score)

  }

  scoremax = similarity[0];

  for (var j = 0; j < information.PersonNum; j++) { //循环数组

    if (scoremax <= similarity[j]) {

      scoremax = similarity[j];

      maxindex = j;

    }

  }

  return {
    PersonName: information.PersonInfos[maxindex].PersonName,
    PersonId: information.PersonInfos[maxindex].PersonId,
    Score: similarity[maxindex]
  }
}