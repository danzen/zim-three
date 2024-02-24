
import { Frame, TextureActive, TextureActives } from "zimjs"
import THREE from "three"

declare namespace zim {

    export class Three {
        constructor(config_or_width?: number, height?: number, color?: string, cameraPosition?: THREE.Vector3, cameraLook?: THREE.Vector3, interactive?: boolean, resize?: boolean, frame?: Frame, ortho?: boolean, textureActive?: boolean, colorSpace?: string, colorManagement?: boolean, legacyLights?: boolean, throttle?: boolean, lay?: string, full?: boolean, xr?: boolean, VRButton?: boolean|HTMLAnchorElement, xrBufferScale?: number);
        constructor(config: {width?: number, height?: number, color?: string, cameraPosition?: THREE.Vector3, cameraLook?: THREE.Vector3, interactive?: boolean, resize?: boolean, frame?: Frame, ortho?: boolean, textureActive?: boolean, colorSpace?: string, colorManagement?: boolean, legacyLights?: boolean, throttle?: boolean, lay?: string, full?: boolean, xr?: boolean, VRButton?: boolean|HTMLAnchorElement, xrBufferScale?: number});
        
        position(x?: number, y?: number):this
        scale(s?: number):VRButton
        rotateAroundAxis(obj: THREE.Mesh, axis?: THREE.Vector3, radians?: boolean):this
        rotateAroundObjectAxis(obj: THREE.Mesh, axis?: THREE.Vector3, radians?: boolean):this
        makePanel(textureActive: TextureActive|[TextureActive], textureActives: TextureActives, scale?: number, curve?: number, opacity?: number, material?: string, doubleSide?: boolean, colorSpace?: string):THREE.Mesh
        flipMaterial(materialType:THREE.Material, params?:{}):this
        curvePlane(geometry: THREE.PlaneGeometry, z?: number):this
        dispose():void

        readonly renderer:THREE.WebGLRenderer
        preRender:Function
        postRender:Function
        readonly canvas:HTMLCanvasElement
        readonly DOMElement:createjs.DOMElement
        readonly scene:THREE.Scene
        readonly sceneOrtho:THREE.Scene
        readonly camera:THREE.PerspectiveCamera
        readonly cameraOrtho:THREE.OrthographicCamera
        readonly resizeEvent:any
        readonly vrButton:string
    }

    export class XRControllers extends createjs.EventDispatcher {
        constructor(config_or_three?:Three, type?: string, color?: string, highlightColor?: string, lineColor?: string, lineLength?: number, threshhold?: number)
        constructor(config: {three?:Three, type?: string, color?: string, highlightColor?: string, lineColor?: string, lineLength?: number, threshhold?: number})
        dispose():void 
        readonly type:string
        readonly XR:boolean
        readonly controller1:THREE.Group
        readonly controller2:THREE.Group
        threshhold:number
    }

    export class XRMovement {
        constructor(config_or_three?:Three, XRControllers?: XRControllers, speed?: number, acceleration?: number, rotationSpeed?: number, rotationAcceleration?: number, hapticMax?: number, verticalStrafe?: boolean, radiusMax?: number, threshhold?: number, directionFix?: boolean, boxMax?: number, rotationAngle?: number, rotationInterval?: number)
        constructor(config: {three?:Three, XRControllers?: XRControllers, speed?: number, acceleration?: number, rotationSpeed?: number, rotationAcceleration?: number, hapticMax?: number, verticalStrafe?: boolean, radiusMax?: number, threshhold?: number, directionFix?: boolean, boxMax?: number, rotationAngle?: number, rotationInterval?: number})
        doHaptic():this
        dispose():void
        readonly type:string
        readonly dolly:THREE.Group
        speed:number
        acceleration:number
        rotationSpeed:number
        rotationAcceleration:number
        hapticMax:number
        verticalStrafe:boolean
        radiusMax:number
        threshhold:number
    }

    export class XRTeleport {
        constructor(config_or_three?:Three, XRControllers?: XRControllers, XRMovement?: number, floor?: THREE.Mesh|[THREE.Mesh], offsetHeight?: number, button?: number|[number], hand?: string, markerColor?: string, markerBlend?: string, markerRadius?: number)
        constructor(config: {three?:Three, XRControllers?: XRControllers, XRMovement?: number, floor?: THREE.Mesh|[THREE.Mesh], offsetHeight?: number, button?: number|[number], hand?: string, markerColor?: string, markerBlend?: string, markerRadius?: number})
        dispose():void
        readonly type:string
        floor:THREE.Mesh|[THREE.Mesh]
        button:number|[number]
        hand:string
        readonly marker:THREE.Mesh
    }

}

// // trying to augment three.js typings adding pos() to a mesh. Sorry... can't seem to make it work

// declare namespace THREE {
//     export class Mesh<
//         TGeometry extends BufferGeometry = THREE.BufferGeometry,
//         TMaterial extends THREE.Material | THREE.Material[] = THREE.Material | THREE.Material[],
//         TEventMap extends Object3DEventMap = THREE.Object3DEventMap,
//     > extends THREE.Object3D<TEventMap> {
//         pos(x?: number, y?: number, horizontal?: string, vertical?: string, gutter?: number):void
//     }
// }

export = zim
