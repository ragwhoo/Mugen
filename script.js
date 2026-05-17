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

document.querySelectorAll('.project-section').forEach(section => {
  const video = section.querySelector('.project-video');
  if (!video) return;

  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => {
      section.classList.add('active');
      video.currentTime = 0;
      video.play().catch(() => {});
    },
    onLeave: () => {
      section.classList.remove('active');
      video.pause();
    },
    onEnterBack: () => {
      section.classList.add('active');
      video.currentTime = 0;
      video.play().catch(() => {});
    },
    onLeaveBack: () => {
      section.classList.remove('active');
      video.pause();
    }
  });
});
