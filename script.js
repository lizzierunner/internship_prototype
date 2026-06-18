function wireForm(formId, emailId, confirmId){
  var form=document.getElementById(formId);
  var email=document.getElementById(emailId);
  var confirm=document.getElementById(confirmId);
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!email.value || !email.checkValidity()){ email.focus(); email.reportValidity&&email.reportValidity(); return; }
    form.style.display='none';
    confirm.classList.add('show');
  });
}
wireForm('hero-form','hero-email','hero-confirm');
wireForm('cta-form','cta-email','cta-confirm');

// ---- scroll progress bar ----
var prog = document.getElementById('progress');
window.addEventListener('scroll', function(){
  var s = document.documentElement.scrollTop;
  var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if(prog) prog.style.width = (h > 0 ? (s / h * 100) : 0) + '%';
}, {passive: true});

// ---- cursor glow (fine-pointer devices only) ----
var glow = document.getElementById('cursor-glow');
if(glow && window.matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove', function(e){
    glow.style.transform = 'translate(' + (e.clientX - 250) + 'px,' + (e.clientY - 250) + 'px)';
  }, {passive: true});
}

// ---- scroll-triggered reveals ----
if('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
} else {
  document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); });
}

// ---- 13× counter animation ----
(function(){
  var counterEl = document.querySelector('.x13');
  if(!counterEl) return;
  var counted = false;
  var heroObs = new IntersectionObserver(function(entries){
    if(!counted && entries[0].isIntersecting){
      counted = true;
      var current = 0, target = 13, fps = 60, duration = 900;
      var increment = target / (duration / (1000 / fps));
      var id = setInterval(function(){
        current = Math.min(current + increment, target);
        counterEl.textContent = Math.round(current) + '×';
        if(current >= target) clearInterval(id);
      }, 1000 / fps);
      heroObs.disconnect();
    }
  }, {threshold: 0.5});
  heroObs.observe(document.querySelector('.hero'));
})();
