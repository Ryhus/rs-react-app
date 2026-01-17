import { Component } from 'react';
import PopUpMessage from '../PopUpMessage/PopUpMessage';
import {
  searchBreeds,
  getAllBreeds,
} from '../../Services/DogService/DogService';

import type { Breed } from '../../Services/DogService/types';
import type { FormEvent, ChangeEvent } from 'react';

import './SearchFormStyles.scss';

interface SearchFormState {
  input: string;
  error: string;
}

interface SearchFormProps {
  onSearch: (breeds: Breed[]) => void;
}

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);

    const lastTerm = localStorage.getItem('lastSearchTerm') || '';

    this.state = {
      input: lastTerm,
      error: '',
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value, error: '' });
  };

  handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { input } = this.state;
    const trimmedInput = input.trim();

    this.setState({ error: '' });

    localStorage.setItem('lastSearchTerm', trimmedInput);
    console.log(trimmedInput);
    try {
      if (trimmedInput === '') {
        const breedList = await getAllBreeds();
        this.props.onSearch(breedList);
      } else {
        const foundBreeds = await searchBreeds(trimmedInput);
        this.props.onSearch(foundBreeds);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({
          error: 'Failed to load dog breeds. Please try again later.',
        });
      } else {
        this.setState({
          error: 'Something went wrong. Please try again.',
        });
      }
    }
  };

  handleClear = () => {
    this.setState({ input: '', error: '' });
  };

  render(): React.ReactNode {
    const { input, error } = this.state;

    return (
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <span>🔍</span>
        <input
          type="text"
          name="breed"
          value={input}
          onChange={this.handleChange}
        />
        <button type="button" className="clear-btn" onClick={this.handleClear}>
          ✖
        </button>
        <button type="submit" className="submit-btn">
          Search
        </button>
        {error && (
          <PopUpMessage
            message={error}
            onClose={() => this.setState({ error: '' })}
          />
        )}
      </form>
    );
  }
}

export default SearchForm;
