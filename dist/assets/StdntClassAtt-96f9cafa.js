var q=Object.defineProperty;var U=(t,e,s)=>e in t?q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var p=(t,e,s)=>(U(t,typeof e!="symbol"?e+"":e,s),s);import"./@rive-app-23332047.js";import"./lodash-c398c9e4.js";import{h as W,s as Q,b as $,c as x,d as F,e as E,f as G,g as V,a as z}from"./TabMenu.vue_vue_type_style_index_0_scss_true_lang-0943e4ce.js";import{Q as J,H as K}from"./@ionic-9d55a180.js";import{_ as X,a as f}from"./index-40f8ec66.js";import"./dayjs-3dd13c04.js";import{S as Z}from"./StdntClassDetail-c921b049.js";import{B as tt,W as I}from"./@awesome-cordova-plugins-365971a8.js";import{G as P}from"./@capacitor-6a3f6ab0.js";import{S as et,a as y,n as st}from"./search-wifi-rcptn-hist-886e94a5.js";import{A as B,W as w}from"./wifi-rcptn-hist-c15daa6c.js";import{A as ot}from"./att_untact_cd-9f1735c2.js";import{v as r,J as l,C as n,I as h,P as D,N as m,F as C,L as nt,M as it,G as ct,H as at,r as N,A as Y,x as rt,y as H,z as L,u as M}from"./@vue-ba2132af.js";import"./@stencil-18a6d1f6.js";import"./vue-router-0104e6e6.js";import"./ionicons-2e812d46.js";import"./tslib-f1640d2e.js";import"./vuex-d57e3de0.js";import"./@vueuse-e4ab8daf.js";import"./axios-b6718f5e.js";import"./weekList-517d4bfd.js";import"./school-55a6434e.js";import"./calendar-43e64fc0.js";import"./rxjs-6f486a4b.js";const lt=(t,e,s,i)=>{const a=(i-e)*Math.PI/180,c=(s-t)*Math.PI/180,u=Math.sin(a/2)*Math.sin(a/2)+Math.cos(e*Math.PI/180)*Math.cos(i*Math.PI/180)*Math.sin(c/2)*Math.sin(c/2);return 6371*(2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u)))*1e3};class ht{constructor(){p(this,"ltBldgCd","");p(this,"ltrmCd","")}}class ut{constructor(){p(this,"ltBldgCd","");p(this,"ltrmCd","")}}class dt{constructor(){p(this,"openYr","");p(this,"openShtmCd","");p(this,"openOrgnClsfCd","");p(this,"openSust","");p(this,"openSbjtNo","");p(this,"ltStaffNo","")}}class T{constructor(){p(this,"ltBldgCd","");p(this,"ltrmCd","")}}const pt={name:"stdnt-class-regist",components:{IonBadge:J},data(){let t=["일","월","화","수","목","금","토"];return{gps:{lat:0,lot:0},scanOpt:{showFlipCameraButton:!0,prompt:"QR 코드를 영역에 맞춰 주세요.",resultDisplayDuration:0,formats:"QR_CODE"},network:{name:"",macAddress:""},qrData:{},startTime:"",endTime:"",now:{yearStr:new Date().getFullYear(),monthStr:(new Date().getMonth()+1).toString().padStart(2,"0"),dateStr:new Date().getDate().toString().padStart(2,"0"),dayStr:t[new Date().getDay()],hourStr:new Date().getHours().toString().padStart(2,"0"),minStr:new Date().getMinutes().toString().padStart(2,"0"),secStr:new Date().getSeconds().toString().padStart(2,"0")},dayStrArr:["일","월","화","수","목","금","토"],attChk:!1,quitChk:!1,cate:"",lectureInfo:{},searchUlsLtrmInfm:new ht,searchUlsLtrmDtl:new ut,ulsLtrmInfm:{},searchSbjtMng:new dt,lectureroomDetailList:[],hrStngDiv:0,detmHrDiv:0,classTime:!1,popupYn:!1,beaconPopupYn:this.$store.state.beaconPopup.visible,wifiCheck:!1,gpsCheck:!1,myLat:"",myLot:"",searchWifiRcptnHist:new et,seachBeaconRcptnHist:new T,searchAttHist:new W,untactCd:new ot,activeTabBtn:1,attLocRecord:{},latYn:!1,lotYn:!1,histList:[],beaconList:[],check:!1,qrCheck:!1,beaconAuthStatus:!1,codeCheck:!1,attTypeName:null,untactPopupYn:!1,checkDate:y().checkDate,yy:y().yy}},setup(){return{status1:Q,status2:$,status3:x,status4:F,status5:E,status6:G,status7:V}},mounted(){setInterval(()=>{this.now=st()},1e3)},watch:{"$store.state.stdnt.lectureInfo":function(){this.lectureInfo=this.$store.state.stdnt.lectureInfo,this.lectureInfo&&this.checkAtt()},"$store.state.accessPopup.showAccessPopup":function(){this.$store.state.accessPopup.showAccessPopup!==!0&&this.untactPopupYn===!1?this.checkGps():this.$store.state.accessPopup.showAccessPopup!==!0&&this.untactPopupYn===!0&&this.setProfsrParam()},"$store.state.accessPopup.update":function(){this.$store.state.accessPopup.update&&(this.checkAtt(),this.lectureInfo.attPrcsCdYn="Y",this.$store.commit("accessPopup/updateData",!1))},"$store.state.accessPopup.showCodeAttPopup":function(){this.$store.state.accessPopup.showCodeAttPopup||this.checkAtt()}},methods:{checkAtt(){this.searchAttHist.openYr=this.lectureInfo.openYy,this.searchAttHist.openShtmCd=this.lectureInfo.openShtmCd,this.searchAttHist.openOrgnClsfCd=this.lectureInfo.openOrgnClsfCd,this.searchAttHist.openDclss=this.lectureInfo.openDclss,this.searchAttHist.openSbjtNo=this.lectureInfo.openSbjtNo,this.searchAttHist.ltStaffNo=this.lectureInfo.staffNo,this.searchAttHist.stdNo=this.lectureInfo.stdNo,this.searchAttHist.attYmd=this.checkDate,this.lectureInfo.skpDt&&(this.searchAttHist.skltDt=this.lectureInfo.skpDt),this.searchWifiRcptnHist.openYr=this.lectureInfo.openYy,this.searchWifiRcptnHist.openShtmCd=this.lectureInfo.openShtmCd,this.searchWifiRcptnHist.openOrgnClsfCd=this.lectureInfo.openOrgnClsfCd,this.searchWifiRcptnHist.openDclss=this.lectureInfo.openDclss,this.searchWifiRcptnHist.openSbjtNo=this.lectureInfo.openSbjtNo,this.searchWifiRcptnHist.ltStaffNo=this.lectureInfo.staffNo,this.searchWifiRcptnHist.stdNo=this.lectureInfo.stdNo,this.searchWifiRcptnHist.attYmd=this.checkDate,this.lectureInfo.skpDt&&(this.searchWifiRcptnHist.skltDt=this.lectureInfo.skpDt),this.$store.dispatch("common/getAttendanceList",this.searchAttHist).then(t=>{if(t.data.resultData.length>0){this.network.macAddress=t.data.resultData[0].wifiIp,this.gps.lat=t.data.resultData[0].lat,this.gps.lot=t.data.resultData[0].lot,this.startTime=t.data.resultData[0].attPrcsDt;const e=t.data.resultData[0].attDiv;e==null?this.attTypeName="미출석":(this.attChk=!0,this.attTypeName=z(e).text)}this.$store.dispatch("common/getAttendanceRecordList",this.searchWifiRcptnHist).then(e=>{e.data.resultData.length>0&&(this.histList=e.data.resultData,e.data.resultData.forEach(s=>{s.wifiRcptnItem==="퇴실정보등록"?this.quitChk=!0:s.wifiRcptnItem==="중간출석"&&(this.attLocRecord=s)}))}),this.getLectureroomDetailList(),this.getLectureroomInfo(),this.getHrStngDiv()})},getLectureroomDetailList(){this.searchUlsLtrmDtl.ltBldgCd=this.lectureInfo.ltBldgCD,this.searchUlsLtrmDtl.ltrmCd=this.lectureInfo.ltrmCd,this.$store.dispatch("common/getLectureroomDetailList",this.searchUlsLtrmDtl).then(t=>{this.lectureroomDetailList=t.data.resultData})},getLectureroomInfo(){this.searchUlsLtrmInfm.ltBldgCd=this.lectureInfo.ltBldgCD,this.searchUlsLtrmInfm.ltrmCd=this.lectureInfo.ltrmCd,this.$store.dispatch("common/getLectureroomInfo",this.searchUlsLtrmInfm).then(t=>{this.ulsLtrmInfm=t.data.resultData,this.$store.commit("common/setUlsLtrmInfm",this.ulsLtrmInfm)})},getHrStngDiv(){this.searchSbjtMng.ltStaffNo=this.lectureInfo.staffNo,this.searchSbjtMng.openYr=this.lectureInfo.openYy,this.$store.dispatch("profsr/getSettingInfoList",this.searchSbjtMng).then(t=>{var e,s;if(t.data.resultData.length>0){const{resultData:i}=t.data,{openSbjtNo:o}=this.lectureInfo,a=i.filter(k=>k.openSbjtNo===o),c=(e=a[0])==null?void 0:e.hrStngDiv,u=(s=a[0])==null?void 0:s.detmHrDiv;c==="ULS55.30"||c===""||c===null?this.hrStngDiv=30:c==="ULS55.60"?this.hrStngDiv=60:this.hrStngDiv=30,u==="ULS56.10"||u===""||u===null?this.detmHrDiv=10:u==="ULS56.20"?this.detmHrDiv=20:u==="ULS56.30"?this.detmHrDiv=30:u==="ULS56.40"?this.detmHrDiv=40:this.detmHrDiv=10}else this.hrStngDiv=30,this.detmHrDiv=10;this.classTime=!0})},checkClassTime(){const t=this.lectureInfo.clsTm.split("~")[0].trim().split(":"),e=this.lectureInfo.clsTm.split("~")[1].trim().split(":"),s=new Date(this.now.yearStr,this.now.monthStr,this.now.dateStr,t[0],t[1],"00"),i=new Date(this.now.yearStr,this.now.monthStr,this.now.dateStr,e[0],e[1],"00"),o=new Date(this.now.yearStr,this.now.monthStr,this.now.dateStr,this.now.hourStr,this.now.minStr,"00");s.setMinutes(s.getMinutes()-this.hrStngDiv),i.setMinutes(i.getMinutes()-this.detmHrDiv),s<=o&&o<=i?this.classTime=!0:this.classTime=!1},getRegistData(t){this.cate=t,this.checkGps()},checkGps(){P.getCurrentPosition().then(t=>{this.myLat=t.coords.latitude.toString(),this.myLot=t.coords.longitude.toString();const e=[this.ulsLtrmInfm.lat1,this.ulsLtrmInfm.lat2,this.ulsLtrmInfm.lat3,this.ulsLtrmInfm.lat4,this.ulsLtrmInfm.lat5],s=[this.ulsLtrmInfm.lot1,this.ulsLtrmInfm.lot2,this.ulsLtrmInfm.lot3,this.ulsLtrmInfm.lot4,this.ulsLtrmInfm.lot5];for(let i=0;i<5;i++)lt(s[i],e[i],this.myLot,this.myLat)<=100&&(this.gpsCheck=!0);this.cate=="attendance"?tt.scan(this.scanOpt).then(i=>{i.text.length>0&&i.text===this.ulsLtrmInfm.ltrmCd?(this.qrCheck=!0,I.getConnectedSSID().then(o=>{this.network.name=o,I.getConnectedBSSID().then(a=>{this.lectureroomDetailList.forEach(c=>{c.macAddr.slice(0,14)===a.slice(0,14)&&(this.wifiCheck=!0),this.network.macAddress=a,this.check=!0}),this.setAttendance()})},o=>{console.log(o),this.network.name="",this.network.macAddress="",this.check=!0,this.setAttendance()})):(this.qrCheck=!1,f("강의실 QR 코드가 일치 하지 않습니다."),this.setAttendance())}):I.getConnectedSSID().then(i=>{this.network.name=i,I.getConnectedBSSID().then(o=>{switch(this.lectureroomDetailList.forEach(a=>{a.macAddr.slice(0,14)===o.slice(0,14)&&(this.wifiCheck=!0),this.network.macAddress=o}),this.cate){case"sendLoc":this.setAttendanceRecordParam("중간출석");break;case"quit":this.setAttendanceRecordParam("퇴실정보등록");break;case"code":this.$store.dispatch("stdnt/setAttCodeParam",this.setAttendance()),this.$store.commit("accessPopup/showCodeAttPopup",!0);break}})},i=>{switch(console.log(i),this.network.name="",this.network.macAddress="",this.cate){case"sendLoc":this.setAttendanceRecordParam("중간출석");break;case"quit":this.setAttendanceRecordParam("퇴실정보등록");break;case"code":this.$store.dispatch("stdnt/setAttCodeParam",this.setAttendance()),this.$store.commit("accessPopup/showCodeAttPopup",!0);break}})})},setAttendance(){const t=new B;if(t.openYr=this.lectureInfo.openYy,t.openShtmCd=this.lectureInfo.openShtmCd,t.openOrgnClsfCd=this.lectureInfo.openOrgnClsfCd,t.openSust=this.lectureInfo.openSust,t.openDclss=this.lectureInfo.openDclss,t.openSbjtNo=this.lectureInfo.openSbjtNo,t.ltStaffNo=this.lectureInfo.staffNo,t.stdNo=this.lectureInfo.stdNo,t.attYmd=this.checkDate,t.wifiNm=this.network.name,t.wifiIp=this.network.macAddress,t.lat=this.myLat,t.lot=this.myLot,t.attPrcsQrYn=this.qrCheck?"Y":"N",this.lectureInfo.skpDt&&(t.skltDt=this.lectureInfo.skpDt),this.cate==="code")return{attHist:t,wifiCheck:this.wifiCheck,gpsCheck:this.gpsCheck};this.$store.dispatch("common/setAttendance",t).then(e=>{this.att=e.data.resultData;const s=new w;s.openYr=this.att.openYr,s.openShtmCd=this.att.openShtmCd,s.openOrgnClsfCd=this.att.openOrgnClsfCd,s.openSust=this.att.openSust,s.attDiv=this.att.attDiv,s.openDclss=this.att.openDclss,s.openSbjtNo=this.att.openSbjtNo,s.ltStaffNo=this.att.ltStaffNo,s.stdNo=this.att.stdNo,s.attYmd=this.att.attYmd,s.wifiRcptnHr=this.now.hourStr+":"+this.now.minStr+":"+new Date().getSeconds(),s.wifiRcptnItem="출석정보등록",this.lectureInfo.skpDt&&(s.skltDt=this.lectureInfo.skpDt),t.attPrcsQrYn==="Y"?(s.result="QR코드 일치",s.attResult=!0,this.attChk=!0,this.lectureInfo.attPrcsQrYn="Y",this.lectureInfo.attDiv="ULS58.10"):(s.result="QR코드 불일치",s.attResult=!1),this.wifiCheck||this.gpsCheck?s.result+=" / 범위 내 수신":!this.wifiCheck&&!this.gpsCheck&&(s.result+=" / Wifi 또는 GPS 정보가 일치하지 않음"),this.startTime=this.att.attPrcsDt,this.gps.lat=this.att.lat,this.gps.lot=this.att.lot,this.network.macAddress=this.att.wifiIp,this.setAttendanceRecord(s)})},setAttendanceRecordParam(t){const e=new w;e.openYr=this.lectureInfo.openYy,e.openShtmCd=this.lectureInfo.openShtmCd,e.openOrgnClsfCd=this.lectureInfo.openOrgnClsfCd,e.openSust=this.lectureInfo.openSust,e.openDclss=this.lectureInfo.openDclss,e.openSbjtNo=this.lectureInfo.openSbjtNo,e.ltStaffNo=this.lectureInfo.staffNo,e.stdNo=this.lectureInfo.stdNo,e.attYmd=this.checkDate,e.wifiRcptnHr=this.now.hourStr+":"+this.now.minStr+":"+new Date().getSeconds(),e.wifiRcptnItem=t,this.lectureInfo.skpDt&&(e.skltDt=this.lectureInfo.skpDt),this.qrCheck?(e.result="QR코드 일치",e.attResult=!0):(e.attDiv="",e.result="QR코드 불일치",e.attResult=!1),this.wifiCheck||this.gpsCheck?e.result+=" / 범위 내 수신":!this.wifiCheck&&!this.gpsCheck&&(e.result+=" / Wifi 또는 GPS 정보가 일치하지 않음"),(t==="중간출석"||t==="퇴실정보등록")&&(e.result=""),this.setAttendanceRecord(e)},setAttendanceRecord(t){this.$store.dispatch("common/setAttendanceRecord",t),this.checkAtt(),this.cate=="attendance"&&t.attResult&&f("출석 정보 등록이 완료되었습니다."),this.cate=="sendLoc"&&f("중간 출석 정보 등록이 완료되었습니다."),this.cate=="quit"&&f("퇴실 정보 등록이 완료되었습니다.")},untactAtt(){this.classTime?this.popupYn?this.setProfsrParam():(this.popupYn=!0,this.untactPopupYn=!0,this.$store.commit("accessPopup/showAccessPopup",!0)):f("출석, 퇴실 정보 등록 가능한 시간이 아닙니다.")},dateFormat(t){return t.slice(0,4)+"."+t.slice(4,6)+"."+t.slice(6,8)},setProfsrParam(){const t={lat:"",lot:"",ssid:"",macAddr:""};P.getCurrentPosition().then(e=>{t.lat=e.coords.latitude.toString(),t.lot=e.coords.longitude.toString(),I.getConnectedSSID().then(s=>{t.ssid=s,I.getConnectedBSSID().then(i=>{t.macAddr=i,this.$store.dispatch("stdnt/setProfsrCodeParam",t).then(this.$store.commit("accessPopup/showAlert",!0))})},s=>{console.log(s),this.$store.dispatch("stdnt/setProfsrCodeParam",t).then(this.$store.commit("accessPopup/showAlert",!0))})})},setBeacon(t){if(this.cate=t,this.isBeacon=!0,this.lectureInfo.bcEquipYn!=="1"){f("비콘이 설치된 강의실이 아닙니다.");return}this.classTime?this.getBeaconList():f("출석, 퇴실 정보 등록 가능한 시간이 아닙니다.")},async getBeaconList(){if(!this.lectureroomDetailList.length)return f("강의실 정보가 없습니다.\n강의실 정보를 다시 확인해주세요.");const t=new T;t.ltrmCd=this.lectureroomDetailList[0].ltrmCd,t.ltBldgCd=this.lectureroomDetailList[0].ltBldgCd;try{this.toggleBeaconPopup(!0),this.beaconPopupYn=!0,await this.$store.dispatch("common/getBeaconList",t).then(e=>{const{resultCode:s,resultMsg:i,resultData:o}=e.data;if(s!==200){f(i);return}if(!o.length){f("비콘 정보가 없습니다."),this.toggleBeaconPopup(!1);return}this.startBeaconMonitoring(o),console.log(e.data.resultData,"res!!!")})}catch(e){console.log(e)}},beaconAttendance({rssi:t="",bcDist:e=""}){const s=new B;s.openYr=this.lectureInfo.openYy,s.openShtmCd=this.lectureInfo.openShtmCd,s.openOrgnClsfCd=this.lectureInfo.openOrgnClsfCd,s.openSust=this.lectureInfo.openSust,s.openDclss=this.lectureInfo.openDclss,s.openSbjtNo=this.lectureInfo.openSbjtNo,s.ltStaffNo=this.lectureInfo.staffNo,s.stdNo=this.lectureInfo.stdNo,s.attYmd=this.checkDate,s.wifiNm=this.network.name,s.wifiIp=this.network.macAddress,s.lat=this.myLat,s.lot=this.myLot,s.attPrcsBcYn=t!==""&&e!==""?"Y":"N",s.rssi=t,s.bcDist=e,this.$store.dispatch("common/setAttendance",s).then(i=>{this.att=i.data.resultData;const o=new w;o.openYr=this.att.openYr,o.openShtmCd=this.att.openShtmCd,o.openOrgnClsfCd=this.att.openOrgnClsfCd,o.openSust=this.att.openSust,o.openDclss=this.att.openDclss,o.openSbjtNo=this.att.openSbjtNo,o.ltStaffNo=this.att.ltStaffNo,o.stdNo=this.att.stdNo,o.attYmd=this.att.attYmd,o.wifiRcptnHr=this.now.hourStr+":"+this.now.minStr+":"+new Date().getSeconds(),o.wifiRcptnItem="출석정보등록",this.lectureInfo.skpDt&&(o.skltDt=this.lectureInfo.skpDt),!t&&!e?o.result="비콘정보 불일치":(o.result="비콘정보 일치",this.attChk=!0,this.lectureInfo.attPrcsBcYn="Y",this.lectureInfo.attDiv="ULS58.10"),o.attResult=!1,this.startTime=this.att.attPrcsDt,this.gps.lat=this.att.lat,this.gps.lot=this.att.lot,this.network.macAddress=this.att.wifiIp,this.setAttendanceRecord(o)})},beaconSendLoc({rssi:t="",bcDist:e=""}){console.log("beaconSendLoc");const s=new w;s.openYr=this.lectureInfo.openYy,s.openShtmCd=this.lectureInfo.openShtmCd,s.openOrgnClsfCd=this.lectureInfo.openOrgnClsfCd,s.openSust=this.lectureInfo.openSust,s.openDclss=this.lectureInfo.openDclss,s.openSbjtNo=this.lectureInfo.openSbjtNo,s.ltStaffNo=this.lectureInfo.staffNo,s.stdNo=this.lectureInfo.stdNo,s.attYmd=this.checkDate,s.wifiRcptnHr=this.now.hourStr+":"+this.now.minStr+":"+new Date().getSeconds(),s.rssi=t,s.bcDist=e,s.attPrcsBcYn=t!==""&&e!==""?"Y":"N",this.cate==="sendLoc"&&(s.wifiRcptnItem="중간출석"),this.cate==="quit"&&(s.wifiRcptnItem="퇴실정보등록"),this.lectureInfo.skpDt&&(s.skltDt=this.lectureInfo.skpDt),!t&&!e?s.result="비콘정보 불일치":(s.result="비콘정보 일치",this.lectureInfo.attPrcsBcYn="Y"),s.attResult=!1,this.setAttendanceRecord(s)},updateBeaconData(t){this.$store.dispatch("common/setBeaconInfo",t)},toggleBeaconPopup(t){this.$store.commit("beaconPopup/showbeaconPopupToggle",t)},startBeaconMonitoring(t){console.log("startBeaconMonitoring");var e=cordova.plugins.locationManager;e.enableBluetooth();let s=0;this.beaconAuthStatus;const i=new e.Delegate,o=this.cate;let a=this.setStopBeaconMonitoring,c=this.toggleBeaconPopup;const u=this.beaconAttendance,k=this.beaconSendLoc,b=this.lectureroomDetailList[0],j=this.updateBeaconData;i.didRangeBeaconsInRegion=function(d){var R;console.log("========================didRangeBeaconsInRegion========================"),console.log(JSON.stringify(d));let v=!1;t:for(let S in d.beacons)for(let _ in t)if(d.beacons[S].uuid.toLowerCase()===t[_].uuid.toLowerCase()&&d.beacons[S].major==t[_].major&&d.beacons[S].minor==t[_].minor){v=!0,s=(R=d.beacons[S])==null?void 0:R.battery,console.log("match");break t}else console.log("not match");if(v){b.battStat=s||s===0?s:"",j(b);let S="",_="";d.beacons.length&&(S=d.beacons[0].rssi,_=d.beacons[0].accuracy),o==="attendance"?u({rssi:S,bcDist:_}):k({rssi:S,bcDist:_}),a(t),c(!1),v=!1,f("비콘인증이 완료되었습니다."),clearTimeout(O)}},i.didStartMonitoringForRegion=d=>{console.log("========================didStartMonitoringForRegion========================"),console.log(JSON.stringify(d))},e.setDelegate(i);for(let d in t){var A=new e.BeaconRegion(d+1,t[d].uuid);e.startRangingBeaconsInRegion(A).fail(console.error).done(),e.startMonitoringForRegion(A).fail(console.error).done()}const O=setTimeout(()=>{if(!this.beaconAuthStatus)return this.stopBeaconMonitoring(t),this.toggleBeaconPopup(!1),f("비콘 인증에 실패하였습니다. \n강의실 정보를 확인하시거나 \n인증을 다시 시도해주세요")},1e4)},setStopBeaconMonitoring(t){console.log("setStopBeaconMonitoring");let e=cordova.plugins.locationManager;for(let s in t){let i=new e.BeaconRegion(s+1,t[s].uuid);e.stopRangingBeaconsInRegion(i).fail(console.error).done(),e.stopMonitoringForRegion(i).fail(console.error).done()}},stopBeaconMonitoring(t){console.log("stopBeaconMonitoring");let e=cordova.plugins.locationManager;const s={rssi:"",bcDist:""};this.cate==="attendance"?this.beaconAttendance(s):this.beaconSendLoc(s);for(let i in t){let o=new e.BeaconRegion(i+1,t[i].uuid);e.stopRangingBeaconsInRegion(o).fail(console.error).done(),e.stopMonitoringForRegion(o).fail(console.error).done()}},notAttendanceAelrt(){f("이미 출결 정보가 등록되었습니다.")}}},g=t=>(ct("data-v-17a77b59"),t=t(),at(),t),ft={style:{"margin-top":"40px"}},mt={class:"attendance--commute"},gt=g(()=>n("div",{class:"sub-title"},[n("span",null,"출석, 퇴실 정보 등록")],-1)),St={class:"commute__date"},_t={class:"time--zone"},Ct={class:"commute__tab"},It={class:"commute__table"},Dt={key:0,class:"commute__cell"},kt=g(()=>n("div",{class:"sub-title2"},[n("span",null,"출석정보 등록")],-1)),wt={key:0,class:"commute__complete"},bt={key:0,class:"attendance_check"},vt={key:1,class:"attendance_check"},Lt={key:2,class:"attendance_check"},At={key:1},Rt={key:2},Pt={key:1,class:"commute__cell"},yt=g(()=>n("div",{class:"sub-title2"},[n("span",null,"퇴실정보 등록")],-1)),Bt={key:0,class:"commute__complete",style:{height:"auto"}},Nt=g(()=>n("p",null,[C("퇴실정보 "),n("em",null,"등록이 완료"),C("되었습니다.")],-1)),Yt=[Nt],Ht={key:2,class:"commute__cell"},Mt=g(()=>n("div",{class:"sub-title2"},[n("span",null,"중간출석 등록")],-1)),Tt={class:"commute__location_state",style:{"margin-top":"0"}},jt={key:3,class:"commute__cell"},Ot=g(()=>n("div",{class:"sub-title2"},[n("span",null,"등록 된 출석정보")],-1)),qt={class:"cell__contents"},Ut=g(()=>n("strong",null,"무선AP Mac주소",-1)),Wt=g(()=>n("strong",null,"GPS 좌표",-1)),Qt=g(()=>n("strong",null,"시간",-1)),$t={class:"attendance--detail"},xt=g(()=>n("div",{class:"sub-title"},[n("span",null,"출결 상세정보")],-1)),Ft={class:"detail__time_table"},Et={border:"1"},Gt=g(()=>n("caption",null," 출결 상세정보 타임테이블 ",-1)),Vt=g(()=>n("colgroup",null,[n("col",{style:{width:"20%"}}),n("col",{style:{width:"30%"}}),n("col",{style:{width:"50%"}})],-1)),zt={scope:"row"},Jt={class:"correct"},Kt={key:0},Xt={key:1},Zt={class:"correct not"},te={key:0},ee=g(()=>n("tr",null,[n("th",{colspan:"3",class:"no-item"},"등록된 출결 정보가 없습니다.")],-1)),se=[ee];function oe(t,e,s,i,o,a){return r(),l("div",ft,[n("div",mt,[gt,n("div",St,[n("span",null,h(o.now.yearStr)+"."+h(o.now.monthStr)+"."+h(o.now.dateStr)+" ("+h(o.now.dayStr)+")",1),n("strong",_t,h(o.now.hourStr)+" : "+h(o.now.minStr)+" : "+h(o.now.secStr),1)]),n("div",Ct,[n("a",{class:D(["tab__button",{"is--on":o.activeTabBtn==1}]),onClick:e[0]||(e[0]=c=>o.activeTabBtn=1)},"출석등록",2),n("a",{class:D(["tab__button",{"is--on":o.activeTabBtn==3}]),onClick:e[1]||(e[1]=c=>o.activeTabBtn=3)},"중간출석",2),n("a",{class:D(["tab__button",{"is--on":o.activeTabBtn==2}]),onClick:e[2]||(e[2]=c=>o.activeTabBtn=2)},"퇴실등록",2)]),n("div",It,[o.activeTabBtn==1?(r(),l("div",Dt,[kt,o.attChk?(r(),l("div",wt,[n("p",null,[n("em",null,[o.lectureInfo.attPrcsCdYn==="Y"?(r(),l("span",bt,"출석코드")):m("",!0),o.lectureInfo.attPrcsBcYn==="Y"?(r(),l("span",vt,"비콘")):m("",!0),o.lectureInfo.attPrcsQrYn==="Y"?(r(),l("span",Lt,"QR코드")):m("",!0),C(" 등록이 완료 ")]),C(" 되었습니다. ")])])):m("",!0),o.lectureInfo.attDiv===null||o.lectureInfo.attDiv===""?(r(),l("div",At,[n("button",{class:"commute__link",onClick:e[3]||(e[3]=c=>a.getRegistData("attendance")),type:"button"}," QR 코드로 등록 "),n("button",{class:"commute__link",onClick:e[4]||(e[4]=c=>a.setBeacon("attendance")),type:"button"}," 비콘으로 등록 "),n("button",{class:"commute__link",onClick:e[5]||(e[5]=c=>a.untactAtt()),type:"button"}," 출석코드로 등록 ")])):(r(),l("div",Rt,[n("button",{class:"commute__link disabled",onClick:e[6]||(e[6]=c=>{a.notAttendanceAelrt()}),type:"button"}," QR 코드로 등록 "),n("button",{class:"commute__link disabled",onClick:e[7]||(e[7]=c=>{a.notAttendanceAelrt()}),type:"button"}," 비콘으로 등록 "),n("button",{class:"commute__link",onClick:e[8]||(e[8]=c=>a.untactAtt()),type:"button"}," 출석코드로 등록 ")]))])):m("",!0),o.activeTabBtn==2?(r(),l("div",Pt,[yt,o.quitChk?(r(),l("div",Bt,Yt)):m("",!0),o.quitChk?m("",!0):(r(),l("a",{key:1,class:"commute__link",onClick:e[9]||(e[9]=c=>a.getRegistData("quit"))},"퇴실정보 등록"))])):m("",!0),o.activeTabBtn==3?(r(),l("div",Ht,[Mt,n("p",Tt,[n("span",null,h(o.attLocRecord.openYr?"마지막 전송 : "+a.dateFormat(o.attLocRecord.attYmd)+" ("+o.attLocRecord.wifiRcptnHr+")":"전송기록이 없습니다."),1)]),n("a",{class:"commute__link",onClick:e[10]||(e[10]=c=>a.getRegistData("sendLoc"))},"중간출석 등록하기")])):m("",!0),o.attChk?(r(),l("div",jt,[Ot,n("ul",qt,[n("li",null,[Ut,C(" "+h(o.network.macAddress),1)]),n("li",null,[Wt,C(" "+h(o.gps.lat)+" / "+h(o.gps.lot),1)]),n("li",null,[Qt,C(" "+h(o.startTime),1)])])])):m("",!0)])]),n("div",$t,[xt,n("div",Ft,[n("table",Et,[Gt,Vt,n("tbody",null,[(r(!0),l(nt,null,it(o.histList,(c,u)=>(r(),l("tr",{key:u},[n("th",zt,h(c.wifiRcptnHr),1),n("td",Jt,h(c.wifiRcptnItem),1),n("td",null,[c.result?(r(),l("span",Kt,[n("span",{class:D(["correct",{not:c.result.includes("일치하지 않음")||c.result.includes("불일치")||c.result.includes("초과")}])},h(c.result),3)])):m("",!0),c.result?m("",!0):(r(),l("span",Xt,[n("span",Zt,h(c.result),1)]))])]))),128))]),o.histList.length<=0?(r(),l("tbody",te,se)):m("",!0)])])])])}const ne=X(pt,[["render",oe],["__scopeId","data-v-17a77b59"]]),ie={class:"attendance--page"},ce={class:"app_container"},ae={class:"attendance--class"},re={class:"class__head"},le=n("div",{class:"sub-title pt-top"},[n("span",null,"과목정보")],-1),Me={__name:"StdntClassAtt",setup(t){const e=N("cont"),s=N(!1);function i(){s.value=!s.value}return K(()=>{e.value.$el.scrollToPoint(0,0)}),(o,a)=>{const c=Y("ion-content"),u=Y("ion-page");return r(),rt(u,null,{default:H(()=>[L(c,{fullscreen:!0,ref_key:"cont",ref:e},{default:H(()=>[n("div",ie,[n("div",ce,[n("div",ae,[n("div",re,[le,n("button",{type:"button",class:D(["class__toggle",{"is--down":s.value}]),onClick:a[0]||(a[0]=k=>i())},"열고 접기",2)]),n("div",{class:D(["class__body",{"is--hidden":s.value}])},[L(M(Z))],2)]),L(M(ne),{ref:"regist"},null,512)])])]),_:1},512)]),_:1})}}};export{Me as default};