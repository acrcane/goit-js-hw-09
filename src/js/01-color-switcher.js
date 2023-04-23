const collection  = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]')
};
  
let interval;
  
collection.startBtn.addEventListener('click', startChangeColor);
collection.stopBtn.addEventListener('click', stopChangeColor);
  
collection.stopBtn.setAttribute('disabled', '');
  
  
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
  
function addPageBodyColor(color){
    document.body.style.backgroundColor = color;
}
  
function startChangeColor(){
    interval = setInterval(() => {
      const randomColor = getRandomHexColor();
      addPageBodyColor(randomColor);
      collection.startBtn.setAttribute('disabled', '');
      collection.stopBtn.removeAttribute('disabled');
    }, 500);
}
  
function stopChangeColor(){
    clearInterval(interval);
    collection.startBtn.removeAttribute('disabled');
    collection.stopBtn.setAttribute('disabled', '');
} 