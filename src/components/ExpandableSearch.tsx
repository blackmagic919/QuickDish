import React, {useState} from "react";
import {Search01Icon} from "hugeicons-react";
import { Button } from "react-bootstrap"; 

const ExpandableSearchBar = () => {
  const [IsExpanded, setExpand] = React.useState(false);
  const [query, setQuery] = useState("");

  const handleExpand = () => {
    setExpand(!IsExpanded);
  };

  // const handleSearch = (event) => {
  //   const value = event.target.value;
  //   setQuery(value);
  //   onSearch(value);
  // };


  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
      <input
        className="search-input"
        type="search"
        placeholder="Search keyword"
        style={{
          width: IsExpanded ? '100%' : '0%',
          opacity: IsExpanded ? 1 : 0, 
          pointerEvents: IsExpanded ? 'auto' : 'none', 
          transition: 'opacity 0.3s ease-out, width 0.3s ease-out',
        }}
      />
      <Button className="search-wrapper rounded-circle" 
      style={{ width: "3rem", height: "3rem", position: "relative", borderWidth: "0px", backgroundColor: "#fedebe"}}
      onClick={handleExpand}>
        <Search01Icon 
          style={{
            color: "black"
          }}
        />
      </Button>
    </div>
  );
};

export default ExpandableSearchBar;