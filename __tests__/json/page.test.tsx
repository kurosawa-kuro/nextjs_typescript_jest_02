import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Page from '../../src/app/json/page';

const data = [
  { userId: 1, id: 1, title: "Sample title 1", body: "Sample body 1" },
  { userId: 2, id: 2, title: "Sample title 2", body: "Sample body 2" }
];

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => res(ctx.json(data)))
];

const server = setupServer(...handlers);

describe('Page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('displays data', async () => {
    render(<Page />);
    for (let item of data) {
      await waitFor(() => screen.getByText(item.title));
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.body)).toBeInTheDocument();
    }
  });
});
