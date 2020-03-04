import GoogleLogin from "react-google-login";
import ApiService from "./ApiService";
import React from "react";

async function onSignIn(googleUser)
{
    const token = googleUser.getAuthResponse().id_token;
    let i = await ApiService.connectTo('google', [{name: 'token', value: token}]);
    console.log(i);
}

function onFailure(err)
{
    console.log(err);
}

export default function getSpecificButton(name)
{
    switch (name) {
        case 'Google':
            return (
                <GoogleLogin
                    clientId="12906168737-9v1ildio54gfsic452snnvubv5j8nkm5.apps.googleusercontent.com"
                    buttonText={"Login with google"}
                    onSuccess={onSignIn}
                    onFailure={onFailure}
                />
            );
        default:
            return undefined;
    }
};
