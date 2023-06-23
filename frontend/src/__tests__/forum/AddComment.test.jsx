import {render, screen} from "@testing-library/react"
import AddComment from "../../components/Comment/AddComment"
import { BrowserRouter } from 'react-router-dom';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import userEvent from '@testing-library/user-event'

const queryClient = new QueryClient();


describe(AddComment, ()=>{
    const formHandler = jest.fn();

    it("Add new comment showing", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <AddComment label={"Comment"} formHandler={formHandler} initialText={""} /> </BrowserRouter></QueryClientProvider>)
        expect(screen.getByText(/Comment/i)).toBeInTheDocument();
    })

    it("Text are placeholder displaying correctly", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <AddComment label={"Comment"} formHandler={formHandler} initialText={""} /> </BrowserRouter></QueryClientProvider>)
        expect(screen.getByPlaceholderText(/Leave your comment here.../i)).toBeInTheDocument();
    })

    it("Comment Button displaying correctly", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <AddComment label={"Comment"} formHandler={formHandler} initialText={""} /> </BrowserRouter></QueryClientProvider>)
        const submitButton = screen.getByRole('button', { name: /Comment/i })
        expect(submitButton).toBeInTheDocument();
    })

    it("Edit Button displaying correctly", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <AddComment label={"Edit"} formHandler={formHandler} initialText={""} /> </BrowserRouter></QueryClientProvider>)
        const editButton = screen.getByRole('button', { name: /Edit/i })
        expect(editButton).toBeInTheDocument();
    })

    it("Cancel Button displaying correctly", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <AddComment label={"Edit"} formHandler={formHandler} initialText={""} /> </BrowserRouter></QueryClientProvider>)
        const button = screen.getByText(/Cancel/i)
        expect(button).toBeInTheDocument();
    })

    it("Initial text displaying correctly", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <AddComment label={"Comment"} formHandler={formHandler} initialText={"This is the initial text"} /> </BrowserRouter></QueryClientProvider>)
        expect(screen.getByText(/This is the initial text/i)).toBeInTheDocument();
    })

    it("Form handler called", async ()=>{
        const formHandler = jest.fn(); 
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <AddComment label={"Edit"} formHandler={formHandler} initialText={"test"}/> </BrowserRouter></QueryClientProvider>)
        await userEvent.click(screen.getByText(/Edit/i))
        expect(formHandler).toHaveBeenCalled();
    })

    it("Cancel handler called", async ()=>{
        const cancelHandler = jest.fn(); 
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <AddComment label={"Edit"} formHandler={formHandler} initialText={""} cancelHandler={cancelHandler}/> </BrowserRouter></QueryClientProvider>)
        await userEvent.click(screen.getByText(/Cancel/i))
        expect(cancelHandler).toHaveBeenCalled();
    })


    
})