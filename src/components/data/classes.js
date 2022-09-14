export const class_headers = {
  'content-type': 'application/json',
  //'Accept': '*/*',
  'Access-Control-Allow-Origin': '*'
}

export const buildClassPayload = (crn, termId) => {
  return {
    "query": "query searchResults($termId: String!, $query: String, $offset: Int = 0, $first: Int = 100, $subject: [String!], $nupath: [String!], $honors: Boolean, $campus: [String!], $classType: [String!], $classIdRange: IntRange) {\n  search(\n    termId: $termId\n    query: $query\n    offset: $offset\n    first: $first\n    subject: $subject\n    nupath: $nupath\n    honors: $honors\n    campus: $campus\n    classType: $classType\n    classIdRange: $classIdRange\n  ) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    filterOptions {\n      nupath {\n        value\n        count\n        description\n      }\n      subject {\n        value\n        count\n        description\n      }\n      classType {\n        value\n        count\n        description\n      }\n      campus {\n        value\n        count\n        description\n      }\n      honors {\n        value\n        count\n        description\n      }\n    }\n    nodes {\n      type: __typename\n      ... on Employee {\n        bigPictureUrl\n        emails\n        firstName\n        googleScholarId\n        lastName\n        link\n        name\n        officeRoom\n        personalSite\n        phone\n        primaryDepartment\n        primaryRole\n        streetAddress\n      }\n      ... on ClassOccurrence {\n        name\n        subject\n        classId\n        termId\n        host\n        desc\n        nupath\n        prereqs\n        coreqs\n        prereqsFor\n        optPrereqsFor\n        maxCredits\n        minCredits\n        classAttributes\n        url\n        prettyUrl\n        lastUpdateTime\n        feeAmount\n        feeDescription\n        sections {\n          campus\n          classId\n          classType\n          crn\n          honors\n          host\n          lastUpdateTime\n          meetings\n          profs\n          seatsCapacity\n          seatsRemaining\n          subject\n          termId\n          url\n          waitCapacity\n          waitRemaining\n        }\n      }\n    }\n  }\n}\n",
    "variables": {
    "termId": termId,
    "query": crn,
    "offset": 0,
    },
    "operationName": "searchResults"};
}


