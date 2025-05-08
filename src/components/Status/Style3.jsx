import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { hexToRGB } from 'utils/misc';

export default function Style3({ data, color, icon }) {
    const newColor = data.active
        ? { icon: '#78FC4A', text: '#78FC4A', bar: '#78FC4A' }
        : color;
    return (
        <div className="w-[3.75rem] h-[3.1875rem] relative">
            <Bar color={newColor.bar} value={data.value} />
            <p
                style={{ color: newColor.text }}
                className="text-center text-xs font-jm font-bold relative top-[1.125rem] mr-1.5"
            >
                %{Math.floor(data.value)}
            </p>
            <div className="absolute bottom-0.5 right-0.5 scale-90">
                {React.createElement(icon)}
            </div>
        </div>
    );
}

const Bar = ({ color, value }) => {
    return (
        <div className="w-[3.25rem] h-[3.3125rem] absolute left-0 top-0">
            <CircularProgressbar
                className="absolute top-0.5 left-0 rotate-[-6deg] scale-105"
                value={value > 60 ? value : 0}
                strokeWidth={9}
                circleRatio={0.24}
                styles={{
                    trail: {
                        stroke: `rgba(${hexToRGB(color)}, 0.40)`,
                        strokeLinecap: 'round'
                    },
                    path: {
                        stroke: color,
                        strokeLinecap: 'round'
                    }
                }}
            />
            <CircularProgressbar
                className="absolute bottom-0 left-0.5 scale-105 -rotate-[120deg]"
                value={value > 20 ? (value / 60) * 100 : 0}
                strokeWidth={9}
                circleRatio={0.26}
                styles={{
                    trail: {
                        stroke: `rgba(${hexToRGB(color)}, 0.40)`,
                        strokeLinecap: 'round'
                    },
                    path: {
                        stroke: color,
                        strokeLinecap: 'round'
                    }
                }}
            />
            <CircularProgressbar
                className="absolute bottom-[0.1875rem] left-0 scale-105 rotate-[160deg]"
                value={(value / 20) * 100}
                strokeWidth={9}
                circleRatio={0.155}
                styles={{
                    trail: {
                        stroke: `rgba(${hexToRGB(color)}, 0.40)`,
                        strokeLinecap: 'round'
                    },
                    path: {
                        stroke: color,
                        strokeLinecap: 'round'
                    }
                }}
            />
        </div>
    );
};
