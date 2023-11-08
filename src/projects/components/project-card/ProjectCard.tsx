import {Card, Text, Center, useMantineTheme, Group, rem} from '@mantine/core';
import {IconEye, IconMessageCircle} from '@tabler/icons-react';
import classes from './ProjectCard.module.css';
import {baseURL} from "../../../core/config.ts";
import {Project} from "../../entities/Project.ts";
import {Link} from "react-router-dom";

type ProjectCardProps = {
    project: Project,
}

export function ProjectCard({project}: ProjectCardProps) {
    const theme = useMantineTheme();

    const size = rem('280px');
    return (
        <Card style={{height: size, minHeight: size, minWidth: size, width: size}}
              p="lg"
              shadow="lg"
              className={classes.card}
              radius="md"
              component={Link}
              to={`/projects/${project.uuid}`}
        >
            <div
                className={classes.image}
                style={{
                    backgroundImage: `url(${baseURL}/projects/${project.uuid}/assets/${project.default_image_path})`,
                    backgroundPosition: 'center',
                }}
            />
            <div className={classes.overlay}/>

            <div className={classes.content}>
                <div>

                    <Group justify="space-between" gap="xs">
                        <Text size="sm" className={classes.author}>
                            {project.name}
                        </Text>

                        <Group gap="lg">
                            <Center>
                                <IconEye
                                    style={{width: rem(16), height: rem(16)}}
                                    stroke={1.5}
                                    color={theme.colors.dark[2]}
                                />
                                <Text size="sm" className={classes.bodyText}>
                                    7847
                                </Text>
                            </Center>
                            <Center>
                                <IconMessageCircle
                                    style={{width: rem(16), height: rem(16)}}
                                    stroke={1.5}
                                    color={theme.colors.dark[2]}
                                />
                                <Text size="sm" className={classes.bodyText}>
                                    5
                                </Text>
                            </Center>
                        </Group>
                    </Group>
                </div>
            </div>
        </Card>
    );
}