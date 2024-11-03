"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import styles from "./home.module.css";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Tournament {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const { user } = useCurrentUser();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        const response = await axiosInstance.get("/tournament");
        setTournaments(response.data);
      } catch (error) {
        toast.error("Error fetching tournaments:"+ error);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div>
      <title>Home</title>
      <header className={styles.header}>
        <div className={styles.logo}>Tournament Management</div>
        <nav className={styles.nav}>
          <a href="#about">About</a>
          <a href="/groups">Groups</a>
          <a href="/tournaments">Create Tournament</a>
          <a href="/editUser">{user ? (
            <>
              <span className={styles.userGreeting}>{user.name}</span>
            </>
          ) : (
            <a href="/login" className={styles.btnLogin}>Login</a>
          )}</a>
          <a href="/" onClick={ (e) => {Cookies.remove("currentUser"); 
            localStorage.setItem('token',"")
          }}>Loguot</a>
        </nav>
      </header>

      <main>
        <section id="about" className={styles.about}>
          <img src="https://play-lh.googleusercontent.com/rdBroXcP_IpVpIF-xQQB16d21CBFDlpRC3hAgCpwQA1N0dHVH4Yf5EPp-B7QVZ8zJZQ" alt="App overview" className={styles.aboutImage} />
          <p>
            Our platform is designed to simplify tournament management, whether for sports or online games. With customizable tournament formats, real-time tracking, and an intuitive user interface, organizing competitions has never been easier. Join us to create, manage, and participate in tournaments effortlessly.
          </p>
        </section>

        <section id="tournaments" className={styles.tournaments}>
          <h2>Available Tournaments</h2>
          <div className={styles.tournamentList}>
            {tournaments.length > 0 ? (
              tournaments.map((tournament) => (
                <div key={tournament.id} className={styles.tournamentCard}>
                  <h3 className={styles.tournamentTitle}>{tournament.name}</h3>
                  <p className={styles.tournamentDescription}>{tournament.description}</p>
                  {user ? (
                    <a href={`/tournament/${tournament.id}`} className={styles.btnDetails}>View Details</a>
                  ) : (
                    <span className={styles.btnDetailsDisabled}>Login to view details</span>
                  )}
                </div>
              ))
            ) : (
              <p>No tournaments available at the moment. please singin if you dont do it</p>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Icesi Tournaments. All rights reserved.</p>
      </footer>
    </div>
  );
}
