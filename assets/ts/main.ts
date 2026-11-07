import { ThemeManager } from './theme.js';
import { ProjectsManager } from './projects.js';
import { SkillsManager } from './skills.js';
import { ExperienceManager } from './experience.js';
import { ATSViewer } from './ats-viewer.js';
import { keyMetrics, candidateData, loadPortfolioConfig } from './data.js';

class PortfolioApp {
  private themeManager: ThemeManager;
  private projectsManager: ProjectsManager;
  private skillsManager: SkillsManager;
  private experienceManager: ExperienceManager;
  private atsViewer: ATSViewer;

  constructor() {
    this.themeManager = new ThemeManager();
    this.projectsManager = new ProjectsManager();
    this.skillsManager = new SkillsManager();
    this.experienceManager = new ExperienceManager();
    this.atsViewer = new ATSViewer();

    this.initApp();
  }

  private async initApp(): Promise<void> {
    // 1. Asynchronously hydrate from config.json (if served via HTTP/GitHub Pages)
    const configLoaded = await loadPortfolioConfig();
    if (configLoaded) {
      this.hydrateFromConfig();
    }

    // 2. Setup interaction handlers
    this.setupSmoothScroll();
    this.setupNavObserver();
    this.setupMetricCounters();
    this.setupCopyButtons();
    this.setupContactForm();
    this.setupMobileMenu();
    this.setupMottoAnimation();

    console.log('🚀 Debasish Nandy AI Engineering Dynamic Portfolio initialized successfully.');
  }

  private hydrateFromConfig(): void {
    // Hydrate KPI cards with values from config.json
    keyMetrics.forEach(metric => {
      if (metric.id) {
        const card = document.querySelector<HTMLElement>(`.metric-card[data-metric-id="${metric.id}"]`);
        if (card) {
          const valEl = card.querySelector<HTMLElement>('.metric-value');
          if (valEl) {
            valEl.setAttribute('data-target', String(metric.numericTarget));
            valEl.setAttribute('data-suffix', metric.suffix || '');
            valEl.textContent = metric.value;
          }
          const labelEl = card.querySelector<HTMLElement>('.metric-label');
          if (labelEl) labelEl.textContent = metric.label;
          const subEl = card.querySelector<HTMLElement>('.metric-subtext');
          if (subEl) subEl.textContent = metric.subtext;
        }
      }
    });

    // Hydrate notice period and specs
    const noticeEl = document.getElementById('spec-notice-period');
    if (noticeEl && candidateData.noticePeriodText) {
      noticeEl.textContent = candidateData.noticePeriodText;
    }

    // Re-render skills and projects if config modified them
    this.skillsManager.render();
    this.projectsManager.render();
  }

  private setupSmoothScroll(): void {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.length > 1) {
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const menuBtn = document.getElementById('mobile-menu-btn');
            if (navLinks?.classList.contains('mobile-active')) {
              navLinks.classList.remove('mobile-active');
              if (menuBtn) {
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.innerHTML = '☰';
              }
            }
          }
        }
      });
    });
  }

  private setupNavObserver(): void {
    const sections = document.querySelectorAll<HTMLElement>('section[id], footer[id]');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('nav-link-active');
            } else {
              link.classList.remove('nav-link-active');
            }
          });
        }
      });
    }, { threshold: 0.25 });

    sections.forEach(s => observer.observe(s));
  }

  private setupMetricCounters(): void {
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          this.runCounters();
        }
      });
    }, { threshold: 0.15 });

    const heroMetrics = document.querySelector('.hero-metrics');
    if (heroMetrics) {
      observer.observe(heroMetrics);
    }
  }

  private runCounters(): void {
    const counterElements = document.querySelectorAll<HTMLElement>('.metric-value[data-target]');
    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1600;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentCount = Math.floor(easeProgress * target);

        el.textContent = currentCount.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  }

  private setupCopyButtons(): void {
    const copyEmailButtons = document.querySelectorAll<HTMLElement>('.copy-email-btn');
    copyEmailButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(candidateData.email).then(() => {
          this.showToast(`Copied email (${candidateData.email}) to clipboard!`, 'success');
        });
      });
    });
  }

  private setupContactForm(): void {
    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = (document.getElementById('contact-name') as HTMLInputElement)?.value.trim();
      const emailInput = (document.getElementById('contact-email') as HTMLInputElement)?.value.trim();
      const msgInput = (document.getElementById('contact-message') as HTMLTextAreaElement)?.value.trim();

      if (!nameInput || !emailInput || !msgInput) {
        this.showToast('Please fill out all contact fields.', 'warning');
        return;
      }

      const subject = encodeURIComponent(`Career Inquiry from ${nameInput}`);
      const body = encodeURIComponent(`Hi Debasish,\n\n${msgInput}\n\nBest regards,\n${nameInput}\nEmail: ${emailInput}`);
      const mailtoUrl = `mailto:${candidateData.email}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;
      this.showToast('Opening default email client with your message...', 'info');
      form.reset();
    });
  }

  private setupMobileMenu(): void {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        const expanded = navLinks.classList.contains('mobile-active');
        menuBtn.setAttribute('aria-expanded', String(expanded));
        menuBtn.innerHTML = expanded ? '✕' : '☰';
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (navLinks.classList.contains('mobile-active') && !navLinks.contains(target) && !menuBtn.contains(target)) {
          navLinks.classList.remove('mobile-active');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.innerHTML = '☰';
        }
      });
    }
  }

  private setupMottoAnimation(): void {
    const mottoEl = document.querySelector('.motto-banner');
    if (mottoEl) {
      mottoEl.addEventListener('mouseenter', () => {
        mottoEl.classList.add('pulse-glow');
      });
      mottoEl.addEventListener('mouseleave', () => {
        mottoEl.classList.remove('pulse-glow');
      });
    }
  }

  public showToast(message: string, type: 'info' | 'warning' | 'success' = 'info'): void {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = `toast-notification toast-${type} active`;

    setTimeout(() => {
      toast?.classList.remove('active');
    }, 3200);
  }
}

// Bootstrap once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});
