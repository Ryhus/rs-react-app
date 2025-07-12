import React, { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import BreedList from './components/BreedList/BreedList';
import type { Breed } from './Services/DogService/types';

import './styles/main.scss';
import Loader from './components/Loader/Loader';

interface AppState {
  breeds: Breed[];
  loading: boolean;
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    breeds: [],
    loading: false,
  };

  handleSearch = async (breeds: Breed[]) => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ breeds, loading: false });
    }, 500);
  };

  render(): React.ReactNode {
    const { loading, breeds } = this.state;
    return (
      <div className="app-layout">
        <SearchForm onSearch={this.handleSearch} />
        {loading ? <Loader /> : <BreedList breeds={breeds} />}
      </div>
    );
  }
}

export default App;
