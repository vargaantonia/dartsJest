import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { DartsDel } from "./DartsDel";
import axios from "axios";
import { jest } from "@jest/globals";
import React from 'react';


jest.mock("axios");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ dartsId: "1" }),
    useNavigate: jest.fn(),
}));

describe("DartsDel component", () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = require("react-router-dom").useNavigate();
        mockNavigate.mockReturnValue(jest.fn());
    });

    test("should fetch and display darts player data", async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                name: "John Doe",
                birth_date: "1990-05-15",
                world_ch_won: 3,
                profile_url: "https://example.com/profile",
                image_url: "https://example.com/image.jpg",
            },
        });

        render(
            <MemoryRouter>
                <DartsDel />
            </MemoryRouter>
        );

        expect(axios.get).toHaveBeenCalledWith("https://darts.sulla.hu/darts/1");

        await waitFor(() => {
            expect(screen.getByText("Törlendő dartsozó neve: John Doe")).toBeInTheDocument();
            expect(screen.getByText("Születési éve: 1990-05-15")).toBeInTheDocument();
            expect(screen.getByText("Megnyert világbajnokságai: 3")).toBeInTheDocument();
            expect(screen.getByRole("link", { name: "Profil link" })).toHaveAttribute("href", "https://example.com/profile");
            expect(screen.getByRole("img", { name: "John Doe" })).toHaveAttribute("src", "https://example.com/image.jpg");
        });
    });

    test("should send DELETE request and navigate on form submit", async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                name: "John Doe",
                birth_date: "1990-05-15",
                world_ch_won: 3,
                profile_url: "https://example.com/profile",
                image_url: "https://example.com/image.jpg",
            },
        });

        axios.delete.mockResolvedValueOnce({});

        render(
            <MemoryRouter>
                <DartsDel />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText("Törlendő dartsozó neve: John Doe")).toBeInTheDocument());

        fireEvent.click(screen.getByRole("button", { name: "Törlés" }));

        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith("https://darts.sulla.hu/darts/1");
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });
});
