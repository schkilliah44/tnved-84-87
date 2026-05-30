/* ===== БУРГЕР-МЕНЮ ===== */
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  }

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', function () {
    var pos = window.scrollY + 90;
    sections.forEach(function (s) {
      if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        var active = document.querySelector('.nav-link[href="#' + s.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  });
});

/* ===== ФИЛЬТРАЦИЯ КОДОВ ТН ВЭД ===== */
function filterCodes(group, btn) {
  document.querySelectorAll('#codesTable .filter-btn, .filter-row .filter-btn').forEach(function (b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('#codesTable tbody tr').forEach(function (row) {
    row.style.display = (group === 'all' || row.dataset.group === group) ? '' : 'none';
  });
}

/* ===== МОДАЛЬНОЕ ОКНО СУДЕБНОЙ ПРАКТИКИ ===== */
function openCaseModal(title, html) {
  var modal = document.getElementById('caseModal');
  if (!modal) return;
  modal.querySelector('.case-modal-title').textContent = title;
  modal.querySelector('.case-modal-body').innerHTML = html;
  modal.classList.add('show');
}
function closeCaseModal() {
  var modal = document.getElementById('caseModal');
  if (modal) modal.classList.remove('show');
}
document.addEventListener('click', function (e) {
  if (e.target && e.target.classList && e.target.classList.contains('case-modal-backdrop')) {
    closeCaseModal();
  }
});

/* ===== ТРИ ЭТАПА АЛГОРИТМА ===== */
var algo3 = { p1Code: null, p1Label: null, p2Code: null, p2Label: null, currentStage: 1 };

function algo3GoStage(n) {
  if (n === 2 && algo3.p1Code === null) { alert('Сначала завершите Проверку П1'); return; }
  if (n === 3 && algo3.p2Code === null) { alert('Сначала завершите Проверку П2'); return; }
  algo3.currentStage = n;
  ['algoPanel1','algoPanel2','algoPanel3'].forEach(function (id, i) {
    var el = document.getElementById(id);
    if (el) el.style.display = (i + 1 === n) ? 'block' : 'none';
  });
  ['stageTab1','stageTab2','stageTab3'].forEach(function (id, i) {
    var el = document.getElementById(id);
    if (el) {
      el.classList.toggle('active', i + 1 === n);
      el.classList.toggle('done', i + 1 < n);
    }
  });
  if (n === 3) algo3ShowFinal();
}

function p1Go(stepId) {
  document.querySelectorAll('#algoPanel1 .algo3-step').forEach(function (s) { s.classList.remove('active'); });
  var el = document.getElementById(stepId);
  if (el) { el.classList.add('active'); el.style.display = ''; }
}
function p1SetResult(code, label) {
  algo3.p1Code = code;
  algo3.p1Label = label;
  document.querySelectorAll('#algoPanel1 .algo3-step').forEach(function (s) { s.classList.remove('active'); });
  var r = document.getElementById('p1result');
  if (!r) return;
  r.style.display = 'block';
  r.classList.add('active');
  var isUndef = (code === 'undef');
  var p1Label = document.getElementById('p1resultLabel');
  var p1Code = document.getElementById('p1resultCode');
  if (p1Label) p1Label.innerHTML = isUndef ? '⚠ Результат П1: НЕ ОПРЕДЕЛЁН' : '✔ Результат П1: Группа 87 — код уточнён';
  if (p1Code) p1Code.innerHTML = isUndef ? 'Причина: ' + label + '<br>→ Передать на СВЕРКУ после П2' : label + '<br>→ Передать на СВЕРКУ после П2';
}
function p1Reset() {
  algo3.p1Code = null; algo3.p1Label = null;
  var r = document.getElementById('p1result'); if (r) r.style.display = 'none';
  document.querySelectorAll('#algoPanel1 .algo3-step').forEach(function (s) { s.style.display=''; s.classList.remove('active'); });
  var p = document.getElementById('p1s1'); if (p) p.classList.add('active');
  var t = document.getElementById('stageTab1'); if (t) t.classList.remove('done');
}
function p2Go(stepId) {
  document.querySelectorAll('#algoPanel2 .algo3-step').forEach(function (s) { s.classList.remove('active'); });
  var el = document.getElementById(stepId);
  if (el) { el.classList.add('active'); el.style.display = ''; }
}
function p2SetResult(code, label) {
  algo3.p2Code = code; algo3.p2Label = label;
  document.querySelectorAll('#algoPanel2 .algo3-step').forEach(function (s) { s.classList.remove('active'); });
  var r = document.getElementById('p2result');
  if (!r) return;
  r.style.display = 'block';
  r.classList.add('active');
  var isUndef = (code === 'undef');
  var is87 = ['8702','8703','8704','8705'].indexOf(code) >= 0;
  var badgeHtml = isUndef ? '⚠ Результат П2: НЕ ОПРЕДЕЛЁН' : is87 ? '✔ Результат П2: Группа 87 — код уточнён' : '✔ Результат П2: Группа 84 — код уточнён';
  var p2Label = document.getElementById('p2resultLabel');
  var p2Code = document.getElementById('p2resultCode');
  if (p2Label) p2Label.innerHTML = badgeHtml;
  if (p2Code) p2Code.innerHTML = isUndef ? 'Причина: ' + label + '<br>→ Передать на СВЕРКУ' : label + '<br>→ Передать на СВЕРКУ';
}
function p2Reset() {
  algo3.p2Code = null; algo3.p2Label = null;
  var r = document.getElementById('p2result'); if (r) r.style.display = 'none';
  document.querySelectorAll('#algoPanel2 .algo3-step').forEach(function (s) { s.style.display=''; s.classList.remove('active'); });
  var p = document.getElementById('p2s1'); if (p) p.classList.add('active');
  var t = document.getElementById('stageTab2'); if (t) t.classList.remove('done');
}
function algo3ShowFinal() {
  var c1 = algo3.p1Code, c2 = algo3.p2Code;
  var l1 = algo3.p1Label, l2 = algo3.p2Label;
  var gr87 = ['8702','8703','8704','8705'];
  var gr84 = ['8426','8427','8429','8430','8474','8432'];
  var p1is87 = gr87.indexOf(c1) >= 0;
  var p1is84 = gr84.indexOf(c1) >= 0;
  var p2is87 = gr87.indexOf(c2) >= 0;
  var p2is84 = gr84.indexOf(c2) >= 0;
  var p1undef = (c1 === 'undef');
  var p2undef = (c2 === 'undef');
  var html = '';
  if (p1is87 && p2is87) {
    html = '<div class="verdict-ok"><div class="verdict-icon">✅</div><div class="verdict-title">Итог: группа 87</div><div class="verdict-code">' + (l1 || '') + ' / ' + (l2 || '') + '</div><div class="verdict-note">Оба этапа подтверждают классификацию как транспортное средство.</div></div>';
  } else if (p1is84 || p2is84) {
    html = '<div class="verdict-ok"><div class="verdict-icon">✅</div><div class="verdict-title">Итог: группа 84</div><div class="verdict-code">' + (l1 || '') + ' / ' + (l2 || '') + '</div><div class="verdict-note">Конструкция и функция указывают на подвижную машину.</div></div>';
  } else if (p1undef || p2undef) {
    html = '<div class="verdict-warn"><div class="verdict-icon">⚠️</div><div class="verdict-title">Итог: требуется дополнительная проверка</div><div class="verdict-note">На одном из этапов результат не определён, нужна экспертиза.</div></div>';
  } else {
    html = '<div class="verdict-expert"><div class="verdict-icon">🧭</div><div class="verdict-title">Итог: спорная зона</div><div class="verdict-note">Требуется сверка документов, техописания и, при необходимости, таможенная экспертиза.</div></div>';
  }
  var box = document.getElementById('algoFinalResult');
  if (box) box.innerHTML = html;
}
function algo3ResetAll() {
  algo3.p1Code = null; algo3.p1Label = null; algo3.p2Code = null; algo3.p2Label = null; algo3.currentStage = 1;
  ['algoPanel1','algoPanel2','algoPanel3'].forEach(function (id, i) {
    var el = document.getElementById(id); if (el) el.style.display = (i === 0) ? 'block' : 'none';
  });
  ['stageTab1','stageTab2','stageTab3'].forEach(function (id, i) {
    var el = document.getElementById(id); if (el) { el.classList.toggle('active', i === 0); el.classList.remove('done'); }
  });
  ['p1result','p2result'].forEach(function (id) { var el = document.getElementById(id); if (el) el.style.display = 'none'; });
  var p1 = document.getElementById('p1s1'); if (p1) p1.classList.add('active');
  var p2 = document.getElementById('p2s1'); if (p2) p2.classList.add('active');
}
window.filterCodes = filterCodes;
window.openCaseModal = openCaseModal;
window.closeCaseModal = closeCaseModal;
window.algo3GoStage = algo3GoStage;
window.p1Go = p1Go;
window.p1SetResult = p1SetResult;
window.p1Reset = p1Reset;
window.p2Go = p2Go;
window.p2SetResult = p2SetResult;
window.p2Reset = p2Reset;
window.algo3ShowFinal = algo3ShowFinal;
window.algo3ResetAll = algo3ResetAll;
