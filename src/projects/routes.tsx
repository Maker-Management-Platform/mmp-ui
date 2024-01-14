import { ProjectPage } from "./components/project-page/ProjectPage.tsx";
import { ProjectsPage } from "./components/projects-page/ProjectsPage.tsx";
import { CreateProject } from "./components/projects-page/parts/create-project/CreateProject.tsx";
import { ImportProject } from "./components/projects-page/parts/import-project/ImportProject.tsx";

export const routes = [
    {
        path: '',
        children: [
            {
                path: '',
                index: true,
                element: <ProjectsPage />,
            },
            {
                path: 'new',
                element: <CreateProject />
            },
            {
                path: 'import',
                element: <ImportProject />
            },
            {
                path: ':id',
                element: <ProjectPage />
            }
        ]
    }
]