$(document).ready(() => {
  $("#send-message").submit(function(event) {
     event.preventDefault();
 
     const message = $('#message').val();

     $.ajax({
       type: "POST",
       url: "/send",
       data: {messages: message}
     })
     .then(function(res) {
       $('#message').val("");
       alert('SMS send succesfully');
     }) 
     .catch(function(error) {
       console.log("error", error.message);
       alert('error sending SMS');
     })
   });
 })