import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Comment from '../../components/Comment/Comment';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getComments, editComment, deleteComment } from '../../services/index/comments';
import { BrowserRouter } from 'react-router-dom';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('../../services/index/comments', () => ({
  getComments: jest.fn(),
  editComment: jest.fn(),
  deleteComment: jest.fn(),
}));

jest.mock('react-redux', () => ({
    useSelector: () => ({userInfo:{
        _id: 'user456',
        username: 'commentuser',
    }})
}));

describe(Comment, () => {
  const mockUser = {
    _id: 'user456',
    username: 'commentuser',
  };

  const mockSingleComment = {
    _id: 'comment123',
    body: 'Test comment',
    createdAt: '2023-06-24T12:00:00.000Z',
    userId: {
      _id: 'user456',
      username: 'commentuser',
    },
    isDeleted: false,
  };

  const mockVoteCount = {
    comment123: 5,
  };

  const mockSetVoteCount = jest.fn();
  const mockSetCommentCount = jest.fn();

  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render comment with correct data', () => {
    useQuery.mockReturnValue({
      data: {
        comments: [],
      },
      isLoading: false,
      isError: false,
    });

    useMutation.mockReturnValue({
        mutate: jest.fn(),
        isLoading: false,
    });

    render(
        <BrowserRouter> <Comment
        singleComment={mockSingleComment}
        uuid="post123"
        userVotes={{}}
        setUserVotes={jest.fn()}
        voteCount={mockVoteCount}
        setVoteCount={mockSetVoteCount}
        invalidate={jest.fn()}
        setCommentCount={mockSetCommentCount}
      /> </BrowserRouter>
    );

    expect(screen.getByText('commentuser')).toBeInTheDocument();
    // expect(screen.getByText('Test comment')).toBeInTheDocument();
    expect(screen.getByText('Reply')).toBeInTheDocument();
    // expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('Should toggle reply form visibility when "Reply" is clicked', () => {
    useQuery.mockReturnValue({
      data: {
        comments: [],
      },
      isLoading: false,
      isError: false,
    });

    useMutation.mockReturnValue({
        mutate: jest.fn(),
        isLoading: false,
    });

    render(
        <BrowserRouter> <Comment
        singleComment={mockSingleComment}
        uuid="post123"
        userVotes={{}}
        setUserVotes={jest.fn()}
        voteCount={mockVoteCount}
        setVoteCount={mockSetVoteCount}
        invalidate={jest.fn()}
        setCommentCount={mockSetCommentCount}
      /> </BrowserRouter>
    );

    // expect(screen.queryByText('Comment')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Reply'));

    expect(screen.getByText('Comment')).toBeInTheDocument();
  });

//   it('should toggle edit form visibility when "Edit" is clicked', () => {
//     useQuery.mockReturnValue({
//       data: {
//         comments: [],
//       },
//       isLoading: false,
//       isError: false,
//     });

//     useMutation.mockReturnValue({
//         mutate: jest.fn(),
//         isLoading: false,
//     });

//     render(
//         <BrowserRouter> <Comment
//         singleComment={mockSingleComment}
//         uuid="post123"
//         userVotes={{}}
//         setUserVotes={jest.fn()}
//         voteCount={mockVoteCount}
//         setVoteCount={mockSetVoteCount}
//         invalidate={jest.fn()}
//         setCommentCount={mockSetCommentCount}
//       /> </BrowserRouter>
//     );

//     expect(screen.queryByText('Edit')).not.toBeInTheDocument();

//     fireEvent.click(screen.getByText('Edit'));

//     expect(screen.getByText('Edit Comment')).toBeInTheDocument();
//   });

//   it('should call deleteComment mutation when "Delete" is clicked', async () => {
//     useQuery.mockReturnValue({
//       data: {
//         comments: [],
//       },
//       isLoading: false,
//       isError: false,
//     });

//     useMutation.mockReturnValue({
//       mutate: jest.fn(),
//       isLoading: false,
//     });

//     render(
//         <BrowserRouter> <Comment
//         singleComment={mockSingleComment}
//         uuid="post123"
//         userVotes={{}}
//         setUserVotes={jest.fn()}
//         voteCount={mockVoteCount}
//         setVoteCount={mockSetVoteCount}
//         invalidate={jest.fn()}
//         setCommentCount={mockSetCommentCount}
//       /> </BrowserRouter>
//     );

//     fireEvent.click(screen.getByText('Delete'));

//     await waitFor(() => {
//       expect(deleteComment).toHaveBeenCalledWith({
//         id: 'comment123',
//         token: null, // Replace with appropriate token value
//       });
//       expect(screen.getByText('Comment Deleted!')).toBeInTheDocument();
//       expect(screen.queryByText('Edit Comment')).not.toBeInTheDocument();
//     });
//   });


});