import { useContext, useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { InventoryContext } from "./InventoryContext";

const SearchBar = () => {
  const [value, setValue] = useState("");
  //   const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const { allItems, allCompanies } = useContext(InventoryContext);

  const matchedItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  const matchedCompanies = matchedItems.map((item) =>
    allCompanies.find((company) => company._id === item.companyId)
  );
  const matchedUniqueCompanies = [...new Set(matchedCompanies)];

  //function to get highlighted text based on the value written, splits the suggesion and creates 2 different variables that are returned to be used below.
  const getHighlightedText = (text) => {
    const valueIndex = text.toLowerCase().indexOf(value.toLowerCase());
    const firstHalf = text.slice(0, valueIndex + value.length);
    const secondHalf = text.slice(valueIndex + value.length);
    return { firstHalf, secondHalf };
  };

  return (
    <Search>
      <InputBox
        type="text"
        id="search"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          //added condition to make the menu visible again after the user types another letter when menu is invisible
          setIsMenuVisible(true);
        }}
        //   onKeyDown={(event) => {
        //     handleKeyDown(event);
        //   }}
      />
      {isMenuVisible && value.length > 1 && matchedItems.length !== 0 && (
        <Suggestions isVisible={isMenuVisible}>
          {/* for each single company it is going to render a header and a list with the filter of the company  */}
          {matchedUniqueCompanies.map((company) => {
            return (
              <div key={company._id}>
                <Subtitle>By {company.name}:</Subtitle>
                <ul>
                  {matchedItems.map((item) => {
                    if (item.companyId === company._id) {
                      const { firstHalf, secondHalf } = getHighlightedText(
                        item.name
                      );
                      // const isSelected =
                      // matchedSuggestions[selectedSuggestionIndex] ===
                      // suggestion;
                      return (
                        <Suggestion
                        // style={{
                        //   background: isSelected
                        //     ? "hsla(50deg, 100%, 80%, 0.25)"
                        //     : "transparent",
                        // }}
                        // onClick={() => handleSelect(suggestion.title)}
                        // onMouseEnter={() => setSelectedSuggestionIndex(index)}
                        >
                          <span>
                            {firstHalf}
                            <Prediction>{secondHalf} </Prediction>
                            <Italic>in</Italic>
                            <Purple> {item.category} </Purple>
                          </span>
                        </Suggestion>
                      );
                    }
                  })}
                </ul>
              </div>
            );
          })}
        </Suggestions>
      )}
      <SearchIcon>
        <AiOutlineSearch style={{ fontSize: "20px" }} />
      </SearchIcon>
    </Search>
  );
};

export default SearchBar;

const Search = styled.div`
  display: flex;
  align-items: center;
  border: 0.1rem solid black;
  margin-right: 1rem;
`;

const InputBox = styled.input`
  height: 1.5rem;
  border: none;
`;

const SearchIcon = styled.button`
  background-color: white;
  border: none;
`;

const Suggestions = styled.ul`
  width: 400px;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  box-shadow: 5px 5px #ccc;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: absolute;
  height:350px;
  overflow-y: scroll;
  top: 30px;
  right:50px
`;

const Subtitle = styled.li`
  font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: larger;
  text-align: center;
`;

const Suggestion = styled.li`
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  &:focus {
    background-color: lightyellow;
  }
`;
const Prediction = styled.span`
  font-weight: bold;
`;

const Italic = styled.span`
  opacity: 0.6;
  font-style: italic;
`;
const Purple = styled(Italic)`
  color: purple;
`;
