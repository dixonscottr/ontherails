$(document).ready(function(){
  console.log("**Updating train data**");
  setInterval("$('form#train-updater').submit()", 25000);
});
