var ne=Object.defineProperty;var $=Object.getOwnPropertySymbols;var se=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable;var w=(o,r,l)=>r in o?ne(o,r,{enumerable:!0,configurable:!0,writable:!0,value:l}):o[r]=l,h=(o,r)=>{for(var l in r||(r={}))se.call(r,l)&&w(o,l,r[l]);if($)for(var l of $(r))ie.call(r,l)&&w(o,l,r[l]);return o};(function(){"use strict";var o={data:function(){return{isLoading:!1,replaceKirbyLangs:!0,translationStatuses:[],deletable:!1,revertable:!1,isInHeader:!1,showLoader:!1,compactMode:!1,label:null,contentID:null}},async created(){await this.reload()},computed:{apiUrl(){var a,t,n;let e=(n=(t=(a=this.$view)==null?void 0:a.props)==null?void 0:t.model)==null?void 0:n.link;return e&&e!=""?""+e+"/translations-info":"plugin-translations/load-header"}},methods:{reload(){this.isLoading=!0,this.name;let e=this;this.load().then(function(a){e.onLoad(a)}).catch(a=>{console.log("ERROR! on loading translations =",a,", component = ",e)}).finally(()=>{this.isLoading=!1})},onLoad(e){var a,t;((t=(a=e.options)==null?void 0:a.header)==null?void 0:t.replaceKirbyLanguages)>=0&&(this.replaceKirbyLangs=e.options.header.replaceKirbyLanguages),e.translations&&(this.translationStatuses=e.translations),e.deletable&&(console.log("deletable=",e.deletable,this),this.deletable=e.deletable),e.revertable&&(this.revertable=e.revertable),e.compactMode&&(this.compactMode=e.compactMode),e.label&&(this.label=e.label),e.id&&(this.contentID=e.id)},getTranslationsProviderPropsBinding(){return{translationStatuses:this.translationStatuses,isInHeader:this.isInHeader,showLoader:this.showLoader,isLoading:this.isLoading,replaceKirbyLangs:this.replaceKirbyLangs,deletable:this.deletable,revertable:this.revertable,label:this.label}}}},r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"k-translations-section"},[e.label?t("h2",[e._v(e._s(e.label))]):e._e(),t("k-translations",e._b({ref:"translations",scopedSlots:e._u([{key:"extrabuttons",fn:function(n){return[t("k-button",{staticClass:"k-translations-button",attrs:{text:"Revert "+n.actualLanguage.name,icon:"refresh",theme:"warning"},on:{click:function(s){return s.stopPropagation(),e.$refs.translations.revertTranslationOpen(n.actualLanguage)}}}),t("k-button",{staticClass:"k-translations-button",attrs:{text:"Delete "+n.actualLanguage.name,icon:"trash",theme:"negative"},on:{click:function(s){return s.stopPropagation(),e.$refs.translations.deleteTranslationOpen(n.actualLanguage)}}})]}}])},"k-translations",e.getTranslationsProviderPropsBinding(),!1))],1)},l=[],re="";function c(e,a,t,n,s,d,k,ee){var i=typeof e=="function"?e.options:e;a&&(i.render=a,i.staticRenderFns=t,i._compiled=!0),n&&(i.functional=!0),d&&(i._scopeId="data-v-"+d);var g;if(k?(g=function(u){u=u||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!u&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(u=__VUE_SSR_CONTEXT__),s&&s.call(this,u),u&&u._registeredComponents&&u._registeredComponents.add(k)},i._ssrRegister=g):s&&(g=ee?function(){s.call(this,(i.functional?this.parent:this).$root.$options.shadowRoot)}:s),g)if(i.functional){i._injectStyles=g;var te=i.render;i.render=function(ae,L){return g.call(L),te(ae,L)}}else{var b=i.beforeCreate;i.beforeCreate=b?[].concat(b,g):[g]}return{exports:e,options:i}}const T=h({},o),C={data:function(){return{deletable:!0,revertable:!0}},mixins:[T],created(){}},f={};var y=c(C,r,l,!1,M,null,null,null);function M(e){for(let a in f)this[a]=f[a]}var x=function(){return y.exports}(),S=function(){var e=this,a=e.$createElement,t=e._self._c||a;return e.hasMenu?t("k-dropdown",{key:e.language.code},[t("k-button",{ref:"translations-button-"+e.language.code,class:e.getLangButtonClasses(),attrs:{"data-langcode":e.language.code,icon:e.language.icon,theme:e.language.theme,responsive:e.hasMenu,click:e.languageClick}},[t("span",{staticClass:"longname"},[e._v(e._s(e.language.name))]),t("span",{staticClass:"shortname"},[e._v(e._s(e.language.code))]),e.hasMenu?t("span",{staticClass:"k-translations-menu-icon-link",on:{click:function(n){return n.stopPropagation(),e.toggleMenu.apply(null,arguments)}}},[t("k-icon",{staticClass:"k-translations-menu-icon",attrs:{type:"angle-down"}})],1):e._e()]),e.hasMenu?t("k-dropdown-content",{ref:"menu-toggle-"+e.language.code,staticClass:"k-translations-options",attrs:{"data-theme":"light"}},[t("k-button",{staticClass:"k-dropdown-item k-translations-menu-title k-translations-button no-focus",attrs:{icon:"globe",disabled:!0},on:{click:function(n){n.stopPropagation()}}},[t("h3",[e._v(e._s(e.language.name)+" ("+e._s(e.language.code)+") "),e.language.default?t("span",{staticClass:"k-translations-tag"},[e._v(e._s(e.$t("daandelange.translations.default")))]):e._e(),e.language.isCurrent?t("span",{staticClass:"k-translations-tag"},[e._v(e._s(e.$t("daandelange.translations.current")))]):e._e()])]),e.menuItems&&e.menuItems.length>0?t("hr"):e._e(),e._l(e.menuItems,function(n){return[t("k-dropdown-item",{staticClass:"k-translations-button",attrs:{click:function(){n.click&&n.click()},icon:n.icon,link:n.link,target:n.target,theme:n.theme,disabled:!(n.link||n.click),focus:function(){}}},[e._v(" "+e._s(n.text)+" ")])]}),e.language.isDeleteable||e.language.isRevertable?t("hr"):e._e(),e.language.isDeleteable?t("k-dropdown-item",{staticClass:"k-translations-button",attrs:{icon:"trash",theme:"warning"},on:{click:function(n){return n.stopPropagation(),e.deleteTranslation()}}},[e._v(" "+e._s(e.$t("delete"))+" "+e._s(e.language.code.toUpperCase())+" ")]):e._e(),e.language.isRevertable?t("k-dropdown-item",{staticClass:"k-translations-button",attrs:{icon:"refresh",theme:"negative"},on:{click:function(n){return n.stopPropagation(),e.revertTranslation()}}},[e._v(" "+e._s(e.$t("revert"))+" "+e._s(e.language.code.toUpperCase())+" ")]):e._e()],2):e._e()],1):t("k-button",{key:e.language.code,class:e.getLangButtonClasses(),attrs:{"data-langcode":e.language.code,icon:e.computedLanguage.icon,theme:e.language.theme,responsive:e.hasMenu,click:e.languageClick}},[t("span",{staticClass:"longname"},[e._v(e._s(e.language.name))]),t("span",{staticClass:"shortname"},[e._v(e._s(e.language.code))])])},P=[],le="";const R={name:"k-translations-button",props:{language:{type:Array|Object,required:!0},allowMenu:{type:Boolean,default:!1}},computed:{hasMenu(){return this.allowMenu},menuItems(){var a,t,n,s,d;let e=[];return this.language.isCurrent||e.push({icon:"edit",text:"Switch to "+this.language.name,click:()=>this.languageClick(this.language)}),((a=this.$permissions.pages)==null?void 0:a.preview)&&((n=(t=this.$view.props)==null?void 0:t.model)==null?void 0:n.previewUrl)&&e.push({icon:"preview",text:"Visit this page in "+this.language.name,link:(d=(s=this.$view.props)==null?void 0:s.model)==null?void 0:d.previewUrl,target:"_blank"}),e.push({icon:"cog",text:"Edit language in panel",link:"languages?language="+this.$translation.code}),e.push({icon:"document",text:"Status: "+(this.language.isTranslated===!0?"Translated":this.language.isTranslated===!1?"Not translated":"Unknown"),theme:this.language.isTranslated===!0?"positive":this.language.isTranslated===!1?"negative":"unknown"}),e},computedLanguage(){return this.language}},methods:{getLangButtonClasses(e={}){var a,t;return this.language?h({"k-translations-default":this.language.default,"k-translations-active":(a=this.language.isCurrent)!=null?a:!1,"k-translations-button":!0,["k-translations-button-"+this.language.code]:((t=this.language.code)==null?void 0:t.length)>0,"k-translations-button-compact":this.allowMenu},e):e},toggleMenu(){var e;return this.hasMenu&&((e=this.$refs["menu-toggle-"+this.language.code])==null||e.toggle()),!1},closeMenu(){var e;this.hasMenu&&((e=this.$refs["menu-toggle-"+this.language.code])==null||e.close())},revertTranslation(){this.$emit("revertLanguage",this.language)},deleteTranslation(){this.$emit("deleteLanguage",this.language)},languageClick(){this.language.isCurrent?this.hasMenu&&this.toggleMenu():this.$emit("changeLanguage",this.language)}}},_={};var B=c(R,S,P,!1,U,null,null,null);function U(e){for(let a in _)this[a]=_[a]}var D=function(){return B.exports}(),I=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{class:{"k-translations":!0,"k-translations-header":e.isInHeader,"k-button-group":e.isInHeader}},[e.isInHeader?e._e():e._t("above",null,{defaultLanguage:e.formattedDefaultLanguage,actualLanguage:e.formattedActualLanguage,allLanguages:e.allLanguages,alternativeLanguages:e.alternativeLanguages}),e.isLoading&&e.showLoader?t("button",{staticClass:"k-button k-translations-loader"},[t("k-loader",{staticClass:"k-translations-loader-icon"}),t("span",{staticClass:"k-button-text"},[e._v(e._s(e.$t("daandelange.translations.loading")))])],1):e.replaceKirbyLangs?t("k-button-group",{staticClass:"k-translations-buttons"},[e._l(e.allLanguages,function(n){return e.allLanguages?t("k-translations-button",{key:"btn-"+n.code,attrs:{language:n,allowMenu:e.allowMenus||e.isInHeader},on:{changeLanguage:function(s){return e.change(n)},deleteLanguage:function(s){return e.deleteTranslationOpen(n)},revertLanguage:function(s){return e.revertTranslationOpen(n)}}}):e._e()}),e._t("extrabuttons",null,{defaultLanguage:e.formattedDefaultLanguage,actualLanguage:e.formattedActualLanguage,allLanguages:e.allLanguages,alternativeLanguages:e.alternativeLanguages})],2):t("k-original-languages-dropdown"),e.$scopedSlots.below&&!e.isInHeader?t("div",{staticClass:"k-translations-below"},[e._t("below",null,{defaultLanguage:e.formattedDefaultLanguage,actualLanguage:e.formattedActualLanguage,allLanguages:e.allLanguages,alternativeLanguages:e.alternativeLanguages})],2):e._e(),t("k-dialog",{ref:"deleteDialog",attrs:{button:e.$t("delete"),theme:"negative",icon:"trash"},on:{submit:function(n){return e.deleteTranslationSubmit(e.language)}}},[t("k-text",{domProps:{innerHTML:e._s(e.$t("daandelange.translations.delete.confirm",{code:e.language.code.toUpperCase()}))}})],1),t("k-dialog",{ref:"revertDialog",attrs:{button:e.$t("revert"),theme:"negative",icon:"refresh"},on:{submit:function(n){return e.revertTranslationSubmit(e.language)}}},[t("k-text",{domProps:{innerHTML:e._s(e.$t("daandelange.translations.revert.confirm",{code:e.language.code.toUpperCase()}))}})],1)],2)},H=[],oe="";const O={extends:"k-languages-dropdown",components:{"k-translations-button":D},props:{allowMenus:{type:Boolean,default:!1},isInHeader:{type:Boolean,default:!1},showLoader:{type:Boolean,default:!1},isLoading:{type:Boolean,default:!1},replaceKirbyLangs:{type:Boolean,default:!1},deletable:{type:Boolean,default:!1},revertable:{type:Boolean,default:!1},translationStatuses:{type:Array,default:function(){return[]}}},computed:{alternativeLanguages(){var e;return this.formatLanguages(this.sortLanguages((e=this.languages)!=null?e:[]))},allLanguages(){var e;return this.formatLanguages([this.defaultLanguage,...this.sortLanguages((e=this.languages)!=null?e:[])])},formattedDefaultLanguage(){return this.formatLanguages([this.defaultLanguage],!0)},formattedActualLanguage(){return this.formatLanguages([this.language],!0)},hasFiber(){return window.panel&&window.panel.$languages},canDelete(){return this.deletable},canRevert(){return this.revertable},compactModeEnabled(){return this.compactmode},modelUrl(){var a,t,n;let e=(n=(t=(a=this.$view)==null?void 0:a.props)==null?void 0:t.model)==null?void 0:n.link;return e&&e!=""?""+e+"":null}},methods:{sortLanguages(e){return e.sort((a,t)=>a.default?-999:t.default?1:a.name<t.name?-1:a.name>t.name?1:0)},languageIsTranslated(e){var a;return e.default?!0:!this.translationStatuses||!(this.translationStatuses.length>0)?null:(a=this.translationStatuses)==null?void 0:a.some(t=>t.code===e.code&&t.file)},formatLanguages(e,a=!1){if(e&&e.length){for(let t=0;t<e.length;t++)if(e[t].isTranslated=this.languageIsTranslated(e[t]),e[t].isTranslated===!0?(e[t].icon="toggle-on",e[t].theme="positive"):e[t].isTranslated===!1?(e[t].icon="toggle-off",e[t].theme="negative"):(e[t].icon="globe",e[t].theme="unknown"),e[t].isCurrent=this.language.code===e[t].code,e[t].isDeleteable=this.canDelete&&!e[t].default&&e[t].isTranslated,e[t].isRevertable=this.canRevert&&!e[t].default,a)return e[t];return e}return a?null:[]},deleteTranslationOpen(e){var a;(a=this.$refs.deleteDialog)==null||a.open(e)},deleteTranslationSubmit(e){this.$api.post("plugin-translations/delete",{id:this.modelUrl,languageCode:e.code}).then(a=>{this.$refs.deleteDialog.close(),a.code===200?(this.$store.dispatch("notification/success",a.text),this.change(this.defaultLanguage)):this.$store.dispatch("notification/error",a.text)}).catch(a=>{this.$store.dispatch("notification/error",a)})},revertTranslationOpen(e){var a;(a=this.$refs.revertDialog)==null||a.open(e)},revertTranslationSubmit(e){this.$api.post("plugin-translations/revert",{id:this.modelUrl,languageCode:e.code}).then(a=>{this.$refs.revertDialog.close(),a.code===200?(this.$store.dispatch("notification/success",a.text),this.change(a.code),this.hasFiber&&this.$go(this.$view.path)):this.$store.dispatch("notification/error",a.text)}).catch(a=>{this.$store.dispatch("notification/error",a)}),this.hasFiber||this.$router.go()}}},v={};var F=c(O,I,H,!1,E,null,null,null);function E(e){for(let a in v)this[a]=v[a]}var K=function(){return F.exports}(),A=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("k-translations",e._b({},"k-translations",e.getTranslationsProviderPropsBinding(),!1))},j=[],ue="";const N={mixins:[h({},o)],name:"k-languages-dropdown",data:function(){return{replaceKirbyLangs:!0,isInHeader:!0,showLoader:!0,deletable:!0,revertable:!0}},props:{devInfo:{type:String,default:`Warning: I'm not the default k-languages-dropdown.
 I have been replaced by a k-translations-dropdown !`}},methods:{load(){return this.$api.get(this.apiUrl)}}},p={};var V=c(N,A,j,!1,W,null,null,null);function W(e){for(let a in p)this[a]=p[a]}var X=function(){return V.exports}(),q=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"k-translations-field"},[e.label?t("h2",[e._v(e._s(e.label))]):e._e(),t("k-translations",e._b({ref:"translations",scopedSlots:e._u([{key:"extrabuttons",fn:function(n){return[t("k-button",{staticClass:"k-translations-button",attrs:{text:"Revert "+n.actualLanguage.name,icon:"refresh",theme:"warning"},on:{click:function(s){return s.stopPropagation(),e.$refs.translations.revertTranslationOpen(n.actualLanguage)}}}),t("k-button",{staticClass:"k-translations-button",attrs:{text:"Delete "+n.actualLanguage.name,icon:"trash",theme:"negative"},on:{click:function(s){return s.stopPropagation(),e.$refs.translations.deleteTranslationOpen(n.actualLanguage)}}})]}}])},"k-translations",e.getTranslationsProviderPropsBinding(),!1))],1)},z=[],ce="";const G=h({},o),J={name:"k-translations-field",mixins:[G]},m={};var Q=c(J,q,z,!1,Y,null,null,null);function Y(e){for(let a in m)this[a]=m[a]}var Z=function(){return Q.exports}();panel.plugin("daandelange/translations",{components:{"k-original-languages-dropdown":{extends:"k-languages-dropdown"},"k-translations":K,"k-languages-dropdown":X,"k-button-link":{extends:"k-button-link",methods:{focus:function(){this.$el.focus()}}}},sections:{translations:x},fields:[Z]})})();
