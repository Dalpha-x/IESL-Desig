function loadIncludes(callback) {
  const includes = document.querySelectorAll('[data-include]');
  let loaded = 0;

  if (includes.length === 0 && typeof callback === 'function') {
    callback();
    return;
  }

  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) throw new Error(`Could not load ${file}`);
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;
          loaded++;
          if (loaded === includes.length && typeof callback === 'function') {
            callback();
          }
        })
        .catch(error => console.error(error));
    }
  });
}

function setupSiteFeatures() {
  // 🔸 Hamburger Menu Toggle
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  // 🔸 Hero Section
  const hero = document.getElementById('hero');
  const heroText = document.getElementById('hero-text');
  const heroDots = document.getElementById('hero-dots');

  const slides = [
    { image: 'MCNL-Home-Banner-1.jpg', text: 'A PAN AFRICAN ENERGY SERVICES COMPANY' },
    { image: 'MCNL-Home-Banner-2.jpg', text: '30+ YEARS OF EXPERIENCE IN PROVIDING ENGINEERING & TECHNICAL SERVICES' },
    { image: 'MCNL-Home-Banner-3.jpg', text: 'MAINTAINED TECHNICAL PARTNERSHIP WITH DORIS ENGINEERING FOR OVER 10 YEARS' },
    { image: 'MCNL-Home-Banner-4.jpg', text: 'OPERATING IN NIGERIA SINCE 1992' }
  ];

  let currentSlide = 0;

  function showSlide(index) {
    if (!hero || !heroText || !heroDots) return;
    const { image, text } = slides[index];
    hero.style.backgroundImage = `url('${image}')`;
    heroText.innerHTML = `<h2>${text}</h2>`;
    document.querySelectorAll('.hero-dots span').forEach(dot => dot.classList.remove('active'));
    heroDots.children[index].classList.add('active');
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

  if (document.getElementById('nextSlide')) {
    document.getElementById('nextSlide').addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (document.getElementById('prevSlide')) {
    document.getElementById('prevSlide').addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 7000);

  showSlide(currentSlide);

  // 🔸 Business Units Section
  const units = [
    {
      title: 'Engineering Design',
      text: 'We have expertise in delivering multifarious engineering design solutions such as Piping and pipeline, Mechanical, Process, Instrument & Control, Electrical, and Civil/Structural to oil and gas, power, and public sectors.',
      image: 'SBU-Engineering-Design.jpg'
    },
    {
      title: 'Oilfield Supply & Services',
      text: 'MCNL offers comprehensive fabrication capabilities spanning various aspects such as piping, civil work, structural, steel, and module prefabrication for both offshore and onshore facilities, complemented by our specialized expertise in supply chain management, integrated operations and maintenance, system upgrades, commissioning, and installation services, all supported by our skilled personnel catering to the diverse maintenance and operational requirements of our clients across offshore and onshore installations.',
      image: 'SBU-Oilfield-Supply-Services.jpg'
    },
    {
      title: 'Technical Services',
      text: 'Our technical service proficiency encompasses technical support, engineering management, project oversight, inspection, subcontractor documentation management, procurement, and materials expediting.',
      image: 'SBU-Technical-Services.jpg'
    },
    {
      title: "Environmental & Laboratory Services",
      text: "Our company offers comprehensive Environmental & Laboratory services, including Waste Management, Remediation, Environmental Quality Compliance Monitoring, and an Environmental Laboratory, catering to the needs of both the Oil and Gas Industry and manufacturing companies. Our state-of-the-art environmental laboratory is located in Port Harcourt, River State, Nigeria.",
      image: "SBU-Environmental-Laboratory-Services.jpg"
    },
    {
      title: "Power & Renewable Energy Services",
      text: "MCNL offers end-to-end engineering, construction, and EPC services for power generation facilities, transmission & distribution infrastructure, and a diverse range of energy solutions, from household solar hybrid systems to mini solar grid systems for rural electrification and industrial power backup.",
      image: "SBU-Power-Renewable-Energy-Services.jpg"
    }
  ];

  const listItems = document.querySelectorAll(".unit-list li");
  const display = document.getElementById("unit-display");
  let unitIndex = 0;

  function showUnit(index) {
    if (!display) return;
    const unit = units[index];
    display.style.backgroundImage = `url('${unit.image}')`;
    display.innerHTML = `
      <div class="unit-content">
        <h3>${unit.title}</h3>
        <p>${unit.text}</p>
      </div>
    `;
    document.querySelectorAll('.unit-list li').forEach(li => li.classList.remove('active'));
    const selected = document.querySelector(`.unit-list li[data-index="${index}"]`);
    if (selected) selected.classList.add('active');
  }

  listItems.forEach(item => {
    item.addEventListener("click", () => {
      unitIndex = parseInt(item.dataset.index);
      showUnit(unitIndex);
    });
  });

  setInterval(() => {
    unitIndex = (unitIndex + 1) % units.length;
    showUnit(unitIndex);
  }, 6000);

  showUnit(unitIndex);
}

// Wait for DOM + includes
document.addEventListener('DOMContentLoaded', () => {
  loadIncludes(() => {
    setupSiteFeatures();
  });
});
// Show or hide the Back to Top button
window.onscroll = function () {
  const btn = document.getElementById("backToTop");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Scroll to top when clicked
document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
// Add smooth scrolling to all links