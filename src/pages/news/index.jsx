import { useState } from 'react';
import { client } from '@/lib/contentful/client';
import NewsCard from '@/components/news/NewsCard';

const News = ({ allNews, total }) => {
  const pageSize = 4;
  const [newsItems, setNewsItems] = useState(allNews.slice(0, 4));
  const [loadedCount, setLoadedCount] = useState(4);
  const [loading, setLoading] = useState(false);

  // Function to load more news items
  const loadMoreNews = () => {
    setLoading(true);
    setTimeout(() => {
      setNewsItems(allNews.slice(0, loadedCount + pageSize));
      setLoadedCount(loadedCount + pageSize);
      setLoading(false);
    }, 500);
  };

  return (
    <section className='section'>
      <div className='container'>

        <div className="title-block text-center my-8">
          <h2 className="title-block__title text-3xl text-gray-800 inline-block">All News</h2>
          <div className="mt-2 w-16 mx-auto border-b-2 border-gray-800"></div>
        </div>

        <div className="filter-news flex flex-col lg:flex-row items-center justify-center gap-4 mb-6">
          <strong className="filter__text text-lg font-semibold">Filter By:</strong>
          <div data-load-filter="" className="select-group flex flex-col lg:flex-row gap-4">
            <div className="customize-select">
              <label htmlFor="all-categories" className="hidden">All Categories</label>
              <select name="CategoryId" id="all-categories" className="customize-select__controll border border-gray-300 rounded-md py-2 px-4 w-full lg:w-auto bg-white">
                <option value="">All Categories</option>
                <option value="{69BC11F2-0D72-45A7-BAFD-7F01967309B3}">Financial Press Release</option>
                <option value="{7BA688E7-2832-45D3-9822-012E82EB6361}">Group News</option>
                <option value="{10DF1D88-37D3-4AA1-9844-8F2B6C24F8E5}">Group Press Release</option>
                <option value="{06A2EEB0-512F-4805-9B6F-27FB6A62853A}">People</option>
                <option value="{C24AB6F6-D5F0-42CA-83FC-180F5970DEB2}">Sustainable Procurement Charter</option>
              </select>
            </div>

            <div className="customize-select">
              <label htmlFor="all-categoryTypes" className="hidden">All Types</label>
              <select name="TypeId" id="all-categoryTypes" className="customize-select__controll border border-gray-300 rounded-md py-2 px-4 w-full lg:w-auto bg-white">
                <option value="">All Types</option>
              </select>
            </div>

            <div className="customize-select">
              <label htmlFor="most-recent" className="hidden">All years</label>
              <select name="Year" id="most-recent" className="customize-select__controll border border-gray-300 rounded-md py-2 px-4 w-full lg:w-auto bg-white">
                <option value="">All years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </div>
          </div>

          <span className="mt-2 lg:mt-0">
            <strong className="filter__results text-lg font-semibold" data-load-total="">{total}</strong>
            <strong data-result-text="" className="filter__results text-lg">&nbsp;results</strong>
          </span>
        </div>

        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-10'>
          {newsItems.map((item) => (
            <NewsCard key={item.fields.slug} item={item} />
          ))}
        </ul>

        {loadedCount < total && (
          <div className='text-center mt-8'>
            <button 
              className='bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition' 
              onClick={loadMoreNews}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: 'news' });
  const total = response.total;

  return {
    props: {
      allNews: response.items,
      total,
      revalidate: 60,
    },
  };
};

export default News;
