import './MusicItem.css';

function MusicItem(props) {
    const { 
        trackName,           // Название песни
        collectionName,      // Название альбома
        artistName,          // Исполнитель
        trackId,
        artworkUrl100,       // Обложка
        releaseDate,         // Дата 
        primaryGenreName,    // Жанр
        kind                 // Тип 
    } = props;

    
    let title = trackName || collectionName || artistName || "Без названия";
    let year = releaseDate ? new Date(releaseDate).getFullYear() : "Неизвестно";
    let type = kind || (props.wrapperType === 'artist' ? 'artist' : 
                         props.collectionType ? 'album' : 'song');

    return (
        <div className='music-card'>
            <img src={artworkUrl100 || 'https://via.placeholder.com/100x100?text=No+Image'} alt={title} />
            <div className='music-info'>
                <h3>{title}</h3>
                <p className='artist'>{artistName}</p>
                <p className='details'>
                    <span className='year'>{year}</span>
                    <span className='genre'>{primaryGenreName || 'Unknown genre'}</span>
                    <span className='type'>{type}</span>
                </p>
            </div>
        </div>
    )
}
export default MusicItem;