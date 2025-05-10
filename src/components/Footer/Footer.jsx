import React from 'react';
import styles from './Footer.module.css'; // Assuming you will create a CSS module for styling

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      {/* Add any other footer content here */}
    </footer>
  );
};

export default Footer;
