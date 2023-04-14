const OTF = (data: Record<string, any>) => {
    const formData = new FormData()
    const recurse = (obj: Record<string, any>, prevKey?: string) => {
        for (const [key, value] of Object.entries(obj)) {
            const newKey = prevKey ? `${prevKey}[${key}]` : key
            if (value instanceof File) {
                formData.append(newKey, value)
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (item instanceof File) {
                        formData.append(`${newKey}[${index}]`, item)
                    } else if (typeof item === "object" && item !== null) {
                        recurse(item, `${newKey}[${index}]`)
                    }
                })
            } else if (typeof value === "object" && value !== null) {
                recurse(value, newKey)
            } else {
                formData.append(newKey, value)
            }
        }
    }
    recurse(data)
    return formData
}

export { OTF }