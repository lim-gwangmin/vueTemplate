<template>
    <div class="attendance--md">
        <div class="md__contents">
            <div class="attendance--guide">
                <div class="guide__text">
                    <strong class="">원활한 전자출결 앱 사용을 위한 <br />접근권한 안내</strong>
                    <span>전자출결 서비스 이용을 위해서는 위치, 무선AP정보 활용이 필수 권한입니다. </span>
                    <span style="font-weight: bold">원활한 서비스 이용을 위해 무선AP를 재접속 해주시길 바랍니다. </span>
                </div>
                <div class="guide__check">
                    <div class="check__item">
                        <i class="item__icon"><img src="@/assets/img/attendance/guide/location.png" alt="" /></i>
                        <div class="item__explain">
                            <div class="item__name">위치</div>
                            <div class="item__text">전자출결 앱 사용을 위해 위치서비스 설정을 항상으로 설정바랍니다.</div>
                        </div>
                    </div>
                    <div class="check__item">
                        <i class="item__icon"><img src="@/assets/img/attendance/guide/wifi.png" alt="" /></i>
                        <div class="item__explain">
                            <div class="item__name">Wifi</div>
                            <div class="item__text">무선 AP 정보 활용을 위해 WiFi연결상태를 확인하세요.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md__buttons">
                <a href="javascript:;" class="md__button" @click="closePopup()">확인</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();

function closePopup() {
    store.commit('accessPopup/showAccessPopup', false);
}
</script>

<style lang="scss" scoped>
.attendance--guide {
    .guide__text {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 20px 0;
        text-align: center;
        word-break: keep-all;
        strong {
            font-size: 20px;
            color: #414141;
            font-weight: 700;
            line-height: 1.2;
        }
        span {
            display: block;
            margin-top: 10px;
            font-size: 14px;
            color: #989898;
            line-height: 1.3;
        }
    }
    .guide__check {
        padding: 0 15px;
        background-color: #fafbff;
        border: 1px solid #c4ccdd;
        .check__item {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 15px 0;
            & ~ .check__item {
                border-top: 1px solid #c4ccdd;
            }
            .item__icon {
                flex: 0 0 50px;
                margin-right: 10px;
                img {
                    width: 50px;
                }
            }
            .item__explain {
                flex: 1 1 auto;
                padding: 0 5px;
            }
            .item__name {
                color: #3d61ad;
                font-weight: 700;
                line-height: 1;
                & ~ .item__text {
                    margin-top: 14px;
                }
            }
            .item__text {
                font-size: 14px;
                color: #9296a5;
                font-weight: 500;
                word-break: keep-all;
                line-height: 1.4;
            }
        }
    }
}
</style>
