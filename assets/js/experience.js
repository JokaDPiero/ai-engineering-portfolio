import { experienceData, educationData, achievementsData, strengthsData } from './data.js';

export class ExperienceManager {
  constructor() {
    this.expContainer = document.getElementById('experience-timeline-container');
    this.eduContainer = document.getElementById('education-container');
    this.achContainer = document.getElementById('achievements-container');
    this.strengthsContainer = document.getElementById('strengths-container');
    this.init();
  }

  init() {
    this.renderExperience();
    this.renderEducation();
    this.renderAchievements();
    this.renderStrengths();
  }

  renderExperience() {
    if (!this.expContainer) return;

    this.expContainer.innerHTML = experienceData.map((exp, index) => `
      <div class="timeline-card" data-exp-id="${exp.id}">
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          ${index < experienceData.length - 1 ? '<div class="timeline-line"></div>' : ''}
        </div>
        <div class="timeline-body">
          <div class="timeline-top">
            <div>
              <h3 class="timeline-role">${this.escapeHtml(exp.role)}</h3>
              <div class="timeline-company-loc">
                <span class="company-name">${this.escapeHtml(exp.company)}</span>
                <span class="location-bullet">•</span>
                <span class="location-text">${this.escapeHtml(exp.location)}</span>
              </div>
            </div>
            <span class="timeline-period-badge">${this.escapeHtml(exp.period)}</span>
          </div>

          <ul class="timeline-bullets">
            ${exp.highlights.map(h => `<li>${this.escapeHtml(h)}</li>`).join('')}
          </ul>

          <div class="timeline-skills">
            <span class="skills-label">Technologies Applied:</span>
            <div class="tech-tags">
              ${exp.skillsApplied.map(s => `<span>${this.escapeHtml(s)}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderEducation() {
    if (!this.eduContainer) return;

    this.eduContainer.innerHTML = educationData.map(edu => `
      <div class="education-card">
        <div class="edu-header">
          <div class="edu-title-block">
            <h3 class="edu-degree">${this.escapeHtml(edu.degree)}</h3>
            <div class="edu-institution">${this.escapeHtml(edu.institution)}</div>
          </div>
          <div class="edu-score-badge">
            <span class="score-value">${this.escapeHtml(edu.score)}</span>
            <span class="score-type">${edu.scoreType}</span>
          </div>
        </div>
        <div class="edu-meta">
          <span class="edu-period">📅 ${this.escapeHtml(edu.period)}</span>
          <span class="edu-loc">📍 ${this.escapeHtml(edu.location)}</span>
        </div>
        ${edu.notes ? `<p class="edu-notes">${this.escapeHtml(edu.notes)}</p>` : ''}
      </div>
    `).join('');
  }

  renderAchievements() {
    if (!this.achContainer) return;

    this.achContainer.innerHTML = achievementsData.map(ach => `
      <div class="achievement-card">
        <div class="ach-header">
          <span class="ach-year">${this.escapeHtml(ach.year)}</span>
          <span class="ach-tag">${this.escapeHtml(ach.impactTag)}</span>
        </div>
        <h4 class="ach-title">${this.escapeHtml(ach.title)}</h4>
        <div class="ach-org">${this.escapeHtml(ach.organization)}</div>
        <p class="ach-desc">${this.escapeHtml(ach.description)}</p>
      </div>
    `).join('');
  }

  renderStrengths() {
    if (!this.strengthsContainer) return;

    this.strengthsContainer.innerHTML = strengthsData.map(st => `
      <div class="strength-card">
        <div class="strength-icon-box">
          <span class="strength-icon">✦</span>
        </div>
        <h4 class="strength-name">${this.escapeHtml(st.name)}</h4>
        <p class="strength-desc">${this.escapeHtml(st.description)}</p>
      </div>
    `).join('');
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
