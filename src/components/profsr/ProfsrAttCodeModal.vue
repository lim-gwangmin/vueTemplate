<template>
    <div class="attendance--md">
        <div class="md__contents">
            <div class="md__close">
                <a @click="closeModal()"><img src="@/assets/img/attendance/modal/close.png" alt="Close" /></a>
            </div>
            <div class="attendance--prfcode">
                <strong class="prfcode__title" style="text-align: center">교수 출석 코드 생성</strong>
                <div class="prfcode__guide">
                    <p class="guide__setence">
                        <i class="s__icon">※</i>
                        <span class="s__text">아래 <em>4자리</em> 숫자를 학생들에게 알려주시기 바랍니다.</span>
                    </p>
                    <p class="guide__setence">
                        <i class="s__icon">※</i>
                        <span class="s__text">학생들은 숫자를 <em>최대 3분안에 입력</em>해야합니다</span>
                    </p>
                </div>
                <div class="prfcode__create">
                    <div class="create__refresh">
                        <button type="button" class="refresh__button" @click="getAttCode(2)">코드변경</button>
                    </div>
                    <div class="create__code">
                        <ul>
                            <li v-for="(num, i) in attCode" :key="(num, i)"><input type="text" :value="num" readonly /></li>
                        </ul>
                    </div>
                    <div class="create__buttons">
                        <button class="create__button" @click="getAttCode(1)">코드생성</button>
                    </div>
                    <div class="create__limit" v-if="timerText != ''">
                        남은시간 <span class="limit__count">{{ timerText }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AttUntactCd from '@/model/att_untact_cd';
import { alertMsg } from '@/helper/alertMsg';
import { auditDate } from '@/helper/auditDate';

export default {
    name: 'profsr-att-code-modal',
    data() {
        return {
            attCode: ['', '', '', ''],
            att: new AttUntactCd(),
            lecture: this.$store.state.profsr.lecture,
            timerText: '',
            intervalSet: setInterval(console.log('before')),
        };
    },
    ionViewDidLeave() {
        clearInterval(this.intervalSet);
        this.attCode = ['', '', '', ''];
        this.timerText = '';
    },
    methods: {
        getAttCode(num) {
            clearInterval(this.intervalSet);
            
            if (num == 1) {
                alertMsg('코드가 생성 되었습니다.');
            } else {
                alertMsg('코드가 변경 되었습니다.');
            }

            let defaultTime = 180;
            this.att.openShtmCd = this.lecture.openShtmCd; // 참가 학기 코드
            this.att.openOrgnClsfCd = this.lecture.openOrgnClsfCd; // 참가 조직 분류 코드
            this.att.openSust = this.lecture.openSust; // 참가 학과
            this.att.openSbjtNo = this.lecture.openSbjtNo; // 참가 과목 번호
            this.att.openDclss = this.lecture.openDclss; // 참가 분반
            this.att.ltStaffNo = this.lecture.ltStaffNo; // 강의 교직원 번호
            this.att.openYr = auditDate().yy;
            this.att.attYmd = auditDate().checkDate;
            this.att.fromTm = this.lecture.fromTm;
            this.att.dayCd = this.lecture.dayCd;
            this.att.checkDate = this.$store.state.profsr.searchEattdOpenRpstStaffInfo.checkDate;
            this.att.openShyr = this.lecture.openShyr;

            this.$store.dispatch('common/setUntactCd', this.att).then((d) => {
                const tempCode = d.data.resultData.untactCd;
                this.attCode[0] = tempCode.slice(0, 1);
                this.attCode[1] = tempCode.slice(1, 2);
                this.attCode[2] = tempCode.slice(2, 3);
                this.attCode[3] = tempCode.slice(3);
                let createTime = d.data.resultData.crtTm; //2022-01-11 15:30:47
                let crtTimeMilSec = new Date(createTime.slice(0, 4), parseInt(createTime.slice(5, 7)) - 1, createTime.slice(8, 10), createTime.slice(11, 13), createTime.slice(14, 16), createTime.slice(17));
                defaultTime = defaultTime - Math.floor((new Date().getTime() - crtTimeMilSec.getTime()) / 1000);
                this.intervalSet = setInterval(() => {
                    defaultTime = defaultTime - 1;
                    if (defaultTime < 0) {
                        alertMsg('코드 입력시간이 끝났습니다.\n출석을 못한 인원에 대해 출결 처리를\n해주시기 바랍니다.');
                        this.closeModal();
                    } else {
                        this.timerText = Math.floor(defaultTime / 60) + ':' + (defaultTime % 60).toString().padStart(2, '0');
                    }
                }, 1000);
            });
        },
        closeModal() {
            this.$store.commit('accessPopup/showUntactCodePopup', false);
            clearInterval(this.intervalSet);
            this.attCode = ['', '', '', ''];
            this.timerText = '';
        },
    },
};
</script>
