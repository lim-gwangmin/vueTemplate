<template>
   <div style="margin-top:40px;">
       <div class="attendance--commute">
           <div class="sub-title"><span>출석, 퇴실 정보 등록</span></div>
           <div class="commute__date">
               <span>{{ now.yearStr }}.{{ now.monthStr }}.{{ now.dateStr }} ({{ now.dayStr }})</span>
               <strong class="time--zone">{{ now.hourStr }} : {{ now.minStr }} : {{ now.secStr }}</strong>
           </div>
           <div class="commute__tab">
               <a class="tab__button" :class="{ 'is--on': activeTabBtn == 1 }" @click="activeTabBtn = 1">출석등록</a>
               <a class="tab__button" :class="{ 'is--on': activeTabBtn == 3 }" @click="activeTabBtn = 3">중간출석</a>
               <a class="tab__button" :class="{ 'is--on': activeTabBtn == 2 }" @click="activeTabBtn = 2">퇴실등록</a>
           </div>
           <div class="commute__table">
               <div class="commute__cell" v-if="activeTabBtn == 1">
                   <div class="sub-title2"><span>출석정보 등록</span></div>
                   <div class="commute__complete" v-if="attChk">
                     <p>  
                        <em>
                           <span class="attendance_check" v-if="lectureInfo.attPrcsCdYn === 'Y' ">출석코드</span>
                           <span class="attendance_check" v-if="lectureInfo.attPrcsBcYn === 'Y' ">비콘</span>
                           <span class="attendance_check" v-if="lectureInfo.attPrcsQrYn  === 'Y' ">QR코드</span>
                        등록이 완료
                        </em>
                        되었습니다.
                     </p>
                   </div>
                   <div v-if="lectureInfo.attDiv === null || lectureInfo.attDiv === '' ">
                     <button class="commute__link" @click="getRegistData('attendance')" type="button">
                        QR 코드로 등록
                     </button>
                     <button class="commute__link" @click="setBeacon('attendance')" type="button">
                        비콘으로 등록
                     </button>
                     <button class="commute__link" @click="untactAtt()" type="button">
                        출석코드로 등록
                     </button>
                   </div>
                  <div v-else>
                     <button class="commute__link disabled" @click="notAttendanceAelrt();" type="button">
                        QR 코드로 등록
                     </button>
                     <button class="commute__link disabled" @click="notAttendanceAelrt();" type="button">
                        비콘으로 등록
                     </button>
                     <button class="commute__link" @click="untactAtt()" type="button">
                        출석코드로 등록
                     </button>
                  </div>
                  
                  <!-- <div v-if="lectureInfo.attendanceType === 'ULS59.10.10'">
                     <a class="commute__link" @click="untactAtt()">출석코드로 등록</a>
                  </div>
                  <div v-if="lectureInfo.attendanceType === 'ULS59.10.20'">
                     <a class="commute__link" @click="getRegistData('attendance')">QR 코드로 등록</a>
                  </div>
                  <div v-if="lectureInfo.attendanceType === 'ULS59.10.30'">
                     <a class="commute__link" @click="getRegistData('attendance')">QR 코드로 등록</a>
                     <a class="commute__link" @click="untactAtt()">출석코드로 등록</a>
                  </div>
                  <div v-if="lectureInfo.attendanceType === 'ULS59.10.40'">
                     <a class="commute__link" @click="getRegistData('attendance')">QR 코드로 등록</a>
                     <a class="commute__link" @click="setBeacon('attendance')">비콘으로 등록</a>
                  </div>
                  <div v-if="lectureInfo.attendanceType === 'ULS59.10.50'">
                     <a class="commute__link" @click="setBeacon('attendance')">비콘으로 등록</a>
                     <a class="commute__link" @click="untactAtt()">출석코드로 등록</a>
                  </div>
                  <div v-if="!lectureInfo.attendanceType || lectureInfo.attendanceType === 'null' || lectureInfo.attendanceType === 'ULS59.10.60'">
                     <a class="commute__link" @click="getRegistData('attendance')">QR 코드로 등록</a>
                     <a class="commute__link" @click="setBeacon('attendance')">비콘으로 등록</a>
                     <a class="commute__link" @click="untactAtt()">출석코드로 등록</a>
                  </div> -->
               </div>
               <div class="commute__cell" v-if="activeTabBtn == 2">
                   <div class="sub-title2"><span>퇴실정보 등록</span></div>
                   <div class="commute__complete" style="height: auto" v-if="quitChk">
                       <p>퇴실정보 <em>등록이 완료</em>되었습니다.</p>
                   </div>
                   <a class="commute__link" @click="getRegistData('quit')" v-if="!quitChk">퇴실정보 등록</a>
               </div>
      
               <div class="commute__cell" v-if="activeTabBtn == 3">
                  <div class="sub-title2"><span>중간출석 등록</span></div>
                  <p class="commute__location_state" style="margin-top:0;">
                     <span>{{ attLocRecord.openYr ? '마지막 전송 : ' + dateFormat(attLocRecord.attYmd) + ' (' + attLocRecord.wifiRcptnHr + ')' : '전송기록이 없습니다.' }}</span>
                  </p>
                  <a class="commute__link" @click="getRegistData('sendLoc')">중간출석 등록하기</a>
               </div>
               <div class="commute__cell" v-if="attChk">
                   <div class="sub-title2"><span>등록 된 출석정보</span></div>

                   <ul class="cell__contents">
                       <li>
                           <strong>무선AP Mac주소</strong>
                           {{ network.macAddress }}
                       </li>
                       <li><strong>GPS 좌표</strong> {{ gps.lat }} / {{ gps.lot }}</li>
                       <li>
                           <strong>시간</strong>
                           {{ startTime }}
                       </li>
                   </ul>
               </div>
           </div>
       </div>
       <div class="attendance--detail">
           <div class="sub-title">
               <span>출결 상세정보</span>
           </div>
           <div class="detail__time_table">
              <table border="1">
                 <caption>
                    출결 상세정보 타임테이블
                 </caption>
                 <colgroup>
                    <col style="width: 20%" />
                    <col style="width: 30%" />
                    <col style="width: 50%" />
                 </colgroup>
                 <tbody>
                    <tr v-for="(hist, i) in histList" :key="(hist, i)">
                       <th scope="row">{{ hist.wifiRcptnHr }}</th>
                       <td class="correct">{{ hist.wifiRcptnItem }}</td>
                       <td>
                           <span v-if="hist.result">
                              <span :class="['correct', { not: hist.result.includes('일치하지 않음') || hist.result.includes('불일치') || hist.result.includes('초과') }]">
                                 {{ hist.result }}
                              </span>
                           </span>  
                           <span v-if="!hist.result" >
                              <span class="correct not">
                                 {{ hist.result }}
                              </span>
                           </span>  
                       </td>
                    </tr>
                 </tbody>
                 <tbody v-if="histList.length <= 0">
                    <tr>
                       <th colspan="3" class="no-item">등록된 출결 정보가 없습니다.</th>
                    </tr>
                 </tbody>
              </table>
           </div>
       </div>
   </div>
</template>

<script>
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2';
import { Geolocation } from '@capacitor/geolocation';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';
import { distance } from '@/helper/gpsDistance';
import { nowDate } from '@/helper/nowDate';
import SearchUlsLtrmInfm from '@/model/search-uls-ltrm-infm';
import SearchUlsLtrmDtl from '@/model/search-uls-ltrm-dtl';
import SearchSbjtMng from '@/model/search-sbjt-mng';
import AttHist from '@/model/att-hist';
import WifiRcptnHist from '@/model/wifi-rcptn-hist';
import SeachBeaconRcptnHist from '@/model/search-beacon-rcptn-hist';
import SearchWifiRcptnHist from '@/model/search-wifi-rcptn-hist';
import SearchAttHist from '@/model/search-att-hist';
import { alertMsg } from '@/helper/alertMsg';
import AttUntactCd from '@/model/att_untact_cd';
import { auditDate } from '@/helper/auditDate';
import { attType } from '@/helper/attType';
import { IonBadge } from '@ionic/vue';
import status1 from '@/assets/img/icons/statusIcon_01.svg';
import status2 from '@/assets/img/icons/statusIcon_02.svg';
import status3 from '@/assets/img/icons/statusIcon_03.svg';
import status4 from '@/assets/img/icons/statusIcon_04.svg';
import status5 from '@/assets/img/icons/statusIcon_05.svg';
import status6 from '@/assets/img/icons/statusIcon_06.svg';
import status7 from '@/assets/img/icons/statusIcon_07.svg';

export default {
   name: 'stdnt-class-regist',
   components: { IonBadge },
   data() {
       let dayArr = ['일', '월', '화', '수', '목', '금', '토'];
       return {
         gps: { lat: 0, lot: 0 },
         scanOpt: {
            showFlipCameraButton: true, // iOS and Android
            prompt: 'QR 코드를 영역에 맞춰 주세요.', // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: 'QR_CODE', // default: all but PDF_417 and RSS_EXPANDED
         },
         network: { name: '', macAddress: '' },
         qrData: {},
         startTime: '',
         endTime: '',
         now: {
            yearStr: new Date().getFullYear(),
            monthStr: (new Date().getMonth() + 1).toString().padStart(2, '0'),
            dateStr: new Date().getDate().toString().padStart(2, '0'),
            dayStr: dayArr[new Date().getDay()],
            hourStr: new Date().getHours().toString().padStart(2, '0'),
            minStr: new Date().getMinutes().toString().padStart(2, '0'),
            secStr: new Date().getSeconds().toString().padStart(2, '0'),
         },
         dayStrArr: ['일', '월', '화', '수', '목', '금', '토'],
         attChk: false,
         quitChk: false,
         cate: '',
         lectureInfo: {},
         searchUlsLtrmInfm: new SearchUlsLtrmInfm(),
         searchUlsLtrmDtl: new SearchUlsLtrmDtl(),
         ulsLtrmInfm: {},
         searchSbjtMng: new SearchSbjtMng(),
         lectureroomDetailList: [],
         hrStngDiv: 0,
         detmHrDiv: 0,
         classTime: false,
         popupYn: false,
         beaconPopupYn: this.$store.state.beaconPopup.visible,
         wifiCheck: false,
         gpsCheck: false,
         myLat: '',
         myLot: '',
         searchWifiRcptnHist: new SearchWifiRcptnHist(),
         seachBeaconRcptnHist: new SeachBeaconRcptnHist(),
         searchAttHist: new SearchAttHist(),
         untactCd: new AttUntactCd(),
         activeTabBtn: 1,
         attLocRecord: {},
         latYn: false,
         lotYn: false,
         histList: [],
         beaconList: [],
         check: false, 
         qrCheck: false, // qr check
         beaconAuthStatus: false, // beacon check
         codeCheck: false,
         attTypeName: null,
         untactPopupYn: false,
         checkDate: auditDate().checkDate,
         yy: auditDate().yy,
       };
   },
   setup() {
     return {
        status1,
        status2,
        status3,
        status4,
        status5,
        status6,
        status7,
     }
   },  
   mounted() {
       setInterval(() => {
           this.now = nowDate();
       }, 1000);
   },
   watch: {
       '$store.state.stdnt.lectureInfo': function () {
           this.lectureInfo = this.$store.state.stdnt.lectureInfo;
           if (this.lectureInfo) {
               this.checkAtt();
           }
       },
       '$store.state.accessPopup.showAccessPopup': function () {
           if (this.$store.state.accessPopup.showAccessPopup !== true && this.untactPopupYn === false) {
               this.checkGps();
           } else if (this.$store.state.accessPopup.showAccessPopup !== true && this.untactPopupYn === true) {
               this.setProfsrParam();
               // this.$store.commit('accessPopup/showAlert', true)
           }
       },
       '$store.state.accessPopup.update': function () {
           if (this.$store.state.accessPopup.update) {
               this.checkAtt();
               this.lectureInfo.attPrcsCdYn = 'Y';
               this.$store.commit('accessPopup/updateData', false);
           }
       },
       '$store.state.accessPopup.showCodeAttPopup': function () {
           if (!this.$store.state.accessPopup.showCodeAttPopup) {
               this.checkAtt();
           }
       },
   },

   methods: {
       /* 등록된 출석, 퇴실 여부 확인 */
       checkAtt() {
           /* 출석 파라미터 */
           this.searchAttHist.openYr = this.lectureInfo.openYy;
           this.searchAttHist.openShtmCd = this.lectureInfo.openShtmCd;
           this.searchAttHist.openOrgnClsfCd = this.lectureInfo.openOrgnClsfCd;
           this.searchAttHist.openDclss = this.lectureInfo.openDclss;
           this.searchAttHist.openSbjtNo = this.lectureInfo.openSbjtNo;
           this.searchAttHist.ltStaffNo = this.lectureInfo.staffNo;
           this.searchAttHist.stdNo = this.lectureInfo.stdNo;
           this.searchAttHist.attYmd = this.checkDate;

           if (this.lectureInfo.skpDt) {
               this.searchAttHist.skltDt = this.lectureInfo.skpDt;
           }

           /* 출석 이력 파라미터 */
           this.searchWifiRcptnHist.openYr = this.lectureInfo.openYy;
           this.searchWifiRcptnHist.openShtmCd = this.lectureInfo.openShtmCd;
           this.searchWifiRcptnHist.openOrgnClsfCd = this.lectureInfo.openOrgnClsfCd;
           this.searchWifiRcptnHist.openDclss = this.lectureInfo.openDclss;
           this.searchWifiRcptnHist.openSbjtNo = this.lectureInfo.openSbjtNo;
           this.searchWifiRcptnHist.ltStaffNo = this.lectureInfo.staffNo;
           this.searchWifiRcptnHist.stdNo = this.lectureInfo.stdNo;
           this.searchWifiRcptnHist.attYmd = this.checkDate;

           if (this.lectureInfo.skpDt) {
               this.searchWifiRcptnHist.skltDt = this.lectureInfo.skpDt;
           }

           this.$store.dispatch('common/getAttendanceList', /*a*/ this.searchAttHist).then((r) => {
               if (r.data.resultData.length > 0) {
                     this.network.macAddress = r.data.resultData[0].wifiIp;
                     this.gps.lat = r.data.resultData[0].lat;
                     this.gps.lot = r.data.resultData[0].lot;
                     this.startTime = r.data.resultData[0].attPrcsDt;

                     const attDiv = r.data.resultData[0].attDiv;
                     if (attDiv == null) {
                        this.attTypeName = '미출석';
                     } else {
                        this.attChk = true;
                        this.attTypeName = attType(attDiv).text;
                     }
                  }
                  this.$store.dispatch('common/getAttendanceRecordList', /*b*/ this.searchWifiRcptnHist).then((d) => {
                     if (d.data.resultData.length > 0) {
                        this.histList = d.data.resultData;
                        d.data.resultData.forEach((item) => {

                              if (item.wifiRcptnItem === '퇴실정보등록') {
                                 this.quitChk = true;
                              } else if (item.wifiRcptnItem === '중간출석') {
                                 this.attLocRecord = item;
                              }
                        });
                     }
                  });
               /* 강의실 정보 및 수업시작 시간 정보 GET */
               this.getLectureroomDetailList();
               this.getLectureroomInfo();
               this.getHrStngDiv();
           });
       },

       /* WIFI Mac Address List */
       getLectureroomDetailList() {
           this.searchUlsLtrmDtl.ltBldgCd = this.lectureInfo.ltBldgCD;
           this.searchUlsLtrmDtl.ltrmCd = this.lectureInfo.ltrmCd;

           // this.searchUlsLtrmDtl.ltBldgCd = '203';
           // this.searchUlsLtrmDtl.ltrmCd = '016008';

           this.$store.dispatch('common/getLectureroomDetailList', this.searchUlsLtrmDtl).then((d) => {
               this.lectureroomDetailList = d.data.resultData;
           });
       },

       /* GPS lat lot Info*/
       getLectureroomInfo() {
           this.searchUlsLtrmInfm.ltBldgCd = this.lectureInfo.ltBldgCD;
           this.searchUlsLtrmInfm.ltrmCd = this.lectureInfo.ltrmCd;

           // this.searchUlsLtrmInfm.ltBldgCd = '203';
           // this.searchUlsLtrmInfm.ltrmCd = '016008';
           this.$store.dispatch('common/getLectureroomInfo', this.searchUlsLtrmInfm).then((d) => {
               this.ulsLtrmInfm = d.data.resultData;
               this.$store.commit('common/setUlsLtrmInfm', this.ulsLtrmInfm);
           });
       },

       /* 수업 시작 시간 Info */
       getHrStngDiv() {
           this.searchSbjtMng.ltStaffNo = this.lectureInfo.staffNo;
           this.searchSbjtMng.openYr = this.lectureInfo.openYy;
           this.$store.dispatch('profsr/getSettingInfoList', this.searchSbjtMng).then((d) => {
               if (d.data.resultData.length > 0) {
                  const { resultData } = d.data;
                  const { openSbjtNo } = this.lectureInfo;
                  const filterSbj = resultData.filter( arg => arg.openSbjtNo === openSbjtNo);

                  const hrStngDiv = filterSbj[0]?.hrStngDiv;
                  const detmHrDiv = filterSbj[0]?.detmHrDiv;

                  if (hrStngDiv === 'ULS55.30' || hrStngDiv === '' || hrStngDiv === null) {
                       this.hrStngDiv = 30;
                   } else if (hrStngDiv === 'ULS55.60') {
                        this.hrStngDiv = 60;
                   } else {
                      this.hrStngDiv = 30;
                   }

                   if (detmHrDiv === 'ULS56.10' || detmHrDiv === '' || detmHrDiv === null) {
                       this.detmHrDiv = 10;
                   } else if (detmHrDiv === 'ULS56.20') {
                       this.detmHrDiv = 20;
                   } else if(detmHrDiv === 'ULS56.30') {
                     this.detmHrDiv = 30;
                   } else if(detmHrDiv === 'ULS56.40') {
                     this.detmHrDiv = 40;
                   } else {
                     this.detmHrDiv = 10;
                   }

               } else {
                   this.hrStngDiv = 30;
                   this.detmHrDiv = 10;
               }

               // if (this.$store.state.signIn.isTestId) {
               //     this.classTime = true;
               // } else {
               //     this.checkClassTime();
               // }

               this.classTime = true;

           });
       },

       /* 출석 가능 시간 여부 확인 */
       checkClassTime() {
         const startTime = this.lectureInfo.clsTm.split('~')[0].trim().split(':');
         const endTime = this.lectureInfo.clsTm.split('~')[1].trim().split(':');
         const clsStrTime = new Date(this.now.yearStr, this.now.monthStr, this.now.dateStr, startTime[0], startTime[1], '00');
         const clsEndTime = new Date(this.now.yearStr, this.now.monthStr, this.now.dateStr, endTime[0], endTime[1], '00');
         const now = new Date(this.now.yearStr, this.now.monthStr, this.now.dateStr, this.now.hourStr, this.now.minStr, '00');

         /* 수업 시작 시간 설정 */
         clsStrTime.setMinutes(clsStrTime.getMinutes() - this.hrStngDiv);
         clsEndTime.setMinutes(clsEndTime.getMinutes() - this.detmHrDiv);
         if (clsStrTime <= now && now <= clsEndTime) {
            this.classTime = true;
         } else {
            this.classTime = false;
         }
       },

       /* 출석 등록 시작*/
       getRegistData(divide) {
           this.cate = divide;


           this.checkGps();

           return ;
           if (this.classTime) {
               /* 접근 권한 팝업 */
               if (this.popupYn) {
                   this.checkGps();
               } else {
                   this.popupYn = true;
                   this.$store.commit('accessPopup/showAccessPopup', true);
               }
           } else {
               alertMsg('출석, 퇴실 정보 등록 가능한 시간이 아닙니다.');
           }
       },

       /* gps 확인 */
       checkGps() {
           Geolocation.getCurrentPosition().then((p) => {
               this.myLat = p.coords.latitude.toString();
               this.myLot = p.coords.longitude.toString();

               const latList = [this.ulsLtrmInfm.lat1, this.ulsLtrmInfm.lat2, this.ulsLtrmInfm.lat3, this.ulsLtrmInfm.lat4, this.ulsLtrmInfm.lat5];
               const lotList = [this.ulsLtrmInfm.lot1, this.ulsLtrmInfm.lot2, this.ulsLtrmInfm.lot3, this.ulsLtrmInfm.lot4, this.ulsLtrmInfm.lot5];

               for (let i = 0; i < 5; i++) {
                  if (distance(lotList[i], latList[i], this.myLot, this.myLat) <= 100) {
                     this.gpsCheck = true;
                  } 
               }            

               if (this.cate == 'attendance') {
                   BarcodeScanner.scan(this.scanOpt).then((d) => {
                     if (d.text.length > 0 && d.text === this.ulsLtrmInfm.ltrmCd) {
                        this.qrCheck = true;
                        // this.$store.commit('stdnt/setCertification', {key: 'qr', value:true});

                        /* get wifi info */
                        WifiWizard2.getConnectedSSID().then(
                              (ssid) => {
                                 this.network.name = ssid;
                                 WifiWizard2.getConnectedBSSID().then((macAddr) => {
                                    this.lectureroomDetailList.forEach((item) => {
                                          if (item.macAddr.slice(0, 14) === macAddr.slice(0, 14)) {
                                             this.wifiCheck = true;
                                          }
                                          this.network.macAddress = macAddr;

                                          this.check = true;
                                    });
                                    this.setAttendance();
                                 });
                              },
                           (error) => {
                              console.log(error);
                              this.network.name = '';
                              this.network.macAddress = '';

                              this.check = true;
                              this.setAttendance();
                           }
                        );
                     } else {
                        this.qrCheck = false;
                        alertMsg('강의실 QR 코드가 일치 하지 않습니다.');
                        this.setAttendance();
                     }
                     /* 강의실 코드 확인 */
                  });
               } else {
                   /* get wifi info */
                   WifiWizard2.getConnectedSSID().then(
                       (ssid) => {
                           this.network.name = ssid;
                           WifiWizard2.getConnectedBSSID().then((macAddr) => {
                               this.lectureroomDetailList.forEach((item) => {
                                   if (item.macAddr.slice(0, 14) === macAddr.slice(0, 14)) {
                                       this.wifiCheck = true;
                                   }
                                   this.network.macAddress = macAddr;
                               });
                               switch (this.cate) {
                                 case 'sendLoc':
                                    this.setAttendanceRecordParam('중간출석');
                                    break;
                                 case 'quit':
                                    this.setAttendanceRecordParam('퇴실정보등록');
                                    break;
                                 case 'code':
                                    this.$store.dispatch('stdnt/setAttCodeParam', this.setAttendance());
                                    this.$store.commit('accessPopup/showCodeAttPopup', true);
                                    break;
                               }
                           });
                       },
                       (error) => {
                           console.log(error);
                           this.network.name = '';
                           this.network.macAddress = '';
                           switch (this.cate) {
                              case 'sendLoc':
                                 this.setAttendanceRecordParam('중간출석');
                                 break;
                              case 'quit':
                                 this.setAttendanceRecordParam('퇴실정보등록');
                                 break;
                              case 'code':
                                 this.$store.dispatch('stdnt/setAttCodeParam', this.setAttendance());
                                 this.$store.commit('accessPopup/showCodeAttPopup', true);
                                 break;
                           }
                       }
                   );
               }
           });
       },

       /* 출결 현황 등록 */
       setAttendance() {
         const attHist = new AttHist();
         attHist.openYr = this.lectureInfo.openYy;
         attHist.openShtmCd = this.lectureInfo.openShtmCd;
         attHist.openOrgnClsfCd = this.lectureInfo.openOrgnClsfCd;
         attHist.openSust = this.lectureInfo.openSust;
         attHist.openDclss = this.lectureInfo.openDclss;
         attHist.openSbjtNo = this.lectureInfo.openSbjtNo;
         attHist.ltStaffNo = this.lectureInfo.staffNo;
         attHist.stdNo = this.lectureInfo.stdNo;
         attHist.attYmd = this.checkDate;
      //   attHist.attDiv = this.attendanceFilter(this.lectureInfo); /* 출석코드 하드코딩 */
         attHist.wifiNm = this.network.name;
         attHist.wifiIp = this.network.macAddress;
         attHist.lat = this.myLat;
         attHist.lot = this.myLot;
         attHist.attPrcsQrYn = this.qrCheck ? 'Y' : 'N';

           if (this.lectureInfo.skpDt) {
               attHist.skltDt = this.lectureInfo.skpDt;
           }

           if (this.cate === 'code') {
               return { attHist, wifiCheck: this.wifiCheck, gpsCheck: this.gpsCheck };
           } else {
               /* 출석 등록 */
               this.$store.dispatch('common/setAttendance', attHist).then((d) => {
                  this.att = d.data.resultData;
                  /* 출석 이력 파라미터 */
                  const wifiRcptnHist = new WifiRcptnHist();
                  wifiRcptnHist.openYr = this.att.openYr;
                  wifiRcptnHist.openShtmCd = this.att.openShtmCd;
                  wifiRcptnHist.openOrgnClsfCd = this.att.openOrgnClsfCd;
                  wifiRcptnHist.openSust = this.att.openSust;
                  wifiRcptnHist.attDiv = this.att.attDiv;
                  wifiRcptnHist.openDclss = this.att.openDclss;
                  wifiRcptnHist.openSbjtNo = this.att.openSbjtNo;
                  wifiRcptnHist.ltStaffNo = this.att.ltStaffNo;
                  wifiRcptnHist.stdNo = this.att.stdNo;
                  wifiRcptnHist.attYmd = this.att.attYmd;
                  wifiRcptnHist.wifiRcptnHr = this.now.hourStr + ':' + this.now.minStr + ':' + new Date().getSeconds();
                  wifiRcptnHist.wifiRcptnItem = '출석정보등록';

                  if (this.lectureInfo.skpDt) {
                     wifiRcptnHist.skltDt = this.lectureInfo.skpDt;
                  }

                  if(attHist.attPrcsQrYn === 'Y') {
                     wifiRcptnHist.result = 'QR코드 일치'
                     wifiRcptnHist.attResult = true;
                     this.attChk = true;
                     this.lectureInfo.attPrcsQrYn = 'Y';
                     this.lectureInfo.attDiv = 'ULS58.10'
                  } else {
                     wifiRcptnHist.result = 'QR코드 불일치'
                     wifiRcptnHist.attResult = false;
                  }
 
                   if (this.wifiCheck || this.gpsCheck) {
                     wifiRcptnHist.result += ' / 범위 내 수신';
                     
                   } else if (!this.wifiCheck && !this.gpsCheck) {
                     wifiRcptnHist.result += ' / Wifi 또는 GPS 정보가 일치하지 않음';
                   }

                   /* 출결 등록 set info */
                   this.startTime = this.att.attPrcsDt;
                   this.gps.lat = this.att.lat;
                   this.gps.lot = this.att.lot;
                   this.network.macAddress = this.att.wifiIp;

                   this.setAttendanceRecord(wifiRcptnHist);
               });
           }
       },

      setAttendanceRecordParam(wifiRcptnItem) {
         const wifiRcptnHist = new WifiRcptnHist();
         wifiRcptnHist.openYr = this.lectureInfo.openYy;
         wifiRcptnHist.openShtmCd = this.lectureInfo.openShtmCd;
         wifiRcptnHist.openOrgnClsfCd = this.lectureInfo.openOrgnClsfCd;
         wifiRcptnHist.openSust = this.lectureInfo.openSust;
         wifiRcptnHist.openDclss = this.lectureInfo.openDclss;
         wifiRcptnHist.openSbjtNo = this.lectureInfo.openSbjtNo;
         wifiRcptnHist.ltStaffNo = this.lectureInfo.staffNo;
         wifiRcptnHist.stdNo = this.lectureInfo.stdNo;
         // wifiRcptnHist.attYmd = this.now.yearStr + this.now.monthStr + this.now.dateStr; /* '20210903' */
         wifiRcptnHist.attYmd = this.checkDate;
         wifiRcptnHist.wifiRcptnHr = this.now.hourStr + ':' + this.now.minStr + ':' + new Date().getSeconds();
         wifiRcptnHist.wifiRcptnItem = wifiRcptnItem;

         if (this.lectureInfo.skpDt) {
            wifiRcptnHist.skltDt = this.lectureInfo.skpDt;
         }
   
         if(this.qrCheck) {
            wifiRcptnHist.result = 'QR코드 일치'
            wifiRcptnHist.attResult = true;
         } else {
            wifiRcptnHist.attDiv = '';
            wifiRcptnHist.result = 'QR코드 불일치'
            wifiRcptnHist.attResult = false;
         };
         if (this.wifiCheck || this.gpsCheck) {
            wifiRcptnHist.result += ' / 범위 내 수신';
         } else if (!this.wifiCheck && !this.gpsCheck) {
            wifiRcptnHist.result += ' / Wifi 또는 GPS 정보가 일치하지 않음';
         }

         if( wifiRcptnItem === '중간출석' || wifiRcptnItem === '퇴실정보등록' ) {
            wifiRcptnHist.result = '';
         }

         this.setAttendanceRecord(wifiRcptnHist);
      },

       /* 출석 이력 등록 */
       setAttendanceRecord(wifiRcptnHist) {
           this.$store.dispatch('common/setAttendanceRecord', wifiRcptnHist);

           this.checkAtt();

            if (this.cate == 'attendance') {
               if(wifiRcptnHist.attResult) { 
                  // this.attChk = true;
                  alertMsg('출석 정보 등록이 완료되었습니다.');
               } 

            };

            if (this.cate == 'sendLoc') {
               alertMsg('중간 출석 정보 등록이 완료되었습니다.');
            };
            
            if (this.cate == 'quit') {
               alertMsg('퇴실 정보 등록이 완료되었습니다.');
            };
           
       },
       untactAtt() {
         if (this.classTime) {

            if (this.popupYn) {
                  this.setProfsrParam();
                  // this.$store.commit('accessPopup/showAlert', true)
            } else {
                  this.popupYn = true;
                  this.untactPopupYn = true;
                  this.$store.commit('accessPopup/showAccessPopup', true);
            }
         } else {
            alertMsg('출석, 퇴실 정보 등록 가능한 시간이 아닙니다.');
         }
       },
       dateFormat(time) {
           return time.slice(0, 4) + '.' + time.slice(4, 6) + '.' + time.slice(6, 8);
       },
       setProfsrParam() {
           const param = { lat: '', lot: '', ssid: '', macAddr: '' };
           Geolocation.getCurrentPosition().then((p) => {
               param.lat = p.coords.latitude.toString();
               param.lot = p.coords.longitude.toString();
               WifiWizard2.getConnectedSSID().then(
                   (ssid) => {
                       param.ssid = ssid;
                       WifiWizard2.getConnectedBSSID().then((macAddr) => {
                           param.macAddr = macAddr;
                           this.$store.dispatch('stdnt/setProfsrCodeParam', param).then(this.$store.commit('accessPopup/showAlert', true));
                       });
                   },
                   (error) => {
                       console.log(error);
                       this.$store.dispatch('stdnt/setProfsrCodeParam', param).then(this.$store.commit('accessPopup/showAlert', true));
                   }
               );
           });
       },
      setBeacon(divide) {  
         this.cate = divide;
         this.isBeacon = true;
         const bcEquipYn = this.lectureInfo.bcEquipYn;

         if(bcEquipYn !== '1') {
            alertMsg('비콘이 설치된 강의실이 아닙니다.');
            return;
         };

         if (this.classTime) {
            this.getBeaconList();
         } else {
            alertMsg('출석, 퇴실 정보 등록 가능한 시간이 아닙니다.');
         }
      },
      async getBeaconList() {
         if( !this.lectureroomDetailList.length ) return alertMsg('강의실 정보가 없습니다.\n강의실 정보를 다시 확인해주세요.');

         const beaconRcptnHist = new SeachBeaconRcptnHist();
         beaconRcptnHist.ltrmCd = this.lectureroomDetailList[0].ltrmCd;
         beaconRcptnHist.ltBldgCd = this.lectureroomDetailList[0].ltBldgCd;

         try {
            this.toggleBeaconPopup(true);
            this.beaconPopupYn = true;
            await this.$store.dispatch('common/getBeaconList', beaconRcptnHist)
            .then( res => {
               const { resultCode, resultMsg, resultData } = res.data;

               if( resultCode !== 200 ) {
                  alertMsg(resultMsg);
                  return;
               }

               if( !resultData.length ) {
                  alertMsg('비콘 정보가 없습니다.');
                  this.toggleBeaconPopup(false);
                  return;
               }
               
               this.startBeaconMonitoring(resultData);
               console.log(res.data.resultData,'res!!!');
            });
         } catch (error) {
            console.log(error);
         };
      },
      beaconAttendance({ rssi = '', bcDist = '' }) {
         // 출결 등록 업데이트
         const attHist = new AttHist();
         attHist.openYr = this.lectureInfo.openYy;
         attHist.openShtmCd = this.lectureInfo.openShtmCd;
         attHist.openOrgnClsfCd = this.lectureInfo.openOrgnClsfCd;
         attHist.openSust = this.lectureInfo.openSust;
         attHist.openDclss = this.lectureInfo.openDclss;
         attHist.openSbjtNo = this.lectureInfo.openSbjtNo;
         attHist.ltStaffNo = this.lectureInfo.staffNo;
         attHist.stdNo = this.lectureInfo.stdNo;
         attHist.attYmd = this.checkDate;
         // attHist.attDiv = this.attendanceFilter(this.lectureInfo); /* 출석코드 하드코딩 */
         attHist.wifiNm = this.network.name;
         attHist.wifiIp = this.network.macAddress;
         attHist.lat = this.myLat;
         attHist.lot = this.myLot;
         attHist.attPrcsBcYn = (rssi !== '') && (bcDist !== '') ? 'Y' : 'N'; // 비콘 등록 하드코딩
         attHist.rssi = rssi;
         attHist.bcDist = bcDist;
         // ========> 출석등록
         this.$store.dispatch('common/setAttendance', attHist).then( res => {
            this.att = res.data.resultData;
            /* 출석 이력 파라미터 */
            const wifiRcptnHist = new WifiRcptnHist();
            wifiRcptnHist.openYr = this.att.openYr;
            wifiRcptnHist.openShtmCd = this.att.openShtmCd;
            wifiRcptnHist.openOrgnClsfCd = this.att.openOrgnClsfCd;
            wifiRcptnHist.openSust = this.att.openSust;
            wifiRcptnHist.openDclss = this.att.openDclss;
            wifiRcptnHist.openSbjtNo = this.att.openSbjtNo;
            wifiRcptnHist.ltStaffNo = this.att.ltStaffNo;
            wifiRcptnHist.stdNo = this.att.stdNo;
            wifiRcptnHist.attYmd = this.att.attYmd;
            wifiRcptnHist.wifiRcptnHr = this.now.hourStr + ':' + this.now.minStr + ':' + new Date().getSeconds();
            wifiRcptnHist.wifiRcptnItem = '출석정보등록';
            
            if(this.lectureInfo.skpDt) wifiRcptnHist.skltDt = this.lectureInfo.skpDt;
            if(!rssi && !bcDist) {
               wifiRcptnHist.result = '비콘정보 불일치';
               
            } else {
               wifiRcptnHist.result = '비콘정보 일치';
               this.attChk = true;
               this.lectureInfo.attPrcsBcYn = 'Y';
               this.lectureInfo.attDiv = 'ULS58.10'
            }

            wifiRcptnHist.attResult = false;

            /* 출결 등록 set info */
            this.startTime = this.att.attPrcsDt;
            this.gps.lat = this.att.lat;
            this.gps.lot = this.att.lot;
            this.network.macAddress = this.att.wifiIp;

            this.setAttendanceRecord(wifiRcptnHist);
         });
      },
      beaconSendLoc({ rssi = '', bcDist = '' }) {
         console.log('beaconSendLoc');
         const wifiRcptnHist = new WifiRcptnHist();
         wifiRcptnHist.openYr = this.lectureInfo.openYy;
         wifiRcptnHist.openShtmCd = this.lectureInfo.openShtmCd;
         wifiRcptnHist.openOrgnClsfCd = this.lectureInfo.openOrgnClsfCd;
         wifiRcptnHist.openSust = this.lectureInfo.openSust;
         wifiRcptnHist.openDclss = this.lectureInfo.openDclss;
         wifiRcptnHist.openSbjtNo = this.lectureInfo.openSbjtNo;
         wifiRcptnHist.ltStaffNo = this.lectureInfo.staffNo;
         wifiRcptnHist.stdNo = this.lectureInfo.stdNo;
         // wifiRcptnHist.attYmd = this.now.yearStr + this.now.monthStr + this.now.dateStr; /* '20210903' */
         wifiRcptnHist.attYmd = this.checkDate;
         // wifiRcptnHist.attDiv = this.attendanceFilter(this.lectureInfo);
         wifiRcptnHist.wifiRcptnHr = this.now.hourStr + ':' + this.now.minStr + ':' + new Date().getSeconds();
         wifiRcptnHist.rssi = rssi;
         wifiRcptnHist.bcDist = bcDist;
         wifiRcptnHist.attPrcsBcYn = (rssi !== '') && (bcDist !== '') ? 'Y' : 'N';
         if(this.cate === 'sendLoc') wifiRcptnHist.wifiRcptnItem = '중간출석';
         if(this.cate === 'quit') wifiRcptnHist.wifiRcptnItem = '퇴실정보등록';
         if(this.lectureInfo.skpDt) wifiRcptnHist.skltDt = this.lectureInfo.skpDt;

         if(!rssi && !bcDist) {
            wifiRcptnHist.result = '비콘정보 불일치';
         } else {
            wifiRcptnHist.result = '비콘정보 일치';
            this.lectureInfo.attPrcsBcYn = 'Y';
         }

         wifiRcptnHist.attResult = false;
         this.setAttendanceRecord(wifiRcptnHist);
      },
      updateBeaconData(data) {
         this.$store.dispatch('common/setBeaconInfo', data);
      },
      toggleBeaconPopup(bool) {
         this.$store.commit('beaconPopup/showbeaconPopupToggle', bool);
      },
      startBeaconMonitoring(resultData) {
         console.log('startBeaconMonitoring');

         var locationManager = cordova.plugins.locationManager;
         locationManager.enableBluetooth();
         let beaconBattery = 0;
         let beaconAuthStatus = this.beaconAuthStatus;
         const delegate = new locationManager.Delegate();
         const cate = this.cate;
         let setStopBeaconMonitoring = this.setStopBeaconMonitoring;
         let toggleBeaconPopup = this.toggleBeaconPopup;
         const beaconAttendance = this.beaconAttendance;
         const beaconSendLoc = this.beaconSendLoc;
         // 비콘 정보 업데이트 
         const seachBeaconRcptnHist = this.lectureroomDetailList[0];
         const updateBeaconData = this.updateBeaconData;

         delegate.didRangeBeaconsInRegion = function(pluginResult) {
            console.log('========================didRangeBeaconsInRegion========================')
            console.log(JSON.stringify(pluginResult));

            let isMatch = false;
            // && pluginResult.beacons[i].mac.replaceAll(':', '') === resultData[j].macAddr 

            outerLoop: for(let i in pluginResult.beacons) {
               for(let j in resultData) {
                  if(
                  pluginResult.beacons[i].uuid.toLowerCase() === resultData[j].uuid.toLowerCase()
                  && pluginResult.beacons[i].major == resultData[j].major 
                  && pluginResult.beacons[i].minor == resultData[j].minor 
                  ) {
                     isMatch = true;
                     beaconBattery = pluginResult.beacons[i]?.battery;
                     console.log('match');
                     beaconAuthStatus = true;
                     // this.$store.commit('stdnt/setCertification', {key: 'beacon', value:true});

                     break outerLoop;

                  } else {
                     console.log('not match');
                  }
               }
            }

            //비콘인증에 성공
            if(isMatch) {
               /* ========== 출석등록 API 시작 ========== */

               //비콘정보 업데이트
               seachBeaconRcptnHist.battStat = beaconBattery || beaconBattery === 0 ? beaconBattery : '';
               updateBeaconData(seachBeaconRcptnHist);

               let rssi = '';
               let bcDist = '';

               //출석등록 업데이트
               if(pluginResult.beacons.length) {
                  rssi = pluginResult.beacons[0].rssi
                  bcDist = pluginResult.beacons[0].accuracy;
               };


               cate === 'attendance' ? beaconAttendance({ rssi, bcDist }) : beaconSendLoc({ rssi, bcDist });
               

               // 출석등록 API 끝
               setStopBeaconMonitoring(resultData);
               toggleBeaconPopup(false);
               isMatch = false;

               alertMsg('비콘인증이 완료되었습니다.');
               clearTimeout(failBeaconConnect);
            };
         };

         delegate.didStartMonitoringForRegion = pluginResult => {
            console.log('========================didStartMonitoringForRegion========================')
            console.log(JSON.stringify(pluginResult))
         };

         locationManager.setDelegate(delegate);

         for (let i in resultData) {
            var beaconRegion = new locationManager.BeaconRegion (i + 1, resultData[i].uuid);

            locationManager.startRangingBeaconsInRegion(beaconRegion)
            .fail(console.error)
            .done();

            locationManager.startMonitoringForRegion(beaconRegion)
            .fail(console.error)
            .done();
         }

         const failBeaconConnect = setTimeout(() => {
         // beacon store state 값 추가 필요 **
            if(!this.beaconAuthStatus) { // =====> 팝업이 오픈되어 있는지 확인하는 코드 넣어주세요.
               this.stopBeaconMonitoring(resultData);
               this.toggleBeaconPopup(false);

               //비콘인증 실패 알림처리
               return alertMsg('비콘 인증에 실패하였습니다. \n강의실 정보를 확인하시거나 \n인증을 다시 시도해주세요');
            }
         }, 10000);
      }, 
      setStopBeaconMonitoring(resultData) {
         console.log('setStopBeaconMonitoring');
         let locationManager = cordova.plugins.locationManager;

         //모니터링 종료
         for (let i in resultData) {
            let beaconRegion = new locationManager.BeaconRegion (i + 1, resultData[i].uuid);

            locationManager.stopRangingBeaconsInRegion(beaconRegion)
            .fail(console.error)
            .done();

            locationManager.stopMonitoringForRegion(beaconRegion)
            .fail(console.error)
            .done();
         }
      },
      stopBeaconMonitoring(resultData) {
         console.log('stopBeaconMonitoring');

         let locationManager = cordova.plugins.locationManager;

         const defaultValue = { rssi: '', bcDist: '' };
         this.cate === 'attendance' ? this.beaconAttendance(defaultValue) : this.beaconSendLoc(defaultValue);

         //모니터링 종료
         for (let i in resultData) {
            let beaconRegion = new locationManager.BeaconRegion (i + 1, resultData[i].uuid);

            locationManager.stopRangingBeaconsInRegion(beaconRegion)
            .fail(console.error)
            .done();

            locationManager.stopMonitoringForRegion(beaconRegion)
            .fail(console.error)
            .done();
         }
      },
      notAttendanceAelrt() {
         alertMsg('이미 출결 정보가 등록되었습니다.');
      },
      // attendanceFilter(lectureInfo) {
      //    let resultAttendanceCode = '';
      //    const ULS58_10 = 'ULS58.10'; // 출석 코드
      //    const Y = 'Y';
      //    const attPrcsBcYn = lectureInfo.attPrcsBcYn;
      //    const attPrcsCdYn = lectureInfo.attPrcsCdYn;
      //    const attPrcsQrYn = lectureInfo.attPrcsQrYn;
      //    const attendanceType = lectureInfo.attendanceType;

      //    switch(attendanceType) {
      //       case 'ULS59.10.10' : // OTP 출결
      //          if( attPrcsCdYn === Y) resultAttendanceCode = ULS58_10;
      //          break;
      //       case 'ULS59.10.20' : // QR 출결
      //          if( attPrcsQrYn === Y) resultAttendanceCode = ULS58_10;
      //          break;
      //       case 'ULS59.10.30' : // QR + OTP
      //          if( attPrcsQrYn === Y && attPrcsCdYn === Y) resultAttendanceCode = ULS58_10;
      //             break;
      //       case 'ULS59.10.40' : //QR + 비콘
      //          if( attPrcsQrYn === Y && attPrcsBcYn === Y) resultAttendanceCode = ULS58_10;
      //          break;
      //       case 'ULS59.10.50' : //OTP + 비콘
      //          if( attPrcsCdYn === Y && attPrcsBcYn === Y) resultAttendanceCode = ULS58_10;
      //          break;
      //       case 'ULS59.10.60' : // QR + OTP + 비콘
      //          if( attPrcsCdYn === Y && attPrcsBcYn === Y && attPrcsQrYn === Y) resultAttendanceCode = ULS58_10;
      //          break;
      //       case null : // QR + OTP + 비콘
      //          if( attPrcsCdYn === Y || attPrcsBcYn === Y || attPrcsQrYn === Y) resultAttendanceCode = ULS58_10;
      //          break;
      //       default:
      //          resultAttendanceCode = ''; // 미출석
      //    };

      //    console.log(attPrcsBcYn, attPrcsCdYn, attPrcsQrYn, attendanceType, 'attPrcsBcYn, attPrcsCdYn, attPrcsQrYn, attendanceType')
      //    console.log(resultAttendanceCode, 'resultAttendanceCode');

      //    return resultAttendanceCode;
      // },
   
   },
};
</script>

<style scoped>
.sub-title2 {
   margin-bottom: 20px;
}
.correct {
   color: #3d61ad;
}
.correct.not {
   color: #ec7660;
}
.commute__link.disabled {
   border-color:#c8c8c8c8;
   background-color:#cfcfcfcf;
   opacity: .8;
}
</style>
