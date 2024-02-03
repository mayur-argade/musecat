import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';

test('renders Login component without errors', () => {
  render(<Login />);
});