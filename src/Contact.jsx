import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or want to get in touch you can reach us via:
      </p>
      <ul className="contact-list">
        <li>
          <strong>Email:</strong> pavlyuk.daria81@gmail.com
        </li>
        <li>
          <strong>Phone:</strong>+1(123) 456-789
        </li>
        <li>
          <strong>Address:</strong> 123 Great Street, Beautiful City, Big
          Country
        </li>
      </ul>
      <p>We'd love to hear from you!</p>
    </div>
  );
};
export default Contact;
