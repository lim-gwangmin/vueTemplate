import http from '../helper/interceptor';
// import store from '../store/index';

export const common = {
   namespaced: true,
   state: {
      searchUlsLtrmInfm: {},
      weekDay: {},
      weekDate: '',
      ulsLtrmInfm: {},
      termUpdate: true,
      setting: {
         startTimeSetList: [],
         endTimeSetList: [],
         methodSetList: [],
      }
   },
   actions: {
        /* 강의실 정보 조회 (GPS Info) */
        getLectureroomInfo(__, searchUlsLtrmInfm) {

            const search = searchUlsLtrmInfm;
            const frm = new FormData();

            frm.append('ltBldgCd', search.ltBldgCd);
            frm.append('ltrmCd', search.ltrmCd);

            return http.post('/lectureroom/lectureroomInfo', frm)
        },

        /* 강의실 정보 조회 (GPS Info) */
        getLectureroomDetailList(__, searchUlsLtrmDtl) {

            const search = searchUlsLtrmDtl;
            const frm = new FormData();

            frm.append('ltBldgCd', search.ltBldgCd);
            frm.append('ltrmCd', search.ltrmCd);

            return http.post('/lectureroom/lectureroomDetailList', frm)
        },

        /* 수강 학기 주차 목록 조회 */
        getWeekList(__, search) {

            const frm = new FormData();

            frm.append('ltFromDt', search.ltFromDt);
            frm.append('ltToDt', search.ltToDt);

            return http.post('/semester/weekList', frm);
        },

        /* 수강 학기 정보(일정) 조회 */
        getSemesterList(__, search) {

            const frm = new FormData();

            frm.append('yy', search.yy);
            if (search.orgnClsfCd != undefined && search.orgnClsfCd != '') {
                frm.append('orgnClsfCd', search.orgnClsfCd);
            }

            if (search.checkDate != undefined || search.checkDate != '') {
                frm.append('checkDate', search.checkDate);
            }
            return http.post('/semester/semesterList', frm)
        },

        /* 수강 학기 정보(상세) 조회 */
        getSemesterInfo(__, search) {

            const frm = new FormData();

            frm.append('yy', search.yy);
            frm.append('orgnClsfCd', search.orgnClsfCd);
            frm.append('checkDate', search.checkDate);
            return http.post('/semester/student/semesterInfo', frm)
        },

        /* 출결현황 목록 조회 */
        getAttendanceList(__, searchAttHist) {

            const search = searchAttHist;
            const frm = new FormData();

            frm.append('openYr', search.openYr);
            frm.append('openShtmCd', search.openShtmCd);
            frm.append('openOrgnClsfCd', search.openOrgnClsfCd);
            frm.append('openDclss', search.openDclss);
            frm.append('openSbjtNo', search.openSbjtNo);
            frm.append('ltStaffNo', search.ltStaffNo);
            frm.append('stdNo', search.stdNo);
            frm.append('attYmd', search.attYmd)
            frm.append('openSust', search.openSust);
            frm.append('skltDt', search.skltDt);

            return http.post('/attendance/attendanceList', frm)
        },

        /* 출결현황 등록 */
        setAttendance(__, attHist) {

            const search = attHist;
            const frm = new FormData();

            frm.append('openYr', search.openYr);
            frm.append('openShtmCd', search.openShtmCd);
            frm.append('openOrgnClsfCd', search.openOrgnClsfCd);
            frm.append('openDclss', search.openDclss);
            frm.append('openSbjtNo', search.openSbjtNo);
            frm.append('ltStaffNo', search.ltStaffNo);
            frm.append('stdNo', search.stdNo);
            frm.append('attYmd', search.attYmd);
            frm.append('attDiv', search.attDiv);
            frm.append('openSust', search.openSust);
            frm.append('attResn', search.attResn);
            frm.append('skltDt', search.skltDt);
            frm.append('rssi', search.rssi);
            frm.append('bcDist', search.bcDist);
            frm.append('attPrcsQrYn', search.attPrcsQrYn);
            frm.append('attPrcsCdYn', search.attPrcsCdYn);
            frm.append('attPrcsBcYn', search.attPrcsBcYn);
            frm.append('attPrcsMthdDiv', search.attPrcsMthdDiv);
            
            if (search.wifiNm != '') {
                frm.append('wifiNm', search.wifiNm);
            }
            if (search.wifiIp != '') {
                frm.append('wifiIp', search.wifiIp);
            }
            if (search.lat != '') {
                frm.append('lat', search.lat);
            }
            if (search.lot != '') {
                frm.append('lot', search.lot);
            }


            return http.post('/attendance/setAttendance', frm)
        },

        /* 출결현황 일괄 등록 */
        setAttendanceMulti(__, attHist) {

            const search = attHist;
            const frm = new FormData();

            frm.append('openYr', search.openYr);
            frm.append('openShtmCd', search.openShtmCd);
            frm.append('openOrgnClsfCd', search.openOrgnClsfCd);
            frm.append('openDclss', search.openDclss);
            frm.append('openSbjtNo', search.openSbjtNo);
            frm.append('ltStaffNo', search.ltStaffNo);
            frm.append('stdNo', search.stdNo);
            frm.append('attYmd', search.attYmd);
            frm.append('attDiv', search.attDiv);
            frm.append('openSust', search.openSust);
            frm.append('attResn', search.attResn);
            frm.append('skltDt', search.skltDt);

            return http.post('/attendance/setAttendance/multi', frm)
        },

        /* 출결현황 이력 목록 조회 */
        getAttendanceRecordList(__, searchWifiRcptnHist) {

            const search = searchWifiRcptnHist;
            const frm = new FormData();

            frm.append('openYr', search.openYr);
            frm.append('openShtmCd', search.openShtmCd);
            frm.append('openOrgnClsfCd', search.openOrgnClsfCd);
            frm.append('openDclss', search.openDclss);
            frm.append('openSbjtNo', search.openSbjtNo);
            frm.append('ltStaffNo', search.ltStaffNo);
            frm.append('stdNo', search.stdNo);
            frm.append('attYmd', search.attYmd)
            frm.append('openSust', search.openSust);
            frm.append('skltDt', search.skltDt);

            return http.post('/attendance/attendanceRecordList', frm)
        },

        /* 출결현황 이력 등록 */
        setAttendanceRecord(__, wifiRcptnHist) {

            const search = wifiRcptnHist;
            const frm = new FormData();
            frm.append('openYr', search.openYr);
            frm.append('openShtmCd', search.openShtmCd);
            frm.append('openOrgnClsfCd', search.openOrgnClsfCd);
            frm.append('openDclss', search.openDclss);
            frm.append('openSbjtNo', search.openSbjtNo);
            frm.append('ltStaffNo', search.ltStaffNo);
            frm.append('stdNo', search.stdNo);
            frm.append('attYmd', search.attYmd);
            frm.append('wifiRcptnHr', search.wifiRcptnHr);
            frm.append('wifiRcptnItem', search.wifiRcptnItem);
            frm.append('openSust', search.openSust);
            frm.append('result', search.result);
            frm.append('skltDt', search.skltDt);

            frm.append('rssi', search.rssi);
            frm.append('bcDist', search.bcDist);
            frm.append('attPrcsQrYn', search.attPrcsQrYn);
            frm.append('attPrcsCdYn', search.attPrcsCdYn);
            frm.append('attPrcsBcYn', search.attPrcsBcYn);

            return http.post('/attendance/setAttendanceRecord', frm)
        },

        /* 비대면 코드 목록 조회 */
        getUntactCdList(__, attUntactCd) {


            const search = new FormData();
            search.append('openYr', attUntactCd.openYr);
            search.append('openShtmCd', attUntactCd.openShtmCd);
            search.append('openOrgnClsfCd', attUntactCd.openOrgnClsfCd);
            search.append('openSust', attUntactCd.openSust);
            search.append('openDclss', attUntactCd.openDclss);
            search.append('openSbjtNo', attUntactCd.openSbjtNo);
            search.append('ltStaffNo', attUntactCd.ltStaffNo);

            return http.post('/attendance/untactCdList', search)
        },

        /* 비대면 코드 정보 조회 */
        getuntactCdInfo(__, attUntactCd) {

            const search = attUntactCd;
            const frm = new FormData();

            frm.append('openYr', search.openYr);
            frm.append('openShtmCd', search.openShtmCd);
            frm.append('openOrgnClsfCd', search.openOrgnClsfCd);
            frm.append('openDclss', search.openDclss);
            frm.append('openSbjtNo', search.openSbjtNo);
            frm.append('ltStaffNo', search.ltStaffNo);
            frm.append('openSust', search.openSust);
            frm.append('attYmd', search.attYmd);

            return http.post('/attendance/untactCdInfo', frm)
        },
        /* 비대면 코드 등록 */
        setUntactCd(__, attUntactCd) {

            const search = attUntactCd;
            const frm = new FormData();

            frm.append('openYr', search.openYr);
            frm.append('openShtmCd', search.openShtmCd);
            frm.append('openOrgnClsfCd', search.openOrgnClsfCd);
            frm.append('openDclss', search.openDclss);
            frm.append('openSbjtNo', search.openSbjtNo);
            frm.append('ltStaffNo', search.ltStaffNo);
            frm.append('openSust', search.openSust);
            frm.append('attYmd', search.attYmd);

            frm.append('dayCd', search.dayCd);
            frm.append('checkDate', search.checkDate);
            frm.append('fromTm', search.fromTm);
            frm.append('openShyr', search.openShyr);

            return http.post('/attendance/setUntactCd', frm)
        },
         /* 비콘 정보 목록 조회 */
         getBeaconList(__, seachBeaconRcptnHist) {

            const search = seachBeaconRcptnHist;
            const frm = new FormData();

            frm.append('ltBldgCd', search.ltBldgCd);
            frm.append('ltrmCd', search.ltrmCd);

            return http.post('/attendance/beaconInfo', frm);
         },

         /* 비콘 정보 업데이트 */
         setBeaconInfo(__, seachBeaconRcptnHist) {

            const search = seachBeaconRcptnHist;
            const frm = new FormData();


            frm.append('battStat', search.battStat);
            frm.append('ltBldgCd', search.ltBldgCd);
            frm.append('ltrmCd', search.ltrmCd);

            return http.post('/attendance/setBeaconInfo', frm);
         },
         /* 설정 목록 조회 */
        getAttComboList(__, upCd) {

            const search = upCd;
            const frm = new FormData();
            /**
             * - 교수화면의 학생 출석상태로 필터(ULS58)
             * - 교수화면의 학생 출석상태 변경(ULS58)
             * - 교수 설정의 출석 인정시간(ULS55)
             * - 교수 설정의 출석 종료 인정시간(ULS56)
             * - 교수 설정의 출결 형태(ULS59)
             */
            frm.append('upCd', search.upCd);

            return http.post('/common/attComboList', frm);
        }
   },
   mutations: {
      setWeek(state, data) {
         state.weekDay = data;
      },
      getWeekDate(state, data) {
         state.weekDate = data;
      },
      setUlsLtrmInfm(state, data) {
         state.ulsLtrmInfm = data;
      },
      termUpdate(state, data) {
         state.termUpdate = data;
      },
      setSettingList(state, {key, value}) {
         state.setting[key] = value;
      },
   },
   getters: {}
};
