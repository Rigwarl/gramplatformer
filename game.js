const leveldata = [
  {word:"корректный",left:"130", bottom: "25", correct:true},
  {word:"съездет",left:"10", bottom: "100", correct:false},
  {word:"каллорийность",left:"100", bottom: "100", correct:false},
  {word:"величина",left:"230", bottom: "100", correct:true},
  {word:"граматика",left:"40", bottom: "175", correct:false},
  {word:"в общем",left:"155", bottom: "175", correct:true},
  {word:"класть на стол",left:"10", bottom: "250", correct:true},
  {word:"ихний",left:"140", bottom: "250", correct:false},
  {word:"прийдет",left:"230", bottom: "250", correct:false},
  {word:"одеть шапочку",left:"160", bottom: "325", correct:false},
  {word:"лемма",left:"55", bottom: "325", correct:true},
  {word:"шёрстка",left:"30", bottom: "400", correct:true},
  {word:"слазь",left:"140", bottom: "400", correct:false},
  {word:"оттудова",left:"230", bottom: "400", correct:false},
  {word:"оба мальчика",left:"55", bottom: "475", correct:true},
  {word:"милиард",left:"180", bottom: "475", correct:false},
  {word:"обожать еду",left:"20", bottom: "550", correct:true},
  {word:"еденица",left:"130", bottom: "550", correct:false},
  {word:"не спится",left:"220", bottom: "550", correct:true},
  {word:"совсем не плохо!",left:"100", bottom: "625", correct:true},
  {word:"как будто",left:"40", bottom: "700", correct:true},
  {word:"день рождение у меня",left:"150", bottom: "700", correct:false},
  {word:"феерверк",left:"20", bottom: "775", correct:true},
  {word:"обоих девочек",left:"130", bottom: "775", correct:false},
  {word:"дитёныши",left:"50", bottom: "850", correct:true},
  {word:"вероятностный",left:"160", bottom: "850", correct:false},
  {word:"компресор",left:"20", bottom: "925", correct:true},
  {word:"газ фрион",left:"120", bottom: "925", correct:false},
  {word:"провиант",left:"220", bottom: "925", correct:true},
  {word:"катализатор",left:"180", bottom: "1000", correct:true},
  {word:"кристалический",left:"30", bottom: "1000", correct:false},
  {word:"симпотичный",left:"10", bottom: "1075", correct:true},
  {word:"алльянс",left:"130", bottom: "1075", correct:false},
  {word:"купается",left:"220", bottom: "1075", correct:true},
  {word:"нарцисизм",left:"20", bottom: "1150", correct:true},
  {word:"шаровары",left:"120", bottom: "1150", correct:false},
  {word:"койот",left:"220", bottom: "1150", correct:true},
];

const platforms = leveldata.map(({ word, left, bottom, correct }) => {
  const view = document.createElement('div');
  view.innerText = word;
  view.classList.add('game__platform');
  view.style.bottom = `${bottom}px`;
  view.style.left = `${left}px`;

  // подкраска
  // view.style.backgroundColor = correct ? 'green' : 'red';

  return { view, correct, left: +left, bottom: +bottom };
});


const hero = {
  width: 60,
  height: 60,
  x: 115,
  y: 170,
  view: document.querySelector('#game-hero'),
};
const platformsContainer = document.querySelector('#game-platforms');
const score = document.querySelector('#game-score');

const keys = {
  37: 'left',
  38: 'up',
  39: 'right',
};

const actions = {
  up: false,
  left: false,
  right: false,
};

window.addEventListener('keydown', e => actions[keys[e.keyCode]] = true);
window.addEventListener('keyup', e => actions[keys[e.keyCode]] = false);


let speed = 0;
let dist = 0;

const checkCollision = platform =>
  !platform.dead &&
  hero.x + hero.width > platform.left && hero.x < platform.left + platform.view.offsetWidth &&
  hero.y + dist > platform.bottom && hero.y + dist < platform.bottom + 20;

platforms.forEach(platform => platformsContainer.appendChild(platform.view));

const tick = () => {
  const collisionPlat = platforms.find(checkCollision);
  const collision = collisionPlat && collisionPlat.correct;

  if (collisionPlat && !collisionPlat.correct && speed < 0) {
    collisionPlat.view.style.transform = 'translateY(1000px)';
    collisionPlat.view.style.opacity = 0;
    collisionPlat.dead = true;
  }

  speed -= 0.15;
  if (collision && speed < 0) speed = 0;
  if (actions.up && collision) speed += 6;
  if (actions.left) hero.x -= 2;
  if (actions.right) hero.x += 2;

  speed = Math.min(Math.max(speed, -5), 6);
  dist += speed;
  platformsContainer.style.transform = `translateY(${dist}px)`;
  hero.view.style.transform = `translateX(${hero.x}px)`;
  score.innerText = Math.floor(dist / 10);
  requestAnimationFrame(tick);
  const platform = platforms[5];
};

requestAnimationFrame(tick);
