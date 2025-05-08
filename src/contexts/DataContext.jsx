import { createContext, useContext, useState } from 'react';
import { useNuiEvent } from '../hooks/useNuiEvent';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export default function DataProvider({ children }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState({
        themeColor: '#00cc6a',
        settings: {
            speedType: 'kmh',
            mapDisplay: true,
            mapType: true,
            cinematic: false,
            serverImage: false,
            alwaysShowMap: true,
            weapon: true,
            fpsMode: true,
            statusColors: {
                mic: {
                    bar: '#FFFFFF',
                    icon: '#FFFFFF',
                    text: '#FFFFFF'
                },
                health: {
                    bar: '#FFFFFF',
                    icon: '#FFFFFF',
                    text: '#FFFFFF'
                },
                armor: {
                    bar: '#FFFFFF',
                    icon: '#FFFFFF',
                    text: '#FFFFFF'
                }
            },
            styles: {},
            visibilities: {
                mic: true,
                health: true,
                armor: true
            }
        }
    });

    const updatePosition = (key, info) => {
        localStorage.setItem(key, JSON.stringify({ x: info.x, y: info.y }));
    };
    const getPosition = key => {
        return JSON.parse(localStorage.getItem(key));
    };

    useNuiEvent('setData', val => setData(prev => ({ ...prev, ...val })));

    return (
        <DataContext.Provider
            value={{
                ...data,
                isEditMode,
                setIsEditMode,
                updatePosition,
                getPosition
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
