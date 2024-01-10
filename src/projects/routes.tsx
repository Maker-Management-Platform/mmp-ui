import {ProjectPage} from "./components/project-page/ProjectPage.tsx";
import {ProjectsPage} from "./components/projects-page/ProjectsPage.tsx";

export const routes = [
    {
        path: '',
        index: true,
        element: <ProjectsPage/>
    },
    {
        path: ':id',
        element: <ProjectPage/>
    }
]