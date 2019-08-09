import React from 'react';
import TextBox from './TextBox';

/*
var items = [{0:"sdas"}, {1:"sdas"}];

function additem() {
  var index = numberOfItems();
  items[index] = "sdas";
}

function numberOfItems(){
  var length = "" + items.length;
  return length;
}

(function () {
  var holder = document.getElementById("file-list");

  holder.ondragover = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  holder.ondragleave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  holder.ondragend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  holder.ondrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //removeAllFiles(baseDir + '/img/idle/');
    for (let f of e.dataTransfer.files) {
      if (!f.type.includes('image')) {
        console.log('File(s) must be an image(s)')
        return false;
      }
      // Read and write files asynchronously, otherwise it has to use callback
      fs.readFile(f.path, 'binary', function(err, data){
        var filename = path.basename(f.path);
        fs.writeFile(baseDir + '/img/idle/' + filename, data, 'binary', (err) => {
          if(err) console.log("An error ocurred creating the file " + err.message);
          console.log("The file has been succesfully saved.");
        });
      });
    }
    return false;
  };
})();
*/

function Main(){

  return (
    <main>
      <TextBox />
    </main>
  );
}

export default Main;
