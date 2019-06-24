const cloud = require('wx-server-sdk') //小程序云开发SDK
const tencentcloud = require("tencentcloud-sdk-nodejs"); //腾讯云API 3.0 SDK
cloud.init() //云开发初始化
var synDetectFace = function (urlA, urlB) { //人脸识别API
  const IaiClient = tencentcloud.iai.v20180301.Client; //API版本
  const models = tencentcloud.iai.v20180301.Models; //API版本

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential("******", "******");//腾讯云API密钥的SecretId和SecretKey
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "iai.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new IaiClient(cred, "", clientProfile);

  let req = new models.CompareFaceRequest();

  let params = '{"UrlA":"' + urlA + '","UrlB":"' + urlB + '"}' //拼接参数
  req.from_json_string(params);
  return new Promise(function (resolve, reject) { //构造异步函数
    client.CompareFace(req, function (errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response);
      }
    })
  })
}


exports.main = async (event, context) => {
  var data = event
  var fileList = [data.fileID1, data.fileID2] //读取来自客户端的fileID

  var result = await cloud.getTempFileURL({
    fileList, //向云存储发起读取文件临时地址请求
  })
  var url0 = result.fileList[0].tempFileURL
  var url1 = result.fileList[1].tempFileURL
  datas = await synDetectFace(url0, url1) //调用异步函数，向腾讯云API发起请求
  return datas
}
