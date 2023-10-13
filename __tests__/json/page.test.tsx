// __tests__/json/page.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import PostsPage from '../../src/app/json/page';

const posts = [
  { userId: 1, id: 1, title: "Sample title 1", body: "Sample body 1" },
  { userId: 2, id: 2, title: "Sample title 2", body: "Sample body 2" }
];

// Define mock server handlers
const postHandlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    return res(
      ctx.json(posts)
    );
  })
];

// Initialize mock server
const mockServer = setupServer(...postHandlers);

describe('PostsPage', () => {
  // Setup and cleanup for Jest tests with mock server
  beforeAll(() => mockServer.listen());
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  it('should display fetched posts', async () => {
    render(<PostsPage />);
    
    // Wait for the mocked API call to resolve and render
    for (let post of posts) {
      await waitFor(() => screen.getByText(post.title));
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    }
  });
});
