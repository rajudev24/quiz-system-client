import { authKey } from "@/constants/storageKeys"
import { decodedToken } from "@/utils/jwt"
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-store"

export const storeUserInfo = (accessToken) => {
    return setToLocalStorage(authKey, accessToken)
}

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey)
    if (authToken) {
        const decodedData = decodedToken(authToken)
        return decodedData
    } else {
        return ''
    }
}

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey)
    return !!authToken
}

export const removeUserInfo = (key) => {
    return localStorage.removeItem(key)
}