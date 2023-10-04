import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Rick from './Rickhead';
import Morty from './Mortyhead';
import '../css/list.css'

const GET_EPISODES = gql`
  query {
    episodes {
      results {
        id
        name
        episode
        air_date
        characters {
          name
        }
      }
    }
  }
`;

const GET_CHARACTERS_BY_EPISODE = gql`
  query GetEpisodeById($idEpisode: ID!) {
    episode(id: $idEpisode) {
      id
      name
      episode
      air_date
      characters {
        name
      }
    }
  }
`;



function EpisodeList( {client} ) {
  const { loading, error, data } = useQuery(GET_EPISODES);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  var animationClass = isAnimating && (selectedEpisode != null) ? 'slide-left' : 'slide-right';
  if (selectedEpisode === null) {
    animationClass = '';
  }

  const HandleAnimationClick = async (idEpisode) => {
    if (selectedEpisode === null || (selectedEpisode.id != null && idEpisode === selectedEpisode.id)) {
      setIsAnimating((prevIsAnimating) => !prevIsAnimating);
    } else if (selectedEpisode != null) {
    }
    
    try {
      const { data: dataChar } = await client.query({
        query: GET_CHARACTERS_BY_EPISODE,
        variables: { idEpisode },
      });
      setSelectedEpisode(dataChar.episode);
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  };

  const displayCharacter = isAnimating ? '' : 'displayNone';
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Rick and Morty Episodes</h1>
      <Rick />
      <Morty />
      <div class="contentList">
        <div class={`list ${animationClass}`}>
              {data.episodes.results.map((episode) => (
                  <h2 onClick={() => HandleAnimationClick(episode.id)}>
                      {episode.name}
                  </h2>
              ))}
        </div>
        {selectedEpisode && (
          <div class={`listCharacter ${displayCharacter}`}>
            <h1>Episode: {selectedEpisode.episode}</h1>
            <h2>Date: {selectedEpisode.air_date}</h2>
            <h2>Characters:</h2>
              {selectedEpisode.characters.map((character) => (
                  <h3>{character.name}</h3>
              ))}
        </div>
        )}
      </div>
    </div>
  );
}

export default EpisodeList;
