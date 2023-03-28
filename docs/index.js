function numberToColor(value) {
  return Math.round(128 + (256 * Math.atan(value / 256) / Math.PI));
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3], a[4] + b[4], a[5] + b[5], a[6] + b[6], a[7] + b[7]];
}

function mul(a, b) {
  return [
    ((((a[0]*b[0])+(a[1]*b[1]))+((a[2]*b[2])+-(a[3]*b[3])))+(((a[4]*b[4])+-(a[5]*b[5]))+-((a[6]*b[6])+(a[7]*b[7])))),
    ((((a[0]*b[1])+(a[1]*b[0]))+(-(a[2]*b[3])+(a[3]*b[2])))+((-(a[4]*b[5])+(a[5]*b[4]))+-((a[6]*b[7])+(a[7]*b[6])))),
    ((((a[0]*b[2])+(a[1]*b[3]))+((a[2]*b[0])+-(a[3]*b[1])))+(-((a[4]*b[6])+-(a[5]*b[7]))+((a[6]*b[4])+(a[7]*b[5])))),
    ((((a[0]*b[3])+(a[1]*b[2]))+(-(a[2]*b[1])+(a[3]*b[0])))+(-(-(a[4]*b[7])+(a[5]*b[6]))+((a[6]*b[5])+(a[7]*b[4])))),
    ((((a[0]*b[4])+(a[1]*b[5]))+((a[2]*b[6])+-(a[3]*b[7])))+(((a[4]*b[0])+-(a[5]*b[1]))+-((a[6]*b[2])+(a[7]*b[3])))),
    ((((a[0]*b[5])+(a[1]*b[4]))+(-(a[2]*b[7])+(a[3]*b[6])))+((-(a[4]*b[1])+(a[5]*b[0]))+-((a[6]*b[3])+(a[7]*b[2])))),
    ((((a[0]*b[6])+(a[1]*b[7]))+((a[2]*b[4])+-(a[3]*b[5])))+(-((a[4]*b[2])+-(a[5]*b[3]))+((a[6]*b[0])+(a[7]*b[1])))),
    ((((a[0]*b[7])+(a[1]*b[6]))+(-(a[2]*b[5])+(a[3]*b[4])))+(-(-(a[4]*b[3])+(a[5]*b[2]))+((a[6]*b[1])+(a[7]*b[0])))),
  ];
}

// Polynomial coefficients
var A = [0,0,0,0,0,0,0,0];
var B = [0,0,0,0,0,0,0,0];
var C = [0,0,0,0,0,0,0,0];
var D = [1,0,0,0,0,0,0,0];
var E = [0,0,0,0,0,0,0,0];
var F = [0,0,0,0,0,0,0,0];
var G = [0,0,0,0,0,0,0,0];
var H = [0,0,0,0,0,0,0,0];

// Mouse position
var MX = 0;
var MY = 0;

// MODE
var MODE = 0;

//3 4.25 4.875 '[65.9423828125,0,0,-5.9814453125,0,0,0,0]'
//var a = [0,0,0,0,3,0,0,4.25];
//console.log(mul(a,a));
//console.log(mul(mul(a,a),C));

// Polynomial
function P(x) {
  return (
    add(A,
    add(mul(x, B),
    add(mul(mul(x, x), C),
    add(mul(mul(mul(x, x), x), D),
    add(mul(mul(mul(mul(x, x), x), x), E),
    add(mul(mul(mul(mul(mul(x, x), x), x), x), F),
    add(mul(mul(mul(mul(mul(mul(x, x), x), x), x), x), G),
        mul(mul(mul(mul(mul(mul(mul(x, x), x), x), x), x), x), H)))))))));
};

function id_point_maker(id) {
  switch (id) {
    case 0: return (x,y) => [x,0,0,y,0,0,0,0];
    case 1: return (x,y) => [0,x,y,0,0,0,0,0];
    case 2: return (x,y) => [0,0,0,0,0,x,y,0];
    case 3: return (x,y) => [0,0,0,0,x,0,0,y];
  }
}

function drawComplexPlane() {
  for (let id = 0; id < 4; ++id) {
    const cvs = document.getElementById('canvas'+id);
    const ctx = cvs.getContext('2d');
    const img = ctx.createImageData(cvs.width, cvs.height);
    const pos = id_point_maker(id);
    for (let j = 0; j < cvs.height; j++) {
      for (let i = 0; i < cvs.width; ++i) {
        var x    = (i - cvs.width / 2) / 8;
        var y    = (j - cvs.height / 2) / 8;
        var v    = P(pos(x,y));
        var R, G, B, L;
        switch (MODE) {
          case 0:
            R = numberToColor(v[0]);
            B = numberToColor(v[3]);
            L = "red";
            break;
          case 1:
            R = numberToColor(v[1]);
            B = numberToColor(v[2]);
            L = "green";
            break;
          case 2:
            R = numberToColor(v[5]);
            B = numberToColor(v[6]);
            L = "blue";
            break;
          case 3:
            R = numberToColor(v[4]);
            B = numberToColor(v[7]);
            L = "orange";
            break;
        }
        G = 128;
        var n = (j * cvs.width + i) * 4;
        img.data[n+0] = R;
        img.data[n+1] = G;
        img.data[n+2] = B;
        img.data[n+3] = 255;
        cvs.style.border = "5px solid "+L;
      }
    }

    ctx.putImageData(img, 0, 0);
    drawAxis(ctx, cvs.width, cvs.height);
  }
}

function drawAxis(ctx, width, height) {
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function updateDisplay(id) {
  const display = document.getElementById('display');
  if (id !== null) {
    const N = id_point_maker(id)(MX,MY);
    var [X,Y] = ([["r","i"],["x","y"],["j","k"],["z","w"]])[id];
    display.textContent = `${X}: ${MX.toFixed(2)} ${Y}: ${MY.toFixed(2)}\nN: ${N}`;
  }
}

function updateTitle(id) {
  console.log("ok");
  const title = document.getElementById('title');
  switch (MODE) {
    case 0: title.textContent = "Plane: ri"; break;
    case 1: title.textContent = "Plane: xy"; break;
    case 2: title.textContent = "Plane: jk"; break;
    case 3: title.textContent = "Plane: zw"; break;
  }
}

function onMouseMove(id) {
  return function(event) {
    const cvs = document.getElementById('canvas'+id);
    const rect = cvs.getBoundingClientRect();
    MX = (event.clientX - rect.left - cvs.width) / 8;
    MY = (event.clientY - rect.top - cvs.height) / 8;
    updateDisplay(id);
  }
}

function onKeyPress(event) {
  A = [0, 0, 0, 0, 0, 0, 0, 0];
  B = [0, 0, 0, 0, 0, 0, 0, 0];
  C = [0, 0, 0, 0, 0, 0, 0, 0];
  D = [0, 0, 0, 0, 0, 0, 0, 0];
  E = [0, 0, 0, 0, 0, 0, 0, 0];
  F = [0, 0, 0, 0, 0, 0, 0, 0];
  G = [0, 0, 0, 0, 0, 0, 0, 0];
  H = [0, 0, 0, 0, 0, 0, 0, 0];
  updateDisplay(null);
  drawComplexPlane(0);
}

function drawControlDot(ctx, x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawControlLabel(ctx, text) {
  ctx.font = "bold 30px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#B0B0B0";
  ctx.fillText(text, 32, 32);
}

function drawCoefficientDots() {
  for (let j = 0; j < 4; ++j) {
    for (let i = 0; i < 8; ++i) {
      const cvs = document.getElementById(`C${j}${i}`);
      const ctx = cvs.getContext('2d');
      const coefficient = String.fromCharCode(65 + i); // 'A' to 'H'
      const centerX = cvs.clientWidth / 2;
      const centerY = cvs.clientHeight / 2;
      let x, y;
      switch (j) {
        case 0: x = centerX + getCoef(coefficient)[0]; y = centerY - getCoef(coefficient)[3]; break;
        case 1: x = centerX + getCoef(coefficient)[1]; y = centerY - getCoef(coefficient)[2]; break;
        case 2: x = centerX + getCoef(coefficient)[5]; y = centerY - getCoef(coefficient)[6]; break;
        case 3: x = centerX + getCoef(coefficient)[4]; y = centerY - getCoef(coefficient)[7]; break;
      }
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      drawControlLabel(ctx, ("ABCDEFGH")[i] + (["ri","xy","jk","zw"])[j]);
      drawControlDot(ctx, x, y, 3, "black");
    }
  }
}

function getCoef(coefficient) {
  switch (coefficient) {
    case 'A': return A;
    case 'B': return B;
    case 'C': return C;
    case 'D': return D;
    case 'E': return E;
    case 'F': return F;
    case 'G': return G;
    case 'H': return H;
  }
}

function onCoefficientClick(event, row, coefficient) {
  const div = event.target;
  const rect = div.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = div.clientWidth / 2;
  const centerY = div.clientHeight / 2;

  var mod;
  var [a, b] = [x - centerX, centerY - y];
  switch (row) {
    case 0: mod = x => { x[0] = a; x[3] = b; }; break;
    case 1: mod = x => { x[1] = a; x[2] = b; }; break;
    case 2: mod = x => { x[5] = a; x[6] = b; }; break;
    case 3: mod = x => { x[4] = a; x[7] = b; }; break;
  }
  switch (coefficient) {
    case 'A': mod(A); break;
    case 'B': mod(B); break;
    case 'C': mod(C); break;
    case 'D': mod(D); break;
    case 'E': mod(E); break;
    case 'F': mod(F); break;
    case 'G': mod(G); break;
    case 'H': mod(H); break;
  }

  updateDisplay(null);
  updateTitle();
  drawComplexPlane();
  drawCoefficientDots();
}

setInterval(() => {
  MODE = (MODE + 1) % 4;
  updateTitle();
  drawComplexPlane();
  drawCoefficientDots();
}, 1000);

window.onload = function() {
  for (var id = 0; id < 4; ++id) {
    document.getElementById('canvas'+id).addEventListener('mousemove', onMouseMove(id));
  }
  document.addEventListener('keypress', onKeyPress);
  for (let j = 0; j < 4; ++j) {
    for (let i = 0; i < 8; ++i) {
      const div = document.getElementById(`C${j}${i}`);
      const coefficient = String.fromCharCode(65 + i); // 'A' to 'H'
      div.addEventListener('click', (event) => onCoefficientClick(event, j, coefficient));
    }
  }
  updateTitle();
  drawComplexPlane();
  drawCoefficientDots();
}
