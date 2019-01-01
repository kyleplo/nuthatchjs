// Init
var nthtch;
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
nthtch.createListeners = (m) => {
 document.addEventListener(m,(e) => {
  var t = e.target;
  while(t.tagName !== "HTML"){
   if(t.getAttribute("nuthatch").length > 0){
    nthtch.log(m + " event on " + t.getAttribute("nuthatch"));
    if(nuthatch[t.getAttribute("nuthatch")]){
     nuthatch[t.getAttribute("nuthatch")].on(m,new NuthatchEvent(e,t,t.getAttribute("nuthatch"),m););
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
