import {Overlay, Pill, Text, Title} from '@mantine/core';
import classes from './ProjectHeader.module.css';

type ProjectHeaderProps = {
    name: string
    description: string
    imagePath: string
    tags: string[]
}

export function ProjectHeader({name, description, imagePath, tags}: ProjectHeaderProps) {

    return (
        <div
            className={classes.wrapper}
            style={{backgroundImage: `url(${imagePath})`}}
        >
            <Overlay color="#000" opacity={0.65} zIndex={1}/>

            <div className={classes.inner}>
                <Title className={classes.title}>
                    {name}
                </Title>

                <Text size="lg" className={classes.description}>
                    {description}
                </Text>

                <div className={classes.tags}>
                    {tags?.map((tag, i) =>
                        <Pill key={i} size="xl" mx={2}>{tag}</Pill>
                    )}
                </div>
            </div>
        </div>
    );
}