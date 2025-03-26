import { useContext, useState } from "react";

import { GlobalContext } from "../reducers/globalReducer";

export default function UserForm() {
    const { dispatch } = useContext(GlobalContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "setUser",
            data: {
                username: username,
                password: password,
            },
        });
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
                >
                    <label>username: </label>
                    <input
                        onChange={onChangeUsername}
                    ></input>
                </div>
                <div
                    style={{
                        marginBottom: 20,
                    }}
                >
                    <label>password: </label>
                    <input
                        onChange={onChangePassword}
                    ></input>
                </div>
                <div>
                    <button onClick={onSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );
}