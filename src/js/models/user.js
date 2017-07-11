export function User(userData = {}) {
  const user = {
    username: userData.username,
    email: userData.email,
    bio: userData.bio,
    image: userData.image,
    following: Boolean(userData.following)
  };

  user.update = ({username, email, bio, image}) => {
    currentUser.username = username;
    currentUser.email = email;
    currentUser.bio = bio;
    currentUser.image = image;
  };

  user.setFollowing = (following) => {
    user.following = following;
  };

  return user;
}

User.validateUsername = (username) => {
  if (username && /[\\/]/.test(username)) {
    return 'Username can not contain slashes';
  }
};

User.validatePassword = (password) => {
  if (password && password.length < 8) {
    return 'Password is too short (minimum is 8 characters)';
  }
};

User.logout = () => {
  currentUser.isAuthenticated = false;
  currentUser = new CurrentUser();
};

function CurrentUser() {
  const user = new User();

  user.isAuthenticated = false;

  user.updateAuthenticated = ({username, email, bio, image}) => {
    user.isAuthenticated = true;

    user.update({username, email, bio, image});
  };

  return user;
}

export let currentUser = new CurrentUser();
