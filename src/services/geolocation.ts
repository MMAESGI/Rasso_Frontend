async function reverseGeocode(lat: number, lon: number) {
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`
  )
  return await response.json()
}


// Debounce utility function for promises
function debounce<T extends (...args: any[]) => Promise<any>>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout>
  return ((...args: Parameters<T>) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args)
          resolve(result)
        } catch (error) {
          reject(error instanceof Error ? error : new Error(String(error)))
        }
      }, delay)
    })
  }) as T
}

async function searchLocations(query: string) {
  if (!query || query.length < 3) return []

  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`
  )
  return await response.json()
}

// Debounced version of searchLocations
const debouncedSearchLocations = debounce(searchLocations, 500)

export { reverseGeocode, searchLocations, debouncedSearchLocations }
