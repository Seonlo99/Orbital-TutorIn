import React from "react";
import { render, screen } from "@testing-library/react";
import { CommunityStats } from "../../components/Profile/CommunityStats";

describe("CommunityStats", () => {
  test("renders community stats correctly", async () => {
    const postCount = 10;
    const commentCount = 20;
    const voteCount = 30;

    render(
      <CommunityStats
        postCount={postCount}
        commentCount={commentCount}
        voteCount={voteCount}
      />
    );

    // Assert the rendered community stats
    expect(screen.getByText("Community Stats")).toBeInTheDocument();
    expect(screen.getByText("Post Count:")).toBeInTheDocument();
    expect(screen.getByText(postCount.toString())).toBeInTheDocument();
    expect(screen.getByText("Comment Count:")).toBeInTheDocument();
    expect(screen.getByText(commentCount.toString())).toBeInTheDocument();
    expect(screen.getByText("Upvote Count:")).toBeInTheDocument();
    expect(screen.getByText(voteCount.toString())).toBeInTheDocument();
  });
});
