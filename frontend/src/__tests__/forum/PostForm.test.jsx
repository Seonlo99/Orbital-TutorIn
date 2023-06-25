import {render, screen, fireEvent} from "@testing-library/react"
import PostForm from "../../components/PostForm"
import { BrowserRouter } from 'react-router-dom';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import userEvent from '@testing-library/user-event'

const queryClient = new QueryClient();


describe(PostForm, ()=>{
    const handleMutate = jest.fn();

    it("New Post Title displayed correctly", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <PostForm handleMutate={handleMutate} btnName="Post"/> </BrowserRouter></QueryClientProvider>)
        expect(screen.getByText(/New Post/i)).toBeInTheDocument();
    })

    it("Edit Post Title displayed correctly", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <PostForm handleMutate={handleMutate} btnName="Edit"/> </BrowserRouter></QueryClientProvider>)
        expect(screen.getByText(/Edit Post/i)).toBeInTheDocument();
    })

    it("New Post submit button displayed correctly", async ()=>{

        render(<QueryClientProvider client={queryClient}><BrowserRouter> <PostForm handleMutate={handleMutate} btnName="Post"/> </BrowserRouter></QueryClientProvider>)
        const submitButton = screen.getByRole('button', { name: /Post/i })

        expect(submitButton).toBeInTheDocument();
    })

    it("Edit Post submit button displayed correctly", async ()=>{

        render(<QueryClientProvider client={queryClient}><BrowserRouter> <PostForm handleMutate={handleMutate} btnName="Edit"/> </BrowserRouter></QueryClientProvider>)
        const submitButton = screen.getByRole('button', { name: /Edit/i })

        expect(submitButton).toBeInTheDocument();
    })

    it("Cancel button displayed correctly", async ()=>{

        render(<QueryClientProvider client={queryClient}><BrowserRouter> <PostForm handleMutate={handleMutate} btnName="Edit"/> </BrowserRouter></QueryClientProvider>)
        const cancelButton = screen.getByRole('button', { name: /Cancel/i })

        expect(cancelButton).toBeInTheDocument();
    })

    it("Title input displayed correctly", async ()=>{

        render(<QueryClientProvider client={queryClient}><BrowserRouter> <PostForm handleMutate={handleMutate} btnName="New"/> </BrowserRouter></QueryClientProvider>)
        const title = screen.getByPlaceholderText(/Title/i)

        expect(title).toBeInTheDocument();
    })

    
    it('Submit Button should not work when Title is empty', () => {
        const handleMutateMock = jest.fn();
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <PostForm handleMutate={handleMutateMock} btnName="Post" />
                </BrowserRouter>
            </QueryClientProvider>
        );
    
        // Click the submit button without entering a title
        const submitButton = getByText('Post');
        fireEvent.click(submitButton);
    
        expect(handleMutateMock).not.toHaveBeenCalled();
    });
    
    it('Submit Button should not work when Description is empty', () => {
        const handleMutateMock = jest.fn();
        const { getByText, getByPlaceholderText } = render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <PostForm handleMutate={handleMutateMock} btnName="Post" />
                </BrowserRouter>
            </QueryClientProvider>
        );
    
        const titleInput = getByPlaceholderText('Title');
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    
        // Click the submit button without entering a description
        const submitButton = getByText('Post');
        fireEvent.click(submitButton);
    
        expect(handleMutateMock).not.toHaveBeenCalled();
      });
    
    
})