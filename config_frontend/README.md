#### About
As there was no specification regarding the technologies to be used in `config_frontend`, I felt more comfortable using Typescript and React.

The application makes a request to the `config_backend` to search for the _Policy_ with the 'default' id, saving it in a state. At this moment, another state is created, which manages the 'nodes' seen by the user on the main screen "/". This decouples the requested 'nodes' from the user's changes, in addition to allowing the handling of other types of 'nodes', such as 'output' and 'start', and a deep-comparison in a simplified way , using `JSON.stringify()`, to check if there are changes that can be deployed. Both the _Policy_ and the 'nodes' are exposed in a context, providing easy access to this information at any level of the application under its providers.

I chose `tailwindcss` as the styling library due to its practicality and added `clsx` and `tailwind-merge` to have flexibility in components when necessary.

Still regarding the UI, I created base components in the `components/` folder, extra components per feature in the `pieces/` folders and used `react-beautiful-dnd` to make the drag-and-drop feature in a simple way.

OBS: Sometimes, the behavior of the component from 'select' to 'criteria' in 'decision-nodes' is unexpected due to z-index. You can use ['portals'](https://legacy.reactjs.org/docs/portals.html) to solve this.
