import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { DartsMod } from "./DartsMod";
import axios from "axios";
import { jest } from "@jest/globals";
import React from 'react';


jest.mock("axios");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ dartsId: "1" }),
    useNavigate: jest.fn(),
}));

describe("DartsMod component", () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = require("react-router-dom").useNavigate();
        mockNavigate.mockReturnValue(jest.fn());
    });

    test("should fetch and display darts player data in form", async () => {
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
                <DartsMod />
            </MemoryRouter>
        );

        expect(axios.get).toHaveBeenCalledWith("https://darts.sulla.hu/darts/1");

        await waitFor(() => {
            expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
            expect(screen.getByDisplayValue("1990-05-15")).toBeInTheDocument();
            expect(screen.getByDisplayValue("3")).toBeInTheDocument();
            expect(screen.getByDisplayValue("https://example.com/profile")).toBeInTheDocument();
            expect(screen.getByDisplayValue("https://example.com/image.jpg")).toBeInTheDocument();
            expect(screen.getByRole("img", { name: "John Doe" })).toHaveAttribute("src", "https://example.com/image.jpg");
        });
    });

    test("should update darts player data on form submission", async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                name: "John Doe",
                birth_date: "1990-05-15",
                world_ch_won: 3,
                profile_url: "https://example.com/profile",
                image_url: "https://example.com/image.jpg",
            },
        });

        axios.put.mockResolvedValueOnce({});

        render(
            <MemoryRouter>
                <DartsMod />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument());

        fireEvent.change(screen.getByDisplayValue("John Doe"), { target: { value: "Jane Doe" } });
        fireEvent.change(screen.getByDisplayValue("1990-05-15"), { target: { value: "1992-08-22" } });
        fireEvent.change(screen.getByDisplayValue("3"), { target: { value: "5" } });

        fireEvent.click(screen.getByRole("button", { name: "Küldés" }));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith("https://darts.sulla.hu/darts/1", {
                name: "Jane Doe",
                birth_date: "1992-08-22",
                world_ch_won: "5",
                profile_url: "https://example.com/profile",
                image_url: "https://example.com/image.jpg",
            });
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });
});
