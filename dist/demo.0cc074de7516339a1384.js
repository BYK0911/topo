!function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=5)}([function(t,e,o){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var i=o(3),s=o(10),a=function(t){function e(){var e=t.call(this)||this;return e.backgroundColor="rgba(255, 255, 255, 0)",e.borderWidth=1,e.borderColor="rgba(255, 255, 255, 0)",e.x=0,e.y=0,e.width=0,e.height=0,e.rotation=0,e.scale=1,e}return r(e,t),e.prototype.drawText=function(t){var e=this,o=e.width,n=e.height,r=e.text,i=e.textColor,s=e.textPosition,a=e.fontSize,u=s.split("-"),c=u[0],f=u[1],l="left"===c?-4:"center"===c?o/2:o+4,h="top"===f?-4:"middle"===f?n/2:n+4;t.textAlign="left"===c?"right":"center"===c?"center":"left",t.textBaseline="top"===f?"bottom":"middle"===f?"middle":"top",t.fillStyle=i,t.font=a+"px Sanserif",t.fillText(r,l,h)},e.prototype.contain=function(t,e){var o=this.width,n=this.height;return t>=0&&t<=o&&e>=0&&e<=n},e.prototype.translate=function(t,e){this.x+=t,this.y+=e},e.prototype.rotate=function(t){this.rotation=(this.rotation+t)%360},e.prototype.zoom=function(t){this.scale*=t?1.1:1/1.1},e.prototype.getRelativeCoord=function(t,e){void 0===t&&(t=0),void 0===e&&(e=0);var o=new s.default(t,e);return o.translate(-this.x,-this.y),o.scale(1/this.scale,1/this.scale),o.rotate(-this.rotation),o},e.prototype.getAbsoluteCoord=function(t,e){void 0===t&&(t=0),void 0===e&&(e=0);var o=new s.default(t,e);return o.rotate(this.rotation),o.scale(this.scale,this.scale),o.translate(this.x,this.y),o},e}(i.default);e.default=a},function(t,e,o){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var i=o(3),s=o(2),a=function(t){function e(){var e=t.call(this)||this;return e.type="TopoEdge",e.points=[],e.lineDash=[0],e.lineWidth=1,e.color="#666",e}return r(e,t),e.prototype.render=function(t){t.beginPath(),this.points.forEach((function(e,o){0===o?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y)})),t.setLineDash(this.lineDash),t.lineWidth=this.lineWidth,t.strokeStyle=this.color,t.stroke(),t.closePath()},e.prototype.contain=function(t,e){var o=this.points[0],n=o.x,r=o.y,i=this.points[this.points.length-1],a=i.x,u=i.y;return s.default(n,r,a,u,t,e)},e}(i.default);e.default=a},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(11);e.default=function(t,e,o,r,i,s){var a=[o-t,r-e],u=[i-t,s-e],c=n.default.norm(a);return n.default.norm(u)<=2||!!(c&&n.default.crossNorm(a,u)/c<=2)}},function(t,e,o){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var i=o(9),s=0,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.id="TopoElement_"+s++,e.text="",e.textPosition="center-bottom",e.fontSize=12,e.textColor="#333",e.shadowColor="rgba(255, 255, 255, 0)",e.shadowOffsetX=0,e.shadowOffsetY=0,e.shadowBlur=0,e.opacity=1,e.visible=!0,e}return r(e,t),e.prototype.contain=function(t,e){return!1},e.prototype.show=function(){this.visible=!0},e.prototype.hide=function(){this.visible=!1},e}(i.default);e.default=a},function(t,e,o){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(){var e=t.call(this)||this;return e.type="TopoGroup",e.backgroundImage="",e.borderColor="#ddd",e.elements=[],e}return r(e,t),Object.defineProperty(e.prototype,"children",{get:function(){return this.elements},enumerable:!0,configurable:!0}),e.prototype.render=function(t){t.save(),t.translate(this.x,this.y),t.rotate(this.rotation/180*Math.PI),t.scale(this.scale,this.scale),this.elements.forEach((function(e){return e.render(t)})),t.restore()},e.prototype.contain=function(t,e){var o=this.x,n=this.y,r=this.width,i=this.height;return t>=o&&t<=o+r&&e>=n&&e<=n+i},e.prototype.add=function(t){this.elements.includes(t)||(t.parent=this,t.root=this.root||this,this.elements.push(t))},e.prototype.remove=function(t){var e=this.elements.indexOf(t);e>-1&&(this.elements.splice(e,1),t.parent=null,t.root=null)},e.prototype.clear=function(){this.elements.forEach((function(t){t.parent=null,t.root=null})),this.elements.splice(0,this.elements.length)},e}(o(0).default);e.default=i},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),o(6)},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(7),r=o(17),i=o(18),s=n.default.init();r.default(s),i.default(s),s.resize(window.innerWidth,window.innerHeight),document.body.style.margin="0",document.body.appendChild(s.canvas);var a=function(t,e){return void 0===t&&(t=300),Math.round(Math.random()*(e-t))+t},u=window.innerWidth-200,c=window.innerHeight-200;!function(t,e){var o=[],r={};t.forEach((function(t){var e=new n.default.TopoNode;i.default(e),Object.assign(e,t),o.push(e),r[t.id]=e})),e.forEach((function(t){var e=new n.default[t.type];e.lineWidth=t.lineWidth,e.lineDash=t.lineDash,e.color=t.color,t.points.forEach((function(t){var o={};Object.defineProperties(o,{x:{get:function(){return r[t].getAbsoluteCoord().x}},y:{get:function(){return r[t].getAbsoluteCoord().y}}}),e.points.push(o)})),s.add(e)})),o.forEach((function(t){return s.add(t)}))}([{type:"TopoNode",id:"0",x:a(100,u),y:a(100,c),backgroundColor:"#a5f",text:"Topo Node",width:60,height:60},{type:"TopoNode",id:"1",x:a(100,u),y:a(100,c),opacity:.5},{type:"TopoNode",id:"2",x:a(100,u),y:a(100,c),rotation:45},{type:"TopoNode",id:"3",x:a(100,u),y:a(100,c),borderWidth:1,borderColor:"#ddd"},{type:"TopoNode",id:"4",x:a(100,u),y:a(100,c),shadowBlur:6,shadowColor:"#666",shadowOffsetX:3,shadowOffsetY:5},{type:"TopoNode",id:"5",x:a(100,u),y:a(100,c),backgroundColor:"#5af"},{type:"TopoNode",id:"6",x:a(100,u),y:a(100,c),backgroundColor:"#f5a"}],[{type:"TopoEdge",points:["1","4"],lineWidth:1,color:"#333",lineDash:[0]},{type:"TopoZEdge",points:["2","5"],lineWidth:1,color:"#333",lineDash:[5,5]},{type:"TopoSEdge",points:["3","6"],lineWidth:1,color:"#fa5",lineDash:[0]}]),console.log(s),function t(){window.requestAnimationFrame(t),s.render()}()},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(8),r=o(1),i=o(12),s=o(13),a=o(14),u={TopoNode:n.default,TopoEdge:r.default,TopoZEdge:i.default,TopoSEdge:s.default,init:function(){return new a.default}};e.default=u},function(t,e,o){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(){var e=t.call(this)||this;return e.type="TopoNode",e.icon="",e.backgroundColor="#fa5",e.width=50,e.height=50,e}return r(e,t),e.prototype.render=function(t){var e=this,o=e.x,n=e.y,r=e.width,i=e.height,s=e.shadowOffsetX,a=e.shadowOffsetY,u=e.shadowColor,c=e.shadowBlur,f=e.borderWidth,l=e.borderColor,h=e.backgroundColor,p=e.opacity;t.save(),t.translate(o,n),t.rotate(this.rotation/180*Math.PI),t.translate(-r/2,-i/2),t.scale(this.scale,this.scale),t.globalAlpha=p,c&&(t.shadowOffsetX=s,t.shadowOffsetY=a,t.shadowColor=u,t.shadowBlur=c),t.fillStyle=h,t.fillRect(0,0,r,i),f&&(t.lineWidth=f,t.strokeStyle=l,t.strokeRect(0,0,r,i)),this.text&&this.drawText(t),t.restore()},e.prototype.contain=function(t,e){var o=this.width,n=this.height;return t>=-o/2&&t<=o/2&&e>=-n/2&&e<=n/2},e}(o(0).default);e.default=i},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=new WeakMap,r=function(t,e,o){var r,i=n.has(t);return i&&(i=(r=n.get(t)[e])&&r.includes(o)),i},i=function(t,e,o){var r;n.has(t)?r=n.get(t):(r={},n.set(t,r)),r[e]=r[e]||[],r[e].push(o)},s=function(t,e,o){if(e)if(o){var r=n.get(t)[e],i=r.indexOf(o);i>-1&&r.splice(i,1)}else n.get(t)[e]=[];else n.delete(t)},a=function(t,e){return n.has(t)?n.get(t)[e]:null},u=function(){function t(){}return t.prototype.on=function(t,e){r(this,t,e)||i(this,t,e)},t.prototype.off=function(t,e){s(this,t,e)},t.prototype.dispatch=function(t){var e=this,o=a(this,t.type);o&&o.forEach((function(o){return o.call(e,t)}))},t}();e.default=u},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){this.x=t,this.y=e}return t.prototype.matrix=function(t,e,o,n,r,i){var s=this.x,a=this.y;return this.x=t*s+e*a+o,this.y=n*s+r*a+i,this},t.prototype.translate=function(t,e){return this.matrix(1,0,t,0,1,e)},t.prototype.scale=function(t,e){return this.matrix(t,0,0,0,e,0)},t.prototype.rotate=function(t){t=t/180*Math.PI;var e=Math.cos(t),o=Math.sin(t);return this.matrix(e,-o,0,o,e,0)},t.prototype.skewX=function(t){t=t/180*Math.PI;var e=Math.tan(t);return this.matrix(1,e,0,0,1,0)},t.prototype.skewY=function(t){t=t/180*Math.PI;var e=Math.tan(t);return this.matrix(1,0,0,e,1,0)},t}();e.default=n},function(t,e,o){"use strict";var n=this&&this.__spreadArrays||function(){for(var t=0,e=0,o=arguments.length;e<o;e++)t+=arguments[e].length;var n=Array(t),r=0;for(e=0;e<o;e++)for(var i=arguments[e],s=0,a=i.length;s<a;s++,r++)n[r]=i[s];return n};Object.defineProperty(e,"__esModule",{value:!0});var r={add:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var o=[];return t.forEach((function(t){t.forEach((function(t,e){o[e]=o[e]?o[e]+t:t}))})),o},deduct:function(t,e){var o=n(t);return e.forEach((function(t,e){o[e]=(o[e]||0)-t})),o},norm:function(t){if(0!==t.length)return Math.pow(t.reduce((function(t,e){return t+e*e}),0),1/t.length)},dot:function(t,e){for(var o=Math.min(t.length,e.length),n=0,r=-1;++r<o;)n+=t[r]*e[r];return n},crossNorm:function(t,e){return Math.abs(t[0]*e[1]-t[1]*e[0])},multiply:function(t,e){return t.map((function(t){return t*e}))},cos:function(t,e){return this.dot(t,e)/this.norm(t)/this.norm(e)},angle:function(t,e){return Math.acos(this.cos(t,e))}};e.default=r},function(t,e,o){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var i=o(1),s=o(2),a=function(t){function e(){var e=t.call(this)||this;return e.type="TopoZEdge",e}return r(e,t),e.prototype.render=function(t){var e=this.points,o=e[0],n=o.x,r=o.y,i=e[1],s=i.x,a=i.y;t.beginPath(),t.moveTo(n,r),t.lineTo((n+s)/2,r),t.lineTo((n+s)/2,a),t.lineTo(s,a),t.setLineDash(this.lineDash),t.lineWidth=this.lineWidth,t.strokeStyle=this.color,t.stroke(),t.closePath()},e.prototype.contain=function(t,e){for(var o=this.points[0],n=o.x,r=o.y,i=this.points[this.points.length-1],a=i.x,u=i.y,c=(n+a)/2,f=[[n,r],[c,r],[c,u],[a,u]],l=-1;++l<3;)if(s.default(f[l][0],f[l][1],f[l+1][0],f[l+1][1],t,e))return!0;return!1},e}(i.default);e.default=a},function(t,e,o){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var i=o(1),s=o(2),a=function(t){function e(){var e=t.call(this)||this;return e.type="TopoSEdge",e}return r(e,t),e.prototype.render=function(t){var e=this.points,o=e[0],n=o.x,r=o.y,i=e[1],s=i.x,a=i.y;t.beginPath(),t.moveTo(n,r),t.lineTo(n,(r+a)/2),t.lineTo(s,(r+a)/2),t.lineTo(s,a),t.setLineDash(this.lineDash),t.lineWidth=this.lineWidth,t.strokeStyle=this.color,t.stroke(),t.closePath()},e.prototype.contain=function(t,e){for(var o=this.points[0],n=o.x,r=o.y,i=this.points[this.points.length-1],a=i.x,u=i.y,c=(r+u)/2,f=[[n,r],[n,c],[a,c],[a,u]],l=-1;++l<3;)if(s.default(f[l][0],f[l][1],f[l+1][0],f[l+1][1],t,e))return!0;return!1},e}(i.default);e.default=a},function(t,e,o){"use strict";var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0});var i=o(15),s=function(t){function e(){var e=t.call(this)||this;return e.type="TopoView",e.scale=1,e.width=500,e.height=400,e.backgroundColor="#f0f0f0",e.canvas=document.createElement("canvas"),e.ctx=e.canvas.getContext("2d"),e.canvas.width=500,e.canvas.height=400,e.canvas.style.width="500px",e.canvas.style.height="400px",e.canvas.style.verticalAlign="middle",i.default(e),e}return r(e,t),e.prototype.render=function(){var t=this;this.ctx.clearRect(0,0,this.width,this.height),this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(0,0,this.width,this.height),this.ctx.save(),this.ctx.translate(this.x,this.y),this.ctx.rotate(this.rotation/180*Math.PI),this.ctx.scale(this.scale,this.scale),this.children.forEach((function(e){e.visible&&e.render(t.ctx)})),this.ctx.restore()},e.prototype.resize=function(t,e){this.width=t,this.height=e,this.canvas.width=t,this.canvas.height=e,this.canvas.style.width=t+"px",this.canvas.style.height=e+"px"},e.prototype.contain=function(t,e){return!0},e}(o(4).default);e.default=s},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(16),r=o(4),i=o(0);e.default=function(t){var e,o,s,a=[],u=t.canvas,c=function(t,e,o){var r=new n.default(t,o.offsetX,o.offsetY);r.target=e[e.length-1],r.path=e,r.originalEvent=o,r.trigger()},f={contextmenu:function(t){t.preventDefault()},mousedown:function(t){o=!0,e=!1,c("mousedown",a,t)},mousemove:function(n){if(o)e?c("drag",a,n):(c("dragstart",a,n),e=!0);else{var s=a[a.length-1]||null;!function(e){var o=function(t,e,n){if(t instanceof i.default){var s=t.getRelativeCoord(e,n);e=s.x,n=s.y}t.contain(e,n)&&a.push(t),t instanceof r.default&&t.children.forEach((function(t){return o(t,e,n)}))};a=[],o(t,e.offsetX,e.offsetY)}(n);var u=a[a.length-1];s===u?c("mousemove",a,n):(s&&c("mouseleave",[s],n),c("mouseenter",[u],n))}},mouseup:function(t){e?c("dragend",a,t):0===t.button?(0===s&&setTimeout((function(){2===s&&(c("dblclick",a,t),s=0)}),300),c("click",a,t),s++):2===t.button&&c("contextmenu",a,t),c("mouseup",a,t),e=!1,o=!1},mouseenter:function(t){c("mouseenter",a,t)},mouseleave:function(t){e=!1,o=!1,c("mouseleave",a,t)},mousewheel:function(t){t.preventDefault(),c("mousewheel",a,t)},DOMMouseScroll:function(t){t.preventDefault(),c("mousewheel",a,t)}};for(var l in f)u.addEventListener(l,f[l])}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e,o){this.type=t,this.x=e,this.y=o,this._preventDefault=!1,this._stopPropagation=!1,this.target=null,this.path=[],this.originalEvent=null}return t.prototype.stopPropagation=function(){this._stopPropagation=!0},t.prototype.preventDefault=function(){this._preventDefault=!0},t.prototype.trigger=function(){for(var t=this.path.length;--t>-1&&(this.path[t].dispatch(this),!this._stopPropagation););},t}();e.default=n},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){t.on("mousewheel",(function(e){e.preventDefault();var o,n,r,i=e.originalEvent,s=i.deltaY||i.detail,a=t.scale,u=i.x,c=i.y;if(t.parent){var f=t.parent.getRelativeCoord(u,c);u=f.x,c=f.y}t.zoom(s<0),r=t.scale/a,o=u-t.x,n=c-t.y,o=u-o*r-t.x,n=c-n*r-t.y,t.translate(o,n)}))}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e,o;t.on("dragstart",(function(t){t.stopPropagation(),e=t.originalEvent.offsetX,o=t.originalEvent.offsetY})),t.on("drag",(function(n){var r,i;if(n.stopPropagation(),t.parent){var s=t.parent.getRelativeCoord(e,o),a=s.x,u=s.y,c=t.parent.getRelativeCoord(n.originalEvent.offsetX,n.originalEvent.offsetY);r=c.x-a,i=c.y-u}else r=n.originalEvent.offsetX-e,i=n.originalEvent.offsetY-o;t.translate(r,i),e=n.originalEvent.offsetX,o=n.originalEvent.offsetY}))}}]);