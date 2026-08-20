import { useCallback, useState } from "react"

function useBuyerPreferences() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [propertyType, setPropertyType] = useState("")
  const [bhk, setBhk] = useState("")

  const [location, setLocation] = useState("")

  const [minBudget, setMinBudget] = useState("")
  const [maxBudget, setMaxBudget] = useState("")

  const [selectedAmenities, setSelectedAmenities] = useState([])

  const [furnishing, setFurnishing] = useState("")
  const [petFriendly, setPetFriendly] = useState("")
  const [metro, setMetro] = useState("")
  const [safety, setSafety] = useState("")


  const handleAmenityChange = useCallback((amenity) => {

    setSelectedAmenities((previousAmenities) => {

      if (previousAmenities.includes(amenity)) {

        return previousAmenities.filter(
          (item) => item !== amenity
        )

      }

      return [
        ...previousAmenities,
        amenity
      ]

    })

  }, [])


  const resetPreferences = useCallback(() => {

    setName("")
    setEmail("")
    setPropertyType("")
    setBhk("")
    setLocation("")
    setMinBudget("")
    setMaxBudget("")
    setSelectedAmenities([])
    setFurnishing("")
    setPetFriendly("")
    setMetro("")
    setSafety("")

  }, [])


  return {

    name,
    setName,

    email,
    setEmail,

    propertyType,
    setPropertyType,

    bhk,
    setBhk,

    location,
    setLocation,

    minBudget,
    setMinBudget,

    maxBudget,
    setMaxBudget,

    selectedAmenities,
    handleAmenityChange,

    furnishing,
    setFurnishing,

    petFriendly,
    setPetFriendly,

    metro,
    setMetro,

    safety,
    setSafety,

    resetPreferences,

  }
}

export default useBuyerPreferences