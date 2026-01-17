import '@testing-library/jest-dom';
import { server } from './mocks/node';
import { beforeAll, afterAll, afterEach } from 'vitest';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
