const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) lenis.scrollTo(target, { offset: -60 });
  });
});

const cursorVideo = document.createElement('video');
cursorVideo.id = 'cursor-video';
cursorVideo.muted = true;
cursorVideo.loop = true;
cursorVideo.playsInline = true;
cursorVideo.preload = 'auto';
document.body.appendChild(cursorVideo);

let currentSection = null;
let leaveTimeout;

document.querySelectorAll('.project-section').forEach(section => {
  const vidEl = section.querySelector('.project-video');
  if (!vidEl) return;
  const videoSrc = vidEl.getAttribute('src');

  section.addEventListener('mouseenter', () => {
    if (!videoSrc) return;
    clearTimeout(leaveTimeout);
    currentSection = section;
    cursorVideo.src = videoSrc;
    cursorVideo.currentTime = 0;
    cursorVideo.load();
    cursorVideo.play().catch(() => {});
    cursorVideo.style.transition = 'none';
    cursorVideo.style.opacity = '0';
    requestAnimationFrame(() => {
      cursorVideo.style.transition = 'opacity 2s ease';
      cursorVideo.style.opacity = '1';
    });
  });

  section.addEventListener('mousemove', (e) => {
    if (currentSection !== section) return;
    cursorVideo.style.left = (e.clientX + 20) + 'px';
    cursorVideo.style.top = (e.clientY + 20) + 'px';
  });

  section.addEventListener('mouseleave', () => {
    currentSection = null;
    cursorVideo.style.transition = 'opacity 0.3s ease';
    cursorVideo.style.opacity = '0';
    leaveTimeout = setTimeout(() => { cursorVideo.pause(); cursorVideo.src = ''; }, 300);
  });
});

// Mobile: autoplay PiP video
if (window.innerWidth <= 768) {
  document.querySelectorAll('.project-section').forEach(section => {
    const video = section.querySelector('.project-video');
    if (!video) return;
    section.classList.add('active');
    video.play().catch(() => {});
  });
}
