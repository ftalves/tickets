import { useState, useEffect } from 'react';

import { useRequest } from 'hooks';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { request, data, errors, loading } = useRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    request({
      url: '/api/users/signup',
      method: 'post',
      body: { email, password },
    });
  };

  useEffect(() => {
    if (data && !loading) {
      alert('Signup success!');
    }
  }, [data, loading]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary">Sign Up</button>
      {errors.length ? (
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {errors.map((err) => (
              <li key={err.msg}>{err.msg}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </form>
  );
};

export default Signup;
