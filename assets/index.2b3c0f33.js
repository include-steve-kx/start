import{C,V as r,W as A,S as R,M as W,B as H,a as O,P as Z,A as T,G as q,O as G,R as j,b as B,c as F,d as I}from"./vendor.a689db38.js";const N=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const _ of s.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&n(_)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}};N();let d,M,g=[0,.95,.3],V=[0,1,1],u,l,f,c,a,x,w,m,h,p,y,b,L,k,v=[],E;const X=new C(new r(...g),new r(0,.95,.5),new r(0,.95,.7),new r(0,1.2,2)),Y=new C(new r(0,1.2,2),new r(0,0,2),new r(0,-5,2),new r(0,-10,2)),D=new C(new r(0,-10,2),new r(0,-12,2),new r(0,-16,2),new r(0,-20,2)),K=[X,Y,D],J=[25,85,100];window.onbeforeunload=function(){window.scrollTo(0,0)};function Q(){f=new A({canvas:document.querySelector("#bg")}),f.setPixelRatio(window.devicePixelRatio),f.setSize(window.innerWidth,window.innerHeight);const i=window.innerWidth/window.innerHeight;l=new R,M=new W(new H(.1,.1,.1),new O(65280)),M.position.set(...g),d=new Z(75,i,.1,1e3),d.position.set(...g),d.lookAt(M.position),S(20,20,20,.5),S(-.5,1.1,.1,1),S(0,-1,0,1);const o=new T(16777215);l.add(o),c=new q,a=new G,l.add(a),c.load("models/computer_desk.gltf",function(e){x=e.scene,a.add(x)}),c.load("models/wooden_horse.gltf",function(e){w=e.scene,w.position.set(-.8,-3,0),w.scale.set(2,2,2),a.add(w)}),c.load("models/duck.gltf",function(e){m=e.scene,m.position.set(.8,-3,0),m.scale.set(2,2,2),a.add(m)}),c.load("models/fire_extinguisher.gltf",function(e){h=e.scene,h.position.set(-.8,-5,0),h.scale.set(2,2,2),a.add(h)}),c.load("models/telephone.gltf",function(e){p=e.scene,p.position.set(.8,-5,0),p.scale.set(2,2,2),a.add(p)}),c.load("models/train.gltf",function(e){y=e.scene,y.position.y=-9,a.add(y)}),c.load("models/stair_1.gltf",function(e){b=e.scene,b.position.set(-.8,-15,-2),a.add(b)}),c.load("models/stair_2.gltf",function(e){L=e.scene,L.position.set(.2,-20,-1),a.add(L)}),c.load("models/stair_3.gltf",function(e){k=e.scene,k.position.set(.8,-15,-2),a.add(k)}),new j,new B,f.domElement.addEventListener("click",P),document.body.onscroll=te,window.addEventListener("resize",oe),window.addEventListener("keydown",function(e){switch(e.keyCode){case 67:v.forEach(n=>{n.showX=!n.showX,n.showY=!n.showY,n.showZ=!n.showZ}),E.enabled=!E.enabled;break;case 71:v.forEach(n=>{n.setMode("translate")});break;case 69:v.forEach(n=>{n.setMode("rotate")});break;case 83:v.forEach(n=>{n.setMode("scale")});break;case 82:d.position.set(...g),d.lookAt(...V)}})}function P(){console.log("canvas clicked!!!")}function S(i=0,o=0,e=0,n=1){const t=new F(16777215,n);t.position.set(i,o,e),l.add(t);const s=new I(t,.1);l.add(s)}function U(i,o){let e=$(o,u),n;e===0?n=u/o[0]:e===o.length?(e=o.length-1,n=1):n=(u-o[e-1])/(o[e]-o[e-1]);let t=i[e].getPointAt(n);d.position.set(...t)}function $(i,o){let e=0,n=i.length-1;for(;e<=n;){let t=Math.floor(e+(n-e)/2);if(i[t]===o)return t+1;i[t]>o?n=t-1:e=t+1}return n+1}Q();z();window.onload=function(){};function ee(i){let o=-150,n=o+(30-o)*i/100;console.log(n),y.position.z=n}function ne(){b.rotation.y-=.01,L.rotation.y-=.01,k.rotation.y-=.02}function te(){u=get_scroll_percentage(),U(K,J),ee(u),ne()}function oe(){const i=window.innerWidth/window.innerHeight;d.aspect=i,d.updateProjectionMatrix(),f.setSize(window.innerWidth,window.innerHeight),se()}function ie(){w.rotation.y-=.01,m.rotation.y-=.01,h.rotation.y-=.01,p.rotation.y-=.01}function z(){requestAnimationFrame(z),f.render(l,d),ie()}function se(){f.render(l,d)}document.querySelector("main").addEventListener("click",function(i){console.log("main clicked!!!"),P()});
