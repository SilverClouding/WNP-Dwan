!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).tinybind=e()}(this,(function(){"use strict";var t=["prefix","templateDelimiters","rootInterface","preloadData","handler"];var e=["binders","formatters","adapters"];var r=0;var i=1;var a=0;var n=1;var s=/^'.*'$|^".*"$/;function o(t){var e=r;var a=t;return s.test(t)?a=t.slice(1,-1):"true"===t?a=!0:"false"===t?a=!1:"null"===t?a=null:"undefined"===t?a=void 0:isNaN(t)?e=i:a=Number(t),{type:e,value:a}}function c(t,e){var r;var i=t.length;var s=0;var o=0;var c=e[0],h=e[1];while(o<i){if((s=t.indexOf(c,o))<0){r&&r.push({type:a,value:t.slice(o)});break}if(r||(r=[]),s>0&&o<s&&r.push({type:a,value:t.slice(o,s)}),o=s+c.length,(s=t.indexOf(h,o))<0){var l=t.slice(o-h.length);var u=r[r.length-1];u&&u.type===a?u.value+=l:r.push({type:a,value:l});break}var d=t.slice(o,s).trim();r.push({type:n,value:d}),o=s+h.length}return r}var h={binders:{},formatters:{},adapters:{},_prefix:"rv",_fullPrefix:"rv-",get prefix(){return this._prefix},set prefix(t){this._prefix=t,this._fullPrefix=t+"-"},parseTemplate:c,parseType:o,templateDelimiters:["{","}"],rootInterface:".",preloadData:!0,handler:function t(e,r,i){this.call(e,r,i.view.models)},fallbackBinder:function t(e,r){null!=r?e.setAttribute(this.type,r):e.removeAttribute(this.type)},configure:function t(r){var i=this;r&&Object.keys(r).forEach((function(t){var a=r[t];e.indexOf(t)>-1?Object.keys(a).forEach((function(e){i[t][e]=a[e]})):i[t]=a}))}};function l(t){return"object"==typeof t&&null!==t}function u(t){throw new Error("[Observer] "+t)}var d;var p;var f;var v=function(){function t(t,e,r){this.keypath=e,this.callback=r,this.objectPath=[],this.parse(),this.obj=this.getRootObject(t),l(this.target=this.realize())&&this.set(!0,this.key,this.target,this.callback)}t.updateOptions=function t(e){d=e.adapters,p=Object.keys(d),f=e.rootInterface},t.tokenize=function t(e,r){var i=[];var a={i:r,path:""};var n;var s;for(n=0;n<e.length;n++)s=e.charAt(n),~p.indexOf(s)?(i.push(a),a={i:s,path:""}):a.path+=s;return i.push(a),i};var e=t.prototype;return e.parse=function e(){var r;var i;p.length||u("Must define at least one adapter interface."),~p.indexOf(this.keypath[0])?(i=this.keypath[0],r=this.keypath.substr(1)):(i=f,r=this.keypath),this.tokens=t.tokenize(r,i),this.key=this.tokens.pop()},e.realize=function t(){var e=this.obj;var r=-1;var i;var a;for(var n=0;n<this.tokens.length;n++)a=this.tokens[n],l(e)?("undefined"!=typeof this.objectPath[n]?e!==(i=this.objectPath[n])&&(this.set(!1,a,i,this),this.set(!0,a,e,this),this.objectPath[n]=e):(this.set(!0,a,e,this),this.objectPath[n]=e),e=this.get(a,e)):(-1===r&&(r=n),(i=this.objectPath[n])&&this.set(!1,a,i,this));return-1!==r&&this.objectPath.splice(r),e},e.sync=function t(){var e;var r;var i;(e=this.realize())!==this.target?(l(this.target)&&this.set(!1,this.key,this.target,this.callback),l(e)&&this.set(!0,this.key,e,this.callback),r=this.value(),this.target=e,((i=this.value())!==r||i instanceof Function)&&this.callback.sync()):e instanceof Array&&this.callback.sync()},e.value=function t(){if(l(this.target))return this.get(this.key,this.target)},e.setValue=function t(e){l(this.target)&&d[this.key.i].set(this.target,this.key.path,e)},e.get=function t(e,r){return d[e.i].get(r,e.path)},e.set=function t(e,r,i,a){var n=e?"observe":"unobserve";d[r.i][n](i,r.path,a)},e.unobserve=function t(){var e;var r;for(var i=0;i<this.tokens.length;i++)r=this.tokens[i],(e=this.objectPath[i])&&this.set(!1,r,e,this);l(this.target)&&this.set(!1,this.key,this.target,this.callback)},e.getRootObject=function t(e){var r;var i;if(!e.$parent)return e;r=this.tokens.length?this.tokens[0].path:this.key.path,i=e;while(i.$parent&&void 0===i[r])i=i.$parent;return i},t}();function g(t){if("checkbox"===t.type)return t.checked;if("select-multiple"===t.type){var e=[];var r;for(var i=0;i<t.options.length;i++)(r=t.options[i]).selected&&e.push(r.value);return e}return t.value}var m=/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;var b=/\s+/;var y=function(){function t(t,e,r,i,a,n,s){this.view=t,this.el=e,this.type=r,this.keypath=i,this.binder=a,this.arg=n,this.formatters=s,this.formatterObservers={},this.model=void 0}var e=t.prototype;return e.observe=function t(e,r){return new v(e,r,this)},e.parseTarget=function t(){if(this.keypath){var e=o(this.keypath);0===e.type?this.value=e.value:(this.observer=this.observe(this.view.models,this.keypath),this.model=this.observer.target)}else this.value=void 0},e.parseFormatterArguments=function t(e,r){var i=this;return e.map(o).map((function(t,e){var a=t.type,n=t.value;if(0===a)return n;i.formatterObservers[r]||(i.formatterObservers[r]={});var s=i.formatterObservers[r][e];return s||(s=i.observe(i.view.models,n),i.formatterObservers[r][e]=s),s.value()}))},e.formattedValue=function t(e){var r=this;return this.formatters.reduce((function(t,e,i){var a=e.match(m);var n=a.shift();var s=r.view.options.formatters[n];var o=r.parseFormatterArguments(a,i);return s&&s.read instanceof Function?t=s.read.apply(s,[t].concat(o)):s instanceof Function&&(t=s.apply(void 0,[t].concat(o))),t}),e)},e.eventHandler=function t(e){var r=this;var i=r.view.options.handler;return function(t){i.call(e,this,t,r)}},e.set=function t(e){e=e instanceof Function&&!this.binder.function?this.formattedValue(e.call(this.model)):this.formattedValue(e);var r=this.binder.routine||this.binder;r instanceof Function&&r.call(this,this.el,e)},e.sync=function t(){this.observer?(this.model=this.observer.target,this.set(this.observer.value())):this.set(this.value)},e.publish=function t(){var e=this;if(this.observer){var r=this.formatters.reduceRight((function(t,r,i){var a=r.split(b);var n=a.shift();var s=e.view.options.formatters[n];var o=e.parseFormatterArguments(a,i);return s&&s.publish&&(t=s.publish.apply(s,[t].concat(o))),t}),this.getValue(this.el));this.observer.setValue(r)}},e.bind=function t(){this.parseTarget(),this.binder.hasOwnProperty("bind")&&this.binder.bind.call(this,this.el),this.view.options.preloadData&&this.sync()},e.unbind=function t(){var e=this;this.binder.unbind&&this.binder.unbind.call(this,this.el),this.observer&&this.observer.unobserve(),Object.keys(this.formatterObservers).forEach((function(t){var r=e.formatterObservers[t];Object.keys(r).forEach((function(t){r[t].unobserve()}))})),this.formatterObservers={}},e.update=function t(e){void 0===e&&(e={}),this.observer&&(this.model=this.observer.target),this.binder.update&&this.binder.update.call(this,e)},e.getValue=function t(e){return this.binder&&this.binder.getValue?this.binder.getValue.call(this,e):g(e)},t}();var k={routine:function t(e,r){e.data=null!=r?r:""}};var _=/((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g;var w=function t(e,r){var i=!1;if(3===r.nodeType){var a=c(r.data,h.templateDelimiters);if(a){for(var n=0;n<a.length;n++){var s=a[n];var o=document.createTextNode(s.value);r.parentNode.insertBefore(o,r),1===s.type&&e.buildBinding(o,null,s.value,k,null)}r.parentNode.removeChild(r)}i=!0}else 1===r.nodeType&&(i=e.traverse(r));if(!i)for(var l=0;l<r.childNodes.length;l++)t(e,r.childNodes[l])};var S=function t(e,r){var i=e.binder&&e.binder.priority||0;var a;return(r.binder&&r.binder.priority||0)-i};var E=function t(e){return e.trim()};var O=function(){function t(t,e,r){t.jquery||t instanceof Array?this.els=t:this.els=[t],this.models=e,this.options=r,this.build()}var e=t.prototype;return e.buildBinding=function t(e,r,i,a,n){var s=i.match(_).map(E);var o=s.shift();this.bindings.push(new y(this,e,r,o,a,n,s))},e.build=function t(){this.bindings=[];var e=this.els,r,i;for(r=0,i=e.length;r<i;r++)w(this,e[r]);this.bindings.sort(S)},e.traverse=function t(e){var r=h._fullPrefix;var i="SCRIPT"===e.nodeName||"STYLE"===e.nodeName;var a=e.attributes;var n=[];var s=this.options.starBinders;var o,c,l,u;for(var d=0,p=a.length;d<p;d++){var f=a[d];if(0===f.name.indexOf(r)){if(o=f.name.slice(r.length),u=void 0,!(c=this.options.binders[o]))for(var v=0;v<s.length;v++)if(l=s[v],o.slice(0,l.length-1)===l.slice(0,-1)){c=this.options.binders[l],u=o.slice(l.length-1);break}if(c||(c=h.fallbackBinder),c.block)return this.buildBinding(e,o,f.value,c,u),e.removeAttribute(f.name),!0;n.push({attr:f,binder:c,type:o,arg:u})}}for(var g=0;g<n.length;g++){var m=n[g];this.buildBinding(e,m.type,m.attr.value,m.binder,m.arg),e.removeAttribute(m.attr.name)}return i},e.bind=function t(){this.bindings.forEach((function(t){t.bind()}))},e.unbind=function t(){this.bindings.forEach((function(t){t.unbind()}))},e.sync=function t(){this.bindings.forEach((function(t){t.sync()}))},e.publish=function t(){this.bindings.forEach((function(t){t.binder&&t.binder.publishes&&t.publish()}))},e.update=function t(e){var r=this;void 0===e&&(e={}),Object.keys(e).forEach((function(t){r.models[t]=e[t]})),this.bindings.forEach((function(t){t.update&&t.update(e)}))},t}();var C=["push","pop","shift","unshift","sort","reverse","splice"];var x={counter:0,weakmap:{},weakReference:function t(e){if(!e.hasOwnProperty("__rv")){var r=this.counter++;Object.defineProperty(e,"__rv",{value:r})}return this.weakmap[e.__rv]||(this.weakmap[e.__rv]={callbacks:{}}),this.weakmap[e.__rv]},cleanupWeakReference:function t(e,r){Object.keys(e.callbacks).length||e.pointers&&Object.keys(e.pointers).length||delete this.weakmap[r]},stubFunction:function t(e,r){var i=e[r];var a=this.weakReference(e);var n=this.weakmap;e[r]=function(){for(var t=arguments.length,r=new Array(t),s=0;s<t;s++)r[s]=arguments[s];var o=i.apply(e,r);return Object.keys(a.pointers).forEach((function(t){var e=a.pointers[t];n[t]&&n[t].callbacks[e]instanceof Array&&n[t].callbacks[e].forEach((function(t){t.sync()}))})),o}},observeArray:function t(e,r,i){var a=this;if(e instanceof Array){var n=this.weakReference(e);n.pointers||(n.pointers={},C.forEach((function(t){a.stubFunction(e,t)}))),n.pointers[r]||(n.pointers[r]=[]),-1===n.pointers[r].indexOf(i)&&n.pointers[r].push(i)}},unobserveArray:function t(e,r,i){if(e instanceof Array&&null!=e.__rv){var a=this.weakmap[e.__rv];if(a){var n=a.pointers[r];if(n){var s=n.indexOf(i);s>-1&&n.splice(s,1),n.length||delete a.pointers[r],this.cleanupWeakReference(a,e.__rv)}}}},observe:function t(e,r,i){var a=this;var n;var s=this.weakReference(e).callbacks;if(!s[r]){s[r]=[];var o=Object.getOwnPropertyDescriptor(e,r);o&&(o.get||o.set||!o.configurable)||(n=e[r],Object.defineProperty(e,r,{enumerable:!0,get:function t(){return n},set:function t(i){if(i!==n){a.unobserveArray(n,e.__rv,r),n=i;var s=a.weakmap[e.__rv];if(s){var o=s.callbacks[r];o&&o.forEach((function(t){t.sync()})),a.observeArray(i,e.__rv,r)}}}}))}-1===s[r].indexOf(i)&&s[r].push(i),this.observeArray(e[r],e.__rv,r)},unobserve:function t(e,r,i){var a=this.weakmap[e.__rv];if(a){var n=a.callbacks[r];if(n){var s=n.indexOf(i);s>-1&&(n.splice(s,1),n.length||(delete a.callbacks[r],this.unobserveArray(e[r],e.__rv,r))),this.cleanupWeakReference(a,e.__rv)}}},get:function t(e,r){return e[r]},set:function t(e,r,i){e[r]=i}};var F=function t(e){return null!=e?e.toString():void 0};var M=function t(e,r){for(var i=0;i<e;i++)r()};function A(t,e,r){var i=t.el.cloneNode(!0);var a=new O(i,e,t.view.options);return a.bind(),t.marker.parentNode.insertBefore(i,r),a}var T={"on-*":{function:!0,priority:1e3,unbind:function t(e){this.handler&&e.removeEventListener(this.arg,this.handler)},routine:function t(e,r){this.handler&&e.removeEventListener(this.arg,this.handler),this.handler=this.eventHandler(r),e.addEventListener(this.arg,this.handler)}},"each-*":{block:!0,priority:4e3,bind:function t(e){this.marker?this.iterated.forEach((function(t){t.bind()})):(this.marker=document.createComment(" tinybind: "+this.type+" "),this.iterated=[],e.parentNode.insertBefore(this.marker,e),e.parentNode.removeChild(e))},unbind:function t(e){this.iterated&&this.iterated.forEach((function(t){t.unbind()}))},routine:function t(e,r){var i=this;var a=this.arg;r=r||[];var n=e.getAttribute("index-property")||"$index";r.forEach((function(t,e){var r={$parent:i.view.models};r[n]=e,r[a]=t;var s=i.iterated[e];if(s)if(s.models[a]!==t){var o,c;for(var h=e+1;h<i.iterated.length;h++)if((c=i.iterated[h]).models[a]===t){o=h;break}void 0!==o?(i.iterated.splice(o,1),i.marker.parentNode.insertBefore(c.els[0],s.els[0]),c.models[n]=e):c=A(i,r,s.els[0]),i.iterated.splice(e,0,c)}else s.models[n]=e;else{var l=i.marker;i.iterated.length&&(l=i.iterated[i.iterated.length-1].els[0]),s=A(i,r,l.nextSibling),i.iterated.push(s)}})),this.iterated.length>r.length&&M(this.iterated.length-r.length,(function(){var t=i.iterated.pop();t.unbind(),i.marker.parentNode.removeChild(t.els[0])})),"OPTION"===e.nodeName&&this.view.bindings.forEach((function(t){t.el===i.marker.parentNode&&"value"===t.type&&t.sync()}))},update:function t(e){var r=this;var i={};Object.keys(e).forEach((function(t){t!==r.arg&&(i[t]=e[t])})),this.iterated.forEach((function(t){t.update(i)}))}},"class-*":function t(e,r){var i=" "+e.className+" ";!r==i.indexOf(" "+this.arg+" ")>-1&&(e.className=r?e.className+" "+this.arg:i.replace(" "+this.arg+" "," ").trim())},text:function t(e,r){e.textContent=null!=r?r:""},html:function t(e,r){e.innerHTML=null!=r?r:""},show:function t(e,r){e.style.display=r?"":"none"},hide:function t(e,r){e.style.display=r?"none":""},enabled:function t(e,r){e.disabled=!r},disabled:function t(e,r){e.disabled=!!r},checked:{publishes:!0,priority:2e3,bind:function t(e){var r=this;this.callback||(this.callback=function(){r.publish()}),e.addEventListener("change",this.callback)},unbind:function t(e){e.removeEventListener("change",this.callback)},routine:function t(e,r){"radio"===e.type?e.checked=F(e.value)===F(r):e.checked=!!r}},value:{publishes:!0,priority:3e3,bind:function t(e){if(this.isRadio="INPUT"===e.tagName&&"radio"===e.type,!this.isRadio){this.event=e.getAttribute("event-name")||("SELECT"===e.tagName?"change":"input");var r=this;this.callback||(this.callback=function(){r.publish()}),e.addEventListener(this.event,this.callback)}},unbind:function t(e){this.isRadio||e.removeEventListener(this.event,this.callback)},routine:function t(e,r){if(this.isRadio)e.setAttribute("value",r);else if("select-multiple"===e.type){if(r instanceof Array)for(var i=0;i<e.length;i++){var a=e[i];a.selected=r.indexOf(a.value)>-1}}else F(r)!==F(e.value)&&(e.value=null!=r?r:"")}},if:{block:!0,priority:4e3,bind:function t(e){this.marker?!1===this.bound&&this.nested&&this.nested.bind():(this.marker=document.createComment(" tinybind: "+this.type+" "+this.keypath+" "),this.attached=!1,e.parentNode.insertBefore(this.marker,e),e.parentNode.removeChild(e)),this.bound=!0},unbind:function t(){this.nested&&(this.nested.unbind(),this.bound=!1)},routine:function t(e,r){!!r!==this.attached&&(r?(this.nested||(this.nested=new O(e,this.view.models,this.view.options),this.nested.bind()),this.marker.parentNode.insertBefore(e,this.marker.nextSibling),this.attached=!0):(e.parentNode.removeChild(e),this.attached=!1))},update:function t(e){this.nested&&this.nested.update(e)}}};var L={watch:function t(e){return e},not:function t(e){return!e},negate:function t(e){return!e}};function P(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function D(t,e,r){return e&&P(t.prototype,e),r&&P(t,r),t}function j(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf:function t(e){return e.__proto__||Object.getPrototypeOf(e)},N(t)}function z(t,e){return z=Object.setPrototypeOf||function t(e,r){return e.__proto__=r,e},z(t,e)}function I(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function R(t,e,r){return R=I()?Reflect.construct:function t(e,r,i){var a=[null];var n;a.push.apply(a,r);var s=new(Function.bind.apply(e,a));return i&&z(s,i.prototype),s},R.apply(null,arguments)}function B(t){return-1!==Function.toString.call(t).indexOf("[native code]")}function V(t){var e="function"==typeof Map?new Map:void 0;return V=function t(r){if(null===r||!B(r))return r;if("function"!=typeof r)throw new TypeError("Super expression must either be null or a function");if("undefined"!=typeof e){if(e.has(r))return e.get(r);e.set(r,i)}function i(){return R(r,arguments,N(this).constructor)}return i.prototype=Object.create(r.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),z(i,r)},V(t)}var $=function(t){function e(){return t.apply(this,arguments)||this}j(e,t);var r=e.prototype;return r.connectedCallback=function t(){var e=this.constructor.__templateEl.content.cloneNode(!0);this.__tinybindView=h.bind(e,this);while(this.firstChild)this.removeChild(this.firstChild);this.appendChild(e)},r.disconnectedCallback=function t(){this.__tinybindView.unbind()},r.attributeChangedCallback=function t(e,r,i){var a;r!==i&&(this[this.constructor.__propAttributeMap[e]]=i)},D(e,null,[{key:"observedAttributes",get:function t(){var e=this.template;if(!e)throw new Error("No template declared for "+this.name);this.__templateEl=document.createElement("template"),this.__templateEl.innerHTML=e;var r=this.__propAttributeMap={};var i=[];var a=this.properties;return a&&Object.keys(a).forEach((function(t){var e=a[t];var n="string"==typeof e?e:t;r[n]=t,i.push(n)})),i}}]),e}(V(HTMLElement));return h.binders=T,h.formatters=L,h.adapters["."]=x,h.Component=$,h.bind=function(r,i,a){var n={};i=i||{},a=a||{},e.forEach((function(t){n[t]=Object.create(null),a[t]&&Object.keys(a[t]).forEach((function(e){n[t][e]=a[t][e]})),Object.keys(h[t]).forEach((function(e){n[t][e]||(n[t][e]=h[t][e])}))})),t.forEach((function(t){var e=a[t];n[t]=null!=e?e:h[t]})),n.starBinders=Object.keys(n.binders).filter((function(t){return t.indexOf("*")>0})),v.updateOptions(n);var s=new O(r,i,n);return s.bind(),s},h})),Shopify.theme.jsStoreLocator={init(t){if(this.selectors={storesDataContainer:"script#store-locations",filtersDataContainer:"script#store-location-filters",mapContainer:"#Map-"},this.defaults={map:{zoom:6,center:{lat:-40.895021,lng:170.5285246},zoomControl:!0,mapTypeControl:!1,scaleControl:!0,streetViewControl:!1,rotateControl:!1,fullscreenControl:!0},rawDataType:"json",googlePlacesFields:["url"],enableSearch:!0},"undefined"==typeof t){if(!($("[data-section-type='store-locator']").length>0))return;t=$("[data-section-type='store-locator']")}this.container=t,this.sectionId=this.container.attr("data-section-id"),this.mapContainer=document.querySelector(this.selectors.mapContainer+this.sectionId),this.container&&(this.data={parsedData:{},stores:[],groups:[],filters:[],tags:[],activeFilters:[],activeStore:null,activeGroup:null,storesInFilter:[],storesInView:[]},this.methods={focusStore:this._focusStore.bind(this),zoomToFitMarkers:this._zoomToFitMarkers.bind(this),selectGroup:this._focusGroup.bind(this),selectFilter:this._focusFilter.bind(this),clearFilter:this._clearFilters.bind(this),findUser:this._findUser.bind(this)},this._prepareData(),this._bindView(),this._buildMap(),"geolocation"in navigator&&(this.data.geolocationEnabled=!0),this.data.is_ready=!0)},_focusFilter(){var t,e;if(t=event.currentTarget.dataset.filterId,!(e=this.data.filters.find((function(e){return e.id===t}))))return console.error(new Error("No filter found!")),void 0;e.active?this._setActiveFilter(e,"remove"):this._setActiveFilter(e,"add")},_setActiveFilter(t,e,r){var i=this;if(!e)return console.error("An action must be defined"),console.error("action = add, remove, replace, reset"),void 0;switch(this._setActiveStore(!1,!1),e){case"replace":this.data.activeFilters.forEach((function(t){t.active=!1})),this.data.activeFilters=[],t.active=!0,this.data.activeFilters.push(t);break;case"remove":t.active=!1,_.remove(this.data.activeFilters,{id:t.id});break;case"add":t.active=!0,this.data.activeFilters.push(t);break;case"reset":this.data.activeFilters.forEach((function(t){t.active=!1})),this.data.activeFilters=[];break}this.data.stores.forEach((function(t,e){var r=!0;i.data.activeFilters.forEach((function(e){t.tags&&-1!=t.tags.indexOf(e.tag)||(r=!1)})),r?i._addStoreToFilter(t):i._removeStoreFromFilter(t)})),0==i.data.activeFilters.length?this.data.storesAreFiltered=!1:this.data.storesAreFiltered=!0,this._getMarkersInView(),this._toggleFiltersNoResultsMessage()},_toggleFiltersNoResultsMessage(){this.data.storesAreFiltered&&0==this.data.storesInFilter.length?this.data.filterNoResults=!0:this.data.filterNoResults=!1},_clearFilters(){this._setActiveFilter(!1,"reset")},_addStoreToFilter(t){1!=t.in_filter&&(t.in_filter=!0,t.marker.setMap(this.map),t.markerCluster.addMarker(t.marker),t.markerCluster.redraw(),this.data.storesInFilter.push(t))},_removeStoreFromFilter(t){0!=t.in_filter&&(t.in_filter=!1,t.markerCluster.removeMarker(t.marker),t.marker.setMap(null),t.markerCluster.redraw(),_.pull(this.data.storesInFilter,t))},_focusStore(){var t,e;if(t=event.currentTarget.dataset.storeId,!(e=this.data.stores.find((function(e){return e.id===t}))))return console.error(new Error("No store found!")),void 0;if(event.target&&"A"==event.target.nodeName){if(e.active)return;event.preventDefault()}this._setActiveStore(e)},_setActiveStore(t,e){var r=this;var i,a,n,s,o,c;if((n=this.data.activeStore)&&(n.active=!1,n.infoWindow&&n.infoWindow.close()),0==t)return this.data.activeStore=null,void 0;0!=e&&(a=(i=t.marker).getPosition(),c=(s=this.map.getBounds()).contains(a),o=this.map.getZoom(),(!c||o<12)&&(this.map.panTo(a),this.map.setZoom(14))),t.group&&this._setActiveGroup(t.group,!1),this.data.activeStore=t,t.active=!0,!t.place_id||t.place||t.is_loading?r._openStoreInfoWindow(t):this._fetchStoreDetails(t,(function(){r._openStoreInfoWindow(t)}))},_fetchStoreDetails(t,e){var r;function i(t){var e,r,i,a,n,s,o,c,h,l,u,d,p,f;return e=[],r=["mon","tues","wed","thurs","fri","sat","sun"],t.forEach((function(t){function v(t){$.extend(this,t)}i=t.open.day,a=r[i],s=t.open.hours<12?"am":"pm",o=t.open.hours<12?t.open.hours:t.open.hours-12,c=t.open.minutes?":"+t.open.minutes:"",h=o+c+s,l=t.close.hours<12?"am":"pm",u=t.close.hours<12?t.close.hours:t.close.hours-12,d=t.close.minutes?":"+t.close.minutes:"",f=h+" - "+(p=u+d+l),n=a,e.push(new v({startDay:a,endDay:a,daysString:n,timesString:f,open:h,close:p}))})),e.forEach((function(t,r){var i;(i=e[r+1])&&t.timesString==i.timesString&&(i.startDay=t.startDay,i.daysString=i.startDay+" - "+i.endDay,t.toDelete=!0)})),e.filter((function(t){return 1!=t.toDelete}))}t.is_loading=!0,r={placeId:t.place_id,fields:this.defaults.googlePlacesFields},this.placesService.getDetails(r,(function(r,i){i===google.maps.places.PlacesServiceStatus.OK?(t.place=r,t.google_url=r.url,t.is_loading=!1,e&&"function"==typeof e&&e()):(console.error(new Error("Error receiving data from Places service")),e&&"function"==typeof e&&e())}))},_getTemplate(t){return $('[data-template-for="'+t+'"]').html()},_openStoreInfoWindow(t){var e=this;var r;r=t.marker,t.infoWindow||(t.infoWindowContent=document.createElement("div"),t.infoWindowContent.innerHTML=e._getTemplate("store-location-info-popup"),tinybind.bind(t.infoWindowContent,{store:t}),t.infoWindow=new google.maps.InfoWindow({content:t.infoWindowContent})),t.infoWindow.open(e.map,t.marker)},_focusGroup(){var t,e;return""==(t=event.currentTarget.value)||"none"==t?(this._setActiveGroup(!1),void 0):(e=this.data.groups.find((function(e){return e.id===t})))?(this._setActiveGroup(e),void 0):(console.error(new Error("No group found!")),void 0)},_setActiveGroup(t,e){var r=this;var i,a,n,s;if((s=this.data.activeGroup)&&(s.active=!1),0==t)return this.data.activeGroup=null,this._zoomToFitMarkers(),this._setActiveStore(!1,!1),void 0;this.data.activeGroup=t,t.active=!0,0!=e&&(this._setActiveStore(!1,!1),t.markers.length>1?(bounds=new google.maps.LatLngBounds,t.markers.forEach((function(t,e){bounds.extend(t.getPosition())})),r.map.fitBounds(bounds)):(n=t.markers[0].getPosition(),this.map.panTo(n),this.map.setZoom(14)))},_prepareData(){var t=this;function e(){t._prepareStoresData(),t._prepareStoresTagsData(),t._prepareGroupsData(),t._prepareFiltersData()}this._getData(e)},_getData(t){var e,r,i,a,n;if(e=document.querySelector(this.selectors.storesDataContainer),n=this.defaults.rawDataType,!e)return console.error(new Error("Missing data container")),void 0;switch(r=e.innerHTML,n){case"json":return this.data.parsedData.data=JSON.parse(r),t(),void 0;case"csv":return a={header:!0,dynamicTyping:!0},this.data.parsedData=Papa.parse(r,a),t(),void 0;default:return this.data.parsedData.data=r,t(),void 0}},_handleize(t){return t.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g,"-").replace(/^-+|-+$/g,"")},_prepareStoresData(){var t=this;var e,r;function i(i){$.extend(this,i),this.id=t._handleize(this.title),this.icon=e,this.google_url=r+t._handleize(this.title).replace(/\-/g,"+")+"+"+t._handleize(this.street).replace(/\-/g,"+"),this.opening_hours=this.opening_hours.split(/,/).map((function(t){return t.replace(/:/,"#").split(/#/).map((function(t){return t.trim()}))}))}if(e='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5    c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021    C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333    s85.333,38.281,85.333,85.333C341.333,217.719,303.052,256,256,256z"/></svg>',r="https://www.google.com/maps/search/",t.data.parsedData.errors&&t.data.parsedData.errors.length>0)return console.error(new Error("There was an error parsing data")),console.error(data.parsedData.errors),void 0;t.data.parsedData.data.forEach((function(e){var r,a,n;r=new i(e),t.data.stores.push(r)})),t.data.stores=t.data.stores.sort((function(t,e){return t.title.localeCompare(e.title)}))},_prepareStoresTagsData(){var t=this;function e(e){$.extend(this,e),this.id=t._handleize(this.title)}this.data.stores.forEach((function(r,i){var a,n,s;r.tags&&"string"==typeof r.tags&&(s=r.tags.split(","),r.tags=[],s.forEach((function(i){i=t._handleize(i),(a=t.data.tags.find((function(t){return t.title==i})))?tag=a:(tag=new e({title:i}),t.data.tags.push(tag)),r.tags.push(tag)})))}))},_prepareGroupsData(){var t=this;function e(e){$.extend(this,e),this.id=t._handleize(this.title)}this.data.stores.forEach((function(r,i){var a,n;r.group&&"string"==typeof r.group&&((n=t.data.groups.find((function(t){return t.title===r.group})))?group=n:(a={title:r.group},group=new e(a),t.data.groups.push(group),group.stores=[]),r.group=group,group.stores.push(r))}))},_prepareFiltersData(){var t=this;var e,r,i;if(!(e=document.querySelector(this.selectors.filtersDataContainer)))return console.error(new Error("Missing data container")),void 0;function a(e){$.extend(this,e),this.id=t._handleize(this.title)}r=e.innerHTML,(i=JSON.parse(r)).forEach((function(e){var r,i;e.tag=t.data.tags.find((function(t){return t.title===e.tag})),e.tag&&(e.tag.icon=e.icon),r=new a(e),t.data.filters.push(r)}))},_bindView(){tinybind.bind(this.container,{data:this.data,methods:this.methods})},_buildMap(){var t=this;var e,r,i;e="https://maps.googleapis.com/maps/api/js?key=",r="undefined"==typeof(r=this.container.data("maps-key"))||null==r?"":r,i="&libraries=places";var a=this.defaults.map;function n(){t.geocoder=new google.maps.Geocoder,t.map=new google.maps.Map(t.mapContainer,a),t.placesService=new google.maps.places.PlacesService(t.map),t._addMapMarkers(),t.defaults.enableSearch&&t._prepareSearch()}t._loadJS(e+r+i,n)},_addMapMarkers(){var t=this;this.data.stores.forEach((function(e,r){var i,a;i={lat:e.lat,lng:e.long},a=e.icon,e.marker=new google.maps.Marker({position:i,map:t.map,icon:{url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(a),size:new google.maps.Size(28,40),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(14,40),scaledSize:new google.maps.Size(28,40)},optimized:!1}),e.group&&(e.group.markers=e.group.markers||[],e.group.markers.push(e.marker)),e.marker.addListener("click",(function(){t._setActiveStore(e)}))})),this._clusterMarkers(),this._zoomToFitMarkers(),this._bindMapListners()},_clusterMarkers(){var t=this;var e=t._getTemplate("store-location-marker-icon");this.data.groups.forEach((function(r,i){var a=[{width:28,height:40,url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(e),textColor:"transparent",textSize:0,iconAnchor:[50,100]}];r.markerCluster=new MarkerClusterer(t.map,r.markers,{gridSize:30,styles:a,zoomOnClick:!0}),r.stores.forEach((function(t){t.markerCluster=r.markerCluster}))}))},_zoomToFitMarkers(){var t=new google.maps.LatLngBounds;this.data.stores.forEach((function(e,r){t.extend(e.marker.getPosition())})),this.map.fitBounds(t)},_bindMapListners(){var t=this;this.map.addListener("bounds_changed",t._debounce(this._getMarkersInView.bind(t),50))},_debounce(t,e,r){var i,a;return function(){var n=this,s=arguments;var o=function(){i=null,r||(a=t.apply(n,s))};var c=r&&!i;return clearTimeout(i),i=setTimeout(o,e),c&&(a=t.apply(n,s)),a}},_unbindMapListners(){var t=this;google.maps.event.clearListeners(this.map,"bounds_changed")},_getMarkersInView(){var t=this;this.data.storesInView=[],this.data.storesInActiveGroup=[];var e=this.map.getBounds();if(this.data.stores.forEach((function(r,i){var a,n;a=r.marker.getPosition(),(n=e.contains(a))&&(!t.data.storesAreFiltered||t.data.storesAreFiltered&&r.in_filter)?(r.in_view=!0,t.data.storesInView.push(r)):r.in_view=!1,r.group==t.data.activeGroup?(r.in_active_group=!0,t.data.storesInActiveGroup.push(r)):r.in_active_group=!1})),this.data.storesInView&&1==this.data.storesInView.length){var r=this.data.storesInView[0];r!=t.data.activeStore&&this._setActiveStore(r,!1)}},_findUser(){var t=this;function e(e){var r;r={lat:e.coords.latitude,long:e.coords.longitude},userLocation=new google.maps.LatLng(r.lat,r.long),t._updateUserMarker(userLocation),t._findClosestStore(userLocation),t.data.geolocationLoading=!1}function r(){t.data.geolocationLoading=!1,t.data.geolocationEnabled=!1,iziToast.error({title:"We couldn't find your location",position:"bottomCenter",theme:"light"})}this.data.geolocationLoading=!0,navigator.geolocation.getCurrentPosition(e,r)},_findClosestStore(t){var e=this;var r,i,a;function n(t){var r=t.lat();var i=t.lng();var a=6371;var n=[];var s=-1;var o=null;function c(t){return t*Math.PI/180}return e.data.stores.forEach((function(t,e){var h=t.lat;var l=t.long;var u=c(h-r);var d=c(l-i);var p=Math.sin(u/2)*Math.sin(u/2)+Math.cos(c(r))*Math.cos(c(r))*Math.sin(d/2)*Math.sin(d/2);var f=2*Math.atan2(Math.sqrt(p),Math.sqrt(1-p));var v=a*f;n[e]=v,(-1==s||v<n[s])&&(s=e,o=t)})),o}i=new google.maps.LatLngBounds,r=n(t),e._setActiveStore(r,!1),i.extend(r.marker.getPosition()),i.extend(t),e.map.fitBounds(i)},_updateUserMarker(t){var e=this;var r,i,a,n;if(!t)return console.error(new Error("latLng must be defined")),void 0;function s(t){$.extend(this,t)}this.data.user||(n=e._getTemplate("user-location-marker-icon"),this.data.user=new s({icon:n})),(a=this.data.user).latLng=t,a.marker?a.marker.setPosition(a.latLng):(i=a.icon,a.marker=new google.maps.Marker({position:a.latLng,map:e.map,icon:{url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(i),size:new google.maps.Size(24,24),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(12,12),scaledSize:new google.maps.Size(24,24)},optimized:!1}))},_prepareSearch(){this.data.searchEnabled=!0;var t=this;var e;e=document.getElementById("store-locator-search"),this.autocomplete=new google.maps.places.Autocomplete(e),this.autocomplete.addListener("place_changed",(function(){var e;if(!(e=t.autocomplete.getPlace()).geometry)return iziToast.error({title:"We couldn't find this location",position:"bottomCenter",theme:"light"}),void 0;t._findClosestStore(e.geometry.location),t._updateSearchMarker(e.geometry.location)}))},_updateSearchMarker(t){var e=this;var r,i,a;if(!t)return console.error(new Error("latLng must be defined")),void 0;function n(t){$.extend(this,t)}this.data.search||(a=e._getTemplate("search-location-marker-icon"),this.data.search=new n({icon:a})),search=this.data.search,search.latLng=t,search.marker?search.marker.setPosition(search.latLng):(i=search.icon,search.marker=new google.maps.Marker({position:search.latLng,map:e.map,icon:{url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(i),size:new google.maps.Size(24,24),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(12,12),scaledSize:new google.maps.Size(24,24)},optimized:!1}))},_loadJS(t,e){"use strict";var r=document.getElementsByTagName("script")[0];var i=document.createElement("script");return i.src=t,i.async=!0,r.parentNode.insertBefore(i,r),e&&"function"==typeof e&&(i.onload=e),i}},Shopify.theme.jsStoreLocator.init();
//# sourceMappingURL=/s/files/1/0576/7902/0209/t/53/assets/z__jsStoreLocator.js.map?v=3095748296977169922