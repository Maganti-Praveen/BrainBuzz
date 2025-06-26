import React, { useState } from "react";
import API from "../api";
import "../css/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("contact", formData);
      setResponseMsg(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setResponseMsg("There was an error sending your message.");
    }
  };

  return (
    <div className="contact-container">
    <h1>Contact</h1>
    <form onSubmit={handleSubmit} className="contact-form">
      <label>Name:<input name="name" value={formData.name} onChange={handleChange} required /></label>
      <label>Email:<input name="email" type="email" value={formData.email} onChange={handleChange} required /></label>
      <label>Message:<textarea name="message" value={formData.message} onChange={handleChange} required/></label>
      <button type="submit" className="btn">Send Message</button>
    </form>
    {responseMsg && <p className="response-message">{responseMsg}</p>}
  </div>
  );
};

export default Contact;
