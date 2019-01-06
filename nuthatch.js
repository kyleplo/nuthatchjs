// Init
var nthtch, nuthatch;
// Classes do not get elevated, must declare here
class NuthatchEvent {
 constructor (e,t,n,m){
  this.nativeEvent = e;
  this.target = t;
  this.type = n;
  this.eventType = m;
 }
 preventDefault (){
  this.e.preventDefault();
 }
}
class NuthatchElement {
 constructor (e,a,i,s){
  this.type = e;
  this.attributes = a || {};
  this.innerHTML = i || "";
  this.styles = s || {};
  this.id = (Math.random().toString(36).slice(2,10));
  this.events = {};
 }
 getAttribute (a){
  return this.attributes[a];
 }
 setAttribute (a,v) {
  this.attributes[a] = v;
 }
 on (e,h,i){
  if(i){
   if(this.events[e]){
    this.events[e](h);
   }
  }else{
   this.events[e] = h;
  }
 }
}
class NuthatchIndiv extends NuthatchElement {
 constructor (e,a,i,s,v){
  super(e,a,i,s);
  this.id += (Math.random().toString(36).slice(2,10));
 }
}
nthtch.createListeners = (m) => {
 document.addEventListener(m,(e) => {
  var t = e.target;
  while(t.tagName !== "HTML"){
   if(t.getAttribute("nuthatch").length > 0){
    nthtch.log(m + " event on " + t.getAttribute("nuthatch"));
    if(nuthatch[t.getAttribute("nuthatch")]){
     nuthatch[t.getAttribute("nuthatch")].on(m,new NuthatchEvent(e,t,t.getAttribute("nuthatch"),true));
    }else{
     nthtch.log(t.getAttribute("nuthatch") + ' is not registered! Make sure you have called nuthatch.register("' + t.getAttribute("nuthatch") + '") before letting the user interact with these elements.',"error");
    }
   };
   t = t.parentElement;
  };
 });
}
// On load event, set up stuff
window.addEventListener("load",() => {
 nthtch.dev = (location.search.indexOf("nuthatchdevmode=true") > -1);
 nthtch.log = (a,b,c) => {
  if(nthtch.dev){
   console.[b || "log"](a,c);
  };
 };
 // Set up main listeners
 nthtch.createListeners("click");
 nthtch.createListeners("mouseup");
 nthtch.createListeners("mousedown");
 nthtch.createListeners("mousemove");
 nthtch.createListeners("keyup");
 nthtch.createListeners("keydown");
 nthtch.createListeners("contextmenu");
});
// Set up main functions
nuthatch.register = function (e,a,b,c){
 var innerHTML = (typeof b === "string" ? b : (typeof c === "string" ? c : ""));
 var styles = (b === innerHTML ? (!!c ? c : {}) : (!!b ? b : {}));
 var newelem = new NuthatchElement(e,a,innerHTML,styles);
 nuthatch[e] = newelem;
 return newelem.id;
}
nuthatch.assign = function (e,n,s){
 if(!nuthatch[n]){
  nthtch.log(n + " cannot be assigned, it does not exist. Make sure you call nuthatch.assign after nuthatch.register","error");
  return false;
 };
 e.setAttribute("nuthatch",n);
 e.innerHTML = nuthatch[n].innerHTML;
 var styles = nuthatch[n].styles;
 for(var i = 0;i < Object.keys(styles).length;i++){
  var style = styles[Object.keys(styles)[i]];
  e.style[Object.keys(styles)[i]] = style;
 };
 var attrs = nuthatch[n].attributes;
 for(var i = 0;i < Object.keys(attrs).length;i++){
  var attr = attrs[Object.keys(attrs)[i]];
  e.style[Object.keys(attrs)[i]] = attr;
 };
 var n = new NuthatchIndiv(n,nuthatch[n].attributes,nuthatch[n].innerHTML,nuthatch[n].styles);
 return n.iid;
}
nuthatch.define = function (e,n,a,b,c){
 nuthatch.register(n,a,b,c);
 return nuthatch.assign(e,n);
}
