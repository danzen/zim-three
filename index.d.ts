
import { Frame, TextureActive, TextureActives } from "zimjs"
import * as THREE from "three"

declare namespace zim {

    export class Three {
        constructor(config_or_width?: number, height?: number, color?: string, cameraPosition?: THREE.Vector3, cameraLook?: THREE.Vector3, interactive?: boolean, resize?: boolean, frame?: Frame, ortho?: boolean, textureActive?: boolean, colorSpace?: string, colorManagement?: boolean, legacyLights?: boolean, throttle?: boolean, lay?: string, full?: boolean, xr?: boolean, VRButton?: boolean|HTMLAnchorElement, xrBufferScale?: number);
        constructor(config: {width?: number, height?: number, color?: string, cameraPosition?: THREE.Vector3, cameraLook?: THREE.Vector3, interactive?: boolean, resize?: boolean, frame?: Frame, ortho?: boolean, textureActive?: boolean, colorSpace?: string, colorManagement?: boolean, legacyLights?: boolean, throttle?: boolean, lay?: string, full?: boolean, xr?: boolean, VRButton?: boolean|HTMLAnchorElement, xrBufferScale?: number});
        
        position(x?: number, y?: number):this
        scale(s?: number):this
        rotateAroundAxis(obj: THREE.Mesh, axis?: THREE.Vector3, radians?: boolean):this
        rotateAroundObjectAxis(obj: THREE.Mesh, axis?: THREE.Vector3, radians?: boolean):this
        makePanel(config_or_textureActive: TextureActive|[TextureActive], textureActives: TextureActives, scale?: number, curve?: number, opacity?: number, material?: THREE.Material, doubleSide?: boolean, colorSpace?: string):THREE.Mesh
        makePanel(config: {textureActive: TextureActive|[TextureActive], textureActives: TextureActives, scale?: number, curve?: number, opacity?: number, material?: THREE.Material, doubleSide?: boolean, colorSpace?: string}):THREE.Mesh
        posMesh(mesh:THREE.Mesh, x?: number, y?: number, horizontal?: string, vertical?: string, gutter?: number):this
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

export = zim
