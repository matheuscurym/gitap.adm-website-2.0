(() => {
'use strict';
if(document.body.dataset.entry==='true'){location.replace('gitap.html'+location.search+location.hash);return;}
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.documentElement.classList.add('js');
setTimeout(() => $('.loader').remove(), 1650);
const icon = name => '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
const CONTACT = { whatsapp:'5521964012249', email:'contato@gitapadm.com.br' };
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const groups = [
{id:'informatica',name:'Informática',icon:'monitor',description:'Equipamento ou acessório de informática.',items:['Computadores','Monitores','Notebooks','Mouses','Teclados','Webcams','Fones de ouvido','HDs','Estabilizadores','Placas','Cabos']},
{id:'impressao',name:'Impressão e papéis',icon:'print',description:'Material da categoria impressão e papéis.',items:['Impressoras','Cartuchos de tinta','Toners','Livros','Revistas','Jornais','Gibis','Papéis em geral']},
{id:'eletronicos',name:'Eletrônicos',icon:'phone',description:'Equipamento eletrônico listado para coleta.',items:['Celulares','Televisores','Videogames','Controles','Ventiladores','Micro-ondas','Eletrodomésticos','Peças eletrônicas em geral']},
{id:'outros',name:'Outros materiais',icon:'box',description:'Material adicional aceito no site original.',items:['Chapas de raio X','Brinquedos','Pequenos móveis','Roupas','Tapetes','Calçados','Quadros','Panelas','Louças','Resíduos sólidos secos']},
{id:'pilhas',name:'Pilhas e baterias',icon:'battery',description:'Para uso doméstico e eletrônico.',items:['Pilhas','Baterias portáteis']},
{id:'componentes',name:'Componentes',icon:'chip',description:'Componente eletrônico para destinação.',items:['Placas de circuito','Fontes de energia','Peças internas','Componentes eletrônicos diversos']},
{id:'midias',name:'Mídias e discos',icon:'disc',description:'Mídia física listada para coleta.',items:['CDs','DVDs','Vinis','Fitas cassete','VHS']}
];
const descriptions = {
'Computadores':'Computadores parados, obsoletos ou com defeito.','Monitores':'Monitores de computador fora de uso.','Notebooks':'Computadores portáteis sem uso.','Mouses':'Mouses de computador descartados.','Teclados':'Teclados que você já não utiliza.','Webcams':'Câmeras para uso em computadores.','Fones de ouvido':'Fones de ouvido fora de uso.','HDs':'Unidades de armazenamento de dados.','Estabilizadores':'Estabilizadores de equipamentos.','Placas':'Placas da categoria de informática.','Cabos':'Cabos de informática sem utilização.',
'Impressoras':'Equipamentos de impressão fora de uso.','Cartuchos de tinta':'Cartuchos de tinta descartados.','Toners':'Limite de até 10 por doador.','Livros':'Livros sem uso, conforme a lista original.','Revistas':'Revistas para destinação.','Jornais':'Jornais separados para coleta.','Gibis':'Histórias em quadrinhos impressas.','Papéis em geral':'Papéis listados na categoria de impressão.',
'Celulares':'Aparelhos celulares fora de uso.','Televisores':'Televisores descartados.','Videogames':'Consoles de jogos sem uso.','Controles':'Controles de equipamentos eletrônicos.','Ventiladores':'Ventiladores que já não são usados.','Micro-ondas':'Aparelhos de micro-ondas descartados.','Eletrodomésticos':'Consulte as exclusões e o porte.','Peças eletrônicas em geral':'Peças de equipamentos eletrônicos.',
'Chapas de raio X':'Chapas radiográficas listadas para coleta.','Brinquedos':'Brinquedos sem utilização.','Pequenos móveis':'Somente móveis de pequeno porte.','Roupas':'Roupas que você já não utiliza.','Tapetes':'Tapetes listados entre os materiais aceitos.','Calçados':'Calçados fora de uso.','Quadros':'Quadros listados para destinação.','Panelas':'Panelas que já não são usadas.','Louças':'Louças listadas entre os materiais aceitos.','Resíduos sólidos secos':'Confirme a composição com a equipe.',
'Pilhas':'Pilhas de uso doméstico e eletrônico.','Baterias portáteis':'Baterias portáteis domésticas e eletrônicas.','Placas de circuito':'Placas de circuito de eletrônicos.','Fontes de energia':'Fontes de alimentação de equipamentos.','Peças internas':'Peças internas de eletrônicos.','Componentes eletrônicos diversos':'Componentes listados no site original.',
'CDs':'Discos compactos fora de uso.','DVDs':'DVDs listados nas categorias eletrônicos e mídias.','Vinis':'Discos de vinil sem utilização.','Fitas cassete':'Fitas cassete listadas para coleta.','VHS':'Fitas VHS fora de uso.'
};
const materials = groups.flatMap(group => group.items.map(name => ({ name, group:group.id, category:group.name, icon:['Livros','Revistas','Jornais','Gibis','Papéis em geral'].includes(name)?'paper':group.icon, description:descriptions[name]||group.description })));
const materialMap = new Map(materials.map(m => [m.name,m]));
let activeGroup='all', expanded=false;
const limit=12, selected=new Set();
const filterArea=$('#filters'), grid=$('#material-grid');
[{id:'all',name:'Todos'},...groups].forEach(group => {
const button=document.createElement('button');button.type='button';button.className='filter';button.textContent=group.name;button.dataset.group=group.id;button.setAttribute('aria-pressed',String(group.id==='all'));filterArea.append(button);
});
function renderMaterials(){
 const query=normalize($('#material-search').value);
 const aliases={'computador':'computadores','notebook':'notebooks','mouse':'mouses','hd':'hds','tonner':'toners','tonners':'toners','toner':'toners','bateria':'baterias','microondas':'micro-ondas','televisao':'televisores','tv':'televisores','celular':'celulares','dvd':'dvds','cd':'cds'};
 const search=aliases[query]||query;
 const results=materials.filter(m => (activeGroup==='all'||m.group===activeGroup||(activeGroup==='eletronicos'&&m.name==='DVDs'))&&(!search||normalize(m.name+' '+m.category).includes(search)));
 const featured=['Computadores','Notebooks','Celulares','Televisores','Impressoras','Cabos','Pilhas','Baterias portáteis','Placas de circuito','Micro-ondas','DVDs','Toners'];
 if(activeGroup==='all'&&!query)results.sort((a,b)=>(featured.includes(a.name)?featured.indexOf(a.name):99)-(featured.includes(b.name)?featured.indexOf(b.name):99));
 const shown=expanded?results:results.slice(0,limit);
 grid.replaceChildren();
 shown.forEach(m=>{
 const button=document.createElement('button');button.type='button';button.className='material-card';button.dataset.material=m.name;
 button.innerHTML=icon(m.icon)+'<span class="card-arrow" aria-hidden="true">↗</span><h3></h3><p></p>';
 button.querySelector('h3').textContent=m.name;button.querySelector('p').textContent=m.description;button.setAttribute('aria-label',m.name+': ver detalhes');grid.append(button);
 });
 $('#catalogue-summary').textContent=results.length?'Mostrando '+shown.length+' de '+results.length+' materiais'+(query?' encontrados.':'.'):'Nenhum material encontrado.';
 $('#catalogue-empty').hidden=results.length!==0;
 $('#show-materials').hidden=results.length<=limit;
 $('#show-materials').setAttribute('aria-expanded',String(expanded));
 $('#show-materials').innerHTML=expanded?'Mostrar menos materiais': 'Ver todos os '+results.length+' materiais '+icon('arrow');
}
filterArea.addEventListener('click',event=>{const button=event.target.closest('[data-group]');if(!button)return;activeGroup=button.dataset.group;expanded=false;$$('#filters button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderMaterials();});
$('#material-search').addEventListener('input',()=>{expanded=false;renderMaterials();});
$('#show-materials').addEventListener('click',()=>{expanded=!expanded;renderMaterials();if(!expanded)$('#materiais').scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth'});});
renderMaterials();
$('#catalogue-interactive').hidden=false;
$('#complete-catalogue').open=false;
// Native dialogs preserve keyboard focus. Restore the exact opener on dismissal.
const detail=$('#detail-dialog'), privacy=$('#privacy-dialog');
let dialogOpener=null, currentMaterial=null;
function openDialog(dialog,opener){dialogOpener=opener||document.activeElement;dialog.showModal();document.body.classList.add('locked');dialog.querySelector('[data-close]').focus({preventScroll:true});}
[detail,privacy].forEach(dialog=>{
dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('locked');if(dialogOpener?.isConnected)dialogOpener.focus({preventScroll:true});});
});
grid.addEventListener('click',e=>{
const button=e.target.closest('[data-material]');if(!button)return;const material=materialMap.get(button.dataset.material);currentMaterial=material;
$('#detail-category').textContent=material.category;
$('#detail-title').textContent=material.name;
$('#detail-copy').textContent=material.description+' Este material consta na lista de coleta do site anterior da Gitap.adm. Informe as condições e a quantidade ao solicitar a retirada.';
let note='A coleta é realizada na sua casa ou empresa. A equipe confirma os itens e a disponibilidade antes da visita.';
if(material.name==='Toners')note='Limite publicado: até 10 toners por doador. Informe a quantidade exata na solicitação.';
if(material.name==='Eletrodomésticos'||material.name==='Pequenos móveis')note='Não são coletados materiais de grande porte, geladeiras, fogões ou máquinas de lavar. Confirme as dimensões e o item com a equipe.';
if(material.name==='Resíduos sólidos secos')note='A descrição original é ampla. Confirme a composição com a equipe. Materiais perigosos e óleo não são aceitos.';
if(material.name==='Chapas de raio X')note='Chapas de raio X estão expressamente listadas no site original. Confirme com a equipe as condições de entrega; não amplie essa categoria para outros resíduos de saúde.';
$('#detail-note').textContent=note;$('#detail-add').hidden=false;$('#detail-add').disabled=false;$('#detail-add').innerHTML=selected.has(material.name)?'Já adicionado · ir para agendamento': 'Adicionar à coleta '+icon('arrow');openDialog(detail,button);
});
$('#detail-add').addEventListener('click',()=>{
if(!currentMaterial)return;
const input=$('#equipment');
if(!selected.has(currentMaterial.name)){input.value=input.value.trim()?input.value.trim()+', '+currentMaterial.name:currentMaterial.name;selected.add(currentMaterial.name);}
$('#selected-help').textContent=selected.size+' tipo(s) selecionado(s). Ajuste os itens e as quantidades conforme necessário.';
dialogOpener=input;detail.close();$('#agendamento').scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth'});
});
$('#detail-schedule').addEventListener('click',()=>{dialogOpener=$('#name');detail.close();});
const services={
coleta:{title:'Coleta de lixo eletrônico',copy:'Recolhimento de equipamentos eletrônicos descartados, como computadores, celulares e televisores. A equipe vai até a casa ou empresa no local e na data combinados.',note:'Consulte a lista de materiais aceitos e informe quantidade, condições e endereço para confirmar a retirada.'},
descarte:{title:'Descarte sustentável',copy:'O site anterior descreve a desmontagem e separação dos materiais, com o objetivo de evitar o descarte inadequado e proteger o solo e a água.',note:'A destinação depende do tipo e das condições do material. Consulte a equipe sobre os detalhes aplicáveis à sua coleta.'},
reciclagem:{title:'Reciclagem e reaproveitamento',copy:'Reaproveitamento de metais e componentes eletrônicos, contribuindo para a economia circular. O texto institucional também apresenta recondicionamento e reutilização para prolongar a vida útil dos produtos.',note:'Não há promessa de recuperação de todos os equipamentos. A avaliação considera o estado e as possibilidades de reaproveitamento de cada material.'}
};
$$('[data-service]').forEach(button=>button.addEventListener('click',()=>{
const service=services[button.dataset.service];currentMaterial=null;$('#detail-category').textContent='Serviços Gitap.adm';$('#detail-title').textContent=service.title;$('#detail-copy').textContent=service.copy;$('#detail-note').textContent=service.note;$('#detail-add').hidden=true;openDialog(detail,button);
}));
$('#privacy-open').addEventListener('click',e=>openDialog(privacy,e.currentTarget));
// Progressive navigation.
const menu=$('#mobile-nav'),toggle=$('#menu-toggle');
function closeMenu(focus=false){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');if(focus)toggle.focus();}
toggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden)closeMenu(true);});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header')&&!menu.hidden)closeMenu();});
matchMedia('(min-width:1024px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
let scrollFrame=0;
function scrollState(){const max=document.documentElement.scrollHeight-innerHeight;$('.progress').style.transform='scaleX('+(max>0?Math.min(1,Math.max(0,scrollY/max)):0)+')';$('.site-header').classList.toggle('scrolled',scrollY>15);$('#back-top').hidden=scrollY<650;scrollFrame=0;}
addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(scrollState);},{passive:true});addEventListener('resize',scrollState);scrollState();
$('#year').textContent=new Date().getFullYear();
// Entry motion and counters are enhancements: static content is available first.
const countFrames=new Map();
function finishCount(element){const decimals=Number(element.dataset.decimals||0);element.textContent=Number(element.dataset.count).toLocaleString('pt-BR',{maximumFractionDigits:decimals,minimumFractionDigits:decimals,useGrouping:element.dataset.group!=='false'});const frame=countFrames.get(element);if(frame)cancelAnimationFrame(frame);countFrames.delete(element);}
function animateCount(element){
if(reduceMotion.matches){finishCount(element);return;}
const target=Number(element.dataset.count),start=performance.now(),decimals=Number(element.dataset.decimals||0);
function tick(time){const progress=Math.min((time-start)/1300,1);const value=target*(1-Math.pow(1-progress,3));element.textContent=value.toLocaleString('pt-BR',{minimumFractionDigits:decimals,maximumFractionDigits:decimals,useGrouping:element.dataset.group!=='false'});if(progress<1)countFrames.set(element,requestAnimationFrame(tick));else finishCount(element);}
countFrames.set(element,requestAnimationFrame(tick));
}
if('IntersectionObserver' in window){
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('waiting');revealObserver.unobserve(entry.target);}}),{threshold:.08});
$$('.reveal').forEach(element=>{if(!reduceMotion.matches)element.classList.add('waiting');revealObserver.observe(element);});
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){animateCount(entry.target);counterObserver.unobserve(entry.target);}}),{threshold:.5});$$('[data-count]').forEach(element=>counterObserver.observe(element));
}
// One-pass typewriter. The full title reserves layout and is available to assistive technology.
const typewriter=$('#typewriter'),letters=Array.from(typewriter.querySelector('.reserve').textContent);
let typeFrame=0,typeStart=0;
function finishTyping(){cancelAnimationFrame(typeFrame);typewriter.classList.remove('typing');typewriter.querySelector('.typed').textContent='';}
function typeTick(time){if(!typeStart)typeStart=time;const count=Math.min(letters.length,Math.floor((time-typeStart)/65));typewriter.querySelector('.typed').textContent=letters.slice(0,count).join('');if(count<letters.length)typeFrame=requestAnimationFrame(typeTick);else finishTyping();}
if(!reduceMotion.matches){setTimeout(()=>{if(!reduceMotion.matches&&!document.hidden){typewriter.classList.add('typing');typeFrame=requestAnimationFrame(typeTick);}},1300);}
// Small canvas leaves, suspended outside the hero or when motion is disabled.
const canvas=$('#particles'),ctx=canvas.getContext('2d');let canvasFrame=0,lastTime=0,heroVisible=true,motionPaused=false,canvasWidth=0,canvasHeight=0;
const leaves=Array.from({length:22},()=>({x:Math.random(),y:Math.random(),size:2+Math.random()*3,speed:.007+Math.random()*.01,angle:Math.random()*Math.PI}));
function resizeCanvas(){const rect=$('.hero').getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);canvasWidth=rect.width;canvasHeight=rect.height;canvas.width=rect.width*dpr;canvas.height=rect.height*dpr;if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);}
function drawLeaves(time){if(!ctx)return;const dt=Math.min((time-(lastTime||time))/1000,.05);lastTime=time;ctx.clearRect(0,0,canvasWidth,canvasHeight);for(const leaf of leaves){leaf.y=(leaf.y+leaf.speed*dt)%1;ctx.save();ctx.translate(leaf.x*canvasWidth,leaf.y*canvasHeight);ctx.rotate(leaf.angle+time*.00007);ctx.fillStyle='#57905a';ctx.beginPath();ctx.ellipse(0,0,leaf.size,leaf.size*.4,0,0,Math.PI*2);ctx.fill();ctx.restore();}canvasFrame=requestAnimationFrame(drawLeaves);}
function updateMotion(){const stopped=motionPaused||reduceMotion.matches||document.hidden||!heroVisible;document.body.classList.toggle('paused',stopped);cancelAnimationFrame(canvasFrame);canvasFrame=0;lastTime=0;if(!stopped&&ctx)canvasFrame=requestAnimationFrame(drawLeaves);else if(ctx)ctx.clearRect(0,0,canvasWidth,canvasHeight);}
$('#motion-toggle').addEventListener('click',()=>{motionPaused=!motionPaused;$('#motion-toggle').setAttribute('aria-pressed',String(motionPaused));$('#motion-toggle span').textContent=motionPaused?'Retomar animação':'Pausar animação';updateMotion();});
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;updateMotion();}).observe($('.hero'));
addEventListener('resize',resizeCanvas);resizeCanvas();updateMotion();
// Carousel pauses while hovered, focused, offscreen, hidden, or on explicit request.
const slides=$$('#testimonial-slides .testimonial'),carousel=$('#carousel');let slideIndex=0,carouselPaused=reduceMotion.matches,carouselVisible=false,hovered=false,focused=false,carouselTimer=0;
function showSlide(index,manual=false){slideIndex=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==slideIndex);$$('[data-slide]').forEach((dot,i)=>dot.setAttribute('aria-current',String(i===slideIndex)));if(manual)$('#slide-status').textContent='Depoimento demonstrativo '+(slideIndex+1)+' de '+slides.length;updateCarousel();}
function updateCarousel(){clearInterval(carouselTimer);if(!carouselPaused&&!reduceMotion.matches&&!document.hidden&&carouselVisible&&!hovered&&!focused)carouselTimer=setInterval(()=>showSlide(slideIndex+1),6500);}
function pauseLabel(){$('#carousel-pause').setAttribute('aria-pressed',String(carouselPaused));$('#carousel-pause').textContent=carouselPaused?'Retomar carrossel':'Pausar carrossel';}
$('#prev-slide').addEventListener('click',()=>showSlide(slideIndex-1,true));$('#next-slide').addEventListener('click',()=>showSlide(slideIndex+1,true));$$('[data-slide]').forEach(dot=>dot.addEventListener('click',()=>showSlide(Number(dot.dataset.slide),true)));
$('#carousel-pause').addEventListener('click',()=>{carouselPaused=!carouselPaused;pauseLabel();updateCarousel();});
carousel.addEventListener('mouseenter',()=>{hovered=true;updateCarousel();});carousel.addEventListener('mouseleave',()=>{hovered=false;updateCarousel();});carousel.addEventListener('focusin',()=>{focused=true;updateCarousel();});carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget)){focused=false;updateCarousel();}});
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{carouselVisible=entries[0].isIntersecting;updateCarousel();},{threshold:.15}).observe(carousel);else carouselVisible=true;
pauseLabel();updateCarousel();
document.addEventListener('visibilitychange',()=>{if(document.hidden){finishTyping();countFrames.forEach((frame,element)=>finishCount(element));}updateMotion();updateCarousel();});
reduceMotion.addEventListener('change',()=>{if(reduceMotion.matches){finishTyping();countFrames.forEach((frame,element)=>finishCount(element));$$('.waiting').forEach(e=>e.classList.remove('waiting'));carouselPaused=true;pauseLabel();}$('#motion-toggle').hidden=reduceMotion.matches;updateMotion();updateCarousel();});
$('#motion-toggle').hidden=reduceMotion.matches;
// No backend or automatic confirmation. The visitor reviews and sends through their chosen channel.
const form=$('#collection-form'),status=$('#form-status');
function prepareRequest(){
$$('#collection-form input').forEach(input=>{if(input.type!=='number')input.value=input.value.trim();});
if(!form.reportValidity())return null;
const message=['Olá, Gitap.adm! Gostaria de solicitar uma coleta.','','Nome: '+$('#name').value,'Local: '+$('#location-type').value,'Endereço: '+$('#address').value,'Materiais: '+$('#equipment').value,'Quantidade estimada: '+$('#quantity').value+' unidade(s)', $('#message').value.trim()?'Mensagem: '+$('#message').value.trim():'','', 'Podemos confirmar os materiais, a disponibilidade e uma data para a retirada?'].filter(line=>line!==null).join('\n');
return message;
}
function showStatus(message,href,label){status.replaceChildren();const p=document.createElement('p');p.textContent=message;status.append(p);if(href){const link=document.createElement('a');link.href=href;link.textContent=label;link.target='_blank';link.rel='noopener noreferrer';status.append(link);}status.hidden=false;}
form.addEventListener('submit',e=>{e.preventDefault();const message=prepareRequest();if(!message)return;const url='https://wa.me/'+CONTACT.whatsapp+'?text='+encodeURIComponent(message);window.open(url,'_blank','noopener,noreferrer');showStatus('Sua solicitação foi preparada. Revise e envie no WhatsApp; a coleta só será confirmada pela equipe. Se a nova aba não abriu, use o link abaixo.',url,'Abrir minha solicitação no WhatsApp ↗');});
$('#email-request').addEventListener('click',()=>{const message=prepareRequest();if(!message)return;const url='mailto:'+CONTACT.email+'?subject='+encodeURIComponent('Solicitação de coleta — Gitap.adm')+'&body='+encodeURIComponent(message);showStatus('Solicitação preparada para e-mail. Abra o link abaixo no seu aplicativo de e-mail, revise e envie. A equipe confirmará a visita.',url,'Abrir solicitação no e-mail ↗');});
$('#copy-request').addEventListener('click',async()=>{const message=prepareRequest();if(!message)return;try{if(!navigator.clipboard)throw new Error('clipboard unavailable');await navigator.clipboard.writeText(message);showStatus('Solicitação copiada. Cole no WhatsApp ou e-mail da Gitap.adm e revise antes de enviar.');}catch{showStatus('Selecione e copie a solicitação abaixo para enviar à equipe.');const text=document.createElement('textarea');text.readOnly=true;text.value=message;text.setAttribute('aria-label','Solicitação preparada para copiar');text.className='request-preview';status.append(text);text.focus();text.select();}});
})();
