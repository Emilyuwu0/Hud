import { FuelIcon, LightIcons } from 'components/Icons';
import { useData } from 'contexts/DataContext';
import { useLang } from 'contexts/LangContext';
import React from 'react';

export default function Boat({ vehicleData }) {
    const { lang } = useLang();
    const { settings } = useData();
    return (
        <div>
            <div className="flex items-end justify-end">
                <p
                    style={{
                        background:
                            'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 85%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                    className="font-bj font-semibold text-xl leading-none italic"
                >
                    {lang[settings.speedType]}
                </p>
                <p
                    style={{
                        background:
                            'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 75%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                    className="font-bj font-semibold text-[4rem] italic relative top-[1.375rem]"
                >
                    {vehicleData.speed}
                </p>
            </div>

            <div className="w-[10.6875rem] h-[2.4375rem] bg-white/10 rounded-md p-1 flex items-center gap-x-0.5">
                {Array.from({ length: 20 }).map((_, key) => (
                    <div className="h-full w-8 bg-white/10 relative rounded-[0.5625rem]">
                        <div
                            style={{
                                opacity:
                                    vehicleData.rpm >= (key / 20) * 12
                                        ? 1.0
                                        : 0.0
                            }}
                            className="w-full h-full bg-white/[.74] rounded-[0.5625rem] transition-opacity"
                        />
                    </div>
                ))}
            </div>

            <div className="w-full flex items-center gap-x-[0.1875rem] mt-[0.1875rem]">
                <div className="w-[4.5rem] h-[1.875rem] rounded-md bg-white/10 flex items-center justify-end pr-1 relative">
                    <FuelIcon size="20" />
                    <div
                        style={{ width: (vehicleData.fuel / 100) * 100 + '%' }}
                        className="absolute right-0 top-0 h-full bg-white/10 rounded-md transition-all"
                    />
                </div>

                {['seatbelt', 'engineStarted', 'engine'].map(type => (
                    <div className="w-[1.875rem] h-[1.875rem] rounded-[0.5625rem] bg-white/10 flex items-center justify-center">
                        <div className="scale-90">
                            {React.createElement(LightIcons[type], {
                                active: vehicleData.lights[type]
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
