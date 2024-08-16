import { useState, useRef } from "react";
import { FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../data-api";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const CreateBlog = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [blogState, setBlogState] = useState({
    title: "",
    content: "",
    tags: "",
    thumbnail: null,
  });
  const { auth } = useAuth();

  const callFileInput = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };
  const handleBlogUpload = async (e) => {
    e.preventDefault();

    const blogId = crypto.randomUUID();
    const formData = new FormData();
    const selectedFile = fileRef.current.files[0];

    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      toast.warn("Only image files are allowed!");
      return;
    }

    formData.append("id", blogId);
    formData.append("title", blogState.title);
    formData.append("content", blogState.content);
    formData.append(
      "tags",
      blogState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
        .join(", ")
    );
    if (selectedFile) {
      const uniqueFilename = generateUniqueFilename(selectedFile);
      formData.append("thumbnail", selectedFile, uniqueFilename);
      setBlogState((prevState) => ({
        ...prevState,
        thumbnail: uniqueFilename,
      }));
    } else {
      toast.error("Image Required");
      return;
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.authToken}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success(`${response.data.message}`);
        navigate(`/single-blog/${response?.data?.blog?.id}`);
      }

      setBlogState({
        title: "",
        content: "",
        tags: "",
        thumbnail: null,
      });
      fileRef.current.value = "";
    } catch (error) {
      toast.error("Failed to post blog");
    }
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setBlogState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const generateUniqueFilename = (file) => {
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    return `${crypto.randomUUID()}_${timestamp}.${extension}`;
  };

  return (
    <form
      className="createBlog w-full p-3 md:w-8/12"
      onSubmit={handleBlogUpload}
    >
      <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
        <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
          <FaImage className="w-6 h-6" />
          <button onClick={callFileInput} type="button">
            Upload Your Image
          </button>
        </div>
      </div>
      <div className="mb-6 bg-slate-700">
        <input ref={fileRef} id="file" type="file" name="thumbnail" hidden />
        <input
          onChange={handleTextChange}
          type="text"
          name="title"
          value={blogState.title}
          placeholder="Enter your blog title"
        />
      </div>

      <div className="mb-6 p-2">
        <input
          type="text"
          name="tags"
          value={blogState.tags}
          onChange={handleTextChange}
          placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express"
        />
        <hr className="bg-gray-800 w-full my-4" />
      </div>

      <div className="mb-6 border border-gray-800 rounded-md p-2">
        <textarea
          id="content"
          name="content"
          value={blogState.content}
          onChange={handleTextChange}
          placeholder="Write your blog content"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
      >
        Post Blog
      </button>
    </form>
  );
};

export default CreateBlog;
