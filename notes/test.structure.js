const test = {
/**
This needs to express:
- questions with answer configurations
- linkages
- components
**/

  // state is the data collection that is built and/or modified as the dialogue
  // progresses.
  // This should be able to be passed in.
  state: {},

  // Log is the sequences of quetions and options selected.
  log: [],

  node: [
    {
      id : 'uuid',
      internalName: '', // Only used in the editor
      frameConfig: [ // A set of configurations for components
        { component: 'id', props: [ { name: '', value: '' } ] }
      ],
      components: [
        { id: '', internalTitle: '', type: # }
      ],
      responseType: #,
      responseConfiguration: {
        options: [] // only available when the question has multiple explicit options
      },
      linkages: [ // indiates which nodes to go to based on responses and state
        {}
      ]
    }
  ]
};
