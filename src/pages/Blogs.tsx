import { useGetAllBlogsQuery } from "../services/blogApi/blog";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { formatDate } from "../utils/getData";

const BlogsPage = () => {
  const { data   } = useGetAllBlogsQuery();

  console.log(data);
  
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full">
        {data?.response.map((blog) => (
          <BlogCard
            authorName={`${blog.author.firstName} ${blog.author.lastName}`}
            publishedDate={formatDate(blog.createdAt)} 
            key={blog.id}
            {...blog}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
