import"./assets/modulepreload-polyfill-3cfb730f.js";import{i}from"./assets/vendor-77e16229.js";const a=document.querySelector(".form");a.addEventListener("submit",l);function l(s){s.preventDefault();const o=s.currentTarget,t={delay:Number(o.elements.delay.value.trim()),state:o.elements.state.value};new Promise((e,r)=>{o.reset(),setTimeout(()=>{t.state==="fulfilled"?e(t.delay):r(t.delay)},t.delay)}).then(e=>i.show({message:`✅ Fulfilled promise in ${e}ms`,titleColor:"white",messageColor:"white",backgroundColor:"green",position:"topRight"})).catch(e=>i.show({message:`❌ Rejected promise in ${e}ms`,titleColor:"white",messageColor:"white",backgroundColor:"red",position:"topRight"}))}
//# sourceMappingURL=commonHelpers2.js.map
