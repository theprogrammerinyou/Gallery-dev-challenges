import './profile.css';
import { Fragment } from 'react';
import { ScrollToTop, PageTemplate } from '../../helper';
import MyProfile from './MyProfile';

export default function Profile() {
  return (
    <Fragment>
      <ScrollToTop />
      <PageTemplate>
        <MyProfile />
      </PageTemplate>
    </Fragment>
  );
}
