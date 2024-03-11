<template>
   <ion-page>
       <ion-content :fullscreen="true" ref="cont">
           <stdnt-att-status-card ref="table"></stdnt-att-status-card>
       </ion-content>
   </ion-page>
</template>

<script>
import { IonTitle, IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue';
import { StdntAttStatusCard } from '@/components';
import { auditDate } from '@/helper/auditDate';

export default {
   components: { StdntAttStatusCard },
   name: 'stdnt-att-status',
   ionViewWillEnter() {
       if (this.$store.state.common.termUpdate) {
           this.$refs.table.selDay = auditDate().checkDate;
           this.$refs.table.getTermList();
           this.$store.commit('common/termUpdate', false);
       }
   },
   ionViewWillLeave() {
       this.$refs.cont.$el.scrollToPoint(0, 0);
   },
};
</script>
