import {render, screen} from "@testing-library/react"
import {Upvote} from "../../components/Upvote"
import { BrowserRouter } from 'react-router-dom';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';


const queryClient = new QueryClient();

const id=1
const postSlug="test"

let userVotes = {}
let voteCount = {}
const setUserVotes = jest.fn();
const setVoteCount = jest.fn();

jest.mock('react-redux', () => ({
    useSelector: () => ({userInfo:true})
}));




describe(Upvote, ()=>{

    it("Empty Vote Count displayed correctly", async ()=>{

         render(<QueryClientProvider client={queryClient}><BrowserRouter> <Upvote userVotes={userVotes} setUserVotes={setUserVotes} id={id} voteCount={voteCount} setVoteCount={setVoteCount} postSlug={postSlug} /> </BrowserRouter></QueryClientProvider>)
        
        expect(screen.getByTestId(/votecount/i).textContent).toBe("")
    })


    it("Upvote displayed correctly when user did not upvote", async ()=>{
        // screen.debug()
        const {container} = render(<QueryClientProvider client={queryClient}><BrowserRouter> <Upvote userVotes={userVotes} setUserVotes={setUserVotes} id={id} voteCount={voteCount} setVoteCount={setVoteCount} postSlug={postSlug} /> </BrowserRouter></QueryClientProvider>)
        
        const upvote = container.querySelector("[data-icon='upvote']")
        expect(upvote).toBeInTheDocument()
    })

    it("Downvote displayed correctly when user did not downvote", async ()=>{
        const {container} = render(<QueryClientProvider client={queryClient}><BrowserRouter> <Upvote userVotes={userVotes} setUserVotes={setUserVotes} id={id} voteCount={voteCount} setVoteCount={setVoteCount} postSlug={postSlug} /> </BrowserRouter></QueryClientProvider>)
        
        const downvote = container.querySelector("[data-icon='downvote']")
        expect(downvote).toBeInTheDocument()
    })

    it("Upvote displayed correctly when user upvoted", async ()=>{
        userVotes={1:{value:1}}
        const {container} = render(<QueryClientProvider client={queryClient}><BrowserRouter> <Upvote userVotes={userVotes} setUserVotes={setUserVotes} id={id} voteCount={voteCount} setVoteCount={setVoteCount} postSlug={postSlug} /> </BrowserRouter></QueryClientProvider>)
        
        const upvote = container.querySelector("[data-icon='red-upvote']")
        expect(upvote).toBeInTheDocument()
    })

    it("Downvote displayed correctly when user upvoted", async ()=>{
        userVotes={1:{value:1}}
        const {container} = render(<QueryClientProvider client={queryClient}><BrowserRouter> <Upvote userVotes={userVotes} setUserVotes={setUserVotes} id={id} voteCount={voteCount} setVoteCount={setVoteCount} postSlug={postSlug} /> </BrowserRouter></QueryClientProvider>)
        
        const downvote = container.querySelector("[data-icon='downvote']")
        expect(downvote).toBeInTheDocument()
    })

    it("Upvote displayed correctly when user downvoted", async ()=>{
        userVotes={1:{value:-1}}
        const {container} = render(<QueryClientProvider client={queryClient}><BrowserRouter> <Upvote userVotes={userVotes} setUserVotes={setUserVotes} id={id} voteCount={voteCount} setVoteCount={setVoteCount} postSlug={postSlug} /> </BrowserRouter></QueryClientProvider>)
        
        const upvote = container.querySelector("[data-icon='upvote']")
        expect(upvote).toBeInTheDocument()
    })

    it("Downvote displayed correctly when user upvoted", async ()=>{
        userVotes={1:{value:-1}}
        const {container} = render(<QueryClientProvider client={queryClient}><BrowserRouter> <Upvote userVotes={userVotes} setUserVotes={setUserVotes} id={id} voteCount={voteCount} setVoteCount={setVoteCount} postSlug={postSlug} /> </BrowserRouter></QueryClientProvider>)
        
        const downvote = container.querySelector("[data-icon='blue-downvote']")
        expect(downvote).toBeInTheDocument()
    })

    // it("Total vote count displayed correctly when downvoted user click downvote", async ()=>{
    //     userVotes={1:{value:-1}}
    //     voteCount={1:-1}
    //     const {container} = render(<QueryClientProvider client={queryClient}><BrowserRouter> <Upvote userVotes={userVotes} setUserVotes={setUserVotes} id={id} voteCount={voteCount} setVoteCount={setVoteCount} postSlug={postSlug} /> </BrowserRouter></QueryClientProvider>)
        
    //     const downvote = container.querySelector("[data-icon='blue-downvote']")
    //     await act(async()=>{
    //         await userEvent.click(downvote)
    //     })
    //     expect(screen.getByTestId(/votecount/i).textContent).toBe("0")
        
    // })

    // it("Total vote count displayed correctly when downvoted user click upvote", async ()=>{
    //     userVotes={1:{value:-1}}
    //     voteCount={1:-1}
    //     const {container} = render(<QueryClientProvider client={queryClient}><BrowserRouter> <Upvote userVotes={userVotes} setUserVotes={setUserVotes} id={id} voteCount={voteCount} setVoteCount={setVoteCount} postSlug={postSlug} /> </BrowserRouter></QueryClientProvider>)
        
    //     const button = container.querySelector("[data-icon='upvote']")
    //     await act(async()=>{
    //         await userEvent.click(button)
    //     })

    //     expect(screen.getByTestId(/votecount/i).textContent).toBe("1")

        
    // })

    
    
})