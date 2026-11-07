/**
 * Theme Manager for Debasish Nandy Portfolio
 * Supports Dark (Default), Cyber AI, and Clean Contrast modes
 */

export type ThemeMode = 'dark' | 'cyber' | 'contrast';

export class ThemeManager {
  private currentTheme: ThemeMode = 'dark';
  private readonly storageKey = 'deba_portfolio_theme';

  constructor() {
    this.init();
  }

  private init(): void {
    const savedTheme = localStorage.getItem(this.storageKey) as ThemeMode | null;
    if (savedTheme && ['dark', 'cyber', 'contrast'].includes(savedTheme)) {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = 'dark';
    }
    this.applyTheme(this.currentTheme);
    this.setupListeners();
  }

  public applyTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      if (theme === 'cyber') {
        themeToggleBtn.setAttribute('title', 'Current: Cyber AI (Click for Contrast)');
        themeToggleBtn.innerHTML = '⚡ <span>Cyber</span>';
      } else if (theme === 'contrast') {
        themeToggleBtn.setAttribute('title', 'Current: High Contrast (Click for Dark)');
        themeToggleBtn.innerHTML = '◑ <span>Contrast</span>';
      } else {
        themeToggleBtn.setAttribute('title', 'Current: Dark Mode (Click for Cyber)');
        themeToggleBtn.innerHTML = '🌙 <span>Dark</span>';
      }
    }
  }

  public cycleTheme(): void {
    if (this.currentTheme === 'dark') {
      this.applyTheme('cyber');
    } else if (this.currentTheme === 'cyber') {
      this.applyTheme('contrast');
    } else {
      this.applyTheme('dark');
    }
  }

  private setupListeners(): void {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.cycleTheme());
    }
  }
}
