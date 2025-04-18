export const getRedirectUrl = (role) => {
  if (!role) {
    return; 
  }
    switch (role) {
      case "admin":
        return "/admin";
      case "librarian":
        return "/librarian";
      default:
        return "/";
    }
  };