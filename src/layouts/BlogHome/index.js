import React, { PropTypes } from "react"
import {css} from "glamor"

import AllPosts from "../../components/AllPosts"
import FeaturedPosts from "../../components/FeaturedPosts"
import Page from "../Page"

var styles = {
  header: css({
    display: 'flex',
    justifyContent: 'flex-start',
    opacity: 0.6,
    fontSize: '0.8rem',
  }),
}

const Post = (props) => {
  // it's up to you to choose what to do with this layout ;)
  const pageDate = props.head.date ? new Date(props.head.date) : null

  return (
    <Page
      { ...props }
      header={
        <div>
          <header {...styles.header}>
            {
              pageDate &&
              <time key={ pageDate.toISOString() }>
                { pageDate.toDateString() }
              </time>
            }
          </header>
        </div>
      }
    >
      <hr />
      <FeaturedPosts />
      <AllPosts />
    </Page>
  )
}

Post.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Post
