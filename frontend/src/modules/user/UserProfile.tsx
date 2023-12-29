import { Role } from '@/types';
import ReviewQueue from '../review/Review';
import { UserProfileType } from '../hooks/useProfile';
import { UserProfileBody } from '@/uiCore/components/UserProfileBody';
import { UsersPermissionsMe } from '@/__generated__/types';
interface UserProfileProps {
  user: UserProfileType | UsersPermissionsMe;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <>
      <UserProfileBody user={user} />
      {user?.role?.name === Role.admin && <ReviewQueue />}
    </>
  );
};

export default UserProfile;
