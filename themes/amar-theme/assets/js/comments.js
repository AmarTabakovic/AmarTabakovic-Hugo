const slug = document.currentScript.getAttribute('slug')

const api = 'https://qh3f549cs7.execute-api.eu-central-1.amazonaws.com/' 

let urlGet = api + 'get_comments/' + slug

let commentListEl = document.getElementById('comment-list')

fetch(urlGet)
    .then(function (response) {
      return response.json()
    })
    .then(function (jsonResponse) {
      renderComments(jsonResponse)
    })

function renderComments(json) {
    for (var i = 0; i < json.Items.length; i++) {
        let name = json.Items[i].name
        let nameEl = document.createElement("p")
        nameEl.classList = "comment-name"
        nameEl.innerHTML = name

        let body = json.Items[i].body
        let bodyEl = document.createElement("p")
        bodyEl.classList = "comment-body"
        bodyEl.innerHTML = body

        let commentEl = document.createElement("div")
        commentEl.classList = "comment"

        let commentBottomEl = document.createElement("div")
        commentBottomEl.classList = "comment-bottom"

        let unixDate = json.Items[i].time_stamp
        let date = timeConverter(unixDate)
        let dateEl = document.createElement("h4")
        dateEl.innerHTML = date

         /*let replyEl = document.createElement("a")
        replyEl.innerHTML = "Reply"
        replyEl.classList = "reply-link"

        commentBottomEl.append(replyEl)*/

        commentBottomEl.append(dateEl)

        commentEl.append(nameEl)
        commentEl.append(bodyEl)
        commentEl.append(commentBottomEl)
        
        commentListEl.append(commentEl)
    }
}

let submitButtonEl = document.getElementById('submit-comment')

let urlPost = api + 'post_comment'

submitButtonEl.addEventListener('click', function(event) { 
    event.preventDefault()

    const nameField = document.querySelector('input[name="name"]');
    const bodyField = document.querySelector('textarea[name="body"]');

    fetch(urlPost, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: nameField.value,
            body: bodyField.value,
            post_name: slug,
            time_stamp: Date.now()
        })
    }).then( function() {
        location.reload();
    })
})


// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function timeConverter(){
    var a = new Date();
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date + ', ' + year + ' - ' + hour + ':' + min ;
    return time;
  }