import {ProjectPage3} from "./components/project-page3/ProjectPage3.tsx";
import {ProjectsPage} from "./components/projects-page/ProjectsPage.tsx";

export const routes = [
    {
        path: '',
        index: true,
        element: <ProjectsPage/>
    },
    {
        path: ':id',
        element: <ProjectPage3/>
    }
]