# J30 ロストアイランド攻略Wiki

**公開済み：[J30 ロストアイランド攻略Wiki](https://kusakabeterumi.github.io/J30Wiki/)。** ザ・アンツ運営会社と無関係の非公式ファンWikiです。
Astro Starlight / Markdown / 標準Pagefind検索で構成し、外部フォント・広告・解析・DB・ログイン・外部APIは使用しません。

## セットアップと閲覧

Node.js 24 LTS（最低22.23.4）とnpm 10.8.2以上を推奨します。npmだけを使用し、package-lock.jsonを保存します。

```sh
npm ci
npm run check
npm run build
npm run preview
```

表示されたローカルURLをブラウザで開いてください。検索はビルド後の `preview` で確認します。`dev` では検索インデックスは生成されません。

このWindows環境では通常のNode.jsが古いため、同梱済みランタイムを選ぶ補助スクリプトも用意しています。プロジェクト内のPowerShellで実行します（グローバル設定は変更しません）。

```powershell
.\wiki.ps1 check
.\wiki.ps1 build
.\wiki.ps1 preview
```

初回の依存関係復元は `.\wiki.ps1 install`、編集時の即時プレビューは `.\wiki.ps1 dev`。終了は Ctrl+C。

## 記事の更新

記事は `src/content/docs/*.md`。対応表は [ARTICLE_INDEX.md](./ARTICLE_INDEX.md)。

1. 対象の記事だけを編集します。タイトル・要約は先頭の `title` / `description` に記載。
2. 「決定／検討中／経験談／要確認」を本文で示します。「決定」は正式決定かつ公開許可がある事項のみ。
3. 変更記事の `lastUpdated` と本文の最終更新日を実際の日付へ変更します。原稿確認日・ゲーム内仕様の確認日は別々に管理します。未確認のものを更新日だけで確認済みにしません。
4. 根拠URL、対象シーズン、確認日を追記し、関連ページと `sources.md` の履歴を更新。
5. `npm run check` → `npm run build` → `npm run preview` で確認します。

リンクは記事ページから `../starting-position/` のように相対指定。トップからは `./starting-position/`。先頭 `/` の固定リンクはサブパス公開で壊れるため避けます。
個人名・内部チャット・招待URL・個別外交・戦力一覧・非公開作戦は、記事にもGit履歴にも入れません。元ZIPはプロジェクトの外に保管しています。

## 公開先

リポジトリ：[KusakabeTerumi/J30Wiki](https://github.com/KusakabeTerumi/J30Wiki)。
公開URL：[https://kusakabeterumi.github.io/J30Wiki/](https://kusakabeterumi.github.io/J30Wiki/)。
GitHub Actionsによるビルド・公開と、全9ページ・日本語検索を確認済みです。

## 内容を更新するときの確認

- 初期配置・外交・運営方針の現在の状態と、全9記事の公開内容をユーザーが最終確認。
- ゲームの一次資料URL・対象シーズン・仕様の数値は未確認です。未確認ラベルを維持するか、確認結果を反映。
- 更新時はGitHubへの有効な認証と対象リポジトリの操作権限が必要です。
- 公開用設定は `site: https://kusakabeterumi.github.io`、`base: /J30Wiki/`。公開確認済み。

## GitHub Pagesの公開・更新手順

**この `j30-wiki` フォルダの中身だけ**を公開リポジトリのルートに配置しています。親フォルダの元資料や `.work-state` は送信しません。

1. 初回リポジトリ作成・ソースとlockfileの反映は完了。以後は対象記事だけを更新します。`node_modules` / `dist` / `.env` は除外。
2. Settings → Pages → Build and deployment → Source は **GitHub Actions** に設定済みです。
3. 公開設定を確認します。ワークフローには `SITE_URL: https://kusakabeterumi.github.io`、`BASE_PATH: /J30Wiki/` を設定済みで、リポジトリ変数の追加は不要です。
4. Actions → Deploy J30 Wiki to GitHub Pages → Run workflow。
5. 完了したデプロイのURLで検索・全ページ・配色・スマホナビを確認します。

ワークフローは誤公開を避けるため手動起動のみです。公開先の既定値は指定されたリポジトリに固定しています。継続更新の自動公開が必要なら、承認後にpushトリガーを追加できます。

GitHubのWebエディタで更新する場合：対象のMarkdownを開く → 鉛筆ボタン → 編集 → 差分確認 → コミット → Actionsの手動起動。公開リポジトリは記事だけでなくソースと履歴も誰でも読めます。

## サブパスのローカル検証

```powershell
$env:BASE_PATH = '/J30Wiki/'
.\wiki.ps1 build
.\wiki.ps1 preview
# 表示されたホストの /J30Wiki/ を開く
# 終了後、設定を解除
Remove-Item Env:BASE_PATH
```

## 無料枠と制約

GitHub Freeの公開リポジトリとGitHub Pagesを想定。独自ドメイン・有料サービスは不要です。Pagesには容量・帯域・ビルドなどの利用制限があり、プランや条件は変わり得るため、公開時に[GitHub公式資料](https://docs.github.com/en/pages/getting-started-with-github-pages)を確認してください。無料で無制限とは扱いません。

ゲーム内の現行仕様はローカルビルドでは検証できません。UI検証の実施範囲は [VALIDATION.md](./VALIDATION.md) を参照。

## 問題の切り分け

- Nodeのバージョンエラー：Node.js 24、または `wiki.ps1` を使用。
- `ENOTFOUND`：npmレジストリへの通信・DNSを確認。別ホスティングへ自動移行しません。
- native bindingの不足：対応Nodeで `npm install` を実行。lockfileを無条件で削除しないでください。
- 検索が使えない：`dev` ではなく、最新ビルドの `preview` か公開ページで確認。
- CSS・検索・リンクが404：`BASE_PATH` と実際のリポジトリ名を照合し、再ビルド。
- 古い検索結果：再ビルド・再デプロイ後にキャッシュを更新。
- 公開URLを変更する場合：`astro.config.mjs` と `.github/workflows/deploy.yml` のsite/baseを同時に変更。

## 実装参考

- [Astro Starlight](https://starlight.astro.build/)
- [Astro公式GitHub Pages手順](https://docs.astro.build/ja/guides/deploy/github/)
- [Material Design 3](https://m3.material.io/)
- [Googleのアクセシブルな文書作成指針](https://developers.google.com/style/accessibility)

上記はUI・実装用の資料であり、ゲーム仕様の出典ではありません。
