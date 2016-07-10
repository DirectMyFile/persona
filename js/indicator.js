let indicatorIndex = 0;
let indicatorLength = 0;

let indicators = {};
let listener;

const addIndicator = (persona) => {
  var { id } = persona;
  var indicator = persona[SYMBOL_INDICATOR];

  var el = document.querySelector(".indicator-container");
  el.appendChild(indicator);

  if(el.children.length === 1)
    indicator.className = `${indicator.className} active`;

  indicator.dataset.id = persona.id;

  indicatorLength++;
  indicators[persona.id] = persona;
};

const getIndicatorOffset = (container, active) => {
  var index = Array.prototype.indexOf.call(container.children, active);
  return index * (52 + 32);
};

const centerIndicator = (indicator) => {
  if(listener)
    indicators[document.querySelector('.indicator.active').dataset.id].remove('text', listener);
  listener = null;

  var widthHalf = (window.innerWidth) / 2 - 52;
  var text = document.querySelector(".indicator-text");
  var container = document.querySelector(".indicator-container");

  var left = getIndicatorOffset(container, indicator);

  container.style.transform = `translate(${widthHalf - left}px,0)`;
  container.className = 'indicator-container animated';

  var persona = indicators[indicator.dataset.id];
  text.innerHTML = persona[SYMBOL_TEXT];

  listener = (newText) => {
    text.innerHTML = newText;
  };

  persona.on('text', listener);
};

const moveIndicatorLeft = () => {
  var container = document.querySelector(".indicator-container");
  container.children[indicatorIndex].className = 'indicator';

  indicatorIndex--;
  if(indicatorIndex < 0)
    indicatorIndex = indicatorLength - 1;

  container.children[indicatorIndex].className = `indicator active`;
  centerIndicator(container.children[indicatorIndex]);
};

const moveIndicatorRight = () => {
  var container = document.querySelector(".indicator-container");
  container.children[indicatorIndex].className = 'indicator';

  indicatorIndex++;
  if(indicatorIndex >= indicatorLength)
    indicatorIndex = 0;

  container.children[indicatorIndex].className = `indicator active`;
  centerIndicator(container.children[indicatorIndex]);
};

const manageIndicators = () => {
  var active = document.querySelector('.indicator.active');
  centerIndicator(active);

  document.querySelector('.indicator-text').style.display = 'block';
  document.querySelector('.indicator-container').style.display = 'flex';

  // for debugging
  window.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowRight') {
      moveIndicatorRight();
    }

    if(e.key === 'ArrowLeft') {
      moveIndicatorLeft();
    }
  });
};
