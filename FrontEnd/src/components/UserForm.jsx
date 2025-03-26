
import { useContext, useState } from "react";

import { GlobalContext } from "../reducers/globalReducer";

export default function UserForm() {
    const { store, dispatch } = useContext(GlobalContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [decodedJWT, setDecodedJWT] = useState({})

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        let headers = new Headers();

        headers.set(
            "Authorization",
            "Basic " + btoa(username + ":" + password)
        );

        const resp = await fetch("http://localhost:5173", {
            headers: headers,
        });

        const data = await resp.json();

        const token = data.freshJWT;

        dispatch({
            type: "setUser",
            data: {
                username: username,
                password: password,
            },
        });

        dispatch({
            type: "setToken",
            data: token,
        });
    };

    const onAccessProtectedRoute = async (e) => {
        e.preventDefault();

        let headers = new Headers();

        headers.set(
            "jwt",
            store.token
        );

        const resp = await fetch("http://localhost:5173/someProtectedRoute", {
            headers: headers,
        });

        const data = await resp.json();

        const decodedJWT = data.decodedJWT;

        setDecodedJWT(decodedJWT)

    };

    return (
        <div
            style={{
                textAlign: "center",
                marginTop: 100,
            }}
        >
            <h1>UserForm</h1>
            <form>
                <div
                    style={{
                        marginBottom: 20,
                    }}
                    onChange={onChangeUsername}
                >
                    <label>username: </label>
                    <input></input>
                </div>
                <div
                    style={{
                        marginBottom: 20,
                    }}
                    onChange={onChangePassword}
                >
                    <label>password: </label>
                    <input></input>
                </div>
                <div>
                    <button onClick={onSubmit}>Submit</button>
                </div>
                <div
                    style={{
                        marginTop: 20,
                    }}
                >
                    <button onClick={onAccessProtectedRoute}>
                        Access Protected Route
                    </button>
                </div>
                <div
                    style={{
                        marginTop: 20,
                    }}
                >
                    {decodedJWT.username} : {decodedJWT.password} :{" "}
                    {decodedJWT.iat} : {decodedJWT.exp}
                </div>
            </form>
        </div>
    );
}