<template>
   <div class="attendance--setting">
      <p>
         <strong>수업 시작 시간 설정</strong> 
         수업 시작 전, 설정 된 시간 부터 출석이 가능합니다.
      </p>
      <ion-select
         v-model="startTimeSet"
         mode="md"
         fill="outline"
         :toggleIcon="arrowDown"
         label="시간설정"
         okText="선택완료"
         cancelText="닫기"
         @ionChange="setTime(); change = true;"
      >
         <ion-select-option v-for="item in startTimeSetList" :key="item.cd" :value="item.cd">시작 전 {{ item.cdNm }} 부터</ion-select-option>
      </ion-select>
   </div>
</template>
<script setup>
import SearchEattdOpenRpstStaffInfo from '@/model/search-eattd-open-rpst-staff-info';
import StaffSetting from '@/model/staff-setting';
import { alertMsg } from '@/helper/alertMsg';
import { useRouter } from 'vue-router';
import { auditDate } from '@/helper/auditDate';
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { IonSelect, IonSelectOption } from '@ionic/vue';
import arrowDown from '@/assets/img/icons/arrowDownIcon.svg';

const route = useRouter();
const store = useStore();
const startTimeSet = ref('ULS55.30');
const change = ref(false);
const user = computed(() => store.state.signIn.user);
const { params } = route.currentRoute.value;
const startTimeSetList = store.state.common.setting.startTimeSetList;

onMounted(() => {
   getSet();

});

watch( () => route.currentRoute.value.params, () => getSet());

function getSet() {
   const search = { 
      ltStaffNo: user.value.mbrNo, 
      openSbjtNo: params.openSbjtNo, 
      openYr: auditDate().yy 
   };

   store.dispatch('profsr/getSettingInfoList', search).then((d) => {
      if (d.data.resultData.length > 0) {
         const hrStngDiv = d.data.resultData[0].hrStngDiv;
         startTimeSet.value = hrStngDiv === null || hrStngDiv === 'null' ? 'ULS55.30' : hrStngDiv;
      } else {
         setTime(true);
      }
   });
}

function setTime(first) {
   const searchInfo = new SearchEattdOpenRpstStaffInfo();
   searchInfo.ltStaffNo = user.value.mbrNo;
   searchInfo.openSbjtNo = params.openSbjtNo;
   searchInfo.openYr = auditDate().yy;
   searchInfo.openYy = auditDate().yy;

   store.dispatch('profsr/getLectureList', searchInfo).then((d) => {
      console.log(d, 'profsr/getLectureList');
      if (d.data.resultData.length > 0) {

         store.dispatch('profsr/getSettingInfoList', searchInfo).then((d2) => {
            
               const setting = new StaffSetting();
                  setting.ltStaffNo = user.value.mbrNo;
                  setting.openYr = d.data.resultData[0].openYy;
                  setting.openShtmCd = d.data.resultData[0].openShtmCd;
                  setting.openOrgnClsfCd = d.data.resultData[0].openOrgnClsfCd;
                  setting.openSust = d.data.resultData[0].openSust;
                  setting.openSbjtNo = d.data.resultData[0].openSbjtNo;
                  setting.hrStngDiv = startTimeSet.value != null ? startTimeSet.value : 'ULS55.30';

                  console.log(searchInfo, 'searchInfo');

                  if (d2.data.resultData.length > 0) {
                     setting.detmHrDiv = d2.data.resultData[0].detmHrDiv != null ? d2.data.resultData[0].detmHrDiv : 'ULS56.10';
                     setting.attendanceType = d2.data.resultData[0].attendanceType != null ? d2.data.resultData[0].attendanceType : '';
                  }

                  console.log(startTimeSet.value, 'startTimeSet.value');
                  console.log(startTimeSet, 'startTimeSet');

                  store.dispatch('profsr/setSettingInfo', setting).then((result) => {

                     if(first) {
                        change.value = false;
                        return; 
                     }

                     if (result.data.resultCode == 200) {
                        alertMsg('수업 시작 시간 설정이 완료되었습니다');
                     } else {
                        alertMsg('수업 시작 시간 설정에 실패했습니다.');
                     }
                     change.value = false;
                  });                  
            
         });         


      }
    });

   // store.dispatch('profsr/getLectureList', searchInfo).then((d) => {
   //    for (let index = 1; index < d.data.resultData.length; index++) {
   //       const setting = new StaffSetting();
   //       setting.ltStaffNo = user.value.mbrNo;
   //       setting.openYr = d.data.resultData[index].openYy;
   //       setting.openShtmCd = d.data.resultData[index].openShtmCd;
   //       setting.openOrgnClsfCd = d.data.resultData[index].openOrgnClsfCd;
   //       setting.openSust = d.data.resultData[index].openSust;
   //       setting.openSbjtNo = d.data.resultData[index].openSbjtNo;
   //       setting.hrStngDiv = startTimeSet.value;
   //       setting.attendanceType = d.data.resultData[index].attendanceType;
   //       setting.detmHrDiv = d.data.resultData[index].detmHrDiv;

   //       store.dispatch('profsr/setSettingInfo', setting).then((result) => {
   //          if (change.value) {
   //             if (result.data.resultCode == 200) {
   //                alertMsg('수업 시작 시간 설정이 완료되었습니다');
   //             } else {
   //                alertMsg('수업 시작 시간 설정에 실패했습니다.');
   //             }
   //             change.value = false;
   //          }
   //       });
   //    }
   // });
}
</script>
