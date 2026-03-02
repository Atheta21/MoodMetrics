// import React, { useState } from "react";
// import axios from "axios";

// function Contact() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");

//   const handleSubmit = async () => {
//     const res = await axios.post("http://localhost:5000/contact", {
//       name,
//       email,
//       message
//     });

//     setResponse(res.data.message);
//   };


//   return (
//     <div className="form-container">
//       <h2>Contact Us 📩</h2>

//       <input
//         type="text"
//         placeholder="Your Name"
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         type="email"
//         placeholder="Your Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <textarea
//         placeholder="Your Message"
//         onChange={(e) => setMessage(e.target.value)}
//       />

//       <button onClick={handleSubmit}>Send Message</button>

//       {response && <p className="response">{response}</p>}
//     </div>
//   );
// }

// export default Contact;
import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/contact", {
      name,
      email,
      message
    });
    setResponse(res.data.message);
  };

  return (
    <div className="contact-page-body">
      <div className="form-container">
        <h2>Contact Us 📩</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleSubmit}>Send Message</button>

        {response && <p className="response">{response}</p>}
      </div>
    </div>
  );
}

export default Contact;