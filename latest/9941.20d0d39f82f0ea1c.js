(self.webpackChunkrest_tester=self.webpackChunkrest_tester||[]).push([[9941],{9941:(R,m,n)=>{n.r(m),n.d(m,{RestModule:()=>i,RestStoreProvider:()=>y,SourceHandler:()=>s});var P=n(7863),r=n(7138);class M{getConfiguration(){return{plugin:{id:"RestPlugin","display-name":"A plugin for entities managed through Rest APIs .",version:"1.0.0"},"schema-updates":[{id:"rest-source",description:"Add rest type of source",changes:[{location:{parent:"#/$defs/source",id:"type"},update:{enum:["Rest"]},props:{url:{type:"string"}},replace:!1}]}],"global-handlers":[{location:{parent:r.DontCodeModel.ROOT+"/sources",id:"type",values:["Rest"]},class:{name:"SourceHandler",source:"rest"}}]}}pluginInit(e){}}var S=n(7401),v=n(6602),h=n(7237),p=n(8016);class y extends r.AbstractDontCodeStoreProvider{constructor(e){super(),this.http=e,this.modelMgr=r.dtcde.getModelManager()}deleteEntity(e,d){return Promise.resolve(!1)}loadEntity(e,d){const u=this.modelMgr.findAtPosition(e,!1);if(null===u)return Promise.reject("No entity found at position "+e);const l=this.modelMgr.findTargetOfProperty(r.DontCodeModel.APP_ENTITIES_FROM_NODE,e)?.value;let g=l.url;if(null!=d)try{const t=new URL(l.url);t.pathname=t.pathname+"/"+d,g=t.toString()}catch{return console.error("The url for loading the entity is incorrect",l.url),Promise.reject("The url for loading the entity is incorrect:"+l.url)}const o=this.http.get(g,{observe:"body",responseType:"json"}).pipe((0,p.map)(t=>{if(Array.isArray(t))throw new Error("When loading an entity, the returned value should be one element");return t}),(0,p.map)(t=>(r.StoreProviderHelper.cleanUpLoadedData([t],r.StoreProviderHelper.findSpecialFields(e,u)),t)));return(0,h.lastValueFrom)(o)}searchEntities(e,...d){const u=this.modelMgr.findAtPosition(e,!1);if(null===u)return(0,h.throwError)(()=>new Error("No entity found at position "+e));const l=r.StoreProviderHelper.findSpecialFields(e,u),g=this.modelMgr.findTargetOfProperty(r.DontCodeModel.APP_ENTITIES_FROM_NODE,e)?.value;return this.http.get(g.url,{observe:"body",responseType:"json"}).pipe((0,p.map)(o=>{let t=[];if(Array.isArray(o))t=o;else{let f;for(f in o)Array.isArray(o[f])&&(t=o[f])}return r.StoreProviderHelper.applyFilters(t,...d)}),(0,p.map)(o=>(r.StoreProviderHelper.cleanUpLoadedData(o,l),o)))}storeEntity(e,d){return Promise.reject("RestStoreProvider cannot store elements")}canStoreDocument(e){return!1}storeDocuments(e,d){return(0,h.throwError)(()=>new Error("Document storage is unsupported."))}}var a=n(549);class s extends S.AbstractPluginHandler{constructor(e){super(),this.httpClient=e,this.storeMgr=r.dtcde.getStoreManager(),this.modelMgr=r.dtcde.getModelManager(),this.storeMgr.setProviderForSourceType(new y(this.httpClient),"Rest")}handleChange(e){r.StoreProviderHelper.clearConfigCache()}}s.\u0275fac=function(e){return new(e||s)(a.\u0275\u0275inject(v.HttpClient))},s.\u0275prov=a.\u0275\u0275defineInjectable({token:s,factory:s.\u0275fac,providedIn:"root"});class i{constructor(){console.log("Rest Plugin registering"),r.dtcde.registerPlugin(new M)}exposedPreviewHandlers(){return new Map([["SourceHandler",s]])}}i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=a.\u0275\u0275defineNgModule({type:i,id:"dontcode-plugin/rest"}),i.\u0275inj=a.\u0275\u0275defineInjector({imports:[P.CommonModule]}),a.\u0275\u0275registerNgModuleType(i,"dontcode-plugin/rest")}}]);