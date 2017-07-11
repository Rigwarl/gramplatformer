const hero = {
  x: 95,
  y: 170,
  view: document.querySelector('#game-hero'),
};
const platforms = Array.from({ length: 50 }).map((el, i) => {
  const x = Math.random() * 250 - 45;
  const y = 60 * (i - 20);
  const view = document.createElement('div');
  const wrong = Math.random() < 0.15;

  view.classList.add('game__platform');
  if (wrong) view.classList.add('game__platform--wrong')
  view.style.top = `${y}px`;
  view.style.left = `${x}px`;

  return { x, y, view, wrong };
});
const platformsContainer = document.querySelector('#game-platforms');
const score = document.querySelector('#game-score');

const actions = {
  up: false,
  left: false,
  right: false,
};

Object.keys(actions).forEach(action => {
  const btn = document.getElementById(action);

  btn.addEventListener('mousedown', () => actions[action] = true);
  btn.addEventListener('mouseup', () => actions[action] = false);
});


let speed = 0;
let dist = 0;

const checkCollision = platform =>
  !platform.wrong &&
  hero.x + 60 > platform.x && hero.x < platform.x + 90 &&
  hero.y + 60 > platform.y + dist && hero.y + 60 < platform.y + dist + 15;

platforms.forEach(platform => platformsContainer.appendChild(platform.view));

const tick = () => {
  const collision = platforms.some(checkCollision);

  speed = Math.max(speed - 0.1, -5);
  if (collision && speed < 0) speed = 0;
  if (actions.up && collision) speed += 6;
  if (actions.left) hero.x -= 2;
  if (actions.right) hero.x += 2;

  dist += speed;
  platformsContainer.style.transform = `translateY(${dist}px)`;
  hero.view.style.transform = `translateX(${hero.x}px)`;
  score.innerText = Math.floor(dist / 10);
  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);
