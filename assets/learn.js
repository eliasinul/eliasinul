/* Learn tab — no sticky scrolling. Only a ticks generator + a safe reveal-on-view. */
(function(){
  var root = document.getElementById('learn');
  if(!root) return;

  // dense hourly ticks for the year-dissection banner (Part C)
  var t = root.querySelector('#ticks');
  if(t){
    var s='';
    for(var x=150;x<=884;x+=6){ var h=8+Math.random()*20; s+='<line x1="'+x+'" y1="72" x2="'+x+'" y2="'+(72-h).toFixed(0)+'"/>'; }
    t.innerHTML=s;
  }

  // reveal-on-view: opacity/transform only, so it can never affect layout or overlap.
  // Marking the root with .reveal-on means no-JS users still see everything.
  var rev = [].slice.call(root.querySelectorAll('.reveal'));
  if(!rev.length) return;
  if(!('IntersectionObserver' in window)){ return; } // leave everything visible

  root.classList.add('reveal-on');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {rootMargin:'0px 0px -8% 0px', threshold:0.08});
  rev.forEach(function(el){ io.observe(el); });
})();
