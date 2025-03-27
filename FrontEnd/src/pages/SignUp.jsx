import React from "react";
import styled from "styled-components";
import { SignUpForm } from "../components/SignUpForm";

const FormContainer = styled.div`
    width: 90%;
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 8px;

    @media screen and (max-width: 768px) {
        width: 95%;
        padding: 15px;
    }
`;

// Change to default export
const SignUp = () => {
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <SignUpForm />
        </FormContainer>
    );
};

export default SignUp;  // Default export
