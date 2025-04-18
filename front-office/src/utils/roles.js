export const getRedirectUrl = (role) => {
    switch (role) {
      case "admin":
        return "/admin";
      case "librarian":
        return "/librarian";
      default:
        return "/";
    }
  };