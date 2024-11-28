(function(){"use strict";var e={3248:function(e,t,n){var l=n(5130),i=(n(4114),n(8992),n(3949),n(6768)),o=n(4232),a=n(144),u=n.p+"media/music.8296d701.mp3";const r={id:"app"},s={style:{display:"flex","justify-content":"space-between",width:"100%","margin-top":""}},c={id:"level",class:"nes-text"},d=["width","height"],v={class:"nes-dialog is-dark is-rounded",id:"win-dialog"},h={method:"dialog"},f={style:{"text-align":"center"}},k={class:"message"},p={class:"speech-bubble"},y={class:"nes-balloon from-left"},g=5,m=20,L=50,b=20,w=.6,x=-10,_=1e3/60;var O={__name:"App",setup(e){const t=(0,a.KR)(null),n=(0,a.KR)(!1),l=(0,a.KR)(!1),O=(0,a.KR)(20),R=(0,a.KR)(null),Y=(0,a.KR)(1),I=new Audio(u);let C=null,K=null;const E=(0,a.Kh)({x:0,y:0,width:m,height:m,color:"red",velocityY:0}),j=(0,a.KR)([]),A=(0,a.KR)(1200),G=(0,a.KR)(650),M=()=>{console.log("crash");const e=1200/650;let n=.8*window.innerWidth,l=n/e;l>.8*window.innerHeight&&(l=.8*window.innerHeight,n=l*e),A.value=Math.floor(n),G.value=Math.floor(l),t.value&&(t.value.style.width=`${n}px`,t.value.style.height=`${l}px`)};function T(e){I.pause(),document.getElementById(e).showModal()}function S(){C=t.value,K=C.getContext("2d"),E.x=A.value/2-m/2,E.y=G.value-m,F(),window.addEventListener("keydown",q),V()}function q(e){l.value||"Space"!==e.code||(I.currentTime=0,I.play().catch((e=>{console.error("Error playing audio:",e)})),l.value=!0,X()),"Space"===e.code&&(E.velocityY=x)}function F(){j.value=[];const e=3+Y.value,t=Y.value,n=G.value/e,l=A.value/t;for(let i=0;i<e;i++){let e=i*n+n/2-b/2;for(let n=0;n<t;n++){let t=n*l+Math.random()*(l-L);j.value.push({x:t,y:e,width:L,height:b,speed:Math.random()*(3+Y.value)+2})}}}function H(){j.value.forEach((e=>{e.x+=e.speed,e.x>A.value&&(e.x=-e.width)}))}function N(e){K.fillStyle="black",K.fillRect(e.x,e.y,e.width,e.height)}function W(){E.velocityY+=w,E.y+=E.velocityY,E.y+E.height>G.value&&(E.y=G.value-E.height,E.velocityY=0),E.y<0&&(E.y=0,E.velocityY=0)}function D(){K.fillStyle=E.color,K.fillRect(E.x,E.y,E.width,E.height)}function P(){for(let e of j.value)if(E.x<e.x+e.width&&E.x+E.width>e.x&&E.y<e.y+e.height&&E.y+E.height>e.y)return n.value=!0,clearInterval(R.value),T("collision-detected-dialog"),!0;return!1}function Q(){E.y<=0&&(Y.value<g?(Y.value++,$()):(n.value=!0,clearInterval(R.value),T("win-dialog")))}function $(){E.x=A.value/2-m/2,E.y=G.value-m,E.velocityY=0,F()}function B(){n.value=!1,l.value=!1,O.value=20,Y.value=1,E.velocityY=0,E.x=A.value/2-m/2,E.y=G.value-m,F(),V()}(0,i.sV)((()=>{M(),S()})),(0,i.xo)((()=>{window.removeEventListener("keydown",q),R.value&&clearInterval(R.value)}));let J=0;function V(e){if(n.value)return;const t=e-J;if(t>_){if(J=e-t%_,K.clearRect(0,0,A.value,G.value),H(),j.value.forEach(N),W(),P())return;Q(),D()}requestAnimationFrame(V)}function X(){R.value=setInterval((()=>{O.value--,O.value<=0&&(n.value=!0,clearInterval(R.value),T("time-up-dialog"))}),1e3)}return(e,n)=>((0,i.uX)(),(0,i.CE)("div",r,[n[10]||(n[10]=(0,i.Fv)('<div class="nes-container is-dark with-title"><section class="message"><div class="speech-bubble"><div class="speech-icon"><i class="nes-bcrikko"></i></div><div class="nes-balloon from-left"><p>Hello my friend! Your objective is simple...</p><p>Get to the other side of Level 5 in under 20 seconds to win it all!</p></div></div></section></div>',1)),(0,i.Lk)("div",s,[(0,i.Lk)("div",c,"Level: "+(0,o.v_)(Y.value),1),(0,i.Lk)("div",{id:"timer",class:(0,o.C4)(["nes-text",{"is-error":O.value<=10,"is-success":O.value>10}])}," Time Left: "+(0,o.v_)(O.value)+"s ",3)]),(0,i.Lk)("canvas",{id:"gameCanvas",ref_key:"gameCanvas",ref:t,width:A.value,height:G.value},null,8,d),n[11]||(n[11]=(0,i.Lk)("br",null,null,-1)),n[12]||(n[12]=(0,i.Lk)("p",null,"Tap (or hold 😉) 'Space' to ascend!",-1)),n[13]||(n[13]=(0,i.Lk)("section",null,[(0,i.Lk)("dialog",{class:"nes-dialog is-dark is-rounded",id:"quit-modal-dialog"},[(0,i.Lk)("form",{method:"dialog"},[(0,i.Lk)("p",null,"Giving up already?"),(0,i.Lk)("button",{class:"nes-btn"},"Just kidding!"),(0,i.Lk)("button",{class:"nes-btn is-error"},"I can't take it anymore!")])])],-1)),(0,i.Lk)("section",null,[(0,i.Lk)("dialog",{class:"nes-dialog is-dark is-rounded",id:"time-up-dialog"},[(0,i.Lk)("form",{method:"dialog"},[n[1]||(n[1]=(0,i.Lk)("p",{class:"is-error",style:{"text-align":"center"}},"Game Over!",-1)),n[2]||(n[2]=(0,i.Lk)("p",null,"You have unfortunately run out of time my friend!",-1)),(0,i.Lk)("menu",{class:"dialog-menu"},[(0,i.Lk)("button",{class:"nes-btn",onClick:B},"Retry"),n[0]||(n[0]=(0,i.Lk)("button",{class:"nes-btn is-error"},"Quit Game",-1))])])])]),(0,i.Lk)("section",null,[(0,i.Lk)("dialog",{class:"nes-dialog is-dark is-rounded",id:"collision-detected-dialog"},[(0,i.Lk)("form",{method:"dialog"},[n[4]||(n[4]=(0,i.Lk)("p",{class:"is-error",style:{"text-align":"center"}},"Game Over!",-1)),n[5]||(n[5]=(0,i.Lk)("p",null,"Damn! You were caught before you could get to the other side!",-1)),(0,i.Lk)("menu",{class:"dialog-menu"},[(0,i.Lk)("button",{class:"nes-btn",onClick:B},"Retry"),n[3]||(n[3]=(0,i.Lk)("button",{class:"nes-btn is-error"},"Quit Game",-1))])])])]),(0,i.Lk)("section",null,[(0,i.Lk)("dialog",v,[(0,i.Lk)("form",h,[n[9]||(n[9]=(0,i.Lk)("input",{type:"text",style:{opacity:"0",height:"0",width:"0",position:"absolute"},autofocus:""},null,-1)),(0,i.Lk)("div",f,[(0,i.Lk)("section",k,[(0,i.Lk)("div",p,[n[7]||(n[7]=(0,i.Lk)("div",{class:"speech-icon"},[(0,i.Lk)("i",{class:"nes-bcrikko"})],-1)),(0,i.Lk)("div",y,[(0,i.Lk)("p",null,"Welcome to the other side my friend! You got here with "+(0,o.v_)(O.value)+"s left to spare!",1),n[6]||(n[6]=(0,i.Lk)("p",null,null,-1))])])])]),(0,i.Lk)("menu",{class:"dialog-menu"},[(0,i.Lk)("button",{class:"nes-btn",onClick:B},"I WANNA DO IT AGAIN!"),n[8]||(n[8]=(0,i.Lk)("button",{class:"nes-btn is-error"},"I'm quite content with this victory",-1))])])])])]))}};const R=O;var Y=R;(0,l.Ef)(Y).mount("#app")}},t={};function n(l){var i=t[l];if(void 0!==i)return i.exports;var o=t[l]={exports:{}};return e[l].call(o.exports,o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,l,i,o){if(!l){var a=1/0;for(c=0;c<e.length;c++){l=e[c][0],i=e[c][1],o=e[c][2];for(var u=!0,r=0;r<l.length;r++)(!1&o||a>=o)&&Object.keys(n.O).every((function(e){return n.O[e](l[r])}))?l.splice(r--,1):(u=!1,o<a&&(a=o));if(u){e.splice(c--,1);var s=i();void 0!==s&&(t=s)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[l,i,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.p="/the-other-side/"}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,l){var i,o,a=l[0],u=l[1],r=l[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(i in u)n.o(u,i)&&(n.m[i]=u[i]);if(r)var c=r(n)}for(t&&t(l);s<a.length;s++)o=a[s],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},l=self["webpackChunkwhy_did_the_chicken_cross_the_road"]=self["webpackChunkwhy_did_the_chicken_cross_the_road"]||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var l=n.O(void 0,[504],(function(){return n(3248)}));l=n.O(l)})();
//# sourceMappingURL=app.a0766d3c.js.map