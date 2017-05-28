export function User() {
  const user = {
    isAuthenticated: false,
    username: null,
    email: null,
    bio: null,
    image: null
  };

  user.update = ({username, email, bio, image}) => {
    currentUser.username = username;
    currentUser.email = email;
    currentUser.bio = bio;
    currentUser.image = image;
  };

  user.updateAuthenticated = ({username, email, bio, image}) => {
    currentUser.isAuthenticated = true;

    currentUser.update({username, email, bio, image});
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
  currentUser = new User();
};

export let currentUser = new User();
