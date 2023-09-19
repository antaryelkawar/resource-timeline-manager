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
    });
    setNeedsRefresh(false)
  }, [needsRefresh, selectedItem]);

  const menuItems: MenuItem[] = [
    {
      label: 'Add',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        setSelectedItem(null);
        setShowSidebar(true);
      }
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      disabled: !selectedItem,
      command: () => {
        setShowSidebar(true);
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-fw pi-minus',
      disabled: !selectedItem,
      command: () => {
        RestClient.deleteItem(selectedItem).then(() => {
          setSelectedItem(null);
          setNeedsRefresh(true);
        });
      }
    }
  ];

  return (
    <>
      <div className="card">
        <Menubar model={menuItems} />
      </div>
      <div className="card">
        <ResourceTimeline groups={groups} items={items} setSelectedItem={setSelectedItem} needsRefresh={needsRefresh} />
      </div>
      <ItemSidebar setShow={setShowSidebar} show={showSidebar} setNeedsRefresh={setNeedsRefresh} selectedItem={items.find(item => item.id === selectedItem)} />
    </>
  )
}