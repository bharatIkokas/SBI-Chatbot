/* SBI Chatbot */

var loadingDelay = 700;
var $document = document;
var $chatbot = $document.querySelector('.chatbot');
var $chatbotMessageWindow = $document.querySelector('.chatbot__message-window');
var $chatbotHeader = $document.querySelector('.chatbot__header');
var $chatbotMessages = $document.querySelector('.chatbot__messages');
var $chatbotInput = $document.querySelector('.chatbot__input');
var $chatbotSubmit = $document.querySelector('.chatbot__submit');

document.addEventListener('keypress', function (event) {
  if (event.which == 13) {
    var inputtxt = $chatbotInput.value;
    validateMessage(inputtxt);
  }
}, false);

$chatbotHeader.addEventListener('click', function () {
  toggle($chatbot, 'chatbot--closed');
  $chatbotInput.focus();
}, false);

$chatbotSubmit.addEventListener('click', function () {
  var inputtxt = $chatbotInput.value;
  validateMessage(inputtxt);
  $(this).children().attr('src', sendbtn);
}, false);


/* toggle the chatbot*/
var toggle = function toggle(element, klass) {
  var classes = element.className.match(/\S+/g) || [],
    index = classes.indexOf(klass);
  index >= 0 ? classes.splice(index, 1) : classes.push(klass);
  element.className = classes.join(' ');
};

var userMessage = function userMessage(content) {
  let virtualListElem = document.createElement("li");
  virtualListElem.classList.add("is-user");
  virtualListElem.classList.add("animation");
  let virtualParaElem = document.createElement("p");
  virtualParaElem.classList.add("chatbot__message");
  virtualParaElem.innerText = content;
  virtualListElem.appendChild(virtualParaElem);
  $chatbotMessages.appendChild(virtualListElem);
  let virtualTimeParaElem = document.createElement("p");
  virtualTimeParaElem.classList.add("chatbot-timestamp-user");
  virtualTimeParaElem.innerText = "2:34 PM";
  let virtualCheckImgElem = document.createElement("img");
  virtualCheckImgElem.src = "images/double-tick-icon.svg";
  virtualCheckImgElem.classList.add("tick-icon");
  virtualTimeParaElem.appendChild(virtualCheckImgElem);
  $chatbotMessages.appendChild(virtualTimeParaElem);


  // $chatbotMessages.appendChild('<li class=\'is-user animation\'>\n      <p class=\'chatbot__message\'>\n        ' + content + '\n      </p>\n     </li> \n <p class=\'chatbot-timestamp-user\'>\n 2:34 PM \n <img class=\'tick-icon\' src="images/double-tick-icon.svg"/> </p>');

};

var validateMessage = function validateMessage(msg) {
  var text = msg;
  if (text.length && text !== ' ') {
    console.log(msg);
    // check for logout 
    if (msg.toLowerCase() === 'logout') {
      logMeOut()
    }
    resetInputField();
    userMessage(text);
    init();
  }
  scrollDown();
  return false;
};
/*Reset Input Field*/
var resetInputField = function resetInputField() {
  $chatbotInput.value = '';
};

/* scroll to bottom*/
var scrollDown = function scrollDown() {
  $('.chatbot__messages').scrollTop($('.chatbot__messages')[0].scrollHeight);
  return false;
};

function logMeOut() {
  $('.modal-logout').addClass('is-visible');
}