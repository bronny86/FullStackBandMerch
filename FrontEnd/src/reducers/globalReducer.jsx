import { createContext } from "react"

export const GlobalContext = createContext(null)

function globalReducer(state, action) {
    switch(action.type) {
        case 'setToken': {
            localStorage.setItem("token", action.data)
            return {
                ...state,
                token: action.data
            }
        }
        case 'setUser': {
            localStorage.setItem("user", action.data)
            return {
                ...state,
                user: action.data
            }
        }
        default:
            return state
    }
}

export default globalReducer