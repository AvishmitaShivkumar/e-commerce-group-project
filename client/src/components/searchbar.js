import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { InventoryContext } from "./InventoryContext";
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const [value, setValue] = useState("");
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const { allItems, allCompanies } = useContext(InventoryContext);

   // Reference to the suggestions list
  const suggestionsRef = useRef(null);

    
  const unsortedMatchedItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );
    
  const matchedItems = unsortedMatchedItems.sort((a, b) => {
    const companyA = a.companyId;
    const companyB = b.companyId;
  
    if (companyA < companyB) {
      return -1;
    } else if (companyA > companyB) {
      return 1;
    } else {
      return 0;
    }
  });

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

  const navigate = useNavigate();
  const handleClickItem=(item) => {
      navigate(`/products/${item}`);
      setIsMenuVisible(false)
  }
    
    //arrows up and down have 2 conditions, the value length is 2 or more, the menu is visible to change the index.
  //the index is changed only if the index is not the first or the last one, otherwise it stays the same
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter": {
        const selectedItem = matchedItems[selectedSuggestionIndex];
        handleClickItem(selectedItem._id);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        if (value.length >= 2 && isMenuVisible) {
          setSelectedSuggestionIndex(
            selectedSuggestionIndex >= 1 ? selectedSuggestionIndex - 1 : 0
          );
        }
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        if (value.length >= 2 && isMenuVisible) {
          setSelectedSuggestionIndex(
            selectedSuggestionIndex < matchedItems.length - 2
              ? selectedSuggestionIndex + 1
              : matchedItems.length - 1
          );
        }
        break;
        }
        case "Escape": {
            setIsMenuVisible(false);
            break;
          }
        //this is just depending if its windows or mac, on mac they behave the same way these 2 key names
      case "Delete":
        case "Backspace": {
            setSelectedSuggestionIndex(0);
            if (!value) {
                setIsMenuVisible(false);
              }
          break;
        }
        default:
          break;
      }
  };
    
  useEffect(() => {
    // Scroll the suggestions list to bring the selected suggestion into view
    if (suggestionsRef.current) {
      const selectedSuggestion = suggestionsRef.current.querySelector(
        "li.selected"
      );
      if (selectedSuggestion) {
        selectedSuggestion.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedSuggestionIndex]);
    
  return (
    <Search>
      <InputBox
        type="text"
        id="search"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          //condition to make the menu visible again after the user types another letter when menu is invisible
          setIsMenuVisible(true);
        }}
        onKeyDown={handleKeyDown}
      />
      {isMenuVisible && value.length > 1 && matchedItems.length !== 0 && (
        <Suggestions ref={suggestionsRef}      >
          {/* for each single company it is going to render a header and a list with the filter of the company  */}
          {matchedUniqueCompanies.map((company) => {
            return (
              <div key={company._id}>
                <Subtitle>By {company.name}:</Subtitle>
                <ul>
                  {matchedItems.map((item, index) => {
                    if (item.companyId === company._id) {
                      const { firstHalf, secondHalf } = getHighlightedText(
                        item.name
                      );
                      const isSelected =
                      matchedItems[selectedSuggestionIndex] === item;
                      return (
                          <Suggestion
                          key={`${item._id}${company._id}`}
                          className={isSelected ? 'selected' : ''}
                          onClick={() => handleClickItem(item._id)}
                          onMouseEnter={() => setSelectedSuggestionIndex(index)}
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
                      return null
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

const Suggestions = styled.div`
  width: 400px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  box-shadow: 5px 5px #ccc;
  position: absolute;
  max-height:350px;
  overflow-y: scroll;
  overflow-x: hidden;
  top: 2.1rem;
  right:2.9rem;
  background-color: white;
`;

const Subtitle = styled.li`
  font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: larger;
  text-align: center;
`;

const Suggestion = styled.li`
  padding: 15px 10px;
  width: 100%;
  border-radius: 5px;
  &.selected {
    background-color: hsla(50deg, 100%, 80%, 0.25);
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
