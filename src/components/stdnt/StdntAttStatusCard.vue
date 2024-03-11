<template>
   <section class="section">
      <div class="date_select_wrap">
         <ion-button @click="decreaseDate()" class="arrow-btn">
            <ion-icon :src="leftArrow"></ion-icon>
         </ion-button>
         <ion-button @click="openDatePopup()">{{ formatDate }}</ion-button>
         <ion-button @click="increaseDate()" class="arrow-btn">
            <ion-icon :src="rightArrow"></ion-icon>
         </ion-button>
      </div>
   </section>
   <section class="section">
      <ul class="data-list" v-if="classData.length !== 0">
         <li v-for="(item, i) in classData" :key="`status_${i}`" class="is--loading" @click="detail(item)">
            <div class="list-status">
               <span class="time">({{ item.clsTm }}) {{ item.openSbjtNo }}</span>
               <span v-if="item.attDiv === 'ULS58.10'" class="state status1">출석</span>
               <span v-if="item.attDiv === 'ULS58.20'" class="state status2">지각</span>
               <span v-if="item.attDiv === 'ULS58.30'" class="state status3">조퇴</span>
               <span v-if="item.attDiv === 'ULS58.40'" class="state status4">결석</span>
               <span v-if="item.attDiv === 'ULS58.50'" class="state status5">공결</span>
               <span v-if="item.attDiv === 'ULS58.60'" class="state status6">휴가</span>
               <span v-if="item.attDiv === '' || item.attDiv === null" class="state status7">미출결</span>
            </div>

            <div class="list-comment">
               <b>{{ item.sbjtNm }}</b>
               <p>{{ item.ltBldgNm + ' ' + item.ltrmNm }}</p>
            </div>
         </li>
      </ul>
      <div class="non-data" v-else>수업이 없습니다.</div>
   </section>
</template>

<script>
import SearchEattdOpenSche from '@/model/search-eattd-open-sche';
import SearchEattdTlsnStdInfo from '@/model/search-eattd-tlsn-std-info';
import { auditDate } from '@/helper/auditDate';
import { computed } from 'vue';
import { useStore } from 'vuex';
import SearchEattdOpenRpstStaffInfo from '@/model/search-eattd-open-rpst-staff-info';
import { IonSelect, IonSelectOption } from '@ionic/vue';
import dayjs from 'dayjs';
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import leftArrow from '@/assets/img/icons/date_prev_icon.svg';
import rightArrow from '@/assets/img/icons/date_next_icon.svg';
import status1 from '@/assets/img/icons/statusIcon_01.svg';
import status2 from '@/assets/img/icons/statusIcon_02.svg';
import status3 from '@/assets/img/icons/statusIcon_03.svg';
import status4 from '@/assets/img/icons/statusIcon_04.svg';
import status5 from '@/assets/img/icons/statusIcon_05.svg';
import status6 from '@/assets/img/icons/statusIcon_06.svg';
import status7 from '@/assets/img/icons/statusIcon_07.svg';

const scrollToSelected = () => {
    const selected = document.querySelector('.alert-wrapper [aria-checked="true"]');
    selected && selected.scrollIntoView();
};

export default {
    name: 'stdnt-att-status-table',
    components: {
        IonSelect,
        IonSelectOption,
    },
    setup() {
      const store = useStore();
      const openDatePopup = () => store.commit('dateSelectPopup/showDateSelectPopup', true);
      const decreaseDate = () => store.commit('dateSelectPopup/decreaseDate');
      const increaseDate = () => store.commit('dateSelectPopup/increaseDate');
      return { 
         status1,
         status2,
         status3,
         status4,
         status5,
         status6,
         status7,
         leftArrow,
         rightArrow,
         openDatePopup,
         decreaseDate,
         increaseDate,
      }
    },   
    mounted() {
        window.addEventListener('ion-alert-did-present', scrollToSelected);
        this.getCardList();
    },
    unmounted() {
        window.removeEventListener('ion-alert-did-present', scrollToSelected);
    },
    watch: {
      formatDate() {
         this.getCardList();
      },
   },
    data() {
      const store = useStore();
      const selectDate = computed(() => store.state.dateSelectPopup.date);
      const formatDate = computed(() => store.state.dateSelectPopup.format);
        return {
         formatDate,
         selectDate,
         closeCircleOutline,
         checkmarkCircleOutline,
         classData: [],

         term: {},
         weekSize: [],
         weekData: {},
         selWeek: '',
         
         user: this.$store.state.signIn.user,
      };
    },
    methods: {
         getCardList() {
            const param = new SearchEattdOpenSche();
            param.yy = auditDate().yy;
            param.orgnClsfCd = this.user.orgnClsfCd;

            this.$store.dispatch('common/getSemesterList', param).then((d) => {
                param.checkDate = auditDate().checkDate;

               this.$store.dispatch('common/getSemesterInfo', param).then((d) => {
                  const { resultData } = d.data;
                  this.term = resultData;

                  if(!resultData) return;

                  const searchL = new SearchEattdTlsnStdInfo();
                  const targetDate = this.$store.state.dateSelectPopup.dateNumber.replaceAll('.','');
                  searchL.stdNo = this.user.mbrNo;
                  searchL.openYy = this.$store.state.dateSelectPopup.date.getFullYear();
                  searchL.openShtmCd = resultData.shtmCd;
                  searchL.weekStartDate = targetDate;
                  searchL.weekEndDate = targetDate;
                  searchL.searchDate = targetDate;

                  this.$store.dispatch('stdnt/getScheduleCardList', searchL).then( res => {
                     const classList = res.data.resultData;

                     if(!classList) return;

                     this.classData = classList;
                     // this.setWeekList();
                  });
               });
            });
        },
        detail(cls) {
            if (cls.openSbjtNo == 'not') return;
            const weekDate = this.$store.state.dateSelectPopup.dateNumber.replaceAll('.','');
            const searchDetail = new SearchEattdTlsnStdInfo();
            searchDetail.checkDate = this.findClsDate(cls.dayCd);
            searchDetail.openSbjtNo = cls.openSbjtNo;
            searchDetail.stdNo = cls.stdNo;
            searchDetail.openYy = cls.openYy;
            searchDetail.openShtmCd = cls.openShtmCd;
            searchDetail.openDclss = cls.openDclss;
            searchDetail.staffNo = cls.staffNo;
            searchDetail.dayCd = cls.dayCd;
            searchDetail.sbjtNm = cls.sbjtNm;

            if (cls.clsDivn) {
                if (cls.clsDivn === 'N') {
                    searchDetail.fromTm = cls.fromTm;
                } else {
                    searchDetail.fromTm = cls.timeList[0][0];
                }
            } else {
                searchDetail.fromTm = cls.fromTm;
            }
            this.$store.commit('common/setWeek', { startDate: weekDate, endDate: weekDate});
            this.$store.commit('stdnt/setSearch', searchDetail);
            this.$router.push('detail');
        },
        findClsDate(dayCd) {
            const dayNum = dayCd.replace('CBA62.', '');
            if (dayNum === '7') {
                return;
            }

            const selectDay = this.$store.state.dateSelectPopup.dateNumber.replaceAll('.','');
            return selectDay;
        },
      //   setWeekList() {
      //       const fromDt = this.term.ltFromDt;
      //       const toDt = this.term.ltToDt;
      //       this.$store
      //          .dispatch('common/getWeekList', {
      //             ltFromDt: fromDt,
      //             ltToDt: toDt,
      //          })
      //          .then((d) => {
      //             this.weekData = d.data.resultData;
      //             this.weekSize = Object.keys(this.weekData);
      //             if (this.selDay == '') {
      //                this.setWeekDay(1);
      //                this.selWeek = '1';
      //             } else {
      //                this.weekSize.forEach((num) => {
      //                      if (this.weekData[num].startDate <= this.selDay && this.weekData[num].endDate >= this.selDay) {
      //                         this.selWeek = num;
      //                      }
      //                });
      //             }
      //             this.$store.commit('common/setWeek', this.weekData[this.selWeek]);
      //          });
      //   },
    },
};
</script>

<style lang="scss">
ion-backdrop {
   background: var(--ion-color-dark);
   opacity: 0.3;
}
.date_select_wrap {
   display:flex;
   justify-content: space-between;
   border: 1px solid #D8DFEE;
   border-radius: 10px;
   overflow:hidden;
   > ion-button {
      --background:#fff;
      --background-activated: #fff;
      --color: #000;
      --color-hover: #000;
      --color-activated: #000;
      --background-hover: #fff;
      --box-shadow: none;
      height: 56px;
   }
   .arrow-btn {
      flex:0 0 56px;
      font-size: 16px;
   }
   ion-button:not(.arrow-btn) {
      flex:1;
      border-width: 0 1px 0 1px;
      border-style: solid;
      border-color: #D8DFEE;
      font-size: 16px;
   }
}
.non-data {
   text-align: center;
   padding:25vh 0;
   color:rgba(0,0,0,.3);
}
.data-list > li {
   border:1px solid #D8DFEE;
   border-radius:10px;
   padding: 16px;
   ~ li {
      margin-top: 10px;
   }
}
.list-status {
   display:flex;
   justify-content: space-between;
   align-items: start;
   gap:10px;
   > .time {
      font-size: 12px;
      font-weight:500;
      color: #66728B;
   }
}
.list-comment {
   color: #000;
   > b {
      display: block;
      font-size: 18px;
   }
   > p {
      font-size: 12px;
      margin-top:10px;
   }
}
</style>