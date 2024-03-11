<template>
    <div class="attendance--md">
        <div class="md__contents">
            <div class="md__close">
                <a @click="closeModal()"><img src="@/assets/img/attendance/modal/close.png" alt="Close" /></a>
            </div>
            <div class="attendance--direct">
                <strong class="direct__title">코드명을 입력해주세요.</strong>
                <div class="direct__guide">
                    <span>QR코드 아래에 있는 코드명을 <br /><em>직접 작성해주세요.</em></span>
                </div>
                <div class="direct__contents">
                    <div class="direct__code">
                        <div class="code__qr">
                            <input type="text" placeholder="코드입력" v-model="inputCodeNumber" />
                        </div>
                    </div>
                    <div class="direct__buttons">
                        <a href="javascript:;" class="direct__button" @click="checkCode()">확인</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WifiRcptnHist from '@/model/wifi-rcptn-hist';
import { nowDate } from '@/helper/nowDate';
import { alertMsg } from '@/helper/alertMsg';
import SearchEattdTlsnStdInfo from '@/model/search-eattd-tlsn-std-info';
import { auditDate } from '@/helper/auditDate';

export default {
    name: 'stdnt-code-modal',
    data() {
        return {
            inputCodeNumber: '',
            ulsLtrmInfm: this.$store.state.common.ulsLtrmInfm,
            attCodeParam: this.$store.state.stdnt.attCodeParam,
            checkDate: auditDate().checkDate,
        };
    },
    methods: {
        checkCode() {
            if (this.ulsLtrmInfm.ltrmCd === this.inputCodeNumber) {
                this.setAttendance();
            } else {
                alertMsg('강의실 코드가 일치하지 않습니다');
            }
        },

        /* 출석 등록 */
        setAttendance() {
            // console.log(this.attCodeParam.attHist);
            this.$store.dispatch('common/setAttendance', this.attCodeParam.attHist).then((d) => {
                this.att = d.data.resultData;

                /* 출석 이력 파라미터 */
                const wifiRcptnHist = new WifiRcptnHist();
                wifiRcptnHist.openYr = this.att.openYr;
                wifiRcptnHist.openShtmCd = this.att.openShtmCd;
                wifiRcptnHist.openOrgnClsfCd = this.att.openOrgnClsfCd;
                wifiRcptnHist.openSust = this.att.openSust;
                wifiRcptnHist.openDclss = this.att.openDclss;
                wifiRcptnHist.openSbjtNo = this.att.openSbjtNo;
                wifiRcptnHist.ltStaffNo = this.att.ltStaffNo;
                wifiRcptnHist.stdNo = this.att.stdNo;
                wifiRcptnHist.attYmd = this.att.attYmd;
                wifiRcptnHist.wifiRcptnHr = nowDate().hourStr + ':' + nowDate().minStr;
                wifiRcptnHist.wifiRcptnItem = '출석정보등록';
                if (this.att.skltDt) {
                    wifiRcptnHist.skltDt = this.att.skltDt;
                }

                if (this.attCodeParam.wifiCheck || this.attCodeParam.gpsCheck) {
                    wifiRcptnHist.result = '범위 내 수신';
                } else if (!this.attCodeParam.wifiCheck && !this.attCodeParam.gpsCheck) {
                    wifiRcptnHist.result = 'Wifi 또는 GPS 정보가 일치하지 않음';
                }

                this.setAttendanceRecord(wifiRcptnHist);
            });
        },
        /* 출석 이력 등록 */
        setAttendanceRecord(wifiRcptnHist) {
            this.$store.dispatch('common/setAttendanceRecord', wifiRcptnHist).then((d) => {
                if (d.data.resultCode === 200) {
                    const searchDetail = new SearchEattdTlsnStdInfo();
                    searchDetail.openSbjtNo = this.att.openSbjtNo;
                    searchDetail.stdNo = this.att.stdNo;
                    searchDetail.openYy = this.att.openYr;
                    searchDetail.openDclss = this.att.openDclss;
                    searchDetail.openShtmCd = this.att.openShtmCd;
                    searchDetail.checkDate = this.checkDate;
                    searchDetail.staffNo = this.att.ltStaffNo;

                    alertMsg('출석 정보 등록이 완료되었습니다');

                    this.$store.commit('stdnt/setSearch', searchDetail);
                    this.closeModal();
                }
            });
        },
        closeModal() {
            this.$store.commit('accessPopup/showCodeAttPopup', false);
            this.inputCodeNumber = '';
        },
    },
};
</script>
