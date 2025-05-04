document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.closest(".content-box");
      const extra = section.querySelector(".extra-content");

      if (!section || !extra) return;

      if (btn.classList.contains("close")) {
        extra.style.display = "none";
        section.querySelector(".toggle-button:not(.close)").style.display = "inline-block";
      } else {
        extra.style.display = "block";
        btn.style.display = "none";
      }
    });
  });
});
