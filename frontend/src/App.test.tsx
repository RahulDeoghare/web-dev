import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Always mock fetch to return a Promise with the expected shape
beforeEach(() => {
  (global.fetch as jest.Mock) = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

// Suppress console.error messages in tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

// Test for heading
test('renders Enter Your Name heading', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Enter Your Name/i)).toBeInTheDocument();
  });
});

// Test for input field
test('renders input field for name', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
  });
});

// Test for submit button
test('renders submit button', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });
});

// Test form submission (mock fetch)
test('submits the form and displays response', async () => {
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Name submitted!' }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ([]),
    });

  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Your name/i);
  const buttonElement = screen.getByText(/Submit/i);

  fireEvent.change(inputElement, { target: { value: 'Rahul' } });
  fireEvent.click(buttonElement);

  await waitFor(() => {
    expect(screen.getByText(/Name submitted!/i)).toBeInTheDocument();
  });
});

// Test for loading state (if you display "Loading..." or similar)
test('shows loading state while fetching names', async () => {
  render(<App />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => {
    // Wait for fetch to resolve and loading to disappear
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });
});

// Test for displaying names fetched from API
test('displays names fetched from API', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => (["Alice", "Bob"]),
  });
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
    expect(screen.getByText(/Bob/)).toBeInTheDocument();
  });
});

// Test for API error handling
test('handles API error gracefully', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: 500,
    json: async () => ({}),
  });
  render(<App />);
  // You can check for error logs or error UI if you display one
  // For now, just ensure the component doesn't crash
  await waitFor(() => {
    expect(screen.getByText(/Enter Your Name/i)).toBeInTheDocument();
  });
});

// Test for submitting empty input
test('does not submit when input is empty', async () => {
  render(<App />);
  const buttonElement = screen.getByText(/Submit/i);
  fireEvent.click(buttonElement);
  // Optionally, check for validation message or that fetch was not called
  expect(global.fetch).toHaveBeenCalledTimes(1); // Only the initial fetch
});

// Test for snapshot
test('matches the App component snapshot', async () => {
  const { asFragment } = render(<App />);
  // Wait for async effects to finish
  await waitFor(() => {
    expect(screen.getByText(/Enter Your Name/i)).toBeInTheDocument();
  });
  expect(asFragment()).toMatchSnapshot();
});
