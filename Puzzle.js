let can = document.getElementById("can");
let ctx = can.getContext("2d");
document.getElementsByTagName("button")[0].addEventListener("click", () => {
  window.location.reload(); 
});

let time=document.querySelector('h4')
let best=document.querySelector('h3');
let score='0';
 let clear= setInterval(() => {
    
    time.innerText=`Your time ${score++}`;
}, 100);

can.height = window.innerHeight;
can.width = window.innerWidth;

let scene = new Image();
scene.src = "scene.jpg";

let parti = [];
window.addEventListener("load", () => {
  ctx.drawImage(scene, 0, 0, can.width / 3, can.height / 3);

  ctx.rect(0, 0, can.width / 3, can.height / 3);

  ctx.lineWidth = 4;

  ctx.stroke();

  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      parti.push(new pics(i, j));
    }
  }
  fun();

  // ctx.rect(0, 0, can.width / 3, can.height / 3)
});

let imgw = scene.width,
  imgh = scene.height;

class pics {
  constructor(x, y, i, j) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.top;
    this.left;
    this.bottom;
    this.right;
  }

  draw() {
    ctx.drawImage(
      scene,
      (this.y * imgw) / 3,
      (this.x * imgh) / 3,
      imgw / 3,
      imgh / 3,
      can.width / 2 - 100 + (this.j * can.width) / 9,
      can.height / 2 - 100 + (this.i * can.height) / 9,
      can.width / 9,
      can.height / 9
    );

    ctx.rect(
      can.width / 2 - 100 + (this.y * can.width) / 9,
      can.height / 2 - 100 + (this.x * can.height) / 9,
      can.width / 9,
      can.height / 9
    );
    ctx.stroke();
  }
}
let k = 0,
  l = 0;

function fun() {
  for (let i = 0; i < parti.length; ++i) {
    if (i != 2) {
      let tempi = Math.floor(Math.random() * 3),
        tempj = Math.floor(Math.random() * 3);

      if (tempi == 0 && tempj == 2) {
        --i;
        continue;
      }

      for (let j = 0; j < i; ++j) {
        if (
          (parti[j].x == tempi && parti[j].y == tempj) ||
          (tempi == 0 && tempj == 2)
        ) 
        {
          (tempi = Math.floor(Math.random() * 3)),
            (tempj = Math.floor(Math.random() * 3));
          j = -1;
        }
      }
      (parti[i].x = tempi), (parti[i].y = tempj);

      if (k == 0 && l == 2) {
        (parti[i].i = 2), (parti[i].j = 2);
        ctx.rect(
          can.width / 2 - 100 + (2 * can.width) / 9,
          can.height / 2 - 100 + (0 * can.height) / 9,
          can.width / 9,
          can.height / 9
        );
        ctx.stroke();
      } else (parti[i].i = k), (parti[i].j = l);
      l++;
      if (l % 3 == 0) {
        k++;
        l = 0;
      }

      parti[i].draw();
    }
  }
}

function dir(i, j) {

  parti[i].i = parti[i].x;
  parti[i].j = parti[i].y;
  parti[i].x = parti[j].x;
  parti[i].y = parti[j].y;

  ctx.clearRect(
    can.width / 2 - 100 + (parti[j].j * can.width) / 9,
    can.height / 2 - 100 + (parti[j].i * can.height) / 9,
    can.width / 9,
    can.height / 9
  );


  parti[j].x = parti[j].i;
  parti[j].y = parti[j].j;
  parti[j].i = undefined;
  parti[j].j = undefined;

  parti[i].draw();
}
window.addEventListener("click", (e) => {
  if (!comp()) {
    let f = magic(e.x, e.y);
    if (parti[f].i != undefined) {
      setdir(f);
    }
  }
});

function magic(x, y) {
  for (let i = 0; i < parti.length; ++i) {
   
    if (
      x >= can.width / 2 - 100 + (parti[i].j * can.width) / 9 &&
      x <= can.width / 2 - 100 + parti[i].j * (can.width / 9) + can.width / 9 &&
      y >= can.height / 2 - 100 + (parti[i].i * can.height) / 9 &&
      y <= can.height / 2 - 100 + (parti[i].i * can.height) / 9 + can.height / 9
    )

      return i;
  }
}
function setdir(piece) {
    let i;
    for (i = 0; i < parti.length; ++i) {
        if (parti[i].j == undefined) break;
    }
    
    function valid() {
        
        console.log(parti);


    if (
      (parti[piece].i - 1 == parti[i].x && parti[piece].j == parti[i].y) ||
      (parti[piece].i + 1 == parti[i].x && parti[i].y == parti[piece].j) ||
      (parti[piece].j - 1 == parti[i].y && parti[piece].i == parti[i].x) ||
      (parti[piece].j + 1 == parti[i].y && parti[piece].i == parti[i].x)
    )

      return 1;
    return 0;
  }

  if (valid()) {
    dir(i, piece);
    let h = new Audio("move.mp3");
    h.volume = 1;
    h.play();
  }
}

function comp() {
  for (let i = 0; i < parti.length; ++i) {
    if (i == 2) continue;

    if (parti[i].x != parti[i].i || parti[i].y != parti[i].j) {
     
     
        return 0;
    }
  }
  let g = new Audio("comp.wav");
  g.play();
        clearInterval(clear);
        let bestscore = localStorage.getItem("bestTime");
        
        if (bestscore > score|| bestscore==undefined) localStorage.setItem("bestTime", score);
        best.innerText = `Best Time ${score}`;
  return 1;
}
