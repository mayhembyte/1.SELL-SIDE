///sketch.js - sell_side



/// 1. SELL-SIDE

let t = 0;
let duration = 5; // duração da animação em segundos
let baseRadius = 150; // raio do círculo inicial (300px de diâmetro)

function setup() {
  createCanvas(500, 500);
  strokeWeight(1.2);
  noFill();
}

function draw() {
  background(20);
  translate(width / 2, height / 2);

  // Atualiza tempo com base no frameRate
  let tSpeed = 1 / (duration * 60); // 5s * 60fps
  t += tSpeed;
  if (t >= 1) t = 0; // loop

  let easedT = easeInOutCubic(t);

  let minRadius = baseRadius * 0.6;
  let maxOffset = 40; // distância final entre os dois círculos

  let r1 = lerp(baseRadius, 0, easedT); // círculo central desaparece
  let r2 = minRadius;
  let offset = lerp(0, maxOffset, easedT);

  // Cálculo de opacidades com suavidade
  let alpha1 = map(easedT, 0, 0.6, 255, 0);
  alpha1 = constrain(alpha1, 0, 255);

  let alpha2 = map(easedT, 0.4, 1, 0, 255);
  alpha2 = constrain(alpha2, 0, 255);

  // Círculo central
  if (alpha1 > 0) {
    stroke(255, alpha1);
    ellipse(0, 0, r1 * 2);
  }

  // Dois círculos que surgem aos lados
  if (alpha2 > 0) {
    stroke(255, alpha2);
    ellipse(-offset, 0, r2 * 2);
    ellipse(offset, 0, r2 * 2);
  }
}

// Função de easing suave (cúbica)
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - pow(-2 * t + 2, 3) / 2;
}

//// TEMPO TOTAL DA ANIMAÇÃO: 5s