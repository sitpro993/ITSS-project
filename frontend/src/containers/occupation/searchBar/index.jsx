import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

export const SearchBar = ({ debounceSearch }) => (
  <form
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <TextField
      sx={{
        width: 500,
      }}
      className="search-bar"
      onInput={(e) => {
        debounceSearch(e.target.value)
      }}
      label="Enter occupation"
      variant="outlined"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </form>
)
