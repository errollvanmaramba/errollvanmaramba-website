(function () {
  const data = window.siteData || {};
  const site = data.site || {};
  const projects = data.projects || [];
  const services = data.services || [];
  const experience = data.experience || [];
  const stats = data.stats || [];
  const testimonial = data.testimonial || {};

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function formatPageState() {
    document.documentElement.classList.add("js-ready");
    const current = (document.body.dataset.page || "").toLowerCase();
    $$("[data-nav]").forEach((link) => {
      if (link.dataset.nav === current) {
        link.setAttribute("aria-current", "page");
      }
    });
    const yearNode = $("#year");
    if (yearNode) yearNode.textContent = new Date().getFullYear();
  }

  function revealOnScroll() {
    const items = $$("[data-reveal]");
    if (!items.length) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    });

    items.forEach((item) => observer.observe(item));
  }

  function initMobileMenu() {
    const button = $("#mobile-menu-toggle");
    const panel = $("#mobile-menu-panel");
    if (!button || !panel) return;

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
      document.body.classList.toggle("menu-open", !isOpen);
    });

    $$("a", panel).forEach((link) => {
      link.addEventListener("click", () => {
        button.setAttribute("aria-expanded", "false");
        panel.hidden = true;
        document.body.classList.remove("menu-open");
      });
    });
  }

  function animateCounters() {
    const counters = $$("[data-counter]");
    if (!counters.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const play = (node) => {
      const target = Number(node.dataset.counter || 0);
      const suffix = node.dataset.suffix || "";
      if (reducedMotion) {
        node.textContent = `${target}${suffix}`;
        return;
      }
      const duration = 1200;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        node.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          play(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach((node) => observer.observe(node));
  }

  function injectMetaFields() {
    $$("[data-site-name]").forEach((node) => (node.textContent = site.name || ""));
    $$("[data-site-role]").forEach((node) => (node.textContent = site.role || ""));
    $$("[data-site-tagline]").forEach((node) => (node.textContent = site.tagline || ""));
    $$("[data-site-location]").forEach((node) => (node.textContent = site.locationLabel || ""));
    $$("[data-site-email]").forEach((node) => (node.textContent = site.email || ""));
    $$("[data-site-availability]").forEach((node) => (node.textContent = site.availability || ""));
    $$("[data-site-behance]").forEach((node) => node.setAttribute("href", site.behance || "#"));
    $$("[data-site-linkedin]").forEach((node) => node.setAttribute("href", site.linkedin || "#"));
    $$("[data-site-resume]").forEach((node) => node.setAttribute("href", site.resume || "#"));

    const heroImage = $("#hero-image");
    if (heroImage && site.primaryImage) {
      heroImage.src = site.primaryImage;
      heroImage.alt = `${site.name} portrait`;
    }
  }

  function renderStats() {
    const container = $("#stats-grid");
    if (!container || !stats.length) return;
    container.innerHTML = stats.map((item, index) => `
      <article class="stat-card" data-reveal style="transition-delay:${index * 80}ms">
        <div class="stat-value" data-counter="${item.value}" data-suffix="${item.suffix || ""}">0${item.suffix || ""}</div>
        <p class="stat-label">${item.label}</p>
      </article>
    `).join("");
  }

  function renderServicesPreview() {
    const container = $("#services-preview-grid");
    if (!container || !services.length) return;
    container.innerHTML = services.map((service, index) => `
      <article class="service-card" data-reveal style="transition-delay:${index * 80}ms">
        <div class="service-index">0${index + 1}</div>
        <h3>${service.title}</h3>
        <p>${service.intro}</p>
        <ul class="service-list">
          ${service.details.slice(0, 3).map((detail) => `<li>${detail}</li>`).join("")}
        </ul>
      </article>
    `).join("");
  }

  function renderFullServices() {
    const container = $("#services-grid");
    if (!container || !services.length) return;
    container.innerHTML = services.map((service, index) => `
      <article class="service-panel" data-reveal style="transition-delay:${index * 60}ms">
        <header class="service-panel__header">
          <span class="eyebrow">Service 0${index + 1}</span>
          <h2>${service.title}</h2>
        </header>
        <p class="service-panel__intro">${service.intro}</p>
        <div class="service-panel__body">
          <div class="meta-stack">
            <span class="meta-chip">Creative strategy aware</span>
            <span class="meta-chip">Brand-aligned execution</span>
            <span class="meta-chip">Conversion-conscious design</span>
          </div>
          <ul class="service-list service-list--large">
            ${service.details.map((detail) => `<li>${detail}</li>`).join("")}
          </ul>
        </div>
      </article>
    `).join("");
  }

  function renderFeaturedProjects() {
    const container = $("#featured-projects-grid");
    if (!container || !projects.length) return;
    container.innerHTML = projects.slice(0, 4).map((project, index) => `
      <article class="project-card" data-reveal style="transition-delay:${index * 90}ms">
        <div class="project-card__visual">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-card__content">
          <div class="meta-row">
            <span>${project.year}</span>
            <span>${project.category}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="project-card__actions">
            <a class="button button--ghost" href="./projects.html#${project.slug}">View case</a>
            <a class="text-link" href="${project.behance}" target="_blank" rel="noreferrer">Behance ↗</a>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderProjectsPage() {
    const grid = $("#projects-grid");
    const detailPanel = $("#project-detail-panel");
    const filters = $("#project-filters");
    if (!grid || !projects.length) return;

    const categories = ["All", ...new Set(projects.map((project) => project.category))];
    if (filters) {
      filters.innerHTML = categories.map((category, index) => `
        <button class="filter-chip ${index === 0 ? "is-active" : ""}" type="button" data-filter="${category}">
          ${category}
        </button>
      `).join("");
    }

    const renderCards = (activeCategory = "All") => {
      const filtered = activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory);

      grid.innerHTML = filtered.map((project, index) => `
        <article class="project-card project-card--list" data-project-card="${project.slug}" data-reveal style="transition-delay:${Math.min(index, 4) * 70}ms">
          <div class="project-card__visual project-card__visual--wide">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
          </div>
          <div class="project-card__content">
            <div class="meta-row">
              <span>${project.year}</span>
              <span>${project.category}</span>
              <span>${project.tag}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.summary}</p>
            <div class="project-card__actions">
              <button type="button" class="button button--ghost" data-open-project="${project.slug}">Open case file</button>
              <a class="text-link" href="${project.behance}" target="_blank" rel="noreferrer">Behance ↗</a>
            </div>
          </div>
        </article>
      `).join("");

      revealOnScroll();
      bindProjectButtons();
    };

    const openProject = (slug) => {
      const project = projects.find((item) => item.slug === slug);
      if (!project || !detailPanel) return;

      detailPanel.innerHTML = `
        <div class="project-detail__header">
          <div>
            <span class="eyebrow">Case file / ${project.category}</span>
            <h2>${project.title}</h2>
          </div>
          <a class="button button--ghost" href="${project.behance}" target="_blank" rel="noreferrer">View on Behance</a>
        </div>
        <div class="project-detail__meta">
          <span>${project.year}</span>
          <span>${project.tag}</span>
          <span>${project.category}</span>
        </div>
        <div class="project-detail__visual">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-detail__body">
          <article>
            <h3>Problem</h3>
            <p>${project.problem}</p>
          </article>
          <article>
            <h3>Thought process</h3>
            <p>${project.process}</p>
          </article>
          <article>
            <h3>Solution</h3>
            <p>${project.solution}</p>
          </article>
        </div>
      `;
      detailPanel.classList.add("is-active");
      detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${slug}`);
    };

    const bindProjectButtons = () => {
      $$("[data-open-project]", grid).forEach((button) => {
        button.addEventListener("click", () => openProject(button.dataset.openProject));
      });
    };

    if (filters) {
      filters.addEventListener("click", (event) => {
        const button = event.target.closest("[data-filter]");
        if (!button) return;
        $$("[data-filter]", filters).forEach((chip) => chip.classList.remove("is-active"));
        button.classList.add("is-active");
        renderCards(button.dataset.filter);
      });
    }

    renderCards();

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      openProject(hash);
    } else {
      openProject(projects[0].slug);
    }
  }

  function renderExperienceTimeline() {
    const container = $("#experience-timeline");
    const strip = $("#experience-logo-strip");
    if (!container || !experience.length) return;

    container.innerHTML = experience.map((item, index) => `
      <article class="timeline-card ${index === 0 ? "is-open" : ""}" data-timeline-card data-reveal>
        <button class="timeline-card__toggle" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
          <div class="timeline-card__top">
            <span class="timeline-card__index">0${index + 1}</span>
            <div class="timeline-card__heading">
              <h3>${item.company}</h3>
              <p>${item.role}</p>
            </div>
            <div class="timeline-card__meta">
              <span>${item.location}</span>
              <span>${item.period}</span>
            </div>
          </div>
        </button>
        <div class="timeline-card__body" ${index === 0 ? "" : "hidden"}>
          <ul class="timeline-list">
            ${item.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
          </ul>
        </div>
      </article>
    `).join("");

    if (strip) {
      const withLogos = experience.filter((item) => item.logo);
      strip.innerHTML = withLogos.map((item) => `
        <div class="logo-card" data-reveal>
          <img src="${item.logo}" alt="${item.company} logo" loading="lazy">
        </div>
      `).join("");
    }

    container.addEventListener("click", (event) => {
      const button = event.target.closest(".timeline-card__toggle");
      if (!button) return;
      const card = button.closest("[data-timeline-card]");
      const body = $(".timeline-card__body", card);
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      if (body) body.hidden = expanded;
      card.classList.toggle("is-open", !expanded);
    });
  }

  function renderTestimonial() {
    const slider = $("#testimonial-slider");
    if (!slider || !testimonial.name) return;

    const slides = [
      {
        quote: testimonial.quote,
        label: "Recommendation excerpt 01"
      },
      {
        quote: testimonial.quote2,
        label: "Recommendation excerpt 02"
      },
      {
        quote: testimonial.closing,
        label: "Recommendation excerpt 03"
      }
    ];

    slider.innerHTML = `
      <div class="slider-shell">
        <div class="slider-track" id="slider-track">
          ${slides.map((slide) => `
            <article class="testimonial-card">
              <span class="eyebrow">${slide.label}</span>
              <p class="testimonial-card__quote">“${slide.quote}”</p>
              <div class="testimonial-card__author">
                <strong>${testimonial.name}</strong>
                <span>${testimonial.company}</span>
                <span>${testimonial.date}</span>
              </div>
            </article>
          `).join("")}
        </div>
        <div class="slider-controls">
          <button type="button" class="slider-button" id="slider-prev" aria-label="Previous recommendation">←</button>
          <button type="button" class="slider-button" id="slider-next" aria-label="Next recommendation">→</button>
        </div>
      </div>
    `;

    const track = $("#slider-track", slider);
    const prev = $("#slider-prev", slider);
    const next = $("#slider-next", slider);
    if (!track || !prev || !next) return;
    let currentIndex = 0;
    const total = slides.length;

    const update = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    prev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + total) % total;
      update();
    });

    next.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % total;
      update();
    });
  }

  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;

    const endpoint = form.dataset.endpoint || "";
    const status = $("#form-status");
    const fields = {
      name: $("#name", form),
      email: $("#email", form),
      message: $("#message", form)
    };

    const showError = (field, message) => {
      const errorNode = $(`[data-error-for="${field.name}"]`, form);
      field.setAttribute("aria-invalid", "true");
      if (errorNode) errorNode.textContent = message;
    };

    const clearError = (field) => {
      const errorNode = $(`[data-error-for="${field.name}"]`, form);
      field.setAttribute("aria-invalid", "false");
      if (errorNode) errorNode.textContent = "";
    };

    const validate = () => {
      let valid = true;

      if (!fields.name.value.trim() || fields.name.value.trim().length < 2) {
        showError(fields.name, "Please enter your full name.");
        valid = false;
      } else {
        clearError(fields.name);
      }

      const emailValue = fields.email.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailValue)) {
        showError(fields.email, "Please enter a valid email address.");
        valid = false;
      } else {
        clearError(fields.email);
      }

      const messageLength = fields.message.value.trim().length;
      if (messageLength < 20) {
        showError(fields.message, "Please write a short message with a bit more detail.");
        valid = false;
      } else {
        clearError(fields.message);
      }

      return valid;
    };

    Object.values(fields).forEach((field) => {
      field.addEventListener("input", () => clearError(field));
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!validate()) return;

      const submitButton = $('button[type="submit"]', form);
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      status.textContent = "Sending your message...";

      const payload = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        message: fields.message.value.trim()
      };

      try {
        if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
          const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Website inquiry from " + payload.name)}&body=${encodeURIComponent(payload.message + "\n\nFrom: " + payload.name + "\nEmail: " + payload.email)}`;
          window.location.href = mailto;
          status.textContent = "Your email app is opening so you can send the message directly.";
        } else {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error("Submission failed");
          }

          form.reset();
          status.textContent = "Message sent successfully. Thank you — Erroll will get back to you soon.";
        }
      } catch (error) {
        status.textContent = "Something went wrong while sending the message. Please email Erroll directly.";
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
      }
    });
  }

  function renderAboutHighlights() {
    const skillGrid = $("#capability-grid");
    if (!skillGrid) return;
    const items = [
      "Shopify content and merchandising support",
      "eCommerce product media and listing visuals",
      "Social media and campaign creative",
      "Landing page and marketing page design",
      "AI-assisted image generation and post-production",
      "SEO-aware asset organization and content support",
      "Video editing, GIFs, and short-form content",
      "Adobe Creative Cloud-centered execution"
    ];
    skillGrid.innerHTML = items.map((item, index) => `
      <li class="capability-item" data-reveal style="transition-delay:${Math.min(index, 5) * 65}ms">${item}</li>
    `).join("");
  }

  function renderHomeExperiencePreview() {
    const container = $("#experience-preview");
    if (!container) return;
    const topRoles = experience.slice(0, 3);
    container.innerHTML = topRoles.map((item, index) => `
      <article class="experience-preview-card" data-reveal style="transition-delay:${index * 80}ms">
        <div class="meta-row">
          <span>${item.company}</span>
          <span>${item.period}</span>
        </div>
        <h3>${item.role}</h3>
        <p>${item.highlights[0]}</p>
      </article>
    `).join("");
  }

  function bindSmoothAnchors() {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = $(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    formatPageState();
    injectMetaFields();
    renderStats();
    renderServicesPreview();
    renderFullServices();
    renderFeaturedProjects();
    renderProjectsPage();
    renderExperienceTimeline();
    renderTestimonial();
    renderAboutHighlights();
    renderHomeExperiencePreview();
    initContactForm();
    initMobileMenu();
    bindSmoothAnchors();
    revealOnScroll();
    animateCounters();
  });
})();
