import { FuelIcon, LightIcons, RPMIcon } from 'components/Icons';
import { useData } from 'contexts/DataContext';
import { useLang } from 'contexts/LangContext';
import React from 'react';
import { hexToRGB } from 'utils/misc';

export default function Air({ vehicleData }) {
    const { lang } = useLang();
    const { settings } = useData();
    return (
        <div className="flex gap-x-1 relative">
            <div>
                <div className="flex flex-col items-end relative">
                    {['body', 'engine', 'altitude', 'speed'].map(type => {
                        const value =
                            vehicleData[type] ?? vehicleData.lights[type];
                        const isPercent = type == 'body' || type == 'engine';
                        const color =
                            value <= 25
                                ? '#D72222'
                                : value > 25 && value <= 60
                                ? '#D7D722'
                                : '#FFFFFF';
                        return (
                            <div className="flex items-center gap-x-[0.4375rem] mb-[0.3125rem]">
                                <div className="relative bottom-1">
                                    <p className="font-bj font-medium text-xl text-white/20 text-end">
                                        {lang[type]}
                                    </p>
                                    <span
                                        style={{
                                            color: `rgba(${hexToRGB(
                                                isPercent ? color : '#FFFFFF'
                                            )}, 0.5)`
                                        }}
                                        className="font-bj font-medium text-xl leading-3 relative"
                                    >
                                        <p className="text-end">
                                            {type == 'speed' && (
                                                <span className="text-white/20 text-base leading-[0] mr-1">
                                                    {lang[settings.speedType]}
                                                </span>
                                            )}
                                            {isPercent && '%'}
                                            {value}
                                        </p>
                                    </span>
                                </div>
                                <div
                                    style={{
                                        background: `rgba(${hexToRGB(
                                            isPercent ? color : '#FFFFFF'
                                        )}, 0.1)`
                                    }}
                                    className="w-12 h-12 rounded-[0.5625rem] flex items-center justify-center"
                                >
                                    {React.createElement(
                                        LightIcons[
                                            type == 'engine'
                                                ? 'airEngine'
                                                : type
                                        ],
                                        { active: value }
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-[10.3125rem] relative left-[1.875rem] h-[1.75rem] rounded-[0.5625rem] bg-white/10 flex items-center pl-1.5">
                    <FuelIcon size="20" />
                    <div
                        style={{ width: (vehicleData.fuel / 100) * 100 + '%' }}
                        className="absolute right-0 top-0 h-full bg-white/10 rounded-[0.5625rem] transition-all"
                    />
                </div>
            </div>
            <div className="w-[1.625rem] h-[12.9375rem] rounded-[0.5625rem] bg-white/10 mb-5 flex justify-center relative pt-2">
                <RPMIcon />
                <div
                    style={{ height: (vehicleData.rpm / 12) * 100 + '%' }}
                    className="absolute bottom-0 w-full bg-white/10 rounded-[0.5625rem] transition-all"
                />
            </div>
        </div>
    );
}
