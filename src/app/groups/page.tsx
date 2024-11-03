"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../config/axios";
import styles from "./createGroup.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Tournament {
    id: string;
    name: string;
}

interface Group {
    id: string;
    name: string;
    seeding: number;
    tournamentId: string;
}

export default function GroupManagement() {
    const [groupName, setGroupName] = useState("");
    const [seeding, setSeeding] = useState<number>(0);
    const [tournamentId, setTournamentId] = useState<string>("");
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupId, setGroupId] = useState<string>("");
    const [group, setGroup] = useState<Group | null>(null);
    const [view, setView] = useState("createGroup");
    const router = useRouter();

    useEffect(() => {
        axiosInstance.get<Tournament[]>('/tournament', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => setTournaments(response.data))
        .catch(()=>toast.error("Error fetching tournaments: please singin before"));
    }, []);

    useEffect(() => {
        axiosInstance.get<Group[]>('/group', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => setGroups(response.data))
        .catch(() => toast.error("Error fetching groups: please singin before"));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newGroup = { name: groupName, seeding, tournamentId };
            await axiosInstance.post('/group/create', newGroup, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            toast.success("Group created successfully");
            router.push("/");
        } catch (error) {
            if (groupName.length < 5){
                toast.warn("The group name must be more than 5 characters")
            }else{
                toast.error("Error creating group: "+error);
            }
        }
    };

    const handleUpdateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedGroup = { name: groupName, seeding };
            await axiosInstance.put(`/group/${groupId}`, updatedGroup, { 
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            toast.success("Group updated successfully");
        } catch (error) {
            if (groupName.length < 5){
                toast.warn("The group name must be more than 5 characters")
            }else{
                toast.error("Error updating group"+ error);
            }
        }
    };    

    const fetchGroupById = async () => {
        try {
            const response = await axiosInstance.get<Group>(`/group/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setGroup(response.data);
        } catch (error) {
            toast.error("Error fetching group by ID: "+error);
        }
    };

    const fetchGroupsByTournament = async () => {
        try {
            const response = await axiosInstance.get<Group[]>(`/group/getByTournamentID/${tournamentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setGroup(response.data[0] || null);
        } catch (error) {
            toast.error("Error fetching groups for tournament: " + error);
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1>Group Management</h1>
                <nav className={styles.navbar}>
                    <button onClick={() => router.push("/")}>Home</button>
                    <button onClick={() => setView("createGroup")}>Create Group</button>
                    <button onClick={() => setView("editGroup")}>Edit Group information</button>
                    <button onClick={() => setView("groupById")}>Group information</button>
                    <button onClick={() => setView("groupsByTournament")}>Groups of a Tournament</button>
                </nav>
            </header>

            {view === "createGroup" && (
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <label className={styles.label}>Group Name</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group name, more than 5 characters"
                        className={styles.inputField}
                        min={5}
                        required
                    />

                    <label className={styles.label}>Seeding</label>
                    <input
                        type="number"
                        value={seeding}
                        onChange={(e) => setSeeding(Number(e.target.value))}
                        placeholder="Enter seeding number, just par numbers"
                        className={styles.inputField}
                        min="4"
                        required
                    />

                    <label className={styles.label}>Tournament</label>
                    <select
                        value={tournamentId}
                        onChange={(e) => setTournamentId(e.target.value)}
                        className={styles.inputField}
                        required
                    >
                        <option value="" disabled>Select a tournament</option>
                        {tournaments.map((tournament) => (
                            <option key={tournament.id} value={tournament.id}>
                                {tournament.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className={styles.button}>
                        Create Group
                    </button>
                </form>
            )}

            {view === "groupById" && (
                <div>
                    <h2>Group information</h2>
                    <select
                        value={groupId}
                        onChange={(e) => {
                            setGroupId(e.target.value);
                            setGroup(null);
                        }}
                        className={styles.inputField}
                    >
                        <option value="" disabled></option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={fetchGroupById} className={styles.button}>
                        Fetch Group
                    </button>
                    {group && (
                        <div>
                            <p><strong>ID:</strong> {group.id}</p>
                            <p><strong>Name:</strong> {group.name}</p>
                            <p><strong>Seeding:</strong> {group.seeding}</p>
                        </div>
                    )}
                </div>
            )}

            {view === "groupsByTournament" && (
                <div>
                    <h2>Groups by a Tournament</h2>
                    <select
                        value={tournamentId}
                        onChange={(e) => setTournamentId(e.target.value)}
                        className={styles.inputField}
                    >
                        <option value="" disabled>Select a tournament</option>
                        {tournaments.map((tournament) => (
                            <option key={tournament.id} value={tournament.id}>
                                {tournament.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={fetchGroupsByTournament} className={styles.button}>
                        Show Groups
                    </button>
                    {group ? (
                        <div>
                            <p><strong>ID:</strong> {group.id}</p>
                            <p><strong>Name:</strong> {group.name}</p>
                            <p><strong>Seeding:</strong> {group.seeding}</p>
                        </div>
                    ) : (
                        <p>No groups found for this tournament.</p>
                    )}
                </div>
            )}

            {view === "editGroup" && (
                <div>
                    <h2>Edit Group Information</h2>
                    <label className={styles.label}></label>
                    <select
                        value={groupId}
                        onChange={(e) => {
                            setGroupId(e.target.value);
                            setGroup(null);
                        }}
                        className={styles.inputField}
                    >
                        <option value="" disabled>Select a group</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={fetchGroupById} className={styles.button}>
                        Show Group
                    </button>

                    {group && (
                        <form onSubmit={handleUpdateGroup} className={styles.formContainer}>
                            <label className={styles.label}>Group Name</label>
                            <input
                                type="text"
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder="Enter group name, more than 5 characters"
                                className={styles.inputField}
                                min={5}
                                required
                            />

                            <label className={styles.label}>Seeding</label>
                            <input
                                type="number"
                                onChange={(e) => setSeeding(Number(e.target.value))}
                                placeholder="Enter seeding number"
                                className={styles.inputField}
                                min="4"
                                required
                            />

                            <button type="submit" className={styles.button}>
                                Update Group
                            </button>
                        </form>
                    )}
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
