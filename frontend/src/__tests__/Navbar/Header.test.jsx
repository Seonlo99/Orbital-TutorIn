import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogout } from '@react-oauth/google';
import Header from '../../components/Header';
import { logout } from '../../store/actions/user';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@react-oauth/google', () => ({
  ...jest.requireActual('@react-oauth/google'),
  googleLogout: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../store/actions/user', () => ({
  logout: jest.fn(),
}));

describe('Header', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ userInfo: null });
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header component with sign-in button when user is not logged in', () => {
    render(<Header />, { wrapper: BrowserRouter });

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.queryByText(/Home/i)).toBeInTheDocument();
    expect(screen.queryByText(/Forum/i)).toBeInTheDocument();
    expect(screen.queryByText(/Services/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Chat/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/View Profile/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Admin Page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  it('renders the header component with navigation links and user information when user is logged in', () => {
    useSelector.mockReturnValue({ userInfo: { username: 'testuser', _id: '123', isAdmin: false } });
    render(<Header />, { wrapper: BrowserRouter });

    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Forum/i)).toBeInTheDocument();
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Chat/i)).toBeInTheDocument();
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /User dropdown/i })).toBeInTheDocument();
    expect(screen.getAllByText(/View Profile/i)).toHaveLength(2);
    expect(screen.queryByText(/Admin Page/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/Logout/i)).toHaveLength(2);
  });

  it('renders the header component with navigation links and user information when admin is logged in', () => {
    useSelector.mockReturnValue({ userInfo: { username: 'testuser', _id: '123', isAdmin: true } });
    render(<Header />, { wrapper: BrowserRouter });

    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Forum/i)).toBeInTheDocument();
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Chat/i)).toBeInTheDocument();
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /User dropdown/i })).toBeInTheDocument();
    expect(screen.getAllByText(/View Profile/i)).toHaveLength(2);
    expect(screen.queryByText(/Admin Page/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Logout/i)).toHaveLength(2);
  });

  it('navigates to the profile page when "View Profile" button is clicked', () => {
    useSelector.mockReturnValue({ userInfo: { username: 'testuser', _id: '123', isAdmin: false } });
    render(<Header />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getAllByText(/View Profile/i)[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/profile/123');
  });

  it('dispatches logout action when user logs out', () => {
    useSelector.mockReturnValue({ userInfo: { username: 'testuser', isGoogleSignUp: false } });
    render(<Header />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getAllByText(/Logout/i)[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(logout());
    expect(googleLogout).toHaveBeenCalledTimes(0);
  });

  it('dispatches logout action and calls googleLogout when user logs out if user sign in using google', () => {
    useSelector.mockReturnValue({ userInfo: { username: 'testuser', isGoogleSignUp: true } });
    render(<Header />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getAllByText(/Logout/i)[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(logout());
    expect(googleLogout).toHaveBeenCalledTimes(1);
  });

  
});