var estado1 = false;
var estado2 = false;

function extensao(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
  }
  
  extensao.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
  extensao.prototype.constructor = extensao;
  extensao.prototype.onSelectionEvent = function(event) {
    
    var currSelection = this.viewer.getSelection();
    var domElem2 = document.getElementById('MySelectionValue2');
   
    //domElem2.innerText = currSelection;

    if (currSelection == 3360 || currSelection == 3414){
        if (estado1 == false){
            this.viewer.setThemingColor(3046,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3408,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3402,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3409,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3054,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            firebase.database().ref("comodo1").set(1)
        }
        if (estado1 == true){
           this.viewer.clearThemingColors();
           firebase.database().ref("comodo1").set(0)
        }
        if (estado2 == true){
            this.viewer.setThemingColor(3046,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3493,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3494,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3495,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3497,new THREE.Vector4(255/255, 255/255, 102/255, 1));
        }
        this.viewer.clearSelection(); 
        estado1 = !estado1;
    }
 
    if (currSelection == 3483 || currSelection == 3480){
        if (estado2 == false){ 
            this.viewer.setThemingColor(3046,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3493,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3494,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3495,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3497,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            firebase.database().ref("comodo2").set(1)    
        }
        if (estado2 == true){
            this.viewer.clearThemingColors();
            firebase.database().ref("comodo2").set(0)
        }
        if (estado1 == true){
            this.viewer.setThemingColor(3046,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3408,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3402,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3409,new THREE.Vector4(255/255, 255/255, 102/255, 1));
            this.viewer.setThemingColor(3054,new THREE.Vector4(255/255, 255/255, 102/255, 1));
        }
        this.viewer.clearSelection(); 
        estado2 = !estado2;
    }

};

extensao.prototype.load = function() {
    this.onSelectionBinded = this.onSelectionEvent.bind(this);
    this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onSelectionBinded);
    var domElem = document.getElementById('id-cortina');
    var luminosidadeElem = document.getElementById('id-luminosidade');
    firebase.database().ref().on('value', function (snapshot) {

        var cortina = snapshot.val().presence;
        if(cortina == false){
            domElem.innerText = "Não Detectada";
        }
        else if(cortina == true){
            domElem.innerText = "Detectada";
        }

        //var luminosidade = snapshot.val().luminosidade;
        //luminosidadeElem.innerText = luminosidade;
        });
    return true;
};

extensao.prototype.unload = function() {
    this.viewer.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onSelectionBinded);
    this.onSelectionBinded = null;
    return true;
};
  
  Autodesk.Viewing.theExtensionManager.registerExtension('extensao', extensao);