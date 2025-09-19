// Mobile nav toggle + footer year
    (function(){
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.getElementById('nav-menu');
        if(toggle && menu){
          toggle.addEventListener('click', ()=>{
            const open = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
          });
        }
        const y = document.getElementById('year');
        if(y) y.textContent = new Date().getFullYear();
      })();