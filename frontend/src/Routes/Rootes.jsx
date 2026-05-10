
import AdminProducts from "../pages/admin/books"
import AdminRoot from "../pages/admin/books/AdminRoot"
import UserRoot from "../pages/user/books/userRoot"
import Home from "../pages/user/home/home"
import Dashboard from "../pages/admin/dashboard"
import Basket from "../pages/user/basket"
import Favorites from "../pages/user/favorites"
import AddProduct from "../pages/admin/AddBook"
import Books from "../pages/user/books"
import Details from "../pages/user/details"
import Reader from "../pages/user/reader"

const Routes = [
    {
        path: "/",
        element: <UserRoot />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "books",
                element: <Books />,
            },
            {
                path: "/books/:id",
                element: <Details />,
            },
            {
                path: "books/:id/read",
                element: <Reader />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "basket",
                element: <Basket />,
            },
            {
                path: "favorites",
                element: <Favorites />,
            }
        ]
    }
    ,
    {
        path: "/admin",
        element: <AdminRoot />,
        children: [
            {
                path: "products",
                element: <AdminProducts />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "addProduct",
                element: <AddProduct />,
            }
        ]
    }
]
export default Routes