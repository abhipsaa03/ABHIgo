const LocationSearchPanel = ({ suggestions = [], onSuggestionSelect }) => {
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  if (safeSuggestions.length === 0) {
    return <div className="location-search-empty">Type at least 3 characters to search for a place.</div>;
  }

  return (
    <div className="location-search-list" aria-label="Location suggestions">
      {safeSuggestions.map((suggestion, index) => (
        <button
          type="button"
          onClick={() => onSuggestionSelect(suggestion.description)}
          key={`${suggestion.place_id || suggestion.description}-${index}`}
          className="location-suggestion"
        >
          <span className="location-suggestion-icon" aria-hidden="true"><i className="ri-map-pin-2-line" /></span>
          <span>{suggestion.description}</span>
          <span className="location-suggestion-arrow" aria-hidden="true">↗</span>
        </button>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
