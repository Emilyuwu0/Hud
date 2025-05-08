import React from 'react';
import { FaPause, FaPlay, FaXmark } from 'react-icons/fa6';
import Range from './Range';
import { fetchNui } from 'utils/fetchNui';

export default function SmallMode({ musicData }) {
    return (
        <div className="w-[19.5rem] p-2 px-2 bg-[#1E1E1E] rounded-xl relative">
            <div className="flex items-center gap-x-[0.8125rem]">
                <img
                    className="w-[3rem] h-12 rounded-lg object-cover"
                    src={musicData.photo}
                />

                <div className="w-1/2">
                    <p className="text-sm font-pp font-medium text-white leading-none truncate">
                        {musicData.label}
                    </p>
                    <p className="text-[0.8125rem] font-pp text-white/50">
                        {musicData.author}
                    </p>
                    <div className="w-[10.75rem] h-[0.1875rem] mt-[0.4375rem] bg-white/10 rounded-[0.3125rem] relative">
                        <div
                            style={{
                                width:
                                    (musicData.timeStamp /
                                        musicData.maxDuration) *
                                        100 +
                                    '%'
                            }}
                            className="bg-[#00cc6a] h-full rounded-[0.3125rem] transition-all"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-y-2 h-full relative left-6">
                    {musicData.isPlaying ? (
                        <FaPause
                            onClick={e => fetchNui('updateSoundState')}
                            size={17}
                            className="fill-white/30 hover:fill-white hover:scale-[1.02] duration-300 transition-all select-none cursor-pointer"
                        />
                    ) : (
                        <FaPlay
                            onClick={e => fetchNui('updateSoundState')}
                            size={17}
                            className="fill-white/30 hover:fill-white hover:scale-[1.02] duration-300 transition-all select-none cursor-pointer"
                        />
                    )}

                    <FaXmark
                        onClick={e => fetchNui('closeMusic')}
                        className="text-[0.9375rem] fill-white/30 hover:fill-white hover:scale-[1.02] duration-300 transition-all select-none cursor-pointer"
                    />
                </div>
                <div className="absolute -right-1 rotate-90">
                    <Range
                        onChange={e => fetchNui('updateVolume', e.target.value)}
                        value={musicData?.volume ?? 50}
                        max={100}
                    />
                </div>
            </div>
        </div>
    );
}
