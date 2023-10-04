import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.css';
import './css/rick.css'
import EpisodeList from './front/EpisodeList';


const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <EpisodeList client={client}/>
      </ApolloProvider>
    </div>
  );
}

export default App;
