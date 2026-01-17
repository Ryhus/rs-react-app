import { getAllBreeds, searchBreeds, getBreedById } from '../DogService';
import { server } from '../../../mocks/node';
import { HttpResponse, http } from 'msw';
import { describe, it, expect } from 'vitest';

describe('Dog Service API tests', () => {
  it('fetches all breeds successfully', async () => {
    const breeds = await getAllBreeds();
    expect(breeds).toEqual([
      { id: '1', name: 'Corgi' },
      { id: '2', name: 'Dog' },
    ]);
  });

  it('searches for breeds successfully', async () => {
    const breeds = await searchBreeds('Corgi');
    expect(breeds).toEqual([{ id: '1', name: 'Corgi' }]);
  });

  it('fetches breed by ID successfully', async () => {
    server.use(
      http.get('https://api.thedogapi.com/v1/breeds/1', () =>
        HttpResponse.json({
          id: '1',
          name: 'Corgi',
          origin: 'Wales',
          temperament: 'Alert, Friendly',
        })
      )
    );

    const breed = await getBreedById('1');

    expect(breed).toEqual({
      id: '1',
      name: 'Corgi',
      origin: 'Wales',
      temperament: 'Alert, Friendly',
    });
  });

  it('handles 404 error for getBreedById', async () => {
    server.use(
      http.get('https://api.thedogapi.com/v1/breeds/9999', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    await expect(getBreedById('9999')).rejects.toThrow(
      'API Error: 404 Not Found'
    );
  });

  it('handles 500 error for getBreedById', async () => {
    server.use(
      http.get('https://api.thedogapi.com/v1/breeds/1', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(getBreedById('1')).rejects.toThrow(
      'API Error: 500 Internal Server Error'
    );
  });

  it('handles network error for getBreedById', async () => {
    server.use(
      http.get('https://api.thedogapi.com/v1/breeds/1', () => {
        return HttpResponse.error();
      })
    );

    await expect(getBreedById('1')).rejects.toThrow('No response from server.');
  });

  it('handles 400 error for getAllBreeds', async () => {
    server.use(
      http.get('https://api.thedogapi.com/v1/breeds', () => {
        return new HttpResponse(null, { status: 400 });
      })
    );

    await expect(getAllBreeds()).rejects.toThrow('API Error: 400 Bad Request');
  });

  it('handles 500 error for searchBreeds', async () => {
    server.use(
      http.get('https://api.thedogapi.com/v1/breeds/search', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(searchBreeds('Corgi')).rejects.toThrow(
      'API Error: 500 Internal Server Error'
    );
  });

  it('handles network error for getAllBreeds', async () => {
    server.use(
      http.get('https://api.thedogapi.com/v1/breeds', () => {
        return HttpResponse.error();
      })
    );

    await expect(getAllBreeds()).rejects.toThrow('No response from server.');
  });
});
