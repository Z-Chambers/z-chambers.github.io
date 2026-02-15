// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Scroll reveal (IntersectionObserver) =====
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((el) => io.observe(el));

// ===== Tabs (Projects categories) =====
const tabs = document.querySelectorAll(".tabs .tab");
const panels = document.querySelectorAll(".tabpanels .panel");
const tabIndicator = document.querySelector(".tab-indicator");

function moveTabIndicator(activeBtn){
  if (!tabIndicator || !activeBtn) return;

  const parentRect = activeBtn.parentElement.getBoundingClientRect();
  const rect = activeBtn.getBoundingClientRect();

  tabIndicator.style.width = rect.width + "px";
  tabIndicator.style.transform =
    `translateX(${rect.left - parentRect.left}px)`;
}

// Init indicator
moveTabIndicator(document.querySelector(".tabs .tab.active"));

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.tab;

    // Activate clicked tab
    tabs.forEach(t => t.classList.toggle("active", t === btn));

    // Show matching panel
    panels.forEach(p =>
      p.classList.toggle("active", p.dataset.panel === key)
    );

    moveTabIndicator(btn);

    // ❌ Removed auto-scroll
  });
});

// Recalculate indicator on resize
window.addEventListener("resize", () => {
  moveTabIndicator(document.querySelector(".tabs .tab.active"));
});


window.addEventListener("resize", () => {
  const activeTab = document.querySelector(".tabs .tab.active");
  if (activeTab) moveTabIndicator(activeTab);
});

// ===== Nav active state =====
const navLinks = document.querySelectorAll(".navlink");
const sectionIds = ["home", "about", "tools", "work", "contact"];

function setActiveNav(id) {
  navLinks.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === `#${id}`)
  );
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  },
  { threshold: 0.45 }
);

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// ===== Tooltips for toolbox =====
const tooltip = document.getElementById("tooltip");
const toolBtns = document.querySelectorAll(".tool");

function showTip(e, text) {
  if (!tooltip) return;
  tooltip.textContent = text;
  tooltip.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`;
}
function hideTip() {
  if (!tooltip) return;
  tooltip.style.transform = "translate(-9999px, -9999px)";
}

toolBtns.forEach((btn) => {
  const tip = btn.getAttribute("data-tip");
  btn.addEventListener("mousemove", (e) => showTip(e, tip));
  btn.addEventListener("mouseleave", hideTip);
});

// ===== Demo send button =====
const fakeSend = document.getElementById("fakeSend");
fakeSend?.addEventListener("click", () => {
  fakeSend.textContent = "Sent ✓";
  fakeSend.disabled = true;
  setTimeout(() => {
    fakeSend.textContent = "Send message";
    fakeSend.disabled = false;
  }, 1600);
});
