**【简介】**

&emsp;&emsp;这是利用微信小程序云开发设计的一款人脸识别小程序，主要包括五大功能模块：人脸属性检测、人脸信息对比、人脸认证、人脸信息录入和真人（活体）检测。其中，人脸属性模块能够判断出照片中人物的性别、年龄、表情、颜值、发长、刘海、发色等信息；人脸信息对比模块能够给出两张人脸照片的相似度，并判断两张照片是否为同一人；人脸信息录入模块可以将人脸信息录入人脸数据库；人脸认证模块能够判断当前输入照片是否在人脸数据库中；真人检测模块能够调用相机判断当前拍摄照片中人脸属于真人的置信度，并根据置信度判断是否为真人。

&emsp;&emsp;该微信小程序的设计主要包括云服务器端和微信小程序端两部分内容，其中云服务器负责处理来自小程序端的请求，通过调用腾讯云人脸识别相关api对小程序端传来的数据进行处理和分析，处理完成后将结果返回小程序端；微信小程序端主要负责获取图像数据同时使用云存储功能将数据存储到云端服务器中并通过调用后台服务器端的云函数来完成对数据的分析，最终将云函数返回结果显示在界面中。

&emsp;&emsp;下图是微信小程序的界面展示：


&emsp;&emsp;<image src='https://github.com/lliuyaxin/FaceRecognitionDemo/blob/master/images/封面.PNG'  width='200' height='350'>
&emsp;&emsp;&emsp;<image src='https://github.com/lliuyaxin/FaceRecognitionDemo/blob/master/images/人脸属性.PNG'  width='200' height='350' >
&emsp;&emsp;&emsp;<image src='https://github.com/lliuyaxin/FaceRecognitionDemo/blob/master/images/人脸对比.PNG'  width='200' height='350'>
  
  
&emsp;&emsp;<image src='https://github.com/lliuyaxin/FaceRecognitionDemo/blob/master/images/人脸认证.PNG'  width='200' height='350' >
&emsp;&emsp;&emsp;<image src='https://github.com/lliuyaxin/FaceRecognitionDemo/blob/master/images/信息录入.PNG'  width='200' height='350' >
&emsp;&emsp;&emsp;<image src='https://github.com/lliuyaxin/FaceRecognitionDemo/blob/master/images/真人检测.jpg'  width='200' height='350'>
  
&emsp;&emsp;下图是人员信息库：

&emsp;&emsp;<image src='https://github.com/lliuyaxin/FaceRecognitionDemo/blob/master/images/人员信息.PNG'  width='600' height='300'>














