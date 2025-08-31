import { useState } from "react";
import "../../css/post.css" // import the CSS file
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/user/postquite", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        navigate("/");
        window.location.reload();
      }
      else {
        console.log(data)
      }
      
    } catch (err) {
      console.log("Post error ",err);
    }
    console.log("Form Submitted:", formData);
    // send formData to an API here
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <h2>Create a Post</h2>

        {/* Title Input */}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          required
        />

        {/* Body Input */}
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Enter body text"
          rows="5"
          required
        />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
