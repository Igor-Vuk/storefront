import { useGLTF, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { Suspense, useMemo } from "react"
import BuildingsModels from "./BuildingsModels/BuildingsModels.tsx"
import CityText from "./CityText/CityText.tsx"
import assetsPath from "../../data/assetsPath.json"
import useGroupedMeshes from "../../customHooks/useGroupedMeshes.ts"

const Models = () => {
  /* -----------------------------Files------------------------------- */
  const cityModelsFile = useGLTF(assetsPath.cityModel)
  const modelsAssetsTexture = useTexture(assetsPath.modelsAssetsTexture)
  const modelsTerrainTexture = useTexture(assetsPath.modelsTerrainTexture)

  /* ----------------------Adjust texture--------------------- */
  const adjustTexture = (textures: THREE.Texture[], setName: string) => {
    textures.forEach((texture, index) => {
      /* we need to flip textures in order to align them */
      texture.flipY = false

      /* Set the appropriate colorSpace based on the texture type. Textures come in the same order
        as we send them to useTexture. Remember that no color Textures(normal maps, roughness, ao...) 
        should use NoColorSpace and most .hdr/.exr LinearSRGBColorSpace */
      if (
        setName === "modelsAssetsTexture" ||
        setName === "modelsTerrainTexture"
      ) {
        switch (index) {
          case 0:
            texture.colorSpace = THREE.SRGBColorSpace // assign color space
            texture.name = "diffuseTexture" // give name
            break
          case 1:
            texture.colorSpace = THREE.NoColorSpace
            texture.name = "roughnessTexture"
            break
          case 2:
            texture.colorSpace = THREE.NoColorSpace
            texture.name = "normalTexture"
            break
          case 3:
            texture.colorSpace = THREE.NoColorSpace
            texture.name = "aoTexture"
            break
          default:
            break
        }
      }
    })
  }

  /* --------------------------------------------------------------------------------- */
  /* call adjustTexture, pass second property so we can use different switch statement if needed latter */

  const adjustedModelsTerrainTexture = useMemo(() => {
    if (modelsTerrainTexture) {
      adjustTexture(modelsTerrainTexture, "modelsTerrainTexture")
    }
    return modelsTerrainTexture
  }, [modelsTerrainTexture])

  // Use the custom hook to get grouped meshes
  const groupedMeshes = useGroupedMeshes(cityModelsFile.scene)

  /* Toggling the visible property is generally more efficient than 
  unmounting and remounting components. Using visible keeps all WebGL 
  resources (like geometries, materials, and textures) intact. 
  There's no need to dispose of or recreate them */
  return (
    <>
      <group>
        <BuildingsModels groupedMeshes={groupedMeshes} />
        <Suspense fallback={null}>
          <CityText />
        </Suspense>
      </group>
    </>
  )
}

export default Models
