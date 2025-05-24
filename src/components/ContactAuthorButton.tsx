import React, { useState } from "react";
import ContactModal from "./ContactModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface ContactAuthorButtonProps {
  className?: string;
  buttonText?: string;
  showIcon?: boolean;
}

const ContactAuthorButton: React.FC<ContactAuthorButtonProps> = ({
  className = "btn btn-primary",
  buttonText = "Contact Author",
  showIcon = true,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setShowModal(true)}>
        {showIcon && <FontAwesomeIcon icon={faEnvelope} />}
        <span>{buttonText}</span>
      </button>
      <ContactModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        modalType="contact"
      />
    </>
  );
};

export default ContactAuthorButton;
