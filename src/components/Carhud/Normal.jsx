import classNames from 'classnames';
import { FuelIcon, LightIcons, NitrousIcon } from 'components/Icons';
import { useData } from 'contexts/DataContext';
import { useLang } from 'contexts/LangContext';
import React from 'react';

export default function Normal({ vehicleData }) {
    const { settings } = useData();
    const { lang } = useLang();
    return (
        <div className="w-[9.75rem] h-[5.8125rem] relative">
            <div className="flex justify-end items-center gap-x-[0.5325rem] absolute right-4 top-1">
                {['seatbelt', 'engine', 'cruise', 'doorlock'].map(type =>
                    React.createElement(LightIcons[type], {
                        active: vehicleData.lights[type]
                    })
                )}
            </div>
            <div className="flex justify-end items-end w-full">
                <p
                    style={{
                        background:
                            'linear-gradient(180deg, #FFFFFF 0%, rgba(153, 153, 153, 0.16) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                    className="font-bj leading-[1.25rem] font-bold opacity-50"
                >
                    {lang[settings.speedType]}
                </p>
                <p
                    style={{
                        background:
                            'linear-gradient(180deg, #FFFFFF 0%, #999999 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                    className="font-bj text-[3.75rem] font-bold leading-[0.8] relative right-1"
                >
                    {vehicleData.speed}
                </p>
                <div className="flex items-end gap-x-[0.1875rem]">
                    <div className="min-w-[0.75rem] h-[2.875rem] rounded-t bg-white/10 relative flex items-end">
                        <div
                            style={{
                                height: (vehicleData.fuel / 100) * 100 + '%'
                            }}
                            className={classNames(
                                'w-full rounded-t bg-white/10 transition-all',
                                {
                                    '!bg-red-500/30':
                                        (vehicleData.fuel / 100) * 100 <= 20
                                }
                            )}
                        />
                        <div className="absolute bottom-0.5 w-full left-1/2 -translate-x-1/2">
                            <FuelIcon
                                color={
                                    (vehicleData.fuel / 100) * 100 <= 20
                                        ? '#fc2c3450'
                                        : 'white'
                                }
                            />
                        </div>
                    </div>

                    <div className="min-w-[0.75rem] h-[4.6875rem] rounded-t bg-white/10 relative flex items-end">
                        <div
                            style={{
                                height: (vehicleData.nitrous / 100) * 100 + '%'
                            }}
                            className="w-full rounded-t bg-white/10 transition-all"
                        />
                        <div className="absolute bottom-0.5 w-full left-1/2 -translate-x-1/2">
                            <NitrousIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-3 rounded-l bg-white/10 relative flex justify-end">
                <div
                    style={{ width: (vehicleData.rpm / 12) * 100 + '%' }}
                    className="h-full bg-[#D9D9D9] opacity-[0.67] rounded-l transition-all"
                />
            </div>
        </div>
    );
}
