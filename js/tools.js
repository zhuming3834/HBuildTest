/*showAPI配置参数*/
var appid = "4954"
var sign = "d3aadb32265e4742bb6ec5804df06f35"
var baseUrl = "https://route.showapi.com/582-2?"


// 获取当前时间 yyyyMMddHHmmss
function getDataStr(){
	var date = new Date();
	var year = date.getFullYear();
	var mouth = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	if(mouth < 10){ /*月份小于10  就在前面加个0*/
		mouth = String(String(0) + String(mouth));
	}
	if(day < 10){ /*日期小于10  就在前面加个0*/
		day = String(String(0) + String(day));
	}
	if(hour < 10){ /*时小于10  就在前面加个0*/
		hour = String(String(0) + String(hour));
	}  
	if(minute < 10){ /*分小于10  就在前面加个0*/
		minute = String(String(0) + String(minute));
	}
	if(second < 10){ /*秒小于10  就在前面加个0*/
		second = String(String(0) + String(second));
	}
	
	var currentDate = String(year) + String(mouth) + String(day) + String(hour) + String(minute) + String(second);
	console.log('currentDate = ' + currentDate);
	return currentDate;
}