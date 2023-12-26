import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const Updatepost = () => {
  const { postId } = useParams();
  const [creating, setCreating] = useState(false);

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    summary: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setPostData({ ...postData, [e.target.name]: e.target.files[0] });
    } else {
      setPostData({ ...postData, [e.target.name]: e.target.value });
    }
  };

  const useremail = localStorage.getItem('useremail');
  const username = localStorage.getItem('username');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("description", postData.description);
    formData.append("summary", postData.summary);
    formData.append("file", postData.file);
    formData.append( "email",useremail );
    formData.append( "username",username );
    setCreating(true);

    try {
      const response = await axios.post(
        `https://mern-blogserver.onrender.com/update/${postId}`,
        formData
      );
      console.log(response.data);
      console.log("Post UPDATED successfully", response.ok);
      alert("Post created successfully");
      window.location.reload();
    } catch (error) {
      alert("Failed to create post",);
      console.error("Failed to UPDATE post");
      console.error("Error:", error);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `https://mern-blogserver.onrender.com/getpost/${postId}`
        );
        console.log("getiing post data", response.data);
        setPostData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  return (
    <div>
      <Navbar />
      <div className="w-full p-4 flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} encType="multipart/form-data" action="">
          <input
            className="input input-bordered w-full mb-4"
            type="text"
            name="title"
            id="title"
            required
            placeholder="Title"
            value={postData.title}
            onChange={handleChange}
          />
          <input
            className="input input-bordered w-full mb-4"
            type="text"
            name="description"
            id="description"
            required
            placeholder="Description"
            value={postData.description}
            onChange={handleChange}
          />
          <input
            className="file-input file-input-bordered file-input-primary w-full mb-4"
            type="file"
            name="file"
            id="file"
            onChange={handleChange}
          />
          <textarea
            name="summary"
            className="textarea textarea-bordered w-full mb-4"
            required
            placeholder="Summary..."
            id="summary"
            cols="30"
            rows="10"
            value={postData.summary}
            onChange={handleChange}></textarea>
          <button
            type="submit"
            className="btn flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            POST
            {creating && (
              <span className="mt-1 ml-3  loading loading-spinner loading-xs"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatepost;
