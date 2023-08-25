import * as React from 'react';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import Cookies from 'universal-cookie';

const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
const cookies = new Cookies();

interface HeaderProps {
}

export default function Header(props: HeaderProps) { 

    const items: MenuItem[] = [
        {
            label: 'Resource',
            icon: 'pi pi-fw pi-book',
            url: '#/resource'
        }
    ]

    const endItem = <Button icon="pi pi-sign-out" rounded text aria-label="Cancel" onClick={() => {
        cookies.remove("isAuthenticated");
        location.href = "#/login";
    }}/>

    return (
        <div>
            <Menubar model={items} start={start} end={endItem} />
        </div>
    );
}