import {ProjectsList} from "./components/project-list/ProjectList.tsx";
import {ProjectPage2} from "./components/project-page2/ProjectPage2.tsx";

export const routes = [
    {
        path: '',
        element: <ProjectsList/>
    },
    {
        path: ':id',
        element: <ProjectPage2/>
    }
]