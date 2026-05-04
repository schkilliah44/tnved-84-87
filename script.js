/* ===== БУРГЕР-МЕНЮ ===== */
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burger');
  var nav    = document.getElementById('mainNav');
  if (burger && nav) {
    burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  }
  // Активная ссылка при скролле
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

/* ===== СУДЕБНАЯ ПРАКТИКА: карточки ===== */
function toggleCase2(card) {
  var detail = card.querySelector('.case2-detail');
  var btn    = card.querySelector('.case2-toggle');
  var isOpen = card.classList.contains('open2');
  var grid   = card.closest('.cases-grid');
  // Закрываем все другие
  if (grid) {
    grid.querySelectorAll('.case-card2.open2').forEach(function(c) {
      if (c !== card) {
        c.classList.remove('open2');
        var d = c.querySelector('.case2-detail');
        var b = c.querySelector('.case2-toggle');
        if (d) d.style.display = 'none';
        if (b) b.textContent  = 'Подробнее ▾';
      }
    });
  }
  // Переключаем текущую
  if (isOpen) {
    card.classList.remove('open2');
    detail.style.display = 'none';
    if (btn) btn.textContent = 'Подробнее ▾';
  } else {
    card.classList.add('open2');
    detail.style.display = 'block';
    if (btn) btn.textContent = 'Свернуть ▴';
  }
});
  }
  if (!isOpen) {
    card.classList.add('open2');
    detail.style.display = 'block';
    btn.textContent = 'Свернуть ▴';
  }
}

function filterCases(filter, btn) {
  document.querySelectorAll('.case-filter-btn').forEach(function (b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.case-card2').forEach(function (card) {
    card.classList.toggle('hidden', filter !== 'all' && card.dataset.result !== filter);
  });
  document.querySelectorAll('.cases-category').forEach(function (cat) {
    cat.classList.toggle('all-hidden', cat.querySelectorAll('.case-card2:not(.hidden)').length === 0);
  });
}

/* ===== АЛГОРИТМ КЛАССИФИКАЦИИ ===== */
(function () {
  var TREE = {
    1: { yes: 2,                no: 3 },
    2: { yes: 'g87_8704_8705', no: 3 },
    3: { yes: 4,                no: 5 },
    4: { yes: 'g84_8430',      no: 5 },
    5: { yes: 6,                no: 'g87_8705_8704' },
    6: { yes: 'g84_8474_8430', no: 'dispute' }
  };
  var TOTAL = 6;

  var RESULTS = {
    g87_8704_8705: {
      cls:   'result2-g87',
      group: '🔴 Группа 87 — Транспортное средство',
      code:  'Вероятный код: 8704 22 920 9 / 8705 40 000 1 / 8705 90 800 5',
      rate:  'Ставка ввозной пошлины: 15% + НДС 22% = итого ~40,3%',
      opi:   'Применимые ОПИ: 1, 3. Примечание 3б ТН ВЭД для спецавтомобилей.',
      cases: [{ text: 'Дело AIMIX AS-3.5 (2023)', anchor: '#case-aimix' },
              { text: 'Дело YUGONG SDM4000 (2023)', anchor: '#case-yugong' }]
    },
    g87_8705_8704: {
      cls:   'result2-g87',
      group: '🔴 Группа 87 — Спецавтомобиль / Самосвал',
      code:  'Вероятный код: 8705 90 800 5 / 8704 22 920 9',
      rate:  'Ставка ввозной пошлины: 15% + НДС 22% = итого ~40,3%',
      opi:   'Применимые ОПИ: 1, 3. Основная функция — транспортная. Примечание 1 к разделу XVII.',
      cases: [{ text: 'Дело PAUS UNI 50-3 LP (2024)', anchor: '#case-paus' }]
    },
    g84_8430: {
      cls:   'result2-g84',
      group: '🟢 Группа 84 — Горная / тоннельная машина',
      code:  'Вероятный код: 8430 50 000 3',
      rate:  'Ставка ввозной пошлины: 0% + НДС 22% = итого ~22,0%',
      opi:   'Применимые ОПИ: 1, 3б. Основная функция — горнопроходческая. Примечание 2 к разделу XVI.',
      cases: [{ text: 'Дело Normet Utilift (2020)', anchor: '#case-normet' },
              { text: 'Дело Charmec MF 504 D (2022)', anchor: '#case-charmec' }]
    },
    g84_8474_8430: {
      cls:   'result2-g84',
      group: '🟢 Группа 84 — Самоходная машина',
      code:  'Вероятный код: 8474 31 000 9 / 8430 50 000 3 / 8429',
      rate:  'Ставка ввозной пошлины: 0% + НДС 22% = итого ~22,0%',
      opi:   'Применимые ОПИ: 1, 3б. Основная функция — технологическая. Примечание 2 к разделу XVI.',
      cases: [{ text: 'Дело Normet Utilift (2020)', anchor: '#case-normet' }]
    },
    dispute: {
      cls:   'result2-dispute',
      group: '🟡 Спорная зона — рекомендуется экспертиза',
      code:  'Риск переклассификации: 8705 40 000 1 (пошлина 15%)',
      rate:  'Текущая позиция: 0%. После переклассификации: ~40,3%',
      opi:   'Применимые ОПИ: 1, 3а, 3б. Рекомендуется таможенная экспертиза (ст. 389 ТК ЕАЭС).',
      cases: [{ text: 'Дело CARMIX 3500 (2024, спор)', anchor: '#case-carmix' },
              { text: 'Дело AIMIX AS-3.5 (2023)', anchor: '#case-aimix' }]
    }
  };

  var currentStep = 1;
  var history     = [];

  function showStep(stepId) {
    document.querySelectorAll('.algo-step2').forEach(function (el) {
      el.classList.remove('active');
      el.style.display = '';
    });
    document.getElementById('algoResultBlock').style.display = 'none';
    var target = document.getElementById('algoStep' + stepId);
    if (target) { void target.offsetWidth; target.style.display = 'block'; void target.offsetWidth; target.classList.add('active'); }
    updateProgress(stepId);
    updateBreadcrumbs();
  }

  function updateProgress(stepId) {
    var pct = Math.round((stepId / TOTAL) * 100);
    document.getElementById('algoProgressFill').style.width  = pct + '%';
    document.getElementById('algoProgressPct').textContent   = pct + '%';
    document.getElementById('algoProgressLabel').textContent = 'Шаг ' + stepId + ' из ' + TOTAL;
  }

  function updateBreadcrumbs() {
    var bc = document.getElementById('algoBreadcrumbs');
    if (!bc) return;
    bc.innerHTML = history.map(function (h) {
      var cls  = h.answer === 'yes' ? 'bc-yes' : 'bc-no';
      var text = (h.answer === 'yes' ? '✓ ' : '✗ ') + 'Шаг ' + h.step;
      return '<span class="breadcrumb-item ' + cls + '">' + text + '</span>';
    }).join('');
  }

  window.algoGo = function (targetStep) {
    var node   = TREE[currentStep];
    var answer = (node && node.yes === targetStep) ? 'yes' : 'no';
    history.push({ step: currentStep, answer: answer });
    currentStep = targetStep;
    showStep(targetStep);
  };

  window.algoResult = function (resultKey) {
    var node   = TREE[currentStep];
    var answer = (node && node.no === resultKey) ? 'no' : 'yes';
    history.push({ step: currentStep, answer: answer });
    updateBreadcrumbs();
    document.querySelectorAll('.algo-step2').forEach(function (el) { el.classList.remove('active'); el.style.display = ''; });
    var data      = RESULTS[resultKey] || RESULTS['dispute'];
    var caseLinks = data.cases.map(function (c) {
      return '<a class="result2-case-link" href="' + c.anchor + '" onclick="openCase(\'' + c.anchor.replace(\'#\',\'\') + \'\');return false;">📋 ' + c.text + '</a>';
    }).join('');
    document.getElementById('algoResultContent').innerHTML =
      '<div class="result2-block ' + data.cls + '">' +
        '<div class="result2-group">' + data.group + '</div>' +
        '<div class="result2-code">'  + data.code  + '</div>' +
        '<div class="result2-rate">'  + data.rate  + '</div>' +
        '<div class="result2-opi">'   + data.opi   + '</div>' +
        '<div class="result2-cases">' + caseLinks  + '</div>' +
      '</div>';
    document.getElementById('algoProgressFill').style.width  = '100%';
    document.getElementById('algoProgressPct').textContent   = '100%';
    document.getElementById('algoProgressLabel').textContent = 'Анализ завершён';
    var rb = document.getElementById('algoResultBlock');
    rb.style.display = 'block'; void rb.offsetWidth; rb.classList.add('active');
  };

  window.algoRestart = window.algoReset2 = function () {
    currentStep = 1; history = [];
    document.getElementById('algoProgressFill').style.width  = '17%';
    document.getElementById('algoProgressPct').textContent   = '17%';
    document.getElementById('algoProgressLabel').textContent = 'Шаг 1 из 6';
    document.getElementById('algoBreadcrumbs').innerHTML     = '';
    document.getElementById('algoResultBlock').style.display = 'none';
    showStep(1);
  };
})();

/* ===== ОТКРЫТИЕ КАРТОЧКИ ДЕЛА ПО ССЫЛКЕ ИЗ АЛГОРИТМА ===== */
window.openCase = function(caseId) {
  var card = document.getElementById(caseId);
  if (!card) return;
  // Скрыть все открытые карточки
  document.querySelectorAll('.case-card2.open2').forEach(function(c) {
    c.classList.remove('open2');
    var d = c.querySelector('.case2-detail');
    var b = c.querySelector('.case2-toggle');
    if (d) d.style.display = 'none';
    if (b) b.textContent = 'Подробнее ▾';
  });
  // Открыть нужную
  card.classList.add('open2');
  var detail = card.querySelector('.case2-detail');
  var btn = card.querySelector('.case2-toggle');
  if (detail) detail.style.display = 'block';
  if (btn) btn.textContent = 'Свернуть ▴';
  // Скроллим к карточке
  setTimeout(function() {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
};
