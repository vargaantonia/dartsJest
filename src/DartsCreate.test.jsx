import React from 'react'; // React importálása szükséges, ha JSX-t használsz
import { render, screen, fireEvent } from "@testing-library/react";
import { DartsCreate } from "./DartsCreate";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("DartsCreate component", () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = require("react-router-dom").useNavigate;
        mockNavigate.mockReturnValue(jest.fn());
    });

    test("should render form fields correctly", () => {
        render(
            <MemoryRouter>
                <DartsCreate />
            </MemoryRouter>
        );

        expect(screen.getByText("Új darts-játékos")).toBeInTheDocument();
        expect(screen.getByLabelText("Dartsozó neve:")).toBeInTheDocument();
        expect(screen.getByLabelText("Születési éve:")).toBeInTheDocument();
        expect(screen.getByLabelText("Nyert világbajnokságai:")).toBeInTheDocument();
        expect(screen.getByLabelText("Profil URL-je:")).toBeInTheDocument();
        expect(screen.getByLabelText("Kép URL-je:")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Küldés" })).toBeInTheDocument();
    });

    test("should submit the form and call axios.post", async () => {
        axios.post.mockResolvedValueOnce({});

        render(
            <MemoryRouter>
                <DartsCreate />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Dartsozó neve:"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByLabelText("Születési éve:"), { target: { value: "1990-05-15" } });
        fireEvent.change(screen.getByLabelText("Nyert világbajnokságai:"), { target: { value: "3" } });
        fireEvent.change(screen.getByLabelText("Profil URL-je:"), { target: { value: "https://example.com/profile" } });
        fireEvent.change(screen.getByLabelText("Kép URL-je:"), { target: { value: "https://example.com/image.jpg" } });

        fireEvent.submit(screen.getByRole("button", { name: "Küldés" }));

        expect(axios.post).toHaveBeenCalledWith("https://darts.sulla.hu/darts", {
            name: "John Doe",
            birth_date: "1990-05-15",
            world_ch_won: "3",
            profile_url: "https://example.com/profile",
            image_url: "https://example.com/image.jpg",
        }, {
            headers: { "Content-Type": "application/json" },
        });

        expect(mockNavigate).toHaveBeenCalled(); 
    });

    test("should handle axios error", async () => {
        axios.post.mockRejectedValueOnce(new Error("Hiba történt"));

        render(
            <MemoryRouter>
                <DartsCreate />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Dartsozó neve:"), { target: { value: "Jane Doe" } });
        fireEvent.submit(screen.getByRole("button", { name: "Küldés" }));

        expect(axios.post).toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
