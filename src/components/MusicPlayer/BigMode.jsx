import classNames from 'classnames';
import { AddPlaylistIcon, PreviousIcon, SearchIcon } from 'components/Icons';
import { useLang } from 'contexts/LangContext';
import { AnimatePresence, motion as m } from 'framer-motion';
import { useNuiEvent } from 'hooks/useNuiEvent';
import React, { useEffect, useRef, useState } from 'react';
import {
    FaPlay,
    FaTrash,
    FaPause,
    FaPencil,
    FaXmark,
    FaHeart,
    FaMagnifyingGlass
} from 'react-icons/fa6';
import { fetchNui } from 'utils/fetchNui';
import Select from './Select';

const ICONS = {
    play: <FaPlay />,
    addPlaylist: (
        <AddPlaylistIcon
            className={'!stroke-white/50 group-hover:!stroke-white'}
        />
    ),
    edit: <FaPencil />,
    delete: <FaTrash />
};

export default function BigMode({ musicData }) {
    const { lang } = useLang();
    const searchRef = useRef();
    const [search, setSearch] = useState({
        state: false,
        input: ''
    });
    const [current, setCurrent] = useState(0);
    const [playlists, setPlaylists] = useState([
        // {
        //     label: 'Testingo',
        //     musics: [
        //         {
        //             label: 'Lithe - Fall Back ft. Lil Tjay'
        //         },
        //         {
        //             label: 'Lithe - Fall Back ft. Lil Tjay'
        //         },
        //         {
        //             label: 'Lithe - Fall Back ft. Lil Tjay'
        //         }
        //     ]
        // },
        // {
        //     label: 'Testingo2',
        //     musics: []
        // }
    ]);
    const [favorites, setFavorites] = useState([]);
    const [modal, setModal] = useState(null);

    const action = type =>
        type == 'delete' || type == 'edit'
            ? setModal({ type, current })
            : fetchNui(type, current);
    useNuiEvent('setPlaylists', setPlaylists);
    useNuiEvent('setFavorites', setFavorites);
    useNuiEvent('setCurrent', setCurrent);
    useEffect(() => {
        const get = () =>
            fetchNui('getMusicDatas').then(val => {
                setPlaylists(val.playlists);
                setFavorites(val.favorites);
            });
        get();
    }, []);

    const [error, setError] = useState(false);
    return (
        <div className="w-[21.125rem] relative">
            <div className="w-full h-[1.75rem] rounded-md bg-[#1E1E1E] px-3 flex items-center gap-x-[0.5625rem]">
                <div>
                    <SearchIcon />
                </div>
                <input
                    ref={searchRef}
                    placeholder={lang.searchPlaceholder}
                    onKeyDown={e => {
                        if (e.key == 'Enter') {
                            const youtubeRegex =
                                /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i;

                            if (youtubeRegex.test(searchRef.current.value)) {
                                fetchNui('playMusic', {
                                    url: searchRef.current.value
                                });
                            } else {
                                setError('Invalid URL - only youtube allowed');
                                setTimeout(() => setError(false), 3000);
                            }
                        }
                    }}
                    className="w-full bg-transparent border-none outline-none font-pp font-medium text-[0.6875rem] text-white/40 placeholder:text-white/30"
                />
            </div>

            {error && (
                <div className="w-full bg-red-500/30 text-red-500 rounded-md h-[1.75rem] flex items-center px-3 mt-2 font-bold">
                    {error}
                </div>
            )}

            <div
                className={classNames(
                    'w-full max-h-[31.0625rem] bg-[#1E1E1E] relative rounded-xl px-[0.9375rem] flex flex-col items-center mt-1.5 py-3.5',
                    {
                        '!pt-0': !musicData?.label
                    }
                )}
            >
                {musicData?.label && (
                    <div className="flex items-center gap-x-[0.8125rem]">
                        <img
                            className="w-[4.4375rem] h-[4.4375rem] rounded-[0.9375rem] object-cover"
                            src={musicData.photo}
                        />

                        <div>
                            <p className="text-sm font-pp font-medium text-white leading-none mt-2">
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

                            <div className="w-full flex items-center gap-x-3 mt-2">
                                <FaHeart
                                    onClick={_ =>
                                        fetchNui(
                                            favorites.some(
                                                x => x == musicData.url
                                            )
                                                ? 'removeFavorite'
                                                : 'addFavorite',
                                            musicData.url
                                        )
                                    }
                                    className={classNames(
                                        'text-white/50 text-[0.9375rem] hover:text-white transition-all duration-300 hover:scale-105 select-none cursor-pointer',
                                        {
                                            '!text-white': favorites.some(
                                                x => x == musicData.url
                                            )
                                        }
                                    )}
                                />
                                <AddPlaylistIcon
                                    onClick={_ =>
                                        fetchNui('addMusic', {
                                            id: current,
                                            url: musicData.url
                                        })
                                    }
                                />
                                <PreviousIcon
                                    onClick={_ => fetchNui('previousMusic')}
                                />
                                {musicData.isPlaying ? (
                                    <FaPause
                                        onClick={e =>
                                            fetchNui('updateSoundState')
                                        }
                                        size={17}
                                        className="fill-white/30 hover:fill-white hover:scale-[1.02] duration-300 transition-all select-none cursor-pointer"
                                    />
                                ) : (
                                    <FaPlay
                                        onClick={e =>
                                            fetchNui('updateSoundState')
                                        }
                                        size={17}
                                        className="fill-white/30 hover:fill-white hover:scale-[1.02] duration-300 transition-all select-none cursor-pointer"
                                    />
                                )}
                                <PreviousIcon
                                    onClick={_ => fetchNui('nextMusic')}
                                    rotate={true}
                                />

                                <FaMagnifyingGlass
                                    onClick={_ =>
                                        setSearch(prev => ({
                                            ...prev,
                                            state: !prev.state
                                        }))
                                    }
                                    className="text-[0.9375rem] fill-white/30 hover:fill-white hover:scale-[1.02] duration-300 transition-all select-none cursor-pointer"
                                />

                                <FaXmark
                                    onClick={_ => fetchNui('closeMusic')}
                                    className="text-[0.9375rem] fill-white/30 hover:fill-white hover:scale-[1.02] duration-300 transition-all select-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="w-full max-h-[28.75rem] mt-[1.125rem] relative flex flex-col gap-y-[0.3125rem]">
                    <div className="w-full h-[1.875rem] flex items-center gap-x-0.5 relative">
                        {!search.state ? (
                            <Select
                                current={current}
                                setCurrent={setCurrent}
                                data={playlists}
                            />
                        ) : (
                            <input
                                value={search.input}
                                onChange={e =>
                                    setSearch(prev => ({
                                        ...prev,
                                        input: e.target.value
                                    }))
                                }
                                className="w-[11.25rem] h-full border-none outline-none bg-[#2E2E2E] rounded-md px-2.5 text-white font-pp font-medium placeholder:text-white/50 text-xs"
                            />
                        )}
                        {['play', 'addPlaylist', 'edit', 'delete'].map(type => (
                            <div
                                onClick={_ =>
                                    type !== 'addPlaylist'
                                        ? playlists.length > 0 && action(type)
                                        : fetchNui('addPlaylist', {
                                              label:
                                                  '#' +
                                                  lang.playlist +
                                                  ' ' +
                                                  (playlists.length + 1),
                                              musics: []
                                          })
                                }
                                className={classNames(
                                    'min-w-[1.875rem] h-[1.875rem] rounded-md bg-[#2E2E2E] flex items-center justify-center text-white/50 group hover:text-white transition-all text-[0.9375rem] duration-300 select-none cursor-pointer hover:scale-95',
                                    {
                                        '!text-[#D72222]/50 hover:!text-[#D72222]':
                                            type == 'delete'
                                    }
                                )}
                            >
                                {ICONS[type]}
                            </div>
                        ))}
                    </div>

                    <div className="w-full max-h-[20rem]  overflow-y-auto flex flex-col gap-y-0.5">
                        {playlists[current] &&
                            playlists[current].musics
                                .filter(x =>
                                    search.state
                                        ? x.label
                                              .toLowerCase()
                                              .includes(
                                                  search.input.toLowerCase()
                                              )
                                        : true
                                )
                                .map((data, key) => (
                                    <div className="w-full flex-shrink-0 h-[3.4375rem] bg-[#2E2E2E] rounded-[0.4375rem] flex items-center justify-between p-2">
                                        <div className="w-2/3 flex items-center gap-x-[0.4375rem]">
                                            <img
                                                src={data.photo}
                                                className="w-10 h-10 rounded object-cover"
                                            />
                                            <div className="w-[90%] relative">
                                                <p className="text-sm font-pp font-medium text-white leading-none mt-2 truncate">
                                                    {data.label}
                                                </p>
                                                <p className="text-[0.8125rem] font-pp text-white/20 truncate">
                                                    {data.author}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-x-2">
                                            <FaXmark
                                                onClick={_ =>
                                                    fetchNui('deleteMusic', {
                                                        playlistId: current + 1,
                                                        musicId: key + 1
                                                    })
                                                }
                                                className="text-white/50 hover:text-white transition-all duration-300 hover:scale-105 select-none cursor-pointer"
                                            />
                                            <FaHeart
                                                onClick={_ =>
                                                    fetchNui(
                                                        favorites.some(
                                                            x => x == data.url
                                                        )
                                                            ? 'removeFavorite'
                                                            : 'addFavorite',
                                                        data.url
                                                    )
                                                }
                                                className={classNames(
                                                    'text-white/50 hover:text-white transition-all duration-300 hover:scale-105 select-none cursor-pointer',
                                                    {
                                                        '!text-white':
                                                            favorites.some(
                                                                x =>
                                                                    x ==
                                                                    data.url
                                                            )
                                                    }
                                                )}
                                            />
                                            <FaPlay
                                                onClick={_ =>
                                                    fetchNui('playMusic', {
                                                        url: data.url,
                                                        musicId: key + 1,
                                                        playlistId: current + 1
                                                    })
                                                }
                                                className="text-white/50 hover:text-white transition-all duration-300 hover:scale-105 select-none cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>
                <AnimatePresence>
                    {modal && (
                        <Modal
                            modal={modal}
                            playlists={playlists}
                            setModal={setModal}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const Modal = ({ modal, playlists, setModal }) => {
    const { lang } = useLang();
    const [input, setInput] = useState(playlists[modal?.current]?.label ?? '');
    return (
        <>
            <m.div
                onClick={_ => setModal(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-0 w-full h-full bg-black/50 rounded-xl z-40"
            />
            <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute left-0 top-0 right-0 bottom-0 m-auto w-3/4 h-min p-2 z-50 bg-[#2E2E2E] rounded-xl flex flex-col items-center"
            >
                <p className="text-center text-white font-pp font-semibold">
                    {modal.type == 'delete' ? lang.areYouSure : lang.edit}
                </p>

                {modal.type == 'edit' && (
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="w-full h-8 rounded-xl bg-transparent outline-none text-white font-pp text-xs px-3 border border-white/10 mt-2"
                    />
                )}

                <div className="w-full h-8 flex gap-x-2 items-center mt-2 relative">
                    <button
                        onClick={_ => {
                            fetchNui(modal.type + 'Playlist', {
                                id: modal.current,
                                input
                            });
                            setModal(null);
                        }}
                        className="w-full h-full transition-all duration-300 hover:scale-95 bg-[#1E1E1E] rounded-xl text-white font-pp font-medium text-xs"
                    >
                        {lang.accept}
                    </button>
                    <button
                        onClick={_ => setModal(null)}
                        className="w-full h-full transition-all duration-300 hover:scale-95 bg-[#D72222]/20 rounded-xl text-white font-pp font-medium text-xs"
                    >
                        {lang.close}
                    </button>
                </div>
            </m.div>
        </>
    );
};
