import { createContext, useContext, useState, useEffect } from 'react';

// Initial articles data (matching your dashboard format)
const initialArticles = [
  {
    id: 1,
    name: 'react-props-and-styling',
    title: 'Understanding React Props and Styling',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    content: [
      "Props (short for properties) allow you to pass data between components. They are read-only and essential for component reusability.",
      "Example:\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>\n}",
      "React supports multiple styling approaches: inline styles, CSS files, CSS Modules, and styled-components.",
      "Inline Style Example:\nconst style = { color: 'blue' };\n<p style={style}>Styled Text</p>"
    ],
    isPublished: true,
  },
  {
    id: 2,
    name: 'react-functional-components',
    title: 'React Functional Components',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    content: [
      "Functional components are simple JavaScript functions that return JSX.",
      "They are stateless by default but can use hooks like useState and useEffect.",
      "Example:\nfunction HelloWorld() {\n  return <h1>Hello, World!</h1>\n}",
      "They are preferred in modern React apps for simplicity and performance."
    ],
    isPublished: true,
  },
  {
    id: 3,
    name: 'react-component-lifecycle',
    title: 'React Component Lifecycle',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop',
    content: [
      "Class components have lifecycle methods: mounting, updating, unmounting.",
      "Key methods include: componentDidMount, componentDidUpdate, componentWillUnmount.",
      "Functional components use the useEffect hook to mimic lifecycle behavior.",
      "Example:\nuseEffect(() => {\n  console.log('Mounted');\n  return () => console.log('Unmounted');\n});"
    ],
    isPublished: true,
  },
  {
    id: 4,
    name: 'react-routing-basics',
    title: 'React Router Basics',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&h=400&fit=crop',
    content: [
      "React Router allows navigation between pages without a page reload.",
      "Set up routes using BrowserRouter, Routes, and Route components.",
      "Example:\n<Routes>\n  <Route path=\"/\" element={<Home />} />\n  <Route path=\"/about\" element={<About />} />\n</Routes>",
      "Use Link component for navigation:\n<Link to=\"/about\">About</Link>"
    ],
    isPublished: true,
  },
  {
    id: 5,
    name: 'react-state-management',
    title: 'Managing State in React',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    content: [
      "State allows components to keep track of dynamic data.",
      "useState hook lets functional components manage state.",
      "Example:\nconst [count, setCount] = useState(0);",
      "Updating state triggers a re-render with the new value."
    ],
    isPublished: true,
  },
];

const ArticleContext = createContext();

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};

export const ArticleProvider = ({ children }) => {
  // Load from localStorage if available, otherwise use initial data
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  // Save to localStorage whenever articles change
  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  const addArticle = (articleData) => {
    const newId = Math.max(0, ...articles.map(a => a.id), 0) + 1;
    const newArticle = { ...articleData, id: newId };
    setArticles([...articles, newArticle]);
    return newArticle;
  };

  const updateArticle = (id, articleData) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...articleData, id } : article
    ));
  };

  const deleteArticle = (id) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const getArticleBySlug = (slug) => {
    return articles.find(article => article.name === slug && article.isPublished);
  };

  const getPublishedArticles = () => {
    return articles.filter(article => article.isPublished);
  };

  return (
    <ArticleContext.Provider value={{
      articles,
      addArticle,
      updateArticle,
      deleteArticle,
      getArticleBySlug,
      getPublishedArticles,
    }}>
      {children}
    </ArticleContext.Provider>
  );
};