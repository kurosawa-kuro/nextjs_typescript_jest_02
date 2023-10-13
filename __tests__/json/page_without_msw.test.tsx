import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostsClientComponent from '../../src/app/json/page';
import axios from 'axios';

// Axios のモックをここで設定
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({ data: [] });

describe('PostsClientComponent', () => {
  it('fetches and displays posts', async () => {
    // Mock successful response from Axios
    mockedAxios.get.mockResolvedValueOnce({
      data: [
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
      ],
    });

    render(<PostsClientComponent />);
    
    // Wait for Axios response
    await waitFor(() => screen.getByText("Sample title 1"));

    expect(screen.getByText("Sample title 1")).toBeInTheDocument();
    expect(screen.getByText("Sample body 1")).toBeInTheDocument();
    expect(screen.getByText("Sample title 2")).toBeInTheDocument();
    expect(screen.getByText("Sample body 2")).toBeInTheDocument();
  });
});
