<template>
    <ul class="class-list">
        <li>
            <ion-icon :icon="bookIcon" />
            <div>
                <span>과목</span>
                <strong>
                  {{ lecture.sbjtNm }} ({{ lecture.openSbjtNo }})
               </strong>
            </div>
        </li>
        <li>
            <ion-icon :icon="calendarIcon" />
            <div>
                <span>날짜</span>
                {{ setToday }}
            </div>
        </li>
        <li>
            <ion-icon :icon="alarmIcon" />
            <div>
               <span>시간</span> 
               {{ clsTm }} ({{ startInd }}교시 ~ {{ endInd }}교시)
            </div>
        </li>
        <li>
            <ion-icon :icon="chalkboardIcon" />
            <div>
               <span>강의실</span> 
               {{ lecture.ltBldgNm }} {{ lecture.ltrmNm }}
            </div>
        </li>
        <li>
            <ion-icon :icon="schoolIcon" />
            <div>
                <span>교수</span>
                {{ lecture.staffNm }}
            </div>
        </li>
    </ul>
</template>

<script>
import { mthdCdType } from '@/helper/mthdCdType';
import { getWeekList } from '@/helper/weekList';
import { auditDate } from '@/helper/auditDate';
import chalkboardIcon from '@/assets/img/icons/chalkboard.svg';
import bookIcon from '@/assets/img/icons/book.svg';
import alarmIcon from '@/assets/img/icons/alarm.svg';
import schoolIcon from '@/assets/img/icons/school.svg';
import calendarIcon from '@/assets/img/icons/calendar.svg';

export default {
    name: 'profsr-class-info',
    data() {
        return {
            lecture: {},
            thisWeek: [],
            setToday: '',
            startTime: '',
            endTime: '',
            clsTm: '',
            startInd: '',
            endInd: '',
            timeLine: [
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
            ],
            chalkboardIcon,
            bookIcon,
            alarmIcon,
            schoolIcon,
            calendarIcon,
        };
    },
    computed: {
        search() {
            return this.$store.state.profsr.searchEattdOpenRpstStaffInfo;
        },
    },
    methods: {
        getLecture() {
            if (!this.isEmptyObj(this.search)) {
                this.$store.dispatch('profsr/getLectureInfo', this.search).then((d) => {
                    this.lecture = d.data.resultData;
                    this.findClsDate(d.data.resultData.dayCd);
                    this.startTime = this.timeFormat(d.data.resultData.fromTm);
                    this.endTime = this.timeFormat(d.data.resultData.toTm);
                    this.clsTm =  d.data.resultData.clsTm;
                    this.startInd =
                        this.timeLine.findIndex((t) => {
                            return t == this.timeFormat(d.data.resultData.fromTm);
                        }) / 2;
                    this.endInd =
                        this.timeLine.findIndex((t) => {
                            return t == this.timeFormat(d.data.resultData.toTm);
                        }) / 2;

                    this.$store.commit('profsr/setLecture', d.data.resultData);
                });
            }
        },
        getThisWeek() {
            let weekStartDt = '';
            if (Object.keys(this.$store.state.common.weekDay).length === 0 && this.$store.state.common.weekDay.constructor === Object) {
                weekStartDt = auditDate().checkDate;
            } else {
                weekStartDt = this.$store.state.common.weekDay.startDate;
            }
            const calDate = new Date(weekStartDt.slice(0, 4), weekStartDt.slice(4, 6) - 1, weekStartDt.slice(6));
            this.thisWeek = getWeekList(calDate);
            this.getLecture();
        },
        findClsDate(dayCd) {
            const dayNum = dayCd.replace('CBA62.', '');
            this.setToday = this.thisWeek[dayNum].y + '.' + this.thisWeek[dayNum].M + '.' + this.thisWeek[dayNum].d + ' (' + this.thisWeek[dayNum].dayS + ')';
            this.$store.commit('common/getWeekDate', this.thisWeek[dayNum].y + this.thisWeek[dayNum].M + this.thisWeek[dayNum].d);
        },
        timeFormat(time) {
            const splitTime = time.split('~');
            return splitTime[0].slice(0, 2) + ':' + splitTime[0].slice(2, 4);
        },
        isEmptyObj(obj) {
            if (obj.constructor === Object && Object.keys(obj).length === 0) {
                return true;
            }

            return false;
        },
    },
};
</script>
