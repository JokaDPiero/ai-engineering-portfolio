import { candidateData, skillCategories, experienceData, educationData, certificationsData, achievementsData } from './data.js';

export class ATSViewer {
  constructor() {
    this.modal = document.getElementById('ats-modal');
    this.contentEl = document.getElementById('ats-content');
    this.lastFocusedElement = null;
    this.init();
  }

  init() {
    const triggerButtons = document.querySelectorAll('.ats-viewer-trigger');
    triggerButtons.forEach(btn => {
      btn.addEventListener('click', () => this.open());
    });

    const closeBtn = document.getElementById('ats-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    const copyBtn = document.getElementById('ats-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyText());
    }

    const printBtn = document.getElementById('ats-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (this.modal?.classList.contains('active')) {
        if (e.key === 'Escape') {
          this.close();
        } else if (e.key === 'Tab') {
          this.trapFocus(e);
        }
      }
    });

    this.renderText();
  }

  trapFocus(e) {
    if (!this.modal) return;
    const focusables = this.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  }

  open() {
    if (!this.modal) return;
    this.lastFocusedElement = document.activeElement;
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = document.getElementById('ats-modal-close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
      this.lastFocusedElement.focus();
    }
  }

  getRawATSString() {
    return `${candidateData.name.toUpperCase()}
${candidateData.title} @ ${candidateData.currentCompany}
${candidateData.email} | ${candidateData.location}
LinkedIn: ${candidateData.linkedin} | GitHub: ${candidateData.github} | Portfolio: ${candidateData.portfolio}

${candidateData.motto}

SUMMARY
${candidateData.summary.join(' ')}

SKILLS
LIBRARIES & AGENTIC FRAMEWORKS: ${skillCategories[0].skills.join(', ')}
CLOUD (AZURE & AWS): ${skillCategories[1].skills.join(', ')}
TOOLS & MLOPS: ${skillCategories[2].skills.join(', ')}
SOFT SKILLS: ${skillCategories[3].skills.join(', ')}

PROFESSIONAL EXPERIENCE
${experienceData.map(e => `${e.role} | ${e.company} (${e.period}) - ${e.location}
${e.highlights.map(h => `• ${h}`).join('\n')}`).join('\n\n')}

EDUCATION
${educationData.map(ed => `${ed.degree} - ${ed.score}
${ed.institution} (${ed.period}) - ${ed.location}`).join('\n\n')}

CERTIFICATIONS
${certificationsData.map(c => `• ${c.title} (${c.issuer} - ${c.code})`).join('\n')}

ACHIEVEMENTS & MENTORSHIP
${achievementsData.map(a => `• ${a.title} (${a.organization}, ${a.year}): ${a.description}`).join('\n')}
`;
  }

  renderText() {
    if (!this.contentEl) return;
    this.contentEl.textContent = this.getRawATSString();
  }

  copyText() {
    const text = this.getRawATSString();
    navigator.clipboard.writeText(text).then(() => {
      const copyBtn = document.getElementById('ats-copy-btn');
      if (copyBtn) {
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied to Clipboard!';
        setTimeout(() => {
          copyBtn.innerHTML = original;
        }, 2000);
      }
    });
  }
}
