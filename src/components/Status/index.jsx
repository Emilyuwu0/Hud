import { useNuiEvent } from 'hooks/useNuiEvent';
import React, { useState } from 'react';
import Style1 from './Style1';
import Style2 from './Style2';
import Style3 from './Style3';
import { useData } from 'contexts/DataContext';
import * as FaIcons from 'react-icons/fa6';
import classNames from 'classnames';
import { hexToRGB } from 'utils/misc';
import Draggable from 'react-draggable';

const STYLES = {
    1: Style3,
    2: Style2,
    3: Style1
};

export default function Status() {
    const { settings, getPosition, updatePosition, isEditMode } = useData();
    const [status, setStatus] = useState([
        {
            name: 'mic',
            icon: 'FaMicrophone',
            value: 66
        },
        {
            name: 'health',
            icon: 'FaHeart',
            value: 100
        },
        {
            name: 'armor',
            icon: 'FaShield',
            value: 0,
            min: 1
        },
        {
            name: 'hunger',
            icon: 'FaBurger',
            value: 50
        },
        {
            name: 'thirst',
            icon: 'FaBottleWater',
            value: 50
        },
        {
            name: 'stamina',
            icon: 'FaBolt',
            value: 50
        },
        {
            name: 'stress',
            icon: 'FaBrain',
            value: 50
        }
    ]);
    useNuiEvent('setStatus', setStatus);
    return (
        <div
            style={{
                transform: `scale(${(settings.statusSize ?? 100) / 100})`
            }}
            className="absolute left-7 bottom-[0.8125rem] flex gap-x-2 overflow-visible transition-all"
        >
            {status.map(
                data =>
                    (!data.min || data.value >= data.min) &&
                    settings.visibilities[data.name] && (
                        <Draggable
                            key={data.name}
                            handle=".handle"
                            disabled={!isEditMode}
                            axis="both"
                            defaultPosition={{
                                x: getPosition(data.name)?.x ?? 0,
                                y: getPosition(data.name)?.y ?? 0
                            }}
                            position={null}
                            onStop={(e, info) =>
                                updatePosition(data.name, info)
                            }
                        >
                            <div className="handle relative">
                                {React.createElement(
                                    STYLES[settings.styles[data.name] ?? 1] ??
                                        STYLES[1],
                                    {
                                        data,
                                        color: settings.statusColors[data.name],
                                        icon: () =>
                                            React.createElement(
                                                FaIcons[data.icon] ??
                                                    FaIcons['FaQuestion'],
                                                {
                                                    size: '20px',
                                                    color: `rgba(${hexToRGB(
                                                        data.active
                                                            ? '#78FC4A'
                                                            : settings
                                                                  .statusColors[
                                                                  data.name
                                                              ]?.icon
                                                    )}, 0.84)`
                                                }
                                            )
                                    }
                                )}
                            </div>
                        </Draggable>
                    )
            )}
        </div>
    );
}
