import './Login.css';

const Login = () => {

    const handleLogin = () => {
        window.location.href = 'http://localhost:5555/api/auth/twitch';
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Welcome to Our Platform</h1>
                <p className="login-description">
                    Log in with Twitch to access exclusive content and features.
                    Connect with your community and get started now!
                </p>
                <button className="twitch-login" onClick={handleLogin}>Login with Twitch</button>
            </div>
        </div>
    )
};

export default Login;
