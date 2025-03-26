import React, { useState } from "react";
import "../styles.css";

export function SignUpForm() {
    const [bandName, setBandName] = useState("");
    const [email, setEmail] = useState("");
    const [label, setLabel] = useState("");
    const [genre, setGenre] = useState("");
    const [location, setLocation] = useState("");
    const [contact, setContact] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bandName, email, label, genre, location, contact);
    };

    return (
        <div
            style={{
                width: "100%", // Full width of the page
                maxWidth: "600px", // Limit the maximum width of the form
                margin: "50px auto", // Center the form horizontally and add vertical spacing
                padding: "30px", // Add padding for spacing
                backgroundColor: "#fff", // Background color for the form container
                borderRadius: "8px", // Rounded corners
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for better visibility
                boxSizing: "border-box", // Ensure padding doesn't affect width
            }}
        >
            <form onSubmit={handleSubmit}>
                <label htmlFor="bandName">Band Name:</label>
                <input
                    type="text"
                    id="bandName"
                    name="bandName"
                    value={bandName}
                    onChange={(e) => setBandName(e.target.value)}
                    autoComplete="organization"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                    }}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                    }}
                    required
                />

                <label htmlFor="label">Label:</label>
                <input
                    type="text"
                    id="label"
                    name="label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    autoComplete="organization-title"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                    }}
                />

                <label htmlFor="genre">Genre:</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    autoComplete="off"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                    }}
                />

                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    autoComplete="address-line1"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                    }}
                />

                <label htmlFor="contact">Contact:</label>
                <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    autoComplete="tel"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                    }}
                    required
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#256ce1",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}