import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const DartsMod =()=> {
    const params = useParams();
    const id = params.dartsId;
    const navigate = useNavigate();
    const [darts, setDarts] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });
    useEffect(() => {
        const fetchDartsData = async () => {
            try {
                const response = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setDarts(response.data);
            } catch (error) {
                console.log('Error fetching darts data:', error);
            }
        };

        fetchDartsData();
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setDarts(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://darts.sulla.hu/darts/${id}`, darts)
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.log('Error updating darts data:', error);
        });
};

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Egy dartsozó módosítása</h2>
            <form onSubmit={handleSubmit}>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Dartsozó név:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={darts.name} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Születési dátum:</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" defaultValue={darts.birth_date} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságok:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" value={darts.world_ch_won.toString()} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control" defaultValue={darts.profile_url} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="form-control" defaultValue={darts.image_url} onChange={handleInputChange}/><br />
                    <img src={darts.image_url} height="200px" alt={darts.name}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
};