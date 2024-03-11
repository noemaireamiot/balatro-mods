import { Route, Routes } from 'react-router-dom'
import { routerType } from '@/types/router.types'
import routes from '@/pages/routes'

const Router = () => {
    return (
        <Routes>
            {routes.map(({ path, title, element }: routerType) => {
                return <Route key={title} path={`/${path}`} element={element} />
            })}
        </Routes>
    )
}

export default Router
