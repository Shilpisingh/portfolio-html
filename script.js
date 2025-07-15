// Reveal animations on scroll
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

const animatedItems = document.querySelectorAll(".animate");

const animateOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

animatedItems.forEach((item) => {
  animateOnScroll.observe(item);
});
// theme
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

//experinec
async function loadExperience() {
  const res = await fetch("./data/experience.json");
  const data = await res.json();

  const timeline = document.getElementById("timeline");

  data.forEach((item, index) => {
    const side = index % 2 === 0 ? "left" : "right";
    const li = document.createElement("div");
    li.className = `timeline-item ${side}`;

    li.innerHTML = `
      <div class="timeline-content">
        <h3>${item.title} @ ${item.company}</h3>
        <span class="date">${item.date}</span>
        <ul>
          ${item.details.map((detail) => `<li>${detail}</li>`).join("")}
        </ul>
      </div>
    `;

    timeline.appendChild(li);
  });
}

loadExperience();

window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scroll-progress");
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  scrollProgress.style.width = `${progress}%`;
});
