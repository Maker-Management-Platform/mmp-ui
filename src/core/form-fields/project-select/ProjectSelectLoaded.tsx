import useAxios from "axios-hooks";
import { ProjectSelect } from "./ProjectSelect";
import { SettingsContext } from "@/core/utils/settingsContext";
import { Project } from "@/projects/entities/Project";
import { useContext } from "react";
import { ComboboxProps } from "@mantine/core";

type ProjectSelectLoadedProps = {
    value: string;
    onChange: (p: Project) => void;
} & ComboboxProps

export function ProjectSelectLoaded({ value, onChange, ...props }: ProjectSelectLoadedProps) {
    const { local_backend } = useContext(SettingsContext);
    const [{ data, loading, error: pError }] = useAxios<Project[]>(
        `${local_backend}/projects/list`
    );
    return (
        <ProjectSelect boosted={[]} projects={data} value={value} onChange={onChange} loading={loading} {...props}/>
    )
}