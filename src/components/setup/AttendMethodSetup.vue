<template>
   <div class="attendance--setting">
      <p>
         <strong>출결 방법</strong> 
         설정된 출결 방법으로 출결체크를 진행합니다.
      </p>

      <ion-select
         v-model="startTimeSet"
         mode="md"
         :toggleIcon="arrowDown"
         fill="outline"
         label="출결방법"
         okText="선택완료"
         cancelText="닫기"
         @ionChange="setTime(); change = true;"
      >
         <ion-select-option value="">전체</ion-select-option>
         <ion-select-option value="ULS59.10.10">출석코드</ion-select-option>
         <ion-select-option value="ULS59.10.20">QR</ion-select-option>
         <ion-select-option value="ULS59.10.30">QR + 출석코드</ion-select-option>
         <ion-select-option value="ULS59.10.40" v-if="params.bcEquipYn === '1' ">QR + 비콘</ion-select-option>
         <ion-select-option value="ULS59.10.50" v-if="params.bcEquipYn === '1' ">출석코드 + 비콘</ion-select-option>
         <ion-select-option value="ULS59.10.60" v-if="params.bcEquipYn === '1' ">QR + 출석코드 +비콘</ion-select-option>
      </ion-select>
   </div>
</template>

<script setup>
import SearchEattdOpenRpstStaffInfo from '@/model/search-eattd-open-rpst-staff-info';
import StaffSetting from '@/model/staff-setting';
import { alertMsg } from '@/helper/alertMsg';
import { auditDate } from '@/helper/auditDate';
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { IonSelect, IonSelectOption } from '@ionic/vue';
import arrowDown from '@/assets/img/icons/arrowDownIcon.svg';

const route = useRouter();
const store = useStore();
const startTimeSet = ref('');
const change = ref(false);
const user = computed(() => store.state.signIn.user);
const { params } = route.currentRoute.value;

onMounted(() => {
   getSet();
});

watch( () => route.currentRoute.value.params, () => getSet() );

function getSet() {
   const search = { 
      ltStaffNo: user.value.mbrNo, 
      openSbjtNo: params.openSbjtNo, 
      openYr: auditDate().yy 
   };

    store.dispatch('profsr/getSettingInfoList', search).then((d) => {
        if (d.data.resultData.length > 0) {
            const attendanceType = d.data.resultData[0].attendanceType;
            startTimeSet.value = attendanceType === null || attendanceType === 'null' ? '' : attendanceType;
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
      if (d.data.resultData.length > 0) {

         store.dispatch('profsr/getSettingInfoList', searchInfo).then((d2) => {
            
                  const setting = new StaffSetting();
                  setting.ltStaffNo = user.value.mbrNo;
                  setting.openYr = d.data.resultData[0].openYy;
                  setting.openShtmCd = d.data.resultData[0].openShtmCd;
                  setting.openOrgnClsfCd = d.data.resultData[0].openOrgnClsfCd;
                  setting.openSust = d.data.resultData[0].openSust;
                  setting.openSbjtNo = d.data.resultData[0].openSbjtNo;
                  setting.attendanceType = startTimeSet.value ? startTimeSet.value : '';

                  if (d2.data.resultData.length > 0) {
                     setting.hrStngDiv = d2.data.resultData[0].hrStngDiv != null ? d2.data.resultData[0].hrStngDiv : 'ULS55.30';
                     setting.detmHrDiv = d2.data.resultData[0].detmHrDiv != null ? d2.data.resultData[0].detmHrDiv : 'ULS56.10';
                  }

                  store.dispatch('profsr/setSettingInfo', setting).then((result) => {
                     if(first) {
                        change.value = false;
                        return; 
                     }

                     if (change.value) {
                        if (result.data.resultCode == 200) {
                           alertMsg('출결 방법 설정이 완료되었습니다');
                        } else {
                           alertMsg('출결 방법 설정에 실패했습니다.');
                        }
                        change.value = false;
                     }
                  });                  
            
         });

      }
    });
   //  store.dispatch('profsr/getLectureList', searchInfo).then((d) => {
   //      for (let index = 1; index < d.data.resultData.length; index++) {
   //          const setting = new StaffSetting();
   //          setting.ltStaffNo = user.value.mbrNo;
   //          setting.openYr = d.data.resultData[index].openYy;
   //          setting.openShtmCd = d.data.resultData[index].openShtmCd;
   //          setting.openOrgnClsfCd = d.data.resultData[index].openOrgnClsfCd;
   //          setting.openSust = d.data.resultData[index].openSust;
   //          setting.openSbjtNo = d.data.resultData[index].openSbjtNo;
   //          setting.hrStngDiv = d.data.resultData[index].hrStngDiv;
   //          setting.attendanceType = startTimeSet.value;
   //          setting.detmHrDiv = d.data.resultData[index].detmHrDiv;

   //          store.dispatch('profsr/setSettingInfo', setting).then((result) => {
   //              if (change.value) {
   //                  if (result.data.resultCode == 200) {
   //                      alertMsg('출결 방법 설정이 완료되었습니다');
   //                  } else {
   //                      alertMsg('출결 방법 설정에 실패했습니다.');
   //                  }
   //                  change.value = false;
   //              }
   //          });
   //      }
   //  });
}
</script>