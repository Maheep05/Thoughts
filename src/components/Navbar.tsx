import { memo, useState } from "react";
import SearchIcon from "./icons/SearchIcon";
import Button from "./Button";
import EditIcon from "./icons/EditIcon";
import BellIcon from "./icons/BellIcon";
import CustomModal from "./CustomModal";
import BlogPostEditor from "./BlogPostEditor";
import {
  useCreateNewBlogMutation,
  useGetAllBlogsQuery,
} from "../services/blogApi/blog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface BlogValueProps {
  content: string;
  description: string;
  title: string;
}
const Navbar = memo(() => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [createNewBlog] = useCreateNewBlogMutation();
  const { refetch } = useGetAllBlogsQuery();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateBlog = async (content: BlogValueProps) => {
    const newBlogPost = {
      title: content.title,
      description: content.description,
      content: content.content,
      published: true,
    };

    try {
      const response = await createNewBlog(newBlogPost).unwrap();
      console.log("Blog post created:", response);
      if (response) {
        toast.success("Blog Created Successfully!!!");
        refetch();
      }
    } catch (error) {
      toast.error("Error Creating Blog!!!");
      console.error("Failed to create the blog post:", error);
    }
  };
  return (
    <div className="flex flex-row items-center justify-between px-3 py-2 border-b-[1px]">
      <div className="flex flex-row items-center gap-8">
        <h1 className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          Thoughts
        </h1>
        <div className="flex flex-row gap-2 items-center p-2 rounded-xl mt-1 bg-gray-50">
          <SearchIcon />
          <input
            type="text"
            className="bg-gray-50 outline-none w-60"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex flex-row gap-6 items-center">
        <Button
          variant="ghost"
          onClickHandler={handleOpenModal}
          startIcon={<EditIcon />}
          text="Write"
          type="button" // Use button instead of submit
        />
        <Button
          variant="ghost"
          onClickHandler={() => console.log("Click")}
          startIcon={<BellIcon />}
          type="button" // Use button instead of submit
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Write a New Blog Post"
      >
        <BlogPostEditor
          onSubmit={(content) => handleCreateBlog(content)}
          onClose={handleCloseModal}
        />
      </CustomModal>
    </div>
  );
});

export default Navbar;
