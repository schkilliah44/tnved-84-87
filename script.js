/* ===== БУРГЕР-МЕНЮ ===== */
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burger');
  var nav    = document.getElementById('mainNav');
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
var algo3 = {
  p1Code: null,
  p1Label: null,
  p2Code: null,
  p2Label: null,
  currentStage: 1
};

function algo3GoStage(n) {
  if (n === 2 && algo3.p1Code === null) { alert('Сначала завершите Проверку П1'); return; }
  if (n === 3 && algo3.p2Code === null) { alert('Сначала завершите Проверку П2'); return; }

  algo3.currentStage = n;
  ['algoPanel1','algoPanel2','algoPanel3'].forEach(function(id, i) {
    document.getElementById(id).style.display = (i + 1 === n) ? 'block' : 'none';
  });
  ['stageTab1','stageTab2','stageTab3'].forEach(function(id, i) {
    var el = document.getElementById(id);
    el.classList.toggle('active', i + 1 === n);
    el.classList.toggle('done', i + 1 < n);
  });
  if (n === 3) algo3ShowFinal();
}

function p1Go(stepId) {
  document.querySelectorAll('#algoPanel1 .algo3-step').forEach(function(s){ s.classList.remove('active'); });
  var el = document.getElementById(stepId);
  if (el) { el.classList.add('active'); el.style.display = ''; }
}

function p1SetResult(code, label) {
  algo3.p1Code = code;
  algo3.p1Label = label;
  document.querySelectorAll('#algoPanel1 .algo3-step').forEach(function(s){ s.classList.remove('active'); });
  var r = document.getElementById('p1result');
  r.style.display = 'block';
  r.classList.add('active');

  var isUndef = (code === 'undef');
  document.getElementById('p1resultLabel').innerHTML = isUndef
    ? '<span class="algo3-badge badge-undef">⚠ Результат П1: НЕ ОПРЕДЕЛЁН</span>'
    : '<span class="algo3-badge badge-gr87">✔ Результат П1: Группа 87 — код уточнён</span>';
  document.getElementById('p1resultCode').innerHTML = isUndef
    ? '<span class="algo3-code-note">Причина: ' + label + '</span><br><span class="algo3-code-note">→ Передать на СВЕРКУ после П2</span>'
    : '<span class="algo3-code-val">' + label + '</span><br><span class="algo3-code-note">→ Передать на СВЕРКУ после П2</span>';
}

function p1Reset() {
  algo3.p1Code = null; algo3.p1Label = null;
  document.getElementById('p1result').style.display = 'none';
  document.querySelectorAll('#algoPanel1 .algo3-step').forEach(function(s){ s.style.display=''; s.classList.remove('active'); });
  document.getElementById('p1s1').classList.add('active');
  document.getElementById('stageTab1').classList.remove('done');
}

function p2Go(stepId) {
  document.querySelectorAll('#algoPanel2 .algo3-step').forEach(function(s){ s.classList.remove('active'); });
  var el = document.getElementById(stepId);
  if (el) { el.classList.add('active'); el.style.display = ''; }
}

function p2SetResult(code, label) {
  algo3.p2Code = code;
  algo3.p2Label = label;
  document.querySelectorAll('#algoPanel2 .algo3-step').forEach(function(s){ s.classList.remove('active'); });
  var r = document.getElementById('p2result');
  r.style.display = 'block';
  r.classList.add('active');

  var isUndef = (code === 'undef');
  var is87 = ['8702','8703','8704','8705'].indexOf(code) >= 0;
  var badgeHtml = isUndef
    ? '<span class="algo3-badge badge-undef">⚠ Результат П2: НЕ ОПРЕДЕЛЁН</span>'
    : is87
      ? '<span class="algo3-badge badge-gr87">✔ Результат П2: Группа 87 — код уточнён</span>'
      : '<span class="algo3-badge badge-gr84">✔ Результат П2: Группа 84 — код уточнён</span>';

  document.getElementById('p2resultLabel').innerHTML = badgeHtml;
  document.getElementById('p2resultCode').innerHTML = isUndef
    ? '<span class="algo3-code-note">Причина: ' + label + '</span><br><span class="algo3-code-note">→ Передать на СВЕРКУ</span>'
    : '<span class="algo3-code-val">' + label + '</span><br><span class="algo3-code-note">→ Передать на СВЕРКУ</span>';
}

function p2Reset() {
  algo3.p2Code = null; algo3.p2Label = null;
  document.getElementById('p2result').style.display = 'none';
  document.querySelectorAll('#algoPanel2 .algo3-step').forEach(function(s){ s.style.display=''; s.classList.remove('active'); });
  document.getElementById('p2s1').classList.add('active');
  document.getElementById('stageTab2').classList.remove('done');
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

  var html = '<div class="algo3-final">';
  html += '<div class="algo3-final-row">';
  html += '<div class="algo3-final-box ' + (p1undef ? 'box-undef' : 'box-confirmed') + '">';
  html += '<div class="algo3-final-box-title">Результат П1</div>';
  html += '<div class="algo3-final-box-code">' + (p1undef ? '⚠ НЕ ОПРЕДЕЛЁН' : '✔ ' + l1) + '</div>';
  html += '</div>';
  html += '<div class="algo3-final-vs">⚡</div>';
  html += '<div class="algo3-final-box ' + (p2undef ? 'box-undef' : 'box-confirmed') + '">';
  html += '<div class="algo3-final-box-title">Результат П2</div>';
  html += '<div class="algo3-final-box-code">' + (p2undef ? '⚠ НЕ ОПРЕДЕЛЁН' : '✔ ' + l2) + '</div>';
  html += '</div>';
  html += '</div>';

  var verdict = '';

  if (!p1undef && !p2undef && c1 === c2) {
    verdict = '<div class="algo3-verdict verdict-ok">'
      + '<div class="verdict-icon">✅</div>'
      + '<div class="verdict-title">Код подтверждён — результаты совпадают</div>'
      + '<div class="verdict-code">' + l1 + '</div>'
      + '<div class="verdict-note">Классификационное решение принято. Декларирование может быть завершено.</div>'
      + '</div>';
  } else if (!p1undef && !p2undef && ((p1is87 && p2is87) || (p1is84 && p2is84))) {
    var grp = p1is87 ? '87' : '84';
    verdict = '<div class="algo3-verdict verdict-ok">'
      + '<div class="verdict-icon">✅</div>'
      + '<div class="verdict-title">Группа ' + grp + ' подтверждена — уточните субпозицию</div>'
      + '<div class="verdict-code">' + l1 + ' <span class="verdict-sep">↔</span> ' + l2 + '</div>'
      + '<div class="verdict-note">Оба метода указывают на гр. ' + grp + '. Для точного кода сопоставьте описание позиции с техническими характеристиками товара (ОПИ 6).</div>'
      + '</div>';
  } else if (!p1undef && p2undef) {
    verdict = '<div class="algo3-verdict verdict-warn">'
      + '<div class="verdict-icon">⚠️</div>'
      + '<div class="verdict-title">П2 не определён — требуется уточнение</div>'
      + '<div class="verdict-code">' + l1 + '</div>'
      + '<div class="verdict-note">Результат П1 даёт ориентир, однако конструктивные признаки не установлены. Рекомендуется дополнительный осмотр товара или запрос документации производителя.</div>'
      + '</div>';
  } else if (p1undef && !p2undef) {
    verdict = '<div class="algo3-verdict verdict-ok">'
      + '<div class="verdict-icon">✅</div>'
      + '<div class="verdict-title">Код определён по П2 (П1 не дал результата)</div>'
      + '<div class="verdict-code">' + l2 + '</div>'
      + '<div class="verdict-note">Документальная проверка не позволила установить группу. Код принят по конструктивным признакам (П2). Классификационное решение может быть принято.</div>'
      + '</div>';
  } else if (p1undef && p2undef) {
    verdict = '<div class="algo3-verdict verdict-expert">'
      + '<div class="verdict-icon">🔬</div>'
      + '<div class="verdict-title">Оба результата не определены — экспертиза обязательна</div>'
      + '<div class="verdict-note">Назначить таможенную экспертизу в ЭКС ЦЭКТУ (ст. 389 ТК ЕАЭС). По заключению эксперта будут установлены фактические признаки товара.</div>'
      + '</div>';
  } else {
    verdict = '<div class="algo3-verdict verdict-expert">'
      + '<div class="verdict-icon">❌</div>'
      + '<div class="verdict-title">Расхождение результатов — назначить экспертизу ЭКС ЦЭКТУ</div>'
      + '<div class="verdict-codes-pair">'
      + '<div class="vcp-box vcp-p1"><span class="vcp-label">П1 даёт:</span><span class="vcp-code">' + l1 + '</span></div>'
      + '<div class="vcp-arrow">≠</div>'
      + '<div class="vcp-box vcp-p2"><span class="vcp-label">П2 даёт:</span><span class="vcp-code">' + l2 + '</span></div>'
      + '</div>'
      + '<div class="verdict-note">Основание: ст. 389 ТК ЕАЭС. По заключению эксперта ЭКС ЦЭКТУ устанавливаются фактические признаки товара и принимается итоговое классификационное решение.</div>'
      + '</div>';
  }

  html += verdict;
  html += '<div class="algo3-final-actions">';
  html += '<button class="algo3-reset-all-btn" onclick="algo3ResetAll()">↺ Начать заново</button>';
  html += '</div>';
  html += '</div>';

  document.getElementById('algoFinalContent').innerHTML = html;
}

function algo3ResetAll() {
  algo3.p1Code = null; algo3.p1Label = null;
  algo3.p2Code = null; algo3.p2Label = null;
  p1Reset(); p2Reset();
  algo3GoStage(1);
  document.getElementById('algoFinalContent').innerHTML = '';
}
