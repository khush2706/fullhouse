import { useState } from "react";
import { SearchIcon } from "../../resources/images/svgs/searchIcon";
import { QueueWrapper, QueueCta, SearchBar } from "../styles/Queue.styles";

const Queue = () => {
  const [search, setSearch] = useState("");

  return (
    <QueueWrapper>
      <div style={{display: "flex", alignItems: "center"}}>
			<QueueCta>Back to Queue</QueueCta>
        <SearchBar
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search Song"
        />
        <SearchIcon />
      </div>
    </QueueWrapper>
  );
};

export default Queue;
