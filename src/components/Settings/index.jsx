import { SettingsActionIcons } from 'components/Icons';
import { useData } from 'contexts/DataContext';
import { useLang } from 'contexts/LangContext';
import React, { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';
import { fetchNui } from 'utils/fetchNui';
import classNames from 'classnames';
import Range from 'components/MusicPlayer/Range';
export default function Settings() {
    const { lang } = useLang();
    const { settings, setIsEditMode } = useData();
    const [bars, setBars] = useState({
        topInfos: {},
        status: {
            mic: 'Mic'
        }
    });

    useEffect(() => {
        const get = () => fetchNui('getBars').then(setBars);
        get();
    }, []);

    const action = type => {
        if (type == 'edit') {
            setIsEditMode(true);
        } else if (type == 'exit') {
            fetchNui('close');
        } else {
            fetchNui(type);
        }
    };

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 right-0 bottom-0 top-0 m-auto w-[67.0625rem] h-min rounded-2xl bg-[#2A2A2A]/90 p-6"
        >
            <div className="w-full flex items-center justify-between">
                <div>
                    <p className="font-be text-2xl text-white leading-none">
                        {lang.hudSettings}
                    </p>
                    <p className="font-pp font-medium text-sm text-white/40">
                        {lang.hudSettingsDesc}
                    </p>
                </div>

                <div className="flex items-center gap-x-[0.5625rem]">
                    {['edit', 'reset', 'exit'].map(type => (
                        <div
                            onClick={_ => action(type)}
                            className="w-[2.8125rem] h-[2.8125rem] rounded-xl bg-white/10 hover:bg-white/[.15] hover:scale-105 transition-all duration-300 select-none cursor-pointer flex items-center justify-center"
                        >
                            {React.createElement(SettingsActionIcons[type])}
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full grid grid-cols-5 relative gap-y-[0.4375rem] gap-x-1.5 mt-3">
                {[
                    'mapType',
                    'fpsMode',
                    'cinematic',
            /*         'serverImage', */
                    'alwaysShowMap',
                    'speedType',
                    'weapon',
                    'locationDisplay',
                    ...Object.keys(bars.topInfos)
                ].map(type => {
                    const barLabel = bars.status[type] ?? bars.topInfos[type];
                    const value = barLabel
                        ? settings.visibilities[type]
                        : settings[type];
                    const desc =
                        type == 'mapType'
                            ? value
                                ? 'circle'
                                : 'square'
                            : type == 'fpsMode'
                            ? value
                                ? 'high'
                                : 'low'
                            : value
                            ? 'on'
                            : 'off';

                    return (
                        <div className="w-full h-[4.0625rem] bg-[#2E2E2E] rounded-[1.375rem] flex items-center justify-between pl-[0.9375rem] pr-[0.5625rem]">
                            <div>
                                <p className="capitalize font-pp text-[0.9375rem] font-extrabold text-white leading-none mt-1">
                                    {barLabel ?? lang[type] ?? type}
                                </p>
                                {bars.status[type] == null ? (
                                    <p className="text-[0.8125rem] font-pp text-white/50">
                                        {lang[desc]}
                                    </p>
                                ) : (
                                    <input
                                        value={settings.statusColors[type]}
                                        onChange={e =>
                                            fetchNui('updateSettings', {
                                                settingType: 'color',
                                                type,
                                                value: e.target.value
                                            })
                                        }
                                        className="w-[1.0625rem] h-[1.0625rem] rounded-[2.125rem] relative top-1"
                                        type="color"
                                    />
                                )}
                            </div>

                            <div
                                onClick={_ =>
                                    fetchNui('updateSettings', {
                                        type,
                                        value:
                                            type == 'speedType'
                                                ? value == 'kmh'
                                                    ? 'mph'
                                                    : 'kmh'
                                                : type == 'statusStyle'
                                                ? value + 1 <= 3
                                                    ? value + 1
                                                    : 1
                                                : !value
                                    })
                                }
                                className="min-w-[2.8125rem] h-[2.8125rem] rounded-[2.125rem] bg-[#FAFAFA]/10 hover:bg-[#FAFAFA]/[.15] hover:scale-105 transition-all duration-300 select-none cursor-pointer flex items-center justify-center relative"
                            >
                                {type == 'speedType' ? (
                                    <p className="text-[0.625rem] font-pp font-extrabold text-white">
                                        {lang[value]}
                                    </p>
                                ) : type == 'mapType' || type == 'fpsMode' ? (
                                    <div
                                        style={{
                                            border: `2px solid ${
                                                type == 'fpsMode'
                                                    ? value
                                                        ? '#00cc6a'
                                                        : '#F98B25'
                                                    : 'rgb(47 70 193 / 0.9)'
                                            }`,
                                            borderRadius:
                                                value || type == 'fpsMode'
                                                    ? '100%'
                                                    : '4px',
                                            transform:
                                                !value &&
                                                type !== 'fpsMode' &&
                                                'scale(0.9)'
                                        }}
                                        className="w-[1.6875rem] h-[1.6875rem] relative p-0.5 transition-all"
                                    >
                                        <div
                                            style={{
                                                background:
                                                    type == 'fpsMode' &&
                                                    (value
                                                        ? '#00cc6a'
                                                        : '#F98B25'),
                                                borderRadius:
                                                    value || type == 'fpsMode'
                                                        ? '100%'
                                                        : '2px'
                                            }}
                                            className="w-full h-full bg-[#2F46C1]/90 transition-all"
                                        />
                                    </div>
                                ) : type == 'statusStyle' ? (
                                    <p className="text-xs font-pp font-extrabold text-white">
                                        {value}
                                    </p>
                                ) : (
                                    React.createElement(
                                        value
                                            ? SettingsActionIcons.on
                                            : SettingsActionIcons.off
                                    )
                                )}
                            </div>
                        </div>
                    );
                })}

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0"
                    height="0"
                    viewBox="0 0 0 0"
                    fill="none"
                    className="absolute left-0 top-0"
                >
                    <clipPath id="hexagon">
                        <path d="M7.5 0L14.8612 4.25V12.75L7.5 17L0.138784 12.75V4.25L7.5 0Z" />
                    </clipPath>
                </svg>

                {[...Object.keys(bars.status)].map(type => {
                    const barLabel = bars.status[type];
                    const value = barLabel
                        ? settings.visibilities[type]
                        : settings[type];
                    return (
                        <div className="w-full h-[7.8125rem] bg-[#2E2E2E] rounded-[1.375rem] flex items-center justify-between pl-[0.9375rem] pr-[0.5625rem]">
                            <div>
                                <p className="capitalize font-pp text-[0.9375rem] font-extrabold text-white leading-none mt-1">
                                    {barLabel}
                                </p>
                                <p className="text-[0.8125rem] font-pp text-white/50 mt-1">
                                    {lang.color}
                                </p>
                                <div className="flex items-center gap-x-[0.3125rem]">
                                    {['bar', 'icon', 'text'].map(cType => (
                                        <input
                                            value={
                                                settings.statusColors[type][
                                                    cType
                                                ]
                                            }
                                            onChange={e =>
                                                fetchNui('updateSettings', {
                                                    settingType: 'color',
                                                    type,
                                                    cType,
                                                    value: e.target.value
                                                })
                                            }
                                            className="w-[1.0625rem] h-[1.0625rem] rounded-[2.125rem]"
                                            type="color"
                                        />
                                    ))}
                                </div>
                                <p className="text-[0.8125rem] font-pp text-white/50 mt-1">
                                    {lang.type}
                                </p>
                                <div className="flex items-center gap-x-[0.3125rem]">
                                    {Array.from({ length: 3 }).map(
                                        (_, sType) => (
                                            <div
                                                onClick={_ =>
                                                    fetchNui('updateSettings', {
                                                        settingType: 'style',
                                                        type,
                                                        value: sType + 1
                                                    })
                                                }
                                                style={{
                                                    clipPath:
                                                        sType == 2 &&
                                                        'url(#hexagon)'
                                                }}
                                                className={classNames(
                                                    'w-[1.0625rem] h-[1.0625rem] rounded-[2.125rem] bg-[#D9D9D9] select-none cursor-pointer transition-all duration-300 hover:scale-105',
                                                    {
                                                        '!rounded-[0.1875rem]':
                                                            sType == 1,
                                                        '!rounded-none':
                                                            sType == 2,
                                                        '!scale-105':
                                                            settings.styles[
                                                                type
                                                            ] ==
                                                            sType + 1
                                                    }
                                                )}
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <div
                                    onClick={_ =>
                                        fetchNui('updateSettings', {
                                            type,
                                            value: !value
                                        })
                                    }
                                    className="min-w-[2.8125rem] h-[2.8125rem] rounded-[2.125rem] bg-[#FAFAFA]/10 hover:bg-[#FAFAFA]/[.15] hover:scale-105 transition-all duration-300 select-none cursor-pointer flex items-center justify-center relative"
                                >
                                    {React.createElement(
                                        value
                                            ? SettingsActionIcons.on
                                            : SettingsActionIcons.off
                                    )}
                                </div>
                                <div
                                    onClick={_ =>
                                        fetchNui('updateSettings', {
                                            settingType: 'reset',
                                            type,
                                            value: !value
                                        })
                                    }
                                    className="min-w-[2.8125rem] h-[2.8125rem] rounded-[2.125rem] bg-[#FAFAFA]/10 hover:bg-[#FAFAFA]/[.15] hover:scale-105 transition-all duration-300 select-none cursor-pointer flex items-center justify-center relative"
                                >
                                    {React.createElement(
                                        SettingsActionIcons.reset
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                {['statusSize', 'topInfosSize', 'carhudSize'].map(type => (
                    <div className="w-full h-[4.6875rem] bg-[#2E2E2E] rounded-[1.375rem] flex flex-col justify-between pl-[0.9375rem] pr-3 py-4">
                        <p className="capitalize font-pp text-[0.9375rem] font-extrabold text-white leading-none">
                            {lang[type] ?? 'Unknown'}
                        </p>

                        <Range
                            onChange={e =>
                                fetchNui('updateSettings', {
                                    type,
                                    value: e.target.value
                                })
                            }
                            className={'!w-full'}
                            max={200}
                            value={settings[type] ?? 100}
                        />
                    </div>
                ))}
            </div>
        </m.div>
    );
}
