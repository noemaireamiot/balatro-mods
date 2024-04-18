import { routerInterface } from '@/types/router.types'
import Home from '@/pages/Home'

const routes: routerInterface[] = [
    {
        path: '',
        element: <Home />,
        title: 'home',
    },
]

export default routes
