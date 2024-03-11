<script setup>
import { modalController, IonSelect, IonSelectOption, IonTextarea } from '@ionic/vue';
import { confirmMsg, alertMsg } from '@/helper/alertMsg';
import { ref } from 'vue';
import arrowDown from '@/assets/img/icons/arrowDownIcon.svg';

const attDiv = ref('');
const attResn = ref();

const attModify = async () => {
    const { role } = await confirmMsg('출석상태를 변경하시겠습니까?');

    if (role === 'confirm') {
        if (attDiv.value === 'null' || attDiv.value === null) {
            alertMsg('출결 상태를 선택해주세요.');
            return;
        }

        modalController.dismiss(
            {
                attDiv: attDiv.value,
                attResn: attResn.value,
            },
            'confirm'
        );
    }
};

const cancel = () => {
    modalController.dismiss(null, 'cancel');
};
</script>

<template>
    <div class="modal">
        <h2>출석상태 변경</h2>

        <ion-select v-model="attDiv" :toggleIcon="arrowDown" mode="md" fill="outline" label="출석상태" okText="선택완료" cancelText="닫기">
            <ion-select-option value="">미출석</ion-select-option>
            <ion-select-option value="ULS58.10">출석</ion-select-option>
            <ion-select-option value="ULS58.20">지각</ion-select-option>
            <ion-select-option value="ULS58.30">조퇴</ion-select-option>
            <ion-select-option value="ULS58.40">결석</ion-select-option>
            <ion-select-option value="ULS58.50">공결</ion-select-option>
            <ion-select-option value="ULS58.60">휴가</ion-select-option>
        </ion-select>

        <ion-textarea v-model="attResn" fill="outline" :auto-grow="true" mode="md" placeholder="출석상태 변경 사유"></ion-textarea>

        <div class="btn-box">
            <ion-button @click="cancel()" expand="block" mode="md" fill="outline"> 취소</ion-button>
            <ion-button @click="attModify()" expand="block" mode="md"> 변경</ion-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    padding: 30px;
}
.button-outline {
    --border-width: 1px;
}
ion-button {
   font-size: 14px;
}
.btn-box {
    display: flex;
    gap: 0.5em;
    margin-top: 0.8em;
    > * {
        flex: 1 0 auto;
    }
}
</style>
