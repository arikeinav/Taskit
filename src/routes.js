import { Home } from './pages/Home.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx'

export default [
    {
        path: '/board/:boardId',
        component: BoardDetails
    },
    {
        path: '/board',
        component: BoardApp
    },
    {
        path: '/',
        component: Home
    }
]
