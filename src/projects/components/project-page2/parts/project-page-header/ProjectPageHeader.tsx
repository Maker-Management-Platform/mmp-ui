import {Overlay, Pill, Text, Title} from '@mantine/core';
import classes from './ProjectPageHeader.module.css';
import {Project} from "../../../../entities/Project.ts";
import {baseURL} from "../../../../../core/config.ts";

type ProjectPageHeaderProps = {
    project?: Project
}

export function ProjectPageHeader({project}: ProjectPageHeaderProps) {
    if (project) {
        project.tags = ['qwe', 'weee', 'sooo cool']
        project.description = 'This is a cool project';
    }
    return (
        <div
            className={classes.wrapper}
            style={{backgroundImage: `url(${baseURL}/projects/${project?.uuid}/assets/${project?.default_image_path})`}}
        >
            <Overlay color="#000" opacity={0.65} zIndex={1}/>

            <div className={classes.inner}>
                <Title className={classes.title}>
                    {project?.name}
                </Title>

                <Text size="lg" className={classes.description}>
                    {project?.description}
                </Text>

                <div className={classes.tags}>
                    {project?.tags?.map((tag) =>
                        <Pill size="xl" mx={2}>{tag}</Pill>
                    )}
                </div>
            </div>
        </div>
    );
}