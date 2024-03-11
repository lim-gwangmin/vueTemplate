<template>
    <ion-page>
        <ion-content :fullscreen="true" ref="cont">
            <div class="attendance--page">
               <div class="app_container">
                  <div class="attendance--class">
                     <div class="class__head">
                           <div class="sub-title pt-top"><span>과목정보</span></div>
                           <button type="button" class="class__toggle" :class="{ 'is--down': closed }" @click="closeDetail()">열고 접기</button>
                     </div>
                     <div class="class__body" :class="{ 'is--hidden': closed }">
                        <profsr-class-gen-info ref="classInfo"></profsr-class-gen-info>
                     </div>
                  </div>
                  <div class="attendance--prfcode">
                     <div class="sub-title">
                        <span>출석코드 생성하기</span>
                     </div>
                     <a class="prfcode__link" @click="goAttCode()">코드 생성하기</a>
                  </div>
                  <profsr-class-att-info ref="attInfo"></profsr-class-att-info>
               </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { ProfsrClassAttInfo, ProfsrClassGenInfo } from '@/components';

export default {
    name: 'profsr-detail',
    components: {
        ProfsrClassAttInfo,
        ProfsrClassGenInfo,
    },
    data() {
        return {
            closed: false,
        };
    },
    ionViewWillEnter() {
        this.$refs.classInfo.getThisWeek();
    },
    ionViewWillLeave() {
        this.$refs.attInfo.stopAttList();
        this.$refs.cont.$el.scrollToPoint(0, 0);
    },
    methods: {
        closeDetail() {
            this.closed = !this.closed;
        },
        goAttCode() {
            this.$store.commit('accessPopup/showUntactCodePopup', true);
        },
    },
};
</script>

<style scoped>
.hidden {
    display: none;
}
</style>
