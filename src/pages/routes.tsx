import { routerType } from '@/types/router.types'
import Home from '@/pages/Home'


const routes: routerType[] = [
    {
        path: '',
        element: <Home />,
        title: 'home',
    },
]

export default routes
