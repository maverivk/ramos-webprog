import { useParams, Navigate } from 'react-router-dom';
import { useArticles } from '../../contexts/ArticleContext';
import Button from '../../components/Button';

const ArticlePage = () => {
  const { name } = useParams();
  const { getArticleBySlug } = useArticles();
  const article = getArticleBySlug(name);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Article
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-6">
          <Button to="/articles">← Back to Articles</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {article.image && (
            <div className="mb-8 overflow-hidden rounded-xl">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-zinc max-w-none">
            {article.content.map((paragraph, index) => (
              <p key={index} className="mb-4 text-base leading-7 text-zinc-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;