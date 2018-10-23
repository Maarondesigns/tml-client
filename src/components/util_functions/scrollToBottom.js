export function scrollToBottom() {
  if (window.innerWidth < 500) {
    setTimeout(() => {
      let interval = setInterval(() => {
        window.scrollTo(window.scrollY, window.scrollY + 2);
      }, 4);

      setTimeout(() => {
        clearInterval(interval);
      }, 200);
    }, 1200);
  }
}
