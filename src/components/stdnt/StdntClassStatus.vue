<template>
    <div>
        <div class="main__class">
            <div class="refresh_wrap sub-title">
                <span>수강중인 수업</span>
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
                                <ion-skeleton-text :animated="true" style="width: 60px; height: 60px" />
                            </div>
                            <div class="class__infos">
                                <ion-skeleton-text :animated="true" style="width: 80%; margin-bottom: 8px" />
                                <ion-skeleton-text :animated="true" style="width: 80%; height: 20px; margin-bottom: 8px" />
                                <ion-skeleton-text :animated="true" style="width: 60%;" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else>
               <ul v-if="classList.length > 0">
                  <li v-for="(item, i) in classList" :key="(item, i)" @click="classDetail(item)" class="class_item" :class="getAttTypeNm(item).status">
                     <div class="class__argumnet">
                        <div class="class__state">
                           <span class="state__text">
                              {{ getAttTypeNm(item).text }}
                           </span>
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
                              ({{ item.clsTm }})
                              {{ item.openSbjtNo }}
                           </div>
                           <div class="class__name">{{ item.sbjtNm }} ({{ item.staffNm }})</div>
                           <div class="class__place">{{ item.ltBldgNm }} {{ item.ltrmNm }}</div>
                        </div>
                     </div>
                  </li>
               </ul>
                <ul v-else>
                    <div style="color: #888888; padding: 18vh 0; text-align: center;">
                        <strong>수강중인 수업이 없습니다.</strong>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import SearchEattdTlsnStdInfo from '@/model/search-eattd-tlsn-std-info';
import SearchEattdOpenSche from '@/model/search-eattd-open-sche';
import { attType } from '@/helper/attType';
import { auditDate } from '@/helper/auditDate';
import { toastMsg } from '@/helper/alertMsg';
import { presentLoading } from '@/helper/loading';
import SearchEattdOpenRpstStaffInfo from '@/model/search-eattd-open-rpst-staff-info';
import reloadIcon from '@/assets/img/icons/reload.svg';
import QRIcon from '@/assets/img/icons/QR_icon.svg';
import beaconIcon from '@/assets/img/icons/beacon_icon.svg';
import OTPIcon from '@/assets/img/icons/OTP_icon.svg';
import { IonSkeletonText } from '@ionic/vue';

export default {
    name: 'stdnt-class-status',
    components: { IonSkeletonText },
    data() {
        return {
            classList: [],
            search: new SearchEattdTlsnStdInfo(),
            searchEattdOpenSche: new SearchEattdOpenSche(),
            semesterInfo: {},
            checkDate: auditDate().checkDate,
            yy: auditDate().yy,
            reloadIcon,
            isLoading: true,
        };
    },
    setup() {
      return { QRIcon,  beaconIcon, OTPIcon, }
    },
    computed: {
        user() {
            return this.$store.state.signIn.user;
        },
    },
    methods: {
        classDetail(item) {
            const searchDetail = new SearchEattdTlsnStdInfo();
            searchDetail.openSbjtNo = item.openSbjtNo;
            searchDetail.stdNo = item.stdNo;
            searchDetail.openYy = item.openYy;
            searchDetail.openDclss = item.openDclss;
            searchDetail.openShtmCd = item.openShtmCd;
            searchDetail.checkDate = this.checkDate;
            searchDetail.staffNo = item.staffNo;
            searchDetail.fromTm = item.fromTm;

            this.$store.commit('stdnt/setSearch', searchDetail);
            this.$router.push('stdnt/att/class');
        },

        async getSemesterInfo() {
            try {
                this.isLoading = true;

                this.checkDate = auditDate().checkDate;
                this.yy = auditDate().yy;

                this.searchEattdOpenSche.orgnClsfCd = this.user.orgnClsfCd;
                this.searchEattdOpenSche.checkDate = this.checkDate;
                this.searchEattdOpenSche.yy = this.yy;

                const d = await this.$store.dispatch('common/getSemesterInfo', this.searchEattdOpenSche);
                this.semesterInfo = d.data.resultData;

                await this.setWeekList();
                await this.getLectureList();
            } finally {
                this.isLoading = false;
            }
        },

        async refresh() {
            const loading = await presentLoading();
            this.getSemesterInfo().finally(() => {
                loading.dismiss();
                toastMsg('수강중인 수업을 조회했습니다.');
            });
        },

        async getLectureList() {
            if (this.user.mbrNo !== null) {
                this.search.stdNo = this.user.mbrNo;
                this.search.openYy = this.yy;
                this.search.openShtmCd = this.semesterInfo.shtmCd;
                this.search.checkDate = this.checkDate;
                let tempClsList = [];
                let idxList = [];

                try {
                    const d = await this.$store.dispatch('stdnt/getLectureList', this.search);

                    tempClsList = d.data.resultData;

                    for (let index = 0; index < tempClsList.length; index++) {
                        const element = tempClsList[index];
                        const search = new SearchEattdOpenRpstStaffInfo();
                        search.ltStaffNo = element.staffNo;
                        search.openYy = element.openYy;
                        search.checkDate = this.checkDate;
                        search.openShtmCd = element.openShtmCd;
                        search.openSbjtNo = element.openSbjtNo;
                        search.openDclss = element.openDclss;
                        search.fromTm = element.fromTm;

                        const detail = await this.$store.dispatch('profsr/getLectureInfo', search);
                        if (detail.data.resultData == null) {
                            idxList.push(index);
                        }
                        if (index == tempClsList.length - 1) {
                           const matchingElements = tempClsList.filter((data, i) => !idxList.includes(i));
                           this.classList = matchingElements.filter( arg => this.timeCheck(arg.clsTm));

                           // this.classList = matchingElements;
                        }
                    }
                } catch {
                    toastMsg('수강중인 수업 조회실패');
                }
            }
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
                if (weekData[key].startDate <= this.searchEattdOpenSche.checkDate && weekData[key].endDate >= this.searchEattdOpenSche.checkDate) {
                    this.$store.commit('common/setWeek', weekData[key]);
                }
            }
        },
        getAttTypeNm(data) {
            if (data.attDiv == null) {
                return { text:'미출석', status:'status5'};
            } else {
                return attType(data.attDiv);
            }
        },
        timeCheck(time) {
            const date = new Date();
            const nowHours = String(date.getHours());
            const nowMin = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            const nowTimeData = Number(nowHours+nowMin);
            const endTime = time.split('~')[1].trim().split(':')[0] + time.split('~')[1].trim().split(':')[1];
            const toAttendance = Number(endTime);

            // 지난수업
            if(toAttendance < nowTimeData) {
               return false
            };

            return true;
        },
    },
};
</script>

<style lang="scss" scoped>
   .refresh_wrap {
      display:flex;
      justify-content: space-between;
      gap: 15px;
      > span {
         font-family: var(--ion-font-family);
         font-size: 20px;
         color:#000;
      }
   }
   .main__class {
      position: relative;
   }
</style>
