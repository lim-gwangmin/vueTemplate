<template>
   <div class="main__class">
      <div class="refresh_wrap sub-title">
         <span>강의 중인 수업</span>
         <ion-button fill="clear" @click="refresh()" shape="round"> 
            <ion-icon :icon="reloadIcon" slot="end"> </ion-icon>
         </ion-button>
      </div>
      <!-- <div class="code-wrapper">
         <ul>
            <li class="QR"><ion-icon :src="QRIcon"></ion-icon>QR코드 </li>
            <li class="beacon"><ion-icon :src="beaconIcon"></ion-icon>비콘</li>
            <li class="OTP"><ion-icon :src="OTPIcon"></ion-icon>출석코드</li>
         </ul> 
      </div> -->
        <div v-if="isLoading">
            <ul class="class__list">
                <li v-for="i in 3" :key="`skel_${i}`" class="is--loading">
                    <div class="class__item">
                        <div class="class__state">
                            <ion-skeleton-text :animated="true" style="width: 40px; height: 40px" />
                        </div>
                        <div class="class__infos">
                            <ion-skeleton-text :animated="true" style="width: 80%; margin-bottom: 8px" />
                            <ion-skeleton-text :animated="true" style="width: 80%; height: 20px; margin-bottom: 8px" />
                            <ion-skeleton-text :animated="true" style="width: 60%; margin-bottom: 8px" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
         <!-- status1: 수업완료 status4: 수업전 -->
        <div v-else>
            <ul v-if="lectureList.length > 0">
               <li v-for="(item, i) in lectureList" 
                  class="class_item" :key="(item, i)" 
                  @click="getLecture(item)"
                  :class="timeCheck(item.fromTm, item.toTm).state">
                  <div class="class__argumnet">
                     <div class="class__state">
                        <span class="state__text">{{ timeCheck(item.fromTm, item.toTm).text }}</span>
                        <!-- <ul v-if="item.attendanceType === 'ULS59.10.10'" class="code_picker">
                           <li class="OTP"></li>
                        </ul>
                        <ul v-if="item.attendanceType === 'ULS59.10.20'" class="code_picker">
                           <li class="QR"></li>
                        </ul>
                        <ul v-if="item.attendanceType === 'ULS59.10.30'" class="code_picker">
                           <li class="QR"></li>
                           <li class="OTP"></li>
                        </ul>
                        <ul v-if="item.attendanceType === 'ULS59.10.40'" class="code_picker">
                            <li class="QR"></li>
                            <li class="beacon"></li>
                        </ul>
                        <ul v-if="item.attendanceType === 'ULS59.10.50'" class="code_picker">
                           <li class="OTP"></li>
                           <li class="beacon"></li>
                        </ul>
                        <ul v-if="item.attendanceType === 'ULS59.10.60'" class="code_picker">
                           <li class="QR"></li>
                           <li class="OTP"></li>
                           <li class="beacon"></li>
                        </ul>
                        <ul v-if="!item.attendanceType || item.attendanceType === 'null' " class="code_picker">
                           <li class="QR"></li>
                           <li class="OTP"></li>
                           <li class="beacon"></li>
                        </ul> -->
                     </div>
                     <div class="class__infos">
                        <div class="class__time">
                           ( {{ item.clsTm }} ) {{ item.openSbjtNo }}
                        </div>
                        <div class="class__name">{{ item.sbjtNm }} ({{ item.sustNm }})</div>
                        <div class="class__place">{{ item.ltBldgNm }} {{ item.ltrmNm }}</div>
                     </div>
                  </div>
               </li>
            </ul>
            <ul v-else>
                <div style="color: #888888; padding: 18vh 0; text-align: center;">
                    <strong>강의중인 수업이 없습니다.</strong>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import SearchEattdOpenRpstStaffInfo from '@/model/search-eattd-open-rpst-staff-info';
import { mthdCdType } from '@/helper/mthdCdType';
import { auditDate } from '@/helper/auditDate';
import { presentLoading } from '@/helper/loading';
import { toastMsg } from '@/helper/alertMsg';
import reloadIcon from '@/assets/img/icons/reload.svg';
import QRIcon from '@/assets/img/icons/QR_icon.svg';
import beaconIcon from '@/assets/img/icons/beacon_icon.svg';
import OTPIcon from '@/assets/img/icons/OTP_icon.svg';
import { IonSkeletonText } from '@ionic/vue';

export default {
    name: 'profsr-today-class',
    components: { IonSkeletonText },
    data() {
        return {
            searchEattdOpenRpstStaffInfo: new SearchEattdOpenRpstStaffInfo(),
            lectureList: [],
            semesterInfo: {},
            checkDate: auditDate().checkDate,
            yy: auditDate().yy,
            isLoading: true,
        };
    },
    computed: {
        user() {
            return this.$store.state.signIn.user;
        },
    },
    setup() {
      return { QRIcon,  beaconIcon, OTPIcon, reloadIcon }
    },
    methods: {
        async getLectureList() {
            this.searchEattdOpenRpstStaffInfo.ltStaffNo = this.user.mbrNo;
            /* 2021년 12월 말 ~ 1월은 수강중인 수업이 없어서 임의의 날자를 셋팅 */
            this.searchEattdOpenRpstStaffInfo.openYy = this.yy;
            this.searchEattdOpenRpstStaffInfo.checkDate = this.checkDate;

            const d = await this.$store.dispatch('profsr/getLectureList', this.searchEattdOpenRpstStaffInfo);
            const { resultData } = d.data;
            const moveDataToEnd = resultData.filter( arg => this.timeCheck(arg.fromTm, arg.toTm).state === 'status1');
            const remainder = resultData.filter( arg => this.timeCheck(arg.fromTm, arg.toTm).state !== 'status1');
            remainder.push(...moveDataToEnd); 

            this.lectureList = remainder;
            this.setWeekList();
        },

        getLecture(item) {
            const searchEattdOpenRpstStaffInfo = new SearchEattdOpenRpstStaffInfo();
            searchEattdOpenRpstStaffInfo.ltStaffNo = item.ltStaffNo;
            searchEattdOpenRpstStaffInfo.openYy = item.openYy;
            searchEattdOpenRpstStaffInfo.checkDate = this.checkDate; //item.dayCd;
            searchEattdOpenRpstStaffInfo.openShtmCd = item.openShtmCd;
            searchEattdOpenRpstStaffInfo.openSbjtNo = item.openSbjtNo;
            searchEattdOpenRpstStaffInfo.openDclss = item.openDclss;
            searchEattdOpenRpstStaffInfo.fromTm = item.fromTm;
            this.$store.dispatch('profsr/getLecture', searchEattdOpenRpstStaffInfo).then((d) => {
                if (d == true) {
                    this.$router.push('/cnu/profsr/att/class').catch(() => {});
                }
            });
        },

        async refresh() {
            const loading = await presentLoading();

            this.getSemesterInfo().finally(() => {
                loading.dismiss();
                toastMsg('강의중인 수업을 조회했습니다.');
            });
        },

        async getSemesterInfo() {
            try {
                this.isLoading = true;

                this.checkDate = auditDate().checkDate;
                this.yy = auditDate().yy;

                const search = new SearchEattdOpenRpstStaffInfo();
                search.checkDate = this.checkDate;
                search.yy = this.yy;

                const d = await this.$store.dispatch('common/getSemesterList', search);
                this.semesterInfo = d.data.resultData[0];

                await this.getLectureList();
            } finally {
                this.isLoading = false;
            }
        },

        timeFormat(time) {
            return time.slice(0, 2) + ':' + time.slice(2, 4);
        },
        timeCheck(from, to) {
            const date = new Date();
            const nowHours = String(date.getHours());
            const nowMin = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            const nowTimeData = Number(nowHours+nowMin);
            const fromAttendance = Number(from);
            const toAttendance = Number(to);

            // 수업 전 
            if(fromAttendance > nowTimeData) {
               return { text: '수업전', state: 'status4' }
            }
            // 수업 중
            if(fromAttendance <= nowTimeData && toAttendance >= nowTimeData) {
               return { text: '수업중', state: 'status3' }
            }
            // 수업 완료
            if(toAttendance < nowTimeData) {
               return { text: '수업 완료', state: 'status1' }
            };
        },
        async setWeekList() {
            const fromDt = this.semesterInfo.ltFromDt;
            const toDt = this.semesterInfo.ltToDt;

            const d = await this.$store.dispatch('common/getWeekList', {
                ltFromDt: fromDt,
                ltToDt: toDt,
            });
            const weekData = d.data.resultData;
            const getWeeks = Object.keys(weekData);

            for (let index = 0; index < getWeeks.length; index++) {
                const key = getWeeks[index];
                if (weekData[key].startDate <= this.checkDate && weekData[key].endDate >= this.checkDate) {
                    this.$store.commit('common/setWeek', weekData[key]);
                }
            }
        },
    },
};
</script>
