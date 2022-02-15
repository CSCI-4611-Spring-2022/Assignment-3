var p=Object.defineProperty;var w=(n,e,t)=>e in n?p(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var i=(n,e,t)=>(w(n,typeof e!="symbol"?e+"":e,t),t);import{W as M,S as f,P as v,C as b,V as k,M as c,a as y,b as g,c as x,d as T,G as D,e as L,T as m,L as q,F as u,f as h,g as C,h as E,i as z,D as I}from"./vendor.js";const S=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}};S();class U{constructor(e=60,t=1.333,r=1,a=1e3){i(this,"aspectRatio");i(this,"fov");i(this,"znear");i(this,"zfar");i(this,"renderer");i(this,"scene");i(this,"camera");i(this,"clock");this.fov=e,this.aspectRatio=t,this.znear=r,this.zfar=a,this.renderer=new M,this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this.resize(),window.addEventListener("resize",()=>{this.resize()},!1),window.addEventListener("mousedown",s=>{this.onMouseDown(s)}),window.addEventListener("mouseup",s=>{this.onMouseUp(s)}),window.addEventListener("mousemove",s=>{this.onMouseMove(s)}),window.addEventListener("keydown",s=>{this.onKeyDown(s)}),window.addEventListener("keyup",s=>{this.onKeyUp(s)}),this.scene=new f,this.camera=new v(this.fov,this.aspectRatio,this.znear,this.zfar),this.clock=new b}start(){this.createScene(),this.mainLoop()}mainLoop(){this.update(this.clock.getDelta()),this.renderer.render(this.scene,this.camera),window.requestAnimationFrame(()=>this.mainLoop())}resize(){this.renderer.setSize(window.innerWidth,window.innerHeight);var e=new k;this.renderer.getViewport(e);var t=window.innerWidth/window.innerHeight;this.aspectRatio>t?this.renderer.setViewport(0,(window.innerHeight-window.innerWidth/this.aspectRatio)/2,window.innerWidth,window.innerWidth/this.aspectRatio):this.renderer.setViewport((window.innerWidth-window.innerHeight*this.aspectRatio)/2,0,window.innerHeight*this.aspectRatio,window.innerHeight)}onMouseDown(e){}onMouseUp(e){}onMouseMove(e){}onKeyDown(e){}onKeyUp(e){}}class l extends c{constructor(e,t,r){super();i(this,"startTime");i(this,"duration");i(this,"magnitude");this.startTime=t.date.getTime(),this.magnitude=t.normalizedMagnitude,this.duration=r,this.position.copy(e),this.geometry=new y(.05);var a=new g;a.color=new x(1,1,0),this.material=a}getPlaybackLife(e){return T.clamp(Math.abs(e/1e3-this.startTime/1e3)/this.duration,0,1)}}class F extends D{constructor(){super();i(this,"earthMesh");i(this,"earthMaterial");i(this,"debugMaterial");this.earthMesh=new c,this.earthMaterial=new g,this.debugMaterial=new L}initialize(){this.earthMaterial.map=new m().load("./data/earth-2k.png"),this.earthMaterial.map.minFilter=q,this.debugMaterial.wireframe=!0;var e=[];e.push(-.5,-.5,0),e.push(.5,-.5,0),e.push(.5,.5,0),e.push(-.5,.5,0);var t=[];t.push(0,0,1),t.push(0,0,1),t.push(0,0,1),t.push(0,0,1);var r=[];r.push(0,1,2),r.push(0,2,3),this.earthMesh.geometry.setAttribute("position",new u(e,3)),this.earthMesh.geometry.setAttribute("normal",new u(t,3)),this.earthMesh.geometry.setIndex(r),this.add(this.earthMesh)}update(e){}animateEarthquakes(e){this.children.forEach(t=>{t instanceof l&&t.getPlaybackLife(e)==1&&this.remove(t)})}createEarthquake(e){var r=new h(Math.random()*6-3,Math.random()*4-2,0),a=new l(r,e,29030400);this.add(a)}convertLatLongToPlane(e,t){return new h}convertLatLongToSphere(e,t){return new h}toggleDebugMode(e){e?this.earthMesh.material=this.debugMaterial:this.earthMesh.material=this.earthMaterial}}class V{constructor(e){i(this,"date");i(this,"longitude");i(this,"latitude");i(this,"magnitude");i(this,"normalizedMagnitude");this.date=new Date,this.date.setUTCFullYear(parseInt(e.substring(12,16))),this.date.setUTCMonth(parseInt(e.substring(17,19))),this.date.setUTCDate(parseInt(e.substring(20,22))),this.date.setUTCHours(parseInt(e.substring(24,26))),this.date.setUTCMinutes(parseInt(e.substring(27,29))),this.date.setUTCSeconds(parseFloat(e.substring(30,35))),this.longitude=parseFloat(e.substring(44,52)),this.latitude=parseFloat(e.substring(37,44)),this.magnitude=parseFloat(e.substring(66,70)),this.normalizedMagnitude=this.magnitude}}class R{constructor(e){i(this,"earthquakes");i(this,"loaded");i(this,"maxMagnitude");i(this,"minMagnitude");i(this,"nextIndex");this.earthquakes=[],this.loaded=!1,this.maxMagnitude=0,this.minMagnitude=1/0,this.nextIndex=0;var t=new C;t.load(e,r=>{var a=r.toString().split(`
`);a.forEach(s=>{if(s.length>30){var o=new V(s);this.earthquakes.push(o),o.magnitude>this.maxMagnitude?this.maxMagnitude=o.magnitude:o.magnitude<this.minMagnitude&&(this.minMagnitude=o.magnitude)}}),this.earthquakes.forEach(s=>{s.normalizedMagnitude=(s.magnitude-this.minMagnitude)/(this.maxMagnitude-this.minMagnitude)}),this.loaded=!0})}reset(){this.nextIndex=0}getNextQuake(e){for(var t=e.getTime();this.nextIndex<this.earthquakes.length;)return this.earthquakes[this.nextIndex].date.getTime()<t?(this.nextIndex++,this.earthquakes[this.nextIndex-1]):null;return null}getMaxTime(){return this.earthquakes[this.earthquakes.length-1].date.getTime()}getMinTime(){return this.earthquakes[0].date.getTime()}}class B extends U{constructor(){super(60,1920/1080,.1,50);i(this,"earth");i(this,"gui");i(this,"earthquakeDB");i(this,"currentTime");i(this,"mouseDrag");i(this,"mouseVector");i(this,"date");i(this,"viewMode");i(this,"playbackSpeed");i(this,"debugMode");this.gui=new E,this.earth=new F,this.earthquakeDB=new R("./data/earthquakes.txt"),this.currentTime=1/0,this.mouseDrag=!1,this.mouseVector=new z,this.date="",this.viewMode="Map",this.playbackSpeed=.5,this.debugMode=!1}createScene(){this.camera.position.set(0,0,3.25),this.camera.lookAt(0,0,0),this.camera.up.set(0,1,0);var e=new I("white",1.5);e.position.set(10,10,15),this.scene.add(e),this.scene.background=new m().load("./data/stars.png"),this.earth.initialize(),this.scene.add(this.earth);var t=this.gui.addFolder("Earthquake Controls"),r=t.add(this,"date");r.name("Current Date"),r.listen();var a=t.add(this,"viewMode",{Map:"Map",Globe:"Globe"});a.name("View Mode"),a.onChange(d=>{});var s=t.add(this,"playbackSpeed",0,1);s.name("Playback Speed");var o=t.add(this,"debugMode");o.name("Debug Mode"),o.onChange(d=>{this.toggleDebugMode(d)}),this.gui.width=300,t.open()}update(e){if(!this.earthquakeDB.loaded)return;const t=3e10;this.currentTime+=t*this.playbackSpeed*e,this.currentTime>this.earthquakeDB.getMaxTime()&&(this.currentTime=this.earthquakeDB.getMinTime(),this.earthquakeDB.reset());var r=new Date;r.setTime(this.currentTime),this.date=r.getUTCMonth()+"/"+r.getUTCDate()+"/"+r.getUTCFullYear();for(var a=this.earthquakeDB.getNextQuake(r);a;)a=this.earthquakeDB.getNextQuake(r);this.earth.update(e),this.earth.animateEarthquakes(this.currentTime)}toggleDebugMode(e){this.earth.toggleDebugMode(e)}onMouseDown(e){this.mouseDrag=!0}onMouseUp(e){this.mouseDrag=!1}onMouseMove(e){this.mouseDrag,this.mouseVector.set(e.x,e.y)}}var P=new B;P.start();
