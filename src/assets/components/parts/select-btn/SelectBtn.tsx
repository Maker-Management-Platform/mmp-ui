import {IconSettings} from "@tabler/icons-react";
import {ActionIcon, Checkbox, rem, useMantineTheme} from "@mantine/core";

type SelectBtnProps = {
    selected: boolean;
    onChange: (arg0: boolean) => void;
}

export function SelectBtn({selected, onChange}: SelectBtnProps) {
    const theme = useMantineTheme();
    return (
        <ActionIcon variant="subtle" color="gray" onClick={() => onChange(true)}>
            {!selected && <IconSettings
                style={{width: rem(20), height: rem(20)}}
                color={theme.colors.blue[6]}
                stroke={1.5}
            />}
            {selected &&
                <Checkbox m={5} checked={selected} onChange={(event) => onChange(event.currentTarget.checked)}/>}
        </ActionIcon>
    );
}
