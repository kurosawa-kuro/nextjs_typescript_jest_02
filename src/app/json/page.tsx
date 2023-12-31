"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    const retrievePosts = async () => {
      try {
        const { data } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        setPosts(data);
      } catch (fetchError) {
        console.error("Error retrieving posts:", fetchError);
      }
    };
    
    retrievePosts();
  }, []);

  return (
    <section className="w-full max-w-2xl mt-10 mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Posts:</h2>
        <ul>
          {posts.map(post => (
            <li key={post.id} className="mb-4">
              <h3 className="text-xl font-medium">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
    </section>
  );
}
