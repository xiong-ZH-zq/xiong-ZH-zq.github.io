import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [Component.Comments({
    provider: 'giscus',
    options: {
      // from data-repo
      repo: 'xiong-ZH-zq/xiong-ZH-zq.github.io',
      // from data-repo-id
      repoId: 'R_kgDON7AUfw',
      // from data-category
      category: 'Announcements',
      // from data-category-id
      categoryId: 'DIC_kwDON7AUf84CnEJY',
      lightTheme: "light_high_contrast", // corresponds to light-theme.css in quartz/static/giscus/
      darkTheme: "dark_dimmed", // corresponds to dark-theme.css quartz/static/giscus/
    }
  }),],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/xiong-ZH-zq",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer(),
  ],
  right: [],
}
