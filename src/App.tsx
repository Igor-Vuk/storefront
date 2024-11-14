import { Suspense, useEffect, useState, lazy } from "react"
import { useGLTF, useTexture, useEnvironment } from "@react-three/drei"
import * as THREE from "three"
import { Leva } from "leva"
import assetsPath from "./data/assetsPath.json"

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"

/* Mapbox imports */
import { Canvas } from "@react-three/fiber"

import Fallback from "./contentComponents/canvasComponents/fallback/Fallback.tsx" /* use Fallback component on Suspense if needed */
import { CanvasControl, SceneRenderControl } from "./helpers/leva.ts"
import DirectionalLight from "./sceneComponents/DirectionalLight.tsx"
import SoftShadowsModifier from "./sceneComponents/SoftShadowsModifier.tsx"
import AxesHelper from "./sceneComponents/AxesHelper.tsx"
import PerformanceMonitor from "./sceneComponents/PerformanceMonitor.tsx"
import GridHelper from "./sceneComponents/GridHelper.tsx"

import Home from "./contentComponents/regularComponents/Home/Home"
import Cart from "./contentComponents/regularComponents/Cart/Cart"
import Layout from "./contentComponents/regularComponents/Layout/Layout"

/* By lazy loading we are separating bundles that load to the browser */
const EnvironmentMap = lazy(
  () => import("./sceneComponents/EnvironmentMap.tsx"),
)
const Models = lazy(
  () => import("./contentComponents/canvasComponents/Models.tsx"),
)

/* ------------------- Preload ------------------------------- */
useEnvironment.preload({ files: assetsPath.environmentMapFiles })
useGLTF.preload(assetsPath.cityModel)
useTexture.preload(assetsPath.modelsAssetsTexture)
useTexture.preload(assetsPath.modelsTerrainTexture)
/* ----------------------------------------------------------- */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="košarica" element={<Cart />} />
    </Route>,
  ),
)

export default function App() {
  // const sceneRender = SceneRenderControl()
  // const canvas = CanvasControl()
  // const [showLeva, setShowLeva] = useState<boolean>(true) //  show or hide leva on first load

  // useEffect(() => {
  //   /*  add event listener to show or hide leva when "h" button is pressed */
  //   const handleLeva = (event: KeyboardEvent) => {
  //     if (event.key === "h") {
  //       setShowLeva((showLeva) => !showLeva)
  //     }
  //   }
  //   window.addEventListener("keydown", handleLeva)
  //   return () => {
  //     window.removeEventListener("keydown", handleLeva)
  //   }
  // }, [])

  // const {
  //   performance_monitor,
  //   directional_lights,
  //   soft_shadows,
  //   axes_helper,
  //   grid_helper,
  //   environment_map,
  // } = sceneRender.values

  // const { toneMapping, colorSpace, toneMappingExposure } = canvas.values

  return (
    <RouterProvider router={router} />
    // <>
    //   <Leva collapsed hidden={showLeva} />

    //   {/* Canvas is imported from react-three-map, not @react-three/fiber. Because the scene now lives in a map,
    //     we leave a lot of the render and camera control to the map, rather than to R3F, so the following <Canvas>
    //     props are ignored: gl, camera, resize, orthographic, dpr. This is why toneMapping, outputColorSpace and exposure
    //     will not be updated using leva but will still work on first render*/}

    //   <Canvas
    //     shadows
    //     gl={{
    //       toneMapping: THREE[toneMapping],
    //       outputColorSpace: THREE[colorSpace],
    //       toneMappingExposure: toneMappingExposure, // default is 1.0. It doesn't work with "NoToneMapping"
    //     }}
    //   >
    //     {performance_monitor && <PerformanceMonitor />}
    //     {directional_lights && <DirectionalLight />}
    //     {soft_shadows && <SoftShadowsModifier />}
    //     {axes_helper && <AxesHelper />}
    //     {grid_helper && <GridHelper />}
    //     {environment_map && (
    //       <Suspense fallback={null}>
    //         <EnvironmentMap />
    //       </Suspense>
    //     )}
    //     <Suspense fallback={<Fallback />}>{/* <Models /> */}</Suspense>
    //   </Canvas>
    // </>
  )
}
