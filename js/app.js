const btn = document.querySelector('.btn'),
      hiddens = document.querySelectorAll('.hidden'),
      h3 = document.querySelector('.main-text');

btn.onclick = function() {
    // hiddens.map(hidden => hidden.classList.remove('hidden') )
    console.log('click');
    hiddens.forEach(hidden => {
        hidden.classList.remove('hidden') 
    });
    btn.classList.add('hidden');
    h3.classList.add('hidden');
}