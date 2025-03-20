import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const DartsSingle = () => {
  const { dartsId } = useParams();
  const [darts, setDarts] = useState(null);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      try {
        const response = await
axios.get(`https://darts.sulla.hu/darts/${dartsId}`);
        setDarts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    };
    fetchData();
  }, [dartsId]);

  if (isPending || !darts) {
    return <div className="spinner-border"></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Dartsozó</h2>
      <div className="card">
        <h3 className="text-center">Neve: {darts.name}</h3>
        <p className="text-center">Születési éve: {darts.birth_date}</p>
        <p className="text-center">Világbajnoki győzelmei:
{darts.world_ch_won}</p>
        <div className="d-flex justify-content-center mt-3">
        <div className="card-body d-flex flex-column align-items-center">
                <Link to={darts.profile_url} className="btn btn-success fs-6 mb-3" target="_blank">Profil link</Link>
                    <Link to={`/darts/${darts.id}`}>
                        <img src={darts.image_url || "https://via.placeholder.com/400x800"} alt={darts.name} className="img-fluid" style={{ width: "200px" }} />
                    </Link>
                    <div className="d-flex justify-content-center text-center mt-3">
                    <Link to={`/mod-darts/${darts.id}`}>
                            <i className="bi bi-text-paragraph fs-3 btn btn-primary btn-sm"></i>
                        </Link>&nbsp; &nbsp; &nbsp;
                        <Link to={`/darts/${darts.id}`}>
                            <i className="bi bi-pencil-square fs-3 btn btn-warning btn-sm"></i>
                        </Link>&nbsp; &nbsp; &nbsp;
                        <Link to={`/del-darts/${darts.id}`}>
                            <i className="bi bi-trash3 fs-3 btn btn-danger btn-sm"></i>
                        </Link>
                    </div>
            </div>
        </div>
      </div>
    </div>
  );
};