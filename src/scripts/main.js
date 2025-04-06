// Theme initialization
document.documentElement.setAttribute(
  "data-theme",
  localStorage.getItem("theme") || "light"
);

// Menu dialog handling
const menuDialog = document.querySelector("#menu-dialog");
const closeButton = document.querySelector(".close-dialog");
const hamburgerButton = document.querySelector(".hamburger");

if (menuDialog) {
  if (menuDialog.hasAttribute("open")) {
    menuDialog.close();
  }

  hamburgerButton?.addEventListener("click", () => {
    menuDialog.showModal();
  });

  closeButton?.addEventListener("click", () => {
    menuDialog.close();
  });
}

const themeSwitch = document.querySelector(".switch");
if (themeSwitch) {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  themeSwitch.setAttribute("aria-checked", currentTheme === "dark");

  themeSwitch.addEventListener("click", () => {
    const isChecked = themeSwitch.getAttribute("aria-checked") === "true";
    const newTheme = !isChecked ? "dark" : "light";

    themeSwitch.setAttribute("aria-checked", !isChecked);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

const projectImages = document.querySelectorAll(".project-detail__image");
const imagePopover = document.querySelector("#image-popover");

if (projectImages.length > 0 && imagePopover) {
  projectImages.forEach((img) => {
    img.addEventListener("click", () => {
      const popoverImg = imagePopover.querySelector(".image-popover__img");
      popoverImg.src = img.src;
      popoverImg.alt = img.alt;
      imagePopover.showPopover();

      imagePopover.addEventListener("keydown", (e) => {
        if (e.key === "Escape") imagePopover.hidePopover();
      });
    });
  });

  imagePopover.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      e.target.hidePopover();
    }
  });
}

document.querySelectorAll(".breadcrumb__link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (!document.startViewTransition) return;

    e.preventDefault();
    const href = link.getAttribute("href");

    document.startViewTransition(() => {
      window.location.href = href;
    });
  });
});
