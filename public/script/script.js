// var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

const saveCardBtn = document.getElementById("save_card");
var iframe = document.getElementById('iframe');
const deleteCardBtn = document.getElementById("delete_cards");
const showCardBoxBtn = document.getElementById("show_card_box");
const closeCardBox = document.getElementById("close_card_box");
const createCardBtn = document.getElementById("create_card");
let highlight = document.getElementById("highlight");
let expand = document.getElementById("expand");
let content;
let alreadyAddHighlight = false;

saveCardBtn.addEventListener("click", () => {
  addFlashcard();
});


var temp;
iframe.onload = function () {
  //   // var doc = iframe.contentWindow.document;
  //   // doc.addEventListener('mouseup', Handler);
  //   // doc.addEventListener('mousedown', Handler);
  //   // console.log(doc)
  //   // iframe.document.addEventListener('mouseup', Handler)
  //   window.addEventListener('mouseup', Handler)
  iframe.contentWindow.document.addEventListener('mousedown', onMouseDown);
  iframe.contentWindow.document.addEventListener('mouseup', onMouseUp);
  temp = document.querySelector('#shareBoxTemplate');
}

function upload(){
  let fileElement = document.getElementById('fileInput')

      // check if user had selected a file
      if (fileElement.files.length === 0) {
        alert('please choose a file')
        return
      }
      file = fileElement.files[0]
      
      let formData = new FormData();
      formData.set('file', file);
      axios.post("/upload", formData, {
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`upload process: ${percentCompleted}%`);
        }
      })
        .then(res => {
          
          
          console.log(res.data)
          iframe = document.getElementById('iframe')
          iframe.removeAttribute('srcdoc')
          iframe.setAttribute('src', res.data)
          
        })
    }


    
// iframe.addEventListener('load', function() {
//   // Deliver the port to the iframe and initialize
//   iframe.contentWindow.document.addEventListener('mouseup', Handler);
//  })


// function addressIP() {
//   let query = document.getElementById("inputEmail3").value
//   // console.log(query)
//   fetch(query, {
//     method: "GET",
//   })
//     .then(src => {

//     })
//   //document.getElementById("iframe").removeAttribute('src')
//   iframe.setAttribute("src", query)
// }



deleteCardBtn.addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
});

showCardBoxBtn.addEventListener("click", () => {
  createCardBtn.style.display = "block";
});

closeCardBox.addEventListener("click", () => {
  createCardBtn.style.display = "none";
  highlight.value = "";
  expand.value = "";
  alreadyAddHighlight = false;
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
    if (answer.style.display == "none")
      answer.style.display = "block";
    else
      answer.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

// contentArray.forEach(flashcardMaker);

function addFlashcard() {
  const highlightContent = highlight.value;
  const expandContent = expand.value;
  const table = document.querySelector("#table");

  // console.log(highlightContent, expandContent);

  let flashcard_info = {
    'highlight': highlightContent,
    'expand': expandContent,
    "table": table.value,
  }

  fetch('/cards/create', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(flashcard_info),
  })
  .then(res => {
    if (res.status === 201) {
      contentArray.push(flashcard_info);
      flashcardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
    }
    else {
      return res.json();
    }
  })
  .then(res => {
    alert(res.status);
  })
}
//  var iframe = document.getElementById('iframe')
//  iframe.contentWindow.document.addEventListener('mouseup', Handler);


// iframe.contentWindow.addEventListener('mousedown', onMouseDown);
// //document.addEventListener('mousedown', onMouseDown);
// iframe.contentWindow.addEventListener('mouseup', onMouseUp);
// //document.addEventListener('mouseup', onMouseUp);
// var temp = document.querySelector('#shareBoxTemplate');

function onMouseDown() {
  // console.log('haha')
  iframe.contentWindow.getSelection().removeAllRanges();
  var shareBox = document.querySelector('#shareBox');
  if (shareBox !== null)

    shareBox.remove();

}

function onMouseUp() {
  // console.log('haha')
  var sel = iframe.contentWindow.getSelection()
  const txt = sel.toString();
  content = txt;
  if (txt !== "") {
    var range = sel.getRangeAt(0);
    //if (range.startContainer.parentElement.parentElement.localName === "article" || range.startContainer.parentElement.localName === "article") {


    document.body.insertBefore(document.importNode(temp.content, true), null);
    var rect = range.getBoundingClientRect();
    var shareBox = document.querySelector('#shareBox');
    shareBox.style.top = `calc(${rect.top}px + 280px)`;
    shareBox.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) )`;

    var shareBtn = shareBox.querySelector('button');
    shareBtn['shareTxt'] = txt;
    shareBtn.addEventListener('click', onShareClick, true);

    //}
  }
}



function onShareClick() {
  // window.open(`https://twitter.com/intent/tweet?text=${this.shareTxt}`);
  // this.remove();
  showCardBoxBtn.click();
  const textSelection = getTextSelection();
  console.log(textSelection);
  if (alreadyAddHighlight) {
    expand.value = textSelection;
    alreadyAddHighlight = false;
  }
  else {
    highlight.value = textSelection;
    alreadyAddHighlight = true;
  }
  iframe.contentWindow.getSelection().removeAllRanges()
}

function getTextSelection() {
  return content;
}

