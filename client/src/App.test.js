import { render, screen } from '@testing-library/react';
import App from './App';

test('renders status element', () => {
  render(<App />);
  const statusElement = screen.getByText(/sse status/i);
  expect(statusElement).toBeInTheDocument();
});
