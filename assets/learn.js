/* Learn tab — scrollytelling driver (scoped to #learn) */
(function(){
  var root = document.getElementById('learn');
  if(!root) return;

  // dense hourly ticks for the year-dissection banner
  var t = root.querySelector('#ticks');
  if(t){
    var s='';
    for(var x=150;x<=884;x+=6){ var h=8+Math.random()*20; s+='<line x1="'+x+'" y1="72" x2="'+x+'" y2="'+(72-h).toFixed(0)+'"/>'; }
    t.innerHTML=s;
  }

  var scene = root.querySelector('#scene');
  if(!scene) return;
  var layers = [].slice.call(scene.querySelectorAll('[data-step]'));
  var bars   = [].slice.call(root.querySelectorAll('#detail .stackbar'));
  var panels = [].slice.call(root.querySelectorAll('#detail .dpanel'));
  var steps  = [].slice.call(root.querySelectorAll('#steps .step'));

  function inList(list,n){ return (' '+list+' ').indexOf(' '+n+' ') > -1; }

  function setStep(n){
    layers.forEach(function(l){ l.classList.toggle('on',(+l.dataset.step)<=n); });
    panels.forEach(function(p){ p.classList.toggle('on', inList(p.dataset.d, n)); });
    bars.forEach(function(b){ b.classList.toggle('on', n===5); });
    steps.forEach(function(st){ var on=(+st.dataset.s)===n; st.classList.toggle('on',on); st.classList.toggle('dim',!on); });
  }

  if(!('IntersectionObserver' in window)){ setStep(5); return; }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting) setStep(+e.target.dataset.s); });
  }, {rootMargin:'-45% 0px -45% 0px', threshold:0});
  steps.forEach(function(st){ io.observe(st); });
  setStep(0);
})();
