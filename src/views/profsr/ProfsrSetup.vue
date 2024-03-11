<template>
   <ion-page>
      <ion-content :fullscreen="true">
         <div class="attendance--page">
            <div class="app_container">
               <div class="sub-title pt-top">
                  <span>설정</span>
               </div>
               <div class="setting_section">
                  <attend-check-time-setup></attend-check-time-setup>
                  <end-time-setup></end-time-setup>
                  <!-- <attend-method-setup></attend-method-setup> -->
               </div>
            </div>
         </div>
      </ion-content>
   </ion-page>
</template>

<script setup>
import { 
  AttendCheckTimeSetup, 
  AttendMethodSetup,
  EndTimeSetup 
} from '@/components';




</script>
<style lang="scss">
.setting_section {

   .attendance--setting {
      > p {
         font-size: 16px;
         color:#000;
         line-height: 1.25;
         margin-bottom: 16px;
         > strong {
            display: block;
            color: #3D61AD;
            font-weight: bold;
            margin-bottom: 5px;
         }
      }
   }  

}

</style>