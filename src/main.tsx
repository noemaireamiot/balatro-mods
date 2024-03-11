import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import netlifyIdentity from 'netlify-identity-widget'

// Need to declare netlifyIdentity otherwise tsc crash at build
declare global {
    interface Window {
        netlifyIdentity: any
    }
}

window.netlifyIdentity = netlifyIdentity
// You must run this once before trying to interact with the widget
netlifyIdentity.init()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
