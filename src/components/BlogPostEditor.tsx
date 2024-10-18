import React, { useState, useCallback } from "react";
import Button from "./Button";

interface BlogPost {
  title: string;
  description: string;
  content: string;
}

interface BlogPostEditorProps {
  onSubmit: (post: BlogPost) => void;
  onClose: () => void;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  onSubmit,
  onClose,
}) => {
  const [post, setPost] = useState<BlogPost>({
    title: "",
    description: "",
    content: "",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setPost((prevPost) => ({ ...prevPost, [name]: value }));
    },
    []
  );

  const handleSave = useCallback(() => {
    onSubmit(post);
    onClose();
  }, [post, onSubmit, onClose]);

  return (
    <div className="space-y-6">
      <input
        type="text"
        id="title"
        name="title"
        value={post.title}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-150 ease-in-out"
        placeholder="Enter your blog post title"
      />

      <input
        type="text"
        id="description"
        name="description"
        value={post.description}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-150 ease-in-out"
        placeholder="Enter a brief description of your post"
      />

      <textarea
        id="content"
        name="content"
        value={post.content}
        onChange={handleInputChange}
        rows={10}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-150 ease-in-out resize-none"
        placeholder="Write your blog post content here..."
      />

      <div className="flex justify-end space-x-3">
        <Button
          onClickHandler={onClose}
          text="Cancel"
          variant="destructive"
          type="button"
        />
        <Button
          onClickHandler={handleSave}
          text="Save"
          variant="primary"
          type="button"
        />
      </div>
    </div>
  );
};

export default BlogPostEditor;
