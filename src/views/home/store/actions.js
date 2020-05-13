import api from 'api';

export const getNewsList = ({}, params) => {
  return api.get('appapi.php?a=getPortalList&catid=20&page=1');
}