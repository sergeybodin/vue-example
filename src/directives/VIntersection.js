export default {
    name: 'intersection',
    mounted(el, binding) {
        const options = {
          rootMargin: '0px',
          threshold: 1.0
        };
        const callback = (entries, observer) => {
          if(entries[0].isIntersecting) {
            binding.value()
          }
        }
        (new IntersectionObserver(callback, options)).observe(el);
    }
}
