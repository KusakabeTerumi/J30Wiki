import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// ユーザー指定の公開先。大文字を含むリポジトリ名に一致させる。
const site = process.env.SITE_URL || 'https://kusakabeterumi.github.io';
const base = process.env.BASE_PATH || '/J30Wiki/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [starlight({
    title: 'J30 アライアンスWiki',
    description: 'ザ・アンツ非公式。自由とプレイスタイルを尊重するJ30の紹介・参加案内・攻略資料。',
    locales: { root: { label: '日本語', lang: 'ja' } },
    customCss: ['./src/styles/custom.css'],
    components: { Footer: './src/components/Footer.astro' },
    sidebar: [
      { label: 'トップ', slug: '' },
      { label: 'J30の紹介・加入案内', slug: 'about' },
      { label: 'アライアンス規約・襲撃ルール', slug: 'rules' },
      { label: 'イベント情報・参加方法', slug: 'events' },
      { label: '初心者案内', slug: 'beginners' },
      { label: '攻略ガイド', slug: 'guides' },
      { label: 'シーズン攻略', items: [
        { label: 'ロストアイランド', slug: 'seasons' },
        { label: '攻略の考え方', slug: 'policy' },
        { label: '初期配置の考え方', slug: 'starting-position' },
        { label: '外交', slug: 'diplomacy' },
        { label: '参加方法', slug: 'participation' },
        { label: '建設・拠点攻略', slug: 'towers-npc' },
        { label: '資源の準備', slug: 'troops-resources' }
      ] },
      { label: '運営方針・お知らせ・更新履歴', items: [
        { label: '運営方針', slug: 'management' },
        { label: '改訂履歴', slug: 'sources' }
      ] },
      { label: '用語集', slug: 'glossary' }
    ]
  })]
});
