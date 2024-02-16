import { AgentSettings } from "@/settings/entities/AgentSettings";
import { createFormContext } from "@mantine/form";

export const [FormProvider, useFormContext, useForm] = createFormContext<AgentSettings>();