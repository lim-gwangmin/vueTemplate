<template>
   <ion-page>
      <ion-content :fullscreen="true" ref="cont">
         <div class="attendance--page">
            <div class="app_container">
               <div class="sub-title pt-top">
                  <span>
                     <em>{{ stdntData.stdNm }}</em> 출석상태 변경
                  </span>
               </div>
               <div class="edit__form">
                  <div class="form__item">
                     <ion-select v-model="att.attDiv" :toggleIcon="arrowDown" mode="md" fill="outline" label="출석상태" okText="선택완료" cancelText="닫기">
                        <ion-select-option value="">미출석</ion-select-option>
                        <ion-select-option value="ULS58.10">출석</ion-select-option>
                        <ion-select-option value="ULS58.20">지각</ion-select-option>
                        <ion-select-option value="ULS58.30">조퇴</ion-select-option>
                        <ion-select-option value="ULS58.40">결석</ion-select-option>
                        <ion-select-option value="ULS58.50">공결</ion-select-option>
                        <ion-select-option value="ULS58.60">휴가</ion-select-option>
                     </ion-select>
                  </div>
                  <div class="sub-title2">변경사유 입력</div>
                  <ion-textarea v-model="att.attResn" fill="outline" :auto-grow="true" mode="md" placeholder="출석상태 변경 사유를 입력해주세요."></ion-textarea>
                  <ion-button @click="attModify()" expand="block" mode="md" class="mt">변경</ion-button>
               </div>
               <div class="attendance--class">
                  <div class="sub-title">
                     <span> 학생정보 </span>
                  </div>
                  <ul class="class-list">
                     <li>
                           <ion-icon :icon="moodheartIcon" />
                           <div>
                              <span>학생이름 (학번)</span>
                              <strong>{{ stdntData.stdNm }} ({{ stdntData.stdNo }})</strong>
                           </div>
                     </li>
                     <li>
                           <ion-icon :icon="bookopenIcon" />
                           <div>
                              <span>대학 (학과)</span>
                              {{ stdntData.sustNm }}
                           </div>
                     </li>
                  </ul>
               </div>
               <div class="attendance--detail">
                  <div class="sub-title">
                     <span> 출결 상세정보 </span>
                  </div>
                  <div class="detail__time_table">
                     <table>
                           <caption>
                              출결 상세정보 타임테이블
                           </caption>
                           <colgroup>
                              <col style="width: 20%" />
                              <col style="width: 30%" />
                              <col style="width: 50%" />
                           </colgroup>
                           <tbody v-if="histList.length > 0">
                              <tr v-for="(hist, i) in histList" :key="(hist, i)">
                                 <th scope="row">{{ hist.wifiRcptnHr }}</th>
                                 <td class="correct">
                                       {{ hist.wifiRcptnItem }}
                                 </td>
                                 <td>
                                       <span
                                          :class="[
                                             'correct',
                                             {
                                                   not: hist.result.includes('일치하지 않음') || hist.result.includes('불일치'),
                                             },
                                          ]"
                                          >{{ hist.result }}</span>
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
         </div>
      </ion-content>
   </ion-page>
</template>

<script>
import AttHist from '@/model/att-hist';
import WifiRcptnHist from '@/model/wifi-rcptn-hist';
import SearchWifiRcptnHist from '@/model/search-wifi-rcptn-hist';
import { alertMsg } from '@/helper/alertMsg';
import { auditDate } from '@/helper/auditDate';
import { IonItem, IonSelect, IonSelectOption, IonTextarea } from '@ionic/vue';
import moodheartIcon from '@/assets/img/icons/mood-heart.svg';
import bookopenIcon from '@/assets/img/icons/book-open.svg';
import arrowDown from '@/assets/img/icons/arrowDownIcon.svg';

export default {
    name: 'profsr-modify',
    components: {
        IonItem,
        IonSelect,
        IonSelectOption,
        IonTextarea,
    },
    setup() {  
      return { arrowDown } 
   },
    data() {
        return {
            att: new AttHist(),
            wifiHist: new WifiRcptnHist(),
            histList: [],
            stdntData: this.$store.state.profsr.stdntData,
            searchHist: new SearchWifiRcptnHist(),
            yy: auditDate().yy,
            checkDate: auditDate().checkDate,
            moodheartIcon,
            bookopenIcon,
        };
    },
    ionViewWillEnter() {
        this.att.attDiv = this.stdntData.attDiv;
        if (this.stdntData.attDiv == null) {
            this.att.attDiv = '';
        }
        this.getAttData();
    },
    ionViewWillLeave() {
        this.$refs.cont.$el.scrollToPoint(0, 0);
    },
    methods: {
        attModify() {
            if (this.att.attDiv === null || this.att.attDiv === undefined) {
                alertMsg('출결 상태를 변경해주세요.');
                return;
            }


            this.att.openShtmCd = this.stdntData.openShtmCd; // 참가 학기 코드
            this.att.openOrgnClsfCd = this.stdntData.openOrgnClsfCd; // 참가 조직 분류 코드
            this.att.openSust = this.stdntData.openSust; // 참가 학과
            this.att.openSbjtNo = this.stdntData.openSbjtNo; // 참가 과목 번호
            this.att.openDclss = this.stdntData.openDclss; // 참가 분반
            this.att.ltStaffNo = this.stdntData.staffNo; // 강의 교직원 번호
            this.att.stdNo = this.stdntData.stdNo; // 학생 번호
            this.att.openYr = this.yy;
            this.att.attPrcsMthdDiv = 'ULS59.20';
            this.att.attYmd = this.$store.state.profsr.searchEattdOpenRpstStaffInfo.checkDate;
            if (this.stdntData.skpDt) {
                this.att.skltDt = this.stdntData.skpDt;
            }

            this.$store.dispatch('common/setAttendance', this.att).then((d) => {
                if (d.data.resultCode == 200) {
                    alertMsg('출석 정보 수정이 완료되었습니다.');
                } else if (d.data.resultCode != 200) {
                    alertMsg('출석 정보 수정에 실패했습니다.');
                }

                this.$router.replace('/cnu/profsr/att/class');

                this.att = new AttHist();
            });
        },
        getAttData() {
            this.searchHist.openShtmCd = this.stdntData.openShtmCd; // 참가 학기 코드
            this.searchHist.openOrgnClsfCd = this.stdntData.openOrgnClsfCd; // 참가 조직 분류 코드
            this.searchHist.openSust = this.stdntData.openSust; // 참가 학과
            this.searchHist.openSbjtNo = this.stdntData.openSbjtNo; // 참가 과목 번호
            this.searchHist.openDclss = this.stdntData.openDclss; // 참가 분반
            this.searchHist.ltStaffNo = this.stdntData.staffNo; // 강의 교직원 번호
            this.searchHist.stdNo = this.stdntData.stdNo; // 학생 번호
            this.searchHist.openYr = this.yy;
            this.searchHist.attYmd = this.$store.state.profsr.searchEattdOpenRpstStaffInfo.checkDate;
            if (this.stdntData.skpDt) {
                this.searchHist.skltDt = this.stdntData.skpDt;
            }
            this.$store.dispatch('common/getAttendanceRecordList', this.searchHist).then((d) => {
                this.histList = d.data.resultData;
            });
        },
    },
};
</script>

<style scoped lang="scss">
.correct {
    color: #3d61ad;
}
.correct.not {
    color: #ec7660;
}
.edit__form {
    .form__item {
        & ~ .form__item {
            margin-top: calc(25 / 7.5) + vw;
            padding-top: calc(25 / 7.5) + vw;
        }
    }
}
ion-button {
   font-size: 14px;
}
.sub-title2 {
   padding: 30px 0 15px;
   color:#000;
}
.attendance--class .sub-title {
    padding: 1.8em 0.4em 0.7em;
}
</style>
