const { ipcRenderer } = require('electron');

ipcRenderer.on("load", (event, arg) => {
  document.getElementsByClassName("textbox")[0].value = arg;
  document.getElementById("characters").innerHTML = arg.replace(/\s/g, "").length + " characters";
  document.getElementById("wordcount").innerHTML = arg.split(/\s/g).filter(function(w){ return w !== '' }).length + " words";
});

ipcRenderer.on("save", (event, arg) => {
  var data = document.getElementsByClassName("textbox")[0].value;
  ipcRenderer.send('save', data);
});
