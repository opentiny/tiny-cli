export default {
  contracts: {
    title: 'Contracts',
    description:
      'The contract management list page is the display page of the contract table created in RDS. It supports the query, creation, editing and deletion functions of the contracts table by calling the HwcClient interface of @opentiny/hwc-client',
    detailTable: {
      name: 'Name',
      id: 'ID',
      customerName: 'Customer Name',
      description: 'Description',
      created: 'Created',
      operation: 'Operation',
      modify: 'Modify',
      delete: 'Delete',
      deleteConstract: 'Deleting a constract',
      sure: 'OK',
      cancel: 'Cancel',
      alert: 'The input value is not as expected.',
      input: 'inputting',
      click: 'Click to confirm the deletion.',
      deleteAsk: 'Are you sure you want to delete the following',
      splice: 'constract'
    },
    modal: {
      create: 'Create Contract',
      edit: 'Modify Contract',
      projectName: 'Name',
      namePlaceholder: 'Enter a Project name.',
      customerPlaceholder: 'Enter a customer name.',
      emptyTip: 'This filed cannot be left blank.',
      nameFormat:
        'Enter a string of 3 to 255 characters starting with a letter. Only letters, digits, hyphens (-), underscores (_), periods (.), slash (/), colons (:), and parentheses (()) are allowed.',
      description: 'Description',
      descriptionPlaceholder: 'Enter a description.',
      confirm: 'OK',
      cancel: 'Cancel',
      createSuccess: 'Create Contract Success',
      editSuccess: 'Modify Contract Success'
    }
  }
};
