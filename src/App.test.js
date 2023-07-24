import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const textElement = screen.getByText("Menu Order App");
  expect(textElement).toBeInTheDocument();
});
