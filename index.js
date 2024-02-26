// ZIM - https://zimjs.com - Code Creativity!
// JavaScript Canvas Framework for General Interactive Media
// free to use - donations welcome of course! https://zimjs.com/donate

// ZIM THREE - see https://zimjs.com/code#libraries for examples

// ~~~~~~~~~~~~~~~~~~~~~~~~
// DESCRIPTION 
// Three is an add-on ZIM module to help with three.js
// The Three Module has Three(), XRControllers(), XRMovement(), and XRTeleport()

// DOCS
// Docs are provided at https://zimjs.com/docs.html
// See THREE MODULE at bottom
// ~~~~~~~~~~~~~~~~~~~~~~~~

var WW = window||{};

import zim from "zimjs";

// import * as THREE from "three"; // could use this but will tree-shake
import { 
    AdditiveBlending,
    BoxGeometry,
    BufferGeometry,
    CanvasTexture,
    CircleGeometry,
    Color,
    ColorManagement,
    ConeGeometry,
    CylinderGeometry,
    DoubleSide,
    FrontSide,
    Group,
    Line,
    LinearSRGBColorSpace,
    LineBasicMaterial,
    Matrix4,
    Mesh,
    MeshBasicMaterial,
    OrthographicCamera,
    PerspectiveCamera,
    PlaneGeometry,
    Quaternion,
    Raycaster,
    RingGeometry,
    Scene,
    TorusGeometry,
    Vector2,
    Vector3,
    WebGLRenderer
} from "three"; 



// note - removed the ES5 module pattern as we are getting zim from import
// ~~~~~~~~~~~~~~~~~~~~~~~~

zim.threeCanvasNum = 0;	

zim.Three = function(width, height, color, cameraPosition, cameraLook, interactive, resize, frame, ortho, textureActive, colorSpace, colorManagement, legacyLights, throttle, lay, full, xr, VRButton, xrBufferScale) {
    var sig = "width, height, color, cameraPosition, cameraLook, interactive, resize, frame, ortho, textureActive, colorSpace, colorManagement, legacyLights, throttle, lay, full, xr, VRButton, xrBufferScale";
    var duo; if (duo = zob(zim.Three, arguments, sig, this)) return duo;
    
    if (zot(frame)) frame = WW.zdf;
    if (zot(createjs)) {zog("ZIM THREE needs a createjs namespace active"); return;}
    if (zot(width)) width = frame.width;
    if (zot(height)) height = frame.height;
    if (zot(cameraPosition)) cameraPosition = new Vector3(0, 200, 200); // x, y, z - pulled back and above
    if (zot(cameraLook)) camera = null; // set to scene positon
    if (zot(interactive)) interactive = false; // no interaction on three.js
    if (zot(resize)) resize = true;
    if (zot(frame)) frame = zimDefaultFrame;
    if (zot(ortho)) ortho = false;
    if (zot(textureActive)) textureActive = false;
    if (zot(colorSpace)) colorSpace = LinearSRGBColorSpace;
    if (zot(colorManagement)) colorManagement = false;
    if (zot(legacyLights)) legacyLights = false;
    if (zot(throttle)) throttle = false;
    if (textureActive) interactive = true;
    if (zot(lay)) lay = null;
    if (zot(full)) full = false;
    if (zot(xr)) xr = false;
    if (zot(VRButton)) VRButton = xr?window.VRButton:false;
    if (zot(xrBufferScale)) xrBufferScale = 2;

    if (zot(WW.zimDefaultThree)) WW.zimDefaultThree = this;
    this.frame = frame;

    var that = this;

    var pRatio = frame.retina?(WW.devicePixelRatio || 1):1;

    // RENDERER
    if (WW.WebGLRenderingContext || document.createElement('canvas').getContext('experimental-webgl')) {
        var renderer = that.renderer = new WebGLRenderer({alpha: true, antialias:true});
        renderer.setSize(width*pRatio, height*pRatio);			
        if (ortho) renderer.autoClear = false;
        renderer.outputColorSpace = colorSpace;
        ColorManagement.enabled = colorManagement;
        if (legacyLights) renderer.useLegacyLights = true;
        this.success = true;
    } else {
        this.success = false;
        return;
    }

    // CANVAS
    var canvas = this.canvas = renderer.domElement;
    canvas.setAttribute("id", "zimThree" + zim.threeCanvasNum++); // starts at 0 (post assignment incrementor)
    canvas.setAttribute("width", width*pRatio);
    canvas.setAttribute("height", height*pRatio);
    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.width = width+'px';
    canvas.style.height = height+'px';
    if (lay=="under") {
        canvas.style.zIndex = -20;
        frame.color = clear;
        if (interactive) frame.canvas.style.pointerEvents = "none";
    }

    // frame.canvas.parentNode.insertBefore(canvas, frame.canvas.nextSibling);
    document.body.appendChild(canvas);		
    if (!interactive) canvas.style.pointerEvents = "none";

    if (!textureActive && !full) {
        // DOM ELEMENT
        // use this in ZIM to set x, y, scaleX, scaleY, rotation, alpha
        // and stage.removeChild(DOMElement);
        // it does not have ZIM 4TH methods
        // you cannot interact with it - like click, drag, etc.
        // If you set the Three object's interactive to true
        // then you can use DOM JavaScript with addEventListener to interact
        // but then you can't interact with ZIM underneath the DOMElement
        // see CreateJS Docs for DOMElement for more info:
        // https://www.createjs.com/docs/easeljs/classes/DOMElement.html
        var DOMElement = this.DOMElement = new createjs.DOMElement(canvas);
        DOMElement.setBounds(0,0,width,height);
        zim.centerReg(DOMElement, null, null, false);
        frame.stage.addChild(DOMElement);
    } else {
        width = WW.innerWidth;
        height = WW.innerHeight;
    }
            

    // POSITION AND SCALE DOMElement
    // the DOM Element is window scale not zim Frame scale
    // so need to be able to convert from window to frame
    // use this in ZIM to position and scale the Three DOMElement
    this.position = function(x, y) {
        if (textureActive || full || !frame) return;
        if (zot(x)) {
            x = zot(that.realX)?frame.stage.width/2:that.realX;
        } else {
            that.realX = x;
        }
        if (zot(y)) {
            y = zot(that.realY)?frame.stage.height/2:that.realY;
        } else {
            that.realY = y;
        }

        if (frame.retina) {
            DOMElement.x = frame.x/frame.stage.scaleX + x/pRatio;
            DOMElement.y = frame.y/frame.stage.scaleY + y/pRatio;
        } else {
            DOMElement.x = frame.x + x*frame.scale;
            DOMElement.y = frame.y + y*frame.scale;
        }
    }		

    this.scale = function(s) {
        if (textureActive || full) return;
        if (zot(s)) {
            s = zot(that.realS)?1:that.realS;
        } else {
            that.realS = s;
        }
        if (frame.retina) {
            DOMElement.scaleX = DOMElement.scaleY = s/pRatio;
        } else {
            DOMElement.scaleX = DOMElement.scaleY = frame.scale*s;
        }
    }

    // SCENE
    var scene = this.scene = new Scene();
    if (!zot(color)) scene.background = new Color(color);

    // CAMERA
    // standard settings
    var viewAngle = 70;
    var aspect = width/height;
    var near = 0.1; var far = 200000;
    var camera = this.camera = new PerspectiveCamera(viewAngle, aspect, near, far);
    scene.add(camera);
    camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z);
    camera.lookAt(zot(cameraLook)?scene.position:cameraLook);

    if (xr) {
        renderer.xr.enabled = true;
        renderer.xr.setFramebufferScaleFactor(xrBufferScale);			
        if (VRButton) {
            that.vrButton = VRButton.createButton(renderer, scene);
            document.body.appendChild(that.vrButton);
        }
    }

    if (ortho) {
        // this does not scale objects - good for HUD			
        // last two parameters are near and far - objects on ortho scene must be placed from 0-10
        var cameraOrtho = that.cameraOrtho = new OrthographicCamera(-width/2, width/2, height/2, -height/2, 0, 10);
        var sceneOrtho = that.sceneOrtho = new Scene();
        cameraOrtho.position.z = 10;
    }

    // RESIZE 
    if (textureActive || full) {
        if (resize) {
            that.resizeEvent = function() {
                var width = WW.innerWidth;
                var height = WW.innerHeight;			
                camera.aspect = width/height;
                camera.updateProjectionMatrix();			
                if (ortho) {
                    cameraOrtho.left = -width/2;
                    cameraOrtho.right = width/2;
                    cameraOrtho.top = height/2;
                    cameraOrtho.bottom = -height/2;
                    cameraOrtho.updateProjectionMatrix();    
                }			
                renderer.setSize(width, height);					
            }
            WW.addEventListener('resize', that.resizeEvent, false);
            that.resizeEvent();			
        }
    } else {
        if (resize) {
            that.resizeEvent = function() {					
                that.scale();
                that.position();
            };
            WW.addEventListener('resize', that.resizeEvent, false);	
            that.resizeEvent();
        }
    }
    setTimeout(function () {
        if (frame && frame.update) {
            frame.update();
            if (resize) that.resizeEvent();
        }
    }, 20);

    // RENDERER ENGINE
    // var request;
    function render() {
        // request = requestAnimationFrame(render);
        if (that.preRender) that.preRender();
        if (that.controllerRender) that.controllerRender();
        if (that.teleportRender) that.teleportRender();
        if (that.movementRender) that.movementRender();
        renderer.render(scene,camera);
        if (that.postRender) that.postRender();
    }
    function renderOrtho() {
        // request = requestAnimationFrame(renderOrtho);
        renderer.clear();
        if (that.preRender) that.preRender();
        if (that.controllerRender) that.controllerRender();
        if (that.teleportRender) that.teleportRender();
        if (that.movementRender) that.movementRender();
        renderer.render(scene,camera);		
        if (that.postRender) that.postRender();	
        renderer.clearDepth();
        renderer.render(sceneOrtho, cameraOrtho);			
    }
    function renderT() {
        // request = requestAnimationFrame(renderT);
        if (++tc%throttle!=0) return;
        if (that.preRender) that.preRender();
        if (that.controllerRender) that.controllerRender();
        if (that.teleportRender) that.teleportRender();
        if (that.movementRender) that.movementRender();
        renderer.render(scene,camera);
        if (that.postRender) that.postRender();
    }
    function renderOrthoT() {
        // request = requestAnimationFrame(renderOrthoT);
        if (++tc%throttle!=0) return;
        renderer.clear();
        if (that.preRender) that.preRender();
        if (that.controllerRender) that.controllerRender();
        if (that.teleportRender) that.teleportRender();
        if (that.movementRender) that.movementRender();
        renderer.render(scene,camera);	
        if (that.postRender) that.postRender();		
        renderer.clearDepth();
        renderer.render(sceneOrtho, cameraOrtho);			
    }
    // if (throttle) {
    // 	var tc = 0;		
    // 	if (ortho) renderOrthoT();
    // 	else renderT();
    // } else {				
    // 	if (ortho) renderOrtho();
    // 	else render();
    // }
    if (throttle) {
        var tc = 0;		
        if (ortho) renderer.setAnimationLoop(renderOrthoT);
        else renderer.setAnimationLoop(renderT);
    } else {				
        if (ortho) renderer.setAnimationLoop(renderOrtho);
        else renderer.setAnimationLoop(render);
    }


    // HELPER METHODS FOR ROTATING AROUND AXIS
    this.rotateAroundAxis = function(obj, axis, radians) {
        var rotWorldMatrix = new Matrix4();
        rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
        rotWorldMatrix.multiply(obj.matrix);
        obj.matrix = rotWorldMatrix;
        obj.rotation.setFromRotationMatrix(obj.matrix);
    }

    this.rotateAroundObjectAxis = function(obj, axis, radians) {
        var rotObjectMatrix = new Matrix4();
        rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
        obj.matrix.multiply(rotObjectMatrix);
        obj.rotation.setFromRotationMatrix(obj.matrix);
    }

    this.makePanel = function(textureActive, textureActives, scale, curve, opacity, material, doubleSide, colorSpace) {
        var sig = "textureActive, textureActives, scale, curve, opacity, material, doubleSide, colorSpace";
        var duo; if (duo = zob(that.makePanel, arguments, sig)) return duo;
        if (zot(textureActive)) return;
        if (zot(scale)) scale = .5;
        if (zot(curve) || curve === true) curve = false;
        if (zot(opacity)) opacity = 1;
        if (zot(material) || typeof material == "string") material = MeshBasicMaterial;
        var geometry = new PlaneGeometry(textureActive.width*scale, textureActive.height*scale, curve?20:1, curve?20:1); 
        if (curve) that.curvePlane(geometry, curve);
        var texture = new CanvasTexture(textureActive.canvas);
        if (zot(doubleSide)) doubleSide = false;
        if (!zot(colorSpace)) texture.colorSpace = colorSpace;
        var material = new (material)({
            map:texture, 
            side:doubleSide?DoubleSide:FrontSide,
            transparent:true,
            opacity:opacity
        });
        var mesh = new Mesh(geometry, material);
        if (textureActives) {
            var layer;
            if (textureActives.layers) layer = textureActives.layers[0];
            textureActives.addMesh(mesh, layer);
        }
        if (!that.positionEvent) {
            that.positionItems = new zim.Dictionary(true);
            that.positionEvent = function() {
                var width = WW.innerWidth;
                var height = WW.innerHeight;
                zim.loop(that.positionItems.values, function(v) {

                    var w = v.obj.geometry.parameters.width*v.obj.scale.x;
                    var h = v.obj.geometry.parameters.height*v.obj.scale.y;

                    if (v.horizontal == "left") {
                        v.obj.position.x = width > v.gutter ? -width/2+(v.x+w/2) : (v.x+w/2)-v.gutter/2;
                    } else if (v.horizontal == "right") {
                        v.obj.position.x = width > v.gutter ? width/2-(v.x+w/2) : -(v.x+w/2)+v.gutter/2; 
                    } else {
                        v.obj.position.x = v.x;
                    }
                    
                    if (v.vertical == "top") {
                        v.obj.position.y = height/2 - (v.y+h/2);
                    } else if (v.vertical == "bottom") {
                        v.obj.position.y = -height/2 + (v.y+h/2);
                    } else {
                        v.obj.position.y = v.y;
                    }

                });
            };
            WW.addEventListener('resize', that.positionEvent, false);				
        }
        mesh.pos = function(x,y,horizontal,vertical,gutter) {
            if (zot(x)) x = 0;
            if (zot(y)) y = 0;
            if (zot(horizontal)) horizontal = "left";
            if (zot(vertical)) vertical = "top";
            if (zot(gutter)) gutter = 0;
            that.positionItems.add(this, {obj:this, x:x, y:y, horizontal:horizontal, vertical:vertical, gutter:gutter});
            that.positionEvent();
            return this;
        }			
        return mesh;
    } 

    this.posMesh = function(mesh,x,y,horizontal,vertical,gutter) {
        mesh.pos(x,y,horizontal,vertical,gutter);
        return this;
    }

    this.flipMaterial = function(materialType, params) {
        if (zot(materialType)) materialType = MeshBasicMaterial;
        if (params.map) {
            params.map.center = new Vector2(0.5, 0.5);
            params.map.rotation = Math.PI;
            params.map.flipY = false;
        }
        var m = new (materialType)(params);
        m.userData.ta_flipped = true; // sent to ZIM TextureActive to adjust RayCast UV x
        return m;
    }

    this.curvePlane = function(geometry, z) {
        // prisoner849 Paul West three.js board

        var negative = z<0;
        z = Math.abs(z);
        // if (z<0) {
        // 	negative = true;
        // 	z = Math.abs(z);
        // }
        
        var p = geometry.parameters;
        var hw = p.width * 0.5;
        
        var a = new Vector2(-hw, 0);
        var b = new Vector2(0, z);
        var c = new Vector2(hw, 0);
        
        var ab = new Vector2().subVectors(a, b);
        var bc = new Vector2().subVectors(b, c);
        var ac = new Vector2().subVectors(a, c);
        
        var r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));
        
        var center = new Vector2(0, z - r);
        var baseV = new Vector2().subVectors(a, center);
        var baseAngle = baseV.angle() - (Math.PI * 0.5);
        var arc = baseAngle * 2;
        
        var uv = geometry.attributes.uv;
        var pos = geometry.attributes.position;
        var mainV = new Vector2();
        for (var i = 0; i < uv.count; i++){
            var uvRatio = 1 - uv.getX(i);
            var y = pos.getY(i);
            mainV.copy(c).rotateAround(center, (arc * uvRatio));
            pos.setXYZ(i, mainV.x, y, negative?mainV.y:-mainV.y);
        }		
    }

    this.dispose = function() {
        // thanks https://discourse.threejs.org/t/when-to-dispose-how-to-completely-clean-up-a-three-js-scene/1549/15
        var scene = that.scene;
        if (DOMElement) frame.stage.removeChild(DOMElement);
        if (renderer.domElement && renderer.domElement.parentElement) renderer.domElement.parentElement.removeChild(renderer.domElement);			
        if (that.renderer) that.renderer.dispose();
        if (scene) {
            scene.traverse(function(object) {
                if (!object.isMesh) return;
                object.geometry.dispose();
                if (object.material.isMaterial) {
                    cleanMaterial(object.material);
                } else {
                    for (var material of object.material) cleanMaterial(material);
                }
            });
            function cleanMaterial (material) {
                material.dispose();
                for (var key of Object.keys(material)) {
                    var value = material[key]
                    if (value && typeof value === 'object' && 'minFilter' in value) {
                        value.dispose();							
                    }
                }
            }
        }

    

        if (that.canvas) that.canvas.style.display = "none";
        if (that.resizeEvent) WW.removeEventListener("resize", that.resizeEvent);
        if (that.positionEvent) WW.removeEventListener("resize", that.positionEvent);
        that.renderer = null;
        that.canvas = null;
        that.DOMElement = null;
        that.camera = null;
        that.cameraOrtho = null;
        that.scene = null;
        that.sceneOrtho = null;
        that.vrButton = null;
    }
}

zim.XRControllers = function(three, type, color, highlightColor, lineColor, lineLength, threshhold) {
    var sig = "three, type, color, highlightColor, lineColor, lineLength, threshhold";
    var duo; if (duo = zob(zim.XRControllers, arguments, sig, this)) return duo;

    this.type = "XRControllers";

    if (zot(type)) type = "laser";
    if (zot(color)) color = "#cccccc";
    if (zot(highlightColor)) highlightColor = ["violet",zim.blue]
    if (zot(lineColor)) lineColor = "#cccccc";
    if (zot(lineLength)) lineLength = 5;		
    if (zot(threshhold)) threshhold = .2;

    var renderer = three.renderer;
    var scene = three.scene;

    if (!Array.isArray(type)) {
        if (type.isObject3D) {
            zogy("Three XRControllerSet() - must pass two custom controllers")
            type = [type, "laser"];  // material should not be cloned due to rollover
        } else {
            type = [type, type]; 
        }				
    }
    if (!Array.isArray(color)) color = [color, color];
    if (!Array.isArray(highlightColor)) highlightColor = [highlightColor, highlightColor];
    if (highlightColor[0]==-1) highlightColor[0] = color[0];
    if (highlightColor[1]==-1) highlightColor[1] = color[1];
    if (!Array.isArray(lineColor)) lineColor = [lineColor, lineColor];
    if (!Array.isArray(lineLength)) lineLength = [lineLength, lineLength];

    var that = this;
    that.threshhold = threshhold;

    if (type[0] != -1) this.controller1 = makeC(0);
    if (type[1] != -1) this.controller2 = makeC(1);

    three.controllerRender = function() {
        that.controller1.dispatchController();
        that.controller2.dispatchController();
    }

    function makeC(num) {

        var controller = renderer.xr.getController(num);            
        scene.add(controller);
        controller.userData.highlights = [];   
        var which = num==0?"left":"right";
        controller.userData.hand = which;   
        
        if (type[num].isObject3D) {
            var grip = controller.grip = renderer.xr.getControllerGrip(num);      
            scene.add(grip);
        } else {		
            var holder = controller.holder = new Group();
            // grip.add(holder);
            // holder.rotation.x = 300*RAD; // these work on Chrome but are off on Quest browser
            // holder.position.y = -.0682; 
            // holder.position.z = -.074;
            controller.add(holder);
        }
                
        controller.addEventListener("connected", function(e) {
            controller.gamepad = e.data.gamepad;
            if (num==0) {
                that.XR = true;		
                var ev = new createjs.Event("xrconnected");
                ev.data = that.data = e.data;
                that.dispatchEvent(ev);
            }
            // RETICULE
            if (lineColor[num] != -1) {
                var geometry, material, reticle;
                if (e.data && e.data.targetRayMode == "tracked-pointer") {
                    geometry = new BufferGeometry();
                    material = new LineBasicMaterial({color: lineColor[num]}); 
                    geometry.setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 0, -lineLength[num])]);
                    reticle = controller.reticle = new Line(geometry, material);												          
                } else {
                    geometry = new RingGeometry(.02, .04, 32 ).translate(0, 0, - 1);
                    material = new MeshBasicMaterial({opacity: .5, transparent: true});
                    reticle = controller.reticle = new Mesh(geometry, material);
                }
                controller.add(reticle);
                reticle.userData.xrteleportignore = true;
            }
        });	

        controller.addEventListener("disconnected", function(e) {
            if (num==0) {
                that.XR = false;		
                that.dispatchEvent("xrdisconnected");
            }
        });	
    
        var pressed = [0,0,0,0,0,0,0];
        var touched = [0,0,0,0,0,0,0];
        var axes = [that.threshhold,that.threshhold,that.threshhold,that.threshhold];

        controller.dispatchController = function() {				
            var data = controller.gamepad;
            if (!controller.gamepad) return;
            for(var i=0; i<pressed.length; i++) {
                var p = data.buttons[i].pressed?1:0;
                var t = data.buttons[i].touched?1:0;
                if (p!=pressed[i]) {
                    var e = new createjs.Event(p?"pressdown":"pressup");
                    e.controller = controller;
                    e.num = i;
                    e.hand = controller.userData.hand;
                    e.value = data.buttons[i].value
                    that.dispatchEvent(e);
                    if (e.num == 0) {
                        if (e.hand == "left") that.triggerLeft = p;
                        if (e.hand == "right") that.triggerRight = p;
                    }
                    if (e.num == 1) {
                        if (e.hand == "left") that.squeezeLeft = p;
                        if (e.hand == "right") that.squeezeRight = p;
                    } 
                    if (e.num == 2) {
                        if (e.hand == "left") that.padLeft = p;
                        if (e.hand == "right") that.padRight = p;
                    } 						
                }
                if (p!=touched[i]) {
                    var e = new createjs.Event(p?"touchstart":"touchend");
                    e.controller = controller;
                    e.num = i;
                    e.hand = controller.userData.hand;
                    e.value = data.buttons[i].value
                    that.dispatchEvent(e);
                }
                pressed[i] = p;
                touched[i] = t;
            }
            for(i=0; i<axes.length; i++) {
                var a = data.axes[i];
                if (Math.abs(a) < that.threshhold) a = that.threshhold;
                if (a!=axes[i]) {
                    var e = new createjs.Event("axes");
                    e.controller = controller;
                    e.num = i;
                    e.hand = controller.userData.hand;
                    e.dir = (i==0 || i==2)?"horizontal":"vertical";
                    e.value = data.axes[i]
                    that.dispatchEvent(e);
                }
                axes[i] = a;
            }
        }

        // scene.add(holder);
        // holder.scale.set(20,20,20)
        // holder.position.x = num==0?-2:2;
        

        if (type[num].isObject3D) {
            grip.add(type[num]);					
            var hl = type[num].userData.highlights;
            if (hl && !Array.isArray(hl)) type[num].userData.highlights = [hl];
            // transfer highlights
            controller.userData.highlights = type[num].userData.highlights;
        } else {

            if (type[num] != "line") {			

                // BODY - common except for line
                var handleGeometry = new CylinderGeometry(.009, .009, .09, 30);            
                var handleMaterial = [
                    new MeshBasicMaterial({color: color[num], transparent:true, opacity:.7}),
                    new MeshBasicMaterial({color: "#666666", transparent:true, opacity:.7}),
                    new MeshBasicMaterial({color: "#ffffff", transparent:true, opacity:.7})
                ];    
                var handle = new Mesh(handleGeometry, handleMaterial); 
                handle.rotation.x = 90*RAD;         
                handle.position.z = .045;         
                holder.add(handle);  

                controller.userData.highlights.push(handle.material[0]);          
            }      
    
            if (type[num] == "gun" || type[num] == "raygun") {
                var gunGeometry = new BoxGeometry(.018, .018, .05); 
                var gunMaterial = new MeshBasicMaterial({color: color[num], transparent:true, opacity:.7});

                var gun = new Mesh(gunGeometry, gunMaterial);          
                gun.rotation.x = 65*RAD;
                gun.position.y = -.0155;    
                gun.position.z = .07;     
                holder.add(gun); 
            }

            if (type[num] == "raygun") {
                var ringGeometry1 = new TorusGeometry( .015, .004, 16, 100 ); 
                var ringMaterial = new MeshBasicMaterial({color: color[num], transparent:true, opacity:.7}); 

                var ring1 = new Mesh(ringGeometry1, ringMaterial); 
                ring1.position.z = .036;
                ring1.scale.z = .7; 
                holder.add(ring1);

                var ringGeometry2 = new TorusGeometry( .018, .004, 16, 100 ); 

                var ring2 = new Mesh(ringGeometry2, ringMaterial); 
                ring2.position.z = .017;
                ring2.scale.z = .7; 
                holder.add(ring2);
            }

            if (type[num] == "sword") {
                var ringGeometry = new TorusGeometry( .015, .007, 16, 100 ); 
                var ringMaterial = new MeshBasicMaterial({color: color[num], transparent:true, opacity:.7}); 

                var ring = new Mesh(ringGeometry, ringMaterial); 
                ring.position.z = .003;
                ring.scale.z = .4; 
                holder.add(ring);
            }

            if (type[num] == "pen") {
                var coneGeometry = new ConeGeometry(.009, .02, 10); 
                var coneMaterial = new MeshBasicMaterial({color: white, transparent:true, opacity:.6}); 

                var cone = new Mesh(coneGeometry, coneMaterial); 
                cone.rotation.x = -90*RAD;
                cone.position.z = .01;
                holder.add(cone)                   

                handle.position.z += .02;

            }

        }

        var last = [];           
        controller.startEvent = controller.addEventListener("selectstart", function(e) {
            var hl = controller.userData.highlights;
            if (hl) {
                for(var i=0; i<hl.length; i++) {
                    last[i] = hl[i].color.getHex();
                    hl[i].color.set(highlightColor[num]);
                }
            }
            controller.userData.selecting = true;
            that.dispatchEvent("controller"+controller.userData.hand+"down");
            that.dispatchEvent("selectstart");
        });
        controller.endEvent = controller.addEventListener("selectend", function(e) {
            var hl = controller.userData.highlights;    
            if (hl) {           
                for(var i=0; i<hl.length; i++) {
                    hl[i].color.set(last[i]);
                }
            }
            controller.userData.selecting = false;
            that.dispatchEvent("controller"+controller.userData.hand+"up");
            that.dispatchEvent("selectend");
        });

        controller.moveEvent = controller.addEventListener('move', function(e) {
            that.dispatchEvent("controller"+controller.userData.hand+"move");
            that.dispatchEvent("move");
        });

        return controller;
    }

    this.dispose = function() {
        if (that.controller1) disposeController(that.controller1);
        if (that.controller2) disposeController(that.controller2);
        function disposeController(c) {
            c.removeEventListener('selectstart', c.startEvent);
            c.removeEventListener('selectend', c.endEvent);
            c.removeEventListener('move', c.moveEvent);
            if (c.grip) {				
                c.grip.traverse(function(obj) {obj.dispose?.()});
                scene.remove(c.grip);
            } 
            if (c.holder) {
                c.holder.traverse(function(obj) {obj.dispose?.()});
                scene.remove(c.holder);
            }
            scene.remove(c);
        }			
    }

}	
zim.extend(zim.XRControllers, createjs.EventDispatcher);

zim.XRMovement = function(three, XRControllers, speed, acceleration, rotationSpeed, rotationAcceleration, hapticMax, verticalStrafe, radiusMax, threshhold, directionFix, boxMax, rotationAngle, rotationInterval) {
    var sig = "three, XRControllers, speed, acceleration, rotationSpeed, rotationAcceleration, hapticMax, verticalStrafe, radiusMax, threshhold, directionFix, boxMax, rotationAngle, rotationInterval";
    var duo; if (duo = zob(zim.XRMovement, arguments, sig, this)) return duo;

    this.type = "XRMovement";

    if (zot(speed)) speed = 1;
    if (zot(rotationSpeed)) rotationSpeed = 1;
    if (zot(acceleration)) acceleration = .3;
    if (zot(rotationAcceleration)) rotationAcceleration = .2;
    if (zot(hapticMax)) hapticMax = 0;
    if (zot(verticalStrafe)) verticalStrafe = false;
    if (zot(radiusMax)) radiusMax = -1;
    if (zot(threshhold)) threshhold = .2;
    if (zot(directionFix)) directionFix = true;
    if (zot(rotationAngle)) rotationAngle = null;
    if (zot(rotationInterval)) rotationInterval = .5;

    var that = this;

    that.speed = speed;
    that.rotationSpeed = rotationSpeed;
    that.acceleration = acceleration;
    that.rotationAcceleration = rotationAcceleration;
    that.hapticMax = hapticMax;
    that.verticalStrafe = verticalStrafe;
    that.radiusMax = radiusMax;
    that.threshhold = threshhold;
    that.boxMax = boxMax;
    that.rotationAngle = rotationAngle;
    that.rotationInterval = rotationInterval;
    
    var renderer = three.renderer;
    var scene = three.scene;
    var camera = three.camera;
    var xrc = XRControllers;

    var speedFactor = [0.01, 0.01, 0.01, 0.01];
    var rotationFactor = .1;

    var dolly;
    var cameraVector = new Vector3(); 

    var dolly = this.dolly = new Group();
    dolly.userData.rotationY = 0;
    dolly.position.set(0, 0, 0);
    dolly.name = "dolly";
    scene.add(dolly);
    dolly.add(camera);
    if (xrc.controller1) dolly.add(xrc.controller1);
    if (xrc.controller2) dolly.add(xrc.controller2);
    if (xrc.controller1.grip) dolly.add(xrc.controller1.grip);
    if (xrc.controller2.grip) dolly.add(xrc.controller2.grip);

    if (directionFix) {
        var bG = new Mesh(new BoxGeometry(.01,.01,.01), new MeshBasicMaterial());
        camera.add(bG);
    }

    // split into events and movement and modified from
    // https://codepen.io/jason-buchheim/pen/zYqYGXM	

    var lastX = 0;
    var lastY = 0;
    var lastZ = 0;
    var rotationCheck = true;
    var rotationID;

    xrc.on("axes", function(e) { // THUMBSTICKS or TOUCHPAD

        var value = e.value;
        var i = e.num;

        if (Math.abs(value) > that.threshhold) {

            // // worked in R149 but was absolute in R155 
            // // so added a box to the camera and use that for R155	
            if (directionFix) { // R155
                bG.getWorldDirection(cameraVector);
            } else {
                var xrCamera = renderer.xr.getCamera(camera);
                xrCamera.getWorldDirection(cameraVector);
            }			
            var accel = ((e.hand == "left" && xrc.squeezeLeft) || (e.hand == "right" && xrc.squeezeRight));
            var amount = e.value / 11 * (accel?2:1);				

            if (i == 0 || i == 2) { // HORIZONTAL
                if (e.hand == "left") { // LEFT 	

                    // move side to side
                    // reverse the vectors 90 degrees so can do straffing side to side movement
                    speedFactor[i] >= that.speed ? (speedFactor[i] = that.speed) : (speedFactor[i] *= (1 + that.acceleration));				
                    dolly.position.x -= -cameraVector.z * speedFactor[i] * amount;
                    dolly.position.z += -cameraVector.x * speedFactor[i] * amount;
                    if (radiusMax >= 0 || that.boxMax) checkMax();
                    if (hapticMax > 0) that.doHaptic(value, "left", that.hapticMax);

                } else { // RIGHT		

                    if (that.rotationAngle != null) {
                        if (that.rotationAngle == 0) return;
                         if (rotationCheck && Math.abs(value) > .8)  {
                            var amount = -that.rotationAngle*zim.RAD*zim.sign(e.value);
                            dolly.rotateY(amount);
                            dolly.userData.rotationY += amount;								
                            rotationCheck = false;
                            if (rotationID) clearTimeout(rotationID);
                            rotationID = setTimeout(function(){rotationCheck=true;}, (accel?(that.rotationInterval*.66):that.rotationInterval)*1000);
                        }
                    } else {
                        rotationFactor >= that.rotationSpeed ? (rotationFactor = that.rotationSpeed) : (rotationFactor *= (1 + that.rotationAcceleration));
                        var rotationAmount = e.value * 1 * rotationFactor * (accel?1.5:1);
                        dolly.rotateY(-rotationAmount*zim.RAD);
                    }		

                }
            }

            if (i == 1 || i == 3) { // VERTICAL 

                speedFactor[i] >= that.speed ? (speedFactor[i] = that.speed) : (speedFactor[i] *= (1 + that.acceleration));				

                if (e.hand == "left") { // LEFT		

                    if (that.verticalStrafe) {
                        // strafe up and down
                        dolly.position.y -= speedFactor[i] * e.value;				
                    } else {
                        // move forward and backward (default)
                        dolly.position.x -= -cameraVector.x * speedFactor[i] * amount;
                        dolly.position.z -= -cameraVector.z * speedFactor[i] * amount;													
                    }	
                    if (that.radiusMax >= 0 || that.boxMax) checkMax();										
                    if (that.hapticMax > 0) that.doHaptic(value, "left", that.hapticMax);

                } else { // RIGHT				

                    dolly.position.x -= -cameraVector.x * speedFactor[i] * amount;
                    dolly.position.z -= -cameraVector.z * speedFactor[i] * amount;
                    if (that.radiusMax >= 0 || that.boxMax) checkMax();
                    if (that.hapticMax > 0) that.doHaptic(value, "right", that.hapticMax);	

                }
            }

        } else {		
            if ((i == 0 || i == 2) && e.hand == "right") rotationCheck = true;	
            speedFactor[i] = .01;
            rotationFactor = .1;
        }

        function checkMax() {	
            if (that.boxMax) {
                dolly.position.x = zim.constrain(dolly.position.x, that.boxMax[0], that.boxMax[1]);
                dolly.position.y = zim.constrain(dolly.position.y, that.boxMax[2], that.boxMax[3]);
                dolly.position.z = zim.constrain(dolly.position.z, that.boxMax[4], that.boxMax[5]);
                if (that.radiusMax >= 0 && dolly.position.length() > that.radiusMax) {
                    dolly.position.x = lastX;
                    dolly.position.y = lastY;
                    dolly.position.z = lastZ;
                } else {
                    lastX = dolly.position.x;
                    lastY = dolly.position.y;
                    lastZ = dolly.position.z;
                }
            } else if (dolly.position.length() > that.radiusMax) {
                dolly.position.x = lastX;
                dolly.position.y = lastY;
                dolly.position.z = lastZ;
            } else {
                lastX = dolly.position.x;
                lastY = dolly.position.y;
                lastZ = dolly.position.z;
            }
        } 

    });
    
    xrc.on("pressdown", function(e) {
        if (e.num==3 && e.hand=="left") {
            dolly.position.x = 0;
            dolly.position.y = 0;
            dolly.position.z = 0;
            dolly.rotation.y = 0;
        }
    });

    that.doHaptic = function(amount, hand, max) {
        var c = hand=="left"?that.controller1:that.controller2;
        if (
            c.gamepad.hapticActuators &&
            c.gamepad.hapticActuators[0]
        ) {
            c.gamepad.hapticActuators[0].pulse(
                Math.min(Math.abs(amount), max),
                100
            );
        }
        return that;
    }
}

zim.XRTeleport = function(three, XRControllers, XRMovement, floor, offsetHeight, button, hand, markerColor, markerBlend, markerRadius) {
    var sig = "three, XRControllers, XRMovement, floor, offsetHeight, button, hand, markerColor, markerBlend, markerRadius";
    var duo; if (duo = zob(zim.XRTeleport, arguments, sig, this)) return duo;

    this.type = "XRTeleport";

    // modified from
    // https://github.com/mrdoob/three.js/blob/dev/examples/webxr_vr_teleport.html

    if (zot(floor)) floor = [];
    if (!Array.isArray(floor)) floor = [floor]; 
    if (zot(XRControllers)) {if (zon) {zogy("ZIM XRTeleport - must have XRControllers")} return;}
    if (zot(offsetHeight)) offsetHeight = 0;
    if (zot(button)) button = (XRControllers.data && XRControllers.data.gamepad && XRControllers.data.gamepad.buttons.length > 4)?5:0; // forward button or trigger if simple setup
    if (!Array.isArray(button)) button = [button]; 
    if (zot(hand)) hand = "both";
    if (zot(markerColor)) markerColor = zim.silver;
    if (zot(markerBlend)) markerBlend = AdditiveBlending;
    if (zot(markerRadius)) markerRadius = .25;
    if (hand != "both" && hand != "left") hand = "right";

    var renderer = three.renderer;
    var scene = three.scene;
    var xrc = XRControllers;
    var xrm = XRMovement;

    var that = this;
    that.floor = floor;
    that.offsetHeight = offsetHeight;
    that.button = button;
    that.hand = hand;

    var INTERSECTION;
    var tempMatrix = new Matrix4();

    var marker = that.marker = new Mesh(
        new CircleGeometry(markerRadius, 32).rotateX(-Math.PI / 2),
        new MeshBasicMaterial({color:markerColor, blending:markerBlend})
    );
    marker.position.y = -offsetHeight;
    marker.userData.xrteleportignore = true;
    scene.add(marker);            

    var raycaster = that.raycaster = new Raycaster();

    if (!xrm) {
        var baseReferenceSpace;
        if (xrc.XR) getBase();
        else xrc.on("xrconnected", getBase);
        function getBase() {
            baseReferenceSpace = renderer.xr.getReferenceSpace();
        }
    }

    xrc.on("pressdown", function(e) {
        var goodButton = false;
        for (var i=0; i<button.length; i++) {
            if (e.num==button[i]) {
                goodButton = true;
                break;
            }
        }
        if ((that.hand=="both"||that.hand==e.hand) && goodButton) {
            e.controller.userData.xrteleport = true;
        }
    });

    xrc.on("pressup", function(e) {
        var goodButton = false;
        for (var i=0; i<button.length; i++) {
            if (e.num==button[i]) {
                goodButton = true;
                break;
            }
        }
        if ((that.hand=="both"||that.hand==e.hand) && goodButton) {
            e.controller.userData.xrteleport = false;
            if (INTERSECTION) {
                if (xrm) {
                    xrm.dolly.position.x = INTERSECTION.x;
                    xrm.dolly.position.y = INTERSECTION.y+that.offsetHeight;
                    xrm.dolly.position.z = INTERSECTION.z;
                } else {
                    var offsetPosition = {x: -INTERSECTION.x, y: -INTERSECTION.y, z: -INTERSECTION.z, w: 1};
                    var offsetRotation = new Quaternion();
                    var transform = new XRRigidTransform(offsetPosition, offsetRotation);
                    var teleportSpaceOffset = baseReferenceSpace.getOffsetReferenceSpace(transform);
                    renderer.xr.setReferenceSpace(teleportSpaceOffset);
                }
            }
        }			
    });
    
    three.teleportRender = function() {
        INTERSECTION = undefined;
        var c1s, c2s;
        if (hand=="left" || hand=="both") c1s = xrc.controller1&&xrc.controller1.userData.xrteleport;
        if (hand=="right" || hand=="both") c2s = xrc.controller2&&xrc.controller2.userData.xrteleport;
        var controller = c1s?XRControllers.controller1:c2s?XRControllers.controller2:null;            
        if (controller) {
            tempMatrix.identity().extractRotation(controller.matrixWorld);
            raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
            raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
            var intersects = raycaster.intersectObjects(scene.children);
            for (var i=0; i<intersects.length; i++) {
                var obj = intersects[i].object;
                if (obj.userData.xrteleportignore) continue;
                var okay = false;
                for (var f=0; f<floor.length; f++) {
                    if (obj == floor[f]) {
                        okay = true;
                        break;
                    }
                }
                if (!okay) break; // hitting something else
                INTERSECTION = intersects[i].point;
            }
        }            
        if (INTERSECTION) {
            marker.position.x = INTERSECTION.x;
            marker.position.y = INTERSECTION.y + .01;
            marker.position.z = INTERSECTION.z;
        }
        marker.visible = INTERSECTION !== undefined;
    }        
}

export const Three = zim.Three;
export const XRControllers = zim.XRControllers;
export const XRMovement = zim.XRMovement;
export const XRTeleport = zim.XRTeleport;
