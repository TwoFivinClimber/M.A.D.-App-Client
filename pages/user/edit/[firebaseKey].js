import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUser } from '../../../api/user/userData';
import UserForm from '../../../components/UserForm';

const EditUser = () => {
  const [authUser, setAuthUser] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getUser(firebaseKey).then(setAuthUser);
  }, [firebaseKey]);

  return (
    <>
      <UserForm obj={authUser} />
    </>
  );
};

export default EditUser;
