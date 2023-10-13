// __tests__/json/page_without_msw.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PostsPage from '../../src/app/json/page';
import axios from 'axios';

// Setup Axios mock
const axiosMock = axios as jest.Mocked<typeof axios>;

jest.mock('axios');

describe('PostsPage', () => {
  const posts = [
    { userId: 1, id: 1, title: "Sample title 1", body: "Sample body 1" },
    { userId: 2, id: 2, title: "Sample title 2", body: "Sample body 2" }
  ];

  it('fetches and displays posts', async () => {
    axiosMock.get.mockImplementationOnce((url) => {
      if (url === 'https://jsonplaceholder.typicode.com/posts') {
        return Promise.resolve({ data: posts });
      }
      return Promise.reject(new Error('Not found'));
    });

    render(<PostsPage />);
    
    // Wait until the posts are displayed
    for (let post of posts) {
      await waitFor(() => screen.getByText(post.title));
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    }
  });
});
