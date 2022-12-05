function createData(id, date, company, type, request, workingType, status) {
  return { id, date, company, type, request, workingType, status };
}

const requests = [
  createData(
    0,
    '16 Mar, 2019',
    'Google 1',
    'Learning',
    'No Salary',
    'Online',
    'Pedding'
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Google 2',
    'Learning',
    '1000$',
    'Offline',
    'Pedding'
  ),
  createData(
    2,
    '16 Mar, 2019',
    'Google 3',
    'Learning',
    '1000$',
    'Online',
    'Pedding'
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Google 4',
    'Learning and Working',
    '1000$',
    'Offline',
    'Pedding'
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Google 5',
    'Learning',
    'No Salary',
    'Online',
    'Pedding'
  ),
];

export const RequestApi = {
  getRequests: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return requests;
  },
};
