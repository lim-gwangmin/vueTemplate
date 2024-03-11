<template>
    <div class="main__today">
      <div class="time_wrapper">
         <div class="today__title"><ion-icon :src="calendarIcon" />TODAY</div>
         <span class="today__year">{{ year }}</span>
         <strong class="today__date">
               {{ date }}
         </strong>
         <div class="today__time"><span class="time__meridiem"></span>{{ time }}</div>
      </div>
      <div class="bg-rive">
         <canvas ref="canvas" width="339" height="237"></canvas>
      </div>
    </div>
</template>

<script setup>
import { useNow, useDateFormat } from '@vueuse/core';
import calendarIcon from '@/assets/img/icons/calendar.svg';
import { Rive, Layout, Alignment } from '@rive-app/canvas';
import { ref, onMounted } from 'vue';
import debounce from 'lodash/debounce';

const now = useNow();
const year = now.value.getFullYear();
const date = useDateFormat(now, 'MM.DD (ddd)');
const time = useDateFormat(now, 'HH:mm:ss');

const canvas = ref('canvas');

const rive = debounce(() => {
    const r = new Rive({
        canvas: canvas.value,
        src: '/chacha.riv',
        autoplay: true,
        layout: new Layout({
            alignment: Alignment.BottomRight,
        }),
        onLoad: () => {
            r.resizeDrawingSurfaceToCanvas();
        },
    });
}, 20);

onMounted(() => {
    rive();
});

defineExpose({
    rive,
});
</script>

<style lang="scss" scoped>
.main__today {
   position: relative;
   margin-bottom: 44px;


   text-align:right;
   padding-top: 30px;

   .bg-rive {
      display:inline-block;
      position: relative;
      max-width: 70%;
      /* position: absolute;
      right:0;
      top:0%;
      max-width: 70%; */
      z-index: -1;
      > canvas {
         max-height: 100%;
         max-width: 100%;
      }
   }

   .time_wrapper {
      position: absolute;
      text-align: left;
      
      /* position: relative; */
      z-index:2;
      .today__year {
         display:block;
         font-size: 22px;
         color: #1a447a;
         line-height: 1;
         letter-spacing: -0.02em;
      }
    .today__date {
         display: block;
         font-size: 30px;
         margin: 5px 0 20px;
         color: #1a447a;
         line-height: 1;
         letter-spacing: -0.02em;
      }
    .today__time {
        position: relative;
        width: max-content;
        box-sizing: border-box;
        padding: 8px 10px;
        background-color: #ec7660;
        border-radius: 10px;
        font-size: 16px;
        color: #fff;
        line-height: 1;
        font-weight: 500;
        white-space: nowrap;
        letter-spacing: 0.05em;
        font-family: var(--SCoreDream);
        .time__meridiem {
            font-weight: 700;
        }
   }

   .today__title {
        position: relative;
        display: flex;
        margin-bottom: calc(80 / 7.5) + vw;
        font-size: 14px;
        margin:20px 0;
        color: #78a1d5;
        font-weight: 700;
        letter-spacing: -0.02em;
        font-family: var(--ion-font-family);
        ion-icon {
            font-size: 1.3em;
            margin-right: 0.3em;
            margin-top: -0.1em;
        }
    }
   }
}
/* .main__today {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(580 / 7.5) + vw;
    padding: 0 calc(55 / 7.5) + vw;
    font-family: var(--ion-font-family);
    z-index: 0;
    .bg-rive {
        position: absolute;
        inset: auto calc(-25 / 7.5) + vw 0 0;
        z-index: -1;
        display: flex;
        justify-content: flex-end;
        canvas {
            width: 85%;
            height: auto;
        }
    }
    .today__title {
        position: relative;
        display: flex;
        margin-bottom: calc(80 / 7.5) + vw;
        font-size: calc(28 / 7.5) + vw;
        color: #78a1d5;
        font-weight: 700;
        letter-spacing: -0.02em;
        font-family: var(--ion-font-family);
        ion-icon {
            font-size: 1.3em;
            margin-right: 0.3em;
            margin-top: -0.1em;
        }
    }
    .today__year {
        position: relative;
        font-size: calc(50 / 7.5) + vw;
        color: #1a447a;
        line-height: 1;
        letter-spacing: -0.02em;
    }
    .today__date {
        position: relative;
        margin-top: calc(10 / 7.5) + vw;
        font-size: calc(63 / 7.5) + vw;
        color: #1a447a;
        line-height: 1;
        letter-spacing: -0.02em;
    }
    .today__time {
        position: relative;
        width: max-content;
        box-sizing: border-box;
        margin-top: calc(25 / 7.5) + vw;
        padding: 0.7em 0.8em 0.6em;
        background-color: #ec7660;
        border-radius: calc(20 / 7.5) + vw;
        font-size: calc(28 / 7.5) + vw;
        color: #fff;
        line-height: 1;
        font-weight: 500;
        white-space: nowrap;
        letter-spacing: 0.05em;
        font-family: var(--SCoreDream);
        .time__meridiem {
            font-weight: 700;
        }
    }
    & ~ .main__class {
        margin-top: calc(10 / 7.5) + vw;
    }
} */
</style>
