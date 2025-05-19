import ReactDOM  from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { AddProduct } from './pages/AddProduct.jsx';
import { ListProduct } from './pages/ListProduct.jsx';
import Orders from './pages/Orders.jsx';


const router = createBrowserRouter([
  {
    path: "/admin/",
    element: <App />,
    children: [
      { path: "add", element: <AddProduct /> },
      { path: "list", element: <ListProduct /> },
      { path: "orders", element: <Orders /> },
    ],
  },  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)


