function loadIncludes() {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    fetch(el.getAttribute('data-include'))
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadIncludes();

  // ✅ Mobile Menu Toggle
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  // ✅ Hero Section Slider
  const hero = document.getElementById('hero');
  const heroText = document.getElementById('hero-text');
  const heroDots = document.getElementById('hero-dots');

  const slides = [
    { image: 'MCNL-Home-Banner-1.jpg', text: 'A PAN AFRICAN ENERGY SERVICES COMPANY' },
    { image: 'MCNL-Home-Banner-2.jpg', text: '30+ YEARS OF EXPERIENCE IN PROVIDING ENGINEERING & TECHNICAL SERVICES' },
    { image: 'MCNL-Home-Banner-3.jpg', text: 'MAINTAINED TECHNICAL PARTNERSHIP WITH DORIS ENGINEERING FOR OVER 10 YEARS' },
    { image: 'MCNL-Home-Banner-4.jpg', text: 'OPERATING IN GHANA SINCE 2007' }
  ];

  let currentSlide = 0;

  function showSlide(index) {
    const { image, text } = slides[index];
    if (hero) hero.style.backgroundImage = `url('${image}')`;
    if (heroText) heroText.innerHTML = `<h2>${text}</h2>`;
    if (heroDots) {
      document.querySelectorAll('#hero-dots span').forEach(dot => dot.classList.remove('active'));
      if (heroDots.children[index]) heroDots.children[index].classList.add('active');
    }
  }

  if (heroDots) {
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
      heroDots.appendChild(dot);
    });
  }

  const nextBtn = document.getElementById('nextSlide');
  const prevBtn = document.getElementById('prevSlide');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 7000);

  showSlide(currentSlide);

  // ✅ Business Units Section
  const units = [
    {
      title: 'Engineering Design',
      text: 'We have expertise in delivering multifarious engineering design solutions such as Piping and pipeline, Mechanical, Process, Instrument & Control, Electrical, and Civil/Structural to oil and gas, power, and public sectors.',
      image: 'SBU-Engineering-Design.jpg'
    },
    {
      title: 'Oilfield Supply & Services',
      text: 'MCNL offers comprehensive fabrication capabilities spanning various aspects such as piping, civil work, structural, steel, and module prefabrication for both offshore and onshore facilities...',
      image: 'SBU-Oilfield-Supply-Services.jpg'
    },
    {
      title: 'Technical Services',
      text: 'Our technical service proficiency encompasses technical support, engineering management, project oversight, inspection, subcontractor documentation management, procurement, and materials expediting.',
      image: 'SBU-Technical-Services.jpg'
    },
    {
      title: "Environmental & Laboratory Services",
      text: "Our company offers comprehensive Environmental & Laboratory services, including Waste Management, Remediation, Environmental Quality Compliance Monitoring, and an Environmental Laboratory...",
      image: "SBU-Environmental-Laboratory-Services.jpg"
    },
    {
      title: "Power & Renewable Energy Services",
      text: "MCNL offers end-to-end engineering, construction, and EPC services for power generation facilities, transmission & distribution infrastructure, and diverse energy solutions...",
      image: "SBU-Power-Renewable-Energy-Services.jpg"
    }
  ];

  const listItems = document.querySelectorAll(".unit-list li");
  const display = document.getElementById("unit-display");
  let unitIndex = 0;

  function showUnit(index) {
    const unit = units[index];
    if (display) {
      display.style.backgroundImage = `url('${unit.image}')`;
      display.innerHTML = `
        <div class="unit-content">
          <h3>${unit.title}</h3>
          <p>${unit.text}</p>
        </div>
      `;
    }

    document.querySelectorAll('.unit-list li').forEach(li => li.classList.remove('active'));
    const activeLi = document.querySelector(`.unit-list li[data-index="${index}"]`);
    if (activeLi) activeLi.classList.add('active');
  }

  listItems.forEach(item => {
    item.addEventListener("click", () => {
      const i = parseInt(item.dataset.index);
      if (!isNaN(i)) {
        unitIndex = i;
        showUnit(unitIndex);
      }
    });
  });

  setInterval(() => {
    unitIndex = (unitIndex + 1) % units.length;
    showUnit(unitIndex);
  }, 6000);

  showUnit(unitIndex);
});
