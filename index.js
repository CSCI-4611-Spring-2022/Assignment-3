var c=Object.defineProperty;var g=(o,e,t)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var i=(o,e,t)=>(g(o,typeof e!="symbol"?e+"":e,t),t);import{W as p,S as m,P as w,C as M,V as f,G as v,M as b,a as k,b as y,T as l,L as D,F as d,c as u,d as x,e as T,f as L,D as C}from"./vendor.js";const q=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}};q();class I{constructor(e=60,t=1.333,r=1,a=1e3){i(this,"aspectRatio");i(this,"fov");i(this,"znear");i(this,"zfar");i(this,"renderer");i(this,"scene");i(this,"camera");i(this,"clock");this.fov=e,this.aspectRatio=t,this.znear=r,this.zfar=a,this.renderer=new p,this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this.resize(),window.addEventListener("resize",()=>{this.resize()},!1),window.addEventListener("mousedown",s=>{this.onMouseDown(s)}),window.addEventListener("mouseup",s=>{this.onMouseUp(s)}),window.addEventListener("mousemove",s=>{this.onMouseMove(s)}),window.addEventListener("keydown",s=>{this.onKeyDown(s)}),window.addEventListener("keyup",s=>{this.onKeyUp(s)}),this.scene=new m,this.camera=new w(this.fov,this.aspectRatio,this.znear,this.zfar),this.clock=new M}start(){this.createScene(),this.mainLoop()}mainLoop(){this.update(this.clock.getDelta()),this.renderer.render(this.scene,this.camera),window.requestAnimationFrame(()=>this.mainLoop())}resize(){this.renderer.setSize(window.innerWidth,window.innerHeight);var e=new f;this.renderer.getViewport(e);var t=window.innerWidth/window.innerHeight;this.aspectRatio>t?this.renderer.setViewport(0,(window.innerHeight-window.innerWidth/this.aspectRatio)/2,window.innerWidth,window.innerWidth/this.aspectRatio):this.renderer.setViewport((window.innerWidth-window.innerHeight*this.aspectRatio)/2,0,window.innerHeight*this.aspectRatio,window.innerHeight)}onMouseDown(e){}onMouseUp(e){}onMouseMove(e){}onKeyDown(e){}onKeyUp(e){}}class S extends v{constructor(){super();i(this,"earthMesh");i(this,"earthMaterial");i(this,"debugMaterial");this.earthMesh=new b,this.earthMaterial=new k,this.debugMaterial=new y}initialize(){this.earthMaterial.map=new l().load("./data/earth-2k.png"),this.earthMaterial.map.minFilter=D,this.debugMaterial.wireframe=!0;var e=[];e.push(-.5,-.5,0),e.push(.5,-.5,0),e.push(.5,.5,0),e.push(-.5,.5,0);var t=[];t.push(0,0,1),t.push(0,0,1),t.push(0,0,1),t.push(0,0,1);var r=[];r.push(0,1,2),r.push(0,2,3),this.earthMesh.geometry.setAttribute("position",new d(e,3)),this.earthMesh.geometry.setAttribute("normal",new d(t,3)),this.earthMesh.geometry.setIndex(r),this.add(this.earthMesh)}update(e){}toggleDebugMode(e){e?this.earthMesh.material=this.debugMaterial:this.earthMesh.material=this.earthMaterial}convertLatLongToPlane(e,t){return new u}convertLatLongToSphere(e,t){return new u}}class U{constructor(e){i(this,"date");i(this,"longitude");i(this,"latitude");i(this,"magnitude");this.date=new Date,this.date.setUTCFullYear(parseInt(e.substring(12,16))),this.date.setUTCMonth(parseInt(e.substring(17,19))),this.date.setUTCDate(parseInt(e.substring(20,22))),this.date.setUTCHours(parseInt(e.substring(24,26))),this.date.setUTCMinutes(parseInt(e.substring(27,29))),this.date.setUTCSeconds(parseFloat(e.substring(30,35))),this.longitude=parseFloat(e.substring(44,52)),this.latitude=parseFloat(e.substring(37,44)),this.magnitude=parseFloat(e.substring(66,70))}}class z{constructor(e){i(this,"earthquakes");i(this,"loaded");i(this,"maxMagnitude");i(this,"minMagnitude");i(this,"nextIndex");this.earthquakes=[],this.loaded=!1,this.maxMagnitude=0,this.minMagnitude=1/0,this.nextIndex=0;var t=new x;t.load(e,r=>{var a=r.toString().split(`
`);a.forEach(s=>{if(s.length>30){var n=new U(s);this.earthquakes.push(n),n.magnitude>this.maxMagnitude?this.maxMagnitude=n.magnitude:n.magnitude<this.minMagnitude&&(this.minMagnitude=n.magnitude)}}),this.loaded=!0})}reset(){this.nextIndex=0}getNextQuake(e){for(var t=e.getTime();this.nextIndex<this.earthquakes.length;)return this.earthquakes[this.nextIndex].date.getTime()<t?(this.nextIndex++,this.earthquakes[this.nextIndex-1]):null;return null}getMaxTime(){return this.earthquakes[this.earthquakes.length-1].date.getTime()}getMinTime(){return this.earthquakes[0].date.getTime()}}class F extends I{constructor(){super(60,1920/1080,.1,50);i(this,"earth");i(this,"gui");i(this,"earthquakeDB");i(this,"currentTime");i(this,"mouseDrag");i(this,"mouseVector");i(this,"date");i(this,"viewMode");i(this,"playbackSpeed");i(this,"debugMode");this.gui=new T,this.earth=new S,this.earthquakeDB=new z("./data/earthquakes.txt"),this.currentTime=1/0,this.mouseDrag=!1,this.mouseVector=new L,this.date="",this.viewMode="Map",this.playbackSpeed=.5,this.debugMode=!1}createScene(){this.camera.position.set(0,0,3.25),this.camera.lookAt(0,0,0),this.camera.up.set(0,1,0);var e=new C("white",1.5);e.position.set(10,10,15),this.scene.add(e),this.scene.background=new l().load("./data/stars.png"),this.earth.initialize(),this.scene.add(this.earth);var t=this.gui.addFolder("Earthquake Controls"),r=t.add(this,"date");r.name("Current Date"),r.listen();var a=t.add(this,"viewMode",{Map:"Map",Globe:"Globe"});a.name("View Mode"),a.onChange(h=>{});var s=t.add(this,"playbackSpeed",0,1);s.name("Playback Speed");var n=t.add(this,"debugMode");n.name("Debug Mode"),n.onChange(h=>{this.toggleDebugMode(h)}),this.gui.width=300,t.open()}update(e){if(!this.earthquakeDB.loaded)return;const t=3e10;this.currentTime+=t*this.playbackSpeed*e,this.currentTime>this.earthquakeDB.getMaxTime()&&(this.currentTime=this.earthquakeDB.getMinTime(),this.earthquakeDB.reset());var r=new Date;r.setTime(this.currentTime),this.date=r.getUTCMonth()+"/"+r.getUTCDate()+"/"+r.getUTCFullYear()}toggleDebugMode(e){this.earth.toggleDebugMode(e)}onMouseDown(e){this.mouseDrag=!0}onMouseUp(e){this.mouseDrag=!1}onMouseMove(e){this.mouseDrag,this.mouseVector.set(e.x,e.y)}}var E=new F;E.start();
