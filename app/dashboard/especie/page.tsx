'use client';
import SidebarC from '@/app/components/sidebar/SidebarC';
import { Tabs } from 'flowbite-react';
import 'app/globals.css'


const DashboardIndexPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarC />
      <div style={{ flex: 1, marginLeft: '20px', marginTop:'100px', marginRight:'50px' }}>
        <Tabs.Group
        aria-label="Tabs with icons"
        style='underline'
      >
        <Tabs.Item
          active
          title="Taxonomia"
        >
          <p>
            This is
            <span className="font-medium text-gray-800 dark:text-white">
              Profile tab's associated content
            </span>
            .
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
        </Tabs.Item>
        <Tabs.Item
          title="Detalles"
        >
          <p>
            This is
            <span className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </span>
            .
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
        </Tabs.Item>
        <Tabs.Item
          title="Ecologia"
        >
          <p>
            This is
            <span className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </span>
            .
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
        </Tabs.Item>
        <Tabs.Item
          title="Etnobotanica"
        >
          <p>
            This is
            <span className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </span>
            .
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
        </Tabs.Item>
        <Tabs.Item
          title="Arbolicultura"
        >
          <p>
            This is
            <span className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </span>
            .
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
        </Tabs.Item>
      </Tabs.Group>
      </div>
    </div>

  );
};

export default DashboardIndexPage;
