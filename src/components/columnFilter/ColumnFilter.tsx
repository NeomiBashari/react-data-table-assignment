import React, { useState } from 'react';
import { HiOutlineAdjustments } from 'react-icons/hi';
import './ColumnFilter.scss';

interface ColumnFilterProps {
  headers: { key: string; label: string }[];
  visibleColumns: Set<string>;
  onToggleColumn: (key: string) => void;
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({ headers, visibleColumns, onToggleColumn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.dataset.key;
    if (key) {
      onToggleColumn(key);
    }
  };

  return (
    <div className="column-filter">
      <button
        className="filter-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filter Columns"
      >
        <HiOutlineAdjustments size={20} />
      </button>
      {isOpen && (
        <div className="filter-dropdown">
          {headers.map((header) => (
            <div key={header.key} className="filter-option">
              <label>
                <input
                  type="checkbox"
                  checked={visibleColumns.has(header.key)}
                  data-key={header.key}
                  onChange={handleCheckboxChange}
                />
                {header.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColumnFilter;