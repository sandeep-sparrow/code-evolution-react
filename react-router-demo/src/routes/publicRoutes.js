import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Home } from "../components/Home";

const publicRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/contact',
        element: <Contact />
    }
];

export default publicRoutes;