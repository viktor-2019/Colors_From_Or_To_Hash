// *****    самопальна функція генератора випадкових кольорів   *****//
// const hex = '0123456789ABCDEF';
// function generateColor() {
//   const hex = '0123456789ABCDEF';
//   let color = '';
//   for (let i = 0; i < 6; i++) {
//     color += hex[Math.floor(Math.random() * 16)]
//   }
//   return '#' + color;
// }
const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', e => {
  e.preventDefault();
  if (e.code.toLowerCase() === 'space') {
    setColors(false);
  }
})

document.addEventListener('click', e => {
  const evTar = e.target;
  
  if (evTar.dataset.type === 'locked') {
    const node = evTar.tagName.toLowerCase() === 'i' ? evTar : evTar.children[0];
    node.classList.toggle('fa-lock');
    node.classList.toggle('fa-lock-open');
  }
  if (evTar.dataset.type === 'copy') {
    navigator.clipboard.writeText(evTar.innerText);
  }
  
})


function setColors(isInitial) {
  let color = '', colors = [];
  const colorsString = document.location.hash;
  
  if (isInitial && colorsString.length > 1) {
  colors = colorsString
    .substring(1)
    .split('-')
    .map(el => '#' + el);
  } 

  cols.forEach((col, j) => {
    
    const text = col.querySelector('h2');
    const iconLock = col.querySelector('i');
    const isLocked = iconLock.classList.contains('fa-lock');
    if (isLocked) {
      color = text.textContent;
      colors[j] = color;
      // return;
    }
    if (colors[j]) {
      color = colors[j];
    } else {
      color = chroma.random();
      colors[j] = color;
    }

    const codColor = chroma(color).hex();
    const lum = chroma(color).luminance() > 0.35;
    col.style.background = color;
    text.textContent = codColor;
    text.style.color = lum ? 'black' : 'white';
    iconLock.style.color = lum ? 'black' : 'white';

  })
  setColorsToHash(colors);
}

function setColorsToHash(colorsArray) {
  const hash = colorsArray.map(el => el.toString().substring(1)).join('-');
  window.location.hash = hash;
}


setColors(true);

