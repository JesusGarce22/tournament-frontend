"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../config/axios";
import styles from "./createTournament.module.css";

export default function CreateTournament() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tournamentData = { name, description };

    try {
      const token = localStorage.getItem('token');
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.post("/tournament/create", tournamentData);

      if (response.status === 201) {
        console.log("Tournament created successfully:", response.data);
        router.push("/");
      } else {
        console.error("Failed to create tournament:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating tournament:", error);
    }
  };

  return (
    <div className={styles.page}>
      <h2>Create a New Tournament</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tournament Name"
          className={styles.inputField}
          required
        />

        <label className={styles.label}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className={styles.inputField}
          required
        />

        <button type="submit" className={styles.button}>
          Create Tournament
        </button>
      </form>
    </div>
  );
}
