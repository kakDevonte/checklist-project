import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export const useAuth = (pageRole) => {
    const navigate = useNavigate()
    const { isAuth, role } = useSelector(state => state.auth)
    const [isLogin, setLogin] = useState(false)

    useEffect(
        () => {
            if (isAuth && role === pageRole) {
                setLogin(true)

            } else {
                setLogin(false)
                navigate('/login')
            }
        },
        [isAuth, navigate]
    )
    return isLogin
}
