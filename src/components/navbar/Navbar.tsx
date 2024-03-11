import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import netlifyIdentity from 'netlify-identity-widget'
import { useState } from 'react'
import { Button } from '../Button/Button'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [redirectToReferrer, setRedirectToReferrer] = useState<boolean>(false)

    const netlifyAuth = {
        isAuthenticated: false,
        user: null,
        authenticate(callback: (user: any) => void) {
            this.isAuthenticated = true
            netlifyIdentity.open()
            netlifyIdentity.on('login', (user) => {
                localStorage.setItem('user', JSON.stringify(user))
                callback(user)
            })
        },
        signout(callback: () => void) {
            this.isAuthenticated = false
            netlifyIdentity.logout()
            netlifyIdentity.on('logout', () => {
                this.user = null
                callback()
            })
        },
    }

    const login = () => {
        netlifyAuth.authenticate(() => {
            setRedirectToReferrer(true)
        })
    }

    const { from } = location.state || { from: { pathname: '/' } }

    if (redirectToReferrer) return <Navigate to={from} replace={true} />

    return (
        <nav className="flex justify-end m-4">
            {netlifyAuth.isAuthenticated ? (
                <p>
                    Welcome !{' '}
                    <Button
                        onClick={() => {
                            netlifyAuth.signout(() => navigate('/'))
                        }}
                        size="small"
                        background="red"
                        label="Sign out"
                    />
                </p>
            ) : (
                <Button
                    onClick={login}
                    size="small"
                    background="green"
                    label="Log in"
                />
            )}
        </nav>
    )
}

export default Navbar
