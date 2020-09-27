import { Home } from './pages/Home.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx'
import { GraphDetails } from './pages/GraphDetails.jsx'

export default [
    {
        path: '/board/:boardId',
        component: BoardDetails
    },
    {
        path: '/graph/:boardId',
        component: GraphDetails
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
