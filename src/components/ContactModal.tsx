import React, { useState } from "react";
import "./ContactModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: "notify" | "contact";
  bookTitle?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  modalType,
  bookTitle,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Using Formspree with different forms for contact vs notification
    const formId = modalType === "notify" ? "xwpojjdg" : "xeogwwbp";

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject:
            modalType === "notify"
              ? `New notification signup for ${bookTitle}`
              : "New contact form submission",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          resetForm();
        }, 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      subscribe: true,
    });
    setSubmitStatus(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="modal-header">
          <h2>
            {modalType === "notify"
              ? `Get Notified About "${bookTitle}"`
              : "Contact the Author"}
          </h2>
          <p>
            {modalType === "notify"
              ? "Be the first to know when this book is available!"
              : "Send a message to Mathew Moslow"}
          </p>
        </div>

        {submitStatus === "success" ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Thank you!</h3>
            <p>Your message has been sent successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
              />
            </div>

            {modalType === "contact" && (
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Your message..."
                />
              </div>
            )}

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleInputChange}
                />
                <span>Subscribe to author updates and news</span>
              </label>
            </div>

            {submitStatus === "error" && (
              <div className="error-message">
                Something went wrong. Please try again later.
              </div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} />
                  <span>
                    {modalType === "notify" ? "Notify Me" : "Send Message"}
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
