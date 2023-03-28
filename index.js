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

// Polynomial: A + Bx + Cx^2 + Dx^3 + Ex^4 + Fx^5 + Gx^6 + Hx^7
var A = [0,0,0,0,0,0,0,0];
var B = [0,0,0,0,0,0,0,0];
var C = [1,0,0,0,0,0,0,0];
var D = [0,0,0,0,0,0,0,0];
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
  var a = A;
  var b = B;
  var c = [C[0]/ 2, C[1]/ 2, C[2]/ 2, C[3]/ 2, C[4]/ 2, C[5]/ 2, C[6]/ 2, C[7]/ 2];
  var d = [D[0]/ 4, D[1]/ 4, D[2]/ 4, D[3]/ 4, D[4]/ 4, D[5]/ 4, D[6]/ 4, D[7]/ 4];
  var e = [E[0]/ 8, E[1]/ 8, E[2]/ 8, E[3]/ 8, E[4]/ 8, E[5]/ 8, E[6]/ 8, E[7]/ 8];
  var f = [F[0]/16, F[1]/16, F[2]/16, F[3]/16, F[4]/16, F[5]/16, F[6]/16, F[7]/16];
  var g = [G[0]/32, G[1]/32, G[2]/32, G[3]/32, G[4]/32, G[5]/32, G[6]/32, G[7]/32];
  var h = [H[0]/64, H[1]/64, H[2]/64, H[3]/64, H[4]/64, H[5]/64, H[6]/64, H[7]/64];
  var c = [C[0]/  2, C[1]/  2, C[2]/  2, C[3]/  2, C[4]/  2, C[5]/  2, C[6]/  2, C[7]/  2];
  var d = [D[0]/  4, D[1]/  4, D[2]/  4, D[3]/  4, D[4]/  4, D[5]/  4, D[6]/  4, D[7]/  4];
  var e = [E[0]/  8, E[1]/  8, E[2]/  8, E[3]/  8, E[4]/  8, E[5]/  8, E[6]/  8, E[7]/  8];
  var f = [F[0]/ 16, F[1]/ 16, F[2]/ 16, F[3]/ 16, F[4]/ 16, F[5]/ 16, F[6]/ 16, F[7]/ 16];
  var g = [G[0]/ 32, G[1]/ 32, G[2]/ 32, G[3]/ 32, G[4]/ 32, G[5]/ 32, G[6]/ 32, G[7]/ 32];
  var h = [H[0]/ 64, H[1]/ 64, H[2]/ 64, H[3]/ 64, H[4]/ 64, H[5]/ 64, H[6]/ 64, H[7]/ 64];
  return (
    add(a,
    add(mul(x, b),
    add(mul(mul(x, x), c),
    add(mul(mul(mul(x, x), x), d),
    add(mul(mul(mul(mul(x, x), x), x), e),
    add(mul(mul(mul(mul(mul(x, x), x), x), x), f),
    add(mul(mul(mul(mul(mul(mul(x, x), x), x), x), x), g),
        mul(mul(mul(mul(mul(mul(mul(x, x), x), x), x), x), x), h)))))))));
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
        var x = (i - cvs.width / 2) / 8;
        var y = (j - cvs.height / 2) / 8;
        var v = P(pos(x,y));
        var R, G, B;
        switch (MODE) {
          case 0:
            R = numberToColor(v[0]);
            B = numberToColor(v[3]);
            //L = "red";
            break;
          case 1:
            R = numberToColor(v[1]);
            B = numberToColor(v[2]);
            //L = "green";
            break;
          case 2:
            R = numberToColor(v[5]);
            B = numberToColor(v[6]);
            //L = "blue";
            break;
          case 3:
            R = numberToColor(v[4]);
            B = numberToColor(v[7]);
            //L = "orange";
            break;
        }
        G = 128;
        var n = (j * cvs.width + i) * 4;
        img.data[n+0] = R;
        img.data[n+1] = G;
        img.data[n+2] = B;
        img.data[n+3] = 255;
        //cvs.style.border = "2px solid black";
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
  var num = (x) => {
    return ("       " + (x>=0?"+":"-") + x.toFixed(2).replace("-","")).slice(-7);
  };
  if (id !== null) {
    var N = P(id_point_maker(id)(MX,MY));
    var N
      = num(N[0]) + " "
      + num(N[1]) + "x "
      + num(N[2]) + "y "
      + num(N[4]) + "z "
      + num(N[3]) + "i "
      + num(N[5]) + "j "
      + num(N[6]) + "k "
      + num(N[7]) + "w";
    var [X,Y] = ([["r","i"],["x","y"],["j","k"],["z","w"]])[id];
    display.textContent = `N: ${N}\n${X}: ${num(MX)}\n${Y}: ${num(MY)}`;
  }
}

function updateShow(id) {
  console.log("ok");
  const show = document.getElementById('show');
  switch (MODE) {
    case 0: show.textContent = "plot ri image (real and imaginary values)"; break;
    case 1: show.textContent = "plot xy image (X and Y coordinates)"; break;
    case 2: show.textContent = "plot jk image (J and K bivectors)"; break;
    case 3: show.textContent = "plot zw image (Z vector and XYZ trivector)"; break;
  }
}

function onMouseMove(id) {
  return function(event) {
    const cvs = document.getElementById('canvas'+id);
    const rect = cvs.getBoundingClientRect();
    MX = (event.clientX - rect.left - cvs.width/2) / 8;
    MY = (event.clientY - rect.top - cvs.height/2) / 8;
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
  updateShow();
  drawComplexPlane();
  drawCoefficientDots();
}

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
  document.getElementById("show").addEventListener("click", (event) => {
    MODE = (MODE + 1) % 4;
    updateShow();
    drawComplexPlane();
  });
  updateShow();
  drawComplexPlane();
  drawCoefficientDots();
}
