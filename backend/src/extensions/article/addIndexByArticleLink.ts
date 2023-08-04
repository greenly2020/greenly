export const addIndexByArticleLink = async () => {
  await strapi.db.connection.raw(`  
  CREATE INDEX IF NOT EXISTS articles_link_idx
  ON public.articles USING btree
    (article_link ASC NULLS LAST);`);
};
