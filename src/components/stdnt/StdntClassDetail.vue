<template>
    <ul class="class-list">
        <li>
            <ion-icon :icon="bookIcon" />
            <div>
                <span>과목</span>
                <strong>{{ clsDetail.sbjtNm }} ({{ clsDetail.openSbjtNo }})</strong>
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
               {{ clsDetail.ltBldgNm }} {{ clsDetail.ltrmNm }}
            </div>
        </li>
        <li>
            <ion-icon :icon="schoolIcon" />
            <div>
                <span>교수</span>
                {{ clsDetail.staffNm }}
            </div>
        </li>
    </ul>
</template>

<script>
import { getWeekList } from '@/helper/weekList';
import { auditDate } from '@/helper/auditDate';
import chalkboardIcon from '@/assets/img/icons/chalkboard.svg';
import bookIcon from '@/assets/img/icons/book.svg';
import alarmIcon from '@/assets/img/icons/alarm.svg';
import schoolIcon from '@/assets/img/icons/school.svg';
import calendarIcon from '@/assets/img/icons/calendar.svg';

export default {
    name: 'stdnt-class-detail',
    data() {
        return {
            search: this.$store.state.stdnt.getDetail,
            clsDetail: {},
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
    watch: {
        '$store.state.stdnt.getDetail': function () {
            this.search = this.$store.state.stdnt.getDetail;
            this.getClsDetail();
        },
    },
    mounted() {
        this.getThisWeek();
    },
    ionViewDidLeave() {
        this.clsDetail = {};
    },
    methods: {
        getClsDetail() {
            const timeFormat = time => {
               const splitTime = time.split('~');

                return splitTime[0].slice(0, 2) + ':' + splitTime[0].slice(2, 4);
            };

            this.$store.dispatch('stdnt/getLectureInfo', this.search).then((d) => {
                this.clsDetail = d.data.resultData;
                this.findClsDate(this.clsDetail.dayCd);

                this.startTime = timeFormat(d.data.resultData.fromTm);
                this.endTime = timeFormat(d.data.resultData.toTm);
                this.clsTm =  d.data.resultData.clsTm;
                this.startInd =
                    this.timeLine.findIndex((t) => {
                        return t == timeFormat(d.data.resultData.fromTm);
                    }) / 2;
                this.endInd =
                    this.timeLine.findIndex((t) => {
                        return t == timeFormat(d.data.resultData.toTm);
                    }) / 2;

                /* 과목정보 store 추가*/
                this.$store.commit('stdnt/setLectureInfo', d.data.resultData);
            });
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

            this.getClsDetail();
        },
        findClsDate(dayCd) {
            const dayNum = dayCd.replace('CBA62.', '');
            this.setToday = this.thisWeek[dayNum].y + '.' + this.thisWeek[dayNum].M + '.' + this.thisWeek[dayNum].d + ' (' + this.thisWeek[dayNum].dayS + ')';
        },
        
    },
};
</script>
