import { useState } from 'react'

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const onSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
  }

  return <form onSubmit={onSubmit}>
    <h1>
      Sign Up
    </h1>
    <div className="form-group">
      <label>Email Address</label>
      <input className="form-control"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
    </div>
    <div className="form-group">
      <label>Password</label>
      <input type='password' className="form-control"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
    </div>
    <button className="btn btn-primary">Sign Up</button>
  </form>
}

export default SignUp;
