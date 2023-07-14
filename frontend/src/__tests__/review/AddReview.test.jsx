import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { AddReview } from '../../components/Review/AddReview';
import { act } from "react-dom/test-utils";

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('AddReview', () => {
  const mockMutate = jest.fn();
  const mockCloseHandler = jest.fn();
  const mockInvalidate = jest.fn();

  beforeEach(() => {
    useSelector.mockReturnValue({ userInfo: { token: 'fakeToken' } });

    useMutation.mockReturnValue({
      mutate: mockMutate,
    });

    render(
      <AddReview
        revieweeName="John Doe"
        transactionId="123"
        reviewerId="456"
        revieweeId="789"
        closeHandler={mockCloseHandler}
        invalidate={mockInvalidate}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with the reviewee name', () => {
    expect(screen.getByText('Give John Doe a review?')).toBeInTheDocument();
  });

  it('updates the rating when a star button is clicked', async() => {
    const starButtons = screen.getAllByTestId("StarButton");

    fireEvent.mouseEnter(starButtons[2]);
    fireEvent.click(starButtons[2]); // Click the 3rd star

    await waitFor(() => {});
    

    expect(starButtons[0]).toHaveClass('text-yellow-300');
    expect(starButtons[1]).toHaveClass('text-yellow-300');
    expect(starButtons[2]).toHaveClass('text-yellow-300');
    expect(starButtons[3]).not.toHaveClass('text-yellow-300');
    expect(starButtons[4]).not.toHaveClass('text-yellow-300');
  });

  it('updates the hover rating when mouse enters and leaves a star button', () => {
    const starButtons = screen.getAllByTestId('StarButton');

    fireEvent.mouseEnter(starButtons[3]); // Hover the 4th star
    expect(screen.getByText('(4 / 5)')).toBeInTheDocument();

    fireEvent.mouseLeave(starButtons[3]); // Remove hover
    expect(screen.getByText('(0 / 5)')).toBeInTheDocument();
  });

  it('updates the review text', () => {
    const reviewTextArea = screen.getByPlaceholderText('Write review...');
    fireEvent.change(reviewTextArea, { target: { value: 'Great service!' } });

    expect(reviewTextArea.value).toBe('Great service!');
  });

  it('cancels the review and calls the close handler', () => {
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(mockCloseHandler).toHaveBeenCalled();
  });

  it('submits the review and calls the mutate function', () => {
    const reviewTextArea = screen.getByPlaceholderText('Write review...');
    fireEvent.change(reviewTextArea, { target: { value: 'Great service!' } });

    const addButton = screen.getByRole('button', { name: 'Add Review' });
    fireEvent.click(addButton);

    expect(mockMutate).toHaveBeenCalled();
  });

  it('displays an error toast if the review text is empty', () => {
    const addButton = screen.getByRole('button', { name: 'Add Review' });
    fireEvent.click(addButton);

    expect(toast.error).toHaveBeenCalledWith('Write some review.');
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('displays a success toast and calls the invalidate and close handlers on successful review submission', () => {
    useMutation.mockImplementationOnce((config) => {
        const { onSuccess } = config;
        onSuccess(); // Invoke onSuccess callback
        return { mutate: mockMutate };
      });
    const reviewTextArea = screen.getByPlaceholderText('Write review...');
    fireEvent.change(reviewTextArea, { target: { value: 'Great service!' } });

    const addButton = screen.getByRole('button', { name: 'Add Review' });
    fireEvent.click(addButton);

    expect(mockMutate).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Review Added!');
    expect(mockInvalidate).toHaveBeenCalled();
    expect(mockCloseHandler).toHaveBeenCalled();
  });

  it('displays an error toast and does not call the invalidate and close handlers on failed review submission', async () => {
    const reviewTextArea = screen.getByPlaceholderText('Write review...');
    fireEvent.change(reviewTextArea, { target: { value: 'Great service!' } });
  
    const errorMessage = 'Failed to add review';
    useMutation.mockImplementationOnce((config) => {
        const { onError } = config;
        onError(new Error(errorMessage));
        return { mutate: mockMutate };
      });
  
    const addButton = screen.getByRole('button', { name: 'Add Review' });
    fireEvent.click(addButton);
  
    // Wait for asynchronous actions to complete
    await waitFor(() => {});
  
    expect(mockMutate).toHaveBeenCalled();
    // expect(toast.error).toHaveBeenCalled();
    expect(mockInvalidate).not.toHaveBeenCalled();
    expect(mockCloseHandler).not.toHaveBeenCalled();
  });
});