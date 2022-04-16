import authentication_verifier from "../../validators/authentication_verifier";

const navigation_bar_data = [

    {
        label: "Home",
        index: 0,
        path: "/"
    },
    {
        label: "Create Message",
        index: 1,
        path: "/create_message"
    },
    ...(
        !authentication_verifier() ? (
            [
                {
                    label: "Sign Up",
                    index: 2,
                    path: "/sign_up"
                },
                {
                    label: "Sign In",
                    index: 3,
                    path: "/sign_in"
                }
            ]
        ) :
        []
    )

]

export default navigation_bar_data;