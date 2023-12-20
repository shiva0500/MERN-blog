import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  const [creating, setCreating] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    summary: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setNewPost({ ...newPost, [e.target.name]: e.target.files[0] });
    } else {
      setNewPost({ ...newPost, [e.target.name]: e.target.value });
    }
  };



  const useremail = localStorage.getItem('user');
  
  const {email, password,username} = useremail;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("description", newPost.description);
    formData.append("summary", newPost.summary);
    formData.append("file", newPost.file);

  console.log(useremail.email);    
    // formData.append( "email", );

    setCreating(true);

    try {
      const response = await axios.post("http://localhost:3001/post", formData);
      console.log("Post created successfully", response.ok);
      alert("Post created successfully"); 
    } catch (error) {
      alert("Failed to create post");
      console.error("Failed to create post");
      console.error("Error:", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full p-4 flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} encType="multipart/form-data" action="">
          <input
            className="input input-bordered w-full mb-4"
            type="text"
            name="title"
            id="title"
            required
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            className="input input-bordered w-full mb-4"
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            required
            placeholder="Description"
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
            onChange={handleChange}
            required
            placeholder="Summary..."
            id="summary"
            cols="30"
            rows="10"></textarea>
          <button type="submit" className="btn flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            POST
            {creating && (
              <span className="mt-1 ml-3  loading loading-spinner loading-xs"></span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
