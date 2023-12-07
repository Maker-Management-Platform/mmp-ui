import {Badge, Overlay, Text, Title, TypographyStylesProvider, useMantineTheme} from '@mantine/core';
import classes from './ProjectHeader.module.css';
import {stringToNumber} from "@/core/utils/color.ts";

type ProjectHeaderProps = {
    name: string
    description: string
    imagePath: string
    tags: string[]
}

export function ProjectHeader({name, description, imagePath, tags}: ProjectHeaderProps) {
    const theme = useMantineTheme();
    const tagWrap = tags?.map((tag, i) =>
        i < 10 ?
            <Badge color={theme.colors.blue[stringToNumber(tag, 10)]} key={i} size="xl" mx={2}>{tag}</Badge> : null)
    if (tags && tags.length > 10) {
        tagWrap.push(<Badge color={theme.colors.blue[stringToNumber(`${tags.length - 10}`, 10)]} key={10} size="xl"
                            mx={2}>+{tags.length - 10}</Badge>)
    }
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

                <Text size="lg" className={classes.description} lineClamp={3} component="div">
                    <TypographyStylesProvider>
                        <p>
                            {description}
                        </p>
                    </TypographyStylesProvider>
                </Text>

                <div className={classes.tags}>
                    {tagWrap}
                </div>
            </div>
        </div>
    );
}