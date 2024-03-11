<template>
   <section class="section">
      <ion-select :value="term" :toggleIcon="arrowDown" label="학기" fill="outline" placeholder="학기 선택" :compareWith="compareTerm" mode="md" okText="선택완료" cancelText="닫기" @ionChange="changeTerm($event.detail.value)">
         <ion-select-option v-for="(sche, i) in termList" :key="`sche_${i}`" :value="sche">{{ sche.yy }}년 {{ sche.shtmNm }}</ion-select-option>
      </ion-select>
      <ion-select :value="selWeek" :toggleIcon="arrowDown" label="주차" fill="outline" placeholder="주차 선택" mode="md" okText="선택완료" cancelText="닫기" @ionChange="setWeekDay($event.detail.value)">
         <ion-select-option v-for="(weekNum, i) in weekSize" :key="`weekNum_${i}`" :value="weekNum">{{ weekNum }}주차</ion-select-option>
      </ion-select>
   </section>
   <section class="section">
      <div class="guide">
         <ul class="list-style dot">
            <li>
               수업완료 : <span><ion-icon :icon="checkCircle" />(체크)</span>, 
               미수업 : <span><ion-icon :icon="cancelCircle" />(엑스)</span> 
            </li>
            <li>
               과목 선택시 <span>출결 상세정보</span>로 이동합니다.
            </li>
         </ul>
      </div>
      <div class="time_table__semester">
         <div class="week"><span>기간</span> {{ thisWeekInfo }}</div>
         <div class="semester__time_table">
            <div class="tt__row" v-for="(sch, i) in scheduleLine" :key="(sch, i)">
               <div class="tt__cell tt__th">{{ sch.day }}</div>
               <div :class="['tt__cell', { tt__th: sch.timeline != undefined }]" v-for="(t, j) in scheduleLine[0].timeline" :key="(t, j)" v-html="i == 0 ? t : clsHtml(sch.classList[j])" @click="detail(sch.classList[j])"></div>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import SearchEattdOpenSche from '@/model/search-eattd-open-sche';
import SearchEattdOpenRpstStaffInfo from '@/model/search-eattd-open-rpst-staff-info';
import { getWeekList } from '@/helper/weekList';
import { auditDate } from '@/helper/auditDate';
import { IonSelect, IonSelectOption } from '@ionic/vue';
import dayjs from 'dayjs';
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import arrowDown from '@/assets/img/icons/arrowDownIcon.svg';
import checkCircle from '@/assets/img/icons/check-circle.svg';
import cancelCircle from '@/assets/img/icons/cancel-circle.svg';

const scrollToSelected = () => {
    const selected = document.querySelector('.alert-wrapper [aria-checked="true"]');
    selected && selected.scrollIntoView();
};

export default {
    name: 'profsr-att-status-table',
    components: {
        IonSelect,
        IonSelectOption,
    },
    setup() {
      return { arrowDown, checkCircle, cancelCircle }
    },
    mounted() {
        window.addEventListener('ion-alert-did-present', scrollToSelected);
    },
    unmounted() {
        window.removeEventListener('ion-alert-did-present', scrollToSelected);
    },
    data() {
        return {
            closeCircleOutline,
            checkmarkCircleOutline,
            scheduleLine: [
                {
                    day: '',
                    timeline: [
                        '08:00',
                        '08:30',
                        '09:00',
                        '09:30',
                        '10:00',
                        '10:30',
                        '11:00',
                        '11:30',
                        '12:00',
                        '12:30',
                        '13:00',
                        '13:30',
                        '14:00',
                        '14:30',
                        '15:00',
                        '15:30',
                        '16:00',
                        '16:30',
                        '17:00',
                        '17:30',
                        '18:00',
                        '18:30',
                        '19:00',
                        '19:30',
                        '20:00',
                        '20:30',
                        '21:00',
                        '21:30',
                        '22:00',
                        '22:30',
                        '23:00',
                        '23:30',
                        '24:00',
                    ],
                },
                { day: '월', classList: [] },
                { day: '화', classList: [] },
                { day: '수', classList: [] },
                { day: '목', classList: [] },
                { day: '금', classList: [] },
                { day: '토', classList: [] },
            ],
            termList: [],
            term: {},
            weekSize: 0,
            classData: [],
            searchT: new SearchEattdOpenSche(),
            searchL: new SearchEattdOpenRpstStaffInfo(),
            user: this.$store.state.signIn.user,
            weekData: {},
            selDay: auditDate().checkDate,
            selWeek: '',
            today: auditDate().checkDate,
        };
    },
    computed: {
        thisWeekInfo() {
            try {
                const from = dayjs(this.weekData[this.selWeek].startDate).add(1, 'day').format('YYYY.MM.DD');
                const to = dayjs(this.weekData[this.selWeek].endDate).format('MM.DD');

                return `${from} ~ ${to}`;
            } catch {
                return '';
            }
        },
    },
    methods: {
        compareTerm(o1, o2) {
            if (o1 && o2) {
                return o1.yy === o2.yy && o1.shtmCd === o2.shtmCd;
            }
            return false;
        },

        getClass() {
            this.classData = [];
            this.scheduleLine[1].classList = [];
            this.scheduleLine[2].classList = [];
            this.scheduleLine[3].classList = [];
            this.scheduleLine[4].classList = [];
            this.scheduleLine[5].classList = [];
            this.scheduleLine[6].classList = [];

            this.searchL.openYy = this.term.yy;
            this.searchL.ltStaffNo = this.user.mbrNo;
            this.searchL.openShtmCd = this.term.shtmCd;
            this.searchL.weekStartDate = this.weekData[this.selWeek].startDate; //'20210829';
            this.searchL.weekEndDate = this.weekData[this.selWeek].endDate; // '20210904';

            let tempClsList = [];
            let newTempList = [];

            this.$store.dispatch('profsr/getScheduleList', this.searchL).then((d) => {
                tempClsList = d.data.resultData;
                tempClsList = tempClsList.filter((d) => {
                    return d.dayCd != null && d.dayCd != 'CBA62.7';
                });

                const chk = tempClsList.find((d) => d.clsDivn === 'Y');
                
                if (chk) {

                    for (let index = 0; index < tempClsList.length; index++) {
                        let tempCls = tempClsList[index];
                        if (tempCls.clsDivn === 'Y') {
                            for (let i = 0; i < tempCls.timeList.length; i++) {
                                let newTemp = {
                                    openYy: tempCls.openYy,
                                    openShtmCd: tempCls.openShtmCd,
                                    shtmNm: tempCls.shtmNm,
                                    openOrgnClsfCd: tempCls.openOrgnClsfCd,
                                    openOrgnClsfNm: tempCls.openOrgnClsfNm,
                                    openSust: tempCls.openSust,
                                    sustNm: tempCls.sustNm,
                                    openShyr: tempCls.openShyr,
                                    openDclss: tempCls.openDclss,
                                    pnt: tempCls.pnt,
                                    openSbjtNo: tempCls.openSbjtNo,
                                    sbjtNm: tempCls.sbjtNm,
                                    ltStaffNo: tempCls.ltStaffNo,
                                    staffNm: tempCls.staffNm,
                                    dayCd: tempCls.dayCd,
                                    dayNm: tempCls.dayNm,
                                    fromTm: tempCls.timeList[i][0],
                                    toTm: tempCls.timeList[i][1],
                                    ltBldgCd: tempCls.ltBldgCd,
                                    ltBldgNm: tempCls.ltBldgNm,
                                    ltrmCd: tempCls.ltrmCd,
                                    ltrmNm: tempCls.ltrmNm,
                                    ltFromDt: tempCls.ltFromDt,
                                    ltToDt: tempCls.ltToDt,
                                    theoTmcnt: tempCls.theoTmcnt,
                                    pracTmcnt: tempCls.pracTmcnt,
                                    rpstProfYn: tempCls.rpstProfYn,
                                    cptnDivNm: tempCls.cptnDivNm,
                                    mthdCd: tempCls.mthdCd,
                                    mthdNm: tempCls.mthdNm,
                                    attYmd: tempCls.attYmd,
                                    suppYn: tempCls.suppYn,
                                    skpDt: tempCls.skpDt,
                                    clsDivn: tempCls.clsDivn,
                                    timeList: tempCls.timeList,
                                };

                                newTempList.push(newTemp);
                            }
                        } else {
                            newTempList.push(tempCls);
                        }
                    }

                    newTempList.sort((after, before) => {
                        if (before.dayCd == after.dayCd) {
                            if (before.fromTm > after.fromTm) {
                                return -1;
                            }
                        }
                    });

                    this.classData = newTempList.filter((d) => {
                        return (
                            ((d.ltFromDt <= this.weekData[this.selWeek].endDate && d.ltFromDt >= this.weekData[this.selWeek].startDate) ||
                                (d.ltToDt <= this.weekData[this.selWeek].endDate && d.ltToDt >= this.weekData[this.selWeek].startDate) ||
                                (d.ltToDt > this.weekData[this.selWeek].endDate && d.ltFromDt < this.weekData[this.selWeek].startDate)) &&
                            this.findClsDate(d.dayCd) >= d.ltFromDt &&
                            this.findClsDate(d.dayCd) <= d.ltToDt
                        );
                    });
                } else {
                    this.classData = tempClsList.filter((d) => {
                        return (
                            ((d.ltFromDt <= this.weekData[this.selWeek].endDate && d.ltFromDt >= this.weekData[this.selWeek].startDate) ||
                                (d.ltToDt <= this.weekData[this.selWeek].endDate && d.ltToDt >= this.weekData[this.selWeek].startDate) ||
                                (d.ltToDt > this.weekData[this.selWeek].endDate && d.ltFromDt < this.weekData[this.selWeek].startDate)) &&
                            this.findClsDate(d.dayCd) >= d.ltFromDt &&
                            this.findClsDate(d.dayCd) <= d.ltToDt
                        );
                    });
                }

                this.clsDataPush();
            });
        },

        clsDataPush() {
            const timeFormat = (time) => {
                return time.slice(0, 2) + ':' + time.slice(2, 4);
            };
            const noneCls = {
                openYy: '', // 개설년도
                openShtmCd: '', // 개설학기코드
                shtmNm: '', // 개설학기명
                openOrgnClsfCd: '', // 개설조직분류코드
                openOrgnClsfNm: '', // 개설조직분류명
                openSust: '', // 개설학과코드
                sustNm: '', // 개설학과
                openShyr: '', // 수강학년
                openDclss: '', // 분반
                pnt: '', // 학점
                openSbjtNo: 'not', // 과목코드
                sbjtNm: '', // 과목명
                stdNo: '', // 수강생아이디
                stdNm: '', // 수강생이름
                dayCd: '', // 요일코드
                dayNm: '', // 요일명
                fromTm: '', // 시작시간
                toTm: '', // 종료시간
                ltBldgCD: '', // 건문코드
                ltBldgNm: '', // 건물명
                ltrmCd: '', // 강의실코드
                ltrmNm: '', // 강의실명
                retlsnYy: '', // 재이수년도
                retlsnShtmNm: '', // 재이수학기
                inout: '', // 타대학학점교류여부
                staffNo: '', // 교수아이디
                staffNm: '', // 교수이름
                mthdCd: '', // 강의구분코드
                mthdNm: '', // 강의구분명
                attDiv: '', // 출석 구분
                attPrcsDt: '', // 출석 처리 일시
                attYmd: '',
                skpDt: '',
                suppYn: '',
                clsDivn: 'N',
                timeList: [],
            };
            this.classData.forEach((cls, i) => {
                for (let index = 1; index < this.scheduleLine.length; index++) {
                    const ele = this.scheduleLine[index];
                    const time = this.scheduleLine[0].timeline;
                    if (cls.dayNm == ele.day) {
                        for (let j = 0; j < time.length; j++) {
                            if (i > 0) {
                                if (this.classData[i - 1].dayNm == cls.dayNm) {
                                    if (timeFormat(cls.fromTm) > time[j] && timeFormat(this.classData[i - 1].fromTm) < time[j]) {
                                        ele.classList.push(noneCls);
                                    } else if (timeFormat(cls.fromTm) == time[j]) {
                                        ele.classList.push(cls);
                                    }
                                } else {
                                    if (timeFormat(cls.fromTm) > time[j]) {
                                        ele.classList.push(noneCls);
                                    } else if (timeFormat(cls.fromTm) == time[j]) {
                                        ele.classList.push(cls);
                                    }
                                }
                            } else {
                                if (timeFormat(cls.fromTm) > time[j]) {
                                    ele.classList.push(noneCls);
                                } else if (timeFormat(cls.fromTm) == time[j]) {
                                    ele.classList.push(cls);
                                }
                            }
                        }
                    }
                }
            });
        },
        detail(cls) {
            if (cls.openSbjtNo == 'not') {
                return;
            }

            const searchDetail = new SearchEattdOpenRpstStaffInfo();
            searchDetail.openSbjtNo = cls.openSbjtNo;
            searchDetail.openDclss = cls.openDclss;
            searchDetail.ltStaffNo = cls.ltStaffNo;
            searchDetail.openYy = cls.openYy;
            searchDetail.openShtmCd = cls.openShtmCd;
            searchDetail.checkDate = this.findClsDate(cls.dayCd);
            if (cls.clsDivn) {
                if (cls.clsDivn === 'N') {
                    searchDetail.fromTm = cls.fromTm;
                } else {
                    searchDetail.fromTm = cls.timeList[0][0];
                }
            } else {
                searchDetail.fromTm = cls.fromTm;
            }
            this.$store.commit('profsr/getLecture', searchDetail);
            this.$router.push('class');
        },
        clsHtml(cls) {
            const timeFormat = (time) => {
               return time.slice(0, 2) + ':' + time.slice(2, 4);
            };
            const longClsNm = (nm, num) => {
                return nm.slice(0, 3 * num) + '...';
            };

            if (cls != undefined) {
                if (cls.openSbjtNo == 'not') {
                    return '';
                } else {
                    if (this.findClsDate(cls.dayCd) < this.term.ltFromDt || this.findClsDate(cls.dayCd) > this.term.ltToDt || cls.ltFromDt < this.term.ltFromDt || cls.ltToDt > this.term.ltToDt) {
                        return '';
                    } else {
                        const time = this.scheduleLine[0].timeline;
                        const gap = time.indexOf(timeFormat(cls.toTm)) - time.indexOf(timeFormat(cls.fromTm)) + 1;
                        if ((new Date().getHours() >= cls.toTm.substring(0, 2) && this.findClsDate(cls.dayCd) == this.today) || this.findClsDate(cls.dayCd) < this.today) {
                            if (gap > 1) {
                                return '<a><div class="tt__class time--' + gap + ' is--complete"><span class="class__infos">' + cls.sbjtNm + '</span></div>	</a>';
                            } else {
                                return '<a><div class="tt__class time--' + gap + ' is--complete"><span>' + longClsNm(cls.sbjtNm, gap) + '</span></div>	</a>';
                            }
                        } else {
                            if (gap > 1) {
                                return '<a><div class="tt__class time--' + gap + '"><span class="class__infos">' + cls.sbjtNm + '</span></div>	</a>';
                            } else {
                                return '<a><div class="tt__class time--' + gap + '"><span>' + longClsNm(cls.sbjtNm, gap) + '</span></div>	</a>';
                            }
                        }
                    }
                }
            }
        },
        getTermList() {
            this.searchT.orgnClsfCd = 'CBA01.020';
            this.searchT.yy = auditDate().yy;
            this.$store.dispatch('common/getSemesterList', this.searchT).then((d) => {
                if (d.data.resultData) {
                    this.termList = d.data.resultData.reverse();
                }

                this.getThisTerm();
            });
        },
        getThisTerm() {
            const searchTerm = new SearchEattdOpenSche();
            searchTerm.yy = auditDate().yy;
            searchTerm.checkDate = auditDate().checkDate;

            this.$store.dispatch('common/getSemesterList', searchTerm).then((d) => {
               this.term = d.data.resultData[0];
               this.setWeekList();
            });
        },
        setWeekDay(idx) {
            this.selDay = this.weekData[idx].startDate;
            this.selWeek = idx;
            this.getClass();
            this.getThisWeek();
        },
        setWeekList() {
            const fromDt = this.term.ltFromDt;
            const toDt = this.term.ltToDt;
            this.$store.dispatch('common/getWeekList', { ltFromDt: fromDt, ltToDt: toDt }).then((d) => {
                this.weekData = d.data.resultData;
                this.weekSize = Object.keys(this.weekData);
                if (this.selDay == '') {
                    this.setWeekDay(1);
                    this.selWeek = '1';
                } else {
                    this.weekSize.forEach((num) => {
                        if (this.weekData[num].startDate <= this.selDay && this.weekData[num].endDate >= this.selDay) {
                            this.selWeek = num;
                        }
                    });
                    this.getClass();
                    this.getThisWeek();
                }
                this.$store.commit('common/setWeek', this.weekData[this.selWeek]);
            });
        },
        changeTerm(term) {
            this.term = term;
            this.weekData = {};
            this.weekSize = [];
            this.selDay = '';
            this.setWeekList();
            this.$emit('updateTermValue', term);
        },
        getThisWeek() {
            const calDate = new Date(this.selDay.slice(0, 4), this.selDay.slice(4, 6) - 1, this.selDay.slice(6));
            this.thisWeek = getWeekList(calDate);
            this.$store.commit('common/setWeek', this.weekData[this.selWeek]);
        },
        findClsDate(dayCd) {
            const dayNum = dayCd.replace('CBA62.', '');
            if (dayNum === '7') {
                return;
            }

            const selectDay = this.thisWeek[dayNum].y + this.thisWeek[dayNum].M + this.thisWeek[dayNum].d;
            return selectDay;
        },
    },
};
</script>

<style lang="scss" scoped>
.guide {
   letter-spacing: -0.03em;
   font-size: clamp(14px, 4vw, 16px);
   padding: 1em 0.7em;
   line-height: 1.3;
   word-break: keep-all;
   border-bottom: 1px solid #D8DFEE;
    span {
      font-weight: 700;
      color: var(--ion-color-primary);
    }

    ion-icon {
        font-size: 20px;
        vertical-align: -5px;
        padding-right:2px;
    }
   .list-style.dot > li {
      position: relative;
      color:#66728B;
      font-size: 14px;
      font-weight: 500;
      &::before {
         content:"";
         display:inline-block;
         width: 4px;
         height: 4px;
         background-color:var(--ion-color-primary);
         border-radius:100%;
         vertical-align:middle;
         margin-right: 4px;
      }
      ~ li {
         margin-top: 5px;
      }
   }
}
.week {
    font-size: 14px;
    color: #66728B;
    font-weight: 500;
    margin: 20px 0 10px;
    span {
      font-weight: 700;
      margin-right: 12px;
      color: var(--ion-color-primary);
    }
}
</style>
