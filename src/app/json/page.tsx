// nextjs_training/nextjs_typescript_jest_02/src/app/json/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function PostsClientComponent() {
  const [posts, setPosts] = useState<PostType[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get<PostType[]>('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <section className="w-full max-w-2xl mt-10">
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
