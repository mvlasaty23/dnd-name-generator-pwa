import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

xtest('renders app heading', () => {
  render(<App />);
  const heading = screen.getByText(/Name Generator/i);
  expect(heading).toBeInTheDocument();
});
