import { ActionIcon, Badge, LoadingOverlay, Overlay, Text, Title, TypographyStylesProvider, rem, useMantineTheme } from '@mantine/core';
import classes from './Header.module.css';
import { stringToNumber } from "@/core/utils/color.ts";
import { Tag } from '@/projects/entities/Project';
import DOMPurify from 'dompurify'
import { IconExternalLink, IconPhoto } from '@tabler/icons-react';

type HeaderProps = {
    loading?: boolean
    title?: string
    description?: string
    imagePath?: string
    link?: string
    tags?: Tag[]
    onTagClick?: (tag: Tag) => void
}

export function Header({ title, description, loading, imagePath, link, tags, onTagClick }: HeaderProps) {
    const theme = useMantineTheme();
    const fallbackImage = 'https://images.unsplash.com/photo-1563520239648-a24e51d4b570?q=80&w=2000&h=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const img = imagePath ?? fallbackImage;
    const tagWrap = tags?.map((tag, i) =>
        i < 10 ?
            <Badge onClick={() => onTagClick && onTagClick(tag)} style={{ cursor: onTagClick ? "pointer" : "" }} color={theme.colors.blue[stringToNumber(tag.value, 10)]} key={i} size="xl" mx={2}>{tag.value}</Badge> : null)
    if (tagWrap && tags && tags.length > 10) {
        tagWrap.push(<Badge color={theme.colors.blue[stringToNumber(`${tags.length - 10}`, 10)]} key={10} size="xl"
            mx={2}>+{tags.length - 10}</Badge>)
    }
    return (
        <div
            className={classes.wrapper}
            style={{ backgroundImage: `url(${loading ? fallbackImage : img})` }}
        >
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
            <div className={classes.inner}>
                <Title className={classes.title}>
                    {title}
                </Title>

                <Text size="lg" className={classes.description} lineClamp={3} component="div">
                    <TypographyStylesProvider>
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description, { sanitize: true }) }} />
                    </TypographyStylesProvider>
                </Text>

                <div className={classes.tags}>
                    {tagWrap}
                </div>

                {link && <ActionIcon className={classes.link} color='white' variant="subtle" size="lg" aria-label="Link" component="a" href={link} target='_blank'>
                    <IconExternalLink style={{ width: rem(20) }} stroke={1.5} />
                </ActionIcon>}
            </div>
        </div>
    );
}