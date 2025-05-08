import { useData } from 'contexts/DataContext';
import { AnimatePresence, motion as m } from 'framer-motion';
import { useNuiEvent } from 'hooks/useNuiEvent';
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

export default function Weapon() {
    const { isEditMode, getPosition, updatePosition, settings } = useData();
    const [weapon, setWeapon] = useState({
        label: 'Combat Pistol',
        current: 10,
        total: 120
    });
    useNuiEvent('setWeapon', val => !isEditMode && setWeapon(val));

    useEffect(() => {
        if (!isEditMode) {
            setWeapon({});
            return;
        }

        setWeapon({
            name: 'WEAPON_PISTOL',
            label: 'Edit Mode',
            current: 12,
            total: 21
        });
    }, [isEditMode]);
    return (
        <AnimatePresence>
            {weapon?.label && settings.weapon && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-10 top-[16%]"
                >
                    <Draggable
                        key={'weapon'}
                        handle=".handle"
                        axis="both"
                        disabled={!isEditMode}
                        defaultPosition={{
                            x: getPosition('weapon')?.x ?? 0,
                            y: getPosition('weapon')?.y ?? 0
                        }}
                        position={null}
                        onStop={(e, info) => updatePosition('weapon', info)}
                    >
                        <div className="handle flex items-center gap-x-1">
                            <div>
                                <p className="font-bj text-white text-xl font-medium leading-none">
                                    {weapon.label}
                                </p>
                                <p className="font-bj text-white text-end leading-none">
                                    {weapon.current}/{weapon.total}
                                </p>
                            </div>

                            <div className="w-[2.625rem] h-[2.625rem] relative rounded-[0.3125rem] bg-[#262626D9] flex items-center justify-center">
                                <p className="text-[1.625rem] text-center font-bj text-white">
                                    {weapon.current}
                                </p>
                            </div>
                        </div>
                    </Draggable>
                </m.div>
            )}
        </AnimatePresence>
    );
}
