import React, {useState} from "react";
import {Search01Icon} from "hugeicons-react";
import { Button } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import recipes from "../data/recipes.json";

const ExpandableSearchBar = () => {
  const [IsExpanded, setExpand] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleExpand = () => {
    setExpand(!IsExpanded);
    if(!IsExpanded)
    {
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate("/store", { state: { searchQuery } });
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
      <form onSubmit={handleSearchSubmit}>
      <input
        className="search-input"
        type="search"
        placeholder="Search keyword"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
      </form>
    </div>
  );
};

export default ExpandableSearchBar;