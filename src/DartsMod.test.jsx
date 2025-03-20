import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { DartsMod } from './DartsMod';

jest.mock('axios');

describe('DartsMod Component', () => {
    test('renders the component', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                id: 1,
                name: 'John Doe',
                birth_date: '1990-01-01',
                world_ch_won: 3,
                profile_url: 'http://example.com/profile',
                image_url: 'http://example.com/image'
            }
        });

        render(
            <BrowserRouter>
                <DartsMod />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Egy dartsozó módosítása')).toBeInTheDocument();
        });
    });

    test('renders the form fields', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                id: 1,
                name: 'John Doe',
                birth_date: '1990-01-01',
                world_ch_won: 3,
                profile_url: 'http://example.com/profile',
                image_url: 'http://example.com/image'
            }
        });

        render(
            <BrowserRouter>
                <DartsMod />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByLabelText('Dartsozó név:')).toBeInTheDocument();
            expect(screen.getByLabelText('Születési dátum:')).toBeInTheDocument();
            expect(screen.getByLabelText('Nyert világbajnokságok:')).toBeInTheDocument();
            expect(screen.getByLabelText('Profil URL-je:')).toBeInTheDocument();
            expect(screen.getByLabelText('Kép URL-je:')).toBeInTheDocument();
        });
    });

    test('submits the form', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                id: 1,
                name: 'John Doe',
                birth_date: '1990-01-01',
                world_ch_won: 3,
                profile_url: 'http://example.com/profile',
                image_url: 'http://example.com/image'
            }
        });

        axios.put.mockResolvedValueOnce({});

        render(
            <BrowserRouter>
                <DartsMod />
            </BrowserRouter>
        );

        await waitFor(() => {
            fireEvent.change(screen.getByLabelText('Dartsozó név:'), { target: { value: 'Jane Doe' } });
            fireEvent.change(screen.getByLabelText('Születési dátum:'), { target: { value: '1991-01-01' } });
            fireEvent.change(screen.getByLabelText('Nyert világbajnokságok:'), { target: { value: '4' } });
            fireEvent.change(screen.getByLabelText('Profil URL-je:'), { target: { value: 'http://example.com/new-profile' } });
            fireEvent.change(screen.getByLabelText('Kép URL-je:'), { target: { value: 'http://example.com/new-image' } });

            fireEvent.submit(screen.getByRole('button', { name: /küldés/i }));
        });

        expect(axios.put).toHaveBeenCalledWith(
            'https://darts.sulla.hu/darts/1',
            {
                name: 'Jane Doe',
                birth_date: '1991-01-01',
                world_ch_won: '4',
                profile_url: 'http://example.com/new-profile',
                image_url: 'http://example.com/new-image',
            }
        );
    });
});
