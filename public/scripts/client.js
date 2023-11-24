$(document).ready(() => {
  $("#send-message").submit(function(event) {
     event.preventDefault();

     const message = $('#message').val();

     $.ajax({
       type: "POST",
       url: "/send",
       data: {messages: message}
     })
     .then(() => {
       $('#message').val("");
       alert('SMS sent successfully');
     }) 
     .catch(function(error) {
       console.log("error", error.message);
       alert('Error sending SMS');
     });
  });
});