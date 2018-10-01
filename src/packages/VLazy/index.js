import Vue from 'vue';

Vue.directive('lazy', {
  bind: (el, binding) => {
    console.log(el);
    let img = new Image();
    img.src = binding.value;

    img.onload = () => {
      el.src = img.src;
      fadeIn(el);
    }
  }
});


function fadeIn(el) {
  el.style.opacity = 0;
  el.style.display = 'block';

  (function fadeIn() {
    let val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      setTimeout(fadeIn, 40);
    }
  })();
}