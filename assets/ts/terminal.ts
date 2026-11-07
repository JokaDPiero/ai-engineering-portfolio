import { 
  candidateData, 
  projectsData, 
  experienceData, 
  educationData, 
  certificationsData, 
  achievementsData, 
  strengthsData, 
  skillCategories,
  activeQuantifiables
} from './data.js';

export class TerminalAssistant {
  private terminalEl: HTMLElement | null = null;
  private outputEl: HTMLElement | null = null;
  private inputEl: HTMLInputElement | null = null;
  private history: string[] = [];
  private historyIndex: number = -1;
  private isOpen: boolean = false;

  private readonly commandsList = [
    'help', 'whoami', 'config', 'skills', 'projects', 'project', 
    'exp', 'education', 'certs', 'achievements', 
    'strengths', 'contact', 'resume', 'clear', 'exit'
  ];

  constructor() {
    this.terminalEl = document.getElementById('terminal-modal');
    this.outputEl = document.getElementById('terminal-output');
    this.inputEl = document.getElementById('terminal-input') as HTMLInputElement | null;
    this.init();
  }

  private init(): void {
    this.setupListeners();
    this.printWelcome();
  }

  private setupListeners(): void {
    const toggleButtons = document.querySelectorAll('.terminal-trigger');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => this.toggleTerminal());
    });

    const closeBtn = document.getElementById('terminal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeTerminal());
    }

    if (this.inputEl) {
      this.inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = this.inputEl?.value.trim() || '';
          if (val) {
            this.history.push(val);
            this.historyIndex = this.history.length;
            this.executeCommand(val);
            if (this.inputEl) this.inputEl.value = '';
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (this.historyIndex > 0) {
            this.historyIndex--;
            if (this.inputEl) this.inputEl.value = this.history[this.historyIndex];
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            if (this.inputEl) this.inputEl.value = this.history[this.historyIndex];
          } else {
            this.historyIndex = this.history.length;
            if (this.inputEl) this.inputEl.value = '';
          }
        } else if (e.key === 'Tab') {
          e.preventDefault();
          this.handleAutocomplete();
        }
      });
    }

    const quickCmdButtons = document.querySelectorAll<HTMLButtonElement>('.term-quick-cmd');
    quickCmdButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          this.executeCommand(cmd);
          if (this.inputEl) this.inputEl.focus();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeTerminal();
      }
    });
  }

  public toggleTerminal(): void {
    if (this.isOpen) {
      this.closeTerminal();
    } else {
      this.openTerminal();
    }
  }

  public openTerminal(): void {
    if (!this.terminalEl) return;
    this.terminalEl.classList.add('active');
    this.terminalEl.setAttribute('aria-hidden', 'false');
    this.isOpen = true;
    setTimeout(() => {
      this.inputEl?.focus();
      this.scrollToBottom();
    }, 100);
  }

  public closeTerminal(): void {
    if (!this.terminalEl) return;
    this.terminalEl.classList.remove('active');
    this.terminalEl.setAttribute('aria-hidden', 'true');
    this.isOpen = false;
  }

  private handleAutocomplete(): void {
    if (!this.inputEl) return;
    const current = this.inputEl.value.trim().toLowerCase();
    if (!current) return;

    const matches = this.commandsList.filter(cmd => cmd.startsWith(current));
    if (matches.length === 1) {
      this.inputEl.value = matches[0] + ' ';
    } else if (matches.length > 1) {
      this.printLine(`<span class="term-dim">Suggestions: ${matches.join(', ')}</span>`);
    }
  }

  private printWelcome(): void {
    this.printLine(`
<span class="term-cyan">┌──────────────────────────────────────────────────────────────┐</span>
<span class="term-cyan">│</span>  <span class="term-bright">DEBASISH NANDY // AI ENGINEER TERMINAL COPILOT v2.2</span>       <span class="term-cyan">│</span>
<span class="term-cyan">│</span>  Multi-Agent: AutoGen, CrewAI • Web: Crawl4AI • AWS Bedrock  <span class="term-cyan">│</span>
<span class="term-cyan">│</span>  Type <span class="term-yellow">help</span> or <span class="term-yellow">config</span> to inspect quantifiables.             <span class="term-cyan">│</span>
<span class="term-cyan">└──────────────────────────────────────────────────────────────┘</span>
`);
  }

  public executeCommand(rawCommand: string): void {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    this.printLine(`<span class="term-prompt">deba@ai-core:~$</span> <span class="term-cmd">${this.escapeHtml(trimmed)}</span>`);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        this.printLine(`
<span class="term-yellow">AVAILABLE COMMANDS:</span>
  • <span class="term-green">whoami</span>        - Candidate overview, core philosophy & contact summary
  • <span class="term-green">config</span>        - View current loaded quantifiables & metrics from config.json
  • <span class="term-green">skills</span>        - Technical skills (AutoGen, CrewAI, Crawl4AI, DSPy, Bedrock)
  • <span class="term-green">projects</span>      - List all 9 production AI/ML & GenAI enterprise projects
  • <span class="term-green">project &lt;id&gt;</span>  - Deep-dive into specific project (e.g., project niq-cfa)
  • <span class="term-green">exp</span>           - Chronological 5+ YOE production experience breakdown
  • <span class="term-green">education</span>     - Academic degrees, KIIT 8.8 CGPA, and board honors
  • <span class="term-green">certs</span>         - Microsoft & Databricks verified professional certs
  • <span class="term-green">achievements</span>  - Mentorship (150+ students) and hackathon records
  • <span class="term-green">strengths</span>     - 5 verified core engineering & team strengths
  • <span class="term-green">contact</span>       - Direct email, location, GitHub & LinkedIn profiles
  • <span class="term-green">resume</span>        - View clean Harvard ATS formatted resume in terminal
  • <span class="term-green">clear</span>         - Clear the terminal console buffer
  • <span class="term-green">exit</span>          - Close the terminal dialog
`);
        break;

      case 'config':
        this.printLine(`
<span class="term-yellow">CURRENT CONFIGURATION & QUANTIFIABLES (config.json):</span>
  • Experience:            <span class="term-cyan">${activeQuantifiables.yearsExperienceDisplay}</span> (${activeQuantifiables.yearsExperience} years)
  • Concurrent Users:      <span class="term-cyan">${activeQuantifiables.concurrentUsersDisplay}</span> (auto-scaled)
  • POCs Delivered:        <span class="term-cyan">${activeQuantifiables.pocsDeliveredDisplay}</span> (100% success criteria)
  • Engineers Mentored:    <span class="term-cyan">${activeQuantifiables.studentsMentoredDisplay}</span> (COE, CLE, Tech Bairn)
  • Professional Certs:    <span class="term-cyan">${activeQuantifiables.certificationsCountDisplay}</span> (Microsoft & Databricks)
  • Production Projects:   <span class="term-cyan">${activeQuantifiables.projectsDeliveredDisplay}</span> (BFSI, Supply Chain, Telecom)
  • GenAI Accuracy:        <span class="term-green">${activeQuantifiables.genaiAccuracy}</span>
  • IDPP Accuracy:         <span class="term-green">${activeQuantifiables.idppAccuracy}</span>
  • FAQ Concurrency:       <span class="term-green">${activeQuantifiables.faqConcurrencyDisplay}</span> @ ${activeQuantifiables.faqLatency}
  • Notice Period:         <span class="term-cyan">${candidateData.noticePeriodText || '60 Days'}</span>
  • Academic CGPA:         <span class="term-bright">${activeQuantifiables.cgpa}</span> (KIIT Honors in IT)

<span class="term-dim">All values above are dynamically managed via config.json.</span>
`);
        break;

      case 'whoami':
        this.printLine(`
<span class="term-bright">${candidateData.name}</span> - <span class="term-cyan">${candidateData.title}</span> @ ${candidateData.currentCompany}
Location: ${candidateData.location}
Email: ${candidateData.email}

<span class="term-dim">Guiding Motto:</span>
"${candidateData.motto}"

<span class="term-yellow">Summary:</span>
${candidateData.summary.map(s => `• ${s}`).join('\n')}
`);
        break;

      case 'skills':
        let skillOut = '<span class="term-yellow">TECHNICAL SKILLS INVENTORY:</span>\n';
        skillCategories.forEach(cat => {
          skillOut += `\n<span class="term-cyan">[${cat.category}]</span>\n  ${cat.skills.join(' • ')}\n`;
        });
        this.printLine(skillOut);
        break;

      case 'projects':
        let projOut = `<span class="term-yellow">PRODUCTION PROJECTS INDEX (${projectsData.length} Total):</span>\n\n`;
        projectsData.forEach(p => {
          projOut += `<span class="term-green">[${p.id}]</span> <span class="term-bright">${p.title}</span> (${p.period})\n  <span class="term-dim">Role:</span> ${p.role} | <span class="term-dim">Domain:</span> ${p.domain}\n  <span class="term-dim">Impact:</span> ${p.impact}\n  <span class="term-dim">Tech:</span> ${p.techStack.slice(0, 5).join(', ')}\n\n`;
        });
        projOut += `<span class="term-dim">Tip: Type 'project &lt;id&gt;' (e.g. project niq-cfa) for full architecture specs.</span>`;
        this.printLine(projOut);
        break;

      case 'project':
        if (!args[0]) {
          this.printLine(`<span class="term-red">Error: Please provide project id. Example: project niq-cfa</span>\n<span class="term-dim">Available IDs: ${projectsData.map(p => p.id).join(', ')}</span>`);
          break;
        }
        const targetProj = projectsData.find(p => p.id.toLowerCase() === args[0].toLowerCase());
        if (!targetProj) {
          this.printLine(`<span class="term-red">Error: Project '${args[0]}' not found.</span> Available IDs: ${projectsData.map(p => p.id).join(', ')}`);
        } else {
          this.printLine(`
<span class="term-cyan">=======================================================</span>
<span class="term-bright">${targetProj.title}</span> [${targetProj.period}]
<span class="term-dim">Role:</span> ${targetProj.role} | <span class="term-dim">Domain:</span> ${targetProj.domain}
<span class="term-cyan">-------------------------------------------------------</span>
<span class="term-yellow">CHALLENGE:</span>
${targetProj.challenge}

<span class="term-yellow">MEASURABLE IMPACT:</span>
${targetProj.impact}
${targetProj.metrics.map(m => `  ✓ ${m}`).join('\n')}

<span class="term-yellow">TECHNICAL APPROACH:</span>
${targetProj.approach}

<span class="term-yellow">TECH STACK:</span>
${targetProj.techStack.join(' • ')}
${targetProj.githubUrl ? `\n<span class="term-green">Source:</span> ${targetProj.githubUrl}` : ''}
<span class="term-cyan">=======================================================</span>
`);
        }
        break;

      case 'exp':
      case 'experience':
        let expOut = '<span class="term-yellow">PROFESSIONAL EXPERIENCE:</span>\n';
        experienceData.forEach(exp => {
          expOut += `\n<span class="term-green">${exp.role}</span> @ <span class="term-bright">${exp.company}</span> [${exp.period}]\nLocation: ${exp.location}\n`;
          exp.highlights.forEach(h => {
            expOut += `  • ${h}\n`;
          });
        });
        this.printLine(expOut);
        break;

      case 'education':
      case 'edu':
        let eduOut = '<span class="term-yellow">ACADEMIC BACKGROUND:</span>\n';
        educationData.forEach(edu => {
          eduOut += `\n<span class="term-green">${edu.degree}</span>\n${edu.institution} [${edu.period}] — <span class="term-bright">${edu.score}</span>\nLocation: ${edu.location}\n`;
        });
        this.printLine(eduOut);
        break;

      case 'certs':
      case 'certifications':
        let certOut = '<span class="term-yellow">INDUSTRY CERTIFICATIONS:</span>\n\n';
        certificationsData.forEach(c => {
          certOut += `• <span class="term-bright">${c.title}</span> (${c.issuer})\n  Code: <span class="term-cyan">${c.code}</span> — ${c.description}\n\n`;
        });
        this.printLine(certOut);
        break;

      case 'achievements':
      case 'mentorship':
        let achOut = '<span class="term-yellow">ACHIEVEMENTS & MENTORSHIP:</span>\n\n';
        achievementsData.forEach(a => {
          achOut += `[${a.year}] <span class="term-bright">${a.title}</span> (${a.organization})\n  Tag: ${a.impactTag}\n  ${a.description}\n\n`;
        });
        this.printLine(achOut);
        break;

      case 'strengths':
        let strOut = '<span class="term-yellow">CORE ENGINEERING STRENGTHS:</span>\n\n';
        strengthsData.forEach(s => {
          strOut += `✦ <span class="term-bright">${s.name}</span>: ${s.description}\n`;
        });
        this.printLine(strOut);
        break;

      case 'contact':
        this.printLine(`
<span class="term-yellow">CONTACT CHANNELS:</span>
  • Name:     ${candidateData.name}
  • Email:    <a href="mailto:${candidateData.email}" class="term-link">${candidateData.email}</a>
  • Location: ${candidateData.location}
  • GitHub:   <a href="${candidateData.github}" target="_blank" class="term-link">${candidateData.github}</a>
  • LinkedIn: <a href="${candidateData.linkedin}" target="_blank" class="term-link">${candidateData.linkedin}</a>
`);
        break;

      case 'resume':
        this.printResume();
        break;

      case 'clear':
      case 'cls':
        if (this.outputEl) this.outputEl.innerHTML = '';
        this.printWelcome();
        break;

      case 'exit':
      case 'quit':
        this.closeTerminal();
        break;

      default:
        this.printLine(`<span class="term-red">Command not recognized: '${this.escapeHtml(cmd)}'.</span> Type <span class="term-yellow">help</span> for available commands.`);
        break;
    }

    this.scrollToBottom();
  }

  private printResume(): void {
    const resumeText = `
<span class="term-bright">${candidateData.name.toUpperCase()}</span>
${candidateData.title} @ ${candidateData.currentCompany}
${candidateData.email} | ${candidateData.location}
GitHub: ${candidateData.github} | LinkedIn: ${candidateData.linkedin}

${candidateData.motto}

--------------------------------------------------------------------------------
SUMMARY
--------------------------------------------------------------------------------
${candidateData.summary.join(' ')}

--------------------------------------------------------------------------------
SKILLS
--------------------------------------------------------------------------------
LIBRARIES: ${skillCategories[0].skills.join(' • ')}
CLOUD (AZURE & AWS): ${skillCategories[1].skills.join(' • ')}
TOOLS: ${skillCategories[2].skills.join(' • ')}
SOFT SKILLS: ${skillCategories[3].skills.join(' • ')}

--------------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
--------------------------------------------------------------------------------
${experienceData.map(e => `
* ${e.role} | ${e.company} (${e.period})
${e.highlights.map(h => `  - ${h}`).join('\n')}`).join('\n')}

--------------------------------------------------------------------------------
EDUCATION
--------------------------------------------------------------------------------
${educationData.map(ed => `* ${ed.degree} - ${ed.score}\n  ${ed.institution} (${ed.period}), ${ed.location}`).join('\n\n')}

--------------------------------------------------------------------------------
CERTIFICATIONS
--------------------------------------------------------------------------------
${certificationsData.map(c => `* ${c.title} (${c.issuer} - ${c.code})`).join('\n')}
`;
    this.printLine(`<pre class="term-resume">${resumeText}</pre>`);
  }

  private printLine(html: string): void {
    if (!this.outputEl) return;
    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = html;
    this.outputEl.appendChild(line);
  }

  private scrollToBottom(): void {
    if (this.outputEl) {
      this.outputEl.scrollTop = this.outputEl.scrollHeight;
    }
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
