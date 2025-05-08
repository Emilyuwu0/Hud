import React from 'react';

export default function Style1({ data, icon, color }) {
    const newColor = data.active
        ? { icon: '#78FC4A', text: '#78FC4A', bar: '#78FC4A' }
        : color;
    return (
        <div className="w-[3.0625rem] h-[3.9375rem] relative">
            <Bar color={newColor.bar} value={data.value} />
            <p
                style={{ color: newColor.text }}
                className="text-center text-xs text-white font-jm font-bold relative top-5 ml-1"
            >
                %{Math.floor(data.value)}
            </p>
            <div className="absolute bottom-0 right-0">
                {React.createElement(icon)}
            </div>
        </div>
    );
}

const Bar = ({ color, value }) => {
    const circumference = 6 * 22;
    return (
        <svg
            width="53"
            height="59"
            viewBox="0 0 53 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0"
        >
            <path
                d="M21.5 2.5L5.80578 10.5483C3.46939 11.7465 1.99999 14.1513 1.99999 16.777L1.99999 41.5182C1.99999 43.987 3.30045 46.2732 5.42246 47.535L20.5 56.5"
                stroke={color}
                stroke-opacity="0.85"
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray={circumference}
                stroke-dashoffset={-circumference * (1 - (40 + value) / 100)}
                className="transition-all"
            />

            <path
                d="M51 39.5V15.9246C51 13.2221 49.4444 10.7611 47.0034 9.60161L31 2"
                stroke={color}
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray={circumference}
                stroke-dashoffset={-circumference * (1 - value / 100)}
                className="transition-all"
            />
            <path
                opacity={0.4}
                d="M21.5 2.5L5.80578 10.5483C3.46939 11.7465 1.99999 14.1513 1.99999 16.777L1.99999 41.5182C1.99999 43.987 3.30045 46.2732 5.42246 47.535L20.5 56.5"
                stroke={color}
                stroke-opacity="0.85"
                stroke-width="4"
                stroke-linecap="round"
            />
            <path
                opacity={0.4}
                d="M51 39.5V15.9246C51 13.2221 49.4444 10.7611 47.0034 9.60161L31 2"
                stroke={color}
                stroke-width="4"
                stroke-linecap="round"
            />
        </svg>
    );
};
