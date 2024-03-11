<template>
    <div class="attendance--md">
        <div class="md__contents">
            <div class="md__close">
                <a @click="closeModal()"><img src="@/assets/img/attendance/modal/close.png" alt="Close" /></a>
            </div>
            <div class="attendance--direct">
               <strong class="direct__title">교수님이 불러준 4자리 코드</strong>
               <div class="direct__guide">
                  <span>교수님이 불러준 <em>4자리 숫자를</em><br /><em>3분이내</em>에 입력해 주시기 바랍니다.</span>
                  <b style="color: red" v-if="notCode"> 생성된 코드가 없습니다. </b>
               </div>
                <div class="direct__contents">
                    <div class="direct__code">
                        <div class="code__professor">
                            <ul>
                                <li v-for="i in 4" :key="i"><input type="number" v-model="checkNumber[i - 1]" :ref="`number_${i - 1}`" @input="changeFocus(i, $event)" /></li>
                            </ul>
                        </div>
                    </div>
                    <div class="direct__buttons">
                        <a class="direct__button" @click="attCodeCheck()">확인</a>
                    </div>
                    <div class="direct__limit" v-if="timerText != '' ">
                        입력 완료까지 남은시간 <span class="limit__count">{{ timerText }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AttUntactCd from '@/model/att_untact_cd';
import AttHist from '@/model/att-hist';
import { alertMsg } from '@/helper/alertMsg';
import WifiRcptnHist from '@/model/wifi-rcptn-hist';
import { nowDate } from '@/helper/nowDate';
import { auditDate } from '@/helper/auditDate';

export default {
    name: 'stdnt-untact-code-modal',
    data() {
        return {
            attCode: '',
            untactCd: new AttUntactCd(),
            att: new AttHist(),
            wifiHist: new WifiRcptnHist(),
            lecture: this.$store.state.stdnt.lectureInfo,
            timerText: '',
            intervalSet: setInterval(console.log('before')),
            checkNumber: ['', '', '', ''],
            showTimer: false,
            notCode: false,
            nativeParam: this.$store.state.stdnt.profsrCodeParam,
            checkDate: auditDate().checkDate,
            yy: auditDate().yy,
        };
    },
    mounted() {
        this.getAttCode();
    },
    ionViewDidLeave() {
        clearInterval(this.intervalSet);
        this.attCode = '';
        this.timerText = '';
    },
    methods: {
        getAttCode() {
            clearInterval(this.intervalSet);
            let defaultTime = 180;
            this.untactCd.openShtmCd = this.lecture.openShtmCd; // 참가 학기 코드
            this.untactCd.openOrgnClsfCd = this.lecture.openOrgnClsfCd; // 참가 조직 분류 코드
            this.untactCd.openSust = this.lecture.openSust; // 참가 학과
            this.untactCd.openDclss = this.lecture.openDclss; // 참가 분반
            this.untactCd.ltStaffNo = this.lecture.staffNo; // 강의 교직원 번호
            this.untactCd.openSbjtNo = this.lecture.openSbjtNo; // 참가 과목 번호
            this.untactCd.attYmd = this.checkDate; // 출석 일자
            this.untactCd.openYr = this.yy; // 참가 년도
            this.$store.dispatch('common/getuntactCdInfo', this.untactCd).then((d) => {
                if (d.data.resultData == null) {
                    this.notCode = true;
                } else {
                    this.attCode = d.data.resultData.untactCd;
                    this.showTimer = true;
                    let createTime = d.data.resultData.crtTm; //2022-01-11 15:30:47
                    let crtTimeMilSec = new Date(createTime.slice(0, 4), parseInt(createTime.slice(5, 7)) - 1, createTime.slice(8, 10), createTime.slice(11, 13), createTime.slice(14, 16), createTime.slice(17));
                    defaultTime = defaultTime - Math.floor((new Date().getTime() - crtTimeMilSec.getTime()) / 1000);
                    this.intervalSet = setInterval(() => {
                        defaultTime = defaultTime - 1;
                        this.timerText = Math.floor(defaultTime / 60) + ':' + (defaultTime % 60).toString().padStart(2, '0');
                        if (defaultTime < 0) {
                            this.timerText = '0:00';
                        }
                    }, 1000);
                }
            });
        },
        attCodeCheck() {
            const inputNumber = this.checkNumber[0] + '' + this.checkNumber[1] + '' + this.checkNumber[2] + '' + this.checkNumber[3];
            if (inputNumber.length !== this.checkNumber.length) {
                alertMsg('코드를 입력해주세요');
                return;
            }
            this.att.wifiNm = this.nativeParam.ssid;
            this.att.wifiIp = this.nativeParam.macAddr;
            this.att.lat = this.nativeParam.lat;
            this.att.lot = this.nativeParam.lot;
            this.att.openShtmCd = this.untactCd.openShtmCd; // 참가 학기 코드
            this.att.openOrgnClsfCd = this.untactCd.openOrgnClsfCd; // 참가 조직 분류 코드
            this.att.openSust = this.untactCd.openSust; // 참가 학과
            this.att.openSbjtNo = this.untactCd.openSbjtNo; // 참가 과목 번호
            this.att.openDclss = this.untactCd.openDclss; // 참가 분반
            this.att.ltStaffNo = this.untactCd.ltStaffNo; // 강의 교직원 번호
            this.att.stdNo = this.lecture.stdNo;
            this.att.attYmd = this.checkDate; // this.$store.state.common.weekDate; // 출석 일자
            this.att.openYr = this.yy; // 참가 년도
            if (this.lecture.skpDt) {
                this.att.skltDt = this.lecture.skpDt;
            }
            if (this.timerText == '0:00') {
                this.att.attDiv = 'ULS58.40'; // 출석 구분[C:ULS58]
                this.att.attResn = '입력시간 초과'; // 출석 구분[C:ULS58]

                this.$store.dispatch('common/setAttendance', this.att).then(() => {
                    this.attRecode();
                    alertMsg('코드 입력시간이 끝났습니다.');
                    this.$store.commit('accessPopup/showAlert', false);
                    this.$store.commit('accessPopup/updateData', true);
                });
            } else {
                if (this.attCode == inputNumber) {
                    clearInterval(this.intervalSet);
                    this.att.attResn = '출석코드 일치'; // 출석 구분[C:ULS58]
                    this.att.attPrcsCdYn = 'Y';
                    this.$store.dispatch('common/setAttendance', this.att).then((d) => {
                        if (d.data.resultCode == 200) {
                            this.attRecode();
                            alertMsg('출석 정보 등록이 완료되었습니다.');
                            this.$store.commit('accessPopup/showAlert', false);
                            this.$store.commit('accessPopup/updateData', true);
                        }
                    });
                } else {
                    this.att.attDiv = 'ULS58.40'; // 출석 구분[C:ULS58]
                    this.att.attResn = '출석코드 불일치'; // 출석 구분[C:ULS58]

                    this.$store.dispatch('common/setAttendance', this.att).then(() => {
                        this.attRecode();
                        alertMsg('코드가 일치하지 않습니다.');
                        this.checkNumber = ['', '', '', ''];
                        this.$store.commit('accessPopup/updateData', true);
                    });
                }
            }
        },
        closeModal() {
            this.$store.commit('accessPopup/showAlert', false);
            clearInterval(this.intervalSet);
            this.attCode = '';
            this.timerText = '';
        },
        attRecode() {
            this.wifiHist.openYr = this.att.openYr;
            this.wifiHist.openShtmCd = this.att.openShtmCd;
            this.wifiHist.openOrgnClsfCd = this.att.openOrgnClsfCd;
            this.wifiHist.openSust = this.att.openSust;
            this.wifiHist.openSbjtNo = this.att.openSbjtNo;
            this.wifiHist.openDclss = this.att.openDclss;
            this.wifiHist.ltStaffNo = this.att.ltStaffNo;
            this.wifiHist.stdNo = this.att.stdNo;
            this.wifiHist.attYmd = this.att.attYmd;
            this.wifiHist.wifiRcptnHr = nowDate().hourStr + ':' + nowDate().minStr  + ':' + new Date().getSeconds();
            this.wifiHist.wifiRcptnItem = '출석정보등록';
            this.wifiHist.result = this.att.attResn;
            if (this.lecture.skpDt) {
                this.wifiHist.skltDt = this.lecture.skpDt;
            }

            this.$store.dispatch('common/setAttendanceRecord', this.wifiHist).then((d) => {
                console.log('finish', d);
                this.att = new AttHist();
            });
        },
        changeFocus(idx, evt) {
            let numText = this.checkNumber[idx - 1] + '';
            if (numText.length > 1) {
                this.checkNumber[idx - 1] = numText.slice(0, 1);
            }

            if (idx != 4 && evt.inputType == 'insertText') {
                let name = 'number_' + idx;
                this.$refs[name][0].focus();
            }
        },
    },
};
</script>
