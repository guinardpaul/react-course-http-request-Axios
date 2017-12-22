import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
// HTTP Request Options :
// XMLHttpRequest
// axios
import axios from 'axios';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: 0
  };

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          };
        });
        this.setState({
          posts: updatedPosts
        });
      })
      .catch();
  }

  getPostHandler = id => {
    this.setState({
      selectedPostId: id
    });
  };

  render() {
    const posts = this.state.posts.map((p, i) => {
      return (
        <Post clicked={() => this.getPostHandler(p.id)} key={p.id} post={p} />
      );
    });
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
