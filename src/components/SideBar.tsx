import { useEffect, useState } from 'react';

import { Button } from './Button';
import { api } from '../services/api';
import { Content } from './Content';

import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar() {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  function handleClickButton(genre: GenreResponseProps) {
    setSelectedGenre(genre);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data)
      response.data ? setSelectedGenre(response.data[0]) : {};
    })
  }, []);

  return (
    <>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre)}
              selected={selectedGenre.id === genre.id}
            />
          ))}
        </div>

      </nav>
      <Content 
        id={selectedGenre.id} 
        name={selectedGenre.name} 
        title={selectedGenre.title}  
      />
    </>
  )
}