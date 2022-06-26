

var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});
var iframe = document.getElementById('iframe')

iframe.onload = function() {
  // var doc = iframe.contentWindow.document;
  // doc.addEventListener('mouseup', Handler);
  // doc.addEventListener('mousedown', Handler);
  // console.log(doc)
  // iframe.document.addEventListener('mouseup', Handler)
  window.addEventListener('mouseup', Handler)
}
  

// iframe.addEventListener('load', function() {
//   // Deliver the port to the iframe and initialize
//   iframe.contentWindow.document.addEventListener('mouseup', Handler);
//  })

function addressIP(){
  let query = document.getElementById("inputEmail3").value
  console.log(query)
  //document.getElementById("iframe").removeAttribute('src')
  document.getElementById("iframe").setAttribute("src", query)
  
  
}

function Handler() {
  alert('works');
}
document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
});

document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "none";
});

flashcardMaker = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const question = document.createElement('h2');
  const answer = document.createElement('h2');
  const del = document.createElement('i');

  flashcard.className = 'flashcard';

  question.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
  question.textContent = text.my_question;

  answer.setAttribute("style", "text-align:center; display:none; color:red");
  answer.textContent = text.my_answer;

  del.className = "fas fa-minus";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    window.location.reload();
  })

  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);

  flashcard.addEventListener("click", () => {
    if(answer.style.display == "none")
      answer.style.display = "block";
    else
      answer.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

contentArray.forEach(flashcardMaker);

addFlashcard = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");

  let flashcard_info = {
    'my_question' : question.value,
    'my_answer'  : answer.value
  }

  contentArray.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  flashcardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
  question.value = "";
  answer.value = "";
}
//  var iframe = document.getElementById('iframe')
//  iframe.contentWindow.document.addEventListener('mouseup', Handler);


// iframe.contentWindow.addEventListener('mousedown', onMouseDown);
// //document.addEventListener('mousedown', onMouseDown);
// iframe.contentWindow.addEventListener('mouseup', onMouseUp);
// //document.addEventListener('mouseup', onMouseUp);
// var temp = document.querySelector('#shareBoxTemplate');

function onMouseDown() {
  console.log('haha')
  iframe.contentWindow.getSelection().removeAllRanges();
  var shareBox = document.querySelector('#shareBox');
  if (shareBox !== null)
    shareBox.remove();
  
}

function onMouseUp() {
  console.log('haha')
  var sel = iframe.contentWindow.getSelection(),
    txt = sel.toString();
  if (txt !== "") {
    var range = sel.getRangeAt(0);
    //if (range.startContainer.parentElement.parentElement.localName === "article" || range.startContainer.parentElement.localName === "article") {
      iframe.contentWindow.body.insertBefore(iframe.contentWindow.importNode(temp.content, true), temp);
      var rect = range.getBoundingClientRect();
      var shareBox = document.querySelector('#shareBox');
      shareBox.style.top = `calc(${rect.top}px - 38px)`;
      shareBox.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) - 30px)`;
      var shareBtn = shareBox.querySelector('button');
      shareBtn['shareTxt'] = txt;
      shareBtn.addEventListener('mousedown', onShareClick, true);
    //}
  }
}

function onShareClick() {
  window.open(`https://twitter.com/intent/tweet?text=${this.shareTxt}`);
  this.remove();
  iframe.contentWindow.getSelection().removeAllRanges()
}

