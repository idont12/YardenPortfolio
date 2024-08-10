// animationUtils.js
export const start = () => {
    const the_animation = document.getElementsByClassName('have-scroll-animation');
    for (let i = 0; i < the_animation.length; i++) {
      let el = the_animation[i];
      el.classList.remove('active-enter-animation');
      observer.observe(el);
    }
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-enter-animation');
      } else if (chackAnimationCondition(entry.target, false)) {
        entry.target.classList.remove('active-enter-animation');
      }
    });
  });
  
  const chackAnimationCondition = (object, isAddingAnimation) => {
    let canChangeAnimation = true;
    if (!isAddingAnimation) {
      canChangeAnimation = !object.classList.contains('loop-Once-animation');
    }
    return canChangeAnimation;
  };
  
  export default start;