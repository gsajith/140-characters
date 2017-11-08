const MAX_LENGTH = 140;

setInterval(function() {
  var textTweets = document.getElementsByClassName("tweet-text");

    for (var i = 0; i < textTweets.length; i++) {
      var text = textTweets[i].innerHTML;
      var maxLength = MAX_LENGTH;
      var openTag = false;
      var startTag = 0;
      for (var c = 0; c < text.length; c++) {
        if (text[c] === "<" && !openTag) {
          startTag = c;
          openTag = true;
        } else if (text[c] === ">" && openTag) {
          var tag = HTMLtoDOM(text.substring(startTag, c+1));
          if (tag.getElementsByClassName("Emoji").length > 0 || tag.getElementsByClassName("Emoji--forText").length > 0) {
            maxLength--;
          }
          openTag = false;
          startTag = c;
        } else if (!openTag) {
          maxLength--;
        }
        if (maxLength == 0) {
          textTweets[i].innerHTML = text.substring(0, c);
          break;
        }
      }
    }
}, 1000);

function HTMLtoDOM(html) {
  var el = document.createElement('html');
  el.innerHTML = html;
  return el;
}
