import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Page from '../../src/app/json/page';
import axios from 'axios';

// axiosのモック化設定
const mock = axios as jest.Mocked<typeof axios>;

// axiosの動作をモックする設定
jest.mock('axios');

describe('Page', () => {
  const data = [
    { userId: 1, id: 1, title: "Sample title 1", body: "Sample body 1" },
    { userId: 2, id: 2, title: "Sample title 2", body: "Sample body 2" }
  ];

  it('fetches data', async () => {
    // API呼び出しの動作をモック化
    mock.get.mockImplementationOnce((url) => {
      if (url === 'https://jsonplaceholder.typicode.com/posts') return Promise.resolve({ data });
      return Promise.reject(new Error('Not found'));
    });

    render(<Page />); // コンポーネントをレンダリング
    
    for (let item of data) {
      await waitFor(() => screen.getByText(item.title)); // タイトルが表示されるまで待機
      // レンダリングされたコンポーネント内にテキストが存在することを検証
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.body)).toBeInTheDocument();
    }
  });
});
