import axios from "axios";
import { useState } from "react";

function SignIn() {

    interface Credentials {
        username: string,
        password: string
    }

    const [ credentials, setCredentials ] = useState<Credentials>({
        username: '',
        password: ''
    })

    const attempt_sign_in = () => {
        
    }

    return (

        <div>
            <form>
                <input type = 'text' value = {credentials.username} name = 'username'/>
            </form>
        </div>

    )

}

export default SignIn;