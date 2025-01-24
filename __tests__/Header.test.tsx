import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.svg");
  });

  it("renders the heading with correct text", () => {
    render(<Header />);
    const heading = screen.getByRole("heading", {
      name: /explore the diverse realms of anime magic/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the anime image", () => {
    render(<Header />);
    const animeImage = screen.getByAltText("anime");
    expect(animeImage).toBeInTheDocument();
    expect(animeImage.getAttribute("src")).toMatch(
      /_next\/image\?url=.*%2Fanime\.png/
    );
  });

  it("renders the link to the homepage", () => {
    render(<Header />);
    const homeLink = screen.getByRole("link", { name: /logo/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
