import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import PostsClientComponent from '../../src/app/json/page';

// MSWのハンドラを定義
const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "Sample title 1",
          body: "Sample body 1"
        },
        {
          userId: 2,
          id: 2,
          title: "Sample title 2",
          body: "Sample body 2"
        },
      ])
    );
  })
];

// MSWのサーバーをセットアップ
const server = setupServer(...handlers);

describe('PostsClientComponent', () => {
  // Jestのセットアップとクリーンアップ
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('fetches and displays posts', async () => {
    render(<PostsClientComponent />);
    
    // Wait for Axios response
    await waitFor(() => screen.getByText("Sample title 1"));

    expect(screen.getByText("Sample title 1")).toBeInTheDocument();
    expect(screen.getByText("Sample body 1")).toBeInTheDocument();
    expect(screen.getByText("Sample title 2")).toBeInTheDocument();
    expect(screen.getByText("Sample body 2")).toBeInTheDocument();
  });
});
