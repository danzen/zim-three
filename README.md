![three](https://github.com/danzen/zim-three/assets/380281/1256b99e-01a0-4870-8eff-ed8de22b7993)

<p>Three is a helper module for the ZIM JavaScript Canvas Framework that makes it easy to include ZIM inside of three.js as an interactive texture.</p>

<p>In ZIM 015 we launched <a href=https://zimjs.com/015>TextureActives</a>.  This is a system that reads raycast x and y and passes the data into ZIM instead of pointer position.  
Now anything that can be done in ZIM can be used as an interactive texture on any material of any mesh in three.js.  This is beyond menus and also includes games, puzzles, interactive art and more!
</p>
<p>See the <a href=https://zimjs.com/015>ZIM 015 Features page</a> for links to the promo video, VR examples and a half dozen general examples as well as video and article resources in ZIM and three.js forums.</p>


![textureactives](https://github.com/danzen/zim-three/assets/380281/f28fc27f-538b-40aa-8375-6f0b8bc422a8)

<h2>Sample Code</h2>

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

<h2>2. three.js inside of ZIM</h2>

![image](https://github.com/danzen/zim-three/assets/380281/4419faec-84fd-4c9a-a79c-6aff1f671a48)

<p>This earlier original use case overlays a three.js scene on the ZIM 2D canvas.  In the <a href=https://zimjs.com/three/>example&nbsp;pictured&nbsp;above</a>, the phone is a model in three.js.  We are controlling color, rotation and zoom with ZIM components around the side.  A drawback is either ZIM or three.js is interactive but not both.  We did modify the OrbitControls of our ES6 module at https://zimjs.org/cdn/016/zim_three.js to work even when ZIM is interactive - but have not similarily adjusted a node module.</p>


    



