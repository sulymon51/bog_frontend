import * as ActionType from '../type';
import axios from '../../config/config';
import Swal from "sweetalert2";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
// import setAuthToken from '../../config/setAuthHeader';
import { setAlert } from './alert';

// const BASE_URL = process.env.REACT_APP_URL;
// const config = {
//     headers: {
//         "Content-Type": "application/json",

//     }
// }


export const registerSuccess = (payload) => {
    return {
        type: ActionType.REGISTER_SUCCESS,
        payload
    }
}

export const setUser = (payload) => {
    return {
        type: ActionType.USER_LOADED,
        payload
    }
}

export const setError = (payload) => {
    return {
        type: ActionType.SET_ERROR,
        payload
    }
}

export const login = (payload) => {
    return {
        type: ActionType.LOGIN_SUCCESS,
        payload
    }
}

export const getMe = () => {
    return async (dispatch) => {
            // setAuthToken(localStorage.auth_token);
            try {
                const type = localStorage.getItem("userType")
                const token = localStorage.getItem("auth_token")
                let url = `/user/me`;
                const config = {
                    header: {
                        Authorization: token
                    }
                }
                if (type) {
                   url = `/user/me?userType=${type}` 
                }
                const response = await axios.get(url, config);
                console.log(response);
                dispatch(setUser(response))
            } catch (error) {
                console.log(error.message);
                // dispatch(setError(error.message));
                toaster.notify(
                    error.message,
                    {
                        duration: "4000",
                        position: "bottom",
                    }
                );
            }

    }
}

export const loginUser = (apiData, navigate, stopLoading) => {
    return async (dispatch) => {
        try {
            const url = `/user/login`;
            const response = await axios.post(url, apiData);
            console.log(response);
            dispatch(login(response));
            stopLoading();
            Swal.fire({
                title: "Success",
                imageUrl: "https://t4.ftcdn.net/jpg/05/10/52/31/360_F_510523138_0c1lsboUsa9qvOSxdaOrQIYm2eAhjiGw.jpg",
                imageWidth: "75px",
                text: "Login completed successfully",
                buttonsStyling: "false",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3F79AD",
            }).then(() => {
                navigate("/dashboard");
            })
        } catch (error) {
            console.log(error.message);
            const errors = error.response.data.message;
            stopLoading();
            dispatch(setError(errors));
            dispatch(setAlert(errors, "danger"))
            toaster.notify(
                errors,
                {
                    duration: "4000",
                    position: "bottom",
                }
            );
        }
    }
}

export const loginAdmin = (apiData, navigate, stopLoading) => {
    return async (dispatch) => {
        try {
            const url = `/admin/login`;
            const response = await axios.post(url, apiData);
            console.log(response);
            dispatch(login(response));
            stopLoading();
            localStorage.removeItem("userType")
            Swal.fire({
                title: "Success",
                imageUrl: "https://t4.ftcdn.net/jpg/05/10/52/31/360_F_510523138_0c1lsboUsa9qvOSxdaOrQIYm2eAhjiGw.jpg",
                imageWidth: "75px",
                text: "Login completed successfully",
                buttonsStyling: "false",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3F79AD",
            }).then(() => {
                navigate("/dashboard");
            })
        } catch (error) {
            console.log(error.message);
            const errors = error.response.data.message;
            stopLoading();
            dispatch(setError(errors));
            dispatch(setAlert(errors, "danger"))
            toaster.notify(
                errors,
                {
                    duration: "4000",
                    position: "bottom",
                }
            );
        }
    }
}

export const register = (apiData, navigate, stopLoading) => {
    return async (dispatch) => {
        try {
            const url = `/user/signup`;
            const response = await axios.post(url, apiData);
            console.log(response);
            dispatch(registerSuccess(response));
            localStorage.removeItem("reference");
            stopLoading();
            Swal.fire({
                title: "Registration Completed Successfully",
                icon: "success",
                text: "Check Your E-mail to complete verification"
            }).then(() => {
                navigate("/login");
            })
        } catch (error) {
            console.log(error.message);
            const errors = error.response.data.message;
            dispatch(setError(errors));
            dispatch(setAlert(errors, "danger"))
            stopLoading();
            console.log(errors);

            toaster.notify(
                errors,
                {
                    duration: "4000",
                    position: "bottom",
                }
            );
        }
    }
}
// Logout
export const logout = () => (dispatch) => {
    dispatch({ type: ActionType.LOGOUT });
    window.location.href = "/login";
};
