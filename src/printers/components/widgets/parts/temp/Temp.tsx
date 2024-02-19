import {  Center, NumberFormatter, Stack, Text } from "@mantine/core"
import React, { ReactElement } from "react"

interface TempProps {
    icon: ReactElement
    current: number
    target?: number
}

export function Temp({ icon, current, target }: TempProps) {
    return (
        <Stack gap={0}>
            <Center>{React.cloneElement(icon, {})}</Center>
            <Text size="sm"><NumberFormatter value={(Math.round(current * 100) / 100).toFixed(1)} decimalScale={1} suffix="c" /></Text>
            <Text size="sm"><NumberFormatter value={(Math.round(target * 100) / 100).toFixed(1)} decimalScale={1} suffix="c" /></Text>
        </Stack>
    )


}