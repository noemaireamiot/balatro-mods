import { BrowserRouter } from 'react-router-dom'
import '@/App.scss'
import Router from '@/pages/router'
// import Navbar from '@/components/navbar/Navbar'
// import Footer from '@/components/footer/Footer'

const App = () => {
    return (
        <BrowserRouter>
            {/* <Navbar /> */}
            <Router />
            {/* <Footer /> */}
        </BrowserRouter>
    )
}

export default App
