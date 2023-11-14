import SearchIcon from "@mui/icons-material/Search";

import "./_SearchBar.scss";

interface SearchProps {
  text: string;
  onChangeInput: (value: string) => void;
}

export const SearchBar = ({ text, onChangeInput }: SearchProps) => {
  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          className="searchBar__searchInput"
          value={text}
          onChange={({ target }) => onChangeInput(target.value)}
        />
        <div className="searchBar__searchBtn">
          <SearchIcon className="searchBar__searchBtn-icon" />
        </div>
      </div>
    </>
  );
};
