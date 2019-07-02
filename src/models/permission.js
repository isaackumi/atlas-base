import AccessControl from 'accesscontrol';

const ac = new AccessControl()

ac.grant('admin').createOwn('hostess')

export default ac;
