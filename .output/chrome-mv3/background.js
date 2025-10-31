var background=(function(){"use strict";function Ke(t){return t==null||typeof t=="function"?{main:t}:t}const v=globalThis.browser?.runtime?.id?globalThis.browser:globalThis.chrome;async function Xe(t){return await fetch(t)}function Qe(t){let e="";return t.forEach(n=>{n.segs&&n.segs.map(s=>{e+=s.utf8})}),e}const Ze=()=>{};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},et=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],d=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(d>>10)),e[s++]=String.fromCharCode(56320+(d&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},he={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,d=r+2<t.length,h=d?t[r+2]:0,w=i>>2,_=(i&3)<<4|a>>4;let C=(a&15)<<2|h>>6,m=h&63;d||(m=64,o||(C=64)),s.push(n[w],n[_],n[C],n[m])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(de(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):et(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const h=r<t.length?n[t.charAt(r)]:64;++r;const _=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||h==null||_==null)throw new tt;const C=i<<2|a>>4;if(s.push(C),h!==64){const m=a<<4&240|h>>2;if(s.push(m),_!==64){const b=h<<6&192|_;s.push(b)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class tt extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const nt=function(t){const e=de(t);return he.encodeByteArray(e,!0)},ue=function(t){return nt(t).replace(/\./g,"")},st=function(t){try{return he.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it=()=>rt().__FIREBASE_DEFAULTS__,ot=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},at=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&st(t[1]);return e&&JSON.parse(e)},ct=()=>{try{return Ze()||it()||ot()||at()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},fe=()=>ct()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}function dt(){try{return typeof indexedDB=="object"}catch{return!1}}function ht(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="FirebaseError";class N extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=ut,Object.setPrototypeOf(this,N.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,pe.prototype.create)}}class pe{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?ft(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new N(r,a,s)}}function ft(t,e){return t.replace(pt,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const pt=/\{\$([^}]+)}/g;function z(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(ge(i)&&ge(o)){if(!z(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function ge(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(t){return t&&t._delegate?t._delegate:t}class k{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new lt;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(yt(e))try{this.getOrInitializeService({instanceIdentifier:O})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=O){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=O){return this.instances.has(e)}getOptions(e=O){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:bt(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=O){return this.component?this.component.multipleInstances?e:O:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function bt(t){return t===O?void 0:t}function yt(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new mt(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var u;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(u||(u={}));const wt={debug:u.DEBUG,verbose:u.VERBOSE,info:u.INFO,warn:u.WARN,error:u.ERROR,silent:u.SILENT},St=u.INFO,It={[u.DEBUG]:"log",[u.VERBOSE]:"log",[u.INFO]:"info",[u.WARN]:"warn",[u.ERROR]:"error"},_t=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=It[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class me{constructor(e){this.name=e,this._logLevel=St,this._logHandler=_t,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in u))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?wt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,u.DEBUG,...e),this._logHandler(this,u.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,u.VERBOSE,...e),this._logHandler(this,u.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,u.INFO,...e),this._logHandler(this,u.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,u.WARN,...e),this._logHandler(this,u.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,u.ERROR,...e),this._logHandler(this,u.ERROR,...e)}}const Ct=(t,e)=>e.some(n=>t instanceof n);let be,ye;function Ot(){return be||(be=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Rt(){return ye||(ye=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ee=new WeakMap,W=new WeakMap,we=new WeakMap,J=new WeakMap,q=new WeakMap;function At(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(S(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Ee.set(n,t)}).catch(()=>{}),q.set(e,t),e}function Tt(t){if(W.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});W.set(t,e)}let Y={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return W.get(t);if(e==="objectStoreNames")return t.objectStoreNames||we.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return S(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Dt(t){Y=t(Y)}function vt(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(K(this),e,...n);return we.set(s,e.sort?e.sort():[e]),S(s)}:Rt().includes(t)?function(...e){return t.apply(K(this),e),S(Ee.get(this))}:function(...e){return S(t.apply(K(this),e))}}function Nt(t){return typeof t=="function"?vt(t):(t instanceof IDBTransaction&&Tt(t),Ct(t,Ot())?new Proxy(t,Y):t)}function S(t){if(t instanceof IDBRequest)return At(t);if(J.has(t))return J.get(t);const e=Nt(t);return e!==t&&(J.set(t,e),q.set(e,t)),e}const K=t=>q.get(t);function Pt(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=S(o);return s&&o.addEventListener("upgradeneeded",d=>{s(S(o.result),d.oldVersion,d.newVersion,S(o.transaction),d)}),n&&o.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),a.then(d=>{i&&d.addEventListener("close",()=>i()),r&&d.addEventListener("versionchange",h=>r(h.oldVersion,h.newVersion,h))}).catch(()=>{}),a}const Mt=["get","getKey","getAll","getAllKeys","count"],kt=["put","add","delete","clear"],X=new Map;function Se(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(X.get(e))return X.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=kt.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Mt.includes(n)))return;const i=async function(o,...a){const d=this.transaction(o,r?"readwrite":"readonly");let h=d.store;return s&&(h=h.index(a.shift())),(await Promise.all([h[n](...a),r&&d.done]))[0]};return X.set(e,i),i}Dt(t=>({...t,get:(e,n,s)=>Se(e,n)||t.get(e,n,s),has:(e,n)=>!!Se(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if($t(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function $t(t){return t.getComponent()?.type==="VERSION"}const Q="@firebase/app",Ie="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y=new me("@firebase/app"),Bt="@firebase/app-compat",xt="@firebase/analytics-compat",Ft="@firebase/analytics",Ut="@firebase/app-check-compat",Ht="@firebase/app-check",Vt="@firebase/auth",jt="@firebase/auth-compat",Gt="@firebase/database",zt="@firebase/data-connect",Wt="@firebase/database-compat",Jt="@firebase/functions",qt="@firebase/functions-compat",Yt="@firebase/installations",Kt="@firebase/installations-compat",Xt="@firebase/messaging",Qt="@firebase/messaging-compat",Zt="@firebase/performance",en="@firebase/performance-compat",tn="@firebase/remote-config",nn="@firebase/remote-config-compat",sn="@firebase/storage",rn="@firebase/storage-compat",on="@firebase/firestore",an="@firebase/ai",cn="@firebase/firestore-compat",ln="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z="[DEFAULT]",dn={[Q]:"fire-core",[Bt]:"fire-core-compat",[Ft]:"fire-analytics",[xt]:"fire-analytics-compat",[Ht]:"fire-app-check",[Ut]:"fire-app-check-compat",[Vt]:"fire-auth",[jt]:"fire-auth-compat",[Gt]:"fire-rtdb",[zt]:"fire-data-connect",[Wt]:"fire-rtdb-compat",[Jt]:"fire-fn",[qt]:"fire-fn-compat",[Yt]:"fire-iid",[Kt]:"fire-iid-compat",[Xt]:"fire-fcm",[Qt]:"fire-fcm-compat",[Zt]:"fire-perf",[en]:"fire-perf-compat",[tn]:"fire-rc",[nn]:"fire-rc-compat",[sn]:"fire-gcs",[rn]:"fire-gcs-compat",[on]:"fire-fst",[cn]:"fire-fst-compat",[an]:"fire-vertex","fire-js":"fire-js",[ln]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F=new Map,hn=new Map,ee=new Map;function _e(t,e){try{t.container.addComponent(e)}catch(n){y.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function U(t){const e=t.name;if(ee.has(e))return y.debug(`There were multiple attempts to register component ${e}.`),!1;ee.set(e,t);for(const n of F.values())_e(n,t);for(const n of hn.values())_e(n,t);return!0}function un(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function fn(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},I=new pe("app","Firebase",pn);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new k("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw I.create("app-deleted",{appName:this._name})}}function Ce(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Z,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw I.create("bad-app-name",{appName:String(r)});if(n||(n=fe()),!n)throw I.create("no-options");const i=F.get(r);if(i){if(z(n,i.options)&&z(s,i.config))return i;throw I.create("duplicate-app",{appName:r})}const o=new Et(r);for(const d of ee.values())o.addComponent(d);const a=new gn(n,s,o);return F.set(r,a),a}function mn(t=Z){const e=F.get(t);if(!e&&t===Z&&fe())return Ce();if(!e)throw I.create("no-app",{appName:t});return e}function P(t,e,n){let s=dn[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),y.warn(o.join(" "));return}U(new k(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn="firebase-heartbeat-database",yn=1,L="firebase-heartbeat-store";let te=null;function Oe(){return te||(te=Pt(bn,yn,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(L)}catch(n){console.warn(n)}}}}).catch(t=>{throw I.create("idb-open",{originalErrorMessage:t.message})})),te}async function En(t){try{const n=(await Oe()).transaction(L),s=await n.objectStore(L).get(Ae(t));return await n.done,s}catch(e){if(e instanceof N)y.warn(e.message);else{const n=I.create("idb-get",{originalErrorMessage:e?.message});y.warn(n.message)}}}async function Re(t,e){try{const s=(await Oe()).transaction(L,"readwrite");await s.objectStore(L).put(e,Ae(t)),await s.done}catch(n){if(n instanceof N)y.warn(n.message);else{const s=I.create("idb-set",{originalErrorMessage:n?.message});y.warn(s.message)}}}function Ae(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn=1024,Sn=30;class In{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Cn(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Te();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>Sn){const r=On(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){y.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Te(),{heartbeatsToSend:n,unsentEntries:s}=_n(this._heartbeatsCache.heartbeats),r=ue(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return y.warn(e),""}}}function Te(){return new Date().toISOString().substring(0,10)}function _n(t,e=wn){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),De(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),De(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Cn{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return dt()?ht().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await En(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Re(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Re(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function De(t){return ue(JSON.stringify({version:2,heartbeats:t})).length}function On(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(t){U(new k("platform-logger",e=>new Lt(e),"PRIVATE")),U(new k("heartbeat",e=>new In(e),"PRIVATE")),P(Q,Ie,t),P(Q,Ie,"esm2020"),P("fire-js","")}Rn("");var An="firebase",Tn="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */P(An,Tn,"app");var ve="@firebase/ai",ne="2.4.0";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M="AI",Ne="us-central1",Dn="firebasevertexai.googleapis.com",vn="v1beta",Pe=ne,Nn="gl-js",Pn=180*1e3,Mn="gemini-2.0-flash-lite";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l extends N{constructor(e,n,s){const r=M,i=`${r}/${e}`,o=`${r}: ${n} (${i})`;super(e,o),this.code=e,this.customErrorData=s,Error.captureStackTrace&&Error.captureStackTrace(this,l),Object.setPrototypeOf(this,l.prototype),this.toString=()=>o}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me=["user","model","function","system"],ke={HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"},Le={SAFETY:"SAFETY",RECITATION:"RECITATION"},R={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A={STRING:"string",NUMBER:"number",INTEGER:"integer",BOOLEAN:"boolean",ARRAY:"array",OBJECT:"object"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E={VERTEX_AI:"VERTEX_AI",GOOGLE_AI:"GOOGLE_AI"};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.backendType=e}}class $ extends $e{constructor(){super(E.GOOGLE_AI)}}class H extends $e{constructor(e=Ne){super(E.VERTEX_AI),e?this.location=e:this.location=Ne}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(t){if(t instanceof $)return`${M}/googleai`;if(t instanceof H)return`${M}/vertexai/${t.location}`;throw new l(c.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function Ln(t){const e=t.split("/");if(e[0]!==M)throw new l(c.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"vertexai":const s=e[2];if(!s)throw new l(c.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new H(s);case"googleai":return new $;default:throw new l(c.ERROR,`Invalid instance identifier string: '${t}'`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=new me("@firebase/vertexai");var T;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(T||(T={}));/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g{constructor(e,n,s={createOptions:{expectedInputs:[{type:"image"}]}}){this.languageModelProvider=e,this.mode=n,this.onDeviceParams=s,this.isDownloading=!1}async isAvailable(e){if(!this.mode)return p.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===R.ONLY_IN_CLOUD)return p.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;const n=await this.downloadIfAvailable();if(this.mode===R.ONLY_ON_DEVICE){if(n===T.UNAVAILABLE)throw new l(c.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");return(n===T.DOWNLOADABLE||n===T.DOWNLOADING)&&(p.debug("Waiting for download of LanguageModel to complete."),await this.downloadPromise),!0}return n!==T.AVAILABLE?(p.debug(`On-device inference unavailable because availability is "${n}".`),!1):g.isOnDeviceRequest(e)?!0:(p.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){const n=await this.createSession(),s=await Promise.all(e.contents.map(g.toLanguageModelMessage)),r=await n.prompt(s,this.onDeviceParams.promptOptions);return g.toResponse(r)}async generateContentStream(e){const n=await this.createSession(),s=await Promise.all(e.contents.map(g.toLanguageModelMessage)),r=n.promptStreaming(s,this.onDeviceParams.promptOptions);return g.toStreamResponse(r)}async countTokens(e){throw new l(c.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return p.debug("Empty prompt rejected for on-device inference."),!1;for(const n of e.contents){if(n.role==="function")return p.debug('"Function" role rejected for on-device inference.'),!1;for(const s of n.parts)if(s.inlineData&&g.SUPPORTED_MIME_TYPES.indexOf(s.inlineData.mimeType)===-1)return p.debug(`Unsupported mime type "${s.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(){const e=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);return e===T.DOWNLOADABLE&&this.download(),e}download(){this.isDownloading||(this.isDownloading=!0,this.downloadPromise=this.languageModelProvider?.create(this.onDeviceParams.createOptions).finally(()=>{this.isDownloading=!1}))}static async toLanguageModelMessage(e){const n=await Promise.all(e.parts.map(g.toLanguageModelMessageContent));return{role:g.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if(e.text)return{type:"text",value:e.text};if(e.inlineData){const s=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(s)}}throw new l(c.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new l(c.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");const e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){const n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(s,r){const i=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:s}]}}]});r.enqueue(n.encode(`data: ${i}

`))}}))}}}g.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function $n(t,e,n){if(typeof e<"u"&&t)return new g(e.LanguageModel,t,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e,n,s,r,i){this.app=e,this.backend=n,this.chromeAdapterFactory=i;const o=r?.getImmediate({optional:!0}),a=s?.getImmediate({optional:!0});this.auth=a||null,this.appCheck=o||null,n instanceof H?this.location=n.location:this.location=""}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xn(t,{instanceIdentifier:e}){if(!e)throw new l(c.ERROR,"AIService instance identifier is undefined.");const n=Ln(e),s=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new Bn(s,n,r,i,$n)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e,n){if(e.app?.options?.apiKey)if(e.app?.options?.projectId)if(e.app?.options?.appId){if(this._apiSettings={apiKey:e.app.options.apiKey,project:e.app.options.projectId,appId:e.app.options.appId,automaticDataCollectionEnabled:e.app.automaticDataCollectionEnabled,location:e.location,backend:e.backend},fn(e.app)&&e.app.settings.appCheckToken){const s=e.app.settings.appCheckToken;this._apiSettings.getAppCheckToken=()=>Promise.resolve({token:s})}else e.appCheck&&(e.options?.useLimitedUseAppCheckTokens?this._apiSettings.getAppCheckToken=()=>e.appCheck.getLimitedUseToken():this._apiSettings.getAppCheckToken=()=>e.appCheck.getToken());e.auth&&(this._apiSettings.getAuthToken=()=>e.auth.getToken()),this.model=B.normalizeModelName(n,this._apiSettings.backend.backendType)}else throw new l(c.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.');else throw new l(c.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new l(c.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.')}static normalizeModelName(e,n){return n===E.GOOGLE_AI?B.normalizeGoogleAIModelName(e):B.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x;(function(t){t.GENERATE_CONTENT="generateContent",t.STREAM_GENERATE_CONTENT="streamGenerateContent",t.COUNT_TOKENS="countTokens",t.PREDICT="predict"})(x||(x={}));class Be{constructor(e,n,s,r,i){this.model=e,this.task=n,this.apiSettings=s,this.stream=r,this.requestOptions=i}toString(){const e=new URL(this.baseUrl);return e.pathname=`/${this.apiVersion}/${this.modelPath}:${this.task}`,e.search=this.queryParams.toString(),e.toString()}get baseUrl(){return this.requestOptions?.baseUrl||`https://${Dn}`}get apiVersion(){return vn}get modelPath(){if(this.apiSettings.backend instanceof $)return`projects/${this.apiSettings.project}/${this.model}`;if(this.apiSettings.backend instanceof H)return`projects/${this.apiSettings.project}/locations/${this.apiSettings.backend.location}/${this.model}`;throw new l(c.ERROR,`Invalid backend: ${JSON.stringify(this.apiSettings.backend)}`)}get queryParams(){const e=new URLSearchParams;return this.stream&&e.set("alt","sse"),e}}function Fn(){const t=[];return t.push(`${Nn}/${Pe}`),t.push(`fire/${Pe}`),t.join(" ")}async function Un(t){const e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",Fn()),e.append("x-goog-api-key",t.apiSettings.apiKey),t.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.apiSettings.appId),t.apiSettings.getAppCheckToken){const n=await t.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&p.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.apiSettings.getAuthToken){const n=await t.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function Hn(t,e,n,s,r,i){const o=new Be(t,e,n,s,i);return{url:o.toString(),fetchOptions:{method:"POST",headers:await Un(o),body:r}}}async function se(t,e,n,s,r,i){const o=new Be(t,e,n,s,i);let a,d;try{const h=await Hn(t,e,n,s,r,i),w=i?.timeout!=null&&i.timeout>=0?i.timeout:Pn,_=new AbortController;if(d=setTimeout(()=>_.abort(),w),h.fetchOptions.signal=_.signal,a=await fetch(h.url,h.fetchOptions),!a.ok){let C="",m;try{const b=await a.json();C=b.error.message,b.error.details&&(C+=` ${JSON.stringify(b.error.details)}`,m=b.error.details)}catch{}throw a.status===403&&m&&m.some(b=>b.reason==="SERVICE_DISABLED")&&m.some(b=>b.links?.[0]?.description.includes("Google developers console API activation"))?new l(c.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${o.apiSettings.project}/genai/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:a.status,statusText:a.statusText,errorDetails:m}):new l(c.FETCH_ERROR,`Error fetching from ${o}: [${a.status} ${a.statusText}] ${C}`,{status:a.status,statusText:a.statusText,errorDetails:m})}}catch(h){let w=h;throw h.code!==c.FETCH_ERROR&&h.code!==c.API_NOT_ENABLED&&h instanceof Error&&(w=new l(c.ERROR,`Error fetching from ${o.toString()}: ${h.message}`),w.stack=h.stack),w}finally{d&&clearTimeout(d)}return a}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&p.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Fe(t.candidates[0]))throw new l(c.RESPONSE_ERROR,`Response error: ${D(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function j(t){return t.candidates&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0),Vn(t)}function Vn(t){return t.text=()=>{if(V(t))return xe(t,e=>!e.thought);if(t.promptFeedback)throw new l(c.RESPONSE_ERROR,`Text not available. ${D(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(V(t)){const e=xe(t,n=>!!n.thought);return e===""?void 0:e}else if(t.promptFeedback)throw new l(c.RESPONSE_ERROR,`Thought summary not available. ${D(t)}`,{response:t})},t.inlineDataParts=()=>{if(V(t))return Gn(t);if(t.promptFeedback)throw new l(c.RESPONSE_ERROR,`Data not available. ${D(t)}`,{response:t})},t.functionCalls=()=>{if(V(t))return jn(t);if(t.promptFeedback)throw new l(c.RESPONSE_ERROR,`Function call not available. ${D(t)}`,{response:t})},t}function xe(t,e){const n=[];if(t.candidates?.[0].content?.parts)for(const s of t.candidates?.[0].content?.parts)s.text&&e(s)&&n.push(s.text);return n.length>0?n.join(""):""}function jn(t){const e=[];if(t.candidates?.[0].content?.parts)for(const n of t.candidates?.[0].content?.parts)n.functionCall&&e.push(n.functionCall);if(e.length>0)return e}function Gn(t){const e=[];if(t.candidates?.[0].content?.parts)for(const n of t.candidates?.[0].content?.parts)n.inlineData&&e.push(n);if(e.length>0)return e}const zn=[Le.RECITATION,Le.SAFETY];function Fe(t){return!!t.finishReason&&zn.some(e=>e===t.finishReason)}function D(t){let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",t.promptFeedback?.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),t.promptFeedback?.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if(t.candidates?.[0]){const n=t.candidates[0];Fe(n)&&(e+=`Candidate was blocked due to ${n.finishReason}`,n.finishMessage&&(e+=`: ${n.finishMessage}`))}return e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(t){if(t.safetySettings?.forEach(e=>{if(e.method)throw new l(c.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),t.generationConfig?.topK){const e=Math.round(t.generationConfig.topK);e!==t.generationConfig.topK&&(p.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=e)}return t}function re(t){return{candidates:t.candidates?Jn(t.candidates):void 0,prompt:t.promptFeedback?qn(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function Wn(t,e){return{generateContentRequest:{model:e,...t}}}function Jn(t){const e=[];let n;return e&&t.forEach(s=>{let r;if(s.citationMetadata&&(r={citations:s.citationMetadata.citationSources}),s.safetyRatings&&(n=s.safetyRatings.map(o=>({...o,severity:o.severity??ke.HARM_SEVERITY_UNSUPPORTED,probabilityScore:o.probabilityScore??0,severityScore:o.severityScore??0}))),s.content?.parts?.some(o=>o?.videoMetadata))throw new l(c.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");const i={index:s.index,content:s.content,finishReason:s.finishReason,finishMessage:s.finishMessage,safetyRatings:n,citationMetadata:r,groundingMetadata:s.groundingMetadata,urlContextMetadata:s.urlContextMetadata};e.push(i)}),e}function qn(t){const e=[];return t.safetyRatings.forEach(s=>{e.push({category:s.category,probability:s.probability,severity:s.severity??ke.HARM_SEVERITY_UNSUPPORTED,probabilityScore:s.probabilityScore??0,severityScore:s.severityScore??0,blocked:s.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Yn(t,e){const n=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),s=Qn(n),[r,i]=s.tee();return{stream:Xn(r,e),response:Kn(i,e)}}async function Kn(t,e){const n=[],s=t.getReader();for(;;){const{done:r,value:i}=await s.read();if(r){let o=Zn(n);return e.backend.backendType===E.GOOGLE_AI&&(o=re(o)),j(o)}n.push(i)}}async function*Xn(t,e){const n=t.getReader();for(;;){const{value:s,done:r}=await n.read();if(r)break;let i;e.backend.backendType===E.GOOGLE_AI?i=j(re(s)):i=j(s);const o=i.candidates?.[0];!o?.content?.parts&&!o?.finishReason&&!o?.citationMetadata&&!o?.urlContextMetadata||(yield i)}}function Qn(t){const e=t.getReader();return new ReadableStream({start(s){let r="";return i();function i(){return e.read().then(({value:o,done:a})=>{if(a){if(r.trim()){s.error(new l(c.PARSE_FAILED,"Failed to parse stream"));return}s.close();return}r+=o;let d=r.match(He),h;for(;d;){try{h=JSON.parse(d[1])}catch{s.error(new l(c.PARSE_FAILED,`Error parsing JSON response: "${d[1]}`));return}s.enqueue(h),r=r.substring(d[0].length),d=r.match(He)}return i()})}}})}function Zn(t){const n={promptFeedback:t[t.length-1]?.promptFeedback};for(const s of t)if(s.candidates)for(const r of s.candidates){const i=r.index||0;n.candidates||(n.candidates=[]),n.candidates[i]||(n.candidates[i]={index:r.index}),n.candidates[i].citationMetadata=r.citationMetadata,n.candidates[i].finishReason=r.finishReason,n.candidates[i].finishMessage=r.finishMessage,n.candidates[i].safetyRatings=r.safetyRatings,n.candidates[i].groundingMetadata=r.groundingMetadata;const o=r.urlContextMetadata;if(typeof o=="object"&&o!==null&&Object.keys(o).length>0&&(n.candidates[i].urlContextMetadata=o),r.content){if(!r.content.parts)continue;n.candidates[i].content||(n.candidates[i].content={role:r.content.role||"user",parts:[]});for(const a of r.content.parts){const d={...a};a.text!==""&&Object.keys(d).length>0&&n.candidates[i].content.parts.push(d)}}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es=[c.FETCH_ERROR,c.ERROR,c.API_NOT_ENABLED];async function Ve(t,e,n,s){if(!e)return s();switch(e.mode){case R.ONLY_ON_DEVICE:if(await e.isAvailable(t))return n();throw new l(c.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case R.ONLY_IN_CLOUD:return s();case R.PREFER_IN_CLOUD:try{return await s()}catch(r){if(r instanceof l&&es.includes(r.code))return n();throw r}case R.PREFER_ON_DEVICE:return await e.isAvailable(t)?n():s();default:throw new l(c.ERROR,`Unexpected infererence mode: ${e.mode}`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ts(t,e,n,s){return t.backend.backendType===E.GOOGLE_AI&&(n=Ue(n)),se(e,x.STREAM_GENERATE_CONTENT,t,!0,JSON.stringify(n),s)}async function je(t,e,n,s,r){const i=await Ve(n,s,()=>s.generateContentStream(n),()=>ts(t,e,n,r));return Yn(i,t)}async function ns(t,e,n,s){return t.backend.backendType===E.GOOGLE_AI&&(n=Ue(n)),se(e,x.GENERATE_CONTENT,t,!1,JSON.stringify(n),s)}async function Ge(t,e,n,s,r){const i=await Ve(n,s,()=>s.generateContent(n),()=>ns(t,e,n,r)),o=await ss(i,t);return{response:j(o)}}async function ss(t,e){const n=await t.json();return e.backend.backendType===E.GOOGLE_AI?re(n):n}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{text:t}]};if(t.text)return{role:"system",parts:[t]};if(t.parts)return t.role?t:{role:"system",parts:t.parts}}}function ie(t){let e=[];if(typeof t=="string")e=[{text:t}];else for(const n of t)typeof n=="string"?e.push({text:n}):e.push(n);return rs(e)}function rs(t){const e={role:"user",parts:[]},n={role:"function",parts:[]};let s=!1,r=!1;for(const i of t)"functionResponse"in i?(n.parts.push(i),r=!0):(e.parts.push(i),s=!0);if(s&&r)throw new l(c.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!s&&!r)throw new l(c.INVALID_CONTENT,"No Content is provided for sending chat message.");return s?e:n}function oe(t){let e;return t.contents?e=t:e={contents:[ie(t)]},t.systemInstruction&&(e.systemInstruction=ze(t.systemInstruction)),e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const We=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],is={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},Je={user:["model"],function:["model"],model:["user","function"],system:[]};function os(t){let e=null;for(const n of t){const{role:s,parts:r}=n;if(!e&&s!=="user")throw new l(c.INVALID_CONTENT,`First Content should be with role 'user', got ${s}`);if(!Me.includes(s))throw new l(c.INVALID_CONTENT,`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(Me)}`);if(!Array.isArray(r))throw new l(c.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(r.length===0)throw new l(c.INVALID_CONTENT,"Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,executableCode:0,codeExecutionResult:0};for(const a of r)for(const d of We)d in a&&(i[d]+=1);const o=is[s];for(const a of We)if(!o.includes(a)&&i[a]>0)throw new l(c.INVALID_CONTENT,`Content with role '${s}' can't contain '${a}' part`);if(e&&!Je[s].includes(e.role))throw new l(c.INVALID_CONTENT,`Content with role '${s}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(Je)}`);e=n}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe="SILENT_ERROR";class as{constructor(e,n,s,r,i){this.model=n,this.chromeAdapter=s,this.params=r,this.requestOptions=i,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e,r?.history&&(os(r.history),this._history=r.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e){await this._sendPromise;const n=ie(e),s={safetySettings:this.params?.safetySettings,generationConfig:this.params?.generationConfig,tools:this.params?.tools,toolConfig:this.params?.toolConfig,systemInstruction:this.params?.systemInstruction,contents:[...this._history,n]};let r={};return this._sendPromise=this._sendPromise.then(()=>Ge(this._apiSettings,this.model,s,this.chromeAdapter,this.requestOptions)).then(i=>{if(i.response.candidates&&i.response.candidates.length>0){this._history.push(n);const o={parts:i.response.candidates?.[0].content.parts||[],role:i.response.candidates?.[0].content.role||"model"};this._history.push(o)}else{const o=D(i.response);o&&p.warn(`sendMessage() was unsuccessful. ${o}. Inspect response object for details.`)}r=i}),await this._sendPromise,r}async sendMessageStream(e){await this._sendPromise;const n=ie(e),s={safetySettings:this.params?.safetySettings,generationConfig:this.params?.generationConfig,tools:this.params?.tools,toolConfig:this.params?.toolConfig,systemInstruction:this.params?.systemInstruction,contents:[...this._history,n]},r=je(this._apiSettings,this.model,s,this.chromeAdapter,this.requestOptions);return this._sendPromise=this._sendPromise.then(()=>r).catch(i=>{throw new Error(qe)}).then(i=>i.response).then(i=>{if(i.candidates&&i.candidates.length>0){this._history.push(n);const o={...i.candidates[0].content};o.role||(o.role="model"),this._history.push(o)}else{const o=D(i);o&&p.warn(`sendMessageStream() was unsuccessful. ${o}. Inspect response object for details.`)}}).catch(i=>{i.message!==qe&&p.error(i)}),r}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cs(t,e,n,s){let r="";if(t.backend.backendType===E.GOOGLE_AI){const o=Wn(n,e);r=JSON.stringify(o)}else r=JSON.stringify(n);return(await se(e,x.COUNT_TOKENS,t,!1,r,s)).json()}async function ls(t,e,n,s,r){if(s?.mode===R.ONLY_ON_DEVICE)throw new l(c.UNSUPPORTED,"countTokens() is not supported for on-device models.");return cs(t,e,n,r)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds extends B{constructor(e,n,s,r){super(e,n.model),this.chromeAdapter=r,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=ze(n.systemInstruction),this.requestOptions=s||{}}async generateContent(e){const n=oe(e);return Ge(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...n},this.chromeAdapter,this.requestOptions)}async generateContentStream(e){const n=oe(e);return je(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...n},this.chromeAdapter,this.requestOptions)}startChat(e){return new as(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e){const n=oe(e);return ls(this._apiSettings,this.model,n,this.chromeAdapter)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f{constructor(e){if(!e.type&&!e.anyOf)throw new l(c.INVALID_SCHEMA,"A schema must have either a 'type' or an 'anyOf' array of sub-schemas.");for(const n in e)this[n]=e[n];this.type=e.type,this.format=e.hasOwnProperty("format")?e.format:void 0,this.nullable=e.hasOwnProperty("nullable")?!!e.nullable:!1}toJSON(){const e={type:this.type};for(const n in this)this.hasOwnProperty(n)&&this[n]!==void 0&&(n!=="required"||this.type===A.OBJECT)&&(e[n]=this[n]);return e}static array(e){return new ps(e,e.items)}static object(e){return new gs(e,e.properties,e.optionalProperties)}static string(e){return new Ye(e)}static enumString(e){return new Ye(e,e.enum)}static integer(e){return new hs(e)}static number(e){return new us(e)}static boolean(e){return new fs(e)}static anyOf(e){return new ms(e)}}class hs extends f{constructor(e){super({type:A.INTEGER,...e})}}class us extends f{constructor(e){super({type:A.NUMBER,...e})}}class fs extends f{constructor(e){super({type:A.BOOLEAN,...e})}}class Ye extends f{constructor(e,n){super({type:A.STRING,...e}),this.enum=n}toJSON(){const e=super.toJSON();return this.enum&&(e.enum=this.enum),e}}class ps extends f{constructor(e,n){super({type:A.ARRAY,...e}),this.items=n}toJSON(){const e=super.toJSON();return e.items=this.items.toJSON(),e}}class gs extends f{constructor(e,n,s=[]){super({type:A.OBJECT,...e}),this.properties=n,this.optionalProperties=s}toJSON(){const e=super.toJSON();e.properties={...this.properties};const n=[];if(this.optionalProperties){for(const s of this.optionalProperties)if(!this.properties.hasOwnProperty(s))throw new l(c.INVALID_SCHEMA,`Property "${s}" specified in "optionalProperties" does not exist.`)}for(const s in this.properties)this.properties.hasOwnProperty(s)&&(e.properties[s]=this.properties[s].toJSON(),this.optionalProperties.includes(s)||n.push(s));return n.length>0&&(e.required=n),delete e.optionalProperties,e}}class ms extends f{constructor(e){if(e.anyOf.length===0)throw new l(c.INVALID_SCHEMA,"The 'anyOf' array must not be empty.");super({...e,type:void 0}),this.anyOf=e.anyOf}toJSON(){const e=super.toJSON();return this.anyOf&&Array.isArray(this.anyOf)&&(e.anyOf=this.anyOf.map(n=>n.toJSON())),e}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bs(t=mn(),e){t=gt(t);const n=un(t,M),s=e?.backend??new $,r={useLimitedUseAppCheckTokens:e?.useLimitedUseAppCheckTokens??!1},i=kn(s),o=n.getImmediate({identifier:i});return o.options=r,o}function ys(t,e,n){const s=e;let r;if(s.mode?r=s.inCloudParams||{model:Mn}:r=e,!r.model)throw new l(c.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");const i=t.chromeAdapterFactory?.(s.mode,typeof window>"u"?void 0:window,s.onDeviceParams);return new ds(t,r,n,i)}function Es(){U(new k(M,xn,"PUBLIC").setMultipleInstances(!0)),P(ve,ne),P(ve,ne,"esm2020")}Es();const ws=Ce({apiKey:"AIzaSyCNjt4tRAs7iH8rLp9OGyPYW_xlnJtdUMA",authDomain:"buymyrecipe-d20a5.firebaseapp.com",projectId:"buymyrecipe-d20a5",storageBucket:"buymyrecipe-d20a5.firebasestorage.app",messagingSenderId:"369103047155",appId:"1:369103047155:web:c31540b633fe0b4fde6a86",measurementId:"G-MWD9D7H4C1"}),Ss=bs(ws,{backend:new $});async function Is(t){try{const e=f.object({properties:{success:f.boolean({description:"Indicates if the analysis was successful, and the caption is of a recipe"}),message:f.string({description:"Message stating that process was a success, if not what was the issue"}),recipeName:f.string({description:"Name of the recipe that can be inferred from the captions"}),summary:f.string({description:"Summarized recipe with clear step-by-step instructions"}),requiredIngredients:f.array({description:"List of required ingredients with alternatives",items:f.object({properties:{ingredientName:f.string({description:"Name of the ingredient"}),quantity:f.string({description:"Quantity of the ingredient, if not specified give it yourself"}),alternatives:f.array({description:"Alternative ingredients and their details",items:f.object({properties:{name:f.string(),speciality:f.enumString({enum:["HEALTHIER","CHEAPER","EASY TO FIND"],description:"Reason for alternative"}),quantity:f.string()}})})}})}),instructions:f.array({description:"Step-by-step cooking instructions",items:f.object({properties:{step:f.string(),emoji:f.string()}})})}}),n=ys(Ss,{mode:"prefer_on_device",inCloudParams:{model:"gemini-2.5-flash",generationConfig:{responseMimeType:"application/json",responseSchema:e}},onDeviceParams:{promptOptions:{responseConstraint:e}}}),r=`You are provided with the captions of a YouTube video describing a cookie recipe.
You must extract and structure the following details:
1. Summarized Recipe: Complete recipe in markdown format (excluding heading tags).
2. Ingredients: List each ingredient with quantity and possible alternatives labeled as HEALTHIER, CHEAPER, or EASY TO FIND.
3. Instructions: Step-by-step cooking process with suitable emojis.

Return a valid JSON response.

Recipe captions:
${t}`,o=(await n.generateContent(r)).response.text(),a=JSON.parse(o);return console.log(a),{...a}}catch(e){return console.error("Firebase AI Logic error:",e),{success:!1,message:"An error occurred"}}}const ae=new Set;let ce="";const _s=Ke(()=>{v.webRequest.onBeforeRequest.addListener(t=>{const e=t.url.split("&t=")[0];if(e.includes("www.youtube.com/api/timedtext")){if(ae.has(e))return{};ae.add(e),Xe(t.url).then(n=>n.json()).then(n=>{const s=n.events;ce=Qe(s),setTimeout(()=>ae.delete(e),1e6)}).catch(console.error)}return{}},{urls:["*://www.youtube.com/api/timedtext*"]}),v.runtime.onMessage.addListener((t,e,n)=>{if(t.type==="START")return ce.trim().length===0?n({analysis:{success:!1,message:"Try Enabling Captions"}}):Is(ce).then(s=>{n({analysis:s})}).catch(s=>{n({error:s.message})}),!0;if(t.type==="INGREDIENTS")return(async()=>{try{const i=await(await fetch(`https://plugin.progardenindia.com/api/search-ingredient?ingredient=${t.name}`)).json();n(i)}catch(s){n({error:s.message})}})(),!0;if(t.type==="SAVE")return v.tabs.query({active:!0,currentWindow:!0}).then(async([s])=>{s&&s.url?(await v.storage.local.set({[s.url]:t.recipeData}),n({saved:!0})):(console.error("No active tab or URL unavailable"),n({saved:!1}))}).catch(s=>{console.error("Error saving:",s),n({saved:!1,error:s.message})}),!0;if(t.type==="READ")return v.tabs.query({active:!0,currentWindow:!0}).then(async([s])=>{if(s&&s.url){const r=await v.storage.local.get(s.url);r[s.url]?n({data:r[s.url],available:!0}):n({available:!1})}else n({saved:!1}),console.error("No active tab or URL unavailable")}).catch(s=>{console.error("Error:",s),n({error:s.message})}),!0})});function As(){}function G(t,...e){}const Cs={debug:(...t)=>G(console.debug,...t),log:(...t)=>G(console.log,...t),warn:(...t)=>G(console.warn,...t),error:(...t)=>G(console.error,...t)};let le;try{le=_s.main(),le instanceof Promise&&console.warn("The background's main() function return a promise, but it must be synchronous")}catch(t){throw Cs.error("The background crashed on startup!"),t}return le})();
