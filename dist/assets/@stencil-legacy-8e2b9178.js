System.register([],(function(e,t){"use strict";return{execute:function(){const t={allRenderFn:!1,cmpDidLoad:!0,cmpDidUnload:!1,cmpDidUpdate:!0,cmpDidRender:!0,cmpWillLoad:!0,cmpWillUpdate:!0,cmpWillRender:!0,connectedCallback:!0,disconnectedCallback:!0,element:!0,event:!0,hasRenderFn:!0,lifecycle:!0,hostListener:!0,hostListenerTargetWindow:!0,hostListenerTargetDocument:!0,hostListenerTargetBody:!0,hostListenerTargetParent:!1,hostListenerTarget:!0,member:!0,method:!0,mode:!0,observeAttribute:!0,prop:!0,propMutable:!0,reflect:!0,scoped:!0,shadowDom:!0,slot:!0,cssAnnotations:!0,state:!0,style:!0,formAssociated:!1,svg:!0,updatable:!0,vdomAttribute:!0,vdomXlink:!0,vdomClass:!0,vdomFunctional:!0,vdomKey:!0,vdomListener:!0,vdomRef:!0,vdomPropOrAttr:!0,vdomRender:!0,vdomStyle:!0,vdomText:!0,watchCallback:!0,taskQueue:!0,hotModuleReplacement:!1,isDebug:!1,isDev:!1,isTesting:!1,hydrateServerSide:!1,hydrateClientSide:!1,lifecycleDOMEvents:!1,lazyLoad:!1,profile:!1,slotRelocation:!0,appendChildSlotFix:!1,cloneNodeFix:!1,hydratedAttribute:!1,hydratedClass:!0,scriptDataOpts:!1,scopedSlotTextContentFix:!1,shadowDomShim:!1,slotChildNodesFix:!1,invisiblePrehydration:!0,propBoolean:!0,propNumber:!0,propString:!0,constructableCSS:!0,cmpShouldUpdate:!0,devTools:!1,shadowDelegatesFocus:!0,initializeNextTick:!1,asyncLoading:!1,asyncQueue:!1,transformTagName:!1,attachStyles:!0,experimentalSlotFixes:!1};let n,s,l,o=!1,$=!1,a=!1,r=!1,i=null,c=!1;e("B",{isDev:!1,isBrowser:!0,isServer:!1,isTesting:!1}),e("c",(e=>{const t=new URL(e,ue.$resourcesUrl$);return t.origin!==me.location.origin?t.href:t.pathname}));const d="http://www.w3.org/1999/xlink",f={},m=e=>"object"==(e=typeof e)||"function"===e,h=e("h",((e,t,...n)=>{let s=null,l=null,o=null,$=!1,a=!1;const r=[],i=t=>{for(let n=0;n<t.length;n++)s=t[n],Array.isArray(s)?i(s):null!=s&&"boolean"!=typeof s&&(($="function"!=typeof e&&!m(s))&&(s=String(s)),$&&a?r[r.length-1].$text$+=s:r.push($?u(null,s):s),a=$)};if(i(n),t){t.key&&(l=t.key),t.name&&(o=t.name);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,r,g);const c=u(e,null);return c.$attrs$=t,r.length>0&&(c.$children$=r),c.$key$=l,c.$name$=o,c})),u=(e,t)=>{const n={$flags$:0,$tag$:e,$text$:t,$elm$:null,$children$:null,$attrs$:null,$key$:null,$name$:null};return n},p=e("b",{}),g={forEach:(e,t)=>e.map(y).forEach(t),map:(e,t)=>e.map(y).map(t).map(v)},y=e=>({vattrs:e.$attrs$,vchildren:e.$children$,vkey:e.$key$,vname:e.$name$,vtag:e.$tag$,vtext:e.$text$}),v=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),h(e.vtag,t,...e.vchildren||[])}const t=u(e.vtag,e.vtext);return t.$attrs$=e.vattrs,t.$children$=e.vchildren,t.$key$=e.vkey,t.$name$=e.vname,t},b=(e("a",(e=>fe.push(e))),e("g",(e=>ae(e).$modeName$)),e("d",((e,t,n)=>{const s=e;return{emit:e=>b(s,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}})),(e,t,n)=>{const s=ue.ce(t,n);return e.dispatchEvent(s),s}),N=new WeakMap,S=e=>{const t=e.$cmpMeta$,n=e.$hostElement$,s=t.$flags$,l=(t.$tagName$,()=>{}),o=((e,t,n)=>{var s;const l=w(t,n),o=de.get(l);if(e=11===e.nodeType?e:he,o)if("string"==typeof o){e=e.head||e;let n,$=N.get(e);if($||N.set(e,$=new Set),!$.has(l)){{n=he.createElement("style"),n.innerHTML=o;const t=null!==(s=ue.$nonce$)&&void 0!==s?s:function(e){var t,n,s;return null!==(s=null===(n=null===(t=e.head)||void 0===t?void 0:t.querySelector('meta[name="csp-nonce"]'))||void 0===n?void 0:n.getAttribute("content"))&&void 0!==s?s:void 0}(he);null!=t&&n.setAttribute("nonce",t),e.insertBefore(n,e.querySelector("link"))}4&t.$flags$&&(n.innerHTML+="slot-fb{display:contents}slot-fb[hidden]{display:none}"),$&&$.add(l)}}else e.adoptedStyleSheets.includes(o)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,o]);return l})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t,e.$modeName$);10&s&&(n["s-sc"]=o,n.classList.add(o+"-h"),2&s&&n.classList.add(o+"-s")),l()},w=(e,t)=>"sc-"+(t&&32&e.$flags$?e.$tagName$+"-"+t:e.$tagName$),k=(e,t,n,s,l,o)=>{if(n!==s){let a=ie(e,t),r=t.toLowerCase();if("class"===t){const t=e.classList,l=T(n),o=T(s);t.remove(...l.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!l.includes(e))))}else if("style"===t){for(const t in n)s&&null!=s[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in s)n&&s[t]===n[t]||(t.includes("-")?e.style.setProperty(t,s[t]):e.style[t]=s[t])}else if("key"===t);else if("ref"===t)s&&s(e);else if(e.__lookupSetter__(t)||"o"!==t[0]||"n"!==t[1]){const i=m(s);if((a||i&&null!==s)&&!l)try{if(e.tagName.includes("-"))e[t]=s;else{const l=null==s?"":s;"list"===t?a=!1:null!=n&&e[t]==l||(e[t]=l)}}catch($){}let c=!1;r!==(r=r.replace(/^xlink\:?/,""))&&(t=r,c=!0),null==s||!1===s?!1===s&&""!==e.getAttribute(t)||(c?e.removeAttributeNS(d,t):e.removeAttribute(t)):(!a||4&o||l)&&!i&&(s=!0===s?"":s,c?e.setAttributeNS(d,t,s):e.setAttribute(t,s))}else if(t="-"===t[2]?t.slice(3):ie(me,r)?r.slice(2):r[2]+t.slice(3),n||s){const l=t.endsWith(x);t=t.replace(C,""),n&&ue.rel(e,t,n,l),s&&ue.ael(e,t,s,l)}}},R=/\s/,T=e=>e?e.split(R):[],x="Capture",C=new RegExp(x+"$"),L=(e,t,n,s)=>{const l=11===t.$elm$.nodeType&&t.$elm$.host?t.$elm$.host:t.$elm$,o=e&&e.$attrs$||f,$=t.$attrs$||f;for(s in o)s in $||k(l,s,o[s],void 0,n,t.$flags$);for(s in $)k(l,s,o[s],$[s],n,t.$flags$)},E=(e,t,$,i)=>{const c=t.$children$[$];let d,f,m,h=0;if(o||(a=!0,"slot"===c.$tag$&&(n&&i.classList.add(n+"-s"),c.$flags$|=c.$children$?2:1)),null!==c.$text$)d=c.$elm$=he.createTextNode(c.$text$);else if(1&c.$flags$)d=c.$elm$=he.createTextNode("");else{if(r||(r="svg"===c.$tag$),d=c.$elm$=he.createElementNS(r?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",2&c.$flags$?"slot-fb":c.$tag$),r&&"foreignObject"===c.$tag$&&(r=!1),L(null,c,r),null!=n&&d["s-si"]!==n&&d.classList.add(d["s-si"]=n),c.$children$)for(h=0;h<c.$children$.length;++h)f=E(e,c,h,d),f&&d.appendChild(f);"svg"===c.$tag$?r=!1:"foreignObject"===d.tagName&&(r=!0)}return d["s-hn"]=l,3&c.$flags$&&(d["s-sr"]=!0,d["s-cr"]=s,d["s-sn"]=c.$name$||"",m=e&&e.$children$&&e.$children$[$],m&&m.$tag$===c.$tag$&&e.$elm$&&A(e.$elm$,!1)),d},A=(e,t)=>{ue.$flags$|=1;const n=e.childNodes;for(let s=n.length-1;s>=0;s--){const e=n[s];e["s-hn"]!==l&&e["s-ol"]&&(F(e).insertBefore(e,D(e)),e["s-ol"].remove(),e["s-ol"]=void 0,e["s-sh"]=void 0,a=!0),t&&A(e,t)}ue.$flags$&=-2},M=(e,t,n,s,o,$)=>{let a,r=e["s-cr"]&&e["s-cr"].parentNode||e;for(r.shadowRoot&&r.tagName===l&&(r=r.shadowRoot);o<=$;++o)s[o]&&(a=E(null,n,o,e),a&&(s[o].$elm$=a,r.insertBefore(a,D(t))))},O=(e,t,n)=>{for(let s=t;s<=n;++s){const t=e[s];if(t){const e=t.$elm$;z(t),e&&($=!0,e["s-ol"]?e["s-ol"].remove():A(e,!0),e.remove())}}},j=(e,t,n=!1)=>e.$tag$===t.$tag$&&("slot"===e.$tag$?e.$name$===t.$name$:!!n||e.$key$===t.$key$),D=e=>e&&e["s-ol"]||e,F=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,P=(e,t,n=!1)=>{const s=t.$elm$=e.$elm$,l=e.$children$,o=t.$children$,$=t.$tag$,a=t.$text$;let i;null===a?(r="svg"===$||"foreignObject"!==$&&r,"slot"===$||L(e,t,r),null!==l&&null!==o?((e,t,n,s,l=!1)=>{let o,$,a=0,r=0,i=0,c=0,d=t.length-1,f=t[0],m=t[d],h=s.length-1,u=s[0],p=s[h];for(;a<=d&&r<=h;)if(null==f)f=t[++a];else if(null==m)m=t[--d];else if(null==u)u=s[++r];else if(null==p)p=s[--h];else if(j(f,u,l))P(f,u,l),f=t[++a],u=s[++r];else if(j(m,p,l))P(m,p,l),m=t[--d],p=s[--h];else if(j(f,p,l))"slot"!==f.$tag$&&"slot"!==p.$tag$||A(f.$elm$.parentNode,!1),P(f,p,l),e.insertBefore(f.$elm$,m.$elm$.nextSibling),f=t[++a],p=s[--h];else if(j(m,u,l))"slot"!==f.$tag$&&"slot"!==p.$tag$||A(m.$elm$.parentNode,!1),P(m,u,l),e.insertBefore(m.$elm$,f.$elm$),m=t[--d],u=s[++r];else{for(i=-1,c=a;c<=d;++c)if(t[c]&&null!==t[c].$key$&&t[c].$key$===u.$key$){i=c;break}i>=0?($=t[i],$.$tag$!==u.$tag$?o=E(t&&t[r],n,i,e):(P($,u,l),t[i]=void 0,o=$.$elm$),u=s[++r]):(o=E(t&&t[r],n,r,e),u=s[++r]),o&&F(f.$elm$).insertBefore(o,D(f.$elm$))}a>d?M(e,null==s[h+1]?null:s[h+1].$elm$,n,s,r,h):r>h&&O(t,a,d)})(s,l,t,o,n):null!==o?(null!==e.$text$&&(s.textContent=""),M(s,null,t,o,0,o.length-1)):null!==l&&O(l,0,l.length-1),r&&"svg"===$&&(r=!1)):(i=s["s-cr"])?i.parentNode.textContent=a:e.$text$!==a&&(s.data=a)},B=e=>{const t=e.childNodes;for(const n of t)if(1===n.nodeType){if(n["s-sr"]){const e=n["s-sn"];n.hidden=!1;for(const s of t)if(s!==n)if(s["s-hn"]!==n["s-hn"]||""!==e){if(1===s.nodeType&&(e===s.getAttribute("slot")||e===s["s-sn"])){n.hidden=!0;break}}else if(1===s.nodeType||3===s.nodeType&&""!==s.textContent.trim()){n.hidden=!0;break}}B(n)}},U=[],W=e=>{let n,s,l;for(const o of e.childNodes){if(o["s-sr"]&&(n=o["s-cr"])&&n.parentNode){s=n.parentNode.childNodes;const e=o["s-sn"];for(l=s.length-1;l>=0;l--)if(n=s[l],!n["s-cn"]&&!n["s-nr"]&&n["s-hn"]!==o["s-hn"]&&!t.experimentalSlotFixes)if(_(n,e)){let t=U.find((e=>e.$nodeToRelocate$===n));$=!0,n["s-sn"]=n["s-sn"]||e,t?(t.$nodeToRelocate$["s-sh"]=o["s-hn"],t.$slotRefNode$=o):(n["s-sh"]=o["s-hn"],U.push({$slotRefNode$:o,$nodeToRelocate$:n})),n["s-sr"]&&U.map((e=>{_(e.$nodeToRelocate$,n["s-sn"])&&(t=U.find((e=>e.$nodeToRelocate$===n)),t&&!e.$slotRefNode$&&(e.$slotRefNode$=t.$slotRefNode$))}))}else U.some((e=>e.$nodeToRelocate$===n))||U.push({$nodeToRelocate$:n})}1===o.nodeType&&W(o)}},_=(e,t)=>1===e.nodeType?null===e.getAttribute("slot")&&""===t||e.getAttribute("slot")===t:e["s-sn"]===t||""===t,z=e=>{e.$attrs$&&e.$attrs$.ref&&e.$attrs$.ref(null),e.$children$&&e.$children$.map(z)},H=(e,r,i=!1)=>{var c,d,f,m,g;const y=e.$hostElement$,v=e.$cmpMeta$,b=e.$vnode$||u(null,null),N=(S=r)&&S.$tag$===p?r:h(null,null,r);var S;if(l=y.tagName,v.$attrsToReflect$&&(N.$attrs$=N.$attrs$||{},v.$attrsToReflect$.map((([e,t])=>N.$attrs$[t]=y[e]))),i&&N.$attrs$)for(const t of Object.keys(N.$attrs$))y.hasAttribute(t)&&!["key","ref","style","class"].includes(t)&&(N.$attrs$[t]=y[t]);if(N.$tag$=null,N.$flags$|=4,e.$vnode$=N,N.$elm$=b.$elm$=y.shadowRoot||y,n=y["s-sc"],s=y["s-cr"],o=0!=(1&v.$flags$),$=!1,P(b,N,i),ue.$flags$|=1,a){W(N.$elm$);for(const e of U){const t=e.$nodeToRelocate$;if(!t["s-ol"]){const e=he.createTextNode("");e["s-nr"]=t,t.parentNode.insertBefore(t["s-ol"]=e,t)}}for(const e of U){const t=e.$nodeToRelocate$,n=e.$slotRefNode$;if(n){const e=n.parentNode;let s=n.nextSibling;{let n=null===(c=t["s-ol"])||void 0===c?void 0:c.previousSibling;for(;n;){let l=null!==(d=n["s-nr"])&&void 0!==d?d:null;if(l&&l["s-sn"]===t["s-sn"]&&e===l.parentNode&&(l=l.nextSibling,!l||!l["s-nr"])){s=l;break}n=n.previousSibling}}(!s&&e!==t.parentNode||t.nextSibling!==s)&&t!==s&&(!t["s-hn"]&&t["s-ol"]&&(t["s-hn"]=t["s-ol"].parentNode.nodeName),e.insertBefore(t,s),1===t.nodeType&&(t.hidden=null!==(f=t["s-ih"])&&void 0!==f&&f))}else 1===t.nodeType&&(i&&(t["s-ih"]=null!==(m=t.hidden)&&void 0!==m&&m),t.hidden=!0)}}if($&&B(N.$elm$),ue.$flags$&=-2,U.length=0,t.experimentalScopedSlotChanges&&2&v.$flags$)for(const t of N.$elm$.childNodes)t["s-hn"]===l||t["s-sh"]||(i&&null==t["s-ih"]&&(t["s-ih"]=null!==(g=t.hidden)&&void 0!==g&&g),t.hidden=!0)},V=(e,t)=>(e.$flags$|=16,e.$ancestorComponent$,ke((()=>q(e,t)))),q=(e,t)=>{const n=e.$hostElement$,s=(e.$cmpMeta$.$tagName$,()=>{}),l=n;let o;return o=J(l,t?"componentWillLoad":"componentWillUpdate"),o=I(o,(()=>J(l,"componentWillRender"))),s(),I(o,(()=>K(e,l,t)))},I=(e,t)=>Q(e)?e.then(t):t(),Q=e=>e instanceof Promise||e&&e.then&&"function"==typeof e.then,K=async(e,t,n)=>{const s=e.$hostElement$,l=(e.$cmpMeta$.$tagName$,()=>{});s["s-rc"],n&&S(e);const o=(e.$cmpMeta$.$tagName$,()=>{});X(e,t,s,n),o(),l(),G(e)},X=(e,n,s,l)=>{try{i=n,n=n.render&&n.render(),e.$flags$&=-17,e.$flags$|=2,(t.hasRenderFn||t.reflect)&&(t.vdomRender||t.reflect)&&(t.hydrateServerSide||H(e,n,l))}catch(o){ce(o,e.$hostElement$)}return i=null,null},G=e=>{e.$cmpMeta$.$tagName$;const t=()=>{},n=e.$hostElement$;e.$ancestorComponent$,J(n,"componentDidRender"),64&e.$flags$?(J(n,"componentDidUpdate"),t()):(e.$flags$|=64,J(n,"componentDidLoad"),t())},J=(e("f",(e=>{{const t=ae(e),n=t.$hostElement$.isConnected;return n&&2==(18&t.$flags$)&&V(t,!1),n}})),(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(s){ce(s)}}),Y=(e,t,n,s)=>{const l=ae(e),o=e,$=l.$instanceValues$.get(t),a=l.$flags$,r=o;var i,c;i=n,c=s.$members$[t][0],n=null==i||m(i)?i:4&c?"false"!==i&&(""===i||!!i):2&c?parseFloat(i):1&c?String(i):i;const d=Number.isNaN($)&&Number.isNaN(n);if(n!==$&&!d){if(l.$instanceValues$.set(t,n),s.$watchers$&&128&a){const e=s.$watchers$[t];e&&e.map((e=>{try{r[e](n,$,t)}catch(s){ce(s,o)}}))}if(2==(18&a)){if(r.componentShouldUpdate&&!1===r.componentShouldUpdate(n,$,t))return;V(l,!1)}}},Z=(e,t,n)=>{var s;const l=e.prototype;if(t.$members$){e.watchers&&(t.$watchers$=e.watchers);const n=Object.entries(t.$members$);n.map((([e,[n]])=>{(31&n||32&n)&&Object.defineProperty(l,e,{get(){return t=e,ae(this).$instanceValues$.get(t);var t},set(n){Y(this,e,n,t)},configurable:!0,enumerable:!0})}));{const o=new Map;l.attributeChangedCallback=function(e,n,s){ue.jmp((()=>{var $;const a=o.get(e);if(this.hasOwnProperty(a))s=this[a],delete this[a];else{if(l.hasOwnProperty(a)&&"number"==typeof this[a]&&this[a]==s)return;if(null==a){const l=ae(this),o=null==l?void 0:l.$flags$;if(o&&!(8&o)&&128&o&&s!==n){const l=this,o=null===($=t.$watchers$)||void 0===$?void 0:$[e];null==o||o.forEach((t=>{null!=l[t]&&l[t].call(l,s,n,e)}))}return}}this[a]=(null!==s||"boolean"!=typeof this[a])&&s}))},e.observedAttributes=Array.from(new Set([...Object.keys(null!==(s=t.$watchers$)&&void 0!==s?s:{}),...n.filter((([e,t])=>15&t[0])).map((([e,n])=>{var s;const l=n[1]||e;return o.set(l,e),512&n[0]&&(null===(s=t.$attrsToReflect$)||void 0===s||s.push([e,l])),l}))]))}}return e},ee=async(e,t,n,s)=>{let l;if(0==(32&t.$flags$)&&(t.$flags$|=32,l=e.constructor,customElements.whenDefined(n.$tagName$).then((()=>t.$flags$|=128)),l.style)){let s=l.style;"string"!=typeof s&&(s=s[t.$modeName$=(e=>fe.map((t=>t(e))).find((e=>!!e)))(e)]);const o=w(n,t.$modeName$);if(!de.has(o)){const e=(n.$tagName$,()=>{});((e,t,n)=>{let s=de.get(e);ge&&n?(s=s||new CSSStyleSheet,"string"==typeof s?s=t:s.replaceSync(t)):s=t,de.set(e,s)})(o,s,!!(1&n.$flags$)),e()}}t.$ancestorComponent$,V(t,!0)},te=e=>{const t=e["s-cr"]=he.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)},ne=(e("p",((e,t)=>{const n={$flags$:t[0],$tagName$:t[1]};n.$members$=t[2],n.$listeners$=t[3],n.$watchers$=e.$watchers$,n.$attrsToReflect$=[];const s=e.prototype.connectedCallback,l=e.prototype.disconnectedCallback;return Object.assign(e.prototype,{__registerHost(){re(this,n)},connectedCallback(){(e=>{if(0==(1&ue.$flags$)){const t=ae(e),n=t.$cmpMeta$,s=(n.$tagName$,()=>{});1&t.$flags$?(ne(e,t,n.$listeners$),(null==t?void 0:t.$lazyInstance$)?t.$lazyInstance$:(null==t?void 0:t.$onReadyPromise$)&&t.$onReadyPromise$.then((()=>{t.$lazyInstance$}))):(t.$flags$|=1,12&n.$flags$&&te(e),n.$members$&&Object.entries(n.$members$).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),ee(e,t,n)),s()}})(this),s&&s.call(this)},disconnectedCallback(){(async e=>{if(0==(1&ue.$flags$)){const t=ae(e);t.$rmListeners$&&(t.$rmListeners$.map((e=>e())),t.$rmListeners$=void 0)}})(this),l&&l.call(this)},__attachShadow(){this.attachShadow({mode:"open",delegatesFocus:!!(16&n.$flags$)})}}),e.is=n.$tagName$,Z(e,n)})),(e,t,n,s)=>{n&&n.map((([n,s,l])=>{const o=le(e,n),$=se(t,l),a=oe(n);ue.ael(o,s,$,a),(t.$rmListeners$=t.$rmListeners$||[]).push((()=>ue.rel(o,s,$,a)))}))}),se=(e,n)=>s=>{try{t.lazyLoad||e.$hostElement$[n](s)}catch(l){ce(l)}},le=(e,t)=>4&t?he:8&t?me:16&t?he.body:e,oe=e=>pe?{passive:0!=(1&e),capture:0!=(2&e)}:0!=(2&e),$e=new WeakMap,ae=e=>$e.get(e),re=(e,t)=>{const n={$flags$:0,$hostElement$:e,$cmpMeta$:t,$instanceValues$:new Map};return ne(e,n,t.$listeners$),$e.set(e,n)},ie=(e,t)=>t in e,ce=(e,t)=>(0,console.error)(e,t),de=new Map,fe=[],me="undefined"!=typeof window?window:{},he=me.document||{head:{}},ue=(e("H",me.HTMLElement||class{}),{$flags$:0,$resourcesUrl$:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,s)=>e.addEventListener(t,n,s),rel:(e,t,n,s)=>e.removeEventListener(t,n,s),ce:(e,t)=>new CustomEvent(e,t)}),pe=(e("s",(e=>{Object.assign(ue,e)})),(()=>{let e=!1;try{he.addEventListener("e",null,Object.defineProperty({},"passive",{get(){e=!0}}))}catch(t){}return e})()),ge=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replaceSync}catch(e){}return!1})(),ye=[],ve=[],be=(e,t)=>n=>{e.push(n),c||(c=!0,t&&4&ue.$flags$?we(Se):ue.raf(Se))},Ne=e=>{for(let n=0;n<e.length;n++)try{e[n](performance.now())}catch(t){ce(t)}e.length=0},Se=()=>{Ne(ye),Ne(ve),(c=ye.length>0)&&ue.raf(Se)},we=e=>{return Promise.resolve(t).then(e);var t},ke=(e("r",be(ye,!1)),e("w",be(ve,!0)))}}}));
