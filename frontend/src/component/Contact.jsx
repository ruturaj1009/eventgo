import React, { useEffect, useState } from "react";
import "./Contact.css";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const { auth } = React.useContext(AuthContext);

    useEffect(() => {
        if (auth.user) {
          setName(auth.user.name);
          setEmail(auth.user.email);
        }else{
            return;
        }
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
          toast.warn("All fields required");
        }else{
            toast.success("Message sent");
            setMessage("")
        }
      };

  return (
    <>
      <section id="contact" className="contact">
        <div className="contact-box">
          <div className="contact-links">
            <h2>CONTACT</h2>
            <div className="links">
              <div className="link">
                <a>
                  <img
                    src="https://i.postimg.cc/m2mg2Hjm/linkedin.png"
                    alt="linkedin"
                  />
                </a>
              </div>
              <div className="link">
                <a>
                  <img
                    src="https://i.postimg.cc/YCV2QBJg/github.png"
                    alt="github"
                  />
                </a>
              </div>
              <div className="link">
                <a>
                  <img
                    src="https://i.postimg.cc/W4Znvrry/codepen.png"
                    alt="codepen"
                  />
                </a>
              </div>
              <div className="link">
                <a>
                  <img
                    src="https://i.postimg.cc/NjLfyjPB/email.png"
                    alt="email"
                  />
                </a>
              </div>
            </div>
            <div style={{ color: "ghostwhite" }}>
              Website:
              <a
                style={{ fontWeight: "700", color: "ghostwhite" }}
                target="_blanck"
                href="www.xyz.com"
              >
                www.xyz.com
              </a>
              <br />
              Email: info@xyz.com <br />
              Phone: +91 8280799123
              <br />
              Address: 1234 Galaxy Street, Celestial City, Orion Nebula <br />{" "}
              <br />
              Social Media: <br />
              Facebook:{" "}
              <a
                style={{ fontWeight: "700", color: "ghostwhite" }}
                target="_blanck"
                href="www.facebook.com/xyz"
              >
                www.facebook.com/xyz
              </a>{" "}
              <br />
              Twitter:{" "}
              <a
                style={{ fontWeight: "700", color: "ghostwhite" }}
                target="_blanck"
                href="www.twitter.com/xyz "
              >
                www.twitter.com/xyz{" "}
              </a>{" "}
              <br />
              LinkedIn:{" "}
              <a
                style={{ fontWeight: "700", color: "ghostwhite" }}
                target="_blank"
                href="www.linkedin.com/company/stellarsolutionsinc"
              >
                www.linkedin.com/company/xyz
              </a>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <form>
              <div className="form-item">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="sender"
                  required
                />
                <label>Name:</label>
              </div>
              <div className="form-item">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                  required
                />
                <label>Email:</label>
              </div>
              <div className="form-item">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className=""
                  name="message"
                  required
                ></textarea>
                <label>Message:</label>
              </div>
              <button onClick={(e) => handleSubmit(e)} className="submit-btn">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
