const StickyHeaderInitiator = {
  init(header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('bg-primary', window.scrollY > 0);
    });
  },
};
export default StickyHeaderInitiator;
