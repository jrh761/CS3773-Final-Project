import React from 'react';
import Form from 'react-bootstrap/Form';

type Props = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeToggler: React.FC<Props> = ({ theme, toggleTheme }) => (
  <Form>
    <Form.Check
      type="switch"
      id="custom-switch"
      label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      checked={theme === 'dark'}
      onChange={toggleTheme}
    />
  </Form>
);

export default ThemeToggler;
