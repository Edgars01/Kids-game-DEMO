let teethWitenessCounter = 0;
let bodyFatPercentage = 0;

// teeth color based on food type consumed

function changeTeethColor() {

  if (teethWitenessCounter == 0) 
  {
    for (let i = 1; i < 5; i++)
    {
      setTimeout(function(){
        $(`#tooth${i}`).removeClass("teethColor1");
      }, `${i}00`);
    }
  } 
  else if (teethWitenessCounter == 1) 
  {
    for (let i = 1; i < 5; i++) $(`#tooth${i}`).addClass("teethColor1");
  } 
}

function changeFatLevel() {

  if (bodyFatPercentage == 0) 
  {
    for (let i = 0; i < 3; i++) $(`.cheek${i}`).removeClass(`cheekStyle${i}`);
  }
  else if (bodyFatPercentage == 1) 
  {
    for (let i = 0; i < 3; i++) $(`.cheek${i}`).addClass(`cheekStyle${i}`);
  }
}

function dragStart(e) {
  dragSrcEl = this;
};

function dragEnter(e) {
  this.classList.add('drag-over');
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('drag-over');
}

function dragOver(e) {
  e.preventDefault();
  return false;
}


// deksktop drop

function dragDrop(e) {
  if (dragSrcEl.classList.contains('drag-item')) 
  {
    let foodId = dragSrcEl.id;
    let toothPicture = document.getElementById("toothPic");

    let dragableAndDropIsSame = toothPicture.className == this.className;

    function foodtypeDesktop(type)
    {
      return dragSrcEl.classList.contains(type) ? true : false;
    }

    if (dragableAndDropIsSame && foodtypeDesktop("badFood")) 
    {
      document.getElementById(foodId).remove();  
      
      teethWitenessCounter += 1;
      changeTeethColor();
    } 
    else if (dragableAndDropIsSame && foodtypeDesktop("goodFood")) 
    {
      document.getElementById(foodId).remove(); 
    } 
    else if (dragableAndDropIsSame && foodtypeDesktop("fatFood")) 
    {
      document.getElementById(foodId).remove();  
      
      bodyFatPercentage += 1;
      changeTeethColor();
      changeFatLevel();
    } 

  } else {
    this.appendChild(dragSrcEl);
  }
  return false;
}

function dragEnd(e) {
  var listItems = document.querySelectorAll('.drag-container, .dragPictureInnerDiv');
  [].forEach.call(listItems, function(item) {
    item.classList.remove('drag-over');
  });
}

function touchStart(e) {
  e.preventDefault();
  this.classList.add('drag-item--touchmove');
}

var scrollDelay = 0;
var scrollDirection = 1;
function pageScroll(a, b) {
  window.scrollBy(0,scrollDirection); // horizontal and vertical scroll increments
  scrollDelay = setTimeout(pageScroll,5); // scrolls every 100 milliseconds

  if (a > window.innerHeight - b) { scrollDirection = 1; }
  if (a < 0 + b) { scrollDirection = -1*scrollDirection; }
}

var x = 1;
function touchMove(e) {
  var touchLocation = e.targetTouches[0],
      w = this.offsetWidth,
      h = this.offsetHeight;

  lastMove = e;
  touchEl = this;
  this.style.width = w + 'px';
  this.style.height = h + 'px';
  this.style.position = 'fixed';
  this.style.left = touchLocation.clientX - w/2 + 'px';
  this.style.top = touchLocation.clientY - h/2 + 'px';

  if (touchLocation.clientY > window.innerHeight - h || touchLocation.clientY < 0 + h) {
    if (x === 1) {
      x = 0;
      pageScroll(touchLocation.clientY, h);
    }
  } else {
    clearTimeout(scrollDelay);
    x = 1;
  }
}

function touchEnd(e) {
  var box1 = this.getBoundingClientRect(),
      x1 = box1.left,
      y1 = box1.top,
      h1 = this.offsetHeight,
      w1 = this.offsetWidth,
      b1 = y1 + h1,
      r1 = x1 + w1;

  var targets = document.querySelectorAll('.drag-container, .dragPictureInnerDiv');
  [].forEach.call(targets, function(target) {
    var box2 = target.getBoundingClientRect(),
        x2 = box2.left,
        y2 = box2.top,
        h2 = target.offsetHeight,
        w2 = target.offsetWidth,
        b2 = y2 + h2,
        r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
      return false;
    } 
    else 
    {
      if (touchEl.classList.contains('drag-item')) {  // mobile drop

        target.prepend(touchEl);   
        let foodId = touchEl.id;

        function foodtypeMobile(type)
        {
          return touchEl.classList.contains(type) ? true : false;
        }
                
        let toothPicture = document.getElementById("toothPic"); 
        let dragableAndDropIsSame = toothPicture.className == target.className;

        if (dragableAndDropIsSame && foodtypeMobile("badFood")) {
                          
          document.getElementById(foodId).remove();       
          teethWitenessCounter += 1;
          changeTeethColor();
          console.log("yes");
        } 
        else if (dragableAndDropIsSame && foodtypeMobile("goodFood"))
        {
          document.getElementById(foodId).remove();  
          teethWitenessCounter -= 1;
          changeTeethColor();
        }
        else if (dragableAndDropIsSame && foodtypeMobile("fatFood"))
        {
          document.getElementById(foodId).remove();         
          bodyFatPercentage += 1;
          changeTeethColor();
          changeFatLevel();
        }
        
      } else {
        target.appendChild(touchEl);
      }
    }
  });

  this.removeAttribute('style');
  this.classList.remove('drag-item--touchmove');
  clearTimeout(scrollDelay);
  x = 1;
}

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragend', dragEnd, false);
  el.addEventListener('touchstart', touchStart, false);
  el.addEventListener('touchmove', touchMove, false);
  el.addEventListener('touchend', touchEnd, false);
}

function addTargetEvents(target) {
  target.addEventListener('dragover', dragOver, false);
  target.addEventListener('dragenter', dragEnter, false);
  target.addEventListener('dragleave', dragLeave, false);
  target.addEventListener('drop', dragDrop, false);
}

var targets = document.querySelectorAll('.drag-container, .dragPictureInnerDiv');
[].forEach.call(targets, function(target) {
  addTargetEvents(target);
});

var listItems = document.querySelectorAll('.drag-item');
[].forEach.call(listItems, function(item) {
  addEventsDragAndDrop(item);
});


// eye code below

let Ball = document.getElementsByClassName("ball");

document.onmousemove = function(event) { // desktop eye movement

  let x = event.clientX * 100 / window.innerWidth + "%";
  let y = event.clientY * 100 / window.innerHeight + "%";

  for(let i=0;i<2;i++) {
      Ball[i].style.left = x;
      Ball[i].style.top = y;
      Ball[i].style.transform = "translate(-"+x+", -"+y+")";
  }
}

function dragFunction(event) { // mobile eye movement
  
  var x = event.touches[0].clientX * 100 / window.innerWidth + "%";
  var y = event.touches[0].clientY * 100 / window.innerHeight + "%";

  for(let i=0;i<2;i++) {
      Ball[i].style.left = x;
      Ball[i].style.top = y;
      Ball[i].style.transform = "translate(-"+x+", -"+y+")";
  }
}


// bounce ball  and tooth brush code below

$(".jumpBall").removeClass("jumpAnimation");

$(".jumpBall").click(function() {
  
  $(".jumpBall").addClass("jumpAnimation");

  setTimeout(function(){
    $(".jumpBall").removeClass("jumpAnimation");

    bodyFatPercentage = 0
    changeFatLevel();

  }, 3000);

});


// tooth brushes

$(".toothBrush").click(function() {
  
  $(".toothBrushWrap").addClass("rotate");
 
  setTimeout(function(){
    $(".toothBrushWrap").removeClass("rotate");
    $(".toothBrushActiveStyle").removeClass("toothBrushActive");
    $(".toothBrush").addClass("toothBrushActive");
    
  }, 3000);

  setTimeout(function(){
    moveLeft();
  }, 3100);

  setTimeout(function(){
   moveRight();
  }, 5000);

  setTimeout(function(){
    $(".toothBrushActiveStyle").addClass("toothBrushActive"); 
  }, 6000);

  setTimeout(function(){
    teethWitenessCounter = 0;
    changeTeethColor();
    $(".toothBrush").removeClass("toothBrushActive");
  }, 7000);
});

function moveLeft()
{
  $('.toothBrushActiveStyle').animate({  borderSpacing: -90 }, {
    step: function(now,fx) {
      $(this).css('-webkit-transform','translate(-150px,0)'); 
      $(this).css('-moz-transform','translate(-150px,0)');
      $(this).css('transform','translate(-150px,0)');
    },
    duration:'slow'
  },'linear');
}

function moveRight()
{
  $('.toothBrushActiveStyle').animate({  borderSpacing: -90 }, {
    step: function(now,fx) {
      $(this).css('-webkit-transform','translate(100px, 0)'); 
      $(this).css('-moz-transform','translate(100px, 0)'); 
      $(this).css('transform','translate(100px, 0)'); 
    },
    duration:'slow'
  },'linear');
}


// spin head

const spinMe = document.querySelector(".dragPictureDiv");
let size = "small";

spinMe.addEventListener("click", () => {
  if (size === "small") {
    spinMe.classList.remove("animate-shrink");
    spinMe.classList.add("animate-grow");
    size = "large";  
  } else {
    spinMe.classList.remove("animate-grow");
    spinMe.classList.add("animate-shrink");
    size = "small";
  }
});











