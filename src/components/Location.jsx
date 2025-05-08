import { useData } from 'contexts/DataContext';
import { useLang } from 'contexts/LangContext';
import { useNuiEvent } from 'hooks/useNuiEvent';
import React, { useState } from 'react';
import Draggable from 'react-draggable';

export default function Location() {
    const { lang } = useLang();
    const { settings, getPosition, updatePosition, isEditMode } = useData();
    const [location, setLocation] = useState({
        direction: 'S',
        street: 'Milton Street'
    });

    useNuiEvent('setLocation', setLocation);
    return (
        <>
            {settings.locationDisplay && (
                <Draggable
                    key={'location'}
                    handle=".handle"
                    axis="both"
                    disabled={!isEditMode}
                    defaultPosition={{
                        x: getPosition('location')?.x ?? 0,
                        y: getPosition('location')?.y ?? 0
                    }}
                    position={null}
                    onStop={(e, info) => updatePosition('location', info)}
                >
                    <div className="handle absolute left-10 top-10 flex items-center gap-x-1.5">
                        <div className="w-[1.9375rem] h-[1.9375rem] rounded-[0.3125rem] bg-[#26262696] relative flex items-center justify-center">
                            <p className="text-white text-xl font-bj font-semibold text-center">
                                {location.direction}
                            </p>
                        </div>

                        <div>
                            <p className="text-[0.8125rem] text-white/60 font-bj leading-none">
                                {lang.location}
                            </p>
                            <p className="text-[0.9375rem] text-white font-bj font-medium leading-none">
                                {location.street}
                            </p>
                        </div>
                    </div>
                </Draggable>
            )}
        </>
    );
}
