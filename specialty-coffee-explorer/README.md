# ☕ Specialty Coffee Explorer

Next.js (App Router) と Prisma を活用した、型安全でモダンなフルスタックECアプリケーションです。
Java/Scala エンジニアとしての設計思想を、TypeScript のエコシステムで表現しました。

## 🌟 主な機能
- **商品一覧・検索**: リアルタイムなフィルタリング機能。
- **商品詳細**: 動的ルーティングによる詳細情報表示。
- **カート機能**: Zustand を活用した、ページを跨いでも保持される状態管理。
- **注文処理**: Server Actions を用いた、データベース（PostgreSQL）への非同期保存。
- **ローディング・エラー制御**: `loading.tsx` や `not-found.tsx` による一貫したユーザー体験。

## 🛠️ 技術スタック
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Zustand
- **Backend**: Next.js Server Actions, Zod (バリデーション)
- **Database**: PostgreSQL (Neon), Prisma (ORM)
- **Deployment**: Vercel

## 📂 フォルダ構造の解説
- `actions/`: ビジネスロジック（注文処理など）
- `app/`: ルーティングとUIコンポーネント
- `components/`: 再利用可能なUIパーツ
- `lib/`: Prismaクライアントやデータ定義
- `store/`: グローバルな状態管理

## 🚀 ローカル開発手順
1. 依存関係のインストール: `npm install`
2. データベース同期: `npx prisma db push`
3. 開発サーバー起動: `npm run dev`

![alt text][def]

[def]: image.png