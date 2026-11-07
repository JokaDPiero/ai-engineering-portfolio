/**
 * Theme Manager for Debasish Nandy Portfolio
 * Supports Dark (Default), Cyber AI, and Clean Contrast modes
 */

export class ThemeManager {
  constructor() {
    this.currentTheme = 'dark';
    this.storageKey = 'deba_portfolio_theme';
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme && ['dark', 'cyber', 'contrast'].includes(savedTheme)) {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = 'dark';
    }
    this.applyTheme(this.currentTheme);
    this.setupListeners();
  }

  applyTheme(theme) {
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

  cycleTheme() {
    if (this.currentTheme === 'dark') {
      this.applyTheme('cyber');
    } else if (this.currentTheme === 'cyber') {
      this.applyTheme('contrast');
    } else {
      this.applyTheme('dark');
    }
  }

  setupListeners() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.cycleTheme());
    }
  }
}
