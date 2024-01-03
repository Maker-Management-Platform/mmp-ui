import { Badge, LoadingOverlay, Overlay, Text, Title, TypographyStylesProvider, useMantineTheme } from '@mantine/core';
import classes from './Header.module.css';
import { stringToNumber } from "@/core/utils/color.ts";
import { Tag } from '@/projects/entities/Project';

type HeaderProps = {
    loading?: boolean
    title?: string
    description?: string
    imagePath?: string
    tags?: Tag[]
}

export function Header({ title, description, loading, imagePath, tags }: HeaderProps) {
    const theme = useMantineTheme();
    const img = imagePath || 'https://images.unsplash.com/photo-1563520239648-a24e51d4b570?q=80&w=2000&h=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const tagWrap = tags?.map((tag, i) =>
        i < 10 ?
            <Badge color={theme.colors.blue[stringToNumber(tag.value, 10)]} key={i} size="xl" mx={2}>{tag.value}</Badge> : null)
    if (tagWrap && tags && tags.length > 10) {
        tagWrap.push(<Badge color={theme.colors.blue[stringToNumber(`${tags.length - 10}`, 10)]} key={10} size="xl"
            mx={2}>+{tags.length - 10}</Badge>)
    }
    return (
        <div
            className={classes.wrapper}
            style={{ backgroundImage: `url(${img})` }}
        >
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
            <div className={classes.inner}>
                <Title className={classes.title}>
                    {title}
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