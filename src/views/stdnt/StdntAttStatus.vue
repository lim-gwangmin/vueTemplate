<template>
    <ion-page>
        <ion-content :fullscreen="true" ref="cont">
            <div class="attendance--page">
               <div class="app_container">
                  <tab-menu 
                     :activeTabBtn="activeTabBtn"
                     @change="onChangeTabMenu"
                  />
                  <div v-show="activeTabBtn === 1">
                     <stdnt-att-status-table 
                        ref="table" 
                        v-on:updateTermValue="updateTermValue">
                     </stdnt-att-status-table>
                  </div>
                  <div v-show="activeTabBtn === 2">
                     <stdnt-att-status-card v-show="activeTab2"></stdnt-att-status-card>
                  </div>
               </div>
            </div>
         </ion-content>
    </ion-page>
</template>
<script>   
import { StdntAttStatusTable, StdntAttStatusCard, TabMenu } from '@/components';
import { auditDate } from '@/helper/auditDate';

export default {
   components: { StdntAttStatusTable, StdntAttStatusCard, TabMenu },
   name: 'stdnt-att-status',
   data() {
      return {
         activeTabBtn: 1,
      }
   },
   props: ["termValue"],
   methods: {
      ionViewWillEnter() {
         if (this.$store.state.common.termUpdate) {
            this.$refs.table.selDay = auditDate().checkDate;
            this.$refs.table.getTermList();
            this.$store.commit('common/termUpdate', false);
         }
      },
      ionViewWillLeave() {
         this.activeTabBtn = 1;
         this.$refs.cont.$el.scrollToPoint(0, 0);
      },
      onChangeTabMenu(newValue) {
         if (newValue !== this.activeTabBtn) {
            this.activeTabBtn = newValue;
            this.ionViewWillEnter();
         }
      },
      updateTermValue(term) {
         this.termValue = term;
         this.$refs.table.term = term;
      },
   },
};
</script>

<style scss>
   ion-select {
      box-shadow:none;
   }
   .attendance--time_table {
      background-color:#fff;
   }
</style>
