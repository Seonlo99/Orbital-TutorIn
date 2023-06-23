import {render, screen} from "@testing-library/react"
import {Selector} from "../../components/Service/Selector"
import { BrowserRouter } from 'react-router-dom';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import userEvent from '@testing-library/user-event'

const queryClient = new QueryClient();


describe(Selector, ()=>{
    let selected=""
    const setSelected = jest.fn((value)=>selected=value);

    it("Pending button called", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <Selector setSelected={setSelected} selected={selected}/> </BrowserRouter></QueryClientProvider>)
        await userEvent.click(screen.getByText(/Pending/i))
        expect(setSelected).toHaveBeenCalled();
    })

    it("In Progress button called", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <Selector setSelected={setSelected} selected={selected}/> </BrowserRouter></QueryClientProvider>)
        await userEvent.click(screen.getByText(/In Progress/i))
        expect(setSelected).toHaveBeenCalled();
    })

    it("Completed button called", async ()=>{
        render(<QueryClientProvider client={queryClient}><BrowserRouter> <Selector setSelected={setSelected} selected={selected}/> </BrowserRouter></QueryClientProvider>)
        await userEvent.click(screen.getByText(/Completed/i))
        expect(setSelected).toHaveBeenCalled();
    })

    
})