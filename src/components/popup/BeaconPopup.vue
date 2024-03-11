<template>
    <div class="attendance--md">
        <div class="md__contents">
            <!-- <div class="md__close">
               <a @click="closePopup()"><img src="@/assets/img/attendance/modal/close.png" alt="Close" /></a>
            </div> -->
            <div class="attendance--guide">
               <div class="guide__text">
                  <strong class="">비콘과 인증 진행 중입니다.</strong>
               </div>
               <div class="guide__check">
                  <div class="check__item">
                     <p>
                        비콘 인증이 완료될 때까지 <br>
                        <strong>잠시 기다려주세요.</strong>
                     </p>
                  </div>
               </div>
               <div class="guide__check">
                     <img src="@/assets/img/icons/beacon_icon.gif" alt="비콘인증" />
               </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'beacon-popup',
    methods: {
      closePopup() {
         this.$store.commit('beaconPopup/showbeaconPopupToggle', false);
      },
    },
};
</script>

<style lang="scss" scoped>
.attendance--guide {
    .guide__text {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 16px 16px 10px;
        text-align: center;
        word-break: keep-all;
        strong {
            font-size: 24px;
            color: #000;
            line-height: 1.2;
        }
    }
    .guide__check {
        background-color: #fafbff;
        border: 1px solid #c4ccdd;
        .check__item {
            box-sizing: border-box;
            padding: 16px;
            text-align: center;
            > p {
               font-size: 13px;
               font-weight: 200;
               color: #949BAD;
               line-height: 1.6;
            }
        }
        + .guide__check {
            margin-top: 10px;
            text-align: center;
            background-color: #fff;
            padding: 20px;
        }
    }
}
</style>