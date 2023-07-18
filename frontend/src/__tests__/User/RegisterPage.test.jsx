import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import RegisterPage from '../../pages/RegisterPage';
import { userRegister } from '../../services/index/users';
import { userActions } from '../../store/reducers/userReducers';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
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

describe('RegisterPage', () => {
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
    toast.error.mockReturnValue();
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
    capturedFormValues = {};
  });

  it('renders registration form', () => {
    render(<RegisterPage />, { wrapper: BrowserRouter });
  
    // Assert
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByTestId("RegisterPassword")).toBeInTheDocument();
    expect(screen.getByTestId("RegisterCfmPassword")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByText(/Already have account?/i)).toBeInTheDocument();
  });

  it('submits register form with valid data', async () => {

    render(<RegisterPage />, { wrapper: BrowserRouter });
  
    // Fill in the form
    await act(async()=>{
        fireEvent.change(screen.getByPlaceholderText("Enter Username"), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText("Enter Name"), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText("Enter Password again"), { target: { value: 'password123' } });

        fireEvent.submit(screen.getByTestId('register-form'));
    })

    // Assert
    expect(mockMutate).toHaveBeenCalledWith({
        username: capturedFormValues.username,
        fullname: capturedFormValues.fullname,
        email: capturedFormValues.email,
        password: capturedFormValues.password,
        isTutor: false,
    });
  });

//   test('displays error message if form submission fails', async () => {
//     const errorMessage = 'Failed to register user';
//     mockMutate.mockRejectedValueOnce(new Error(errorMessage));
  
//     render(<RegisterPage />, { wrapper: BrowserRouter });
  
//     // Fill in the form
//     await act(async()=>{
//         fireEvent.change(screen.getByPlaceholderText("Enter Username"), { target: { value: 'testuser' } });
//         fireEvent.change(screen.getByPlaceholderText("Enter Name"), { target: { value: 'Test User' } });
//         fireEvent.change(screen.getByPlaceholderText("Enter Email"), { target: { value: 'test@example.com' } });
//         fireEvent.change(screen.getByPlaceholderText("Enter Password"), { target: { value: 'password123' } });
//         fireEvent.change(screen.getByPlaceholderText("Enter Password again"), { target: { value: 'password123' } });

//         fireEvent.submit(screen.getByTestId('register-form'));
//     })
  
//     // Assert
//     expect(mockDispatch).not.toHaveBeenCalled();
//     expect(toast.error).toHaveBeenCalledWith(errorMessage);
//   });

  test('navigates to home page if user is already logged in', () => {
    useSelector.mockReturnValue({ userInfo: { id: 1, username: 'testuser' } });
  
    render(<RegisterPage />, { wrapper: BrowserRouter });
  
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
})