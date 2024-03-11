const te="modulepreload",ne=function(n){return"/"+n},H={},j=function(e,t,o){if(!t||t.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(t.map(r=>{if(r=ne(r),r in H)return;H[r]=!0;const a=r.endsWith(".css"),i=a?'[rel="stylesheet"]':"";if(!!o)for(let h=s.length-1;h>=0;h--){const m=s[h];if(m.href===r&&(!a||m.rel==="stylesheet"))return}else if(document.querySelector('link[href="'.concat(r,'"]').concat(i)))return;const l=document.createElement("link");if(l.rel=a?"stylesheet":te,a||(l.as="script",l.crossOrigin=""),l.href=r,document.head.appendChild(l),a)return new Promise((h,m)=>{l.addEventListener("load",h),l.addEventListener("error",()=>m(new Error("Unable to preload CSS for ".concat(r))))})})).then(()=>e()).catch(r=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r})};/*! Capacitor: https://capacitorjs.com/ - MIT License */const re=n=>{const e=new Map;e.set("web",{name:"web"});const t=n.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},o=(r,a)=>{t.platforms.set(r,a)},s=r=>{t.platforms.has(r)&&(t.currentPlatform=t.platforms.get(r))};return t.addPlatform=o,t.setPlatform=s,t},se=n=>n.CapacitorPlatforms=re(n),z=se(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});z.addPlatform;z.setPlatform;var A;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(A||(A={}));class M extends Error{constructor(e,t,o){super(e),this.message=e,this.code=t,this.data=o}}const oe=n=>{var e,t;return n!=null&&n.androidBridge?"android":!((t=(e=n==null?void 0:n.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},ie=n=>{var e,t,o,s,r;const a=n.CapacitorCustomPlatform||null,i=n.Capacitor||{},d=i.Plugins=i.Plugins||{},l=n.CapacitorPlatforms,h=()=>a!==null?a.name:oe(n),m=((e=l==null?void 0:l.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||h,L=()=>m()!=="web",g=((t=l==null?void 0:l.currentPlatform)===null||t===void 0?void 0:t.isNativePlatform)||L,O=c=>{const u=W.get(c);return!!(u!=null&&u.platforms.has(m())||R(c))},C=((o=l==null?void 0:l.currentPlatform)===null||o===void 0?void 0:o.isPluginAvailable)||O,U=c=>{var u;return(u=i.PluginHeaders)===null||u===void 0?void 0:u.find(E=>E.name===c)},R=((s=l==null?void 0:l.currentPlatform)===null||s===void 0?void 0:s.getPluginHeader)||U,J=c=>n.console.error(c),N=(c,u,E)=>Promise.reject("".concat(E,' does not have an implementation of "').concat(u,'".')),W=new Map,X=(c,u={})=>{const E=W.get(c);if(E)return console.warn('Capacitor plugin "'.concat(c,'" already registered. Cannot register plugins twice.')),E.proxy;const S=m(),k=R(c);let y;const Y=async()=>(!y&&S in u?y=typeof u[S]=="function"?y=await u[S]():y=u[S]:a!==null&&!y&&"web"in u&&(y=typeof u.web=="function"?y=await u.web():y=u.web),y),Z=(f,p)=>{var v,b;if(k){const P=k==null?void 0:k.methods.find(w=>p===w.name);if(P)return P.rtype==="promise"?w=>i.nativePromise(c,p.toString(),w):(w,$)=>i.nativeCallback(c,p.toString(),w,$);if(f)return(v=f[p])===null||v===void 0?void 0:v.bind(f)}else{if(f)return(b=f[p])===null||b===void 0?void 0:b.bind(f);throw new M('"'.concat(c,'" plugin is not implemented on ').concat(S),A.Unimplemented)}},V=f=>{let p;const v=(...b)=>{const P=Y().then(w=>{const $=Z(w,f);if($){const I=$(...b);return p=I==null?void 0:I.remove,I}else throw new M('"'.concat(c,".").concat(f,'()" is not implemented on ').concat(S),A.Unimplemented)});return f==="addListener"&&(P.remove=async()=>p()),P};return v.toString=()=>"".concat(f.toString(),"() { [capacitor code] }"),Object.defineProperty(v,"name",{value:f,writable:!1,configurable:!1}),v},F=V("addListener"),G=V("removeListener"),ee=(f,p)=>{const v=F({eventName:f},p),b=async()=>{const w=await v;G({eventName:f,callbackId:w},p)},P=new Promise(w=>v.then(()=>w({remove:b})));return P.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await b()},P},D=new Proxy({},{get(f,p){switch(p){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return k?ee:F;case"removeListener":return G;default:return V(p)}}});return d[c]=D,W.set(c,{name:c,proxy:D,platforms:new Set([...Object.keys(u),...k?[S]:[]])}),D},Q=((r=l==null?void 0:l.currentPlatform)===null||r===void 0?void 0:r.registerPlugin)||X;return i.convertFileSrc||(i.convertFileSrc=c=>c),i.getPlatform=m,i.handleError=J,i.isNativePlatform=g,i.isPluginAvailable=C,i.pluginMethodNoop=N,i.registerPlugin=Q,i.Exception=M,i.DEBUG=!!i.DEBUG,i.isLoggingEnabled=!!i.isLoggingEnabled,i.platform=i.getPlatform(),i.isNative=i.isNativePlatform(),i},ae=n=>n.Capacitor=ie(n),T=ae(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),x=T.registerPlugin;T.Plugins;class _{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn('Capacitor WebPlugin "'.concat(e.name,'" config object was deprecated in v3 and will be removed in v4.')),this.config=e)}addListener(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const s=this.windowListeners[e];s&&!s.registered&&this.addWindowListener(s);const r=async()=>this.removeListener(e,t),a=Promise.resolve({remove:r});return Object.defineProperty(a,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await r()}}),a}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t){const o=this.listeners[e];o&&o.forEach(s=>s(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:o=>{this.notifyListeners(t,o)}}}unimplemented(e="not implemented"){return new T.Exception(e,A.Unimplemented)}unavailable(e="not available"){return new T.Exception(e,A.Unavailable)}async removeListener(e,t){const o=this.listeners[e];if(!o)return;const s=o.indexOf(t);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const B=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),q=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class le extends _{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(o=>{if(o.length<=0)return;let[s,r]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=q(s).trim(),r=q(r).trim(),t[s]=r}),t}async setCookie(e){try{const t=B(e.key),o=B(e.value),s="; expires=".concat((e.expires||"").replace("expires=","")),r=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?"domain=".concat(e.url):"";document.cookie="".concat(t,"=").concat(o||"").concat(s,"; path=").concat(r,"; ").concat(a,";")}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie="".concat(e.key,"=; Max-Age=0")}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,"=;expires=".concat(new Date().toUTCString(),";path=/"))}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}x("CapacitorCookies",{web:()=>new le});const ce=async n=>new Promise((e,t)=>{const o=new FileReader;o.onload=()=>{const s=o.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},o.onerror=s=>t(s),o.readAsDataURL(n)}),de=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,r,a)=>(s[r]=n[e[a]],s),{})},ue=(n,e=!0)=>n?Object.entries(n).reduce((o,s)=>{const[r,a]=s;let i,d;return Array.isArray(a)?(d="",a.forEach(l=>{i=e?encodeURIComponent(l):l,d+="".concat(r,"=").concat(i,"&")}),d.slice(0,-1)):(i=e?encodeURIComponent(a):a,d="".concat(r,"=").concat(i)),"".concat(o,"&").concat(d)},"").substr(1):null,fe=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),s=de(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[a,i]of Object.entries(n.data||{}))r.set(a,i);t.body=r.toString()}else if(s.includes("multipart/form-data")||n.data instanceof FormData){const r=new FormData;if(n.data instanceof FormData)n.data.forEach((i,d)=>{r.append(d,i)});else for(const i of Object.keys(n.data))r.append(i,n.data[i]);t.body=r;const a=new Headers(t.headers);a.delete("content-type"),t.headers=a}else(s.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class ge extends _{async request(e){const t=fe(e,e.webFetchExtra),o=ue(e.params,e.shouldEncodeUrlParams),s=o?"".concat(e.url,"?").concat(o):e.url,r=await fetch(s,t),a=r.headers.get("content-type")||"";let{responseType:i="text"}=r.ok?e:{};a.includes("application/json")&&(i="json");let d,l;switch(i){case"arraybuffer":case"blob":l=await r.blob(),d=await ce(l);break;case"json":d=await r.json();break;case"document":case"text":default:d=await r.text()}const h={};return r.headers.forEach((m,L)=>{h[L]=m}),{data:d,headers:h,status:r.status,url:r.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}x("CapacitorHttp",{web:()=>new ge});const Le=x("App",{web:()=>j(()=>Promise.resolve().then(()=>pe),void 0).then(n=>new n.AppWeb)}),Ce=x("Preferences",{web:()=>j(()=>Promise.resolve().then(()=>we),void 0).then(n=>new n.PreferencesWeb)}),Ee=x("SplashScreen",{web:()=>j(()=>Promise.resolve().then(()=>ye),void 0).then(n=>new n.SplashScreenWeb)}),ke=x("Toast",{web:()=>j(()=>Promise.resolve().then(()=>Pe),void 0).then(n=>new n.ToastWeb)}),Ae=x("Device",{web:()=>j(()=>Promise.resolve().then(()=>_e),void 0).then(n=>new n.DeviceWeb)});class me extends _{constructor(){super(),this.handleVisibilityChange=()=>{const e={isActive:document.hidden!==!0};this.notifyListeners("appStateChange",e),document.hidden?this.notifyListeners("pause",null):this.notifyListeners("resume",null)},document.addEventListener("visibilitychange",this.handleVisibilityChange,!1)}exitApp(){throw this.unimplemented("Not implemented on web.")}async getInfo(){throw this.unimplemented("Not implemented on web.")}async getLaunchUrl(){return{url:""}}async getState(){return{isActive:document.hidden!==!0}}async minimizeApp(){throw this.unimplemented("Not implemented on web.")}}const pe=Object.freeze(Object.defineProperty({__proto__:null,AppWeb:me},Symbol.toStringTag,{value:"Module"})),je=x("Geolocation",{web:()=>j(()=>Promise.resolve().then(()=>Se),void 0).then(n=>new n.GeolocationWeb)});class he extends _{constructor(){super(...arguments),this.group="CapacitorStorage"}async configure({group:e}){typeof e=="string"&&(this.group=e)}async get(e){return{value:this.impl.getItem(this.applyPrefix(e.key))}}async set(e){this.impl.setItem(this.applyPrefix(e.key),e.value)}async remove(e){this.impl.removeItem(this.applyPrefix(e.key))}async keys(){return{keys:this.rawKeys().map(t=>t.substring(this.prefix.length))}}async clear(){for(const e of this.rawKeys())this.impl.removeItem(e)}async migrate(){var e;const t=[],o=[],s="_cap_",r=Object.keys(this.impl).filter(a=>a.indexOf(s)===0);for(const a of r){const i=a.substring(s.length),d=(e=this.impl.getItem(a))!==null&&e!==void 0?e:"",{value:l}=await this.get({key:i});typeof l=="string"?o.push(i):(await this.set({key:i,value:d}),t.push(i))}return{migrated:t,existing:o}}async removeOld(){const e="_cap_",t=Object.keys(this.impl).filter(o=>o.indexOf(e)===0);for(const o of t)this.impl.removeItem(o)}get impl(){return window.localStorage}get prefix(){return this.group==="NativeStorage"?"":"".concat(this.group,".")}rawKeys(){return Object.keys(this.impl).filter(e=>e.indexOf(this.prefix)===0)}applyPrefix(e){return this.prefix+e}}const we=Object.freeze(Object.defineProperty({__proto__:null,PreferencesWeb:he},Symbol.toStringTag,{value:"Module"}));class ve extends _{async show(e){}async hide(e){}}const ye=Object.freeze(Object.defineProperty({__proto__:null,SplashScreenWeb:ve},Symbol.toStringTag,{value:"Module"}));class be extends _{async show(e){if(typeof document<"u"){let t=2e3;e.duration&&(t=e.duration==="long"?3500:2e3);const o=document.createElement("pwa-toast");o.duration=t,o.message=e.text,document.body.appendChild(o)}}}const Pe=Object.freeze(Object.defineProperty({__proto__:null,ToastWeb:be},Symbol.toStringTag,{value:"Module"}));class xe extends _{async getId(){return{identifier:this.getUid()}}async getInfo(){if(typeof navigator>"u"||!navigator.userAgent)throw this.unavailable("Device API not available in this browser");const e=navigator.userAgent,t=this.parseUa(e);return{model:t.model,platform:"web",operatingSystem:t.operatingSystem,osVersion:t.osVersion,manufacturer:navigator.vendor,isVirtual:!1,webViewVersion:t.browserVersion}}async getBatteryInfo(){if(typeof navigator>"u"||!navigator.getBattery)throw this.unavailable("Device API not available in this browser");let e={};try{e=await navigator.getBattery()}catch(t){}return{batteryLevel:e.level,isCharging:e.charging}}async getLanguageCode(){return{value:navigator.language.split("-")[0].toLowerCase()}}async getLanguageTag(){return{value:navigator.language}}parseUa(e){const t={},o=e.indexOf("(")+1;let s=e.indexOf(") AppleWebKit");e.indexOf(") Gecko")!==-1&&(s=e.indexOf(") Gecko"));const r=e.substring(o,s);if(e.indexOf("Android")!==-1){const g=r.replace("; wv","").split("; ").pop();g&&(t.model=g.split(" Build")[0]),t.osVersion=r.split("; ")[1]}else if(t.model=r.split("; ")[0],typeof navigator<"u"&&navigator.oscpu)t.osVersion=navigator.oscpu;else if(e.indexOf("Windows")!==-1)t.osVersion=r;else{const g=r.split("; ").pop();if(g){const O=g.replace(" like Mac OS X","").split(" ");t.osVersion=O[O.length-1].replace(/_/g,".")}}/android/i.test(e)?t.operatingSystem="android":/iPad|iPhone|iPod/.test(e)&&!window.MSStream?t.operatingSystem="ios":/Win/.test(e)?t.operatingSystem="windows":/Mac/i.test(e)?t.operatingSystem="mac":t.operatingSystem="unknown";const a=!!window.ApplePaySession,i=!!window.chrome,d=/Firefox/.test(e),l=/Edg/.test(e),h=/FxiOS/.test(e),m=/CriOS/.test(e),L=/EdgiOS/.test(e);if(a||i&&!l||h||m||L){let g;h?g="FxiOS":m?g="CriOS":L?g="EdgiOS":a?g="Version":g="Chrome";const O=e.split(" ");for(const C of O)if(C.includes(g)){const U=C.split("/")[1];t.browserVersion=U}}else if(d||l){const C=e.split("").reverse().join("").split("/")[0].split("").reverse().join("");t.browserVersion=C}return t}getUid(){if(typeof window<"u"&&window.localStorage){let e=window.localStorage.getItem("_capuid");return e||(e=this.uuid4(),window.localStorage.setItem("_capuid",e),e)}return this.uuid4()}uuid4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){const t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}}const _e=Object.freeze(Object.defineProperty({__proto__:null,DeviceWeb:xe},Symbol.toStringTag,{value:"Module"}));class K extends _{async getCurrentPosition(e){return new Promise((t,o)=>{navigator.geolocation.getCurrentPosition(s=>{t(s)},s=>{o(s)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e))})}async watchPosition(e,t){const o=navigator.geolocation.watchPosition(s=>{t(s)},s=>{t(null,s)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e));return"".concat(o)}async clearWatch(e){window.navigator.geolocation.clearWatch(parseInt(e.id,10))}async checkPermissions(){if(typeof navigator>"u"||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");const e=await window.navigator.permissions.query({name:"geolocation"});return{location:e.state,coarseLocation:e.state}}async requestPermissions(){throw this.unimplemented("Not implemented on web.")}}const Oe=new K,Se=Object.freeze(Object.defineProperty({__proto__:null,Geolocation:Oe,GeolocationWeb:K},Symbol.toStringTag,{value:"Module"}));export{Le as A,Ae as D,je as G,Ce as P,Ee as S,ke as T,j as _};
