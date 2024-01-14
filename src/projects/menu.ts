import { IconCirclePlus, IconDownload, IconFolders } from "@tabler/icons-react";

export const menuItems = [
    { icon: IconFolders, label: 'Projects', href: 'projects?tab=list' },
]

export const menu = {
    icon: IconFolders,
    label: 'Projects',
    href: 'projects',
    sub: [
        {
            icon: IconFolders,
            label: 'List',
            href: 'projects',
        },
        {
            icon: IconCirclePlus,
            label: 'Import',
            href: 'projects/new',
        },
        {
            icon: IconDownload,
            label: 'Import',
            href: 'projects/import',
        },
        {
            icon: IconDownload,
            label: 'asd',
            href: '/projects/52a823f8-eefa-4085-a7b0-22b6fda43a27?tab=all',
        }

    ]
}