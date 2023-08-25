import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';

const storedPass: string = "password123"
const cookies = new Cookies();

export default function LoginPage() {

  const [user, setUser] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <div className='flex justify-content-center'>
      <form>
        <label>
          <p>Name</p>
          <InputText type="text" onChange={e => setUser(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <InputText type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div style={{ paddingTop: "10px" }}>
          <Button type="submit" label="Submit"
            onClick={() => {
              let isAuthenticated = password === storedPass
              cookies.set('isAuthenticated', isAuthenticated);
              location.href = "#/resource";
            }} />
        </div>
      </form>
    </div>
  )
}