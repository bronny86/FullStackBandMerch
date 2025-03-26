import React from "react";
import styled from "styled-components";
import { SignUpForm } from "../components/SignUpForm";

const FormContainer = styled.div`
    width: 90%; /* Take up 90% of the screen width */
    max-width: 800px; /* Limit the maximum width */
    margin: 50px auto; /* Center the form horizontally and add vertical spacing */
    padding: 20px; /* Add padding for spacing */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better visibility */
    background-color: #fff; /* Optional: Add a background color */
    border-radius: 8px; /* Optional: Add rounded corners */

    @media screen and (max-width: 768px) {
        width: 95%; /* Take up more space on smaller screens */
        padding: 15px; /* Reduce padding for smaller screens */
    }
`;

export function SignUp() {
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <SignUpForm />
        </FormContainer>
    );
}