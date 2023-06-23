import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from "react-redux";
import { useMutation} from "@tanstack/react-query";

import { addVote, editVote, deleteVote } from '../services/index/votes'

export const Upvote = ({userVotes, setUserVotes, id, voteCount, setVoteCount, postSlug, commentSlug=null}) => { //id here can be either postid or commentid

    const userState = useSelector((state) => state.user);

    const { mutate: mutateAddVote, isLoading: isLoadingAddUpvote } =
    useMutation({
      mutationFn: ({ token, action }) => {
        return addVote({ token, action, postSlug,commentSlug });
      },
      onSuccess: () => {

      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });


    const { mutate: mutateEditVote, isLoading: isLoadingEditUpvote } =
    useMutation({
      mutationFn: ({ token, action }) => {
        return editVote({ token, action, postSlug,commentSlug });
      },
      onSuccess: () => {
        // toast.success("Edited Vote");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });


    const { mutate: mutateDeleteVote, isLoading: isLoadingdeleteUpvote } =
    useMutation({
      mutationFn: ({ token }) => {
        return deleteVote({ token, postSlug,commentSlug });
      },
      onSuccess: () => {
        // toast.success("Deleted Vote");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

    const voteHandler = (action,id) => {
      
        if(!userState.userInfo){
          toast.error("Login to vote!");
          return
        }

        const value = action==='UP'?1:-1

        if(userVotes[id]){ //user already voted before

          if(userVotes[id].value===value){ //delete vote
            voteCount[id] = voteCount[id]-value
            setVoteCount(voteCount)
            delete userVotes[id];
            // console.log(postVoteCount)
            setUserVotes(userVotes)
            mutateDeleteVote({ // new vote
              token: userState.userInfo.token,
            });
          }
          else{
            // console.log(votes[id].value)
            // console.log(value)
            voteCount[id] = value === 1? voteCount[id]+2: voteCount[id]-2
            setVoteCount(voteCount)
            userVotes[id] = {...userVotes[id], value : value}
            // console.log(postVoteCount)
            setUserVotes(userVotes)
            mutateEditVote({ // edit vote
              action: value,
              token: userState.userInfo.token,
            });
          }

        }
        else{
            userVotes[id] = {value:value}
            setUserVotes(userVotes)
            voteCount[id]=voteCount[id]+value
            setVoteCount(voteCount)
            mutateAddVote({ // new vote
                action: value,
                token: userState.userInfo.token,
            });
          
        }

    };


  return (
    <>
        <div className='pt-1'>
        {
            userVotes[id] && userVotes[id].value ===1 ? (
            <button onClick={()=>voteHandler('UP', id)}>
                <svg viewBox="0 0 20 20" height="16" width="16" fill="red" data-icon="red-upvote">
                    <path d="M18.706 8.953L10.834.372A1.123 1.123 0 0010 0a1.128 1.128 0 00-.833.368L1.29 8.957a1.249 1.249 0 00-.17 1.343 1.114 1.114 0 001.006.7H6v6.877A1.125 1.125 0 007.123 19h5.754A1.125 1.125 0 0014 17.877V11h3.877a1.114 1.114 0 001.005-.7 1.25 1.25 0 00-.176-1.347z"></path>
                </svg>
            </button>) : 
            (<button onClick={()=>voteHandler('UP', id)}>
                <svg viewBox="0 0 20 20" height="16" width="16" fill="currentColor" data-icon="upvote">
                    <path d="M12.877 19H7.123A1.125 1.125 0 016 17.877V11H2.126a1.114 1.114 0 01-1.007-.7 1.249 1.249 0 01.171-1.343L9.166.368a1.128 1.128 0 011.668.004l7.872 8.581a1.252 1.252 0 01.176 1.348 1.114 1.114 0 01-1.005.7H14v6.877A1.125 1.125 0 0112.877 19zM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8zM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016z"></path>
                </svg>
            </button>)
        }
        </div>
        <div data-testid='votecount'>
            {voteCount[id]}
        </div>
        <div className='pt-1'>
        {
            userVotes[id] && userVotes[id].value === -1 ? (
                <button onClick={()=>voteHandler('DOWN', id)}>
                    <svg viewBox="0 0 20 20" height="16" width="16" fill="blue" data-icon="blue-downvote">
                        <path d="M18.88 9.7a1.114 1.114 0 00-1.006-.7H14V2.123A1.125 1.125 0 0012.877 1H7.123A1.125 1.125 0 006 2.123V9H2.123a1.114 1.114 0 00-1.005.7 1.25 1.25 0 00.176 1.348l7.872 8.581a1.124 1.124 0 001.667.003l7.876-8.589A1.248 1.248 0 0018.88 9.7z"></path>
                    </svg>
                </button>) : 
                (<button onClick={()=>voteHandler('DOWN', id)}>
                    <svg viewBox="0 0 20 20" height="16" width="16" fill="currentColor" data-icon="downvote">
                        <path d="M10 20a1.122 1.122 0 01-.834-.372l-7.872-8.581A1.251 1.251 0 011.118 9.7 1.114 1.114 0 012.123 9H6V2.123A1.125 1.125 0 017.123 1h5.754A1.125 1.125 0 0114 2.123V9h3.874a1.114 1.114 0 011.007.7 1.25 1.25 0 01-.171 1.345l-7.876 8.589A1.128 1.128 0 0110 20zm-7.684-9.75L10 18.69l7.74-8.44h-4.99v-8h-5.5v8H2.316zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013z"></path>
                    </svg>
                </button>)
        }
        </div>
    </>
  )
}
