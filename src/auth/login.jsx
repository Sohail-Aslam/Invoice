import React from "react";

function login() {
  return (
    <div style={{height:'100%', width:'100%', alignItems:'center', display:'flex'}}>
    <div className="login-container">
      <div className="login-img">
        <div>
          <img src="public/Invoice.png" alt="" height="300px" />
        </div>
      </div>
      <div className="login-form">
        <form action="" className="form">
          <input className="login-input" type="email" placeholder="Email..." />
          <input
            className="login-input"
            type="password"
            placeholder="Password..."
          />
        </form>
        <button type="submit">Login</button>
      </div>
    </div>
    
    </div>
  );
}

export default login;
