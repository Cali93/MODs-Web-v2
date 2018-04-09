document.getElementById('addMod').addEventListener('click', function () {
  var loader = new THREE.ObjectLoader();
  loader.load( // load a resource
    '../assets/MODs.json', // resource URL
    function (obj) { // onCompleted callback
      editor.execute(new AddObjectCommand(obj));
    },
    function (xhr) { // onProgress callback
      // console.log();
    },
    function (err) { // onError callback
      console.log('An error happened');
    }
  );
})

// Save the MODs into the DB
document.querySelector('#checkMods').addEventListener('click', function (e) {

  var sceneObjects = editor.scene.children;
  // Removing the parent & geometry property of the object
  let mesh = sceneObjects.map((obj) => {
    var threeObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key != 'parent' && key != 'geometry') {
          threeObj[key] = obj[key];
        }
      }
    }
    return threeObj
  })

  // mesh = Array.isArray(JSON.parse(JSON.stringify(mesh))); // determines if the obj is an array
  mesh = JSON.parse(JSON.stringify(mesh))
  // console.log(mesh);
  superObject = {
    meshes: mesh
  };
  // console.log(superArray);
  var xhr = new XMLHttpRequest();

  xhr.open("POST", 'http://localhost:3000/user/5aa06472b8b87d00fc17df8a/projects', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onreadystatechange = function () { //Call a function when the state changes.
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      // Request finished. Do processing here.
    }
  }
  xhr.send(JSON.stringify(superObject));
});

// Fetch the MODs from the DB
document.querySelector('#fetchStructure').addEventListener('click', function () {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", 'http://localhost:3000/projects/5aab7dffe2013802b0b3ef4d', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onreadystatechange = function () { //Call a function when the state changes.
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      // Request finished. Do processing here.

      // 1. Parsing the requested project so that we can access its properties
      var resProject = JSON.parse(this.responseText);

      // 2. Accessing the meshes
      var meshes = resProject.project.meshes
      console.log(meshes);

      // 3. Adding the geometry property for each MOD object
      var result = meshes.filter((obj) => {
        return 'a three'+ obj + 'cool'
      })
      console.log(result)

      // 4. Adding the meshes to the scene
      var scene = editor.scene
      var sceneObjects = editor.scene.children

      // 4.1 Clearing the scene
      while (sceneObjects.length > 0) {
        scene.remove(sceneObjects[0]);
      }
      console.log(sceneObjects);

      // 4.2 Setting the scene objects equal to the retrieved meshes
      sceneObjects = meshes
      console.log(sceneObjects);

    }
  }
  xhr.send();

});

var menuHiders = document.getElementsByClassName('hideMenu');
for (var i = 0; i < menuHiders.length; i++) {
  menuHiders[i].addEventListener('click', function (e) {
    e.preventDefault;
    document.querySelector(this.dataset.toggle).classList.toggle('hidden');
  });
}
document.querySelector('#rotate').addEventListener('click', function (e) {
  editor.signals.transformModeChanged.dispatch('rotate');
  document.querySelector('#move').classList.toggle('hide');
  document.querySelector('#rotate').classList.toggle('hide');
});
document.querySelector('#move').addEventListener('click', function (e) {
  editor.signals.transformModeChanged.dispatch('translate');
  document.querySelector('#move').classList.toggle('hide');
  document.querySelector('#rotate').classList.toggle('hide');
});
document.querySelector('#delete').addEventListener('click', function (e) {
  var object = editor.selected;
  // if ( confirm( 'Delete ' + object.name + '?' ) === false ) return;
  var parent = object.parent;
  if (parent === undefined) return; // avoid deleting the camera or scene
  editor.execute(new RemoveObjectCommand(object));
});
document.querySelector('#clone').addEventListener('click', function (e) {
  var object = editor.selected;
  if (object.parent === null) return; // avoid cloning the camera or scene
  object = object.clone();
  editor.execute(new AddObjectCommand(object));
});
