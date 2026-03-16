import './Main.css';
import React from 'react';
import Preloader from '../components/Preloader.js';
import MusicList from '../components/MusicList.js'; // Переименуем компонент
import Search from '../components/Search.js';

class Main extends React.Component {
    state = {
        music: [], // Изменили с movies на music
        count: 0,
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true });
        // Используем iTunes API для поиска музыки по умолчанию
        fetch('https://itunes.apple.com/search?term=pop&limit=20')
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    music: data.results || [], 
                    count: data.resultCount || 0,
                    loading: false
                });
            })
            .catch(error => {
                console.error('Ошибка загрузки:', error);
                this.setState({ loading: false });
            });
    }

    searchMusic = (str, type = 'all', page = 1) => {
        if (!str.trim()) return; 
        
        this.setState({ loading: true });
        
        // iTunes API не поддерживает пагинацию и типы как в OMDB
        // Поэтому упростим запрос
        let url = `https://itunes.apple.com/search?term=${encodeURIComponent(str)}&limit=20&offset=${(page-1)*20}`;
        
        // Добавляем фильтрацию по типу контента
        if (type === 'song') {
            url += '&media=music&entity=song';
        } else if (type === 'album') {
            url += '&media=music&entity=album';
        } else if (type === 'artist') {
            url += '&media=music&entity=musicArtist';
        } else {
            url += '&media=music';
        }
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    music: data.results || [], 
                    count: data.resultCount || 0,
                    loading: false
                });
            })
            .catch(error => {
                console.error('Ошибка поиска:', error);
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div className='main'>
                <Search 
                    searchMusic={this.searchMusic} // Изменили название пропса
                    totalCount={this.state.count} 
                />
                <div className='wrap'>
                    {this.state.loading ? (
                        <Preloader />
                    ) : (
                        <>
                            {this.state.music && this.state.music.length > 0 ? (
                                <MusicList music={this.state.music} /> // Изменили компонент
                            ) : (
                                <div className="no-results">Музыка не найдена</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        )
    }
}

export default Main;