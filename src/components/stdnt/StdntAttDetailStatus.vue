<template>
    <div class="attendance--detail">
        <div class="sub-title">
            <span>출결 상세정보</span>
            <span class="state" :class="attTypeName.status">
               {{ attTypeName.text }}
            </span>
        </div>
         <div class="detail__time_table">
            <table border="1">
               <tbody v-if="histList.length > 0">
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
</template>

<script>
import SearchWifiRcptnHist from '@/model/search-wifi-rcptn-hist';
import { auditDate } from '@/helper/auditDate';
import SearchAttHist from '@/model/search-att-hist';
import debounce from 'lodash/debounce';
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
    name: 'stdnt-att-detail-status',
    components: { IonBadge },
    data() {
        return {
            searchWifiRcptnHist: new SearchWifiRcptnHist(),
            lectureInfo: {},
            histList: [],
            search: {},
            yy: auditDate().yy,
            attTypeName: {text:'', status:''},
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
    watch: {
        '$store.state.stdnt.lectureInfo': function () {
            this.lectureInfo = this.$store.state.stdnt.lectureInfo;
            this.getAttendanceRecordList();
        },
    },
    methods: {
        getAttendanceRecordList: debounce(function () {
            const param = new SearchAttHist();
            param.openYr = this.yy;
            param.openShtmCd = this.lectureInfo.openShtmCd;
            param.openOrgnClsfCd = this.lectureInfo.openOrgnClsfCd;
            param.openSust = this.lectureInfo.openSust;
            param.openSbjtNo = this.lectureInfo.openSbjtNo;
            param.openDclss = this.lectureInfo.openDclss;
            param.ltStaffNo = this.lectureInfo.staffNo;
            param.stdNo = this.lectureInfo.stdNo;
            param.attYmd = this.$store.state.stdnt.getDetail.checkDate;
            if (this.lectureInfo.skpDt) {
                param.skltDt = this.lectureInfo.skpDt;
            }
            this.$store.dispatch('common/getAttendanceList', param).then((d) => {
                const data = d.data.resultData;
                if (data && data.length) {
                    const attDiv = data[0].attDiv;
                    if (attDiv == null) {
                        this.attTypeName = {text:'미출석', status:'status5'};
                    } else {
                        this.attTypeName = attType(attDiv);
                    }
                } else {
                    this.attTypeName = {text:'미출석', status:'status5'};
                }
            });


            this.searchWifiRcptnHist.openYr = this.yy;
            this.searchWifiRcptnHist.openShtmCd = this.lectureInfo.openShtmCd; // 참가 학기 코드
            this.searchWifiRcptnHist.openOrgnClsfCd = this.lectureInfo.openOrgnClsfCd; // 참가 조직 분류 코드
            this.searchWifiRcptnHist.openSust = this.lectureInfo.openSust; // 참가 학과
            this.searchWifiRcptnHist.openSbjtNo = this.lectureInfo.openSbjtNo; // 참가 과목 번호
            this.searchWifiRcptnHist.openDclss = this.lectureInfo.openDclss; // 참가 분반
            this.searchWifiRcptnHist.ltStaffNo = this.lectureInfo.staffNo; // 강의 교직원 번호
            this.searchWifiRcptnHist.stdNo = this.lectureInfo.stdNo; // 학생 번호
            this.searchWifiRcptnHist.attYmd = this.$store.state.stdnt.getDetail.checkDate; // this.$store.state.common.weekDate; // 출석 일자
            if (this.lectureInfo.skpDt) {
                this.searchWifiRcptnHist.skltDt = this.lectureInfo.skpDt;
            }

            this.$store.dispatch('common/getAttendanceRecordList', this.searchWifiRcptnHist /*param*/).then((d) => {
                this.histList = d.data.resultData;
            });
        }, 100),
    },
};
</script>

<style scoped>
.detail__time_table {
   th, td {
      font-size: 14px;
   }
}
.correct {
    color: #3d61ad;
}
.correct.not {
    color: #ec7660;
}
</style>
