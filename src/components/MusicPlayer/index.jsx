import React, { useState } from 'react';
import BigMode from './BigMode';
import SmallMode from './SmallMode';
import { useNuiEvent } from 'hooks/useNuiEvent';
import classNames from 'classnames';
import { useData } from 'contexts/DataContext';

export default function MusicPlayer() {
    const { settings } = useData();
    const [display, setDisplay] = useState(false);
    const [musicData, setMusicData] = useState({
        // photo: 'https://s3-alpha-sig.figma.com/img/1c43/a25d/67fa860192547798cf342647c647965d?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fWh6ZtV7kPkcAHaHk78yLKqfABSYw-LeP~FpgWoN6zZjSP1g1MpBumE9aeh3NIgWqn0yOUKQtEOxeBXpk2enpA9WYnRKNYaKi9QsoveIx8hNFJvO5QRrkYoZCDtFLwM2HCKdCEWfWL915-3-4uzOPq2iAe-5pzQ2BblUeoOXweljOH8FwxFYQ6a3osLCvqgSIjfIsMT8VwR65-MGUPrkBYkM1j4yrAxjDGg61RSSg0ZtXRX1eO2-REACMLO-nxGj3yoqeYjfs7Gu4nhwH64XQ1obm~TUGsv5nHt~JU2J9Z-h2Day9IS-XaNr6-5X3aOFh4MNahumYSPq5PQccHSppQ__',
        // label: 'Lithe - Fall Back ft. Lil Tjay',
        // author: 'Lithe ft. Lil Tjay',
        // value: 50,
        // volume: 50,
        // state: true
    });
    useNuiEvent('setMusicDisplay', setDisplay);
    useNuiEvent('setRadio', val => {
        setMusicData(prev => (val == '{}' ? {} : { ...prev, ...val }));
    });

    return (
        <div
            className={classNames('absolute left-7 bottom-[26%]', {
                'bottom-[31%]': settings.mapType
            })}
        >
            {display && <BigMode musicData={musicData} />}
            {musicData?.label && !display && (
                <SmallMode musicData={musicData} />
            )}
        </div>
    );
}
