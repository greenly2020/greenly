import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { MainLayout } from '@/layout/MainLayout';
import { CATEGORIES } from '@/modules/articleEditor/constants';
import TopArticles from '@/modules/articles/TopArticles';
import { Browse } from '@/modules/browse';
import { Seo } from '@/uiCore/components/Seo';

interface BrowseCategoryPageProps {
  category: string;
  label: string;
  description: string;
}

export const BrowseCategoryPage = ({
  category,
  label,
  description,
}: BrowseCategoryPageProps) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return null;
  }

  return (
    <>
      <Seo
        title={label}
        description={description}
        path={`/browse/${category}`}
      />
      <MainLayout mailForm={false}>
        <>
          <Browse category={category} />
          <TopArticles />
        </>
      </MainLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: CATEGORIES.map(({ value }) => ({ params: { category: value } })),
    // Any category not in CATEGORIES 404s instead of silently rendering blank.
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BrowseCategoryPageProps> = async ({
  params,
}) => {
  const category = params?.category as string;
  const activeCategory = CATEGORIES.find((cat) => cat.value === category);

  if (!activeCategory) {
    return { notFound: true };
  }

  return {
    props: {
      category: activeCategory.value,
      label: activeCategory.label,
      description: activeCategory.description,
    },
  };
};

export default BrowseCategoryPage;
