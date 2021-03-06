# D&D 5e Companion

D&D 5e Companion is a campaign management system to manage players and resources

## To get started:

**This application assumes that bundler, npm, ruby, rails, and postgresql is installed**

```sh
bundle install
rails db:create db:migrate db:seed
npm install --prefix client
```

## Ruby Version:

- ruby-2.7.4

## Future Feature Implementations:

- Live Campaign Log
- Campaign Search Page
  - Add owner of campaign to card
    - Add the ability to message owner
      - when this gets added, need to change how to select a specific card or possibly add this to the modal that pops up when selecting a campaign
  - Isolate campaigns in search to campaigns that are not affiliated with current user
    - This includes:
      - Currrent campaigns user has not joined
      - Current campaigns user does not own
- Implement server search pagination for campaigns
- User's Characters
  - Search
    - will create query based on search parameters
  - Server side pagination to load more when user scrolls down
    - Will render from most recent created
- Character form
  - implement rolling stats
    - this may include a drag and drop feature
      - where the user rolls stats and the user drops the six rolled stats into an input field
  - implement point system variant for assigning stats
- Character Navigation & Campaign Navigation
  - on a specific screen size
    - render an arrow to the top left of the page
      - initially this arrow will be pointing right
      - when clicked 
        - this will also have the arrow pointing left
        - this will open a drawer that will have all the navigation related to the current page
        - when a link is clicked will close the drawer
- need to create not found error handling campaign
## Bugs that need to be stomped

## Deployment Instructions

## System Dependencies:

## Configuration
