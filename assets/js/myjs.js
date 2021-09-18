
function chBackcolor1() {// nếu chọn girl thì ...
  document.getElementById('btn-men').style.color='#D8D7D6';//chữ men đen
  document.getElementById('btn-men').style.borderBottom='none';
  document.getElementById('btn-featured').style.borderBottom='none';
  document.getElementById('btn-featured').style.color='#D8D7D6';//chữ featured đen
  document.getElementById('btn-girl').style.color='black';//chữ girl trắng
  document.getElementById('btn-girl').style.borderBottom='2px solid black';
}
//Tương tự logic với các nút khác
function chBackcolor2() {
  document.getElementById('btn-girl').style.color='#D8D7D6';
  document.getElementById('btn-featured').style.color='#D8D7D6';
  document.getElementById('btn-girl').style.borderBottom='none';
  document.getElementById('btn-featured').style.borderBottom='none';
  document.getElementById('btn-men').style.color='black';
  document.getElementById('btn-men').style.borderBottom='2px solid black';
}
function chBackcolor() {
  document.getElementById('btn-men').style.color='#D8D7D6';
  document.getElementById('btn-men').style.borderBottom='none';
  document.getElementById('btn-girl').style.borderBottom='none';
  document.getElementById('btn-girl').style.color='#D8D7D6';
  document.getElementById('btn-featured').style.color='black';
  document.getElementById('btn-featured').style.borderBottom='2px solid black';
}

