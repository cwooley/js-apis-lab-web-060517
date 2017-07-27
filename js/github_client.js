//define functions here

//NO ES6 REMEMBER :-(

const api = 'https://api.github.com/'

var myGists = function (data){
  username = data.owner.login
  $.ajax({
  url: api + 'users/'+ username +'/gists',
  type: 'GET',
  dataType: 'json',
  success: displayGists,
  error: failure
})
  console.log(data)
};

var displayGists = function (data){
  var gistsHTML = data.map((gist)=>{
    url = gist.html_url
    description = gist.description
    return `<li> <a href="${url}">${description}</a>`
  })

  $('#my-gists').empty
  $('#my-gists').append(gistsHTML)
}

var failure = function (){
  debugger
  console.log(data)
}

var createGist = function(file_name, content, description, token){
  var newGistObj = {
    "description": description,
    "public": true,
    "files": {
      [file_name]: {
        "content": content
      }
    }
  }
  
  $.ajax({
    url: api +'gists',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(newGistObj),
    headers: {
      Authorization: "token " + token
    },
    success: myGists,
    error: failure
  })

};



var bindCreateButton = function() {
  // call functions here
  $('#make-gist').on('submit', function(event){
    event.preventDefault()
    var token = $('#new-gist-token').val()
    var file_name = $('#file-name').val()
    var description = $('#description').val()
    var content = $('#contents').val()
    createGist(file_name, content, description, token)

  })
};

$(document).ready(function(){
  bindCreateButton();

});
