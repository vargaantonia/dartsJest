import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const DartsListPage = () => {
  const [dartses, setDartses] = useState([]);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    axios.get('https://darts.sulla.hu/darts')
      .then(response => setDartses(response.data))
      .catch(error => console.log(error))
      .finally(() => setPending(false));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Dartsozók</h2>
      {isPending ? (<div className="spinner-border"></div>) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">

          {dartses.map((darts, index) => (
            <div className="col" key={index}>
            <div className="card h-100">
            <p className="text-danger text-center">Dartsozó neve: {darts.name}</p>
            <p className="text-danger text-center">Születési éve: {darts.birth_date}</p>
            <p className="text-danger text-center">Megnyert világbajnokságai: {darts.world_ch_won}</p>
                <div className="card-body d-flex flex-column align-items-center">
                    <Link to={darts.profile_url} className="btn btn-success fs-6 mb-3" target="_blank">Profil link</Link>
                    <Link to={`/darts/${darts.id}`}>
                        <img src={darts.image_url || "https://via.placeholder.com/400x800"} alt={darts.name} className="img-fluid" style={{ width: "200px" }} />
                    </Link>
                    <div className="d-flex justify-content-center mt-3">
                        <Link className="text-center" to={`/del-darts/${darts.id}`}>
                            <i className="bi bi-trash3 fs-3 btn btn-danger btn-sm"></i>
                        </Link>&nbsp; &nbsp; &nbsp;
                        <Link to={`/darts/${darts.id}`}>
                            <i className="bi bi-pencil-square fs-3 btn btn-warning btn-sm"></i>
                        </Link>&nbsp; &nbsp; &nbsp;
                        <Link to={`/mod-darts/${darts.id}`}>
                            <i className="bi bi-text-paragraph fs-3 btn btn-primary btn-sm"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
          ))}
        </div>
      )}
    </div>
  );
};
