export const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials =
      names.length > 1
        ? names[0].charAt(0) + names[1].charAt(0)
        : names[0].charAt(0);
    return initials.toUpperCase();
  };
  