// React is imported with hooks below
import "./styles/Contact.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import React, { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const FORM_URL = "https://formspree.io/f/mgvrworw";

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone ? form.elements.phone.value.trim() : "",
      message: form.elements.message.value.trim(),
    };

    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        // clear success message after a short delay
        setTimeout(() => setStatus(null), 5000);
      } else {
        console.error("Formspree error", await res.text());
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-inner">
        <div className="contact-left fade-up">
          <h2 className="contact-heading">Get in touch</h2>

          <div className="contact-block">
            <div className="contact-label">Email:</div>
            <div className="contact-value">sudeepkumar.connect@gmail.com</div>
          </div>

          <div className="contact-block">
            <div className="contact-label">Phone:</div>
            <div className="contact-value">+91 8431477305</div>
          </div>

          <div className="contact-block">
            <div className="contact-label">Address:</div>
            <div className="contact-value">Bangalore India</div>
          </div>

          <div className="contact-follow">
            <div className="contact-label">Follow us</div>
            <div className="socials">
              <a
                aria-label="GitHub"
                href="https://github.com/Sudeepkumar0"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
              <a
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/g-sudeep-kumar-aa1bb6253/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                aria-label="Twitter"
                href="https://x.com/Sudeep_kumar001"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-right fade-up">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="top-row">
              <div className="field">
                <label className="field-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="field">
                <label className="field-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                />
              </div>
              <div className="field">
                <label className="field-label">Phone</label>
                <input type="tel" name="phone" placeholder="Phone number" />
              </div>
            </div>

            <div className="field message-field">
              <label className="field-label message-label">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Write something..."
                rows={6}
              />
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <div className="contact-status contact-success">
                  Message sent — thank you!
                </div>
              )}
              {status === "error" && (
                <div className="contact-status contact-error">
                  There was an error sending your message. Please try again
                  later.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
