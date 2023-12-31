/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function GET_ACTIONS(addr) {
  return `query  {
          actions (where: { creator: "${addr}" }, orderDirection: desc, orderBy: id) {
          id
          action_type
          description
          proof
          status
          confirmed
          creator
          }
      }`;
}

export function GET_WASTES(addr) {
  return `query {
          wastes(where: { creator: "${addr}" }, orderDirection: desc, orderBy: id) {
              id
              weight
              sorted
              status
              confirmed
              creator
             
            }
              }`;
}

export function GET_TREES(addr) {
  return `query {
          trees(where: { creator: "${addr}" }, orderDirection: desc, orderBy: id) {
              id
              no_of_trees
              locations
              creator
              status
              confirmed  
              }
                }`;
}

export function GET_USER(addr) {
  return `query {
          users(where: { user: "${addr}" }, orderDirection: desc, orderBy: id) {
              id
              trees
              waste
              actions
              overall_score
              score
              user
                }
                  }`;
}

export function GET_ALL_ACTIONS() {
  return `query {
            actions(orderDirection: desc, orderBy: id ) {
            id
            action_type
            description
            proof
            status
            confirmed
            creator
            }
        }`;
}

export function GET_ALL_WASTES() {
  return `query {
            wastes(orderDirection: desc, orderBy: id) {
                id
                weight
                sorted
                status
                confirmed
                creator
               
              }
                }`;
}

export function GET_ALL_TREES() {
  return `query {
            trees(orderDirection: desc, orderBy: id) {
                id
                no_of_trees
                locations
                creator
                status
                confirmed  
                }
                  }`;
}

export function GET_ALL_USER(addr) {
  return `query {
            users{
                id
                trees
                waste
                actions
                overall_score
                score
                user
                  }
                    }`;
}
