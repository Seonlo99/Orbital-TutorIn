import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { BrowserRouter, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoginPage from '../../pages/LoginPage';
import { userRegister } from '../../services/index/users';
import { userActions } from '../../store/reducers/userReducers';
import { GoogleLogin } from '@react-oauth/google'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@react-oauth/google', () => ({
    ...jest.requireActual('@react-oauth/google'),
    GoogleLogin: jest.fn(),
  }));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  ...jest.requireActual('react-hot-toast'),
  error: jest.fn(),
}));

jest.mock('../../services/index/users', () => ({
  userRegister: jest.fn(),
}));

describe('LoginPage', () => {
  const mockMutate = jest.fn();
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  let capturedFormValues = {};
//   const mockSubmitHandler = jest.fn((data=>(mockMutate(data))));

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ userInfo: null });
    useForm.mockReturnValue({
        register: jest.fn((options) => options),
        handleSubmit: jest.fn((fn) => (event) => {
          event.persist();
          capturedFormValues[event.target.name] = event.target.value;
          fn(event);
        }),
        formState: { errors: {}, isValid: true },
        watch: jest.fn(),
    });
    useMutation.mockReturnValue({ mutate: mockMutate, isLoading: false });
    toast.error.mockImplementation(() => {});
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
    capturedFormValues = {};
  });

  it('renders login form', () => {
    render(<LoginPage />, { wrapper: BrowserRouter });
    // render(<BrowserRouter><LoginPage /></BrowserRouter>);
  
    // Assert
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByTestId("LoginPassword")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByText(/Forget Password?/i)).toBeInTheDocument();
  });

  it('submits login form with valid data', async () => {

    render(<LoginPage />, { wrapper: BrowserRouter });
  
    // Fill in the form
    await act(async()=>{
        fireEvent.change(screen.getByPlaceholderText("Enter Username"), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: 'password123' } });

        fireEvent.submit(screen.getByTestId('login-form'));
    })

    // Assert
    expect(mockMutate).toHaveBeenCalledWith({
        username: capturedFormValues.username,
        password: capturedFormValues.password,
    });
  });

//   it('displays error message if login form submission fails', async () => {
//     const errorMessage = 'Failed to login user';
//     mockMutate.mockRejectedValueOnce(new Error(errorMessage));
  
//     render(<LoginPage />, { wrapper: BrowserRouter });
  
//     // Fill in the form
//     await act(async()=>{
//         fireEvent.change(screen.getByPlaceholderText("Enter Username"), { target: { value: 'testuser' } });
//         fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: 'password123' } });

//         fireEvent.submit(screen.getByTestId('login-form'));
//     })
  
//     // Assert
//     expect(toast.error).toHaveBeenCalledWith(errorMessage);
//   });

  it('navigates to home page if user is already logged in', () => {
    useSelector.mockReturnValue({ userInfo: { id: 1, username: 'testuser' } });
  
    render(<LoginPage />, { wrapper: BrowserRouter });
  
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
})