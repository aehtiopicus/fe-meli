import compact from 'lodash/compact';

export const join = (...parts) => (
  parts.reduce(
    (acc, currentPart) => (
      currentPart && currentPart.match && currentPart.match(/^\//) ?
        currentPart :
        compact(
          [acc && acc.replace && acc.replace(/\/$/, ''), currentPart]
        ).join('/')
    )
  )
);
