import http from '../helper/interceptor';

export const stdnt = {
    namespaced: true,
    state: {
        getDetail: {},
        lectureInfo: {},
        attCodeParam: {},
        profsrCodeParam: {},
        certification: {
            qr: false,
            beacon: false,
            code:false,
        }
    },
    actions: {
        /* 학생 수강 과목 목록 조회 */
        getLectureList(__, searchEattdTlsnStdInfo) {
            const search = new FormData();
            search.append('checkDate', searchEattdTlsnStdInfo.checkDate);
            search.append('openShtmCd', searchEattdTlsnStdInfo.openShtmCd);
            search.append('openYy', searchEattdTlsnStdInfo.openYy);
            search.append('stdNo', searchEattdTlsnStdInfo.stdNo);

            return http.post('/lecture/student/lectureList', search)
        },

        /* 학생 수강 과목 상세 조회 */
        getLectureInfo(__, searchEattdTlsnStdInfo) {
            const search = new FormData();
            search.append('checkDate', searchEattdTlsnStdInfo.checkDate);
            search.append('openSbjtNo', searchEattdTlsnStdInfo.openSbjtNo);
            search.append('openShtmCd', searchEattdTlsnStdInfo.openShtmCd);
            search.append('openYy', searchEattdTlsnStdInfo.openYy);
            search.append('stdNo', searchEattdTlsnStdInfo.stdNo);
            search.append('openDclss', searchEattdTlsnStdInfo.openDclss);
            search.append('staffNo', searchEattdTlsnStdInfo.staffNo);
            search.append('fromTm', searchEattdTlsnStdInfo.fromTm);

            return http.post('/lecture/student/lectureInfo', search)
        },

        /* 학생 출결현황 시간표 목록 조회 */
        getScheduleList(__, searchEattdTlsnStdInfo) {
            const search = new FormData();
            search.append('stdNo', searchEattdTlsnStdInfo.stdNo);
            search.append('openYy', searchEattdTlsnStdInfo.openYy);
            search.append('openShtmCd', searchEattdTlsnStdInfo.openShtmCd);
            search.append('weekStartDate', searchEattdTlsnStdInfo.weekStartDate);
            search.append('weekEndDate', searchEattdTlsnStdInfo.weekEndDate);

            return http.post('/schedule/student/scheduleList', search)
        },

        /* 학생 출결현황 시간표 목록 조회 */
        getScheduleCardList(__, searchEattdTlsnStdInfo) {
            const search = new FormData();
            search.append('stdNo', searchEattdTlsnStdInfo.stdNo);
            search.append('openYy', searchEattdTlsnStdInfo.openYy);
            search.append('openShtmCd', searchEattdTlsnStdInfo.openShtmCd);
            search.append('weekStartDate', searchEattdTlsnStdInfo.weekStartDate);
            search.append('weekEndDate', searchEattdTlsnStdInfo.weekEndDate);
            search.append('searchDate', searchEattdTlsnStdInfo.searchDate);

            return http.post('/schedule/student/scheduleCardList', search)
        },

        /* 코드로 출석 등록 파라미터*/
        setAttCodeParam({ commit }, param) {
            commit('setAttCodeParam', param);
        },

        setSearch({ commit }, param) {
            commit('setSearch', param);
        },
        /* 교수코드로 출석 등록 파라미터 */
        setProfsrCodeParam({ commit }, param) {
            commit('setProfsrCodeParam', param);
        }
    },
    mutations: {
        setSearch(state, data) {
            state.getDetail = data;
        },
        setLectureInfo(state, data) {
            state.lectureInfo = data;
        },
        setAttCodeParam(state, data) {
            state.attCodeParam = data;
        },
        setProfsrCodeParam(state, data) {
            state.profsrCodeParam = data;
        },
        setCertification(state, data) {
            const { key, value } = data;
            state.certification[key] = value;
        },
    },
    getters: {}
};
