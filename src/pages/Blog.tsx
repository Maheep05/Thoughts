import { FC, memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../services/blogApi/blog";
import { formatDate } from "../utils/getData";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

interface Author {
  firstName: string;
  lastName: string;
}

interface BlogResponse {
  title: string;
  content: string;
  createdAt: string;
  author: Author;
}

const AuthorAvatar: FC<{ author: Author }> = memo(({ author }) => (
  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-white">
    {author.firstName[0]}
    {author.lastName[0]}
  </div>
));

const AuthorInfo: FC<{ author: Author }> = memo(({ author }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="text-slate-500 pb-4">Author</div>
    <div className="flex">
      <div className="pr-4 flex flex-col justify-center">
        <AuthorAvatar author={author} />
      </div>
      <div>
        <div className="text-xl font-semibold">
          {author.firstName} {author.lastName}
        </div>
        <div className="text-slate-400">Author of this insightful blog</div>
      </div>
    </div>
  </div>
));

const BlogContent: FC<{ blog: BlogResponse }> = memo(({ blog }) => (
  <>
    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-800">
      {blog.title}
    </h1>
    <div className="py-2 font-normal text-slate-500 text-sm">
      Posted on {formatDate(blog.createdAt)}
    </div>
    <div className="prose max-w-none pt-6">
      {blog.content.split("\n").map((paragraph, index) => (
        <p key={index} className="mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  </>
));

const Blog: FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { data: blogData, isLoading } = useGetBlogByIdQuery(id || "");

  const blog = useMemo(() => blogData?.response, [blogData]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-64">
          <Loading size="large" />
          <p className="mt-4 text-gray-600 text-lg">Loading blog...</p>
        </div>
      );
    }

    if (!blog) {
      return (
        <div className="text-center text-gray-600">
          <p>Blog not found.</p>
        </div>
      );
    }

    return (
      <div className="flex-grow flex justify-center px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full pt-10 max-w-screen-xl">
          <div className="md:col-span-8">
            <BlogContent blog={blog} />
          </div>
          <div className="md:col-span-4 mt-8 md:mt-0">
            <AuthorInfo author={blog.author} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <footer className="bg-gray-800 text-white py-2">
        <div className=" mx-auto px-4 text-center">
          © {new Date().getFullYear()} Thoughts. All rights reserved.
        </div>
      </footer>
    </div>
  );
});

export default Blog;
