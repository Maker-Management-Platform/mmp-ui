import { useContext } from "react"
import { SSEContext } from "../../SSEContext"
import { Loader, UnstyledButton } from "@mantine/core"
import { IconMoodSmileBeam, IconSkull } from "@tabler/icons-react"

export function StatusIcon({ ...props }) {
    const { connected, loading, error } = useContext(SSEContext)

    return (<UnstyledButton  {...props}>
        {loading && <Loader color="white" type="bars" />}
        {connected && <IconMoodSmileBeam stroke={1.5} />}
        {error && <IconSkull stroke={1.5} />}
    </UnstyledButton>)
}