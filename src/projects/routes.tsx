import { ProjectPage } from "./components/project-page/ProjectPage.tsx";
import { ProjectsPage } from "./components/projects-page/ProjectsPage.tsx";
import { CreateProject } from "./components/projects-page/parts/create-project/CreateProject.tsx";
import { ImportProject } from "./components/projects-page/parts/import-project/ImportProject.tsx";
import { ProjectsList } from "./components/projects-page/parts/projects-list/ProjectsList.tsx";

export const routes = [
    {
        path: '',
        element: <ProjectsPage />,
        children: [
            {
                path: '',
                index: true,
                element: <ProjectsList />,
            },
            {
                path: 'list',
                element: <ProjectsList />,
            },
            {
                path: 'import',
                element: <ImportProject />,
            },
            {
                path: 'new',
                element: <CreateProject />,
            },
        ]
    },
    {
        path: ':id',
        element: <ProjectPage />
    }
]