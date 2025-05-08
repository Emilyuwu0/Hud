import { createContext, useContext, useState } from 'react';
import { useNuiEvent } from '../hooks/useNuiEvent';

const LangContext = createContext();
export const useLang = () => useContext(LangContext);

export default function LangProvider({ children }) {
    const [lang, setLang] = useState({
        kmh: 'KM/H',
        mph: 'MPH',
        body: 'Body',
        engine: 'Engine',
        altitude: 'Altitude',
        speed: 'Speed',
        location: 'Location',
        hudSettings: 'HUD SETTINGS',
        hudSettingsDesc: 'Customize your game',
        mapDisplay: 'Map Display',
        mapType: 'Map Type',
        cinematic: 'Cinematic',
    /*     serverImage: 'Server Image', */
        alwaysShowMap: 'Always Show Map',
        speedType: 'Speed Type',
        weapon: 'Weapon',
        on: 'Show',
        off: 'Hide',
        circle: 'Circle',
        square: 'Square',
        low: 'Low',
        high: 'High',
        fpsMode: 'FPS Mode',
        locationDisplay: 'Location Display',
        color: 'Color',
        searchPlaceholder: 'Only Youtube URL...',
        none: 'None',
        areYouSure: 'Are You Sure',
        accept: 'Accept',
        close: 'Close',
        edit: 'Edit',
        color: 'Color',
        type: 'Type'
    });

    useNuiEvent('setLang', setLang);

    return (
        <LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>
    );
}
