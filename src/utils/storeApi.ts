import React from 'react';
type LoadContextType = {
    addMoreCard: (value: string, value2: string) => void;
    addMoreList: (value: string) => void
}

export default React.createContext<LoadContextType | null>(null);
