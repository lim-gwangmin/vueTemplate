<template>
    <div class="attendance--commute">
      <div class="sub-title">
         <span>출석 <small> 출결정보는 [Wifi/GPS]의 매칭정보입니다.</small></span>
         <ion-button fill="clear" @click="refresh()" shape="round"> <ion-icon :icon="reloadIcon" slot="end"> </ion-icon></ion-button>
      </div>

      <div class="commute__tab">
         <a class="tab__button" @click="ttsUsing('part')" style="display: flex; align-items: center">
            <span>{{ ttsUse['part']['text'] }}</span>
            <ion-icon :icon="`${ttsUse['part']['icon']}`" style="padding-left: 5px"></ion-icon>
         </a>
         <a class="tab__button" @click="ttsUsing('all')" style="display: flex; align-items: center">
            <span>{{ ttsUse['all']['text'] }}</span>
            <ion-icon :icon="`${ttsUse['all']['icon']}`" style="padding-left: 5px"></ion-icon>
         </a>
      </div>
      <div class="commute__state">
         총 <span> {{ studentList.length }}</span> 명
         <em>/</em>
         출석등록
         <span class="state__complete">{{ studentList.length - unAttNum }}</span> 
         명 
         <em>/</em>
            미등록
         <span class="state__notyet">{{ unAttNum }}</span> 명
      </div>
      <div class="code-wrapper" style="margin: 12px auto;">
         <ul>
            <li class="QR"><ion-icon :src="QRIcon"></ion-icon>QR코드 </li>
            <li class="beacon"><ion-icon :src="beaconIcon"></ion-icon>비콘</li>
            <li class="OTP"><ion-icon :src="OTPIcon"></ion-icon>출석코드</li>
         </ul> 
      </div>
        <ion-list mode="md">
            <ion-item lines="full">
                <div slot="start" class="check-btn">
                    <!-- <ion-checkbox :checked="chkall" label-placement="end" mode="md" slot="start" @click.prevent="checkAll()" >전체선택 {{ chkall  }}</ion-checkbox> -->
                    <ion-button mode="md" fill @click="changeAttend">출석상태변경</ion-button>
                </div>
                <div>
                  <ion-select
                     v-model="orderBy_attDiv"
                     placeholder="전체"
                     :toggleIcon="arrowDown"
                     okText="선택"
                     cancelText="취소"
                     mode="md"
                     slot="end"
                     :interface-options="{
                        header: '정렬순서를 선택해 주세요.',
                        translucent: true,
                     }">
                     <ion-select-option value="">미출석</ion-select-option>
                     <ion-select-option value="all">전체</ion-select-option>
                     <ion-select-option value="ULS58.10">출석</ion-select-option>
                     <ion-select-option value="ULS58.20">지각</ion-select-option>
                     <ion-select-option value="ULS58.30">조퇴</ion-select-option>
                     <ion-select-option value="ULS58.40">결석</ion-select-option>
                     <ion-select-option value="ULS58.50">공결</ion-select-option>
                     <ion-select-option value="ULS58.60">휴가</ion-select-option>
                  </ion-select>
                  <ion-select 
                     v-model="orderBy"
                     placeholder="정렬"
                     :toggleIcon="arrowDown"
                     okText="선택"
                     cancelText="취소"
                     mode="md"
                     slot="end"
                     :interface-options="{
                        header: '정렬순서를 선택해 주세요.',
                        translucent: true,
                     }">
                     <ion-select-option value="stdNo">학번순</ion-select-option>
                     <ion-select-option value="stdNm">이름순</ion-select-option>
                  </ion-select>
                </div>
            </ion-item>
            <div class="table_wrap">
               <table>
                  <colgroup>
                     <col style="width:5%;">
                     <col style="width:3%;">
                     <col style="width:10%;">
                     <col style="width:10%;">
                     <col style="width:10%;">
                     <col style="width:10%;">
                  </colgroup>
                  <thead>
                     <tr>
                        <th><ion-checkbox :checked="chkall" label-placement="end" mode="md" slot="start" @ion-change="checkAll()"></ion-checkbox></th>
                        <th>학번</th>
                        <th>이름</th>
                        <th>출결<br>상태</th>
                        <th>시간</th>
                        <th>출결<br>방법</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-if="sortedStudentList.length" v-for="(item, i) in sortedStudentList" :key="`student_${i}`" >
                        <td>
                           <ion-checkbox v-model="item.chk" slot="start" @ion-change="changeChkAll()"></ion-checkbox>
                        </td>
                        <td @click="stdntInfo(item)" class="std_number">{{ item.stdNo }}</td>
                        <td @click="stdntInfo(item)" class="std_name">{{ item.stdNm }}</td>
                        <td 
                           @click="stdntInfo(item)" 
                           class="correct" 
                           :class="{ not: item.attDiv !== 'ULS58.10',}">
                              {{ item.attTypeNm }}
                        </td>
                        <td @click="stdntInfo(item)" class="time">{{ item.attPrcsDt != null ? item.attPrcsDt.slice(11, 16) : '' }}</td>
                        <td>
                           <ul class="code_picker">
                              <li v-if="item.attPrcsQrYn === 'Y' " class="QR"></li>
                              <li v-if="item.attPrcsBcYn === 'Y' " class="beacon"></li>
                              <li v-if="item.attPrcsCdYn === 'Y' " class="OTP"></li>
                           </ul>
                        </td>
                     </tr>
                     <tr v-else>
                        <td colspan="6" class="non-data" style="padding:60px 0;">학생정보가 없습니다.</td>
                     </tr>
                  </tbody>
               </table>
            </div>
        </ion-list>
    </div>
</template>

<script>
import SearchEattdTlsnStdInfo from '@/model/search-eattd-tlsn-std-info';
import { attType } from '@/helper/attType';
import { auditDate } from '@/helper/auditDate';
import SearchWifiRcptnHist from '@/model/search-wifi-rcptn-hist';
import { isPlatform } from '@ionic/core';
import { TextToSpeechAdvanced } from '@awesome-cordova-plugins/text-to-speech-advanced';
import { volumeHighOutline, volumeMuteOutline } from 'ionicons/icons';
import _orderBy from 'lodash/orderBy';
import { IonItem, IonSelect, IonSelectOption, modalController, IonCheckbox, IonLabel, IonList } from '@ionic/vue';
import { toastMsg } from '@/helper/alertMsg';
import { presentLoading } from '@/helper/loading';
import reloadIcon from '@/assets/img/icons/reload.svg';
import ChangeAttendModal from './ChangeAttendModal.vue';
import { alertMsg } from '@/helper/alertMsg';
import arrowDown from '@/assets/img/icons/arrowDownIcon.svg';
import QRIcon from '@/assets/img/icons/QR_icon.svg';
import beaconIcon from '@/assets/img/icons/beacon_icon.svg';
import OTPIcon from '@/assets/img/icons/OTP_icon.svg';

export default {
    name: 'profsr-att-info',
    components: {
        IonItem,
        IonSelect,
        IonSelectOption,
        IonCheckbox,
        IonLabel,
        IonList,
    },
    data() {
        return {
            orderBy_attDiv: '',
            orderBy: 'stdNo',
            searchEattdTlsnStdInfo: new SearchEattdTlsnStdInfo(),
            user: this.$store.state.signIn.user,
            studentList: [],
            sortedStudentList: [],
            unAttNum: 0,
            lecture: this.$store.state.profsr.lecture,
            checkDate: auditDate().checkDate,
            yy: auditDate().yy,
            ttsUse: {
                part: { icon: '', text: '', status: true },
                all: { icon: '', text: '', status: true },
            },
            volumeHighOutline: '',
            volumeMuteOutline: '',
            reloadIcon,
            chkall: false,
            startTimeSetList: this.$store.state.common.setting.startTimeSetList,
            endTimeSetList: this.$store.state.common.setting.endTimeSetList,
            methodSetList: this.$store.state.common.setting.methodSetList,
        };
    },
    computed: {
        storeLecture() {
            return this.$store.state.profsr.lecture;
        },
        isCheckMod() {
            const checked = this.studentList.filter((s) => s.chk).length;

            return checked > 0;
        },
    },
    setup() {
      return { QRIcon,  beaconIcon, OTPIcon, arrowDown }
    },
    beforeMount() {
        this.volumeMuteOutline = volumeMuteOutline;
        this.volumeHighOutline = volumeHighOutline;
        this.ttsStatusChange('all', true);
        this.ttsStatusChange('part', true);

        this.setSettingOptionList();
    },
    watch: {
      storeLecture(lecture) {
         this.lecture = lecture;
         this.getStudentList();
      },
      orderBy(order) {
         const orderBy_div = this.orderBy_attDiv;
         const otherBy = _orderBy(this.studentList, [order], ['asc']);
         // this.sortedStudentList = _orderBy(this.sortedStudentList, [order], ['asc']);

         if(orderBy_div === 'all') {
            this.sortedStudentList = otherBy;
         } else if(orderBy_div) {
            this.sortedStudentList = otherBy.filter( arg => arg.attDiv === orderBy_div);
         };

         if(orderBy_div === '') {
            this.sortedStudentList = otherBy.filter( arg => arg.attDiv === null);
         };
            
         this.orderBy = order;
      },
      orderBy_attDiv(order) {
         const otherBy = _orderBy(this.studentList, [this.orderBy], ['asc']);

         if(order === 'all') {
            this.sortedStudentList = otherBy;
         } else if(order) {
            this.sortedStudentList = otherBy.filter( arg => arg.attDiv === order);
         };

         if(order === '') {
            this.sortedStudentList = otherBy.filter( arg => arg.attDiv === null);
         };

         this.orderBy_attDiv = order;
      },
    },
    methods: {
      setSettingOptionList() {
         const GET_ATT_COMBO_LIST = 'common/getAttComboList';
         const SET_SETTING_LIST = 'common/setSettingList';
         const START_TIME_SET = { key: 'startTimeSetList', upCd: 'ULS55'};
         const END_TIME_SET = { key: 'endTimeSetList', upCd: 'ULS56'};
         const METHOD_SET = { key: 'methodSetList', upCd: 'ULS59'};

         const commitList = (key, value) => this.$store.commit(SET_SETTING_LIST, { key, value });
         
         // 교수 설정의 출석 인정시간
         this.$store.dispatch(GET_ATT_COMBO_LIST, START_TIME_SET).then( res => {
            const { resultData } = res.data;
            if(!resultData.length) return;

            commitList(START_TIME_SET.key, resultData);
         });
         // 교수 설정의 출석 종료 인정시간
         this.$store.dispatch(GET_ATT_COMBO_LIST, END_TIME_SET).then( res => {
            const { resultData } = res.data;
            if(!resultData.length) return;

            commitList(END_TIME_SET.key, resultData);
         });

         // 교수 설정의 출결 형태
         // this.$store.dispatch(GET_ATT_COMBO_LIST, METHOD_SET).then( res => {
         //    const { resultData } = res.data;
         //    if(!resultData.length) return;

         //    commitList(METHOD_SET.key, resultData);
         // });
      }, 
        checkAll() {
            this.chkall = !this.chkall;

            this.studentList.forEach((s) => {
                s.chk = this.chkall;
            });
        },
        changeChkAll() {
            const all = this.studentList.length;
            const checked = this.studentList.filter((s) => s.chk).length;
            this.chkall = all === checked;
        },
        async refresh() {
            const loading = await presentLoading();
            this.getStudentList().finally(() => {
                loading.dismiss();
                toastMsg('학생 출석정보를 재조회했습니다.');
            });
        },
        stdntInfo(stdnt) {
            if (this.isCheckMod) {
                if (stdnt.chk === undefined) {
                    stdnt.chk = true;
                } else {
                    stdnt.chk = !stdnt.chk;
                }
                return;
            }

            this.$store.commit('profsr/getStdnt', stdnt);
            this.$router.push('/cnu/profsr/att/modify');
        },
        async getStudentList() {
            this.searchEattdTlsnStdInfo.staffNo = this.user.mbrNo;
            this.searchEattdTlsnStdInfo.openYy = this.lecture.openYy;
            this.searchEattdTlsnStdInfo.openShtmCd = this.lecture.openShtmCd;
            this.searchEattdTlsnStdInfo.openSbjtNo = this.lecture.openSbjtNo;
            this.searchEattdTlsnStdInfo.openOrgnClsfCd = this.lecture.openOrgnClsfCd;
            this.searchEattdTlsnStdInfo.openSust = this.lecture.openSust;
            this.searchEattdTlsnStdInfo.openShyr = this.lecture.openShyr;
            this.searchEattdTlsnStdInfo.openDclss = this.lecture.openDclss;
            this.searchEattdTlsnStdInfo.dayCd = this.lecture.dayCd;
            this.searchEattdTlsnStdInfo.fromTm = this.lecture.fromTm;
            this.searchEattdTlsnStdInfo.checkDate = this.$store.state.profsr.searchEattdOpenRpstStaffInfo.checkDate;
            if (this.lecture.skpDt) {
                this.searchEattdTlsnStdInfo.skltDt = this.lecture.skpDt;
            }

            try {
                const loading = await presentLoading();
                const d = await this.$store.dispatch('profsr/getStudentList', this.searchEattdTlsnStdInfo);
                const list = d.data.resultData;
                this.unAttNum = list.filter((st) => st.attDiv == null).length;

                const searchHist = new SearchWifiRcptnHist();
                searchHist.openShtmCd = this.lecture.openShtmCd; // 참가 학기 코드
                searchHist.openOrgnClsfCd = this.lecture.openOrgnClsfCd; // 참가 조직 분류 코드
                searchHist.openSust = this.lecture.openSust; // 참가 학과
                searchHist.openSbjtNo = this.lecture.openSbjtNo; // 참가 과목 번호
                searchHist.openDclss = this.lecture.openDclss; // 참가 분반
                searchHist.ltStaffNo = d.data.resultData[0].staffNo; // 강의 교직원 번호
                searchHist.openYr = this.yy;
                searchHist.attYmd = this.$store.state.profsr.searchEattdOpenRpstStaffInfo.checkDate;
                if (this.lecture.skpDt) {
                    searchHist.skltDt = this.lecture.skpDt;
                }

                for (let index = 0; index < d.data.resultData.length; index++) {
                    const element = d.data.resultData[index];
                    d.data.resultData[index].attTypeNm = this.getAttTypeNm(element).text;
                    searchHist.stdNo = element.stdNo;

                    try {
                        const record = await this.$store.dispatch('common/getAttendanceRecordList', searchHist);
                        const filterList = record.data.resultData.filter((re) => re.wifiRcptnItem == '출석정보등록');
                        if (filterList.length > 0) {
                           const tempItem = filterList[filterList.length - 1];

                           if (tempItem.result.includes('일치하지 않음') || tempItem.result.includes('불일치')) {
                              list[index]['result'] = '불일치';
                           } else {
                              list[index]['result'] = '일치';
                           }
                        }
                    } catch {
                        console.log('err');
                    }
                }

                this.studentList = list;
                this.sortedStudentList = _orderBy(list, [this.orderBy], ['asc']);
                loading.dismiss();
            } catch {
                toastMsg('학생 출석정보를 조회실패');
            }
        },
        getAttTypeNm(data) {
            if (data.attDiv == null) {
                return {text:'미출석', status:'status5'};
            } else {
                return attType(data.attDiv);
            }
        },
        ttsUsing(key) {
            const status = this.ttsUse[key].status;
            this.stopAttList();

            if (status) {
                this.ttsStatusChange(key, false);
                this.speakAttList(key);
            }
        },
        speakAttList(key) {
            const ttsOpt = {
                text: '',
                identifier: 'ko-kr-x-kob-local',
                locale: 'ko-KR',
                cancel: true,
            };
            if (isPlatform('ios')) {
                ttsOpt.identifier = 'com.apple.ttsbundle.Yuna-compact';
            } else if (isPlatform('android')) {
                ttsOpt.identifier = 'ko-kr-x-kob-local';
                ttsOpt['rate'] = 1.3;
            }

            for (let index = 0; index < this.sortedStudentList.length; index++) {
                let std = this.sortedStudentList[index];
                if (key === 'part') {
                    if (std.attDiv === 'ULS58.10') {
                        ttsOpt.text += std.stdNm + ', ' + attType(std.attDiv).text + ', ';
                    }
                } else {
                    ttsOpt.text += std.stdNm + ', ' + (std.attDiv == null ? '미출석' : attType(std.attDiv).text) + ', ';
                }
            }

            TextToSpeechAdvanced.speak(ttsOpt)
                .then(() => {
                    console.log('finish');
                    this.stopAttList();
                })
                .catch((reason) => {
                    console.log('reason', reason);
                    this.stopAttList();
                });
        },
        stopAttList() {
            console.log('stopAttList');
            this.ttsStatusChange('all', true);
            this.ttsStatusChange('part', true);
            TextToSpeechAdvanced.stop();
        },
        ttsStatusChange(key, status) {
            const text = {
                all: '전체 출석 읽어주기',
                part: '출석만 읽어주기',
                stop: '읽어주기 멈춤',
            };

            this.ttsUse[key].status = status;
            if (status) {
                this.ttsUse[key].text = text[key];
                this.ttsUse[key].icon = this.volumeHighOutline;
            } else {
                this.ttsUse[key].text = text.stop;
                this.ttsUse[key].icon = this.volumeMuteOutline;
            }
        },
        async changeAttend() {
            const selected = this.studentList.filter((s) => s.chk).map((s) => s.stdNo);

            if (!selected.length) {
                alertMsg('학생을 선택해 주세요');
                return;
            }

            const modal = await modalController.create({
                id: 'change-attend-modal',
                component: ChangeAttendModal,
            });

            modal.present();

            const { data, role } = await modal.onDidDismiss();
            if (role === 'confirm') {
                const { attDiv, attResn } = data;

                const param = {
                    openYr: this.lecture.openYy,
                    openShtmCd: this.lecture.openShtmCd,
                    openOrgnClsfCd: this.lecture.openOrgnClsfCd,
                    openSust: this.lecture.openSust,
                    openSbjtNo: this.lecture.openSbjtNo,
                    openDclss: this.lecture.openDclss,
                    ltStaffNo: this.lecture.ltStaffNo,
                    attYmd: this.$store.state.profsr.searchEattdOpenRpstStaffInfo.checkDate,
                    skltDt: this.lecture.skpDt || '',

                    stdNo: selected.join(','),
                    attDiv,
                    attResn,
                };

                this.$store.dispatch('common/setAttendanceMulti', param).then(async (d) => {
                    if (d.data.resultCode == 200) {
                        this.chkall = false;
                        this.refresh();
                    } else if (d.data.resultCode != 200) {
                        alertMsg('출석 정보 수정에 실패했습니다.');
                    }
                });
            }
        },
    },
};
</script>
<style>
.alert-title.sc-ion-alert-md,
.alert-button.sc-ion-alert-md {
   font-size: 14px;
}

.alert-radio-label.sc-ion-alert-md {
   font-size: 14px;
}
</style>
<style lang="scss" scoped>
ion-button {
    --padding-start: 0;
    --padding-end: 0;
    aspect-ratio: 1;
    margin-left: 0.3em;
}
.correct {
    color: var(--ion-color-primary);
}
.correct.not {
    color: var(--ion-color-danger);
}
.correct-line {
    background-color: rgba(189, 201, 220, 0.5);
}

ion-list {
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(var(--ion-color-primary-rgb), 0.15);
}

.table_wrap {
   table { width: 100%; }
   th, td { font-size: 14px; text-align: center; padding: 10px 2.5px; }
   th:first-child,
   td:first-child { padding-left: 10px; }
   th {
      border-top: 1px solid #EEF1F8;
      border-bottom: 1px solid #EEF1F8;
      font-weight: 400;
   }
   td { border-bottom: 1px solid #EEF1F8; }
   ion-checkbox { margin-top: 2px; }
   .std_number { color: #8E8E8E; }
   .std_name { font-weight: bold; }
   .time { font-weight: 400; color: #8E8E8E; }
   .correct {
    color: var(--ion-color-primary);
    font-weight: bold;
      &.not {
         color: var(--ion-color-danger);
      }
   }
}
ion-item {
    --background: transparent;
    --ripple-color: var(--ion-color-primary);
    --border-color: rgba(var(--ion-color-primary-rgb), 0.15);
    --inner-padding-bottom: 1em;
    --inner-padding-top: 1em;
    min-height: auto;
    line-height: auto;
    &:first-of-type {
        /* --border-width: 0 0 2px 0; */
    }
    &:last-of-type {
        --border-color: rgba(0, 0, 0, 0);
    }
    .input-wrapper {
        width: 100% !important;
    }
    > ul {
      display: flex;
      flex: 1 0 auto;
      justify-content: space-between;
      align-items: center;
      gap: 0.5em;
      padding-left: 16px;
      text-align: center;
      > li {
         flex: 1 0 15%;
         line-height: 1.3;
         font-size: 13px;
         &.time {
            font-weight: 400 !important;
            color: #8E8E8E;
         }
      }

      &.thead {

      }
      &.tbody {
         > li {
            font-weight: bold;
            &:nth-child(1) {
               font-weight: 400;
               letter-spacing: -0.03em;
            }
         }
      }
   }
}
.table_style_colum {
   .col1 { flex:0 0 30% }
   .col2 { flex:0 0 18% }
   .col3 { flex:0 0 15% }
   .col4 { flex:0 0 12% }
   .col5 { flex:0 0 20% }
}
.check-btn {
    flex: .5 0 auto;
    display: inline-flex;
    align-items: center;
   line-height: 1.5;
   color:#8E8E8E;
   + div {
      width:100%;
      display: flex;
      flex: .5 0 auto;
      gap: 0 10px;
      align-items: center;
      flex-flow: wrap;
      justify-content: end;
      ion-select {
         flex: 0 0 43px;
      }
   }
    ion-button {
      --border-radius: 50px;
      --box-shadow: none;
      --background: rgba(var(--ion-color-primary-rgb), 0.05);
      --color: var(--ion-color-primary);
      --border-color: rgba(var(--ion-color-primary-rgb), 0.3);
      --border-style: solid;
      --border-width: 1px;
      font-size: 13px;
      flex: 0 0 106px;
      height: 29px;
      /* margin-left: 0.7em; */
      letter-spacing: -0.03em;
    }
}
ion-checkbox {
   font-size: 14px;
   /* --checkmark-color: #808080;
   --border-color: #808080;
   --background-checked: #ffffff;
   --background: #ffffff; */
}
ion-select {
    box-shadow: none;
    --background: transparent;
    margin-bottom: 0;
    font-size :14px;
    min-height: auto;
}
</style>
