<template>
   <div class="attendance--setting">
      <p>
         <strong>수업종료 인정시간 설정</strong> 
         수업 종료 전, 설정된 시간까지 출석이 가능합니다.
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
         <ion-select-option v-for="item in endTimeSetList" :key="item.cd" :value="item.cd">종료 전 {{ item.cdNm }} 까지</ion-select-option>
      </ion-select>
   </div>
</template>

<script setup>
import SearchEattdOpenRpstStaffInfo from '@/model/search-eattd-open-rpst-staff-info';
import StaffSetting from '@/model/staff-setting';
import { alertMsg } from '@/helper/alertMsg';
import { auditDate } from '@/helper/auditDate';
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { IonSelect, IonSelectOption } from '@ionic/vue';
import arrowDown from '@/assets/img/icons/arrowDownIcon.svg';

const route = useRouter();
const store = useStore();
const startTimeSet = ref('ULS56.10');
const change = ref(false);
const user = computed(() => store.state.signIn.user);
const { params } = route.currentRoute.value;
const endTimeSetList = store.state.common.setting.endTimeSetList;

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
            const detmHrDiv = d.data.resultData[0].detmHrDiv;
            startTimeSet.value = detmHrDiv === null || detmHrDiv === 'null' ? 'ULS56.10' : detmHrDiv;
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
                  setting.detmHrDiv = startTimeSet.value != null ? startTimeSet.value : 'ULS56.10';

                  if (d2.data.resultData.length > 0) {
                     setting.hrStngDiv = d2.data.resultData[0].hrStngDiv != null ? d2.data.resultData[0].hrStngDiv : 'ULS55.30';
                     setting.attendanceType = d2.data.resultData[0].attendanceType != null ? d2.data.resultData[0].attendanceType : '';
                  }
                  console.log(setting,'setting')
                  store.dispatch('profsr/setSettingInfo', setting).then((result) => {

                     if(first) {
                        change.value = false;
                        return; 
                     }

                     if (change.value) {
                        if (result.data.resultCode == 200) {
                           alertMsg('수업 종료 시간 설정이 완료되었습니다');
                        } else {
                           alertMsg('수업 시작 시간 설정에 실패했습니다.');
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
   //          setting.attendanceType = d.data.resultData[index].attendanceType;
   //          setting.detmHrDiv = startTimeSet.value;

   //          store.dispatch('profsr/setSettingInfo', setting).then((result) => {
   //             console.log(result, 'reuslt')
   //              if (change.value) {
   //                  if (result.data.resultCode == 200) {
   //                      alertMsg('수업 종료 시간 설정이 완료되었습니다');
   //                  } else {
   //                      alertMsg('수업 시작 시간 설정에 실패했습니다.');
   //                  }
   //                  change.value = false;
   //              }
   //          });
   //      }
   //  });
}
</script>
