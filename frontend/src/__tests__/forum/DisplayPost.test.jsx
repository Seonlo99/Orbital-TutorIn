import {render, screen} from "@testing-library/react"
import DisplayPost from "../../components/Forum/DisplayPost"
import { BrowserRouter } from 'react-router-dom';


const SamplePost={
    title: "Sample Post with a very long title that should be truncated",
    slug: "123123123",
    avatar: "test.jpg",
    tags: ["CS2105", "CS2106"],
    user: {
        _id: "123123123",
        username: "Testuser"
    },
    voteCount: 10,
    commentCount: 10,
    createdAt: 123123123,
}

describe(DisplayPost, ()=>{
    it("Forum Post should display correctly", ()=>{
        render(<BrowserRouter> <DisplayPost post={SamplePost}/> </BrowserRouter>)
        
        expect(screen.getByText(/Sample Post/i)).toBeInTheDocument();
        expect(screen.getByText(/CS2105/i)).toBeInTheDocument();
        expect(screen.getByText(/CS2106/i)).toBeInTheDocument();
        expect(screen.getByText(/Testuser/i)).toBeInTheDocument();
        expect(screen.getByTestId("voteCount").textContent).toBe("10");
        expect(screen.getByTestId("commentCount").textContent).toBe("10");
    })

    it("Long post title truncated", ()=>{
        render(<BrowserRouter> <DisplayPost post={SamplePost}/> </BrowserRouter>)
        
        expect(screen.getByText(/Sample Post with a very long title that should be .../i)).toBeInTheDocument();
    })

    it("Profile picture should be correct", ()=>{
        render(<BrowserRouter> <DisplayPost post={SamplePost}/> </BrowserRouter>)

        const testImage = screen.getByRole("img");
        expect(testImage.src).toContain("test.jpg");
        expect(testImage.alt).toContain("Author");

    })
    
})