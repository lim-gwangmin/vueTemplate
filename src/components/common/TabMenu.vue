<script setup>
   import { defineProps } from 'vue';
   import calendar_before from '@/assets/img/icons/calendarIcon_before.svg';
   import calendar_after from '@/assets/img/icons/calendarIcon_after.svg';
   import card_before from '@/assets/img/icons/cardIcon_before.svg';
   import card_after from '@/assets/img/icons/cardIcon_after.svg';

   const { activeTabBtn } = defineProps(['activeTabBtn']);

</script>
<template>
   <div class="commute__tab">
      <ion-button
         class="tab__button table_style" 
         :class="{ 'is--on': activeTabBtn === 1 }" 
         @click="$emit('change', 1)">
         <ion-icon :src="activeTabBtn !== 1 ? calendar_before : calendar_after"></ion-icon>
         시간표형
      </ion-button>
      <ion-button 
         class="tab__button card_style"  
         :class="{ 'is--on': activeTabBtn === 2 }" 
         @click="$emit('change', 2)">
         <ion-icon :src="activeTabBtn !== 2 ? card_before : card_after"></ion-icon>
         카드형
      </ion-button>
   </div>
</template>

<style scss>
   .tab__button {
      text-align:text-top;
   }
   .commute__tab {
      position: relative;
      display: table;
      width:100%;
      table-layout:fixed;
      border-top-left-radius: 10px;
      border-top-right-radius:10px;
      overflow:hidden;
      z-index:2;

      ion-button:not(.button-clear) {
         --border-radius: 0;
         --box-shadow: none;
         --background: initial;
         --background-activated: #fff;
         --background-hover: #fff;
      }
   }
   .tab__button {
      position: relative;
      display:table-cell;
      vertical-align: middle;
      text-align: center;
      background-color:#E9ECF7;
      color:#66728B;
      height: 48px;
      font-weight: 500;
      font-size: 16px;

      ion-icon {
         margin: -2px 6px 0 0;
      }

      &.is--on {
         color: #3D61AD;
         background-color: #fff;
      }
   }
</style>