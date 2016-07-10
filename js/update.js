var wgtVer=null;
function plusReady(){
    // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid,function(inf){
        wgtVer=inf.version;
        console.log("当前应用版本："+wgtVer);
    });
}
if(window.plus){
    plusReady();
}else{
    document.addEventListener('plusready',plusReady,false);
}

// 检测更新
// 实际项目中需要更换为自己服务器的地址
var checkUrl="http://demo.dcloud.net.cn/test/update/check.php";
function checkUpdate(){
    plus.nativeUI.showWaiting("检测更新...");
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        switch(xhr.readyState){
            case 4:
            plus.nativeUI.closeWaiting();
            if(xhr.status==200){
                console.log("检测更新成功："+xhr.responseText);
                var newVer=xhr.responseText;
                if(wgtVer&&newVer&&(wgtVer!=newVer)){
                    downWgt();  // 下载升级包
                }else{
                    plus.nativeUI.alert("无新版本可更新！");
                }
            }else{
                console.log("检测更新失败！");
                plus.nativeUI.alert("检测更新失败！");
            }
            break;
            default:
            break;
        }
    }
    xhr.open('GET',checkUrl);
    xhr.send();
}
// 下载wgt文件
// 实际项目中需要更换为自己服务器的地址
var wgtUrl="http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt";
function downWgt(){
    plus.nativeUI.showWaiting("下载wgt文件...");
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) { 
            console.log("下载wgt成功："+d.filename);
            plus.nativeUI.confirm("升级包下载完成，是否需要升级",function(e){
            		var sure = (e.index == 0) ? "Yes" : "No";
            		if (sure == 'Yes') {
            			installWgt(d.filename); // 安装wgt包
            		}
            })
        } else {
            console.log("下载wgt失败！");
            plus.nativeUI.alert("下载wgt失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
}
// 更新应用资源
function installWgt(path){
    plus.nativeUI.showWaiting("安装wgt文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        plus.nativeUI.alert("应用资源更新完成!\n点击确定按钮重启完成升级",function(){
            plus.runtime.restart();
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    });
}
/*
 * 差异化升级流程：
 * 1.启动app后在plusReady里面首先获取app版本
 * 2.检查服务器版本
 * 3.服务器版本大于本地app版本下载升级包，提示安装和升级
 * 4.服务器版本小于等于本地版本时，不做任何操作
 */