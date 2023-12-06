import { Icon3dRotate } from "@tabler/icons-react";
import { ActionIcon, Checkbox, rem, useMantineTheme } from "@mantine/core";
import React, { ReactElement } from "react";

type SelectBtnProps = {
    selected: boolean;
    onChange: (arg0: boolean) => void;
    icon?: ReactElement<any>
}

export function SelectBtn({ selected, onChange, icon }: SelectBtnProps) {
    const theme = useMantineTheme();
    const iconClone = React.cloneElement(icon || <Icon3dRotate/>, {
        style: { width: rem(20), height: rem(20) },
        color: theme.colors.blue[6],
        stroke: 1.5
    })
    return (
        <ActionIcon variant="subtle" color="gray" onClick={() => onChange(true)}>
            {!selected && iconClone}
            {selected &&
                <Checkbox m={5} checked={selected} onChange={(event) => onChange(event.currentTarget.checked)} />}
        </ActionIcon>
    );
}
