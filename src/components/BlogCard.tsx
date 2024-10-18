import { FC, memo } from "react";
import { getInitials } from "../utils/getInitials";

interface BlogCardProps {
  authorName: string;
  title: string;
  description: string;
  content: string;
  publishedDate: string;
}

const BlogCard: FC<BlogCardProps> = memo(
  ({ authorName, title, description, content, publishedDate }) => {
    return (
      <div className="w-1/3 flex flex-col justify-center border-b-[1px] mx-auto p-6 bg-white  rounded-lg mb-6">
        <div className="flex flex-row items-center mb-4">
          <div className="w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
            {getInitials(authorName)}
          </div>
          <h2 className="text-md font-semibold">{authorName}</h2>
          <h2 className="text-gray-500 text-md mx-2">.</h2>
          <h2 className="text-gray-500 text-md">{publishedDate}</h2>
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <h3 className="text-gray-700 mb-4 text-md font-medium">
          {description}
        </h3>
        <h4 className="text-gray-600 text-base mb-2">
          {content.substring(0, 400) + "..."}
        </h4>
        <h4 className="text-gray-500 text-xs">{`${Math.ceil(
          content.length / 100
        )} minutes read`}</h4>
      </div>
    );
  }
);

export default BlogCard;
