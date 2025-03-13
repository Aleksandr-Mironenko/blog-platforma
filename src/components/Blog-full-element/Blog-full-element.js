import image from './image.png'
import style from './index.module.scss'
const BlogFullElement = ({
  tagList = [],
  title,
  favoritesCount,
  authorUserName,
  createdAt,
  authorImage,
  // authorFollowing,
  // favorited,
  postAbbreviated = '',
  postFull = '',
  updatedAt,
}) => {
  console.log(tagList, postAbbreviated)
  const tags = tagList.map((item, index) => {
    if (item === ' ') {
      item = ''
    }
    return (
      <div className={style.tag} key={index}>
        {item}
      </div>
    )
  })

  return (
    <div className={style.blog_full_element}>
      <div className={style.info}>
        <div className={style.left}>
          <div className={style.title_sting}>
            <div className={style.title}>{title}</div>

            <div className={style.favorites}>
              <img alt="heart" src={image} className={style.heart} />
              <div className={style.favorites_count}>{favoritesCount}</div>
            </div>
          </div>

          <div className={style.tags}>{tagList.length ? tags : null}</div>
        </div>

        <div className={style.right}>
          <div className={style.author_info}>
            <div className={style.author_user_name}>{authorUserName}</div>
            <div className={style.time_created}>{createdAt}</div>
          </div>
          <div></div>
          <img className={style.author_image} alt="User" src={authorImage} />
        </div>
      </div>
      <div className={style.post_abbreviated}>
        {tagList.length
          ? postAbbreviated
          : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
      </div>
      <div className={style.postFull}>
        {postFull.length
          ? postFull
          : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
      </div>
    </div>
  )
}

export default BlogFullElement
