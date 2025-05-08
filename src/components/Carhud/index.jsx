import Normal from './Normal';
import Air from './Air';
import React, { useEffect, useState } from 'react';
import Boat from './Boat';
import { AnimatePresence, motion as m } from 'framer-motion';
import { useNuiEvent } from 'hooks/useNuiEvent';
import MusicPlayer from 'components/MusicPlayer';
import Draggable from 'react-draggable';
import { useData } from 'contexts/DataContext';

const STYLES = {
    normal: Normal,
    air: Air,
    boat: Boat
};

export default function Carhud() {
    const { isEditMode, getPosition, updatePosition, settings } = useData();
    const [show, setShow] = useState(false);
    const [vehicleData, setVehicleData] = useState({
        carhudStyle: 'boat',
        speed: 122,
        fuel: 50,
        nitrous: 30,
        rpm: 12,
        body: 50,
        engine: 50,
        altitude: '5000 ft',
        lights: {
            seatbelt: true,
            cruise: false,
            doorlock: true
        }
    });
    useNuiEvent('setVehicleDisplay', setShow);
    useNuiEvent('setVehicleData', setVehicleData);

    useEffect(() => {
        if (!isEditMode && vehicleData.speed == 20) {
            setShow(false);
            return;
        }

        if (isEditMode) {
            setShow(true);
            setVehicleData({
                carhudStyle: 'normal',
                speed: 20,
                fuel: 50,
                nitrous: 30,
                rpm: 12,
                body: 50,
                lights: {
                    seatbelt: true,
                    cruise: false,
                    engine: 50,
                    altitude: '5000 ft',
                    doorlock: true
                }
            });
        }
    }, [isEditMode]);
    return (
        <>
            <AnimatePresence>
                {show && (
                    <>
                        <MusicPlayer />

                        <m.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1,
                                scale: (settings.carhudSize ?? 100) / 100
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute bottom-6 right-10"
                        >
                            <Draggable
                                key={'carhud'}
                                handle=".handle"
                                disabled={!isEditMode}
                                axis="both"
                                defaultPosition={{
                                    x: getPosition('carhud')?.x ?? 0,
                                    y: getPosition('carhud')?.y ?? 0
                                }}
                                position={null}
                                onStop={(e, info) =>
                                    updatePosition('carhud', info)
                                }
                            >
                                <div className="handle">
                                    {React.createElement(
                                        STYLES[vehicleData.carhudStyle] ??
                                            STYLES['normal'],
                                        {
                                            vehicleData
                                        }
                                    )}
                                </div>
                            </Draggable>
                        </m.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
