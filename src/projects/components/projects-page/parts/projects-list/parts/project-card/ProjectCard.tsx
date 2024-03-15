import { Card, Text, Group, rem } from '@mantine/core';
import classes from './ProjectCard.module.css';
import { Project } from "@/projects/entities/Project.ts";
import { Link } from "react-router-dom";
import { SettingsContext } from '@/core/settings/settingsContext';
import { useContext } from 'react';

type ProjectCardProps = {
    project: Project,
}

export function ProjectCard({ project }: ProjectCardProps) {
    const { settings } = useContext(SettingsContext);

    const size = rem('280px');
    return (
        <Card style={{ height: size, minHeight: size, minWidth: size, width: size }}
            p="lg"
            shadow="lg"
            className={classes.card}
            radius="md"
            component={Link}
            to={`/projects/${project.uuid}`}
        >
            {project.default_image_id &&
                <div
                    className={classes.image}
                    style={{
                        backgroundImage: `url(${settings.localBackend}/projects/${project.uuid}/assets/${project.default_image_id}/file)`,
                        backgroundPosition: 'center',
                    }}
                />}
            {!project.default_image_id &&
                <div
                    className={classes.image}
                    style={{
                        backgroundImage: `url(https://picsum.photos/seed/${project.uuid}/280)`,
                        backgroundPosition: 'center',
                    }}
                />}
            <div className={classes.overlay} />

            <div className={classes.content}>
                <div>

                    <Group justify="space-between" gap="xs">
                        <Text size="sm" className={classes.author}>
                            {project.name}
                        </Text>

                        {/*<Group gap="lg">
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
                        </Group>*/}
                    </Group>
                </div>
            </div>
        </Card>
    );
}