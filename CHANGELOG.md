# Changelog

## [0.1.5] - 07-01-2024 - feature 4 
### Added (Grant)
- Created `SongModel.js` and `GenreModel.js` for separate Parse queries.
- Updated `Main.js` get async data for songs, genres, and users.
- Added `SongsList.js` and `GenresList.js` components to render lists of songs and genres similarly to `MainList.js`.
- Added `parse` initialization in `App.js` and `enviroemtns.js`.
### Added (JP)
- File Structure/Organization
- Transferring from HTML to React for all files
- Routing for Home and Header are added as well as `Navigation.js` which is intended for routing
    - this routing will later be incorporated into the header bar as well as have its own page to function on

### Fixed
- no longer calling for non existent css file in `index.html`.

### Current Problems/Issues
- Genres and Songs won't connect through routing

## [0.1.0] - 06-20-2024 - feature 3
### Added
- Initial project creation.