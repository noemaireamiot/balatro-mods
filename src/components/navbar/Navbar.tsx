import netlifyIdentity from 'netlify-identity-widget'
import { Button } from '../Button/Button'

const Navbar = () => {
    return (
        <nav className="flex justify-end m-4">
            {netlifyIdentity.currentUser() ? (
                <p>
                    <Button
                        onClick={() => {
                            netlifyIdentity.logout()
                            netlifyIdentity.on('logout', () => {
                                window.location.href = '/'
                            })
                        }}
                        size="small"
                        background="red"
                        label="Sign out"
                    />
                </p>
            ) : (
                <Button
                    onClick={() => {
                        netlifyIdentity.open()
                        netlifyIdentity.on('login', () => {
                            netlifyIdentity.close()
                            window.location.reload()
                        })
                    }}
                    size="small"
                    background="green"
                    label="Log in"
                />
            )}
        </nav>
    )
}

export default Navbar
