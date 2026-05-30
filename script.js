/* ===== ПЕРЕМЕННЫЕ ===== */
:root {
  --blue-dark: #14532d;
  --blue-main: #16a34a;
  --blue-mid: #22c55e;
  --blue-pale: #dcfce7;
  --blue-bg: #f0fdf4;
  --orange: #ea580c;
  --green: #16a34a;
  --red: #dc2626;
  --gray-900: #111827;
  --gray-700: #374151;
  --gray-500: #6b7280;
  --gray-400: #9ca3af;
  --gray-300: #d1d5db;
  --gray-200: #e5e7eb;
  --gray-100: #f3f4f6;
  --gray-50: #f9fafb;
  --white: #ffffff;
  --radius: 8px;
  --radius-lg: 14px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,.10);
  --shadow-lg: 0 8px 32px rgba(0,0,0,.14);
  --transition: .2s ease;
}

*,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body { font-family: system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color: var(--gray-900); background: var(--gray-50); line-height: 1.6; }
a { color: var(--blue-main); text-decoration: none; }
a:hover { text-decoration: underline; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; }

/* ===== HEADER ===== */
.site-header { background: var(--blue-dark); color: var(--white); position: sticky; top: 0; z-index: 1000; box-shadow: var(--shadow-md); }
.header-inner { display: flex; align-items: center; justify-content: space-between; min-height: 72px; }
.logo { display: flex; align-items: center; gap: 0.75rem; }
.logo-icon { font-size: 2rem; }
.logo-title { font-weight: 800; font-size: 1.15rem; line-height: 1.1; }
.logo-sub { font-size: 0.85rem; opacity: .9; }
.main-nav ul { list-style: none; display: flex; align-items: center; gap: 1rem; }
.main-nav a { color: var(--white); font-weight: 600; padding: .5rem .2rem; border-bottom: 2px solid transparent; }
.main-nav a.active,.main-nav a:hover { border-color: var(--white); }
.burger { display: none; background: none; border: none; color: var(--white); font-size: 2rem; cursor: pointer; }

/* ===== HERO ===== */
.hero { background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%); padding: 4rem 0 3rem; }
.hero-badge { display: inline-block; background: var(--blue-pale); color: var(--blue-dark); font-weight: 700; padding: .4rem .9rem; border-radius: 999px; margin-bottom: 1rem; }
.hero-title { font-size: clamp(2rem, 4vw, 3.6rem); line-height: 1.05; margin-bottom: 1rem; color: var(--blue-dark); font-weight: 900; }
.hero-desc { max-width: 900px; font-size: 1.05rem; color: var(--gray-700); margin-bottom: 1.5rem; }
.hero-cards { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 1rem; margin-bottom: 1.25rem; }
.hero-card { background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.2rem; box-shadow: var(--shadow-sm); }
.hero-card-icon { font-size: 1.8rem; margin-bottom: .5rem; }
.hero-card-label { font-weight: 800; color: var(--blue-dark); margin-bottom: .35rem; }
.hero-card-text { color: var(--gray-700); font-size: .95rem; }
.hero-problem { background: #fff7ed; border-left: 4px solid var(--orange); padding: 1rem 1.1rem; border-radius: var(--radius); margin-bottom: 1.5rem; }
.hero-problem-title { font-weight: 800; color: #9a3412; margin-bottom: .35rem; }
.hero-nav-buttons { display: flex; gap: .8rem; flex-wrap: wrap; }
.btn { display: inline-block; padding: .8rem 1.2rem; border-radius: var(--radius); font-weight: 700; }
.btn-primary { background: var(--blue-main); color: var(--white); }
.btn-secondary { background: var(--gray-100); color: var(--gray-900); }

/* ===== SECTIONS ===== */
.section { padding: 3rem 0; }
.section-alt { background: var(--white); }
.section-header { margin-bottom: 1.5rem; }
.section-header h2 { font-size: 2rem; color: var(--blue-dark); margin-bottom: .4rem; }
.section-desc { color: var(--gray-700); }
.legend-row { display: flex; gap: .6rem; flex-wrap: wrap; margin-bottom: 1rem; }
.legend-item { display: inline-block; padding: .35rem .7rem; border-radius: 999px; font-weight: 700; }
.legend-84 { background: #e9f7ef; color: #1e8449; }
.legend-87 { background: #e8f4fd; color: #1a5276; }

/* ===== TABLE ===== */
.table-wrapper { overflow-x: auto; }
.compare-table { width: 100%; border-collapse: collapse; min-width: 980px; background: var(--white); box-shadow: var(--shadow-sm); border-radius: var(--radius-lg); overflow: hidden; }
.compare-table thead th { background: #0f5132; color: var(--white); padding: .95rem .85rem; text-align: left; font-size: .93rem; }
.compare-table tbody td { padding: .85rem .85rem; border-bottom: 1px solid var(--gray-200); vertical-align: top; font-size: .92rem; }
.compare-table tbody tr.row-alt { background: #f8fbfb; }
.sign-cell { width: 48px; text-align: center; }
.sign-num { display: inline-flex; width: 26px; height: 26px; align-items: center; justify-content: center; border-radius: 50%; background: #e8f7ef; color: #1e8449; font-weight: 800; font-size: .85rem; }
.th-sub { font-size: .8rem; opacity: .9; font-weight: 500; }
.cell-84 { color: #14532d; }
.cell-87 { color: #1a5276; }
.key-cell { color: var(--gray-700); font-size: .88rem; }

/* ===== FOOTER ===== */
.site-footer { background: #0f172a; color: var(--white); padding: 2rem 0; margin-top: 2rem; }
.footer-title { font-weight: 800; font-size: 1rem; }

/* ========== ТРЁХЭТАПНЫЙ АЛГОРИТМ ========== */
.algo3-stages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.algo3-stage {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: #f0f4f4;
  border: 2px solid #c8d8d8;
  border-radius: 12px;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 160px;
}
.algo3-stage:hover { background: #e0eeee; }
.algo3-stage.active { background: #01696f; border-color: #01696f; color: #fff; }
.algo3-stage.done { background: #e8f7ef; border-color: #27ae60; color: #1e8449; }
.algo3-stage-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  flex-shrink: 0;
}
.algo3-stage.active .algo3-stage-num { background: rgba(255,255,255,0.25); }
.algo3-stage.done .algo3-stage-num { background: #27ae60; color: #fff; }
.algo3-stage-label { font-size: 0.85rem; font-weight: 600; line-height: 1.3; }
.algo3-stage-label small { font-weight: 400; opacity: 0.8; }
.algo3-stage-arrow { font-size: 1.4rem; color: #aaa; padding: 0 0.3rem; }

.algo3-panel {
  background: #fff;
  border-radius: 16px;
  border: 2px solid #e0e8e8;
  padding: 1.5rem;
}
.algo3-panel-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0c4e54;
  margin-bottom: 1.2rem;
  padding-bottom: 0.7rem;
  border-bottom: 2px solid #e0f0f0;
}
.algo3-subtitle { font-weight: 400; font-size: 0.9rem; color: #666; }

.algo3-step { display: none; padding: 1rem 0; }
.algo3-step.active { display: block; }
.algo3-result-block { display: none; }

.algo3-q { font-size: 1rem; font-weight: 600; color: #1a1a2e; margin-bottom: 0.5rem; }
.algo3-hint {
  font-size: 0.82rem;
  color: #666;
  margin-bottom: 1rem;
  background: #f8fbfb;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  border-left: 3px solid #01696f;
}

.algo3-btns { display: flex; gap: 0.7rem; flex-wrap: wrap; }
.algo3-btns-multi { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.algo3-btn {
  padding: 0.55rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.88rem;
  transition: all 0.15s;
}
.btn-yes { background: #01696f; color: #fff; }
.btn-yes:hover { background: #0c4e54; }
.btn-no { background: #e74c3c; color: #fff; }
.btn-no:hover { background: #c0392b; }
.btn-opt { background: #f0f4f4; color: #0c4e54; border: 1.5px solid #c8d8d8; }
.btn-opt:hover { background: #e0eeee; border-color: #01696f; }
.btn-undef { background: #fdf2e9; color: #784212; border-color: #f0b27a; }

.algo3-result-block {
  background: #f0f9f6;
  border-radius: 12px;
  padding: 1.2rem;
  border: 2px solid #27ae60;
}
.algo3-result-label { margin-bottom: 0.5rem; }
.algo3-badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 700;
}
.badge-gr87 { background: #e8f4fd; color: #1a5276; }
.badge-gr84 { background: #e9f7ef; color: #1e8449; }
.badge-undef { background: #fef9e7; color: #7d6608; }
.algo3-code-val { font-weight: 700; font-size: 1rem; color: #0c4e54; }
.algo3-code-note { font-size: 0.82rem; color: #666; }

.algo3-next-btn {
  margin-top: 0.8rem;
  background: #01696f;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}
.algo3-next-btn:hover { background: #0c4e54; }
.algo3-reset-btn {
  margin-top: 0.8rem;
  background: transparent;
  color: #888;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;
}
.algo3-reset-btn:hover { color: #555; border-color: #999; }

/* ========== ФИНАЛЬНАЯ СВЕРКА ========== */
.algo3-final {}
.algo3-final-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.algo3-final-box { flex: 1; min-width: 200px; border-radius: 12px; padding: 1rem 1.2rem; border: 2px solid; }
.box-confirmed { background: #e9f7ef; border-color: #27ae60; }
.box-undef { background: #fef9e7; border-color: #f0b27a; }
.algo3-final-box-title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666;
  margin-bottom: 0.4rem;
}
.algo3-final-box-code { font-weight: 700; font-size: 0.92rem; color: #1a1a2e; }
.algo3-final-vs { font-size: 1.8rem; color: #aaa; flex-shrink: 0; }

.algo3-verdict { border-radius: 14px; padding: 1.2rem 1.5rem; margin-bottom: 1rem; }
.verdict-ok { background: #e9f7ef; border: 2px solid #27ae60; }
.verdict-warn { background: #fef9e7; border: 2px solid #f39c12; }
.verdict-expert { background: #fdedec; border: 2px solid #e74c3c; }
.verdict-icon { font-size: 1.8rem; margin-bottom: 0.4rem; }
.verdict-title { font-weight: 700; font-size: 1rem; color: #1a1a2e; margin-bottom: 0.4rem; }
.verdict-code { font-size: 1.05rem; font-weight: 800; color: #0c4e54; margin-bottom: 0.4rem; }
.verdict-sep { color: #aaa; margin: 0 0.4rem; }
.verdict-note { font-size: 0.83rem; color: #555; }

.verdict-codes-pair { display: flex; align-items: center; gap: 0.8rem; margin: 0.6rem 0; flex-wrap: wrap; }
.vcp-box { background: rgba(255,255,255,0.7); border-radius: 8px; padding: 0.5rem 0.8rem; flex: 1; min-width: 160px; }
.vcp-label { font-size: 0.75rem; color: #888; display: block; }
.vcp-code { font-weight: 700; font-size: 0.9rem; color: #1a1a2e; }
.vcp-arrow { font-size: 1.5rem; color: #e74c3c; font-weight: 800; }

.algo3-final-actions { margin-top: 1rem; }
.algo3-reset-all-btn {
  background: #0c4e54;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.9rem;
}
.algo3-reset-all-btn:hover { background: #01696f; }
