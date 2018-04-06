var tencentyoutuyun = require('..');
var conf  = tencentyoutuyun.conf;
var youtu = tencentyoutuyun.youtu;
var config = require('config');


// 设置开发者和应用信息, 请填写你在开放平台
var appid = config.get('tencentyoutuyun.appid');
// console.log(appid);
var secretId = config.get('tencentyoutuyun.secretId');
var secretKey = config.get('tencentyoutuyun.secretKey');
var userid = config.get('tencentyoutuyun.userid');
conf.setAppInfo(appid, secretId, secretKey, userid, 0)

var imgBase =  config.get('tencentyoutuyun.imgBase');
// console.log(imgBase);
//youtu.imageporn('a1.jpg', function(data){
//    console.log("imagetag:" + JSON.stringify(data));
//});

//youtu.idcardocr('a.jpg', 0, function(data){
//    console.log("idcardocr:" + JSON.stringify(data));
//});
//使用本地图片也可
var imgUrl = '1497688456193.jpg';
// //'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512385991343&di=16c8bb3867a62bf8cfc61f1c2fbafd89&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F75%2F96%2F01T58PICxAk.jpg';
// youtu.generalocr(imgUrl, function(data){
//    console.log("generalocr:" + JSON.stringify(data));
// });

youtu.imagetag(imgUrl, function(data){
   console.log("imagetag:" + JSON.stringify(data));
});

// 其他接口 类似
var AWS = require('aws-sdk');
var express = require('express');
var app = express();
var MD5 = function (string) {
  
    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
  
    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
  
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
  
    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };
  
    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };
  
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    };
  
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
  
    string = Utf8Encode(string);
  
    x = ConvertToWordArray(string);
  
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  
    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }
  
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
  
    return temp.toLowerCase();
}

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var dynamodb = new AWS.DynamoDB({region: 'us-east-2'});
AWS.config.update({region:'us-east-2'});
var docClient = new AWS.DynamoDB.DocumentClient();
mongoose.connect("mongodb://ytlala:ytlala@ds143608.mlab.com:43608/ytlala", { useMongoClient: true });
var ZmImg = mongoose.model('ZmImg', { name: String ,nickName: String,
  zm_name: String,
  zm_type: String,
  zm_type_child:String,
  zm_price: Number,
  path: String ,
  is_ready: Number,
  detail: String,
  zan:{type:Number,default:0},
  commentId:String,
  created: {type:Date,default:Date.now}});

var AipOcrClient = require("baidu-aip-sdk").ocr;
var superagent = require("superagent");

// 设置APPID/AK/SK
var APP_ID = "10482809";
var API_KEY = "hm8haULwsfRjNpnt4Bx7PBvH";
var SECRET_KEY = "9sUK3Dx72IwqchcZjGGUjOdYPM0Q17P4";


    function getJSON(url) {
    var promise = new Promise(function(resolve, reject){
        //在node js 服务端需要使用npm install xmlhttprequest 安装包后使用require引入xmlhttprequest，浏览器端可以直接使用，无需引入
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;//浏览器端无需这句
        //var xhr = new XMLHttpRequest();
        var client = new XMLHttpRequest();
        console.log('url: ' + url);

        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

        function handler() {
        if (this.readyState !== 4) {
            return;
        }
        if (this.status === 200) {
            console.log(this);
            //console.log(this.response);

            //resolve(this.response);
            resolve(this.responseText);//微信token使用responseText
        } else {
            reject(new Error(this.statusText));
        }
        };
    });

    return promise;
    };


var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
// url作为参数识别远程图片
// client.generalEnhanceUrl('http://x.x.com/x.jpg', {detect_direction: true}).then(function(result) {
//     console.log(JSON.stringify(result));
// });
//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   //console.log("Cookies: ", req.cookies);
   res.end("hello" );
});

app.get('/ocr_upload', function (req, res) {

   console.log('get'); 
   // var sreq = superagent.get("http://ytlala.top");
   // sreq.pipe(res);
   // sreq.on('end', function(err, res1){
   //          if (err) {
   //              //do something
   //          } else {
   //              // res.end('3');
   //          }
   // });


});
var querystring = require("querystring");

var http = require("http");
function translate(query, callback) {
    var appid = '2015063000000001';
    var key = '12345678';
    var salt = (new Date).getTime();
    // var query = '月の見ていた話十四夜';
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'auto';
    var to = 'zh';
    var str1 = appid + query + salt +key;
    var sign = MD5(str1);
    // var params = {
    //         from: 'auto',
    //         to: 'zh',
    //         query: query
    //     },
    // 'http://api.fanyi.baidu.com/api/trans/vip/translate',
    var params = {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
        },
        data = querystring.stringify(params);
        options = {
            host: 'api.fanyi.baidu.com',
            port: 80,
            path: '/api/trans/vip/translate',
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        };

    var req = http.request(options, function(res) {
        var result = '';

        res.setEncoding('utf8');
        res.on('data', function(data) {
            result += data;
        });
        res.on('end', function() {
        	console.log(result);
            var obj = JSON.parse(result),
                str = obj.trans_result[0].dst;

            // str = str.replace(/\"/g, '');
            // str = str.toLowerCase().split(' ').join('_');
            console.log(str);
            callback(str);
        });

    });

    req.on('error', function(err) {
        console.log(err);
        setTimeout(function() {
            translation(query, callback);
        }, 3000);
    });

    req.write(data);
    req.end();

}
// function translate(query, callback) {

//     var params = {
//             from: 'en',
//             to: 'zh',
//             query: query
//         },
//         data = querystring.stringify(params);
//         options = {
//             host: 'fanyi.baidu.com',
//             port: 80,
//             path: '/v2transapi',
//             method: 'POST',
//             headers: {
//                 'Content-Type':'application/x-www-form-urlencoded',
//                 'Content-Length': data.length
//             }
//         };

//     var req = http.request(options, function(res) {
//         var result = '';

//         res.setEncoding('utf8');
//         res.on('data', function(data) {
//             result += data;
//         });
//         res.on('end', function() {
        	
//             var obj = JSON.parse(result),
//                 str = obj.trans_result.data[0].dst;
//             console.log(result);
//             str = str.replace(/\"/g, '');
//             str = str.toLowerCase().split(' ').join('_');
//             console.log(str);
//             callback(str);
//         });

//     });

//     req.on('error', function(err) {
//         console.log(err);
//         setTimeout(function() {
//             translation(query, callback);
//         }, 3000);
//     });

//     req.write(data);
//     req.end();

// }



var formidable = require('formidable');


app.get('/ip', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");//支持跨域请求
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    res.end(ip);
});

app.get('/ocr_upload2', function (req, res) {
   console.log('get'); 
   console.log(req.query.name); 
   var img_name = req.query.name;
   // var imgUrl = 'http://139.199.166.223/'+img_name;
    var imgUrl = 'http://139.199.166.223/upload_90682dcaea36c56bd585e4651f164909.jpg';
   	youtu.imagetag(imgUrl, function(data3){
   		try{
   			console.log(data3);
   			console.log("imagetag:" + JSON.stringify(data3.data.tags));
   			var tags = data3.data.tags;
   			var type = "猜不出";
   			if(tags.length>0){
   				type="我猜这是"+tags[0].tag_name+"，可能性为"+tags[0].tag_confidence;
   			}

			  youtu.generalocr(imgUrl, function(data2){
						   // console.log("generalocr:" + JSON.stringify(data2));
						   
						     	try{
									   var tx_ocr = "";
									   var items = data2.data.items;
									   if(!items||items.length==0){
										 //   	youtu.imagetag(imgUrl, function(data){
										 //   		try{
										 //   			console.log("imagetag:" + JSON.stringify(data));
										 //   		}catch(e){

										 //   		}
											   
											   
											// });
											
									   }else{
									   	 for(var j=0;j<items.length;j++){
									   		tx_ocr+=(items[j].itemstring+" ");//"\n"

									     }
									     
									     translate(tx_ocr,function(result){
									     	console.log("========"+result);
								            var json = {type:type,desc:"图上写的是："+tx_ocr,desc_change:"翻译大师："+result};
									        
									        res.send(json);
									        console.log("========"+result);
									     });
										// saveDymanoDb(img_name,tx_ocr);
										// var appid = '2015063000000001';
										// var key = '12345678';
										// var salt = (new Date).getTime();
										// var query = 'apple';
										// // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
										// var from = 'en';
										// var to = 'zh';
										// var str1 = appid + query + salt +key;
										// var sign = MD5(str1);
										// $.ajax({
										//     url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
										//     type: 'post',
										//     dataType: 'jsonp',
										//     data: {
										//         q: query,
										//         appid: appid,
										//         salt: salt,
										//         from: from,
										//         to: to,
										//         sign: sign
										//     },
										//     success: function (data) {
										//         console.log(data.trans_result[0].dst);
										//         var json = {type:"type",desc:tx_ocr,desc_change:data.trans_result[0].dst};
										//         res.send(json);
										//     } 
										// });
										// var data = {
										//         q: query,
										//         appid: appid,
										//         salt: salt,
										//         from: from,
										//         to: to,
										//         sign: sign
										//     };
								 	// 	superagent.post('http://api.fanyi.baidu.com/api/trans/vip/translate')
								  //       .send(data)
								  //       .set('header_key', 'header_value')
								  //       .end(function(err, res) {
								  //           if (err) {
								  //               console.log(err);
								  //           } else {
								  //               console.log(res);
								  //           }
								  //       })

									   }

								   	}catch(e){
								  		console.log(img_name+"err"+e);
								  	}
								 
				});


   		}catch(e){
   			console.log(img_name+"err"+e);
   		}
	   
	   
	});

 

    // var form = new formidable.IncomingForm();
    // form.uploadDir = "temp_dir";
    // form.keepExtensions = true;//保存后缀名
    // form.parse(req, function(err, fields, files) {
    //   res.writeHead(200, {'content-type': 'text/plain'});
    //   res.write('received upload:\n\n');
    //   console.log(fields);
    //   console.log(files);
    //   res.end(util.inspect({fields: fields, files: files}));
    //  });
});

 

	var server = app.listen(80, function () {

	  var host = server.address().address
	  var port = server.address().port

	  console.log("应用实例，访问地址为 http://%s:%s", host, port)

	});

  function generalocr(img_name,timeout){
  	setTimeout(function() {
         var imgUrl = 'http://ytlala.cc/'+img_name;
			//'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512385991343&di=16c8bb3867a62bf8cfc61f1c2fbafd89&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F75%2F96%2F01T58PICxAk.jpg';
			youtu.generalocr(imgUrl, function(data2){
			   // console.log("generalocr:" + JSON.stringify(data2));
			   // console.log(data2.data.items);

			     	try{
						   var tx_ocr = "";
						   var items = data2.data.items;
						   if(!items||items.length==0){

							   	youtu.imagetag(imgUrl, function(data){
							   		try{
							   			console.log("imagetag:" + JSON.stringify(data));
							   		}catch(e){

							   		}
								   
								   
								});
								
						   }else{
						   	 for(var j=0;j<items.length;j++){
						   		tx_ocr+=items[j].itemstring;

						     }
						     saveDymanoDb(img_name,tx_ocr);
						   }


					   	}catch(e){
					  		console.log(img_name+"err");
					  	}
					 
			});






  	}, timeout);
 

  }

 var table="hkwx_ocr";
  function saveDymanoDb(img_name,tx_ocr){

							var params1 = {
							  Item: {
							   "img_name": {
							     S: img_name
							    }, 
							   // "bd_ocr": {
							   //   S: "none"
							   //  }, 
							   "tx_ocr": {
							     S: tx_ocr
							    }
							  }, 
							  ReturnConsumedCapacity: "TOTAL", 
							  TableName: table
							 };
							 dynamodb.putItem(params1, function(err, data) {
							   if (err) console.log(err, err.stack); // an error occurred
							   else{
							   	    console.log(data);           // successful response
							   		bd_ocr(img_name);
							   }     
							   /*
							   data = {
							    ConsumedCapacity: {
							     CapacityUnits: 1, 
							     TableName: "Music"
							    }
							   }
							   */
							});
  }

  function query() {
    var skip = 100;
    var zmConditions = {is_ready:{$ne:0}};
    var sort={created:-1};
    ZmImg.find(zmConditions).skip(Number(skip)).limit(500).sort(sort).exec(function(err,data){

        var isOk=0;
        var result=[];
        if(data.length==0){
            return;
        }
        for(var i=0;i<data.length;i++){
            console.log(data[i].name);
            var img_name = data[i].name;
            generalocr(img_name,i*5000);//并发导致报错？
        }   
    });
}
// query();


var fs = require("fs");

// var server = http.createServer(function(req, res){}).listen(50082);
console.log("http start");

function bd_ocr(img_name){
	var url = "http://ytlala.cc/"+img_name;
	http.get(url, function(res){
	    var imgData = "";

	    res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开


	    res.on("data", function(chunk){
	        imgData+=chunk;
	    });

	    res.on("end", function(){
	        fs.writeFile("./"+img_name, imgData, "binary", function(err){
	            if(err){
	                console.log("down fail");
	            }else{
// var fs = require('fs');
// var image = fs.readFileSync('assets/OCR/general.jpg');
// var base64Img = new Buffer(image).toString('base64');/
	//直接使用imgData失败？
					var image = fs.readFileSync("./"+img_name);
					var base64Img = new Buffer(image).toString('base64');
					client.generalBasic(base64Img, {detect_direction: true}).then(function(result) {
					    console.log(JSON.stringify(result.words_result));
					    var words = result.words_result;
					    var str = "";
					    for(var i=0;i<words.length;i++){
					    	str+=words[i].words;
					    }
					    console.log(str);
					    if(str!=""){
					    	updateDynamodb(img_name,str);
					    }
					    

					});

	            						   //bd
						 //   // url作为参数识别远程图片
							// client.generalBasicUrl(imgUrl, {detect_direction: true}).then(function(result) {
							//     console.log(JSON.stringify(result));
							// });
							// return;	
	            	console.log("down success");
	            }
	            
	        });
	    });
	});

}

function updateDynamodb(img_name,bd_ocr){
	var params = {
		TableName:table,
		Key:{
			"img_name":img_name
		},
		UpdateExpression:"set bd_ocr = :r",
		ExpressionAttributeValues:{
			":r":bd_ocr
		},
		ReturnValues:"UPDATED_NEW"
	};
	docClient.update(params,function(err,data){
		if(err){
			console.log("update err"+JSON.stringify(err,null,2));
		}else{
			console.log("update succ"+JSON.stringify(data,null,2));
		}
	})
}



