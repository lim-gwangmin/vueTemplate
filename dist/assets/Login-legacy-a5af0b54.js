System.register(["./@vue-legacy-623c6306.js","./@ionic-legacy-c780cb28.js","./search-mobile-usr-legacy-29dc0060.js","./vue-router-legacy-979b5870.js","./vuex-legacy-c35c3fa5.js","./index-legacy-43f0e8e2.js","./@stencil-legacy-8e2b9178.js","./@capacitor-legacy-096cda38.js","./ionicons-legacy-5f2e46b4.js","./tslib-legacy-8092f78e.js","./@vueuse-legacy-daad712d.js","./axios-legacy-50a673bb.js"],(function(e,t){"use strict";var a,n,o,l,i,d,r,c,s,g,p,u,m,v,f,b,_,h,x,w,y,k;return{setters:[e=>{a=e.r,n=e.A,o=e.v,l=e.x,i=e.y,d=e.C,r=e.D,c=e.z,s=e.u,g=e.E,p=e.F,u=e.G,m=e.H},e=>{v=e.r,f=e.s,b=e.v,_=e.w},e=>{h=e.S},e=>{x=e.b},e=>{w=e.u},e=>{y=e._,k=e.a},null,null,null,null,null,null],execute:function(){var t=document.createElement("style");t.textContent='.attendance--login[data-v-0cdd3143]{position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%;overflow:hidden}.attendance--login[data-v-0cdd3143]:after{content:"";position:absolute;top:43%;left:0;z-index:0;width:100%;height:129.6vw;background-repeat:no-repeat;background-image:url(/assets/background-6a4b3fef.png);background-size:cover}.attendance--login .login__frame[data-v-0cdd3143]{max-width:70%;position:relative;z-index:1}.attendance--login .login__logo[data-v-0cdd3143]{display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0;padding:0;font-weight:400}.attendance--login .login__logo .logo__text[data-v-0cdd3143]{display:block;margin-top:2.6666666667vw;font-size:4.6666666667vw;font-weight:800;color:#1a447a}.attendance--login .login__logo .logo__image[data-v-0cdd3143]{position:relative}.attendance--login .login__logo .logo__image img[data-v-0cdd3143]{position:relative;z-index:1;width:36.2666666667vw}.attendance--login .login__logo .logo__image[data-v-0cdd3143]:after{content:"";position:absolute;bottom:0;left:-4.6666666667vw;z-index:0;width:73.0666666667vw;height:28.8vw;background-repeat:no-repeat;background-image:url(/assets/logo__background-e2c31339.png);background-size:cover}.attendance--login .login__guide[data-v-0cdd3143]{margin-top:4vw;font-size:3.2vw;color:#1a447a;text-align:center;font-weight:500}.attendance--login .login__guide em[data-v-0cdd3143]{font-weight:700}h1[data-v-0cdd3143],p[data-v-0cdd3143]{font-family:var(--ion-font-family)}h1 span[data-v-0cdd3143]{font-size:clamp(18px,5vw,30px);margin-top:1em;font-weight:700;font-family:var(--ion-font-family)}p[data-v-0cdd3143]{line-height:1.3;text-align:center;letter-spacing:-.02em;font-size:clamp(12px,3vw,14px);margin-top:10px;color:rgba(0,0,0,.6)!important}ion-row[data-v-0cdd3143]{position:relative}ion-row ion-icon[data-v-0cdd3143]{position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:24px;color:var(--ion-color-primary);z-index:3}[data-v-0cdd3143] ion-input{--padding-start: 50px !important;--border-radius: 10px !important;font-weight:700}[data-v-0cdd3143] ion-input .label-text{font-weight:400;line-height:19px}ion-button[data-v-0cdd3143]{--border-radius: 10px !important;--padding-bottom: 24px !important;--padding-top: 24px !important;--box-shadow: 5px 5px 20px rgba(var(--ion-color-primary-rgb), .3);margin-top:20px;font-weight:700}\n',document.head.appendChild(t);const j=e=>(u("data-v-0cdd3143"),e=e(),m(),e),z={class:"attendance--login"},V={class:"login__frame"},I=j((()=>d("h1",{class:"login__logo"},[d("div",{class:"logo__image"},[d("img",{src:"/assets/logo-cdb39be9.svg",alt:"CNU"})]),d("span",null,"전자출결 시스템")],-1))),N=j((()=>d("p",null,[p("충남대학교 "),d("strong",null,"포털 계정으로 로그인"),p(" 하시고 "),d("br"),p("비밀번호 변경은 포털에서 진행하시기 바랍니다.")],-1)));e("default",y({__name:"Login",setup(e){const t=x(),u=w(),m=a(new h),y=a(),j=a();function C(){m.value.mbrNo.trim()?m.value.mbrPw.trim()?"check"!==m.value.mbrNo||"cnuappcheck!@#$"!==m.value.mbrPw?u.dispatch("signIn/login",m.value):t.replace("/check"):k("비밀번호를 입력해 주세요.").then((()=>{j.value.$el.setFocus()})):k("아이디(포털ID)를 입력해 주세요.").then((()=>{y.value.$el.setFocus()}))}return(e,t)=>{const a=n("ion-icon"),u=n("ion-button"),h=n("ion-page");return o(),l(h,null,{default:i((()=>[d("div",z,[d("div",V,[I,N,d("form",{onSubmit:r(C,["prevent"])},[c(s(v),{style:{"margin-top":"30px"}},{default:i((()=>[c(s(f),null,{default:i((()=>[c(a,{src:s("/assets/person-46519555.svg")},null,8,["src"]),c(s(b),null,{default:i((()=>[c(s(_),{ref_key:"id",ref:y,modelValue:m.value.mbrNo,"onUpdate:modelValue":t[0]||(t[0]=e=>m.value.mbrNo=e),onKeypress:g(C,["enter"]),label:"아이디(포털ID)","label-placement":"floating",fill:"outline",placeholder:"아이디(포털ID)",mode:"md"},null,8,["modelValue"])])),_:1})])),_:1}),c(s(f),{style:{"margin-top":"10px"}},{default:i((()=>[c(a,{src:s("/assets/lock-alt-f9b04f04.svg")},null,8,["src"]),c(s(b),null,{default:i((()=>[c(s(_),{ref_key:"password",ref:j,modelValue:m.value.mbrPw,"onUpdate:modelValue":t[1]||(t[1]=e=>m.value.mbrPw=e),onKeypress:g(C,["enter"]),label:"비밀번호","label-placement":"floating",fill:"outline",placeholder:"비밀번호",type:"password",mode:"md"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1}),c(u,{type:"submit",expand:"block",mode:"md"},{default:i((()=>[p(" login ")])),_:1})],32)])])])),_:1})}}},[["__scopeId","data-v-0cdd3143"]]))}}}));
