import React from 'react';

export interface Settings {
    local_backend: string
}

export const SettingsContext = React.createContext<Settings>({local_backend:''});