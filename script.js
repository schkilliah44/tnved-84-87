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
  document.querySelectorAll('#codesTable .filter-btn, .filter-row .filter-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('#codesTable tbody tr').forEach(function (row) {
    row.style.display = (group === 'all' || row.dataset.group === group) ? '' : 'none';
  });
}

/* ===== СУДЕБНАЯ ПРАКТИКА: карточки ===== */
function toggleCase2(card) {
  var detail = card.querySelector('.case2-detail');
  var btn = card.querySelector('.case2-toggle');
  var isOpen = card.classList.contains('open2');
  var grid = card.closest('.cases-grid');

  if (grid) {
    grid.querySelectorAll('.case-card2.open2').forEach(function (c) {
      c.classList.remove('open2');
      c.querySelector('.case2-detail').style.display = 'none';
      c.querySelector('.case2-toggle').textContent = 'Подробнее ▾';
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

  /* Порядковые номера шагов для прогресс-бара (1–14) */
  var STEP_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 91, 92, 93, 10, 101, 11, 111, 112, 113, 114];
  var TOTAL = STEP_ORDER.length;

  var state = { p1: null, p2: null, step: 1 };

  var Q = {
    1:   { q: 'Имеется ли на товар ОТТС по ТР ТС 018/2011?',                                         h: 'ОТТС — обязательный документ для колёсных транспортных средств группы 87.',               nextYes: 2,          nextNo: 8 },
    2:   { q: 'Присвоен ли товару VIN?',                                                              h: 'VIN подтверждает идентификацию колёсного транспортного средства.',                       nextYes: 3,          nextNo: 8 },
    3:   { q: 'Функция товара — перевозка пассажиров?',                                               h: 'Если назначение пассажирское, далее уточняется количество мест.',                        nextYes: 4,          nextNo: 5 },
    4:   { q: 'Количество пассажиров меньше 10?',                                                     h: 'Если да — позиция 8703; если нет — позиция 8702.',                                      nextYes: 'p1_8703',  nextNo: 'p1_8702' },
    5:   { q: 'Назначение по документам — перевозка грузов?',                                         h: 'Грузовое назначение характерно для группы 87.',                                         nextYes: 'p1_8704',  nextNo: 6 },
    6:   { q: 'Назначение по документам — спецтехника / спецавтомобиль?',                             h: 'Спецавтомобиль на дорожном шасси часто относится к группе 87.',                         nextYes: 'p1_8705',  nextNo: 7 },
    7:   { q: 'Документы по ТР ТС 018/2011 отсутствуют — результат П1 не определён?',                h: 'При отсутствии подтверждающих документов результат П1 не определяется.',                 nextYes: 'p1_none',  nextNo: 'p1_none' },

    8:   { q: 'Максимальная конструктивная скорость больше 50 км/ч?',                                 h: 'Высокая скорость чаще указывает на группу 87.',                                         nextYes: 9,          nextNo: 10 },
    9:   { q: 'Основная функция — перевозка людей?',                                                  h: 'Если да, обязательно уточняется количество пассажиров.',                                nextYes: 91,         nextNo: 92 },
    91:  { q: 'Количество пассажиров меньше 10?',                                                     h: 'Если да — 8703; если нет — 8702.',                                                      nextYes: 'p2_8703',  nextNo: 'p2_8702' },
    92:  { q: 'Основная функция — перевозка грузов?',                                                 h: 'Если да — 8704; если нет, проверяется спецназначение.',                                 nextYes: 'p2_8704',  nextNo: 93 },
    93:  { q: 'Основная функция — спецназначение?',                                                   h: 'Если да — 8705; если нет — переход к ветке группы 84.',                                 nextYes: 'p2_8705',  nextNo: 10 },
    10:  { q: 'Основная функция — подъём или погрузка?',                                              h: 'Если да — 8426 или 8427.',                                                              nextYes: 101,        nextNo: 11 },
    101: { q: 'Подъём (а не погрузка)?',                                                              h: 'Краны и подъёмные устройства — 8426; погрузчики — 8427.',                               nextYes: 'p2_8426',  nextNo: 'p2_8427' },
    11:  { q: 'Основная функция — земляные / горные / бурение / переработка / сельское хозяйство?',  h: 'Если да — выбирается соответствующий код группы 84.',                                   nextYes: 111,        nextNo: 'p2_none' },
    111: { q: 'Земляные работы?',                                                                     h: 'Бульдозеры, грейдеры, скреперы, экскаваторы и катки — 8429.',                           nextYes: 'p2_8429',  nextNo: 112 },
    112: { q: 'Горные работы / бурение?',                                                             h: 'Машины для горных работ, бурения, тоннелей — 8430.',                                    nextYes: 'p2_8430',  nextNo: 113 },
    113: { q: 'Переработка материалов?',                                                              h: 'Дробилки, бетоносмесители, сортировочные установки — 8474.',                            nextYes: 'p2_8474',  nextNo: 114 },
    114: { q: 'Сельское хозяйство?',                                                                  h: 'Сельскохозяйственные машины — 8432 / 8436.',                                            nextYes: 'p2_8432',  nextNo: 'p2_none' }
  };

  /* Порядковый номер шага для прогресс-бара */
  function stepIndex(step) {
    var idx = STEP_ORDER.indexOf(step);
    return idx >= 0 ? idx + 1 : 1;
  }

  function setProgress(step) {
    var idx = stepIndex(step);
    var pct = Math.min(100, Math.round((idx / TOTAL) * 100));
    var fill  = document.getElementById('algoProgressFill');
    var pctEl = document.getElementById('algoProgressPct');
    var label = document.getElementById('algoProgressLabel');
    if (fill)  fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
    if (label) label.textContent = 'Шаг ' + idx + ' из ' + TOTAL;
  }

  function show(step) {
    document.querySelectorAll('.algo-step2').forEach(function (el) {
      el.classList.remove('active');
      el.style.display = 'none';
    });
    var resultBlock = document.getElementById('algoResultBlock');
    if (resultBlock) resultBlock.style.display = 'none';

    var target = document.getElementById('algoStep' + step);
    if (target) {
      target.style.display = 'block';
      void target.offsetWidth;
      target.classList.add('active');
    }
    setProgress(step);
  }

  function family(code) {
    if (!code) return 'x';
    return code.indexOf('87') === 0 ? '87' : (code.indexOf('84') === 0 ? '84' : 'x');
  }

  function renderResult() {
    var p1 = state.p1 || 'Не определён';
    var p2 = state.p2 || 'Не определён';
    var title, code, rate, opi, key;

    if (p1 === p2 && p1 !== 'Не определён') {
      key   = family(p1) === '87' ? 'g87' : 'g84';
      title = '✅ Позиция подтверждена';
      code  = 'Итоговая позиция ТН ВЭД ЕАЭС: ' + p1;
      rate  = 'П1 и П2 совпали по позиции.';
      opi   = 'Позиция подтверждена документальной и конструктивной проверкой.';
    } else if (p1 !== 'Не определён' && p2 === 'Не определён') {
      key   = family(p1) === '87' ? 'g87' : 'g84';
      title = '✅ Позиция подтверждена (П1)';
      code  = 'Итоговая позиция ТН ВЭД ЕАЭС: ' + p1;
      rate  = 'П2 не дал результата — принят П1.';
      opi   = 'Позиция уточнена по документальным признакам.';
    } else if (p1 === 'Не определён' && p2 !== 'Не определён') {
      key   = family(p2) === '87' ? 'g87' : 'g84';
      title = '✅ Позиция подтверждена (П2)';
      code  = 'Итоговая позиция ТН ВЭД ЕАЭС: ' + p2;
      rate  = 'П1 не дал результата — принят П2.';
      opi   = 'Позиция уточнена по конструктивным признакам.';
    } else if (p1 !== 'Не определён' && p2 !== 'Не определён' && p1 !== p2) {
      key   = 'dispute';
      title = '🟡 Расхождение результатов';
      code  = 'П1: ' + p1 + ' · П2: ' + p2;
      rate  = 'Требуется таможенная экспертиза для установления точной позиции.';
      opi   = 'Если П1 и П2 дают разные позиции — приоритет за экспертизой (ст. 389 ТК ЕАЭС).';
    } else {
      key   = 'dispute';
      title = '🟡 Требуется уточнение';
      code  = 'Итог: экспертиза обязательна';
      rate  = 'П1 и П2 не определены — необходима таможенная экспертиза.';
      opi   = 'Сверка П1 и П2 выполняется по результатам документальной и конструктивной проверки.';
    }

    var data = {
      g87:     { cls: 'result2-g87',     cases: [{ text: 'Дело AIMIX AS-3.5 (2023)',       anchor: '#cases' }, { text: 'Дело YUGONG SDM4000 (2023)',      anchor: '#cases' }] },
      g84:     { cls: 'result2-g84',     cases: [{ text: 'Дело Normet Utilift (2020)',      anchor: '#cases' }, { text: 'Дело Charmec MF 504 D (2022)',    anchor: '#cases' }] },
      dispute: { cls: 'result2-dispute', cases: [{ text: 'Назначить таможенную экспертизу', anchor: '#cases' }] }
    }[key];

    var html = '<div class="result2-block ' + data.cls + '">';
    html += '<div class="result2-group">' + title + '</div>';
    html += '<div class="result2-code">' + code + '</div>';
    html += '<div class="result2-rate">' + rate + '</div>';
    html += '<div class="result2-opi">' + opi + '</div>';
    html += '<div class="result2-opi">П1: ' + p1 + ' &nbsp;·&nbsp; П2: ' + p2 + '</div>';
    html += '<div class="result2-cases">' + data.cases.map(function (c) {
      return '<a class="result2-case-link" href="' + c.anchor + '">📋 ' + c.text + '</a>';
    }).join('') + '</div>';
    html += '</div>';
    html += '<button class="step2-restart" onclick="algoReset()">↺ Начать заново</button>';

    var content = document.getElementById('algoResultContent');
    if (content) content.innerHTML = html;

    document.querySelectorAll('.algo-step2').forEach(function (el) {
      el.classList.remove('active');
      el.style.display = 'none';
    });

    var resultBlock = document.getElementById('algoResultBlock');
    if (resultBlock) {
      resultBlock.style.display = 'block';
      void resultBlock.offsetWidth;
      resultBlock.classList.add('active');
    }

    /* Прогресс = 100% на итоге */
    var fill  = document.getElementById('algoProgressFill');
    var pctEl = document.getElementById('algoProgressPct');
    var label = document.getElementById('algoProgressLabel');
    if (fill)  fill.style.width = '100%';
    if (pctEl) pctEl.textContent = '100%';
    if (label) label.textContent = 'Итог';
  }

  /* ---- Главная функция навигации ---- */
  window.algoAnswer = function (ans) {
    var d = Q[state.step];
    if (!d) return;

    var next = ans === 'yes' ? d.nextYes : d.nextNo;

    /* Сохраняем результат П1 (шаги 1–7) */
    if (state.step >= 1 && state.step <= 7) {
      if (typeof next === 'string') {
        if (next === 'p1_none') { state.p1 = null; }
        else if (next.indexOf('p1_') === 0) { state.p1 = next.replace('p1_', ''); }
        /* После любого строкового исхода П1 → переходим в П2 */
        state.step = 8;
        show(8);
        return;
      }
      /* Числовой следующий шаг внутри П1 */
      state.step = next;
      show(next);
      return;
    }

    /* Сохраняем результат П2 (шаги 8+) */
    if (typeof next === 'string') {
      if (next === 'p2_none') { state.p2 = null; }
      else if (next.indexOf('p2_') === 0) { state.p2 = next.replace('p2_', ''); }
      /* Строковый исход П2 → итог */
      renderResult();
      return;
    }

    /* Числовой следующий шаг внутри П2 */
    state.step = next;
    show(next);
  };

  window.algoReset = function () {
    state = { p1: null, p2: null, step: 1 };
    show(1);
  };

  /* Инициализация */
  show(1);

})();
