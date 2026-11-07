import { projectsData } from './data.js';

export class ProjectsManager {
  constructor() {
    this.activeDomain = 'all';
    this.searchQuery = '';
    this.container = document.getElementById('projects-container');
    this.modal = document.getElementById('project-modal');
    this.modalContent = document.getElementById('project-modal-body');
    this.init();
  }

  init() {
    this.setupFilters();
    this.setupSearch();
    this.setupModal();
    this.render();
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeDomain = btn.getAttribute('data-domain') || 'all';
        this.render();
      });
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.render();
      });
    }
  }

  setupModal() {
    if (!this.modal) return;
    const closeBtn = document.getElementById('project-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !this.modal || !this.modalContent) return;

    this.modalContent.innerHTML = `
      <div class="modal-project-header">
        <div class="modal-badges">
          <span class="project-tag">${this.escapeHtml(project.domain)}</span>
          <span class="project-period">${this.escapeHtml(project.period)}</span>
        </div>
        <h2 class="modal-title">${this.escapeHtml(project.title)}</h2>
        <div class="modal-role"><strong>Role:</strong> ${this.escapeHtml(project.role)}</div>
      </div>

      <div class="modal-section">
        <h3><span class="section-icon">🎯</span> Business Challenge & Problem Statement</h3>
        <p>${this.escapeHtml(project.challenge)}</p>
      </div>

      <div class="modal-section">
        <h3><span class="section-icon">🚀</span> Measurable Impact & Quantified Results</h3>
        <p>${this.escapeHtml(project.impact)}</p>
        <div class="metrics-pill-container">
          ${project.metrics.map(m => `<span class="metric-pill">✓ ${this.escapeHtml(m)}</span>`).join('')}
        </div>
      </div>

      <div class="modal-section">
        <h3><span class="section-icon">⚙️</span> Technical Approach & Engineering Architecture</h3>
        <p>${this.escapeHtml(project.approach)}</p>
      </div>

      <div class="modal-section">
        <h3><span class="section-icon">🛠️</span> Production Tech Stack</h3>
        <div class="tech-tags">
          ${project.techStack.map(t => `<span>${this.escapeHtml(t)}</span>`).join('')}
        </div>
      </div>

      <div class="modal-footer">
        ${project.githubUrl ? `
          <a href="${this.escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            View on GitHub →
          </a>
        ` : ''}
        <button type="button" class="btn btn-secondary modal-close-action">Close Window</button>
      </div>
    `;

    const innerCloseBtn = this.modalContent.querySelector('.modal-close-action');
    if (innerCloseBtn) {
      innerCloseBtn.addEventListener('click', () => this.closeModal());
      setTimeout(() => innerCloseBtn.focus(), 50);
    }

    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  filterProjects() {
    return projectsData.filter(project => {
      const matchesDomain = this.activeDomain === 'all' || project.domain === this.activeDomain;
      if (!matchesDomain) return false;

      if (!this.searchQuery) return true;

      const haystack = [
        project.title,
        project.domain,
        project.role,
        project.challenge,
        project.impact,
        project.approach,
        ...project.techStack,
        ...project.metrics
      ].join(' ').toLowerCase();

      return haystack.includes(this.searchQuery);
    });
  }

  render() {
    if (!this.container) return;

    const filtered = this.filterProjects();
    const countBadge = document.getElementById('project-count-badge');
    if (countBadge) {
      countBadge.textContent = `${filtered.length} of ${projectsData.length} Projects`;
    }

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <p>No projects match "<strong>${this.escapeHtml(this.searchQuery)}</strong>" under selected domain.</p>
          <button class="btn btn-outline reset-filter-btn" style="margin-top:1rem;">Reset Filters</button>
        </div>
      `;
      const resetBtn = this.container.querySelector('.reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.activeDomain = 'all';
          this.searchQuery = '';
          const searchInput = document.getElementById('project-search');
          if (searchInput) searchInput.value = '';
          const filterButtons = document.querySelectorAll('.project-filter-btn');
          filterButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-domain') === 'all'));
          this.render();
        });
      }
      return;
    }

    this.container.innerHTML = filtered.map(p => `
      <article class="project-card ${p.featured ? 'project-featured' : ''}" data-project-id="${p.id}">
        <div class="project-header">
          <div class="project-meta-row">
            <span class="project-tag">${this.escapeHtml(p.domain)}</span>
            <span class="project-period-badge">${this.escapeHtml(p.period)}</span>
          </div>
          <h3 class="project-title">${this.escapeHtml(p.title)}</h3>
          <div class="project-role-line">${this.escapeHtml(p.role)}</div>
        </div>

        <p class="project-summary">${this.escapeHtml(p.impact)}</p>

        <div class="project-metrics-row">
          ${p.metrics.slice(0, 2).map(m => `<span class="metric-micro">⚡ ${this.escapeHtml(m)}</span>`).join('')}
        </div>

        <div class="tech-tags">
          ${p.techStack.slice(0, 5).map(t => `<span>${this.escapeHtml(t)}</span>`).join('')}
          ${p.techStack.length > 5 ? `<span class="more-tag">+${p.techStack.length - 5}</span>` : ''}
        </div>

        <div class="project-card-actions">
          <button type="button" class="btn btn-secondary btn-sm deep-dive-btn" data-project-id="${p.id}" aria-label="Architecture and deep-dive for ${this.escapeHtml(p.title)}">
            Architecture & Specs →
          </button>
          ${p.githubUrl ? `
            <a href="${this.escapeHtml(p.githubUrl)}" target="_blank" rel="noopener noreferrer" class="github-link-icon" title="View Source on GitHub" aria-label="GitHub Repository for ${this.escapeHtml(p.title)}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          ` : ''}
        </div>
      </article>
    `).join('');

    this.container.querySelectorAll('.deep-dive-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-project-id');
        if (id) this.openModal(id);
      });
    });
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
