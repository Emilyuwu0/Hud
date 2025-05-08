import { PlaylistIcon } from 'components/Icons';
import { useLang } from 'contexts/LangContext';
import { AnimatePresence, motion as m } from 'framer-motion';
import React, { useState } from 'react';

export default function Select({ current, setCurrent, data }) {
    const [isOpened, setIsOpened] = useState(false);
    const { lang } = useLang();

    return (
        <div className="w-[11.25rem] h-full relative z-10 ">
            <div
                onClick={_ => setIsOpened(prev => !prev)}
                className="w-full h-full rounded-md bg-[#2E2E2E] flex items-center gap-x-1.5 px-2 select-none cursor-pointer"
            >
                <PlaylistIcon />
                <p className="text-xs font-pp font-medium text-white">
                    {data[current]?.label ?? lang.none}
                </p>
            </div>

            <AnimatePresence>
                {isOpened && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute w-[11.25rem] left-0 top-8 z-40 flex flex-col gap-y-px overflow-visible"
                    >
                        {data.map((x, key) => (
                            <div
                                key={x.label + key}
                                onClick={_ => {
                                    setCurrent(key);
                                    setIsOpened(false);
                                }}
                                className="w-full h-[1.875rem] bg-[#1E1E1E] rounded-md flex items-center gap-x-1.5 px-2 select-none cursor-pointer relative"
                            >
                                <PlaylistIcon />
                                <p className="text-xs font-pp font-medium text-white">
                                    {x.label}
                                </p>
                            </div>
                        ))}
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
