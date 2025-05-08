import React from 'react';

export default function Style2({ data, color, icon }) {
    const newColor = data.active
        ? { icon: '#78FC4A', text: '#78FC4A', bar: '#78FC4A' }
        : color;
    return (
        <div className="w-[3.5625rem] h-[2.875rem] relative">
            <Bar color={newColor.bar} value={data.value} />
            <p
                style={{ color: newColor.text }}
                className="text-center text-xs font-jm font-bold relative top-[1.125rem] mr-2"
            >
                %{Math.floor(data.value)}
            </p>
            <div className="absolute bottom-[0.1875rem] right-0 scale-90">
                {React.createElement(icon)}
            </div>
        </div>
    );
}

const Bar = ({ color, value }) => {
    const circumference = 6 * 22;

    return (
        <svg
            width="49"
            height="50"
            viewBox="0 0 49 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0"
        >
            <path
                d="M20 2H9C5.13401 2 2 5.13401 2 9V14.9348V19"
                stroke={color}
                stroke-opacity="0.85"
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray={circumference}
                stroke-dashoffset={-circumference * (1 - (42 + value) / 111)}
                className="transition-all"
            />
            <path
                d="M41 48H9C5.13401 48 2 44.866 2 41V35.0652V31"
                stroke={color}
                stroke-opacity="0.85"
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray={circumference}
                stroke-dashoffset={circumference * (1 - value / 111)}
                className="transition-all"
            />
            <path
                d="M29 2H40C43.866 2 47 5.13401 47 9V14.9348V19"
                stroke={color}
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray={circumference}
                stroke-dashoffset={-circumference * (1 - (72 - value) / 111)}
                className="transition-all"
            />
            <path
                opacity={0.4}
                d="M20 2H9C5.13401 2 2 5.13401 2 9V14.9348V19"
                stroke={color}
                stroke-opacity="0.85"
                stroke-width="4"
                stroke-linecap="round"
                className="transition-all"
            />
            <path
                opacity={0.4}
                d="M41 48H9C5.13401 48 2 44.866 2 41V35.0652V31"
                stroke={color}
                stroke-opacity="0.85"
                stroke-width="4"
                stroke-linecap="round"
                className="transition-all"
            />
            <path
                opacity={0.4}
                d="M29 2H40C43.866 2 47 5.13401 47 9V14.9348V19"
                stroke={color}
                stroke-width="4"
                stroke-linecap="round"
                className="transition-all"
            />
        </svg>
    );
};
