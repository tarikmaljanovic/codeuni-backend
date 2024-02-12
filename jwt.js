import Jwt  from "jsonwebtoken";

const secret = 'wO4k7kzoHP'

export const generateToken = (payload) => {
    return Jwt.sign(payload, secret, {expiresIn: '3h'})
}

export const verifyToken = (token) => {
    try {
        return Jwt.verify(token, secret)
    } catch {
        return null
    }
}