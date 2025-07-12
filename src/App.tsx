import React, { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import BreedList from './components/BreedList/BreedList';
import { getAllBreeds } from './Services/DogService/DogService';
import Loader from './components/Loader/Loader';
import type { Breed } from './Services/DogService/types';

import './styles/main.scss';

interface AppState {
  breeds: Breed[];
  loading: boolean;
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    breeds: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const breeds = await getAllBreeds();
      this.setState({ breeds });
    } catch (error) {
      console.error('Failed to fetch breeds on load', error);
    } finally {
      this.setState({ loading: false });
    }
  }

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
