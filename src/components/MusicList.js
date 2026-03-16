import './MusicList.css';
import MusicItem from './MusicItem.js';

function MusicList(props) {
    const { music = [] } = props;
    return (
        <div className='music-list'>
            {
                music.length ? music.map
                    (
                        item => {
                            return <MusicItem key={item.trackId || item.collectionId || item.artistId} {...item} />
                        }
                    )
                    : <h4>Ничего не найдено</h4>
            }
        </div>
    )
}
export default MusicList;