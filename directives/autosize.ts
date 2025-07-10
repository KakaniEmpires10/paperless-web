export default {
  mounted(el: HTMLTextAreaElement) {
    const resize = () => {
      el.style.height = "auto";
      el.style.overflow = "hidden";
      el.style.height = el.scrollHeight + "px";
    };

    el.addEventListener("input", resize);

    resize();
  },
  beforeUnmount(el: HTMLTextAreaElement) {
    el.removeEventListener("input", () => {});
  },
};
