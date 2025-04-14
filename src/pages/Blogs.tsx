import { useGetAllBlogsQuery } from "../services/blogApi/blog";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { formatDate } from "../utils/getData";
import Loading from "../components/Loading";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const BlogsPage = memo(() => {
  const { data, isLoading } = useGetAllBlogsQuery();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center w-full h-64">
          <Loading size="large" />
          <p className="mt-4 text-gray-600 text-lg">Loading blogs...</p>
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full">
        {data?.response.map((blog) => (
          <BlogCard
            onClick={() => navigate(`/blog/${blog.id}`)}
            authorName={`${blog.author.firstName} ${blog.author.lastName}`}
            publishedDate={formatDate(blog.createdAt)}
            key={blog.id}
            {...blog}
          />
        ))}
      </div>
    </div>
  );
});

export default BlogsPage;
