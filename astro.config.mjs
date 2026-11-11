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
    title: 'J30 ロストアイランド攻略Wiki',
    description: 'ザ・アンツ非公式。J30の検討事項と経験談を分けて読む攻略資料。',
    locales: { root: { label: '日本語', lang: 'ja' } },
    customCss: ['./src/styles/custom.css'],
    components: { Footer: './src/components/Footer.astro' },
    sidebar: [
      { label: 'トップ', slug: '' },
      { label: '方針と参加', items: [
        { label: '基本方針', slug: 'policy' },
        { label: '初期配置', slug: 'starting-position' },
        { label: '外交', slug: 'diplomacy' },
        { label: '運営と参加', slug: 'participation' }
      ] },
      { label: '攻略と準備', items: [
        { label: '監視哨とNPC施設', slug: 'towers-npc' },
        { label: 'シーズン兵と資源', slug: 'troops-resources' }
      ] },
      { label: '資料', items: [
        { label: '用語集', slug: 'glossary' },
        { label: '参考資料・更新履歴', slug: 'sources' }
      ] }
    ]
  })]
});
