/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function GET_ACTIONS(addr) {
  return `query  {
          actions (where: { creator: "${addr}" }) {
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
          wastes(where: { creator: "${addr}" }) {
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
          trees(where: { creator: "${addr}" }) {
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
          users(where: { user: "${addr}" }) {
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
