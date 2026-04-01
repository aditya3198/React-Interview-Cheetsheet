import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the hero banner and Get Started button', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /react cheatsheet/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });
});
