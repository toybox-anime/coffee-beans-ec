# ☕ Specialty Coffee Explorer

高品質なスペシャルティコーヒー豆を探索・購入できる EC アプリケーション。

## 📋 概要

**Specialty Coffee Explorer** は、コーヒー愛好家向けの最新スタック EC サイトです。商品検索、カート管理、注文履歴の確認がシームレスに行えます。

### 主な機能

- 🔍 **商品検索** — コーヒー豆の名前で即座に検索
- 🛒 **カート機能** — 商品を追加・削除・管理
- 📦 **商品詳細** — 産地、焙煎度、フレーバーノートを表示
- 📜 **注文履歴** — 購入済み注文の確認
- 🎨 **レスポンシブ UI** — Tailwind CSS で快適な表示

## 🛠️ 技術スタック

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Next.js** | 16.1.6 | フロントエンド・フルスタック |
| **React** | 19.2.3 | UI ライブラリ |
| **TypeScript** | 5 | 型安全性 |
| **Tailwind CSS** | 4 | スタイリング |
| **Prisma** | 6.19.2 | ORM（DB 操作） |
| **Zustand** | 5.0.11 | 状態管理 |
| **Zod** | 最新 | バリデーション |
| **react-hot-toast** | 最新 | トースト通知 |

## 🚀 セットアップ

### 前提条件
- Node.js 18+ 
- npm または yarn

### インストール手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/toybox-anime/coffee-beans-ec.git
cd coffee-beans-ec/specialty-coffee-explorer

# 2. 依存関係をインストール
npm install

# 3. 環境変数を設定
cp .env.example .env.local

# 4. データベーススキーマを初期化
npx prisma db push

# 5. 開発サーバーを起動
npm run dev
```

開発サーバーは `http://localhost:3000` で起動します。

## 📁 ディレクトリ構成

```
specialty-coffee-explorer/
├── app/                  # Next.js App Router
│   ├── page.tsx         # トップページ（商品一覧・検索）
│   ├── cart/page.tsx    # カート画面（カート管理、決済）
│   ├── orders/page.tsx  # 注文履歴（Server Component）
│   ├── products/[id]/page.tsx  # 商品詳細
│   ├── layout.tsx       # ルートレイアウト
│   ├── error.tsx        # グローバルエラーバウンダリ
│   ├── loading.tsx      # ローディング UI
│   └── not-found.tsx    # 404 ページ
├── components/          # 再利用可能コンポーネント
│   ├── Header.tsx       # ナビゲーションバー
│   ├── AddToCartButton.tsx  # カート追加ボタン
│   ├── Search.tsx       # 検索コンポーネント
│   └── Toast.tsx        # トースト通知プロバイダ
├── lib/
│   ├── data.ts          # モック商品データ
│   ├── prisma.ts        # Prisma クライアント
│   └── schemas.ts       # Zod バリデーションスキーマ
├── store/
│   └── cartStore.ts     # Zustand カート状態
├── actions/
│   └── checkout.ts      # Server Action（決済処理）
├── prisma/
│   └── schema.prisma    # Prisma スキーマ
└── package.json         # 依存関係
