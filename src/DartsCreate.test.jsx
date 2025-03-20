import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { DartsCreate } from './DartsCreate';

jest.mock('axios');

describe('DartsCreate Component', () => {
    test('renders the component', () => {
        render(
            <BrowserRouter>
                <DartsCreate />
            </BrowserRouter>
        );
        expect(screen.getByText('Új darts-játékos')).toBeInTheDocument();
    });

    test('renders the form fields', () => {
        render(
            <BrowserRouter>
                <DartsCreate />
            </BrowserRouter>
        );
        expect(screen.getByLabelText('Dartsozó neve:')).toBeInTheDocument();
        expect(screen.getByLabelText('Születési éve:')).toBeInTheDocument();
        expect(screen.getByLabelText('Nyert világbajnokságai:')).toBeInTheDocument();
        expect(screen.getByLabelText('Profil URL-je:')).toBeInTheDocument();
        expect(screen.getByLabelText('Kép URL-je:')).toBeInTheDocument();
    });

    test('submits the form', async () => {
        axios.post.mockResolvedValueOnce({});

        render(
            <BrowserRouter>
                <DartsCreate />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText('Dartsozó neve:'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Születési éve:'), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText('Nyert világbajnokságai:'), { target: { value: '3' } });
        fireEvent.change(screen.getByLabelText('Profil URL-je:'), { target: { value: 'http://example.com/profile' } });
        fireEvent.change(screen.getByLabelText('Kép URL-je:'), { target: { value: 'http://example.com/image' } });

        fireEvent.submit(screen.getByRole('button', { name: /küldés/i }));

        expect(axios.post).toHaveBeenCalledWith(
            'https://darts.sulla.hu/darts',
            {
                name: 'John Doe',
                birth_date: '1990-01-01',
                world_ch_won: '3',
                profile_url: 'http://example.com/profile',
                image_url: 'http://example.com/image',
            },
            { headers: { 'Content-Type': 'application/json' } }
        );
    });
});
