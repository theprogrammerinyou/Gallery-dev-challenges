import { useState, useEffect, Fragment } from 'react';
import './homepage.css';
import { Sidebar, NewPostModal } from '../../components';
import { posts, suggestions } from '../../utility/constants';
import trending from '../../assets/trending.webp';
import sort from '../../assets/sort.webp';
import { useTheme } from '../../context';

export default function Homepage() {
  const { theme, newPostModal, setNewPostModal } = useTheme();
  const [renderedPosts, setRenderedPosts] = useState([]);
  const [filters, setFilters] = useState({
    sortBydate: false,
    sortByMostLiked: false
  });

  useEffect(() => {
    const { sortBydate, sortByMostLiked } = filters;
    let tempList = [...posts];
    if (sortBydate) {
      tempList = tempList.sort((a, b) => b.dateOfCreation - a.dateOfCreation);
    }
    if (sortByMostLiked) {
      tempList = tempList.filter((e) => e.likes > 5);
    }
    setRenderedPosts(tempList);
  }, [filters]);

  return (
    <Fragment>
      {newPostModal && <NewPostModal setNewPostModal={setNewPostModal} />}
      <div className='main__grid'>
        <Sidebar />
        <div className='main'>
          <div className='aside-left'>
            {renderedPosts.map((elem) => {
              return (
                <div
                  key={elem._id}
                  className={`post ${theme === 'dark' && 'darktheme'}`}
                >
                  <div className='post__header'>
                    <img src={elem.profilePic} alt='profilepic' />
                    <div>
                      <h1>{elem.username}</h1>
                      <h2>{elem.userId}</h2>
                    </div>
                  </div>
                  {elem.banner && (
                    <div className='post__banner__ctr'>
                      <img
                        src={elem.banner}
                        className='post__banner'
                        alt='banner'
                      />
                    </div>
                  )}
                  <h1 className='post__title'>{elem.title}</h1>
                  <p className='post__paragraph'>{elem.description}</p>
                  <div className='post__cta'>
                    <span>
                      <i
                        className={`
                      tertiary ${
                        elem.likes
                          ? 'fa-solid fa-heart liked'
                          : 'fa-regular fa-heart'
                      } `}
                      ></i>{' '}
                      {elem.likes > 0 ? elem.likes : ''}
                    </span>
                    <span>
                      <i className='tertiary fa-regular fa-comment'></i>{' '}
                      {elem.comments > 0 ? elem.comments : ''}
                    </span>
                    <span>
                      <i
                        className={`tertiary ${
                          elem.bookmarked
                            ? 'fa-solid fa-bookmark'
                            : 'fa-regular fa-bookmark'
                        } `}
                      ></i>{' '}
                      {elem.bookmarked}
                    </span>
                    <span>
                      <i className='tertiary fa-solid fa-share-nodes'></i>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='aside-right'>
            <div className='aside'>
              <button
                className='aside__options'
                onClick={() =>
                  setFilters({
                    ...filters,
                    sortByMostLiked: !filters.sortByMostLiked
                  })
                }
              >
                <img
                  src={trending}
                  alt='icon'
                  className='aside__option__image'
                />
                <span className='aside__options__span'>
                  {filters.sortByMostLiked ? 'Show All Posts' : "What's new !"}
                </span>
              </button>
              <button
                className='aside__options'
                onClick={() => setFilters({ ...filters, sortBydate: true })}
              >
                <img src={sort} alt='icon' className='aside__option__image' />
                <span className='aside__options__span'>Latest Posts</span>
              </button>
              <div className='suggestions__ctr'>
                <h1 className='suggestion__header'>Suggestions for you</h1>
                <ul className='suggestions'>
                  {suggestions.map((elem) => {
                    return (
                      <li
                        key={elem.id}
                        className={`post__header suggestion ${
                          theme === 'dark' && 'darktheme'
                        }`}
                      >
                        <img src={elem.profilePic} alt='profilePic' />
                        <div>
                          <h1>{elem.name}</h1>
                          <h2>{elem.userId}</h2>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </Fragment>
  );
}
