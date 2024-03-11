import http from "../helper/interceptor";
// import store from '../store/index';

export const profsr = {
    namespaced: true,
    state: {
        searchEattdOpenRpstStaffInfo: {},
        lecture: {},
        stdntData: {},
    },
    actions: {
        /* 교수 수강 과목 목록 조회 */
        getLectureList(__, searchEattdOpenRpstStaffInfo) {
            const search = searchEattdOpenRpstStaffInfo;
            const frm = new FormData();
            frm.append("ltStaffNo", search.ltStaffNo);
            frm.append("openYy", search.openYy);
            frm.append("openSbjtNo", search.openSbjtNo);
            
            if (search.checkDate != "") {
                frm.append("checkDate", search.checkDate);
            }

            return http.post("/lecture/professor/lectureList", frm);
        },

        /* 교수 수강 과목 상세 조회 */
        getLectureInfo(__, searchEattdOpenRpstStaffInfo) {
            const search = searchEattdOpenRpstStaffInfo;
            const frm = new FormData();
            frm.append("ltStaffNo", search.ltStaffNo);
            frm.append("openYy", search.openYy);
            frm.append("openShtmCd", search.openShtmCd);
            frm.append("openSbjtNo", search.openSbjtNo);
            frm.append("openDclss", search.openDclss);
            frm.append("checkDate", search.checkDate);
            frm.append("fromTm", search.fromTm);

            return http.post("/lecture/professor/lectureInfo", frm);
        },

        /* 교수 수강 과목 상세 조회 파라미터 */
        getLecture({ commit }, searchEattdOpenRpstStaffInfo) {
            commit("getLecture", searchEattdOpenRpstStaffInfo);
            return true;
        },

        /* 교수 수강 학생 목록 조회 */
        getStudentList(__, searchEattdTlsnStdInfo) {
            const search = searchEattdTlsnStdInfo;
            const frm = new FormData();

            frm.append("staffNo", search.staffNo);
            frm.append("openYy", search.openYy);
            frm.append("openShtmCd", search.openShtmCd);
            frm.append("openSbjtNo", search.openSbjtNo);
            frm.append("openOrgnClsfCd", search.openOrgnClsfCd);
            frm.append("openSust", search.openSust);
            frm.append("openShyr", search.openShyr);
            frm.append("openDclss", search.openDclss);
            frm.append("dayCd", search.dayCd);
            frm.append("checkDate", search.checkDate);
            frm.append("fromTm", search.fromTm);
            frm.append("skltDt", search.skltDt);

            return http.post("/lecture/professor/studentList", frm);
        },

        /* 교수 설정(과목) 정보 목록 조회 */
        getSettingInfoList(__, searchSbjtMng) {
            const search = searchSbjtMng;
            const frm = new FormData();

            frm.append("ltStaffNo", search.ltStaffNo);
            frm.append("openYr", search.openYr);
            frm.append("openSbjtNo", search.openSbjtNo);

            return http.post("/setting/professor/settingInfoList", frm);
        },

        /* 교수 설정(과목) 정보 상세 조회 */
        getSettingInfo(__, searchSbjtMng) {
            const search = searchSbjtMng;
            const frm = new FormData();

            frm.append("ltStaffNo", search.ltStaffNo);
            frm.append("openYr", search.openYr);
            frm.append("openShtmCd", search.openShtmCd);
            frm.append("openOrgnClsfCd", search.openOrgnClsfCd);
            frm.append("openSust", search.openSust);
            frm.append("openSujtNo", search.openSujtNo);
            frm.append("hrStngDiv", search.hrStngDiv);
            frm.append("detmHrDiv", search.detmHrDiv);

            return http.post("/setting/professor/settingInfo", frm);
        },

        /* 교수 설정(과목) 정보 등록 */
        setSettingInfo(__, sbjtMng) {
            const search = sbjtMng;
            const frm = new FormData();

            frm.append("ltStaffNo", search.ltStaffNo);
            frm.append("openYr", search.openYr);
            frm.append("openShtmCd", search.openShtmCd);
            frm.append("openOrgnClsfCd", search.openOrgnClsfCd);
            frm.append("openSust", search.openSust);
            frm.append("openSbjtNo", search.openSbjtNo);
            frm.append("hrStngDiv", search.hrStngDiv);
            frm.append("detmHrDiv", search.detmHrDiv);
            frm.append("fromTm", search.fromTm);
            frm.append("attendanceType", search.attendanceType);

            return http.post("/setting/professor/setSettingInfo", frm);
        },

        /* 교수 출결현황 시간표 목록 조회 */
        getScheduleList(__, searchEattdTlsnStdInfo) {
            const search = searchEattdTlsnStdInfo;
            const frm = new FormData();
            frm.append("ltStaffNo", search.ltStaffNo);
            frm.append("openYy", search.openYy);
            frm.append("openShtmCd", search.openShtmCd);
            frm.append("weekStartDate", search.weekStartDate);
            frm.append("weekEndDate", search.weekEndDate);

            return http.post("/schedule/professor/scheduleList", frm);
        },
            /* 학생 출결현황 시간표 목록 조회 */
         getScheduleCardList(__, searchEattdTlsnStdInfo) {
            const search = new FormData();
            search.append('ltStaffNo', searchEattdTlsnStdInfo.ltStaffNo);
            search.append("openYy", searchEattdTlsnStdInfo.openYy);
            search.append("openShtmCd", searchEattdTlsnStdInfo.openShtmCd);
            search.append("weekStartDate", searchEattdTlsnStdInfo.weekStartDate);
            search.append("weekEndDate", searchEattdTlsnStdInfo.weekEndDate);
            search.append('searchDate', searchEattdTlsnStdInfo.searchDate);

            return http.post('/schedule/professor/scheduleCardList', search)
         },

    },
    mutations: {
        getLecture(state, data) {
            state.searchEattdOpenRpstStaffInfo = data;
        },

        setLecture(state, data) {
            state.lecture = data;
        },

        getStdnt(state, data) {
            state.stdntData = data;
        },
    },
    getters: {},
};
