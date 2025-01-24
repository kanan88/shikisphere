// Footer.test.tsx
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  it("should render the copyright text with the current year", () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);

    const copyrightText = screen.getByText(`© ShikiSphere ${currentYear}`);
    expect(copyrightText).toBeInTheDocument();
  });

  it("should render the logo link", () => {
    render(<Footer />);

    const logoLink = screen.getAllByRole("link", { name: /logo/i });
    expect(logoLink[0]).toHaveAttribute("href", "/");
  });

  it("should render the GitHub link", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/kanan88/shikisphere"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noreferrer");
  });

  it("should render the GitHub logo", () => {
    render(<Footer />);

    const githubLogo = screen.getByAltText("github");
    expect(githubLogo).toHaveAttribute("src", "/github.svg");
  });
});
