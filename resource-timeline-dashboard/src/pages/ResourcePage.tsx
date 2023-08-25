import React, { useEffect, useState } from 'react';
import { ResourceTimeline } from '../components/ResourceTimeline';
import * as RestClient from '../utils/RestClient'
import { CustomTimelineGroup, CustomTimelineItem } from '../models/TimelineModel';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { ItemSidebar } from '../components/ItemSidebar';

export default function ResourcePage() {

  const [items, setItems] = useState<CustomTimelineItem[]>([]);
  const [groups, setGroups] = useState<CustomTimelineGroup[]>([]);
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>();

  useEffect(() => {
    RestClient.getGroups().then(response => setGroups(response))
    RestClient.getItems().then((response: any[]) => {
      const customItems = response.map(item => new CustomTimelineItem(item));
      setItems(customItems);
      console.log(customItems);
    });

  }, [needsRefresh]);

  const menuItems: MenuItem[] = [
    {
      label: 'Add',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        setSelectedItem(undefined);
        setShowSidebar(true);
      }
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        setShowSidebar(true);
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-fw pi-minus',
      command: () => {
        setShowSidebar(true);
      }
    }
  ];

  return (
    <>
      <div className="card">
        <Menubar model={menuItems} />
      </div>
      <div className="card">
        <ResourceTimeline groups={groups} items={items} setSelectedItem={setSelectedItem} />
      </div>
      <ItemSidebar setShow={setShowSidebar} show={showSidebar} setNeedsRefresh={setNeedsRefresh} selectedItem={items.find(item => item.id === selectedItem)} />
    </>
  )
}