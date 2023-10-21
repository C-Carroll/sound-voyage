import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import './AlbumPage.css'
import { getAlbum, getSongsOnAlbum } from "../../store/music";
import AlbumPageContent from "../AlbumPageContent";

const AlbumsPage = () => {
    const dispatch = useDispatch()
    const { albumId } = useParams()
    const album = useSelector((state) => state.music.album)
    const songs = useSelector((state) => state.music.songs.Songs)
    console.log(album)

    const [toggleState, setToggleState] = useState(1)

    useEffect(() => {
        dispatch(getAlbum(albumId))
        dispatch(getSongsOnAlbum(albumId))
    }, [dispatch])

    const toggleTab = (id) => {
        setToggleState(id)
    }
    useEffect(() => {
        if (songs){
            setToggleState(songs[0].id)
        }
    }, [songs, setToggleState])

    return (
        <div>
            {album && songs && (
                    <div className="apContainer">
                        <div className="apHeader">
                            <div className="aph1">
                                <div className="apAlbumName">{album.albumName}</div>
                                <div className="apBandName">{album.Artist.name}</div>
                            </div>
                            <div className="apAlbumRating">{album.albumRating}</div>
                        </div>
                        <div className="apMain">
                            <div className="apMainTabs">
                            {songs ?
                            songs.map((song) => (
                                <div className={toggleState === song.id ? "tabs active-tab" : "tabs"}
                                onClick={() => toggleTab(song.id)}
                                >{song.songName}</div>
                            ))
                            : <h3>album has no songs</h3>}
                            </div>
                            <div className="apMainContent">
                                {songs ?
                                (songs.map((song) => (
                                    <div className={toggleState === song.id ? "content active-content" : "content" }
                                    >
                                        <AlbumPageContent song={song} />
                                    </div>
                                )))
                                :<div>... loading</div>}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )

}

export default AlbumsPage
