import Button from '../components/Button.jsx';

const ArticlePage = () => {
    const articles = [
        {
            id: 1,
            title: "The Future of UI Design: Trends to Watch in 2024",
            excerpt: "Explore emerging design patterns, AI-powered tools, and user-centric approaches shaping the next generation of digital interfaces.",
            category: "Design Trends",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop"
        },
        {
            id: 2,
            title: "Mastering Responsive Layouts with CSS Grid",
            excerpt: "Learn advanced techniques for creating flexible, adaptive layouts that work seamlessly across all device sizes and screen resolutions.",
            category: "Development",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop"
        },
        {
            id: 3,
            title: "Design Systems: Building Consistency at Scale",
            excerpt: "How to create and maintain design systems that streamline workflows and ensure visual consistency across products.",
            category: "Design Systems",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop"
        },
        {
            id: 4,
            title: "Accessibility in Design: A Practical Guide",
            excerpt: "Essential principles and techniques for creating inclusive digital experiences that work for everyone.",
            category: "Accessibility",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop"
        },
        {
            id: 5,
            title: "The Psychology of Color in Web Design",
            excerpt: "Understanding how color choices impact user behavior, emotions, and decision-making in digital products.",
            category: "Color Theory",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop"
        },
        {
            id: 6,
            title: "Prototyping Best Practices for UX Designers",
            excerpt: "Streamline your prototyping process with these proven techniques and tools for effective user testing.",
            category: "UX Design",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop"
        },
        {
            id: 7,
            title: "From Wireframe to Code: Bridging the Gap",
            excerpt: "Strategies for smoother handoffs between designers and developers to bring designs to life efficiently.",
            category: "Development",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
        },
        {
            id: 8,
            title: "Micro-interactions That Delight Users",
            excerpt: "Small details that make a big difference in user experience and engagement.",
            category: "Interaction Design",
            readTime: "3 min read",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
        }
    ];

    return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Resource Library
        </p>
        <h1 className="max-w-2xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Insights, tutorials, and inspiration for modern designers
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Dive into our collection of articles covering design trends, development techniques, 
          and creative strategies to level up your skills.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Latest Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">What's new in design</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article key={article.id} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  {article.category}
                </p>
                <p className="text-[10px] text-zinc-400">{article.readTime}</p>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 line-clamp-2">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 line-clamp-3 flex-grow">
                {article.excerpt}
              </p>
              <Button className="mt-4 w-full">Read Article →</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
    );
};

export default ArticlePage;