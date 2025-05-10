import "./LoginPage.css"
import {useState} from 'react';
import { useNavigate } from "react-router";
import { attemptLogin } from "../../services/UserServices";

const LoginPage = () =>{
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await attemptLogin({ email, password });

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', JSON.stringify(data.userId));
      localStorage.setItem("email", data.email );
      localStorage.setItem("avatar", data.image);

      navigate('/'); // or homepage
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    return(
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        
        <div className="input-box">
          <input type="text" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
        {/* <div className="input-box">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div> */}
        <div className="input-box">
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
            <button className="btn-typ4">Login</button>
      </form> 
        </div>
    )
}

export{
    LoginPage
}