import { useEffect } from "react";
import { useNavigate } from "react-router";

function Index() {

    const navigate = useNavigate()

    useEffect(() => {
        navigate("/calendar")
    })

    return (
        <h1>Welcome to the application</h1>
    )
}

export default Index;