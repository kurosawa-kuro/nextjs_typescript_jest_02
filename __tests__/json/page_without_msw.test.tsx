import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PostsPage from '../../src/app/json/page';
import axios from 'axios';

// Setup Axios mock
const axiosMock = axios as jest.Mocked<typeof axios>;

jest.mock('axios');
axiosMock.get.mockResolvedValue({ data: [] });

describe('PostsPage', () => {
  const mockPosts = [
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
    }
  ];

  it('fetches and displays posts', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: mockPosts });

    render(<PostsPage />);
    
    // Wait until the posts are displayed
    for (let post of mockPosts) {
      await waitFor(() => screen.getByText(post.title));
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    }
  });
});
