import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node'; // MSW (Mock Service Worker) によるモックサーバのセットアップ
import { rest } from 'msw';
import Page from '../../src/app/json/page';

// テスト用のダミーデータ
const data = [
  { userId: 1, id: 1, title: "Sample title 1", body: "Sample body 1" },
  { userId: 2, id: 2, title: "Sample title 2", body: "Sample body 2" }
];

// MSWを使用してAPIリクエストをモックするハンドラの設定
const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => res(ctx.json(data)))
];

// モックサーバの初期化
const server = setupServer(...handlers);

describe('Page', () => {
  // テストの前にモックサーバを起動し、後処理を行う設定
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('displays data', async () => {
    render(<Page />); // コンポーネントをレンダリング
    for (let item of data) {
      await waitFor(() => screen.getByText(item.title)); // タイトルが表示されるまで待機
      // レンダリングされたコンポーネント内にテキストが存在することを検証
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.body)).toBeInTheDocument();
    }
  });
});
