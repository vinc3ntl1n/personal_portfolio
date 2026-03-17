import { useState, useRef, useEffect } from 'react';
import './MenuBar.css';

//to add a new menu item add a new entry to the array, give it an action, and the action string defined in the handleMenuAction
//to add a new menu add a new key to the object and it will appear.

const MENUS = {
  'Vincent': [],

  'File': [
    { label: 'Download Resume', action: 'download-resume' },
  ],

  'Card': [
    { label: 'About Me', action: 'open-about' },
    { label: 'Projects', action: 'open-projects' },
    { label: 'Contact', action: 'open-contact' },
    { label: 'Resume', action: 'open-resume' },
  ],

  'Help': [
    { label: 'About This Site', action: 'open-help-about' },
  ],
};

export default function MenuBar({ onAction }) {
  const [openMenu, setOpenMenu] = useState(null);
  
  const menuBarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleItemClick = (item) => {
    if (item.disabled) return;
    setOpenMenu(null);
    if (item.action && onAction) {
      onAction(item.action);
    }
  };

  return (
    <div className="menu-bar" ref={menuBarRef}>
      <div className="menu-bar__items">
        {Object.entries(MENUS).map(([name, items]) => (
          <div key={name} className="menu-bar__menu">
            <button
              className={`menu-bar__trigger ${name === 'Vincent' ? 'menu-bar__trigger--logo' : ''} ${openMenu === name ? 'menu-bar__trigger--active' : ''}`}
              onClick={() => handleMenuClick(name)}
              onMouseEnter={() => openMenu && setOpenMenu(name)}
            >
              {name === 'Vincent' ? 'Vincent' : name}
            </button>

            {openMenu === name && items.length > 0 && (
              <div className="menu-bar__dropdown">
                {items.map((item, i) => (
                  <button
                    key={i}
                    className={`menu-bar__item ${item.disabled ? 'menu-bar__item--disabled' : ''}`}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && <span className="menu-bar__shortcut">{item.shortcut}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
