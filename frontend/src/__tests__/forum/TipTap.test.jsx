import {render, screen} from "@testing-library/react"
import TipTap from "../../components/TipTap"
import { BrowserRouter } from 'react-router-dom';



describe(TipTap, ()=>{
    const setContent = jest.fn();

    it("Initial Content displayed correctly", async ()=>{
        render(<BrowserRouter> <TipTap setContent={setContent} initialContent={"This is the initial content"} /> </BrowserRouter>)
        expect(screen.getByText(/This is the initial content/i)).toBeInTheDocument();
    })
    
})