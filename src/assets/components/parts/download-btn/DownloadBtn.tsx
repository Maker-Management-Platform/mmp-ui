import {ActionIcon, rem, useMantineTheme} from "@mantine/core";
import {IconDownload} from "@tabler/icons-react";

type DownloadBtnProps = {
    downloadLink: string;
}

export function DownloadBtn({downloadLink}: DownloadBtnProps) {
    const theme = useMantineTheme();
    return (
        <ActionIcon variant="subtle" color="gray" component="a" href={downloadLink}>
            <IconDownload
                style={{width: rem(20), height: rem(20)}}
                color={theme.colors.yellow[6]}
                stroke={1.5}
            />
        </ActionIcon>
    );
}
