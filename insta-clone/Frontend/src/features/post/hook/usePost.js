import {
  getFeed,
  createPost,
  likePost,
  unLikePost,
} from "../services/post.api";
import { useContext, useEffect, useEffectEvent } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, feed, setFeed, post, setPost } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    const data = await createPost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLike = async (post) => {
    const data = await likePost(post);
    await handleGetFeed();
  };

  const handleUnLike = async (post) => {
    const data = await unLikePost(post);
    await handleGetFeed();

  };

  useEffect(() => {
    handleGetFeed();
  }, []);
  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleUnLike,
  };
};
