const { jwtDecode } = require("jwt-decode")

export const decodedToken = (toekn) => {
    return jwtDecode(toekn)
}