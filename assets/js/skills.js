import { skillCategories } from './data.js';

export class SkillsManager {
  constructor() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.container = document.getElementById('skills-container');
    this.init();
  }

  init() {
    this.setupCategoryPills();
    this.setupSearch();
    this.render();
  }

  setupCategoryPills() {
    const pills = document.querySelectorAll('.skill-category-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeCategory = pill.getAttribute('data-cat') || 'all';
        this.render();
      });
    });
  }

  setupSearch() {
    const input = document.getElementById('skill-search-input');
    if (input) {
      input.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.render();
      });
    }
  }

  render() {
    if (!this.container) return;

    const filteredCats = skillCategories.filter(cat => {
      if (this.activeCategory !== 'all' && cat.category !== this.activeCategory) {
        return false;
      }
      if (!this.searchQuery) return true;

      const hasSkillMatch = cat.skills.some(s => s.toLowerCase().includes(this.searchQuery));
      const hasDescMatch = cat.description.toLowerCase().includes(this.searchQuery);
      return hasSkillMatch || hasDescMatch;
    });

    if (filteredCats.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <p>No skills match "<strong>${this.escapeHtml(this.searchQuery)}</strong>".</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = filteredCats.map(cat => {
      const skillsToDisplay = this.searchQuery 
        ? cat.skills.filter(s => s.toLowerCase().includes(this.searchQuery))
        : cat.skills;

      return `
        <div class="skill-category-card">
          <div class="skill-cat-header">
            <h3 class="skill-cat-title">${this.escapeHtml(cat.category)}</h3>
            <span class="skill-count-badge">${skillsToDisplay.length} skills</span>
          </div>
          <p class="skill-cat-desc">${this.escapeHtml(cat.description)}</p>
          <div class="skills-tag-cloud">
            ${skillsToDisplay.map(skill => {
              const isMatch = this.searchQuery && skill.toLowerCase().includes(this.searchQuery);
              return `<span class="skill-tag ${isMatch ? 'skill-tag-matched' : ''}">${this.escapeHtml(skill)}</span>`;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
