![three](https://github.com/danzen/zim-three/assets/380281/1256b99e-01a0-4870-8eff-ed8de22b7993)

<p>Three is a helper module for the ZIM JavaScript Canvas Framework that makes it easy to include ZIM inside of three.js as an interactive texture.</p>

<p>In ZIM 015 we launched <a href=https://zimjs.com/015>TextureActives</a>.  This is a system that reads raycast x and y and passes the data into ZIM instead of pointer position.  
Now anything that can be done in ZIM can be used as an interactive texture on any material of any mesh in three.js.  This is beyond menus and also includes games, puzzles, interactive art and more!
</p>
<p>See the <a href=https://zimjs.com/015>ZIM 015 Features page</a> for links to the promo video, VR examples and a half dozen general examples as well as video and article resources in ZIM and three.js forums.</p>


<a href=https://zimjs.com/015>![textureactives](https://github.com/danzen/zim-three/assets/380281/f28fc27f-538b-40aa-8375-6f0b8bc422a8)</a>

<h2>Sample Code - Panel with Draggable Circle</h2>

<img src="https://github.com/danzen/zim-three/assets/380281/096afaa4-17f2-43a6-9695-41cbe4cf735a" width=300>

<p><a href=https://zimjs.com/015/textureactive_simple.html>Live Example</a> | <a href=https://forum.zimjs.com/t/textureactives-zim-inside-three-js/237>Forum Help</a></p>

```JavaScript
// ~~~~~~~~~~~~~~~~~~~~~~~
// ZIM

const panel = new TextureActive({
    width:W,
    height:H,
    color:light,
    corner:20
}).addTo();

// pressing the ALT T key will toggle between the 3D and 2D mode
// Usually we would use this during production then turn it off
// Here we add a logo that will also toggle when pressed	
TextureActive.makeLogo("light", true).loc(50,50,panel).tap(()=>{
  textureActives.manager.toggle();
});

new Circle(100, purple)
  .center(panel)
  .drag();    


// ~~~~~~~~~~~~~~~~~~~~~~~
// THREEJS

const three = new Three({
  width:window.innerWidth, 
  height:window.innerHeight, 
  cameraPosition:new THREE.Vector3(0,0,500),
  textureActive:true
});

const renderer = three.renderer;
const scene = three.scene;
const camera = three.camera;
const canvas = three.canvas;
const controls = new OrbitControls(camera, canvas);

// TEXTUREACTIVES
const textureActives = new TextureActives(panel, THREE, three, renderer, scene, camera, controls);

// if the object is a plane then we can use the makePanel
const canvasWindow = three.makePanel({
  textureActive:panel, 
  textureActives:textureActives, 
  curve:50,
  doubleSide:true
})
scene.add(canvasWindow);   
```

<h2>Sample Code - Draw on Cube with Pen</h2>


<img src="https://github.com/danzen/zim-three/assets/380281/623548eb-f14a-49b2-a15b-36f292a1b075" width=300>

<p><a href=https://zimjs.com/015/textureactive_simple2.html>Live Example</a> | <a href=https://forum.zimjs.com/t/textureactives-zim-inside-three-js/237>Forum Help</a></p>

```JavaScript
// ~~~~~~~~~~~~~~~~~~~~~~~
// ZIM

const paper = new TextureActive({
	width:500,
	height:500,
	color:black,
	corner:0,
	borderColor:white,
	borderWidth:2,
	backingOrbit:false
});

const pen = new Pen({color:series(white,purple), size:10, cache:false}).center(paper);
new MotionController({target:pen, type:"pressmove", container:paper});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// THREEJS

const three = new Three({
	width:window.innerWidth, 
	height:window.innerHeight, 
	cameraPosition:new THREE.Vector3(0,0,500),
	textureActive:true
});

const renderer = three.renderer;
const scene = three.scene;
const camera = three.camera;
const canvas = three.canvas;
const controls = new OrbitControls(camera, canvas);

// TEXTUREACTIVES
const textureActives = new TextureActives(paper, THREE, three, renderer, scene, camera, controls);


// if the object is not a plane then we use the CanvasTexture
const cubeGeometry = new THREE.BoxGeometry(300,300,300);
const cubeTexture = new THREE.CanvasTexture(paper.canvas);
const cubeMaterial = new THREE.MeshBasicMaterial({map:cubeTexture});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);           
scene.add(cube); 
textureActives.addMesh(cube);

```

<h2>CDN</h2>
<p>Usually we use ES Modules to bring in ZIM and if we want Three then we the code below - see the starting template at the top of the https://zimjs.com/code page.
</p>

```JavaScript
import zim from "https://zimjs.org/cdn/016/zim_three";
```

<h2>NPM</h2>
<p>This repository holds the NPM package so you can install from <a href=https://www.npmjs.com/package/@zimjs/three target=node>@zimjs/three</a> on NPM.  The <a href=https://www.npmjs.com/package/zimjs target=node>ZIM&nbsp;package</a> must be installed to work.</p>

```JavaScript
import zim from "zimjs"

// these are included in the @zimjs/three package as dependencies
import * as THREE from "three" 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { Three } from "@zimjs/three"
```


<h2>Adding three.js inside of ZIM</h2>

<a href=https://zimjs.com/three/>![image](https://github.com/danzen/zim-three/assets/380281/4419faec-84fd-4c9a-a79c-6aff1f671a48)</a>

<p>This earlier original use-case overlays a three.js scene on the ZIM 2D canvas.  In the <a href=https://zimjs.com/three/>example&nbsp;pictured&nbsp;above</a>, the phone is a model in three.js.  We are controlling color, rotation and zoom with ZIM components around the side.  A drawback is either ZIM or three.js is interactive but not both.  We did modify the OrbitControls of our ES6 module at https://zimjs.org/cdn/016/zim_three.js to work even when ZIM is interactive - but have not similarily adjusted a node module.</p>

<h2>Older Examples</h2>

- https://zimjs.com/three/ - phone with controls
- https://zimjs.com/bits/view/three.html - cube with controls
- https://codepen.io/zimjs/full/qGPVqO - world with labels
- https://codepen.io/zimjs/full/abzXeZX - gallery

<h2>ZIM</h2>
<p>See the ZIM repository at https://github.com/danzen/zimjs for information on ZIM and open source license, etc.</p>

    



