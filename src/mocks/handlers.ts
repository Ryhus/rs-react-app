import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.thedogapi.com/v1/breeds', () => {
    return HttpResponse.json([
      { id: '1', name: 'Corgi' },
      { id: '2', name: 'Dog' },
    ]);
  }),

  http.get('https://api.thedogapi.com/v1/breeds/search', () => {
    return HttpResponse.json([{ id: '1', name: 'Corgi' }]);
  }),
];
