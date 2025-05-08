import { useEffect, useState } from 'react';
import { useNuiEvent } from './hooks/useNuiEvent';
import Status from 'components/Status';
import TopInfos from 'components/TopInfos';
import Carhud from 'components/Carhud';
import Weapon from 'components/Weapon';
import Location from 'components/Location';
import Settings from 'components/Settings';
import { AnimatePresence, motion as m } from 'framer-motion';
import { fetchNui } from 'utils/fetchNui';
import { useData } from 'contexts/DataContext';

function App() {
    const [display, setDisplay] = useState(false);
    const [visibility, setVisibility] = useState(true);
    const [settingsDisplay, setSettingsDisplay] = useState(false);
    const { settings, isEditMode, setIsEditMode } = useData();
    useNuiEvent('setDisplay', setDisplay);
    useNuiEvent('setSettingsDisplay', setSettingsDisplay);
    useNuiEvent('setVisibility', setVisibility);
    useNuiEvent('clearLocalStorage', () => {
        localStorage.clear();
    });

    useEffect(() => {
        const keydown = e => {
            if (e.key == 'Escape') {
                setIsEditMode(prev => {
                    if (!prev) fetchNui('close');
                    return false;
                });
            }
        };

        window.addEventListener('keydown', keydown);
        return () => window.removeEventListener('keydown', keydown);
    }, []);
    return (
        <AnimatePresence>
            {display && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: visibility ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-screen m-0 overflow-hidden"
                >
                    {!settings.cinematic && (
                        <>
                            <Status />
                            <TopInfos />
                            <Carhud />
                            <Weapon />
                            <Location />
                        </>
                    )}
                    <AnimatePresence>
                        {settings.cinematic && (
                            <>
                                <m.div
                                    initial={{ opacity: 0, y: '-100%' }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: '-100%' }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute top-0 w-full h-[10%] bg-black"
                                />
                                <m.div
                                    initial={{ opacity: 0, y: '100%' }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: '100%' }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute bottom-0 w-full h-[10%] bg-black"
                                />
                            </>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {settingsDisplay && !isEditMode && <Settings />}
                    </AnimatePresence>
                </m.div>
            )}
        </AnimatePresence>
    );
}

export default App;
