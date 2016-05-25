/*showAPI配置参数*/
var appid = "19297"
var sign = "56743e56cce6482eb499e0abb79a0c78"
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
	var currentDate = String(year) + String(mouth) + String(day) + String(hour) + String(minute) + String(second);
	return currentDate;
}