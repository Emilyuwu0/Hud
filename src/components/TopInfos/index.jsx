import { TopInfoIcons } from 'components/Icons';
import { useData } from 'contexts/DataContext';
import { useNuiEvent } from 'hooks/useNuiEvent';
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import * as FaIcons from 'react-icons/fa6';
import { formatter } from 'utils/misc';

export default function TopInfos() {
    const { themeColor, settings, getPosition, updatePosition, isEditMode } =
        useData();
    const [topInfos, setTopInfos] = useState([
        {
            id: 'playerCount',
            icon: 'playerCount',
            color: 'theme',
            value: '347',
            row: 1
        },
        {
            id: 'time',
            icon: 'time',
            color: 'theme',
            value: '19:05',
            row: 1
        },
        {
            id: 'job',
            icon: 'job',
            color: 'theme',
            value: 'Police Officer',
            row: 1
        },
        {
            id: 'fullname',
            icon: 'fullname',
            color: 'theme',
            value: 'Erza Baba',
            row: 2
        },
        {
            id: 'cash',
            icon: 'cash',
            color: 'cash',
            value: '31000',
            money: true,
            row: 2
        },
        {
            id: 'bank',
            icon: 'bank',
            color: 'bank',
            value: '62000',
            money: true,
            row: 2
        }
    ]);

    useNuiEvent('setTopInfos', setTopInfos);

    return (
        <>   <img
        src="./xrespect2.png"
        alt="Logo"
        className="fixed top-8 left-1/2 transform -translate-x-1/2 w-32 z-50 pointer-events-none"
      />
        <div
            style={{
                transform: `scale(${(settings.topInfosSize ?? 100) / 100})`
            }}
            className="absolute right-0 top-0 p-10 flex items-center gap-x-[1.75rem] transition-all"
        >  
            <div>
                <div className="flex items-center gap-x-[0.4375rem] h-[1.625rem]">
                    {topInfos
                        .filter(x => x.row == 1 && settings.visibilities[x.id])
                        .map(info => (
                            <Draggable
                                key={info.id}
                                handle=".handle"
                                axis="both"
                                disabled={!isEditMode}
                                defaultPosition={{
                                    x: getPosition(info.id)?.x ?? 0,
                                    y: getPosition(info.id)?.y ?? 0
                                }}
                                position={null}
                                onStop={(_, e) => updatePosition(info.id, e)}
                            >
                                <div className="handle px-2 h-full bg-[#2e2e2e73] rounded-[0.3125rem] flex items-center gap-x-[0.4375rem]">
                                    {React.createElement(
                                        TopInfoIcons[info.icon] ??
                                            FaIcons[info.icon],
                                        { color: themeColor }
                                    )}
                                    <p className="font-st text-[0.8125rem] text-white mt-0.5">
                                        {info.money
                                            ? formatter.format(info.value)
                                            : info.value}
                                    </p>
                                </div>
                            </Draggable>
                        ))}
                </div>
                <div className="flex items-center gap-x-[0.4375rem] h-[1.625rem] mt-1.5">
                    {topInfos
                        .filter(x => x.row == 2 && settings.visibilities[x.id])
                        .map(info => (
                            <Draggable
                                key={info.id}
                                handle=".handle"
                                axis="both"
                                disabled={!isEditMode}
                                defaultPosition={{
                                    x: getPosition(info.id)?.x ?? 0,
                                    y: getPosition(info.id)?.y ?? 0
                                }}
                                position={null}
                                onStop={(_, e) => updatePosition(info.id, e)}
                            >
                                <div className="handle px-2 h-full bg-[#2e2e2e73] rounded-[0.3125rem] flex items-center gap-x-[0.4375rem]">
                                    {React.createElement(
                                        TopInfoIcons[info.icon] ??
                                            FaIcons[info.icon],
                                        { color: themeColor }
                                    )}
                                    <p className="font-st text-[0.8125rem] text-white mt-0.5">
                                        {info.money
                                            ? formatter.format(info.value)
                                            : info.value}
                                    </p>
                                </div>
                            </Draggable>
                        ))}
                </div>
            </div>
         {/*    {settings.serverImage && <img src="./logo.png" />} */}
        </div>
        </>
    
    );
}
