import{c as Y,u as $,r as w,b as H,w as _,e as y,f as b,j as L}from"./@vue-ba2132af.js";function v(e){return y()?(b(e),!0):!1}function g(e){return typeof e=="function"?e():$(e)}const D=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const E=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,R=/[YMDHhms]o|\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g;function q(e,t,o,u){let r=e<12?"AM":"PM";return u&&(r=r.split("").reduce((i,l)=>i+="".concat(l,"."),"")),o?r.toLowerCase():r}function d(e){const t=["th","st","nd","rd"],o=e%100;return e+(t[(o-20)%10]||t[o]||t[0])}function C(e,t,o={}){var u;const r=e.getFullYear(),i=e.getMonth(),l=e.getDate(),s=e.getHours(),n=e.getMinutes(),a=e.getSeconds(),c=e.getMilliseconds(),p=e.getDay(),f=(u=o.customMeridiem)!=null?u:q,m={Yo:()=>d(r),YY:()=>String(r).slice(-2),YYYY:()=>r,M:()=>i+1,Mo:()=>d(i+1),MM:()=>"".concat(i+1).padStart(2,"0"),MMM:()=>e.toLocaleDateString(o.locales,{month:"short"}),MMMM:()=>e.toLocaleDateString(o.locales,{month:"long"}),D:()=>String(l),Do:()=>d(l),DD:()=>"".concat(l).padStart(2,"0"),H:()=>String(s),Ho:()=>d(s),HH:()=>"".concat(s).padStart(2,"0"),h:()=>"".concat(s%12||12).padStart(1,"0"),ho:()=>d(s%12||12),hh:()=>"".concat(s%12||12).padStart(2,"0"),m:()=>String(n),mo:()=>d(n),mm:()=>"".concat(n).padStart(2,"0"),s:()=>String(a),so:()=>d(a),ss:()=>"".concat(a).padStart(2,"0"),SSS:()=>"".concat(c).padStart(3,"0"),d:()=>p,dd:()=>e.toLocaleDateString(o.locales,{weekday:"narrow"}),ddd:()=>e.toLocaleDateString(o.locales,{weekday:"short"}),dddd:()=>e.toLocaleDateString(o.locales,{weekday:"long"}),A:()=>f(s,n),AA:()=>f(s,n,!1,!0),a:()=>f(s,n,!0),aa:()=>f(s,n,!0,!0)};return t.replace(R,(M,h)=>{var A,F;return(F=h!=null?h:(A=m[M])==null?void 0:A.call(m))!=null?F:M})}function G(e){if(e===null)return new Date(Number.NaN);if(e===void 0)return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){const t=e.match(E);if(t){const o=t[2]-1||0,u=(t[7]||"0").substring(0,3);return new Date(t[1],o,t[3]||1,t[4]||0,t[5]||0,t[6]||0,u)}}return new Date(e)}function x(e,t="HH:mm:ss",o={}){return Y(()=>C(G(g(e)),g(t),o))}function I(e,t=1e3,o={}){const{immediate:u=!0,immediateCallback:r=!1}=o;let i=null;const l=w(!1);function s(){i&&(clearInterval(i),i=null)}function n(){l.value=!1,s()}function a(){const c=g(t);c<=0||(l.value=!0,r&&e(),s(),i=setInterval(e,c))}if(u&&D&&a(),H(t)||typeof t=="function"){const c=_(t,()=>{l.value&&D&&a()});v(c)}return v(n),{isActive:l,pause:n,resume:a}}const N=D?window:void 0;function T(e,t={}){const{immediate:o=!0,fpsLimit:u=void 0,window:r=N}=t,i=w(!1),l=u?1e3/u:null;let s=0,n=null;function a(f){if(!i.value||!r)return;const m=f-(s||f);if(l&&m<l){n=r.requestAnimationFrame(a);return}e({delta:m,timestamp:f}),s=f,n=r.requestAnimationFrame(a)}function c(){!i.value&&r&&(i.value=!0,n=r.requestAnimationFrame(a))}function p(){i.value=!1,n!=null&&r&&(r.cancelAnimationFrame(n),n=null)}return o&&c(),v(p),{isActive:L(i),pause:p,resume:c}}const S=new Map;function O(e){const t=y();function o(s){var n;const a=S.get(e)||new Set;a.add(s),S.set(e,a);const c=()=>r(s);return(n=t==null?void 0:t.cleanups)==null||n.push(c),c}function u(s){function n(...a){r(n),s(...a)}return o(n)}function r(s){const n=S.get(e);n&&(n.delete(s),n.size||i())}function i(){S.delete(e)}function l(s,n){var a;(a=S.get(e))==null||a.forEach(c=>c(s,n))}return{on:o,once:u,off:r,emit:l,reset:i}}function k(e={}){const{controls:t=!1,interval:o="requestAnimationFrame"}=e,u=w(new Date),r=()=>u.value=new Date,i=o==="requestAnimationFrame"?T(r,{immediate:!0}):I(r,o,{immediate:!0});return t?{now:u,...i}:u}export{k as a,x as b,O as u};