import * as React from 'react';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useEffect, useRef } from 'react';
import { Client } from '../App';

const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

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

    return (
        <div>
            <Menubar model={items} start={start} />
        </div>
    );
}